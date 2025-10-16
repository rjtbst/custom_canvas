import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { createServerClient } from "@/utils/supabase/apiServiceServer";

const REGION = process.env.AWS_REGION || "us-east-1";
const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET || "photo-editor-uploads";
const s3 = new S3Client({ region: REGION });

export async function POST(req: NextRequest) {
  try {
    const { userId, fileName, fileType, fileSize } = await req.json();
    if (!userId || !fileName || !fileType)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const key = `${userId}/${uuidv4()}-${fileName}`;
    const now = Date.now();

    // Upload URL (valid for short time, 15 mins)
    const uploadUrl = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        ContentType: fileType,
      }),
      { expiresIn: 15 * 60 }
    );

    // Read URL (valid 7 days)
    const EXPIRES_IN = 60 * 60 * 24 * 7;
    const readUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: BUCKET, Key: key }),
      { expiresIn: EXPIRES_IN }
    );
    const expiresAt = new Date(now + EXPIRES_IN * 1000).toISOString();

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("images")
      .insert([
        {
          user_id: userId,
          path: key,
          url: readUrl,
          mime_type: fileType,
          expires_at: expiresAt,
          size: fileSize || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ uploadUrl, key, url: readUrl, imageId: data.id });
  } catch (err: any) {
    console.error("Upload init failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
