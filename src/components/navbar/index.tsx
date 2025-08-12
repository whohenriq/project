"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CineReview } from "../cine-review";
import { UserMenu } from "./user-menu";
import { Nav } from "./nav";

export function NavBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <CineReview />
          <Nav />
          <UserMenu user={user} onSignOut={handleSignOut} />
        </div>
      </div>
    </header>
  );
}
