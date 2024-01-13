import React from "react";
import styled from "styled-components";

interface ConversationProps {
  selected: boolean;
  avatarSrc: string;
  nickname: string;
  onClick: () => void;
}

/**
 * Renders a conversation component.
 *
 * @param {ConversationProps} selected - Indicates if the conversation is selected.
 * @param {string} avatarSrc - The source URL of the avatar image.
 * @param {string} nickname - The nickname of the conversation.
 * @param {() => void} onClick - The click event handler for the conversation.
 * @return {JSX.Element} The rendered conversation component.
 */

export const ConversationList = ({
  selected,
  avatarSrc,
  nickname,
  onClick,
}: ConversationProps): JSX.Element => (
  <ConversationContainer onClick={onClick} selected={selected}>
    <Avatar src={avatarSrc} alt="User Avatar" />
    {nickname}
  </ConversationContainer>
);

const ConversationContainer = styled.div<{ selected: boolean }>`
  background-color: #fff;
  padding: 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.5s, transform 0.5s;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }

  ${({ selected }) => `
    border: 1px solid ${selected ? "#ec6e24" : "transparent"};
  `}
`;

const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.75rem;
`;
