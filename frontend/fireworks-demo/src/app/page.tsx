// File: src/app/page.tsx

"use client";

import React, { useState } from "react";

// A simple ChatBubble component for messages
function ChatBubble({ role, content }: { role: string; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm break-words ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      setMessages((old) => [
        ...old,
        { role: "user", content: input },
        { role: data.role, content: data.content },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    // A full-viewport container with a gradient background
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center py-8 px-4">
      {/* Card-like container for the chat */}
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full flex flex-col p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Fireworks Chat
        </h1>

        {/* Chat messages area */}
        <div className="flex-1 overflow-auto mb-4" style={{ minHeight: "300px" }}>
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} role={msg.role} content={msg.content} />
          ))}
        </div>

        {/* Input + Button row */}
        <div className="flex items-center space-x-2">
          <input
	    style={{ color: "black" }}
            className="flex-grow border border-gray-300 rounded-md p-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

