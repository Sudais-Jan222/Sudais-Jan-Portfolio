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

const AIChatbot = ({ projectTitle, techStack, problem, result }: AIChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: `Hey! I'm Sudais' technical assistant. Ask me anything about how "${projectTitle}" was built.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `You are Sudais' digital technical assistant on his portfolio website. The user is viewing the case study for "${projectTitle}" built using ${techStack}. Answer questions about how Sudais built this solution. Problem solved: ${problem}. Result achieved: ${result}. Keep answers technical, confident, and concise (2-3 sentences max unless asked for detail). Be professional yet helpful.`;

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
      // Build conversation history for the API (skip the initial greeting)
      const history = messages
        .filter((_, i) => i > 0) // skip intro message
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          text: msg.text,
        }));

      // Add current user message
      history.push({ role: "user", text: userMsg });

      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          systemPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Chat API error:", data);
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply },
      ]);
    } catch (error: any) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I couldn't connect right now. Please try again in a moment.",
        },
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
