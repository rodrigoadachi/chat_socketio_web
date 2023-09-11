"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserType } from "../types/User";
import { ChatType } from "../types/Chat";

interface ContextProps {
  userChat: ChatType;
  isUserChatsloading: boolean;
  userChatsError: any;
}

const ChatContext = createContext<ContextProps>({} as ContextProps);

export const ChatContextProvider = ({ children, user }) => {
  const [userChat, setUserChat] = useState<{} | UserType>(null);
  const [isUserChatsloading, setIsUserChatsloading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  useEffect(() => {
    const getUserChat = async () => {
      if (user?.id) {
        // setIsUserChatsloading(true);
        // setUserChatsError(null);
        // const response = await
        // setIsUserChatsloading(false);
        // if (response?.error) return setUserChatsError(response);
      }
    };
    getUserChat();
  }, [user]);
  return (
    <ChatContext.Provider
      value={{ userChat, isUserChatsloading, userChatsError }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
