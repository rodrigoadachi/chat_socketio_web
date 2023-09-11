"use client";
import { ChatType } from "@/app/types/Chat";
import { useGlobalContext } from "../Context/user";

const Messages = ({ message }: ChatType) => {
  const { user } = useGlobalContext();

  return (
    <div className="chat-message w-max-[60px]">
      <div
        className={`flex  ${
          user?.id === message?.author?.id
            ? "justify-end items-end"
            : "items-start"
        }`}
      >
        {user?.id !== message?.author?.id && (
          <img
            src={message?.author?.image}
            alt="My profile"
            className="w-6 h-6 rounded-full order-2"
          />
        )}

        <div
          className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
            user?.id === message?.author?.id
              ? "items-end order-1"
              : "items-start order-2"
          }`}
        >
          <div>
            <span
              className={`break-word px-2 py-1 rounded-lg inline-block min-w-[50vw] ${
                user?.id === message?.author?.id
                  ? "rounded-tr-none bg-[#005c4b] text-white"
                  : "rounded-tl-none bg-[#202c33] text-white"
              }`}
            >
              <p
                className={`font-semibold text-[10px] ${
                  user?.id === message?.author?.id
                    ? "text-gray-400"
                    : "text-[#0ccb81]"
                }`}
              >
                {message?.author?.name}
              </p>
              <p className="text-sm">{message?.text}</p>
            </span>
          </div>
        </div>
        {user?.id === message?.author?.id && (
          <img
            src={message?.author?.image}
            alt="My profile"
            className="w-6 h-6 rounded-full order-2"
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
