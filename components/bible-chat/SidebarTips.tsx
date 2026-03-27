"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, BookOpen, Link2, HeartPulse } from "lucide-react";

const tips = [
  { icon: <Lightbulb className="h-4 w-4 text-yellow-400" />, text: "Explain John 15:1-8 in simple language" },
  { icon: <BookOpen className="h-4 w-4 text-blue-400" />, text: "Give a sermon outline on Psalm 23" },
  { icon: <Link2 className="h-4 w-4 text-green-400" />, text: "Show cross references for Romans 8:28" },
  { icon: <HeartPulse className="h-4 w-4 text-pink-400" />, text: "Write a daily devotion on faith during suffering" },
];

export default function SidebarTips() {
  return (
    <Card className="border-l-4 border-blue-600 border-slate-800 bg-slate-900 text-slate-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-base font-semibold tracking-tight">Prompt ideas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-300">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {tip.icon}
            <span>{tip.text}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}