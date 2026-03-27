"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedMode } from "@/store/slices/chatSlice";
import { PromptMode } from "@/types/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options: { label: string; value: PromptMode }[] = [
  { label: "Explain Passage", value: "explain" },
  { label: "Sermon Outline", value: "sermon" },
  { label: "Cross References", value: "cross-reference" },
  { label: "Daily Devotion", value: "devotion" },
];


export default function PromptModeSelector() {
  const dispatch = useAppDispatch();
  const selectedMode = useAppSelector((state) => state.chat.selectedMode);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-200">Study Mode</p>
      <Select
        value={selectedMode}
        onValueChange={(value) => dispatch(setSelectedMode(value as PromptMode))}
      >
        <SelectTrigger className="border-l-4 border-blue-600 border-slate-700 bg-slate-900 text-slate-100 shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select mode" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 shadow-xl animate-fade-in">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="hover:bg-blue-900/30 transition-colors duration-150">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}