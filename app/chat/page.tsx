"use client";

import { FormEvent, useState } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ChatPage() {
  const { chatMessages, sendChatMessage } = useAppState();
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    sendChatMessage(trimmed);
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">AI Tax Chat</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Context-aware demo assistant using your profile and uploaded document data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>TaxIQ Advisor</CardTitle>
          <CardDescription>
            Educational only. Not legal, accounting, or tax advice.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-lg border border-slate-200 p-4 dark:border-slate-700">
            {chatMessages.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg p-3 ${
                  item.role === "assistant"
                    ? "bg-slate-100 dark:bg-slate-800"
                    : "ml-auto max-w-[90%] bg-brandBlue text-white dark:bg-brandGreen dark:text-slate-950"
                }`}
              >
                <p className="text-sm">{item.content}</p>
                {item.citations && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.citations.map((citation) => (
                      <Badge key={citation} variant="secondary" className="text-[10px]">
                        {citation}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="space-y-3">
            <Textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about deductions, filing strategy, or implementation steps..."
            />
            <Button type="submit">Send message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
