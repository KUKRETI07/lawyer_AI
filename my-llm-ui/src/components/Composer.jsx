import React, { useState } from "react";
import { useChat } from "../hooks/useChat";
import { useChatStore } from "../stores/chatStore";

export default function Composer() {
  const [text, setText] = useState("");
  const { send } = useChat();
  const settings = useChatStore((s) => s.settings);

  const onSend = async () => {
    if (!text.trim()) return;
    await send(text);
    setText("");
  };

  return (
    <div className="flex items-end gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="Ask legal questions, draft clauses, or request research..."
        className="flex-1 bg-[#071225] text-gray-100 border border-white/6 rounded p-3 resize-none placeholder:text-gray-500"
      />
      <div className="flex flex-col items-end gap-2">
        <div className="text-xs text-gray-400 px-2">Temp: {settings.temperature}</div>
        <button onClick={onSend} className="bg-gradient-to-r from-[#6d28d9] to-[#06b6d4] text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
