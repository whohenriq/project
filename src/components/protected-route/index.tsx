"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean; 
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      if (adminOnly) {
        // verifica se o usuário é admin
        const { data: profile } = await supabase
          .from("users")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        if (!profile?.is_admin) {
          router.push("/"); 
          return;
        }
      }

      setAuthenticated(true);
      setLoading(false);
    }

    checkUser();
  }, [router, adminOnly]);

  if (loading) return <p>Carregando...</p>;
  if (!authenticated) return null;

  return <>{children}</>;
}
