import React, { useState } from "react";
import { useChatStore } from "../stores/chatStore";

export default function SettingsModal() {
  const [open, setOpen] = useState(false);
  const settings = useChatStore((s) => s.settings);
  const update = useChatStore((s) => s.updateSettings);

  // simple toggle via store is available but we show local open for simplicity
  return (
    <>
      <div className="fixed top-4 right-4">
        <button onClick={() => setOpen(true)} className="px-3 py-1 bg-white rounded shadow-sm">⚙️</button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>

            <label className="block text-sm mb-2">
              Temperature: {settings.temperature}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.temperature}
                onChange={(e) => update({ temperature: Number(e.target.value) })}
                className="w-full mt-2"
              />
            </label>

            <label className="block text-sm mb-2">
              top_p: {settings.top_p}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.top_p}
                onChange={(e) => update({ top_p: Number(e.target.value) })}
                className="w-full mt-2"
              />
            </label>

            <label className="block text-sm mb-4">
              Max tokens: {settings.max_new_tokens}
              <input
                type="range"
                min="16"
                max="1024"
                step="16"
                value={settings.max_new_tokens}
                onChange={(e) => update({ max_new_tokens: Number(e.target.value) })}
                className="w-full mt-2"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-1 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
