"use client";
import BibleChat from "@/components/bible-chat/BibleChat";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)',
        fontFamily:
          'var(--font-geist-sans), Inter, Segoe UI, system-ui, sans-serif',
        color: '#f1f5f9',
      }}
    >
      <BibleChat />
    </main>
  );
}
