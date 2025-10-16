import { createServerClient } from "@/utils/supabase/apiServiceServer";
import { NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.AWS_REGION || "us-east-1";
const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET || "photo-editor-uploads";
const EXPIRES_IN = 60 * 60 * 24 * 7;
const s3Client = new S3Client({ region: REGION });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId)
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const supabase = createServerClient();
    const { data: files, error } = await supabase
      .from("images")
      .select("id, path, url, expires_at, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    const now = Date.now();

    const refreshed = await Promise.all(
      files.map(async (file) => {
        const isExpired = !file.url || new Date(file.expires_at).getTime() < now;
        if (!isExpired) return file;

        const command = new GetObjectCommand({ Bucket: BUCKET, Key: file.path });
        const newUrl = await getSignedUrl(s3Client, command, { expiresIn: EXPIRES_IN });
        const newExpiresAt = new Date(now + EXPIRES_IN * 1000).toISOString();

        await supabase
          .from("images")
          .update({ url: newUrl, expires_at: newExpiresAt })
          .eq("id", file.id);

        return { ...file, url: newUrl, expires_at: newExpiresAt };
      })
    );

    return NextResponse.json({ files: refreshed });
  } catch (err: any) {
    console.error("Fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
