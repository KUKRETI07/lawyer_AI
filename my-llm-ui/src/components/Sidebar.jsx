import React from "react";
import { useChatStore } from "../stores/chatStore";
import { Plus } from "lucide-react";

export default function Sidebar() {
  const convs = useChatStore((s) => s.conversations);
  const active = useChatStore((s) => s.activeId);
  const setActive = useChatStore((s) => s.setActive);
  const newConv = useChatStore((s) => s.newConversation);

  return (
    <aside className="w-72 bg-[#071025] panel border-r border-white/6 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-100">Conversations</h2>
        <button onClick={() => newConv()} className="p-1 rounded hover:bg-white/5">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {convs.map((c) => (
          <div
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`p-3 rounded cursor-pointer ${c.id === active ? "bg-[#091224] shadow" : "hover:bg-white/2"}`}
          >
            <div className="text-sm font-medium text-gray-100">{c.title}</div>
            <div className="text-xs text-gray-400">
              {c.messages.length ? `${c.messages.length} messages` : "empty"}
            </div>
          </div>
        ))}
      </div>

      <footer className="text-xs text-gray-500">Local demo • Dark mode</footer>
    </aside>
  );
}
