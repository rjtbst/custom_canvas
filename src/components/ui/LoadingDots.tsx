"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type DotSize = "sm" | "md" | "lg" | number;

export interface LoadingDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** sm (0.375rem), md (0.5rem), lg (0.625rem), or a number (px) */
  size?: DotSize;
  /** aria-label for screen readers */
  label?: string;
}

const sizeMap: Record<Exclude<DotSize, number>, string> = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.625rem",
};

export default function LoadingDots({
  size = "md",
  label = "Loading",
  className,
  style,
  ...props
}: LoadingDotsProps) {
  const dotSize =
    typeof size === "number" ? `${size}px` : sizeMap[size] || sizeMap.md;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn("loading-dots", className)}
      style={{ ...(style || {}), ["--dot-size" as any]: dotSize }}
      {...props}
    >
      <span />
      <span />
      <span />
      <span className="sr-only">{label}</span>
    </div>
  );
}
