import { Home, Star, Film } from "lucide-react";
import { NavItem } from "./nav-item";

export function Nav() {
  return (
    <nav className="hidden md:flex items-center space-x-6 ml-8">
      <NavItem href="/" text="Início" icon={<Home className="h-4 w-4" />} />

      <NavItem
          href="/movies"
          text="Filmes"
          icon={<Film className="h-4 w-4" />}
        />

      <NavItem
          href="/reviews"
          text="Meus Reviews"
          icon={<Star className="h-4 w-4" />}
        />
    </nav>
  );
}
