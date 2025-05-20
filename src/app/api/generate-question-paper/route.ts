import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY || "";

  const response = await fetch("https://api.together.xyz/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      prompt,
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.95,
      stop: ["</s>"],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Together AI API error:", errorText);
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  const data = await response.json();
  const generated = data.choices?.[0]?.text || "Could not generate content.";

  return NextResponse.json({ content: generated });
}
