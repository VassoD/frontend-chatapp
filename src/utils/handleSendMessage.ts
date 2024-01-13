import { v4 as uuidv4 } from "uuid";
import { Conversation } from "../types/conversation";
import { Message } from "../types/message";
import { Dispatch, SetStateAction } from "react";
import { postMessage } from "../api/postMessage";

interface HandleSendMessageProps {
  conversations: Conversation[];
  selectedConversation: number | null;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  getLoggedUserId: () => number;
}

/**
 * Handles sending a new message.
 *
 * @param {string} selectedConversation - The id of the selected conversation.
 * @param {function} setMessages - The function to set the messages.
 * @param {function} getLoggedUserId - The function to get the logged user id.
 * @return {Promise<void>} A promise that resolves when the message is sent successfully.
 */
export const handleSendMessage =
  ({
    conversations,
    selectedConversation,
    setMessages,
    getLoggedUserId,
  }: HandleSendMessageProps) =>
  async (newMessage: string) => {
    console.log("New Message:", newMessage);

    const conversationIndex = conversations.findIndex(
      (conv) => conv.id === selectedConversation
    );

    if (conversationIndex === -1) {
      console.error("Error: Unable to find conversation.");
      return;
    }

    const newMessageObj = {
      id: uuidv4(),
      conversationId: selectedConversation,
      timestamp: Date.now(),
      authorId: getLoggedUserId(),
      body: newMessage,
      isPrivate: false,
    };

    try {
      await postMessage(newMessageObj);

      const updatedConversations = [...conversations];
      const targetConversation = updatedConversations[conversationIndex];

      // Ensure targetConversation.messages is initialized
      if (!targetConversation.messages) {
        targetConversation.messages = [];
      }

      targetConversation.messages.push(newMessageObj);
      setMessages((prevMessages) => [...(prevMessages || []), newMessageObj]);
    } catch (error) {
      console.error("Error posting message to the API:", error);
    }
  };
