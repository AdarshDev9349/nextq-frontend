import { NextRequest, NextResponse } from "next/server";
import { semesterFolderLinks, extractDriveFolderId } from "@/lib/semesterFolders";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
    const buffer = await downloadPdfFromDrive(fileId, apiKey);
    if (!buffer) {
      return NextResponse.json({ error: "Failed to download PDF from Drive" }, { status: 500 });
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

    const extractedText = extractModuleText(allText, moduleParam);
    if (!extractedText) {
      const moduleHeaderRegex = /Module\s*\d+/gi;
      const foundHeaders = allText.match(moduleHeaderRegex) || [];
      return NextResponse.json({
        error: `Module \"${moduleParam}\" not found in PDF`,
        moduleParam,
        preview: allText.slice(0, 500),
        foundHeaders,
        allTextLength: allText.length
      }, { status: 404 });
    }
    return NextResponse.json({ text: extractedText });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function extractModuleText(text: string, moduleParam: string): string | null {
  const pattern = new RegExp(`(${moduleParam})\\s*[:\\-]?\\s*([\\s\\S]*?)(?=Module\\s+\\d+|$)`, 'i');
  const match = text.match(pattern);
  return match ? match[2].trim() : null;
}

async function findPdfInDrive(folderId: string, fileName: string, apiKey?: string): Promise<string | null> {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+name='${fileName}'&key=${apiKey}&fields=files(id,name,mimeType)`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.files || json.files.length === 0) return null;
  return json.files[0].id;
}

async function downloadPdfFromDrive(fileId: string, apiKey?: string): Promise<Buffer | null> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const buffer = await res.arrayBuffer();
  return Buffer.from(buffer);
}
