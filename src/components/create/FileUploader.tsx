"use client";

import { useState } from "react";

interface FileUploaderProps {
  userId: string | any;
}

export default function FileUploader({ userId }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedUrl(data.url); // signed url from backend
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full rounded-md border border-gray-300 shadow-sm text-md file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:text-white hover:file:bg-accent/90"
      />

      {uploading && <p className="text-md text-gray-500">Uploading...</p>}
      {error && <p className="text-md text-red-500">{error}</p>}
      {uploadedUrl && (
        <div>
          <p className="text-md text-green-600">✅ Uploaded successfully</p>
          <img
            src={uploadedUrl}
            alt="Uploaded preview"
            className="mt-2 max-w-xs rounded-md border"
          />
        </div>
      )}
    </div>
  );
}
