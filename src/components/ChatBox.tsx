import { Avatar } from "@/components/ui/avatar";
import { useChatStore } from "../lib/store";
import ChatInput from "./ChatInput";
import { ArrowLeft, Ellipsis } from "lucide-react";
import RightClickContext from "./ChatRightClickContext";
import ToolTipWrapper from "./ToolTipWrapper";
import ChatBubble from "./ChatBubble";
import axiosInstance from "@/api/api";
import { useEffect, useRef, useState } from "react";
// import socket from "../lib/socket";
import MessageRightClickContext from "./MessageRightClickContext";
import echo from "@/lib/echo";
import placeholderImg from "@/assets/dummyImgs/placeholder.png";

type ChatBoxProps = {
  currentUser: {
    id: number;
    name: string;
    email: string;
    picture: string;
  };
};

export default function ChatBox({ currentUser }: ChatBoxProps) {
  const { selectedUser, setSelectedUser } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([
    {
      id: "0196200f-2be1-7333-b71b-8a1cec9d09e3",
      sender_id: 3731,
      sender_picture: "",
      sender_name: "",
      sender_email: "tech@vindove.com",
      receiver_id: 1046,
      receiver_picture:
        "https://profile11.s3.ca-central-1.amazonaws.com/2635010406",
      receiver_name: "ashish lakhani",
      receiver_email: "ashish7730@gmail.com",
      message: "Lets go again",
      document: null,
      archived_for: null,
      deleted_for: null,
      read_at: null,
      created_at: "2025-04-10T14:16:27.000000Z",
      updated_at: "2025-04-10T14:16:27.000000Z",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!selectedUser?.receiver_email) return;

    const getConversations = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/api/v1/chat/${selectedUser.receiver_email}`
        );
        const data = response.data.data;
        setConversation(data);
        setIsLoading(false);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setIsLoading(false);
      }
    };

    getConversations();
  }, [selectedUser?.receiver_email]);

  useEffect(() => {
    if (!selectedUser?.receiver_email) return;

    const channel = echo.channel(`chat.${selectedUser.receiver_email}`);

    channel.listen("MessageEvent", (event: any) => {
      console.log("New message received from Reverb:", event);
      setConversation((prev) => [...prev, event.message]);
      scrollToBottomIfNearEnd();
    });
    scrollToBottomIfNearEnd();

    echo.connector.pusher.connection.bind("connected", () => {
      console.log("Connected to Reverb");
    });

    return () => {
      channel.stopListening("MessageEvent");
      echo.leave(`chat.${selectedUser.receiver_email}`);
    };
  }, [selectedUser?.receiver_email, conversation]);

  const scrollToBottomIfNearEnd = () => {
    const container = messagesEndRef.current?.parentNode as HTMLElement | null;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`flex flex-col min-h-full md:min-h-[92vh] md:max-h-[90vh] w-[100vw] bg-white shadow-sm rounded-sm
      ${selectedUser?.receiver_email ? "block" : "hidden"}`}
    >
      {selectedUser ? (
        <>
          {/* Chat header */}
          <div className="flex sticky w-full top-0 z-10 bg-white items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className=" flex items-center">
              <ArrowLeft
                className="h-5 w-5 mr-3 text-black cursor-pointer hover:text-gray-700 transition-all"
                onClick={() => setSelectedUser(null)}
              />
              <Avatar className="h-8 w-8 mr-3">
                <img
                  src={
                    selectedUser.receiver_picture?.trim()
                      ? selectedUser.receiver_picture
                      : placeholderImg
                  }
                  alt={selectedUser.receiver_name}
                  className="rounded-full"
                />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm text-gray-800 poppins-medium">
                  {selectedUser.receiver_name}
                </h3>
                <p className="text-xs text-gray-500 poppins-regular">
                  {/* {selectedUser.online ? "Active now" : "Offline"} */}
                  Active now
                </p>
              </div>
            </div>

            {/* Right click context menu trigger */}
            <ToolTipWrapper>
              <RightClickContext user={selectedUser}>
                <div className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70">
                  <div className="rounded-full w-6 h-6 bg-blue-600 text-white flex items-center justify-center">
                    <Ellipsis className="w-4 h-4" />
                  </div>
                </div>
              </RightClickContext>
            </ToolTipWrapper>
          </div>

          {/* Chat messages */}
          {isLoading ? (
            <div className="flex-1 flex w-full items-center justify-center text-gray-700 py-5">
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto">
              {currentUser.id && conversation.length > 0 ? (
                conversation
                .sort(
                  (a, b) =>
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                )
                .map((msg) => {
                  const parsedDate = new Date(msg.created_at);
                  if (isNaN(parsedDate.getTime())) return null; // skip rendering
              
                  return (
                    <div key={msg.id}>
                      <MessageRightClickContext
                        mailId={msg.id}
                        setConversation={setConversation}
                      >
                        <ChatBubble
                          messageId={msg.id}
                          message={msg.message}
                          timestamp={parsedDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          userName={
                            msg.sender_id !== currentUser.id
                              ? msg.sender_name
                              : currentUser.name
                          }
                          userAvatar={
                            msg.sender_id !== currentUser.id
                              ? msg.sender_picture || "/placeholder.svg"
                              : currentUser.picture || "/placeholder.svg"
                          }
                          isReceived={String(currentUser.id) !== String(msg.sender_id)}
                        />
                      </MessageRightClickContext>
                      <div ref={messagesEndRef} />
                    </div>
                  )
                })
              
                // conversation
                //   .sort(
                //     (a, b) =>
                //       new Date(a.created_at).getTime() -
                //       new Date(b.created_at).getTime()
                //   )
                //   .map((msg) => (
                //     <div key={msg.id} className="">
                //       <MessageRightClickContext mailId={msg.id} setConversation={setConversation}>
                //         <ChatBubble
                //           messageId={msg.id}
                //           message={msg.message}
                //           timestamp={new Date(
                //             msg.created_at
                //           ).toLocaleTimeString([], {
                //             hour: "2-digit",
                //             minute: "2-digit",
                //           })}
                //           userName={
                //             msg.sender_id !== currentUser.id
                //               ? msg.sender_name
                //               : currentUser.name
                //           }
                //           userAvatar={
                //             msg.sender_id !== currentUser.id
                //               ? msg.sender_picture || "/placeholder.svg"
                //               : currentUser.picture || "/placeholder.svg"
                //           }
                //           isReceived={
                //             String(currentUser.id) !== String(msg.sender_id)
                //           }
                //         />
                //       </MessageRightClickContext>
                //       <div ref={messagesEndRef} />
                //     </div>
                //   ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
                  <Avatar className="h-20 w-20 mb-3">
                    <img
                      src={
                        selectedUser.receiver_picture?.trim()
                          ? selectedUser.receiver_picture
                          : placeholderImg
                      }
                      alt={selectedUser.receiver_name}
                      className="rounded-full"
                    />
                  </Avatar>
                  <p className="poppins-medium">
                    Start a conversation with {selectedUser.receiver_name}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Message input */}
          <div className="sticky w-full bottom-0 z-10 bg-white">
            <ChatInput
              currentUser={currentUser}
              selectedUser={selectedUser}
              setConversation={setConversation}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="font-normal text-lg text-gray-500">
            Select a user to begin chatting
          </p>
        </div>
      )}
    </div>
  );
}
