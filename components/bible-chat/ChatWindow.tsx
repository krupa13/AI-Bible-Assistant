"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store/hooks";
import ChatMessage from "./ChatMessage";

export default function ChatWindow() {
  const messages = useAppSelector((state) => state.chat.messages);
  const loading = useAppSelector((state) => state.chat.loading);

  return (
    <ScrollArea className="h-[65vh] rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-blue-950/60 to-indigo-950 p-4 shadow-xl">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="animate-fade-in">
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-300 shadow animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}