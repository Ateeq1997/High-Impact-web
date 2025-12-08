"use client";

import React, { useState, useEffect, useRef } from "react";

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type AgriBotWidgetProps = {
  userRole?: "farmer" | "developer";
  forceOpen?: boolean;
};

const AgriBotWidget: React.FC<AgriBotWidgetProps> = ({ userRole = "developer", forceOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(forceOpen || false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const agriEmojis = ["🌾", "🚜", "🌻", "🥕", "🌱", "🥬", "🌽", "🍅", "🌳", "💧", "🍚"];

  const getSystemInstruction = (role: string) => {
    if (role === "farmer") {
      return "You are an AI assistant for a farmer. Your goal is to provide specific, actionable advice on irrigation, disease management, fertilizer planning, pest control, weather updates, soil health, and yield optimization. Keep your answers concise and directly related to agriculture. You MUST respond in English.";
    } else if (role === "developer") {
      return "You are an AI assistant for a real estate developer interested in agricultural land investment. Your goal is to provide data and insights on land pricing, investment opportunities, location analysis, project details, financing options, and property recommendations. Keep your answers focused on investment and property. You MUST respond in English.";
    }
    return "You are a helpful AgriBot AI.";
  };

  const sendToGemini = async (userMessage: string) => {
    const contents = messages
      .slice(1)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

    const userMessageObject = {
      role: "user",
      parts: [{ text: userMessage }],
    };

    const conversationHistory = [...contents, userMessageObject];
    const systemInstruction = getSystemInstruction(userRole);

    const payload = {
      contents: conversationHistory,
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.candidates?.length > 0 && data.candidates[0].content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.error("Gemini API Error:", data.error);
        return `API Error: ${data.error.message || "Unknown error"}`;
      }

      return "Sorry, I ran into an error. Please try again.";
    } catch (error: any) {
      console.error("Network error:", error);
      return `Error: ${error.message}`;
    }
  };

  useEffect(() => {
    const welcomeMessages = {
      farmer: "Hello! 🌾 I'm AgriBot, your personal agricultural assistant. I'm here to help you optimize your farm operations with advice on irrigation, pest control, fertilizer planning, soil health, weather forecasting, and yield optimization. What can I help you with today?",
      developer: "Welcome! 🚜 I'm AgriBot, your agricultural investment specialist. I provide insights on agricultural land opportunities, pricing analysis, ROI projections, location analysis, and investment strategies. How can I assist your portfolio?",
    };

    if (messages.length === 0) {
      const message = welcomeMessages[userRole] || welcomeMessages.farmer;
      setMessages([
        {
          id: 1,
          text: message,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  // Only run on userRole or messages.length change
  }, [userRole, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await sendToGemini(text);
      const botMsg: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      const errorMsg: Message = {
        id: messages.length + 2,
        text: `An error occurred: ${error.message}`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleName = () => (userRole === "farmer" ? "Farmer Mode" : "Investor Mode");

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const SendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );

  return (
    <>
      {!isOpen ? (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-green-500 to-lime-500 text-white border-4 border-white text-4xl flex items-center justify-center shadow-lg animate-bounce transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:from-yellow-500 hover:via-green-700 hover:to-lime-700"
            title="Open AgriBot"
          >
            🌾
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-md h-full max-h-[85vh] bg-white rounded-3xl border-4 border-yellow-300 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="relative flex items-center justify-between flex-shrink-0 p-4 bg-gradient-to-r from-orange-500 via-green-500 to-emerald-600 text-white overflow-hidden sm:p-4">
              <div className="absolute inset-0 flex justify-around items-center opacity-20 text-3xl pointer-events-none">
                <span>🚜</span>
                <span>🌾</span>
                <span>🥕</span>
                <span>🌻</span>
              </div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/60 text-2xl">
                  🌾
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold drop-shadow-sm m-0 p-0">AgriBot</h3>
                  <p className="text-xs text-yellow-100 font-bold drop-shadow-sm mt-1">{getRoleName()}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="z-10 relative p-2 rounded-lg hover:bg-white/30 flex items-center justify-center"
                title="Close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div className="relative flex-1 overflow-y-auto p-6 bg-gradient-to-br from-yellow-100 via-green-50 to-green-50 sm:p-4">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute text-[128px]" style={{ top: 40, left: 40, transform: "rotate(-12deg)" }}>
                  🌾
                </div>
                <div className="absolute text-[128px]" style={{ bottom: 80, right: 40, transform: "rotate(12deg)" }}>
                  🚜
                </div>
                <div className="absolute text-[128px]" style={{ top: "50%", right: 80 }}>
                  🌱
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                {messages.map((msg) => {
                  const isBot = msg.sender === "bot";
                  return (
                    <div key={msg.id} className={`flex gap-2 ${isBot ? "justify-start" : "justify-end"}`}>
                      {isBot && <span className="text-2xl flex-shrink-0">{agriEmojis[msg.id % agriEmojis.length]}</span>}
                      <div
                        className={`max-w-[384px] sm:max-w-[280px] xs:max-w-[220px] p-5 sm:p-3 xs:p-2 rounded-xl sm:rounded-lg border-2 shadow-md ${
                          isBot
                            ? "bg-white/90 text-gray-800 border-green-300"
                            : "bg-gradient-to-br from-yellow-300 to-green-500 text-white border-yellow-300"
                        }`}
                      >
                        <p className="text-sm font-medium break-words m-0 p-0">{msg.text}</p>
                        <span className={`text-xs font-medium mt-2 block ${isBot ? "text-gray-500" : "text-yellow-100"}`}>
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      {!isBot && <span className="text-2xl">👨‍🌾</span>}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex gap-2 p-5 bg-white/90 rounded-xl border-2 border-green-300 w-fit">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-400"></span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4 bg-gradient-to-r from-green-50 via-green-100 to-green-50 border-t-2 border-green-200 flex items-center gap-3 text-black">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask your farming question... 🌾"
                disabled={isLoading}
                className="flex-1 p-3 border-2 border-green-400 rounded-full outline-none text-sm font-medium bg-white transition-all focus:border-green-700 focus:ring-4 focus:ring-green-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 p-3 rounded-full text-white transition-all shadow-md disabled:bg-gray-400 disabled:text-gray-200 bg-gradient-to-r from-orange-500 to-green-700 hover:from-orange-600 hover:to-green-800 flex items-center justify-center"
                title="Send"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AgriBotWidget;