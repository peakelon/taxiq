"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageSquare,
  Bot,
  User,
  Lightbulb,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  mockChatHistory,
  mockChatResponses,
  type ChatMessage,
} from "@/lib/mock-data";

const suggestedQuestions = [
  "Should I elect S-Corp status for my consulting business?",
  "What retirement accounts should I max out this year?",
  "Which deductions am I currently missing?",
  "How can I reduce my self-employment tax?",
  "Explain the Backdoor Roth IRA strategy",
  "What tax implications does my new baby have?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = mockChatResponses.default;

      if (lowerText.includes("s-corp") || lowerText.includes("s corp")) {
        response = mockChatResponses["s-corp"];
      } else if (
        lowerText.includes("retirement") ||
        lowerText.includes("401k") ||
        lowerText.includes("ira") ||
        lowerText.includes("roth")
      ) {
        response = mockChatResponses.retirement;
      } else if (
        lowerText.includes("deduction") ||
        lowerText.includes("missing") ||
        lowerText.includes("write-off")
      ) {
        response = mockChatResponses.deductions;
      }

      const botMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Tax Advisor</h1>
        <p className="text-muted-foreground mt-1">
          Ask questions about your taxes, deductions, and strategies. The AI
          knows your profile and documents.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Suggested Questions */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-[#38a169] dark:text-[#48bb78]" />
                <h3 className="text-sm font-semibold">Try asking</h3>
              </div>
              <div className="space-y-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left p-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Disclaimer</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                This AI provides educational tax information, not professional
                tax advice. Always consult a qualified tax professional for
                decisions about your specific situation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <Card className="flex flex-col" style={{ height: "calc(100vh - 16rem)" }}>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-6">
                {/* Welcome Message */}
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full bg-[#1a365d]/10 dark:bg-[#60a5fa]/10 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-8 w-8 text-[#1a365d] dark:text-[#60a5fa]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      Welcome to your AI Tax Advisor
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      I know your tax profile, income sources, and documents.
                      Ask me anything about deductions, strategies, or tax
                      planning.
                    </p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-[#1a365d] dark:bg-[#60a5fa] flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-white dark:text-[#0f172a]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-[#1a365d] dark:bg-[#60a5fa] text-white dark:text-[#0f172a]"
                          : "bg-muted"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line leading-relaxed">
                        {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return (
                              <strong key={i}>
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        })}
                      </div>
                      <div
                        className={`text-xs mt-2 ${
                          msg.role === "user"
                            ? "text-white/60 dark:text-[#0f172a]/60"
                            : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                    {msg.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#1a365d] dark:bg-[#60a5fa] flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-white dark:text-[#0f172a]" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                        <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your taxes, deductions, or strategies..."
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-[#1a365d] hover:bg-[#2d4a7a] dark:bg-[#60a5fa] dark:hover:bg-[#93bbfc] dark:text-[#0f172a]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
