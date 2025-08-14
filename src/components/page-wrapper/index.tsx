"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedUploadMoviePage({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/unauthorized");
      } else {
        setAllowed(true); 
      }
    }
  }, [user, isAdmin, isLoading, router]);

  if (!allowed) {
    return <p>...</p>; 
  }

  return <>{children}</>;
}
