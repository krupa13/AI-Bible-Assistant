"use client";

import { ChatMessageType } from "@/types/chat";
import { cn } from "@/lib/utils";

export default function ChatMessage({
  message,
}: {
  message: ChatMessageType;
}) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm whitespace-pre-wrap",
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-100"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}