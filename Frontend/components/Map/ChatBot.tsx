"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatBot({ showChat, setShowChat }: any) {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Hello! How can I help you with plots or locations today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `You said: "${input}". I'm a simple bot for now.` }
      ]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Chat toggle button */}
      <div className="absolute bottom-6 right-6 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center text-xl font-bold"
        >
          💬
        </button>
      </div>

      {/* Chat window */}
      {showChat && (
        <div className="absolute bottom-20 right-6 bg-white w-80 h-96 shadow-xl rounded-lg p-4 z-50 flex flex-col">
          <h3 className="text-blue-700 font-semibold mb-2">ChatBot</h3>

          {/* Messages container */}
          <div className="flex-grow overflow-y-auto border p-2 rounded text-sm text-gray-700 flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-2 py-1 rounded max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow border rounded-l px-2 py-1 focus:outline-none text-black"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 rounded-r hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
