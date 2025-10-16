"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Frame } from "lucide-react";
import Image from "next/image";
import galleryWall from "@/assets/gallery-wall.jpg";

import { Tab } from "../../lib/constants";
import { usePrint } from "@/context/PrintProvider";
import { pricingConfig } from "../../lib/constants";
import type { CategoryConfig } from "@/lib/types";

interface PrintOptionsProps {
  variant?: "landing" | "tab";
  selectedTab?: Tab;
  onSelectTab?: (tab: Tab) => void;
}

const PrintOptions = ({
  variant = "landing",
  selectedTab,
  onSelectTab,
}: PrintOptionsProps) => {
  const {
    category,
    setCategory,
    currentImage,
    addToCart,
    orientation,
    setOrientation,
    size,
    setSize,
  } = usePrint();

  const categoryConfig = pricingConfig[category];
  const sizes = categoryConfig.sizes[orientation];
  const getPrice = () => sizes.find((s) => s.id === size)?.price || 0;

  const isLanding = variant === "landing";

  return (
    <section
      className={`rounded-xl flex  justify-center ${
        isLanding ? "px-6 md:px-12 py-12 items-center" : ""
      }`}
    >
      <div className={`${isLanding ? "container mx-auto" : "w-full"}`}>
        {/* HEADER (Landing Only) */}
        {isLanding && (
          <div className="text-center mb-12 fade-in-up">
            <div className="flex items-center justify-center gap-2 text-accent mb-4">
              <Frame className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Premium Printing
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Explore Print Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our premium print options. Each piece is crafted using
              the highest quality materials and professional printing
              techniques.
            </p>
          </div>
        )}

        <div
          className={`${
            isLanding ? "grid lg:grid-cols-2 gap-12" : "flex flex-col gap-6"
          }`}
        >
          {/* LEFT SIDE IMAGE (Landing Only) */}
          {isLanding && (
            <div className="fade-in-left">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                <Image
                  width={50}
                  height={50}
                  src={galleryWall.src}
                  alt="Beautiful gallery wall"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent">
                  <div className="absolute bottom-6 left-6 text-warm-white">
                    <h3 className="text-xl font-semibold mb-2">
                      Gallery Wall Collection
                    </h3>
                    <p className="text-sm opacity-90">
                      Mix and match different sizes for the perfect display
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT SIDE CONFIG */}
          <div className={`space-y-6 ${isLanding ? "fade-in-right" : ""}`}>
            {/* CATEGORY SELECTION */}
            <div className="space-y-4">
              <div
                className={`${
                  isLanding
                    ? "grid grid-cols-1 gap-3"
                    : "flex items-center justify-center gap-2 flex-wrap"
                }`}
              >
                {(Object.entries(pricingConfig) as [
                  keyof typeof pricingConfig,
                  CategoryConfig
                ][]).map(([id, cat]) => (
                  <Button
                    key={id}
                    variant="outline"
                    onClick={() => setCategory(id)}
                    className={`py-6 rounded-xl border-2 transition-all text-left ${
                      category === id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon
                        className={`w-5 h-5 ${
                          category === id
                            ? "text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                      <div>
                        <div className="font-medium text-navy">{cat.name}</div>
                        {isLanding && (
                          <div className="text-sm text-muted-foreground">
                            {cat.description}
                          </div>
                        )}
                      </div>
                      {category === id && (
                        <Check className="w-5 h-5 text-accent ml-auto" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* ORIENTATION */}
            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-navy text-center">Orientation</h4>
              <div className="flex gap-2 justify-center flex-wrap">
                {categoryConfig.orientations.map((o) => (
                  <Badge
                    key={o}
                    variant={orientation === o ? "default" : "outline"}
                    className="cursor-pointer text-sm font-medium px-4 py-1 rounded-3xl"
                    onClick={() => setOrientation(o)}
                  >
                    {o}
                  </Badge>
                ))}
              </div>
            </div>

            {/* SIZE OPTIONS */}
            <div className="space-y-4">
              <h3 className="text-xl text-center font-semibold text-navy">Select Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((s) => (
                  <Button
                    key={s.id}
                    variant="outline"
                    onClick={() => setSize(s.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      size === s.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="font-medium text-navy text-sm">{s.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {s.dimensions}
                    </div>
                    <div className="text-sm font-semibold text-accent mt-2">
                      ₹{s.price}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* PRICE + BUTTON */}
            <div className="bg-card p-4 rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-navy">
                  Total Price
                </span>
                <span className="text-2xl font-bold text-accent">
                  ₹{getPrice()}
                </span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex justify-between">
                  <span>
                    Base Price ({size}, {orientation})
                  </span>
                  <span>₹{getPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <Button
                variant="premium"
                size="lg"
                className="w-full"
                disabled={!currentImage}
                onClick={async () => {
                  await addToCart();
                  onSelectTab && onSelectTab("cart");
                }}
              >
                Customize & Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintOptions;
