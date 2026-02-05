import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Terminal, ChevronRight, Command, X, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai" | "system";
  content: string;
  timestamp: Date;
}

interface AITerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: (message: string) => Promise<string>;
}

const SUGGESTED_COMMANDS = [
  { label: "What's your tech stack?", command: "tech stack" },
  { label: "Tell me about yourself", command: "about" },
  { label: "Show me your best project", command: "best project" },
  { label: "Are you available for work?", command: "availability" },
];

// Simulated AI responses - replace with actual API call
const getAIResponse = async (input: string): Promise<string> => {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));

  const lower = input.toLowerCase();

  if (lower.includes("stack") || lower.includes("tech")) {
    return "I work primarily with TypeScript, React, and React Native for frontend. On the backend, I use Node.js with Express or Next.js API routes. For databases, I'm comfortable with both SQL (MySQL, PostgreSQL) and NoSQL (Firebase, MongoDB). I also have experience with cloud services like AWS and Vercel.";
  }
  if (lower.includes("about") || lower.includes("who")) {
    return "I'm Daffa, a software engineer based in Indonesia with 4+ years of experience. I specialize in building mobile and web applications that people actually enjoy using. I'm passionate about clean code, great UX, and solving complex problems with elegant solutions.";
  }
  if (lower.includes("project") || lower.includes("work")) {
    return "My most impactful project has been building production mobile apps used by thousands of users. I focus on performance, accessibility, and delightful interactions. Check out my featured projects in the 'Quest Log' section above!";
  }
  if (lower.includes("available") || lower.includes("hire") || lower.includes("freelance")) {
    return "Yes! I'm currently open to new opportunities - both full-time roles and freelance projects. Feel free to reach out at daftdevs@gmail.com or connect with me on LinkedIn. I'd love to hear about what you're building.";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hey there! Welcome to my portfolio. I'm an AI assistant here to help you learn more about Daffa. Ask me anything about his skills, experience, or projects!";
  }
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) {
    return "You can reach Daffa at daftdevs@gmail.com. He's also active on GitHub (@daft2) and LinkedIn. Don't hesitate to drop a message - he loves connecting with fellow developers and potential collaborators!";
  }

  return "Interesting question! While I don't have a specific answer for that, I can tell you about Daffa's skills, projects, experience, or availability. Try asking something like 'What's your tech stack?' or 'Are you available for work?'";
};

export function AITerminal({ isOpen, onClose, onSendMessage }: AITerminalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content: "Welcome! I'm an AI assistant trained on Daffa's portfolio. Ask me anything.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isThinking) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        content: input.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsThinking(true);

      try {
        const response = onSendMessage
          ? await onSendMessage(input.trim())
          : await getAIResponse(input.trim());

        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: "ai",
          content: response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          type: "system",
          content: "Something went wrong. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsThinking(false);
      }
    },
    [input, isThinking, onSendMessage]
  );

  const handleSuggestionClick = (command: string) => {
    setInput(command);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Terminal Panel */}
      <div
        ref={containerRef}
        className={`fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[640px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="terminal-container relative overflow-hidden rounded-2xl border border-border/50 bg-surface/95 backdrop-blur-xl shadow-2xl">
          {/* Ambient glow effect */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Thinking pulse overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none transition-opacity duration-500 ${
              isThinking ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Header */}
          <div className="relative flex items-center justify-between px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20">
                <Sparkles className="w-4 h-4 text-accent" />
                {isThinking && (
                  <span className="absolute inset-0 rounded-lg bg-accent/20 animate-ping" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-primary tracking-tight">
                  Ask AI
                </h3>
                <p className="text-[11px] text-text-tertiary">
                  Powered by portfolio data
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-raised border border-border/50 text-[10px] text-text-tertiary font-mono">
                <Command className="w-3 h-3" />
                <span>K</span>
              </span>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-raised transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="relative h-[320px] overflow-y-auto px-5 py-4 space-y-4 terminal-messages">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {message.type === "system" ? (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-surface-raised border border-border/50 flex-shrink-0 mt-0.5">
                      <Terminal className="w-3 h-3 text-text-tertiary" />
                    </div>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                ) : message.type === "user" ? (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-3 h-3 text-accent" />
                    </div>
                    <p className="text-[13px] text-text-primary font-medium leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-surface-raised border border-border/50 flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Thinking indicator */}
            {isThinking && (
              <div className="flex items-start gap-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-surface-raised border border-border/50 flex-shrink-0 mt-0.5">
                  <Loader2 className="w-3 h-3 text-accent animate-spin" />
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && !isThinking && (
            <div className="px-5 pb-3">
              <p className="text-[10px] text-text-tertiary font-mono uppercase tracking-wider mb-2">
                Suggestions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_COMMANDS.map((suggestion) => (
                  <button
                    key={suggestion.command}
                    onClick={() => handleSuggestionClick(suggestion.command)}
                    className="px-3 py-1.5 text-[11px] text-text-secondary bg-surface-raised border border-border/50 rounded-full hover:border-accent/30 hover:text-text-primary transition-all duration-200"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="relative border-t border-border/50">
            <div className="flex items-center px-5 py-4 gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex-shrink-0">
                <ChevronRight className="w-3 h-3 text-accent" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Daffa..."
                disabled={isThinking}
                className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-bg hover:bg-accent/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────
   Floating trigger button
   ───────────────────────────────────────────────────── */
export function AITerminalTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-surface border border-border/50 shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        <Sparkles className="w-4 h-4 text-accent transition-transform duration-300 group-hover:scale-110" />
        <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-75" />
      </div>
      <span className="text-[13px] font-medium text-text-primary">
        Ask AI
      </span>
      <span className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-raised border border-border/50 text-[10px] text-text-tertiary font-mono">
        <Command className="w-2.5 h-2.5" />
        K
      </span>
    </button>
  );
}

export default AITerminal;
