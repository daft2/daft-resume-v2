import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Command } from "lucide-react";

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
  "about",
  "skills",
  "projects",
  "contact",
  "help",
];

// Simulated AI responses - replace with actual API call
const getAIResponse = async (input: string): Promise<string> => {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

  const lower = input.toLowerCase().trim();

  if (lower === "help" || lower === "?") {
    return `Available commands:
  about      - Learn about me
  skills     - View my tech stack
  projects   - See my featured work
  contact    - Get in touch
  clear      - Clear terminal

Or just ask me anything!`;
  }
  if (lower === "clear") {
    return "__CLEAR__";
  }
  if (lower.includes("skill") || lower.includes("stack") || lower.includes("tech")) {
    return `// Tech Stack

Languages    → TypeScript, JavaScript, HTML/CSS
Frontend     → React, React Native, Next.js, Expo
Backend      → Node.js, Express, Firebase
Database     → MySQL, PostgreSQL, MongoDB
Tools        → Git, Vercel, AWS, Figma`;
  }
  if (lower === "about" || lower.includes("who") || lower.includes("yourself")) {
    return `Hey! I'm Daffa — a software engineer based in Indonesia.

I've spent 4+ years building mobile & web apps that people
actually enjoy using. I care about clean code, smooth UX,
and solving real problems.

Currently open to new opportunities.`;
  }
  if (lower === "projects" || lower.includes("project") || lower.includes("work")) {
    return `// Featured Projects

Check out the "Quest Log" section above for my highlighted
work. I've built production apps with thousands of users,
focusing on performance and delightful interactions.

Want details on a specific project? Just ask!`;
  }
  if (lower === "contact" || lower.includes("email") || lower.includes("hire") || lower.includes("reach")) {
    return `// Let's Connect

Email     → daftdevs@gmail.com
GitHub    → github.com/daft2
LinkedIn  → linkedin.com/in/muhammad-daffa-s

I'm always open to interesting projects and opportunities.
Don't hesitate to reach out!`;
  }
  if (lower.includes("hello") || lower.includes("hi") || lower === "hey") {
    return `Hey there! Welcome to my terminal.

Type 'help' to see available commands, or just ask me
anything about my work, skills, or experience.`;
  }
  if (lower.includes("available") || lower.includes("freelance") || lower.includes("job")) {
    return `Yes! I'm currently open to:

• Full-time positions (remote or Indonesia-based)
• Freelance/contract work
• Interesting collaborations

Drop me a line at daftdevs@gmail.com`;
  }

  return `I'm not sure about that one. Try 'help' to see
available commands, or ask about my skills, projects,
or availability!`;
};

export function AITerminal({ isOpen, onClose, onSendMessage }: AITerminalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      content: `Welcome to daffa.terminal v1.0.0
Type 'help' for available commands.
`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
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
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isThinking) return;

      const command = input.trim();

      // Add to history
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        content: command,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsThinking(true);

      try {
        const response = onSendMessage
          ? await onSendMessage(command)
          : await getAIResponse(command);

        if (response === "__CLEAR__") {
          setMessages([{
            id: "cleared",
            type: "system",
            content: "Terminal cleared.",
            timestamp: new Date(),
          }]);
        } else {
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            type: "ai",
            content: response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
        }
      } catch {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          type: "system",
          content: "Error: Command failed. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsThinking(false);
        inputRef.current?.focus();
      }
    },
    [input, isThinking, onSendMessage]
  );

  // Handle up/down arrow for command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div
        className={`fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-[680px] transition-all duration-200 ease-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 translate-y-[-48%]"
        }`}
      >
        <div className="terminal-window rounded-lg overflow-hidden shadow-2xl">
          {/* Title Bar - macOS style */}
          <div className="terminal-titlebar h-11 bg-[#2d2d2d] flex items-center px-4 relative select-none">
            {/* Traffic lights */}
            <div className="flex items-center gap-2 z-10">
              <button
                onClick={onClose}
                className="group w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all flex items-center justify-center"
                aria-label="Close"
              >
                <svg className="w-1.5 h-1.5 text-[#990000] opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 6 6">
                  <path d="M.5.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                </svg>
              </button>
              <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all" aria-label="Minimize" />
              <button className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all" aria-label="Maximize" />
            </div>

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 text-[13px] text-[#9b9b9b]">
                <Sparkles className="w-3.5 h-3.5 text-[#28c840]" />
                <span className="font-medium">daffa.terminal</span>
                <span className="text-[#666]">— ai</span>
              </div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body bg-[#1a1a1a] min-h-[400px] max-h-[60vh] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
            {/* Messages */}
            {messages.map((message) => (
              <div key={message.id} className="mb-3">
                {message.type === "user" ? (
                  <div className="flex items-start gap-2">
                    <span className="text-[#28c840] shrink-0">❯</span>
                    <span className="text-[#e0e0e0]">{message.content}</span>
                  </div>
                ) : message.type === "system" ? (
                  <pre className="text-[#808080] whitespace-pre-wrap">{message.content}</pre>
                ) : (
                  <pre className="text-[#c0c0c0] whitespace-pre-wrap pl-4 border-l-2 border-[#333] ml-1">{message.content}</pre>
                )}
              </div>
            ))}

            {/* Thinking indicator */}
            {isThinking && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#28c840]">❯</span>
                <span className="terminal-cursor" />
              </div>
            )}

            {/* Input line */}
            {!isThinking && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-[#28c840] shrink-0">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-[#e0e0e0] outline-none caret-[#28c840]"
                  placeholder=""
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom bar with suggestions */}
          <div className="bg-[#252525] border-t border-[#333] px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
              {SUGGESTED_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInput(cmd);
                    inputRef.current?.focus();
                  }}
                  className="px-2.5 py-1 text-[11px] font-mono text-[#808080] bg-[#333] rounded hover:bg-[#404040] hover:text-[#a0a0a0] transition-colors shrink-0"
                >
                  {cmd}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 ml-3 shrink-0">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-[#666] bg-[#333] rounded border border-[#444]">
                <span className="text-[9px]">esc</span>
              </kbd>
              <span className="text-[10px] text-[#555]">to close</span>
            </div>
          </div>
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
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-3 pr-3.5 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] shadow-lg hover:shadow-xl hover:border-[#444] hover:bg-[#222] transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        <span className="absolute w-2 h-2 rounded-full bg-[#28c840] animate-pulse" />
        <span className="absolute w-2 h-2 rounded-full bg-[#28c840]" />
      </div>
      <span className="text-[13px] font-medium text-[#e0e0e0] font-mono">
        ~/ask-ai
      </span>
      <span className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#333] border border-[#444] text-[10px] text-[#808080] font-mono">
        <Command className="w-2.5 h-2.5" />
        <span>K</span>
      </span>
    </button>
  );
}

export default AITerminal;
