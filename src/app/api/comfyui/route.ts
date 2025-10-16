import { NextResponse } from "next/server";

interface ComfyUIRequest {
  fileUrl: string;
  prompt: string;
}

export async function POST(req: Request) {
  try {
    const body: ComfyUIRequest = await req.json();
    const { fileUrl, prompt } = body;

    if (!fileUrl || !prompt) {
      return NextResponse.json({ error: "Missing fileUrl or prompt" }, { status: 400 });
    }

    // 1. Prepare ComfyUI request
    // ComfyUI local endpoint: default is http://127.0.0.1:8188/controlnet
    // You might need to adjust endpoint & payload depending on your setup
    const comfyUIEndpoint = "http://127.0.0.1:8188/api/v1/generate"; 

    const payload = {
      prompt,
      init_image: fileUrl,
      width: 512,
      height: 512,
      steps: 20,
    };

    const res = await fetch(comfyUIEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // Assume ComfyUI returns an image URL or base64
    // Adjust according to your ComfyUI response
    const generatedUrl = data.output_url || data.images?.[0] || null;

    if (!generatedUrl) {
      return NextResponse.json({ error: "ComfyUI did not return an image" }, { status: 500 });
    }

    return NextResponse.json({ generatedUrl });
  } catch (err: unknown) {
    console.error("ComfyUI API error:", err);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
