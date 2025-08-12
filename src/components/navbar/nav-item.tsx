import Link from "next/link";

export function NavItem({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
