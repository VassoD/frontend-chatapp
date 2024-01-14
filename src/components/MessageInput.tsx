// MessageInput.js
import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { AccessibleText } from "../pages/conversations";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

/**
 * Renders a message input component.
 *
 * @param {function} onSendMessage - Callback function to be invoked when a message is sent
 * @return {JSX.Element} The rendered message input component
 */
export const MessageInput = ({
  onSendMessage,
}: MessageInputProps): JSX.Element => {
  const [newMessage, setNewMessage] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMessageType = () => {
    setIsPrivate((prev) => !prev);
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        value={newMessage}
        onChange={handleInputChange}
        placeholder="Type your message..."
        onKeyDown={handleKeyDown}
      />
      <ToggleButton onClick={toggleMessageType}>
        <ToggleText isActive={isPrivate}>Private</ToggleText>
        <ToggleText isActive={!isPrivate}>Public</ToggleText>
      </ToggleButton>
      <SendButton onClick={handleSendMessage}>
        <AccessibleText>Send</AccessibleText>
        <IoIosSend />
      </SendButton>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 10px;
  margin-top: auto;
  display: flex;
  gap: 0.25rem;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  border-radius: 4px;
  padding: 1rem;
  font-size: 1rem;

  &:focus {
    outline-color: #ec6e24;
  }
`;

const SendButton = styled.button`
  background-color: #ec6e24;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  border-radius: 4px;
  gap: 0.25rem;
  padding: 0 1rem;
  cursor: pointer;

  &:hover {
    background-color: #da6623;
  }
`;

const ToggleButton = styled.button`
  border: 1px solid #ec6e24;
  color: #ec6e24;
  border: none;
  font-size: 1rem;
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ToggleText = styled.span`
  text-align: center;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  text-decoration: ${(props) => (props.isActive ? "underline" : "none")};
  transition: opacity 0.3s, text-decoration 0.3s, font-weight 0.3s;
`;
