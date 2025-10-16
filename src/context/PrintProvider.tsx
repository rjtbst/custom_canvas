"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

type Orientation = "portrait" | "landscape" | "square";
type Category = "print" | "acrylic" | "canvas";
type Size = "small" | "medium" | "large";

export interface ImageItem {
  path: string;      // permanent S3 key
  url?: string;      // signed URL (handled by backend)
}

export interface CartItem {
  id: string;
  path: string;
  url?: string;      // 7-day signed URL
  orientation: Orientation;
  category: Category;
  size: Size;
  quantity: number;
}

export interface PrintContextType {
  currentImage: ImageItem | null;
  orientation: Orientation;
  category: Category;
  size: Size;
  cart: CartItem[];
  imageStack: ImageItem[];
  setCurrentImage: (img: ImageItem | null) => void;
  setOrientation: (o: Orientation) => void;
  setCategory: (c: Category) => void;
  setSize: (s: Size) => void;
  setImageStack: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  addToCart: () => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  incrementQuantity: (id: string) => Promise<void>;
  decrementQuantity: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const PrintContext = createContext<PrintContextType | undefined>(undefined);
const STORAGE_KEY = "printState";

export const PrintProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [currentImage, setCurrentImage] = useState<ImageItem | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [category, setCategory] = useState<Category>("acrylic");
  const [size, setSize] = useState<Size>("medium");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [imageStack, setImageStack] = useState<ImageItem[]>([]);

  /** Load state from localStorage on mount */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    setCurrentImage(parsed.currentImage || null);
    setOrientation(parsed.orientation || "portrait");
    setCategory(parsed.category || "acrylic");
    setSize(parsed.size || "medium");
    setImageStack(parsed.imageStack || []);
    setCart(parsed.cart || []);
  }, []);

  /** Persist state to localStorage (without URLs) */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentImage: currentImage ? { path: currentImage.path } : null,
        orientation,
        category,
        size,
        imageStack: imageStack.map(i => ({ path: i.path })),
        cart: cart.map(c => ({ ...c, url: undefined })),
      })
    );
  }, [currentImage, orientation, category, size, imageStack, cart]);

  /** Cart operations */
  const addToCart = async () => {
    if (!currentImage?.path) return;

    // Prevent duplicates
    const exists = cart.find(c => c.path === currentImage.path);
    if (exists) return;

    const newItem: CartItem = {
      id: Date.now().toString(),
      path: currentImage.path,
      url: currentImage.url, // trust backend-provided URL
      orientation,
      category,
      size,
      quantity: 1,
    };

    setCart(prev => [...prev, newItem]);

    if (user?.id) {
      try {
        await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
      } catch (err) {
        console.error("Failed to add cart item via API:", err);
      }
    }
  };

  const updateCartItem = async (id: string, updatedFields: Partial<CartItem>) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    if (user?.id) {
      try {
        await fetch("/api/cart/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, ...updatedFields }),
        });
      } catch (err) {
        console.error("Failed to update cart item via API:", err);
      }
    }
  };

  const removeFromCart = async (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    if (user?.id) {
      try {
        await fetch("/api/cart/remove", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
      } catch (err) {
        console.error("Failed to remove cart item via API:", err);
      }
    }
  };

  const incrementQuantity = async (id: string) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    await updateCartItem(id, { quantity: item.quantity + 1 });
  };

  const decrementQuantity = async (id: string) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    await updateCartItem(id, { quantity: Math.max(item.quantity - 1, 1) });
  };

  const clearCart = async () => {
    setCart([]);
    if (user?.id) {
      try {
        await fetch("/api/cart/clear", { method: "DELETE" });
      } catch (err) {
        console.error("Failed to clear cart via API:", err);
      }
    }
  };

  return (
    <PrintContext.Provider
      value={{
        currentImage,
        orientation,
        category,
        size,
        cart,
        imageStack,
        setCurrentImage,
        setOrientation,
        setCategory,
        setSize,
        setImageStack,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </PrintContext.Provider>
  );
};

export const usePrint = () => {
  const ctx = useContext(PrintContext);
  if (!ctx) throw new Error("usePrint must be used inside PrintProvider");
  return ctx;
};
