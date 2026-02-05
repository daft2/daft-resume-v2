import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, CornerDownLeft, User, Bot } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai" | "system";
  content: string;
}

interface AITerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: (message: string) => Promise<string>;
}

const SUGGESTIONS = [
  "What's your tech stack?",
  "Tell me about yourself",
  "Are you available for hire?",
];

const getAIResponse = async (input: string): Promise<string> => {
  await new Promise((r) => setTimeout(r, 500 + Math.random() * 700));

  const lower = input.toLowerCase().trim();

  if (lower.includes("stack") || lower.includes("tech") || lower.includes("skill")) {
    return "I work with TypeScript, React, React Native, Next.js, and Node.js. For databases, I use MySQL, PostgreSQL, and Firebase. I'm also comfortable with cloud platforms like AWS and Vercel.";
  }
  if (lower.includes("about") || lower.includes("who") || lower.includes("yourself")) {
    return "I'm Daffa, a software engineer from Indonesia with 4+ years of experience building mobile and web apps. I care about clean code, great UX, and solving real problems with elegant solutions.";
  }
  if (lower.includes("available") || lower.includes("hire") || lower.includes("freelance") || lower.includes("work")) {
    return "Yes! I'm open to full-time roles and freelance projects. Reach out at daftdevs@gmail.com — I'd love to hear about what you're building.";
  }
  if (lower.includes("project")) {
    return "Check out my featured projects above — I've built production apps with thousands of users, focusing on performance and great user experiences.";
  }
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
    return "You can reach me at daftdevs@gmail.com, or connect on GitHub (@daft2) and LinkedIn. Always happy to chat!";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower === "hey") {
    return "Hey! 👋 I'm an AI trained on Daffa's portfolio. Ask me about his skills, projects, or availability!";
  }

  return "I can help you learn about Daffa's skills, experience, projects, or availability. What would you like to know?";
};

export function AITerminal({ isOpen, onClose, onSendMessage }: AITerminalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isTyping) return;

      const userMsg: Message = { id: `u-${Date.now()}`, type: "user", content: input.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      try {
        const response = onSendMessage ? await onSendMessage(input.trim()) : await getAIResponse(input.trim());
        setMessages((prev) => [...prev, { id: `a-${Date.now()}`, type: "ai", content: response }]);
      } catch {
        setMessages((prev) => [...prev, { id: `e-${Date.now()}`, type: "system", content: "Something went wrong. Try again." }]);
      } finally {
        setIsTyping(false);
        inputRef.current?.focus();
      }
    },
    [input, isTyping, onSendMessage]
  );

  const handleSuggestion = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen ? "bg-black/40 backdrop-blur-sm" : "bg-transparent backdrop-blur-none pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Terminal */}
      <div
        className={`fixed z-[101] inset-x-4 top-[12vh] sm:inset-auto sm:left-1/2 sm:top-[15vh] sm:-translate-x-1/2 sm:w-full sm:max-w-[560px] transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.98] -translate-y-2"
        }`}
      >
        <div className="bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-accent/10">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">Ask AI about Daffa</p>
              <p className="text-xs text-text-tertiary">Skills, projects, availability</p>
            </div>
            <kbd className="hidden sm:inline-flex px-2 py-1 text-[10px] font-mono text-text-tertiary bg-surface-raised border border-border rounded-md">
              ESC
            </kbd>
          </div>

          {/* Messages */}
          <div className="max-h-[45vh] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="px-5 py-8">
                <p className="text-sm text-text-tertiary mb-4">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="px-3 py-1.5 text-sm text-text-secondary bg-surface-raised border border-border rounded-full hover:border-accent/30 hover:text-text-primary transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-5 py-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center ${
                        msg.type === "user" ? "bg-text-primary/10" : "bg-accent/10"
                      }`}
                    >
                      {msg.type === "user" ? (
                        <User className="w-3.5 h-3.5 text-text-secondary" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-accent" />
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed pt-0.5 ${
                      msg.type === "user" ? "text-text-primary" : "text-text-secondary"
                    }`}>
                      {msg.content}
                    </p>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div className="flex items-center gap-1 pt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border">
            <div className="flex items-center gap-3 px-5 py-4">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                disabled={isTyping}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-text-primary text-bg hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export function AITerminalTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-2xl shadow-lg hover:shadow-xl hover:border-text-tertiary/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full animate-pulse" />
      </div>
      <span className="text-sm font-medium text-text-primary">Ask AI</span>
      <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-mono text-text-tertiary bg-surface-raised border border-border rounded">
        ⌘K
      </kbd>
    </button>
  );
}

export default AITerminal;
