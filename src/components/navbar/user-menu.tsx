import { UserIcon, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { User } from "@/types/user";
import { NavItem } from "./nav-item";

interface UserMenuProps {
  user: User | null;
  onSignOut: () => void;
}

export function UserMenu({ user, onSignOut }: UserMenuProps) {
  return (
    <nav className="flex items-center gap-4">
      {user ? (
        <>
          <NavItem
            href="/profile"
            text="Perfil"
            icon={<UserIcon className="h-5 w-5" />}
          />

          <Button
            onClick={onSignOut}
            className="flex items-center gap-2"
            variant={"destructive"}
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </Button>
        </>
      ) : null}
    </nav>
  );
}
