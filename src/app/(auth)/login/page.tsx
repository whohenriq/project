"use client";

import { supabase } from "@/lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { AnimatePresence, motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key="login-box"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
        >
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            dark
            redirectTo="/"
            socialLayout="horizontal"
            showLinks={false}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
