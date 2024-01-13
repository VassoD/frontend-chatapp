// components/MessageList.js
import React from "react";
import styled from "styled-components";
import { Message } from "../types/message";

interface MessageListProps {
  messages: Message[];
  currentUserId: number;
}

/**
 * Renders a list of messages.
 *
 * @param {Message[]} messages - An array of messages to be displayed.
 * @param {string} currentUserId - The ID of the current user.
 * @return {JSX.Element} - The rendered list of messages.
 */
const MessageList = ({
  messages,
  currentUserId,
}: MessageListProps): JSX.Element => {
  console.log("messages in MessageList:", messages);

  return (
    <MessageContainer>
      {messages.map((message) => {
        const isSentByAuthor = message.authorId === currentUserId;

        return (
          <MessageItem key={message.id} isSentByAuthor={isSentByAuthor}>
            {message.body}
          </MessageItem>
        );
      })}
    </MessageContainer>
  );
};

export default MessageList;

const MessageContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column; /* Align messages vertically */
`;

const MessageItem = styled.li<{ isSentByAuthor: boolean }>`
  border: 1px solid
    ${(props) => (!props.isSentByAuthor ? "#ec6e24" : "#e1e1e1")};
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: ${(props) =>
    props.isSentByAuthor ? "10px 10px 0 10px" : "10px 10px 10px 0"};
  box-shadow: 0 2px 4px rgba(179, 179, 179, 0.1);
  text-align: ${(props) => (props.isSentByAuthor ? "right" : "left")};
  white-space: pre-line;
  max-width: 70%;
  align-self: ${(props) => (props.isSentByAuthor ? "flex-end" : "flex-start")};
`;
