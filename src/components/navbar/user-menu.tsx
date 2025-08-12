import { UserIcon, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { User } from "@/types/uset";
import { NavItem } from "./nav-item";

interface UserMenuProps {
  user: User | null;
  onSignOut: () => void;
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  return (
    <nav className="hidden md:flex items-center space-x-4">
      {user ? (
        <>
          <NavItem
            href="/profile"
            text="Perfil"
            icon={<UserIcon className="h-5 w-5" />}
          />

          <Button
            onClick={onSignOut}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </Button>
        </>
      ) : null}
    </nav>
  );
}
