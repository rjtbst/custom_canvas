"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface FileUploaderProps {
  userId: string;
}

interface MediaFile {
  name: string;
  updated_at: string;
  // any other Supabase file metadata
}

export default function FileUploader({ userId }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<MediaFile[]>([]);

  // Upload file via server API
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!userId) {
      setError("User ID missing");
      return;
    }

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

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setUploadedUrl(data.url);
      toast.success("Uploaded successfully!");
      fetchMedia(); // refresh media
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  }

  // Fetch user's media list from server
  async function fetchMedia() {
    try {
      const res = await fetch(`/api/getMyImages?userId=${userId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch media");
      setMedia(data.files);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : String(err));
    }
  }

  useEffect(() => {
    if (!userId) return;
    fetchMedia();
  }, [userId]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full rounded-md border border-gray-300 shadow-sm text-md
          file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:text-white
          hover:file:bg-accent/90"
      />

      {uploading && <p className="text-md text-gray-500">Uploading...</p>}
      {error && <p className="text-md text-red-500">{error}</p>}

      {uploadedUrl && (
        <div>
          <p className="text-md text-green-600">✅ Uploaded successfully</p>
          <Image
            src={uploadedUrl}
            alt="Uploaded preview"
            width={300}
            height={300}
            className="mt-2 max-w-xs rounded-md border"
          />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
{media.map((m) => (
    <div key={m.name} className="border rounded-md overflow-hidden">
      <Image
        alt={m.name}
        src={m.url} // <- use signed URL returned from backend
        width={200}
        height={200}
        className="object-cover"
      />
    </div>
  ))}
      </div>
    </div>
  );
}
