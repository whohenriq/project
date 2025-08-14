"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithEmail: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSupabaseUser(supabaseUser: any): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    username:
      supabaseUser.user_metadata?.user_name ||
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.email?.split("@")[0] ||
      "unknown",
    avatar: supabaseUser.user_metadata?.avatar_url || undefined,
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(mapSupabaseUser(user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(mapSupabaseUser(session.user));
        } else {
          setUser(null);
        }
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "valid.email@supabase.io",
      password: "example-password",
    });
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setIsLoading(false);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });
    if (error) throw error;
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signOut, isLoading, signInWithEmail, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
