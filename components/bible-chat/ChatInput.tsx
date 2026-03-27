"use client";

import { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addMessage,
  clearMessages,
  setError,
  setLoading,
} from "@/store/slices/chatSlice";
import { generateId } from "@/lib/utils";

export default function ChatInput() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const { selectedMode, messages, loading } = useAppSelector((state) => state.chat);

  const handleSubmit = async () => {
    if (!value.trim() || loading) return;

    const userMessage = {
      id: generateId(),
      role: "user" as const,
      content: value.trim(),
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    dispatch(setLoading(true));
    dispatch(setError(null));

    const currentValue = value.trim();
    setValue("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentValue,
          mode: selectedMode,
          history: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      dispatch(
        addMessage({
          id: generateId(),
          role: "assistant",
          content: data.answer,
          createdAt: new Date().toISOString(),
        })
      );
    } catch (error: unknown) {
      function isErrorWithMessage(err: unknown): err is { message: string } {
        return (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        );
      }
      let message = "Something went wrong.";
      if (isErrorWithMessage(error)) {
        message = error.message;
      }
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      className="flex items-end gap-2 pt-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex-1 rounded-full bg-slate-900/80 shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
        <Textarea
          className="min-h-[44px] max-h-32 flex-1 resize-none border-none bg-transparent text-slate-100 placeholder:text-slate-400 rounded-full px-5 py-3 focus-visible:ring-0 focus:outline-none"
          placeholder="Type your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </div>
      <Button
        type="submit"
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform duration-150 hover:scale-110 flex items-center justify-center"
        disabled={loading || !value.trim()}
        aria-label="Send message"
      >
        <Send className="h-5 w-5 animate-pulse" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        className="h-12 w-12 rounded-full text-red-400 hover:bg-red-900/30 transition-colors duration-150"
        onClick={() => dispatch(clearMessages())}
        disabled={loading || messages.length === 0}
        title="Clear chat"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </form>
  );
}