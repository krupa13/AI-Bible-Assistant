"use client";

import ChatHeader from "./ChatHeader";
import PromptModeSelector from "./PropmtModeSelector";
import SidebarTips from "./SidebarTips";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { useAppSelector } from "@/store/hooks";

export default function BibleChat() {
  const error = useAppSelector((state) => state.chat.error);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        fontFamily:
          'var(--font-geist-sans), Inter, Segoe UI, system-ui, sans-serif',
      }}
    >
      <ChatHeader />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[320px_1fr]">
        <aside
          className="space-y-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl p-6 border border-slate-800"
          style={{ color: '#e0e7ef' }}
        >
          <PromptModeSelector />
          <SidebarTips />
        </aside>

        <section
          className="space-y-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl p-6 border border-slate-800"
          style={{ color: '#f1f5f9' }}
        >
          {error && (
            <div className="rounded-lg border border-red-800 bg-red-950/80 px-4 py-3 text-sm text-red-200 shadow">
              {error}
            </div>
          )}

          <ChatWindow />
          <ChatInput />
        </section>
      </div>
    </div>
  );
}