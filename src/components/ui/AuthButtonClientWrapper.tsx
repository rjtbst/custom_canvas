// AuthButtonWrapper.tsx (client)
"use client";

import { AuthButton } from "../auth/AuthButton";

export function AuthButtonClientWrapper() {
  return <AuthButton />; // Safe: server component rendered inside client wrapper
}
