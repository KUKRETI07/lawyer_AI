import { useRef } from "react";
import axios from "axios";
import { useChatStore } from "../stores/chatStore";

export function useChat() {
  const activeId = useChatStore((s) => s.activeId);
  const addMessage = useChatStore((s) => s.addMessage);
  const settings = useChatStore((s) => s.settings);
  const streamingRef = useRef(false);

  // send prompt to backend; default: mock if no BACKEND url
  const send = async (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text };
    addMessage(activeId, userMsg);

    // optimistic bot placeholder
    const placeholder = { id: Date.now() + 1, role: "bot", text: "..." };
    addMessage(activeId, placeholder);

    try {
      const backend = import.meta.env.VITE_BACKEND_URL || "";
      if (!backend) {
        // mock reply: slight delay and simulated streaming
        await new Promise((r) => setTimeout(r, 700));
        // replace last placeholder with reply
        const reply = `Mock answer for: ${text.slice(0, 120)}...`;
        addMessage(activeId, { id: Date.now() + 2, role: "bot", text: reply });
      } else {
        // real request
        // NOTE: this simple approach waits for full reply (no streaming).
        const res = await axios.post(`${backend}/chat`, {
          prompt: text,
          max_new_tokens: settings.max_new_tokens,
          temperature: settings.temperature,
          top_p: settings.top_p,
          do_sample: true,
        });
        const reply = res.data.reply || "No reply";
        addMessage(activeId, { id: Date.now() + 2, role: "bot", text: reply });
      }
    } catch (err) {
      addMessage(activeId, { id: Date.now() + 2, role: "bot", text: "Error: failed to get reply." });
      console.error(err);
    }
  };

  return { send, streaming: streamingRef.current };
}
