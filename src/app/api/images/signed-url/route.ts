import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: process.env.AWS_REGION || "us-east-1" });
const BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET || "photo-editor-uploads";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });

    const command = new GetObjectCommand({ Bucket: BUCKET, Key: path });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 }); // 1 hour

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Signed URL error:", err);
    return NextResponse.json({ error: err.message || "Failed to generate URL" }, { status: 500 });
  }
}
