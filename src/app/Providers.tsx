"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { MyUserContextProvider } from "../hooks/useUser";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <MyUserContextProvider>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: "bg-gray-800 text-white",
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </MyUserContextProvider>
    </SessionContextProvider>
  );
}
