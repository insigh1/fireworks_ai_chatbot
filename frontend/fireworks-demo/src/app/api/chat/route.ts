// File: src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Use the Docker service name 'backend' instead of 'localhost'
    const response = await fetch("http://backend:8000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    return NextResponse.json({ role: "assistant", content: data.content });
  } catch (error) {
    // Use the error variable so lint doesn't complain
    console.error("Error in chat route:", error);
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}

