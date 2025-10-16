"use client";

import Image from "next/image";
import { usePrint } from "@/context/PrintProvider";


export default function PrintPreview() {
  const { currentImage, category, orientation, size } = usePrint();
console.log("Render PrintPreview with:", { currentImage, category, orientation, size });
  if (!currentImage || !currentImage.url) return null;

  

 
  return (
  <div className="relative h-[90vh] rounded-md ">
  <Image
    src={currentImage.url}
    alt="User photo"
    fill
    className="object-contain rounded-md"
  />
</div>

  
  );
}
