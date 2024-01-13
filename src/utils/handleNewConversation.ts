import { Dispatch, SetStateAction } from "react";
import { Conversation } from "../types/conversation";
import { User } from "../types/user";
import { getLoggedUserId } from "./getLoggedUserId";
import { Message } from "../types/message";

interface HandleNewConversationProps {
  conversations: Conversation[];
  setConversations: Dispatch<SetStateAction<Conversation[]>>;
  setSelectedConversation: Dispatch<SetStateAction<number | null>>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  getUsers: () => Promise<User[]>;
}

/**
 * Handles a new conversation.
 *
 * @param {HandleNewConversationProps} conversations - The conversations object.
 * @param {Function} setConversations - The function to set the conversations object.
 * @param {Function} setSelectedConversation - The function to set the selected conversation.
 * @param {Function} setMessages - The function to set the messages object.
 * @return {Promise<void>} A promise that resolves when the new conversation is handled.
 */
export const handleNewConversation =
  ({
    conversations,
    setConversations,
    setSelectedConversation,
    setMessages,
    getUsers,
  }: HandleNewConversationProps) =>
  async () => {
    try {
      const users = await getUsers();
      if (!Array.isArray(users) || users.length === 0) {
        console.error("Error fetching users: Invalid user data");
        return;
      }

      // filter users who do not have an open conversation
      const availableUsers: User[] = users.filter(
        (user) =>
          !conversations.some((conv) => conv.user && conv.user.includes(user))
      );
      if (availableUsers.length === 0) {
        console.log("No available users for a new conversation.");
        return;
      }

      const randomUser =
        availableUsers[Math.floor(Math.random() * availableUsers.length)];

      const newConversation: Conversation = {
        id: conversations.length + 1,
        recipientId: randomUser.id,
        recipientNickname: randomUser.nickname,
        senderId: getLoggedUserId(),
        senderNickname: "Me",
        lastMessageTimestamp: Date.now(),
        user: [randomUser],
      };

      setConversations((prevConversations: Conversation[]) => [
        ...prevConversations,
        newConversation,
      ]);
      setSelectedConversation(newConversation.id);
      setMessages([]);

      console.log("New Conversation:", newConversation);
    } catch (error) {
      console.error("Error creating new conversation:", error);
    }
  };
