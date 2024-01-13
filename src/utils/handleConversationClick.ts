import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { Conversation } from "../types/conversation";
import { Message } from "../types/message";

interface HandleConversationClickProps {
  conversations: Conversation[];
  setSelectedConversation: Dispatch<SetStateAction<number | null>>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const handleConversationClick =
  ({
    conversations,
    setSelectedConversation,
    setMessages,
  }: HandleConversationClickProps) =>
  (conversationId: number) => {
    setSelectedConversation(conversationId);
    const selectedMessages =
      conversations.find((conv) => conv.id === conversationId)?.messages || [];

    const updatedMessages: Message[] = selectedMessages.map((message) => ({
      ...message,
      id: message.id,
      conversationId: conversationId,
      timestamp: message.timestamp,
      authorId: message.authorId,
      body: message.body,
    }));

    setMessages(updatedMessages);
  };
