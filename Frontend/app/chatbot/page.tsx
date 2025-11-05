"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput("");

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });

  const data = await response.json();
  setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
};


  // Simple AI logic (you can enhance this later)
  const getBotResponse = (message: string): string => {
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi"))
      return "👋 Hello there! How can I assist you with your farm today?";
    if (msg.includes("weather"))
      return "☀️ The weather is looking great for farming today!";
    if (msg.includes("water"))
      return "💧 Make sure your crops get enough water early in the morning.";
    if (msg.includes("fertilizer"))
      return "🌱 Use organic fertilizer for best results!";
    if (msg.includes("thanks") || msg.includes("thank you"))
      return "😊 You're most welcome!";
    return "🤖 I'm still learning! Could you please ask in a different way?";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow mt-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Farm Assistant Chatbot</h1>

        <div className="flex flex-col space-y-4 bg-white shadow-lg rounded-2xl p-6 h-[60vh] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm sm:text-base max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="mt-4 flex gap-2 bg-white shadow-md rounded-full p-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 rounded-full border-none focus:outline-none text-gray-800"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Send
          </button>
        </form>
      </main>

    </div>
  );
}
