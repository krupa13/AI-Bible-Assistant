import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessageType, ChatState, PromptMode } from "@/types/chat";
import { stat } from "fs";

const initialState: ChatState = {
    messages: [
        {
            id: "welcome-message",
            role: "assistant",
            content: "Welcome to AI Bible Study Assistant. Ask me to explain a passage, create a sermon outline, suggest cross references, or prepare a devotion.",
            createdAt: new Date().toISOString(),
        },
    ],
    selectedMode: "explain",
    loading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ChatMessageType>) => {
            state.messages.push(action.payload);
        },
        setSelectedMode: (state, action: PayloadAction<PromptMode>) => {
            state.selectedMode = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [
                {
            id: "welcome-message",
            role: "assistant",
            content: "Welcome to AI Bible Study Assistant. Ask me to explain a passage, create a sermon outline, suggest cross references, or prepare a devotion.",
            createdAt: new Date().toISOString(),
        },
            ];
            state.error = null;
            state.loading = false;
        }
    }
});

export const {
    addMessage,
    setSelectedMode,
    setLoading,
    setError,
    clearMessages
} = chatSlice.actions;

export default chatSlice.reducer;