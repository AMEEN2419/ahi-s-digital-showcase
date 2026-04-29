import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const SECTION_KEYWORDS: Record<string, string[]> = {
  "#about": ["about", "who is", "background", "summary"],
  "#skills": ["skill", "tech", "stack", "tool", "figma", "python", "ui/ux"],
  "#education": ["education", "college", "school", "study", "degree", "anna university"],
  "#projects": ["project", "ransomware", "scanner", "vehicle", "medicine", "chatbot", "kpr", "hackathon project"],
  "#experience": ["experience", "intern", "ediglobe", "achievement", "course", "language", "trophy", "leadership"],
  "#contact": ["contact", "email", "reach", "hire", "phone", "linkedin", "github", "message"],
};

function findSection(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [section, keys] of Object.entries(SECTION_KEYWORDS)) {
    if (keys.some((k) => lower.includes(k))) return section;
  }
  return null;
}

const SUGGESTIONS = ["Show projects", "His skills", "Education", "Contact him"];

const AhiChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello! Nice to meet you 👋 — I'm **AHI**, Ameen's portfolio assistant. Ask me about his projects, skills, or anything from his resume, and I'll guide you to the right section.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;
    setInput("");

    // Auto-scroll to relevant section based on user query
    const target = findSection(content);
    if (target) {
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setStreaming(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ahi-chat`;
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (resp.status === 429) {
        setMessages((m) => [...m, { role: "assistant", content: "I'm getting a lot of questions right now — try again in a moment." }]);
        return;
      }
      if (resp.status === 402) {
        setMessages((m) => [...m, { role: "assistant", content: "AHI is temporarily out of credits. Please contact Ameen directly." }]);
        return;
      }
      if (!resp.ok || !resp.body) throw new Error("Failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantSoFar = "";
      let started = false;

      const upsert = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages((prev) => {
          if (!started) {
            started = true;
            return [...prev, { role: "assistant", content: assistantSoFar }];
          }
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        });
      };

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) upsert(delta);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // After response, also try scrolling based on assistant text
      const target2 = findSection(assistantSoFar);
      if (target2 && !target) {
        document.querySelector(target2)?.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry — I had trouble connecting. Please try again." },
      ]);
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center animate-glow-pulse hover:scale-110 transition-transform"
        aria-label={open ? "Close AHI chat" : "Open AHI chat"}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-[380px] max-h-[70vh] flex flex-col rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl animate-fade-up overflow-hidden">
          <header className="px-5 py-4 border-b border-border flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="font-display text-sm leading-none">AHI</div>
              <div className="text-xs text-muted-foreground mt-1">Portfolio assistant</div>
            </div>
            <span className="ml-auto h-2 w-2 rounded-full bg-foreground animate-pulse" />
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-foreground text-background rounded-br-sm"
                      : "bg-card border border-border rounded-bl-sm"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none [&>*]:my-1">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {streaming && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <Loader2 size={14} className="animate-spin" />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-5 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs rounded-full border border-border px-3 py-1.5 hover:bg-foreground hover:text-background transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="p-3 border-t border-border flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AHI anything…"
              disabled={streaming}
              className="flex-1 bg-card border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-40"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AhiChat;
