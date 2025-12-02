"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function FarmerChatbotPage() {
  const [messages, setMessages] = useState<any[]>([
    { sender: "bot", text: "Assalam-o-Alaikum! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    // Push user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const userMessage = input;
    setInput("");

    // Mock bot reply
    setTimeout(() => {
      const reply = getMockResponse(userMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 800);
  };

  const getMockResponse = (msg: string) => {
    msg = msg.toLowerCase();

    if (msg.includes("ndvi"))
      return "Your NDVI is stable. A slight dip may occur due to cloudy weather.";
    if (msg.includes("water") || msg.includes("irrigation"))
      return "Irrigation recommended within the next 48 hours.";
    if (msg.includes("fertilizer"))
      return "Nitrogen fertilizer recommended at a rate of 50–60 kg/acre.";
    if (msg.includes("weather"))
      return "Light rain expected in 5 days. Temperature stable.";

    return "I am here to help with crops, weather, fertilizer, soil and irrigation!";
  };

  return (
      <><DashboardHeader />
      <div className="p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Chat with Farm Assistant</h1>

          <div className="border rounded-xl p-4 h-[500px] overflow-y-auto bg-gray-50">
              {messages.map((m, i) => (
                  <div
                      key={i}
                      className={`mb-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                      <div
                          className={`px-4 py-2 rounded-lg ${m.sender === "user"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-black"}`}
                      >
                          {m.text}
                      </div>
                  </div>
              ))}
          </div>

          {/* Input */}
          <div className="flex gap-3 mt-4 text-black">
              <input
                  className="border p-2 rounded-lg flex-1"
                  placeholder="Ask a question about crops, weather, soil..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)} />
              <button
                  onClick={sendMessage}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                  Send
              </button>
          </div>
      </div></>
  );
}
