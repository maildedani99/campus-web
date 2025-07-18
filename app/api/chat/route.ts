import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // 👈 define en .env.local
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // o "openai/gpt-4", "mistralai/mixtral-8x7b", etc.
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter error:", error);
      return NextResponse.json({ error: "Error en la respuesta de OpenRouter" }, { status: 500 });
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    return NextResponse.json({ role: "assistant", content: answer });
  } catch (error) {
    console.error("Error general:", error);
    return NextResponse.json({ role: "assistant", content: "No se pudo obtener respuesta." }, { status: 500 });
  }
}
