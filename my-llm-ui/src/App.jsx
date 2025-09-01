import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import SettingsModal from "./components/SettingsModal";
import Splash from "./components/Splash";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleEnter = () => {
    // animate out splash then reveal chat
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen flex">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Splash onComplete={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat UI - fade in when splash gone */}
      <AnimatePresence>
        {!showSplash && (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex"
          >
            <Sidebar />
            <main className="flex-1 flex flex-col">
              <header className="flex items-center justify-between px-6 py-4 border-b panel">
                <h1 className="text-lg font-semibold">Lawyer AI assistant</h1>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded bg-transparent hover:bg-white/5 text-sm">Settings</button>
                </div>
              </header>

              <div className="flex-1 p-6">
                <ChatWindow />
              </div>
            </main>

            <SettingsModal />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
