import type { ComponentType } from "react";

// ---- ENUM-LIKE UNION TYPES ----
export type Orientation = "portrait" | "landscape" | "square";
export type Category = "print" | "acrylic" | "canvas";
export type Size = "small" | "medium" | "large";
export type Tab = "edit" | "history" | "print" | "cart";

// ---- DATA MODELS ----
export interface SizeOption {
  id: Size;
  name: string;
  dimensions: string;
  price: number;
}

export interface CategoryConfig {
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  orientations: Orientation[];
  sizes: Record<Orientation, SizeOption[]>;
}

export interface CartItem {
  image: string;
  orientation: Orientation;
  category: Category;
  size: Size;
}

export interface PrintContext {
  currentImage: string | null;
  orientation: Orientation;
  category: Category;
  size: Size;
  cart: CartItem[];
}
