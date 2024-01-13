import { useEffect, useState } from "react";
import { handleSendMessage } from "../utils/handleSendMessage";
import { handleConversationClick } from "../utils/handleConversationClick";
import { handleNewConversation } from "../utils/handleNewConversation";
import { Conversation } from "../types/conversation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { getConversations, getUsers } from "../api/getConversations";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import styled from "styled-components";
import { SiTheconversation } from "react-icons/si";
import { ConversationList } from "../components/ConversationList";
import MessageList from "../components/MessageList";
import { MessageInput } from "../components/MessageInput";

const Conversations = (): JSX.Element => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isChatListVisible, setIsChatListVisible] = useState(true);

  useEffect(() => {
    const fetchConversations = async (): Promise<void> => {
      try {
        const data: Conversation[] = await getConversations();
        const conversation: Conversation[] = data as Conversation[];

        setConversations(conversation);
        console.log("Conversations:", conversation);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await getUsers();
        setUsers(userResponse);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getUserNickname = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.nickname : `User ${userId}`;
  };

  const sendMessage = handleSendMessage({
    conversations,
    selectedConversation,
    setMessages,
    getLoggedUserId,
  });

  const handleClick = handleConversationClick({
    conversations,
    setSelectedConversation,
    setMessages,
  });

  const handleNewConv = handleNewConversation({
    conversations,
    setConversations,
    setSelectedConversation,
    setMessages,
    getUsers,
  });

  const toggleChatListVisibility = () => {
    setIsChatListVisible((prev) => !prev);
  };

  return (
    <Container>
      <MobileToggleChatListButton onClick={toggleChatListVisibility}>
        {isChatListVisible ? (
          <>
            <AiOutlineClose />
            <AccessibleText>Hide conversations</AccessibleText>
          </>
        ) : (
          <>
            <AiOutlineMenu />
            <AccessibleText>Show conversations</AccessibleText>
          </>
        )}
      </MobileToggleChatListButton>
      <ChatList isVisible={isChatListVisible}>
        <Button onClick={handleNewConv}>
          <SiTheconversation />
          <AccessibleText>New Conversation</AccessibleText>
        </Button>
        {conversations.map((conversation, index) => (
          <ConversationList
            key={conversation.id}
            onClick={() => handleClick(conversation.id)}
            selected={selectedConversation === conversation.id}
            avatarSrc={`https://robohash.org/${index}.png`}
            nickname={getUserNickname(conversation.id)}
          />
        ))}
      </ChatList>
      <MessageContainer>
        {selectedConversation !== null ? (
          <>
            <ConversationHeader>
              Chat with {getUserNickname(selectedConversation)}
            </ConversationHeader>
            <MessageList
              currentUserId={getLoggedUserId()}
              messages={messages}
            />
            <MessageInput onSendMessage={sendMessage} />
          </>
        ) : (
          <PlaceholderMessage>
            Select a conversation from the list <br /> or start a new one.
          </PlaceholderMessage>
        )}
      </MessageContainer>
    </Container>
  );
};

export default Conversations;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChatList = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  flex-direction: column;
  gap: 0.75rem;
  //add shadow
  box-shadow: 0 0 8px rgba(203, 200, 200, 0.2);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 8px rgba(203, 200, 200, 0.2);
  flex-grow: 1;
`;

const ConversationHeader = styled.h3``;

const Button = styled.button`
  background: #ec6e24;
  border: 1px solid transparent;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 0.25rem;
  text-transform: uppercase;
  transition: background 0.5s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  gap: 0.5rem;
  font-size: 1.5rem;

  &:hover {
    background: #ffffff;
    border: 1px solid #ec6e24;
    color: #ec6e24;
  }
`;

const PlaceholderMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #a8a6a6;
`;

const MobileToggleChatListButton = styled.button`
  background: none;
  border: none;
  color: #ec6e24;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid #ec6e24;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const AccessibleText = styled.p`
  font-size: 1rem;
`;
