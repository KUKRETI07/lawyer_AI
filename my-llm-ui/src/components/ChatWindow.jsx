import React, { useState } from "react";
import { callChat } from "../utils/api"; // backend function
import Message from "./Message";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // handle sending user message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // call backend API
      const reply = await callChat(userMessage.text);

      const botMessage = { role: "assistant", text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        role: "assistant",
        text: "⚠️ Error: Could not reach backend.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} text={msg.text} />
        ))}
        {loading && (
          <div className="text-gray-400 italic">AI is thinking...</div>
        )}
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-700">
        <textarea
          className="w-full p-2 rounded bg-gray-800 text-white resize-none"
          rows={2}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </div>
    </div>
  );
}
