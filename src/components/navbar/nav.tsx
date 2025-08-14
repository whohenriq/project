import { Home, Star, Film, Upload } from "lucide-react";
import { NavItem } from "./nav-item";
import { useAuth } from "@/hooks/useAuth";

export function Nav() {
  const { user, isAdmin } = useAuth();

  return (
    <nav className="hidden md:flex items-center space-x-6 ml-8">
      <NavItem href="/" text="Início" icon={<Home className="h-4 w-4" />} />

      <NavItem
        href="/movies"
        text="Filmes"
        icon={<Film className="h-4 w-4" />}
      />

      {user && !isAdmin && (
        <NavItem
          href="/reviews"
          text="Meus Reviews"
          icon={<Star className="h-4 w-4" />}
        />
      )}

      {isAdmin && (
        <NavItem
          href="/admin/upload-movie"
          text="Upload Filme"
          icon={<Upload className="h-4 w-4" />}
        />
      )}
    </nav>
  );
}
