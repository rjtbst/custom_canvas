import { createServerClient } from "@/utils/supabase/apiServiceServer";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
  try {
     const supabase = createServerClient();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const fileName = url.searchParams.get("fileName");
    if (!userId || !fileName)
      return NextResponse.json({ error: "Missing userId or fileName" }, { status: 400 });

    const filePath = `${userId}/${fileName}`;

    const { data: signed, error } = await supabase.storage
      .from("file_upload")
      .createSignedUrl(filePath, 3600);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.redirect(signed.signedUrl);
  } catch (err) {
    console.error("File fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
  }
}
