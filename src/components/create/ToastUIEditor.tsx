'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePrint, ImageItem } from "@/context/PrintProvider";

// Dynamic import with SSR disabled
const ImageEditor = dynamic(() => import("@toast-ui/react-image-editor"), {
  ssr: false,
});

// Light theme
const lightTheme = {
  "common.backgroundColor": "#f7f7f7",
  "common.borderColor": "#ddd",
  "common.color": "#333",
  "header.backgroundColor": "#ffffff",
  "header.borderColor": "#e1e1e1",
  "header.color": "#333",
  "menu.normalIcon.color": "#555",
  "menu.activeIcon.color": "#1a73e8",
  "menu.hoverIcon.color": "#1a73e8",
  "menu.disabledIcon.color": "#ccc",
  "menu.iconSize": 24,
  "submenu.backgroundColor": "#fff",
  "submenu.partition.color": "#e1e1e1",
  "submenu.normalLabel.color": "#333",
  "submenu.activeLabel.color": "#1a73e8",
  "button.backgroundColor": "#fff",
  "button.borderColor": "#ddd",
  "button.color": "#333",
  "button.hover.backgroundColor": "#f0f0f0",
  "button.hover.borderColor": "#ccc",
  "selectionStyle.borderColor": "#1a73e8",
  "selectionStyle.cornerColor": "#ffffff",
  "selectionStyle.cornerStrokeColor": "#1a73e8",
  "selectionStyle.rotatingPointColor": "#1a73e8",
};

export default function ToastUIEditor() {
  const { currentImage } = usePrint();
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load image into editor
  const loadImage = async (imgUrl: string) => {
    if (!editorInstance || !imgUrl) return;

    setLoading(true);
    try {
      await editorInstance.loadImageFromURL(imgUrl, "Edited Image");
      console.log("Image loaded successfully:", imgUrl);
    } catch (err) {
      console.error("Failed to load image:", err);
      toast.error("Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  // Load current image when editor instance is ready
  useEffect(() => {
    if (editorInstance && currentImage?.url) {
      loadImage(currentImage.url);
    }
  }, [editorInstance, currentImage?.url]);

  return (
    <div className="relative w-full h-full border rounded-xl overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 text-white font-semibold">
          Loading...
        </div>
      )}

      <ImageEditor
        includeUI={{
          loadImage: { path: currentImage?.url || "", name: "Initial" },
          theme: lightTheme,
          menu: ["crop", "flip", "rotate", "draw", "shape", "filter", "text", "mask"], // no load/download
          initMenu: "",
          uiSize: { width: "100%", height: "100%" },
          menuBarPosition: "bottom",
          loadCallback: (instance: any) => {
            const editor = instance.getInstance();
            setEditorInstance(editor);

            // Remove Load button
            const headerButtons = document.querySelector('.tui-image-editor-header-buttons');
            if (headerButtons) {
              const loadBtnDiv = headerButtons.querySelector('div'); // first div = load
              if (loadBtnDiv) loadBtnDiv.remove();

              const downloadBtn = headerButtons.querySelector('.tui-image-editor-download-btn');
              if (downloadBtn) downloadBtn.remove();
            }
          },
        }}
        cssMaxHeight={600}
        cssMaxWidth={900}
        selectionStyle={{ cornerSize: 20, rotatingPointOffset: 70 }}
        usageStatistics={false}
      />
    </div>
  );
}
