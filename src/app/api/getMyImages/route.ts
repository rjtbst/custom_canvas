import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/apiServiceServer";

export async function GET(req: Request) {
  try {
    const supabase = createServerClient();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const { data, error } = await supabase.storage
      .from("file_upload")
      .list(userId, { limit: 50, offset: 0, sortBy: { column: "name", order: "asc" } });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
const signedFiles = await Promise.all(
    data.map(async (file) => {
      const { data: signed, error: signedError } = await supabase.storage
        .from("file_upload")
        .createSignedUrl(`${userId}/${file.name}`, 3600); // 1 hour expiry
      if (signedError) return null;
      return { name: file.name, url: signed.signedUrl };
    })
  );

  return NextResponse.json({ files: signedFiles.filter(Boolean) });
  } catch (err) {
    console.error("Media fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}
