export type PromptMode = 
    | "explain"
    | "sermon"
    | "cross-reference"
    | "devotion";

export type MessageRole =  "user" | "assistant";

export interface ChatMessageType  {
    id: string;
    role: MessageRole;
    content: string;
    createdAt: string;
}

export interface ChatState {
    messages: ChatMessageType[];
    selectedMode: PromptMode;
    loading: boolean;
    error: string | null;
}