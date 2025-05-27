import { NextRequest, NextResponse } from "next/server";
import { semesterFolderLinks, extractDriveFolderId } from "@/lib/semesterFolders";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import fetch from 'node-fetch'; // For Together AI API

export const dynamic = "force-dynamic";
export const runtime = "nodejs";


function chunkTextByModule(text: string): string[] {
  // Try to split by module headings first
  const moduleRegex = /Module\s*\d+[:\-]?/gi;
  const splits = text.split(moduleRegex).map(s => s.trim()).filter(Boolean);
  // If splitting by module gives too few chunks, fallback to paragraph split
  if (splits.length < 2) {
    return text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
  }
  return splits;
}

// Helper: Get Together AI embedding for a chunk
async function getTogetherEmbedding(text: string): Promise<number[]> {
  const res = await fetch('https://api.together.xyz/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'togethercomputer/m2-bert-80M-8k-retrieval',
      input: [text],
    }),
  });
  const json = (await res.json()) as { data?: { embedding: number[] }[] };
  if (!json.data || !json.data[0] || !json.data[0].embedding) throw new Error('Embedding failed');
  return json.data[0].embedding;
}

// Helper: Cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const semester = searchParams.get("semester") || "";
    const pdfName = searchParams.get("pdfName") || "";
    const moduleParam = searchParams.get("module") || ""; // Avoid using 'module' as a variable name
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

    if (!semester || !pdfName || !moduleParam) {
      return NextResponse.json({ error: "Missing query parameters: semester, pdfName, or module" }, { status: 400 });
    }

    const folderLink = semesterFolderLinks[semester];
    if (!folderLink) {
      return NextResponse.json({ error: "Invalid semester" }, { status: 400 });
    }

    const folderId = extractDriveFolderId(folderLink);
    if (!folderId) {
      return NextResponse.json({ error: "Could not extract Google Drive folder ID" }, { status: 500 });
    }

    // Step 1: Find the PDF file in the folder
    const fileIdDebugUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+name='${pdfName}'&key=${apiKey}&fields=files(id,name,mimeType)`;
    const fileIdResult = await findPdfInDrive(folderId, pdfName, apiKey);
    if (!fileIdResult) {
      return NextResponse.json({
        error: "PDF file not found in Google Drive folder",
        debugQueryUrl: fileIdDebugUrl
      }, { status: 404 });
    }
    const fileId = fileIdResult;

    // Step 2: Download the PDF
    const { buffer, debug } = await downloadPdfFromDrive(fileId, apiKey);
    if (!buffer) {
      return NextResponse.json({ error: "Failed to download PDF from Drive", debug }, { status: 500 });
    }
    // Convert Buffer to Uint8Array for pdfjs
    const uint8Array = new Uint8Array(buffer);

    // Step 3: Extract text using pdfjs
    let allText = "";
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      (pdfjsLib as typeof import('pdfjs-dist')).GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.js");
    } catch (err) {
      return NextResponse.json({ error: "Failed to set pdfjs workerSrc", details: String(err) }, { status: 500 });
    }

    try {
      const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
      const pdfDocument = await loadingTask.promise;
      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = (content.items as { str: string }[]).map((item) => item.str).join(" ");
        allText += pageText + "\n";
      }
    } catch (err) {
      return NextResponse.json({ error: "Failed to extract text with pdfjs", details: String(err) }, { status: 500 });
    }

    // --- RAG: Chunk, Embed, Retrieve ---
    const chunks = chunkTextByModule(allText);
    // Embed all chunks
    const chunkEmbeddings = await Promise.all(chunks.map(chunk => getTogetherEmbedding(chunk)));
    // Embed the module query
    const queryEmbedding = await getTogetherEmbedding(moduleParam);
    // Compute similarity
    const scored = chunks.map((chunk, i) => ({ chunk, score: cosineSimilarity(chunkEmbeddings[i], queryEmbedding) }));
    // Sort by score, take top 3
    const topChunks = scored.sort((a, b) => b.score - a.score).slice(0, 3).map(s => s.chunk);
    // Return the top chunks as context
    return NextResponse.json({ text: topChunks.join('\n\n') });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal server error", details: String(err) }, { status: 500 });
  }
}

async function findPdfInDrive(folderId: string, fileName: string, apiKey?: string): Promise<string | null> {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+name='${fileName}'&key=${apiKey}&fields=files(id,name,mimeType)`;
  const res = await fetch(url);
  const json = (await res.json()) as { files?: { id: string; name: string; mimeType: string }[] };
  if (!json.files || json.files.length === 0) return null;
  return json.files[0].id;
}

async function downloadPdfFromDrive(fileId: string, apiKey?: string): Promise<{ buffer: Buffer | null, debug: Record<string, unknown> }> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
  const res = await fetch(url);
  const debug: Record<string, unknown> = {
    url,
    status: res.status,
    statusText: res.statusText,
    headers: Object.fromEntries(res.headers.entries()),
    googleDriveApiKey: !!apiKey,
    errorBody: !res.ok ? await res.text() : undefined
  };
  if (!res.ok) return { buffer: null, debug };
  const buffer = await res.arrayBuffer();
  return { buffer: Buffer.from(buffer), debug };
}
