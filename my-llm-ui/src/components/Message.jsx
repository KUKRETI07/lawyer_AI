import React from "react";

export default function Message({ role, text }) {
  const isUser = role === "user";
  return (
    <div
      className={`p-3 rounded-lg max-w-xl ${
        isUser
          ? "bg-blue-600 text-white self-end ml-auto"
          : "bg-gray-700 text-white self-start"
      }`}
    >
      {text}
    </div>
  );
}
