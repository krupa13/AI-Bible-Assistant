import { buildSystemPrompt } from "@/lib/prompts";
import { openAi } from "@/lib/openai";
import { PromptMode } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            message,
            mode,
            history,
        }: {
            message: string,
            mode: PromptMode;
            history?: { role: "user" | "assistant"; content: string }[];
        } = body;

        if(!message?.trim()) {
            return NextResponse.json(
                { error: "Message is required."},
                { status: 400 }
            );
        }

        const systemPrompt = buildSystemPrompt(mode);

        const conversationText = [
            ...((history || []).slice(-8).map(
                (item) => `${item.role.toUpperCase()}: ${item.content}`
            )),
            `User: ${message}`,
        ].join("\n\n");

        const response = await openAi.responses.create({
            model: process.env.OPENAI_MODEL || "gpt-5.4",
            input: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: conversationText,
                },
            ],
        });

        const outputText = response.output_text?.trim();

        if(!outputText) {
            return NextResponse.json(
                { error: "No response generated from AI."},
                { status: 500 }
            )
        }

        return NextResponse.json({ answer: outputText });
    } catch (error) {
        console.error("AI route error: ", error);
        return NextResponse.json(
            {error: "Failed to generate response from AI."},
            { status: 500 }
        );
    }
}