'use client'
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {mergeRefs} from "react-merge-refs";

import { cn } from "@/lib/utils";
import LoadingDots from "@components/ui/LoadingDots"; // adjust import path

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-navy text-warm-white hover:bg-navy-light transform hover:scale-105 hover:shadow-lg font-semibold tracking-wide",
        gold: "gold-gradient text-navy hover:shadow-lg transform hover:scale-105 font-semibold tracking-wide",
        premium: "bg-gradient-to-r from-gold to-accent text-navy hover:shadow-lg hover:shadow-gold/25 transform hover:scale-105 font-semibold",
        slim: "px-3 py-1 text-sm rounded-md",
        flat: "px-4 py-2 text-sm rounded-2xl"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-xl px-12 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  active?: boolean;
  width?: number | string;
  loading?: boolean;
  Component?: React.ElementType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, active, width, loading = false, Component, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Component || "button";
    const combinedRef = mergeRefs([ref as any]);

    return (
      <Comp
        ref={combinedRef}
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ width: width, ...props.style }}
        aria-pressed={active}
        disabled={props.disabled || loading}
        {...props}
      >
        {children}
        {loading && (
          <span className="pl-2 flex items-center">
           <LoadingDots className="text-gold" size="sm" />
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
