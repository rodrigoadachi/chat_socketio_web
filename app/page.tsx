"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { ChatType } from "./types/Chat";
import { useGlobalContext } from "./Context/user";
import { ChatContextProvider } from "./Context/chat";
import Messages from "./components/Messages";
import SendArrow from "./assets/SendArrow";

export default function Home() {
  const chatContainerRef = useRef(null);
  const { data: session } = useSession();
  const { user } = useGlobalContext();
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [message, setMessage] = useState<string>("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const socket: Socket = io(BASE_URL);

  const handleSend = async () => {
    if (session && socket.id) {
      const newMessage: ChatType = {
        id: socket.id,
        chatId: socket.id,
        author: user,
        authorId: user.id,
        text: message,
        timestamp: new Date().toISOString(),
      };
      console.log({ newMessage });
      if (!!newMessage?.text) socket.emit("NewMessageToServer", newMessage);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    socket.emit("NewConnection", user);
  }, [user]);

  useEffect(() => {
    socket.on("UpdateMsgs", ({ userId, msgs }) => {
      if (userId === user?.id) {
        setMessages(msgs);
      }
    });

    socket.on("NewMessageFromServer", (msg) => {
      if (msg.message) {
        const data: ChatType = {
          id: msg.id,
          chatId: msg.chatId,
          author: msg.author,
          authorId: msg.author?.id,
          text: msg.message,
          timestamp: msg.timestamp,
        };
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatContextProvider user={user}>
      <div className="flex-1 w-screen bg-[#0b141a] flex flex-col">
        <div
          className="flex-grow h-0 px-6 py-1 pb-2 overflow-auto"
          ref={chatContainerRef}
        >
          {!!messages?.length && (
            <div className="flex-col space-y flex flex-col gap-y-3">
              {messages?.map((msg: ChatType, key) => (
                <Messages key={key} message={msg} />
              ))}
            </div>
          )}
        </div>

        <div className="w-full h-[60px] grid grid-cols-6 lg:grid-cols-8 gap-1 bg-[#202c33] p-2">
          <input
            className={`bg-gray-700 rounded-md h-[40px] text-white text-sm p-2 col-span-5 lg:col-span-7 ${
              session
                ? "bg-[#2a3942] text-black"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            placeholder={
              session ? "Mensagem" : "Faça login para enviar mensagens"
            }
            value={message}
            onChange={(event) => setMessage(event?.target?.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") handleSend();
            }}
          />
          <button
            className={`
              rounded-full bg-transparent p-2 flex flex-col items-center justify-center
              ${
                session
                  ? "bg-gray-300 text-black cursor-pointer"
                  : "bg-gray-400 text-gray-300 cursor-not-allowed"
              }`}
            onClick={handleSend}
          >
            <SendArrow />
          </button>
        </div>
      </div>
    </ChatContextProvider>
  );
}
