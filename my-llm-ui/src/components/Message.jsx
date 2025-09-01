import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Message({ message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`${isUser ? "bg-[#082036]" : "bg-[#071122]"} p-3 rounded-lg max-w-[80%] border border-white/3`}>
        <div className="text-sm whitespace-pre-wrap message-markdown text-gray-100">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-white/5 px-1 rounded">{children}</code>
                );
              }
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
        <div className="mt-2 text-xs flex justify-end gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(message.text)}
            className="p-1 rounded hover:bg-white/5 text-gray-300"
            title="Copy"
          >
            <Copy size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
