import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const prompt = formData.get("prompt") as string | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const azureApiUrl = "https://nextq-byb9hkhcgygqhfck.canadacentral-01.azurewebsites.net/summarize_note"
    const azureForm = new FormData()
    azureForm.append("file", file)
    if (prompt) azureForm.append("prompt", prompt)

    const azureRes = await fetch(azureApiUrl, {
      method: "POST",
      body: azureForm,
    })

    if (!azureRes.ok) {
      const errorText = await azureRes.text()
      return NextResponse.json({ error: errorText }, { status: azureRes.status })
    }

    // The Azure API returns a summarized PDF file
    const blob = await azureRes.blob()
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=summary.pdf",
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 })
  }
}
