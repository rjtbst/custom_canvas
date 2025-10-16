"use client";

import Image from "next/image";

type MediaFile = {
  id: string;
  path: string;      // Supabase storage path
  url?: string;      // Signed URL
  created_at: string;
};

interface HistoryTabProps {
  media: MediaFile[];
  loading: boolean;
  onSelectImage: (img: { path: string; url?: string }) => void;
}

export default function HistoryTab({ media, loading, onSelectImage }: HistoryTabProps) {
  if (!media.length) {
    return (
      <div className="p-4 text-gray-500">
        <p>No history yet. Upload and generate images to see them here.</p>
      </div>
    );
  }

  return (
    <div className="">
      {loading && <p>Loading history...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-2 ">
        {media.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelectImage({ path: m.path, url: m.url })}
            className="cursor-pointer hover:opacity-80"
          >
          
            {m.url ? (
              <Image
                src={m.url}
                alt="User media"
                width={200}
                height={200}
                className="object-cover rounded-xl w-full"
                draggable={false}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                Loading...
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
