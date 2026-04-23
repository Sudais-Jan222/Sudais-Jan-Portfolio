import { useState, useRef, useEffect } from "react";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

interface AIChatbotProps {
  projectTitle: string;
  techStack: string;
  problem: string;
  result: string;
}

const GEMINI_API_KEY = "AIzaSyA80HWt0VWOwJsyh5gpJnJuj-sOSX0Pod4";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const AIChatbot = ({ projectTitle, techStack, problem, result }: AIChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: `Hey! I'm Sudais' technical assistant. Ask me anything about how the "${projectTitle}" was built.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `You are Sudais' digital technical assistant. The user is currently viewing the case study for the "${projectTitle}" built using ${techStack}. Your job is to answer their technical questions about how Sudais built this solution to solve the following problem: ${problem}. The result of this build was: ${result}. Keep your answers highly technical, confident, and concise. Answer in 2-3 sentences max unless asked for detail. Always maintain a professional yet helpful tone.`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      // Filter out only user and model messages, ensuring they alternate correctly
      // Gemini expects: User, Model, User, Model...
      const conversationHistory = messages
        .filter(msg => (msg.role === "user" || (msg.role === "bot" && msg.text !== messages[0].text))) // Skip the initial intro message
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            ...conversationHistory,
            { role: "user", parts: [{ text: userMsg }] },
          ],
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        throw new Error(errorData.error?.message || "Failed to get response");
      }

      const data = await response.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process that. Could you try rephrasing?";

      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (error: any) {
      console.error("Chatbot sendMessage error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong on my end. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className={`chat-fab ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-dot" />
            <span className="chat-header-text">Sudais' AI Assistant — {projectTitle}</span>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot typing">Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-bar">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about this build..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
