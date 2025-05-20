import { NextRequest, NextResponse } from "next/server";
import { semesterFolderLinks, extractDriveFolderId } from "@/lib/semesterFolders";

// API: /api/list-sem-pdfs?semester=1-2
export async function GET(req: NextRequest) {
  const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY || "";
  const { searchParams } = new URL(req.url);
  const semester = searchParams.get("semester") || "";

  const folderLink = semesterFolderLinks[semester];
  if (!folderLink) {
    return NextResponse.json({ error: "No folder link for this semester." }, { status: 400 });
  }
  const folderId = extractDriveFolderId(folderLink);
  if (!folderId) {
    return NextResponse.json({ error: "Invalid Google Drive folder link." }, { status: 400 });
  }

  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&fields=files(id%2Cname)&key=${GOOGLE_DRIVE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: 500 });
    }
    const data = await response.json();
    return NextResponse.json({ files: data.files || [] });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
