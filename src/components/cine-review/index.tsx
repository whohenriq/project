import { motion } from "framer-motion";
import { Film } from "lucide-react";
import Link from "next/link";

export function CineReview() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
        <Film className="h-8 w-8 text-red-500 group-hover:text-red-400 transition-colors" />
      </motion.div>
      <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
        CineReview
      </span>
    </Link>
  );
}
