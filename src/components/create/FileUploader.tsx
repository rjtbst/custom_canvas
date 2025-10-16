"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { usePrint, ImageItem } from "@/context/PrintProvider";

// Dynamically import heavy editor only on client
const ImageEditor = dynamic(() => import("@toast-ui/react-image-editor"), {
  ssr: false,
}) as any;

interface FileUploaderProps {
  userId: string | undefined;
  onUpload?: (img: ImageItem, updateImages?: boolean) => void;
}

export default function FileUploader({ userId, onUpload }: FileUploaderProps) {
  const { currentImage, setCurrentImage } = usePrint();

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [viewport, setViewport] = useState({ width: 1200, height: 800 });

  const editorRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Handle viewport size safely to prevent SSR mismatch
  useEffect(() => {
    setViewport({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // ✅ Trigger hidden file input
  const triggerFileInput = () => inputRef.current?.click();

  // ✅ Reusable upload handler
  const uploadFile = async (file: File) => {
    if (!file) return;

    try {
      setUploading(true);

      // Step 1: Request signed URL with file metadata
      const { data } = await axios.post("/api/upload", {
        userId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      const { uploadUrl, key, url, imageId } = data;
      if (!uploadUrl) throw new Error("Failed to get upload URL");

      // Step 2: Upload directly to S3
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      toast.success("Upload successful");
      
      // Set current image for preview
      setCurrentImage({ path: key, url });

      // Notify parent component
      if (onUpload) {
        onUpload({ path: key, url }, true);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle file input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  // ✅ Handle image save from editor
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);

    const editor = editorRef.current?.getInstance();
    if (!editor || !userId) {
      toast.error("Editor not ready");
      setSaving(false);
      return;
    }

    try {
      const dataURL = editor.toDataURL();
      if (!dataURL) throw new Error("No image found on canvas");

      const blob = await (await fetch(dataURL)).blob();
      const file = new File([blob], "edited-image.png", { type: "image/png" });

      await uploadFile(file);
      toast.success("Image saved!");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        const url = e.dataTransfer.getData("text/plain");
        if (file) uploadFile(file);
        else if (url) setCurrentImage({ path: url, url });
      }}
      className={`flex max-h-[90vh] flex-col gap-4 items-center ${
        currentImage?.url ? "" : "justify-center"
      } p-4 border-2 border-dashed rounded-xl w-full mx-auto`}
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            ref={inputRef}
            className="hidden"
            disabled={uploading}
          />

          <Button
            variant="gold"
            size="xl"
            className="group min-w-[200px]"
            onClick={triggerFileInput}
            disabled={uploading}
          >
            <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            {uploading ? "Uploading..." : "Upload Image"}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {currentImage?.url && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <img
                src={currentImage.url}
                alt="Preview"
                className="rounded-md border cursor-pointer max-h-[75vh] object-contain"
              />
            </DialogTrigger>

            <DialogContent className="w-full h-full p-0">
              <VisuallyHidden>
                <DialogTitle>Image Editor</DialogTitle>
              </VisuallyHidden>

              <div className="relative w-full h-full bg-white">
                <DialogClose className="absolute top-3 right-4 z-20 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">
                  X
                </DialogClose>

                {loading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 text-white font-semibold">
                    Loading...
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="absolute bottom-4 right-4 z-20 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>

                <ImageEditor
                  ref={editorRef}
                  includeUI={{
                    loadImage: { path: currentImage.url, name: "Initial" },
                    theme: {},
                    menu: [
                      "crop",
                      "flip",
                      "rotate",
                      "draw",
                      "shape",
                      "filter",
                      "text",
                      "mask",
                    ],
                    initMenu: "",
                    uiSize: {
                      width: viewport.width,
                      height: viewport.height,
                    },
                    menuBarPosition: "bottom",
                  }}
                  cssMaxHeight={viewport.height}
                  cssMaxWidth={viewport.width}
                  selectionStyle={{ cornerSize: 20, rotatingPointOffset: 70 }}
                  usageStatistics={false}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </motion.div>
  );
}