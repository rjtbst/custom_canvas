"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AuthButtonClientWrapper } from "./ui/AuthButtonClientWrapper";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type {NavItem} from '@/components/Navbar'

export function MobileMenu({navItems, userId}:{navItems:NavItem[], userId:string | undefined}) {
  const [open, setOpen] = useState(false);

  // const navigation = [
  //   { name: "About", href: "/about" },
  //   { name: "Contact", href: "/contact" },
  //   { name: "Pricing", href: "/pricing" },
  // ];

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-6">
          <VisuallyHidden>
            <h2>Mobile Menu</h2>{" "}
            {/* this satisfies the accessibility requirement */}
          </VisuallyHidden>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6 mt-8"
          >
            { navItems
            .filter(item=> !item.authRequired || userId)
            .map(item => 
            <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium py-2 px-3 rounded-md hover:bg-muted"
              >
                {item.name}
              </Link>
            )}            
          

            {/* Divider */}
            <hr className="my-4 border-muted" />

            {/* Auth Actions */}
            <div className="flex flex-col gap-3">
              {/* ✅ AuthButton is a server component, but wrapped cleanly */}
              <AuthButtonClientWrapper />
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
