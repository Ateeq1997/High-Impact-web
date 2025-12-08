import React, { useState, useEffect, useRef } from 'react';

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const API_KEY = "AIzaSyBmJLviIoQy6s2W4aGV0LCNTBJrMxhseEY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

const styles = `
  .agribot-floating-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 40;
  }

  .agribot-float-button {
    width: 64px;
    height: 64px;
    border-radius: 9999px;
    background: linear-gradient(to bottom right, #fbbf24, #22c55e, #84cc16);
    color: white;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: 4px solid white;
    font-size: 36px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: bounce 2s infinite;
  }

  .agribot-float-button:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: scale(1.1);
    background: linear-gradient(to bottom right, #f59e0b, #16a34a, #65a30d);
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .agribot-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
  }

  .agribot-chat-container {
    width: 100%;
    max-width: 500px;
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 85vh;
    border: 4px solid #fcd34d;
    height: 100%;
  }

  @media (max-width: 768px) {
    .agribot-chat-container {
      max-width: 95vw;
      max-height: 90vh;
      border: 3px solid #fcd34d;
    }
  }

  @media (max-width: 480px) {
    .agribot-chat-container {
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;
      border: 2px solid #fcd34d;
    }
  }

  .agribot-header {
    background: linear-gradient(to right, #f59e0b, #22c55e, #059669);
    color: white;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    .agribot-header {
      padding: 12px;
    }
  }

  .agribot-header-bg-emojis {
    position: absolute;
    inset: 0;
    opacity: 0.2;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 36px;
    pointer-events: none;
  }

  .agribot-header-content {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 10;
  }

  .agribot-logo-circle {
    width: 56px;
    height: 56px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.6);
    font-size: 24px;
  }

  .agribot-header-text h3 {
    font-size: 24px;
    font-weight: bold;
    color: white;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    margin: 0;
    padding: 0;
  }

  @media (max-width: 480px) {
    .agribot-header-text h3 {
      font-size: 18px;
    }
  }

  .agribot-header-text p {
    font-size: 12px;
    color: #fef3c7;
    font-weight: bold;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
    margin: 4px 0 0 0;
    padding: 0;
  }

  .agribot-close-btn {
    padding: 8px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    transition: background-color 0.2s;
    cursor: pointer;
    position: relative;
    z-index: 10;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .agribot-close-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .agribot-messages-container {
    flex: 1;
    overflow-y: auto;
    position: relative;
    background: linear-gradient(to bottom right, #fef3c7, #f0fdf4, #f0fdfa);
    padding: 24px;
  }

  @media (max-width: 768px) {
    .agribot-messages-container {
      padding: 16px;
    }
  }

  @media (max-width: 480px) {
    .agribot-messages-container {
      padding: 12px;
    }
  }

  .agribot-messages-bg {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
  }

  .agribot-bg-emoji {
    position: absolute;
    font-size: 128px;
  }

  .agribot-messages-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .agribot-message-wrapper {
    display: flex;
    gap: 8px;
  }

  .agribot-message-wrapper.bot {
    justify-content: flex-start;
  }

  .agribot-message-wrapper.user {
    justify-content: flex-end;
  }

  .agribot-message-emoji {
    font-size: 32px;
    flex-shrink: 0;
  }

  .agribot-message-bubble {
    max-width: 384px;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: 2px solid;
  }

  @media (max-width: 768px) {
    .agribot-message-bubble {
      max-width: 280px;
      padding: 12px;
      border-radius: 12px;
    }
  }

  @media (max-width: 480px) {
    .agribot-message-bubble {
      max-width: 220px;
      padding: 10px;
    }
  }

  .agribot-message-bubble.bot {
    background-color: rgba(255, 255, 255, 0.9);
    color: #1f2937;
    border-color: #86efac;
  }

  .agribot-message-bubble.user {
    background: linear-gradient(to bottom right, #fcd34d, #22c55e);
    color: white;
    border-color: #fcd34d;
  }

  .agribot-message-text {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
    margin: 0;
    padding: 0;
    word-break: break-words;
  }

  .agribot-message-time {
    font-size: 12px;
    margin-top: 8px;
    display: block;
    font-weight: 500;
  }

  .agribot-message-bubble.bot .agribot-message-time {
    color: #6b7280;
  }

  .agribot-message-bubble.user .agribot-message-time {
    color: #fef3c7;
  }

  .agribot-loading {
    display: flex;
    gap: 8px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    border: 2px solid #86efac;
    width: fit-content;
  }

  .agribot-loading-dot {
    width: 12px;
    height: 12px;
    background-color: #22c55e;
    border-radius: 9999px;
    animation: bounce-dot 1.4s ease-in-out infinite;
  }

  .agribot-loading-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .agribot-loading-dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce-dot {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .agribot-input-area {
    background: linear-gradient(to right, #ecfdf5, #f0fdfa);
    padding: 16px;
    flex-shrink: 0;
    border-top: 2px solid #bbf7d0;
  }

  .agribot-input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .agribot-input {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid #4ade80;
    border-radius: 9999px;
    outline: none;
    font-size: 14px;
    font-weight: 500;
    background-color: white;
    transition: all 0.2s;
    font-family: inherit;
  }

  .agribot-input:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 12px rgba(34, 197, 94, 0.1);
  }

  .agribot-input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  .agribot-send-btn {
    padding: 12px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: white;
  }

  .agribot-send-btn:disabled {
    background-color: #9ca3af;
    color: #e5e7eb;
    cursor: not-allowed;
  }

  .agribot-send-btn:not(:disabled) {
    background: linear-gradient(to right, #f59e0b, #16a34a);
  }

  .agribot-send-btn:not(:disabled):hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    background: linear-gradient(to right, #d97706, #15803d);
  }

  .agribot-messages-container::-webkit-scrollbar {
    width: 8px;
  }

  .agribot-messages-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .agribot-messages-container::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 9999px;
  }

  .agribot-messages-container::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

export default function AgriBotWidget({ userRole = 'developer' }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatEndRef = useRef(null);

    const agriEmojis = ['🌾', '🚜', '🌻', '🥕', '🌱', '🥬', '🌽', '🍅', '🌳', '💧', '🍚'];

    const getSystemInstruction = (role) => {
        if (role === 'farmer') {
            return "You are an AI assistant for a farmer. Your goal is to provide specific, actionable advice on irrigation, disease management, fertilizer planning, pest control, weather updates, soil health, and yield optimization. Keep your answers concise and directly related to agriculture. You MUST respond in English.";
        } else if (role === 'developer') {
            return "You are an AI assistant for a real estate developer interested in agricultural land investment. Your goal is to provide data and insights on land pricing, investment opportunities, location analysis, project details, financing options, and property recommendations. Keep your answers focused on investment and property. You MUST respond in English.";
        }
        return "You are a helpful AgriBot AI.";
    };

    const sendToGemini = async (userMessage) => {
        const contents = messages.slice(1).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        const userMessageObject = { 
            role: 'user', 
            parts: [{ text: userMessage }]
        };

        const conversationHistory = [...contents, userMessageObject];
        const systemInstruction = getSystemInstruction(userRole);

        const payload = {
            contents: conversationHistory,
            systemInstruction: {
                parts: [{ text: systemInstruction }]
            },
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            
            let botText = 'Sorry, I ran into an error. Please try again.';
            
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts?.[0]?.text) {
                botText = data.candidates[0].content.parts[0].text;
            } else if (data.error) {
                console.error("Gemini API Error:", data.error);
                botText = `API Error: ${data.error.message || 'Unknown error'}`;
            }
            
            return botText;

        } catch (error) {
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
            setMessages([{
                id: 1,
                text: message,
                sender: 'bot',
                timestamp: new Date(),
            }]);
        }
    }, [userRole]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (text = input) => {
        if (!text.trim() || isLoading) return;

        const userMsg = {
            id: messages.length + 1,
            text: text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await sendToGemini(text);
            const botMsg = {
                id: messages.length + 2,
                text: responseText,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            const errorMsg = {
                id: messages.length + 2,
                text: `An error occurred: ${error.message}`,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const getRoleName = () => {
        return userRole === 'farmer' ? 'Farmer Mode' : 'Investor Mode';
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

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
            <style>{styles}</style>
            
            {!isOpen ? (
                <div className="agribot-floating-btn">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="agribot-float-button"
                        title="Open AgriBot"
                    >
                        🌾
                    </button>
                </div>
            ) : (
                <div className="agribot-modal-backdrop">
                    <div className="agribot-chat-container">
                        <div className="agribot-header">
                            <div className="agribot-header-bg-emojis">
                                <span>🚜</span>
                                <span>🌾</span>
                                <span>🥕</span>
                                <span>🌻</span>
                            </div>
                            
                            <div className="agribot-header-content">
                                <div className="agribot-logo-circle">🌾</div>
                                <div className="agribot-header-text">
                                    <h3>AgriBot</h3>
                                    <p>{getRoleName()}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="agribot-close-btn"
                                title="Close"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="agribot-messages-container">
                            <div className="agribot-messages-bg">
                                <div className="agribot-bg-emoji" style={{top: '40px', left: '40px', transform: 'rotate(-12deg)'}}>🌾</div>
                                <div className="agribot-bg-emoji" style={{bottom: '80px', right: '40px', transform: 'rotate(12deg)'}}>🚜</div>
                                <div className="agribot-bg-emoji" style={{top: '50%', right: '80px'}}>🌱</div>
                            </div>

                            <div className="agribot-messages-content">
                                {messages.map(msg => {
                                    const isBot = msg.sender === 'bot';
                                    return (
                                        <div key={msg.id} className={`agribot-message-wrapper ${isBot ? 'bot' : 'user'}`}>
                                            {isBot && <span className="agribot-message-emoji">{agriEmojis[msg.id % agriEmojis.length]}</span>}
                                            <div className={`agribot-message-bubble ${isBot ? 'bot' : 'user'}`}>
                                                <p className="agribot-message-text">{msg.text}</p>
                                                <span className="agribot-message-time">
                                                    {formatTime(msg.timestamp)}
                                                </span>
                                            </div>
                                            {!isBot && <span className="agribot-message-emoji">👨‍🌾</span>}
                                        </div>
                                    );
                                })}

                                {isLoading && (
                                    <div className="agribot-message-wrapper bot">
                                        <span className="agribot-message-emoji">🌾</span>
                                        <div className="agribot-loading">
                                            <div className="agribot-loading-dot"></div>
                                            <div className="agribot-loading-dot"></div>
                                            <div className="agribot-loading-dot"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        </div>

                        <div className="agribot-input-area">
                            <div className="agribot-input-wrapper">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask your farming question... 🌾"
                                    disabled={isLoading}
                                    className="agribot-input"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!input.trim() || isLoading}
                                    className="agribot-send-btn"
                                    title="Send"
                                >
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}