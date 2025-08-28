"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { UserDetails, Subscription } from "../../types";

type UserContextType = {
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
  tokenBalance: number | null;
  loading: boolean;
  setTokenBalance: (balance: number) => void;
  refetchUserDetails: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const getTokenBalance = async () => {
    // Replace this with actual API call
    setTokenBalance(10);
  };
   
  const supabase = createClient();
  const loadUser = async () => {
    
    const { data: sessionUser } = await supabase.auth.getUser();
    setUser(sessionUser?.user ?? null);

    if (!sessionUser?.user) {
      setLoading(false);
      return;
    }
  console.log("session user in use user ************", sessionUser)
    // Fetch profile and subscription
    const { data: userDetailData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", sessionUser.user.id)
      .single();

    setUserDetails(userDetailData);

    const { data: subData } = await supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"]);

    setSubscription(subData?.[0] ?? null);

    await getTokenBalance();
    setLoading(false);
  };

  useEffect(() => {
    loadUser();

    // Listen to auth state changes (login, logout)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const refetchUserDetails = async () => {
    setLoading(true);
    await loadUser();
  };

  return (
    <UserContext.Provider
      value={{ user, userDetails, subscription, tokenBalance, loading, setTokenBalance, refetchUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};
