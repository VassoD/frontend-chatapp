// api/conversations.js
import { Conversation } from "../types/conversation";
import { fetchAPI } from "./api";

/**
 * Retrieves conversations by fetching messages from the API and grouping them by conversationId.
 *
 * @return {Array} An array of conversation objects containing the conversationId and messages.
 * @throws {Error} If there is an error fetching messages.
 */
export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const messages = await fetchAPI("/messages");

    // group messages by conversationId
    const groupMessagesByConversation = (messages): Conversation[] => {
      const conversations = {};

      messages.forEach((message) => {
        const { conversationId } = message;
        if (!conversations[conversationId]) {
          conversations[conversationId] = {
            id: conversationId,
            messages: [],
          };
        }

        conversations[conversationId].messages.push(message);
      });

      return Object.values(conversations);
    };

    return groupMessagesByConversation(messages);
  } catch (error) {
    throw new Error("Error fetching messages");
  }
};

export const getUsers = async () => {
  try {
    const users = await fetchAPI("/users");
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};
