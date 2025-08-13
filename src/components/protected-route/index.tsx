"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  nonAdminOnly?: boolean;     
}

export function ProtectedRoute({ children, adminOnly = false, nonAdminOnly = false }: ProtectedRouteProps) {
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

      if (adminOnly || nonAdminOnly) {
        const { data: profile } = await supabase
          .from("users")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        // if (adminOnly && !profile?.is_admin) {
        //   router.push("/"); // redireciona se não for admin
        //   return;
        // }

        // if (nonAdminOnly && profile?.is_admin) {
        //   router.push("/"); // redireciona se for admin
        //   return;
        // }
      }

      setAuthenticated(true);
      setLoading(false);
    }

    checkUser();
  }, [router, adminOnly, nonAdminOnly]);

  if (loading) return <p>Carregando...</p>;
  if (!authenticated) return null;

  return <>{children}</>;
}
