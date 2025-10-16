"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Tab } from "../../lib/constants";

interface SidebarTab {
  id: Tab;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface AppSidebarProps {
  tabs: readonly SidebarTab[];
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;
  toggleDrawer?: () => void;
}

export default function AppSidebar({
  tabs,
  selectedTab,
  onSelectTab,
  toggleDrawer,
}: AppSidebarProps) {
  const isMobile = useIsMobile();

  return (
    <nav
      className={`${
        isMobile
          ? "fixed bottom-0 left-0 right-0 h-16 flex justify-around bg-white border-t shadow-md z-50"
          : "h-[91vh] bg-white flex flex-col justify-center"
      }`}
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = selectedTab === id;

        return (
          <button
            key={id}
            onClick={() => {
              onSelectTab(id);
              if (isMobile && toggleDrawer) toggleDrawer();
            }}
            className={`relative flex items-center justify-center gap-2 transition-colors
              ${isMobile ? "flex-col py-2 w-full" : "py-6 w-full text-left"}
              ${isActive ? "font-bold text-gray-900" : "text-gray-600 hover:bg-gray-100"}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-highlight"
                className={`absolute inset-0 ${isMobile ? "rounded-t-lg" : "rounded-l-lg"} bg-secondary`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <div className="flex flex-col items-center justify-center gap-1 relative z-10">
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
