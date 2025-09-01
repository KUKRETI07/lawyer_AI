import React from "react";
import { motion } from "framer-motion";

export default function Splash({ onComplete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight"
          style={{ color: "white", textShadow: "0 8px 30px rgba(0,0,0,0.6)" }}
        >
          Lawyer AI assistant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-lg text-gray-300"
        >
          Fast legal answers, drafts and research — powered by your model.
        </motion.p>

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => onComplete()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full font-medium"
            style={{
              background: "linear-gradient(90deg,#6d28d9,#06b6d4)",
              color: "white",
              boxShadow: "0 8px 30px rgba(7,10,25,0.6)",
            }}
          >
            Enter
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-sm text-gray-400"
        >
          <div>or press <span className="px-2 py-1 rounded bg-white/5">Enter</span></div>
        </motion.div>
      </motion.div>
    </div>
  );
}
