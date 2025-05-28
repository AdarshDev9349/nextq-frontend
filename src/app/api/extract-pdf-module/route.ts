import { NextRequest, NextResponse } from "next/server";
import { semesterFolderLinks, extractDriveFolderId } from "@/lib/semesterFolders";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import fetch from 'node-fetch'; // For Together AI API

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function extractSyllabusSection(text: string): string | null {
  // Find the 'Syllabus' section and extract all text until the next all-caps heading or end of text
  const match = text.match(/Syllabus[\s\S]*?(?=\n[A-Z][A-Z\s]+\n|$)/i);
  return match ? match[0] : null;
}

function extractModuleFromSyllabus(syllabusText: string, moduleParam: string): string | null {
  // Find the requested module (e.g., 'Module 2') and extract until the next 'Module <number>' or end
  // Use a global regex to find all module sections
  const moduleRegex = /Module\s*\d+[\s\S]*?(?=Module\s*\d+|$)/gi;
  const modules = syllabusText.match(moduleRegex);
  if (!modules) return null;
  // Find the module that matches the requested moduleParam (case-insensitive)
  const found = modules.find(m => m.toLowerCase().startsWith(moduleParam.toLowerCase()));
  return found ? found.trim() : null;
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

    // --- Extract Syllabus Section and Module ---
    const syllabusText = extractSyllabusSection(allText);
    if (!syllabusText) {
      return NextResponse.json({ error: "Could not find Syllabus section in PDF", preview: allText.slice(0, 500) }, { status: 404 });
    }
    const moduleText = extractModuleFromSyllabus(syllabusText, moduleParam);
    if (!moduleText) {
      return NextResponse.json({ error: `Could not find ${moduleParam} in Syllabus section`, preview: syllabusText.slice(0, 500) }, { status: 404 });
    }
    // Return the extracted module text
    return NextResponse.json({ text: moduleText });
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
