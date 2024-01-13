import { Message } from "./message";
import { User } from "./user";

export interface Conversation {
  id: number;
  recipientId: number;
  recipientNickname: string;
  senderId: number;
  senderNickname: string;
  lastMessageTimestamp: number;
  messages?: Message[];
  user?: User[];
}
