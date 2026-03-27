"use client";

import { BookOpenText, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="border-b border-slate-800 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 px-6 py-5 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-blue-600/30 p-3 shadow-md">
          <BookOpenText className="h-6 w-6 text-blue-300 drop-shadow" />
        </div>
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            AI Bible Study Assistant
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
          </h1>
          <p className="mt-1 text-base text-slate-300">
            Explain scripture, generate sermon outlines, and discover cross references
          </p>
        </div>
      </div>
    </div>
  );
}