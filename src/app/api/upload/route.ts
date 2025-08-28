import { createServerClient } from "@/utils/supabase/apiServiceServer";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
  const supabase = createServerClient()
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const filePath = `${userId}/${uuidv4()}-${file.name}`;

    // Upload
    const { error: uploadError } = await supabase.storage
      .from("file_upload")
      .upload(filePath, file);

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Create signed URL
    const { data: signed, error: signedError } = await supabase.storage
      .from("file_upload")
      .createSignedUrl(filePath, 3600);

    if (signedError) {
      return NextResponse.json({ error: signedError.message }, { status: 500 });
    }

    return NextResponse.json({ url: signed?.signedUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
