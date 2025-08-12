import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavItem({
  href,
  icon,
  text,
  className,
}: {
  href: string;
  icon?: React.ReactNode;
  text: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-1 text-gray-300 hover:text-white transition-colors",
        className
      )}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
