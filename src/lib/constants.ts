import { Printer, Image as ImageIcon,History,Edit, Frame,Pencil,ShoppingCart } from "lucide-react";
import type { CategoryConfig } from "./types";

export const pricingConfig: Record<"print" | "acrylic" | "canvas", CategoryConfig> = {
  print: {
    name: "Photo Prints",
    description: "Classic prints on premium paper",
    icon: Printer,
    orientations: ["portrait", "landscape", "square"],
    sizes: {
      portrait: [
        { id: "small", name: "Small", dimensions: "6x8", price: 10 },
        { id: "medium", name: "Medium", dimensions: "8x12", price: 20 },
        { id: "large", name: "Large", dimensions: "12x18", price: 35 },
      ],
      landscape: [
        { id: "small", name: "Small", dimensions: "8x6", price: 10 },
        { id: "medium", name: "Medium", dimensions: "12x8", price: 20 },
        { id: "large", name: "Large", dimensions: "18x12", price: 35 },
      ],
      square: [
        { id: "small", name: "Small", dimensions: "8x8", price: 12 },
        { id: "medium", name: "Medium", dimensions: "12x12", price: 22 },
        { id: "large", name: "Large", dimensions: "16x16", price: 40 },
      ],
    },
  },
  acrylic: {
    name: "Acrylic Frames",
    description: "High-quality photo prints on premium acrylic glass",
    icon: ImageIcon,
    orientations: ["portrait", "landscape", "square"],
    sizes: {
      portrait: [
        { id: "small", name: "Small", dimensions: "8x10", price: 20 },
        { id: "medium", name: "Medium", dimensions: "11x14", price: 30 },
        { id: "large", name: "Large", dimensions: "16x20", price: 55 },
      ],
      landscape: [
        { id: "small", name: "Small", dimensions: "10x8", price: 20 },
        { id: "medium", name: "Medium", dimensions: "14x11", price: 30 },
        { id: "large", name: "Large", dimensions: "20x16", price: 55 },
      ],
      square: [
        { id: "small", name: "Small", dimensions: "10x10", price: 25 },
        { id: "medium", name: "Medium", dimensions: "14x14", price: 40 },
        { id: "large", name: "Large", dimensions: "20x20", price: 65 },
      ],
    },
  },
  canvas: {
    name: "Canvas Prints",
    description: "Museum-quality canvas with various mounting options",
    icon: Frame,
    orientations: ["portrait", "landscape", "square"],
    sizes: {
      portrait: [
        { id: "small", name: "Small", dimensions: "12x16", price: 45 },
        { id: "medium", name: "Medium", dimensions: "16x20", price: 65 },
        { id: "large", name: "Large", dimensions: "20x24", price: 95 },
      ],
      landscape: [
        { id: "small", name: "Small", dimensions: "16x12", price: 45 },
        { id: "medium", name: "Medium", dimensions: "20x16", price: 65 },
        { id: "large", name: "Large", dimensions: "24x20", price: 95 },
      ],
      square: [
        { id: "small", name: "Small", dimensions: "12x12", price: 40 },
        { id: "medium", name: "Medium", dimensions: "16x16", price: 60 },
        { id: "large", name: "Large", dimensions: "20x20", price: 90 },
      ],
    },
  },
};

import { ComponentType, SVGProps } from "react";

// Tab object type

export type Tab = "edit" | "history" | "print" | "cart";

export interface SidebarTab {
  id: Tab;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const TABS: readonly SidebarTab[] = [
  { id: "edit", label: "Edit", icon: Edit },
  { id: "history", label: "History", icon: History },
  { id: "print", label: "Print", icon: Printer },
  { id: "cart", label: "Cart", icon: ShoppingCart },
] as const;



export const edit_templates = [
    {
      id:0,
      name:"Repair",
      prompt:`Repair photo damage like scratches, torn areas or missing parts, dust, and folds, creases, uneven textures, and other surface damages or missing areas,
      Enhance resolution and texture so the image looks like it was taken today with a modern high-quality camera.
      enhance cloth details
      Preserve all original details, expression, skintone, and background
      do not change identity or appearance
      Restore original color
      `,
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
    {
      id:1,
      name:"Enhance",
      prompt:"Improve image quality",
      image:["/images/enhance_before.jpg","/images/enhance_after.png"],
      model:'context'
    },
    {
      id:2,
      name:"Colorize",
      prompt:"Add color to black and white images",
      image:["/images/colorize_before.png","/images/colorize_after.png"],
      model:'context'
    },
    {
      id:3,
      name:"transform weather",
      prompt:"Transform images into weather-themed art",
      image:["/images/before_sunrise.jpg","/images/after_sunrise.png"],
      model:'context'
    },
    {
      id:4,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
     {
      id:5,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
     {
      id:6,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
     {
      id:7,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
     {
      id:8,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
     {
      id:9,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
     {
      id:10,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    },
     {
      id:11,
      name:'Oil Painting ',
      prompt:'Transform images into oil paintings',
      image:["/images/repair_before.jpeg","/images/repair_after.png"],
      model:'context'
    }
  ]

export type TypeEditTemplate = {
  id: number; 
  name: string;
  prompt: string;
  image: string[];
  model: string;
}


export const admins = [
  'user_1',
  'user_2',
  'user_3'
];

