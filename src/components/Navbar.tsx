"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { AuthButton } from "@/components/auth/AuthButton";
import { MobileMenu } from "./MobileMenu";
import { useUser } from "@/context/UserContext";
import classNames from "classnames";

// Define a type for nav items
export type NavItem = {
  name: string;
  href: string;
  authRequired?: boolean; // only show if user is logged in
};

export default function Navbar() {
  const { user } = useUser();

  // Desktop navigation
  const desktopNavItems: NavItem[] = [
    { name: "Create", href: "/create", authRequired: true },
    { name: "Orders", href: "/orders", authRequired: true },
    { name: "Account", href: "/account", authRequired: true },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full border-b fixed top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-primary">
          CustomCanvas
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              {desktopNavItems
                .filter(item => !item.authRequired || user)
                .map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={classNames(
                      "px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <AuthButton />
        </div>

        {/* Mobile Navigation */}
        <MobileMenu navItems = {desktopNavItems} userId={user?.id}/>
      </div>
    </nav>
  );
}
