import React, { useMemo, useRef, useEffect } from "react";
import { useChatStore } from "../stores/chatStore";
import Message from "./Message";
import Composer from "./Composer";

export default function ChatWindow() {
  const convs = useChatStore((s) => s.conversations);
  const activeId = useChatStore((s) => s.activeId);
  const conv = useMemo(() => convs.find((c) => c.id === activeId), [convs, activeId]);
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conv?.messages?.length]);

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col panel p-0 overflow-hidden rounded-lg">
      <div className="p-4 border-b border-white/6 bg-transparent">
        <div className="text-sm text-gray-300">Conversation • {conv?.title}</div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {conv?.messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-white/6">
        <Composer />
      </div>
    </div>
  );
}
