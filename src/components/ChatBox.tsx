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

export default function ChatBox({
  currentUser,
}: {
  currentUser: {
    id: number;
    name: string;
    email: string;
    picture: string;
  };
}) {
  const { selectedUser, setSelectedUser } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
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
    // {
    //   id: "0196200c-4493-7125-928a-bf95ba6cc3fe",
    //   sender_id: 3731,
    //   sender_picture: "",
    //   sender_name: "",
    //   sender_email: "tech@vindove.com",
    //   receiver_id: 1046,
    //   receiver_picture:
    //     "https://profile11.s3.ca-central-1.amazonaws.com/2635010406",
    //   receiver_name: "ashish lakhani",
    //   receiver_email: "ashish7730@gmail.com",
    //   message: "Hello, hope this works",
    //   document: null,
    //   archived_for: null,
    //   deleted_for: null,
    //   read_at: null,
    //   created_at: "2025-04-10T14:13:17.000000Z",
    //   updated_at: "2025-04-10T14:13:17.000000Z",
    // },
    // {
    //   id: "0196200b-d6e4-7072-b38c-69697fd2bc73",
    //   sender_id: 3731,
    //   sender_picture: "",
    //   sender_name: "",
    //   sender_email: "tech@vindove.com",
    //   receiver_id: 1046,
    //   receiver_picture:
    //     "https://profile11.s3.ca-central-1.amazonaws.com/2635010406",
    //   receiver_name: "ashish lakhani",
    //   receiver_email: "ashish7730@gmail.com",
    //   message: "Hello, hope this works",
    //   document: null,
    //   archived_for: null,
    //   deleted_for: null,
    //   read_at: null,
    //   created_at: "2025-04-10T14:12:49.000000Z",
    //   updated_at: "2025-04-10T14:12:49.000000Z",
    // },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/chat/${selectedUser?.receiver_email}`
        );
        const data = response.data.data;

        setConversation(data);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        // console.log("Conversation for the selected user>>>>>>>>>>", data);
      } catch (error) {
        // console.log("error for fetching selectedUser's chats", error);
      }
    };

    getConversations();
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedUser?.receiver_email) return;

    // Join room or register this chat
    // socket.emit("joinRoom", {
    //   sender: "tech@vindove.com", // Or currentUser.email
    //   receiver: selectedUser.receiver_email,
    // });

    // Listen for new messages
    // socket.on("newMessage", (incomingMessage) => {
    //   setConversation((prev) => [...prev, incomingMessage]);
    // });

    // return () => {
    //   socket.off("newMessage");
    // };
    scrollToBottom()
  }, [selectedUser]);

  return (
    <div
      className={`flex flex-col min-h-full md:min-h-[88vh] md:max-h-[88vh] w-[100vw] bg-white shadow-sm rounded-sm
      ${selectedUser ? "block" : "hidden"}`}
    >
      {selectedUser ? (
        <>
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className=" flex items-center">
              <ArrowLeft
                className="h-5 w-5 mr-3 text-black cursor-pointer hover:text-gray-700 transition-all"
                onClick={() => setSelectedUser(undefined)}
              />
              <Avatar className="h-8 w-8 mr-3">
                <img
                  src={selectedUser.receiver_picture || "/placeholder.svg"}
                  alt={selectedUser.receiver_name}
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
          <div className="flex-1 p-4 overflow-y-auto">
            {conversation.length > 0 ? (
              conversation
              .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
              .map((msg) => (
                <div key={msg.id} className="">
                  <MessageRightClickContext mailId={msg.id}>
                    <ChatBubble
                      messageId={msg.id}
                      message={msg.message}
                      timestamp={new Date(msg.created_at).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
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
                      isReceived={msg.sender_id !== currentUser.id}
                    />
                  </MessageRightClickContext>
                  <div ref={messagesEndRef} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
                <Avatar className="h-20 w-20 mb-3">
                  <img
                    src={selectedUser.receiver_picture || "/placeholder.svg"}
                    alt={selectedUser.receiver_name}
                  />
                </Avatar>
                <p className="poppins-medium">
                  Start a conversation with {selectedUser.receiver_name}
                </p>
              </div>
            )}
          </div>

          {/* Message input */}
          <ChatInput currentUser={currentUser} selectedUser={selectedUser} />
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

// {
//   id: "0196200f-2be1-7333-b71b-8a1cec9d09e3",
//   sender_id: 3731,
//   sender_picture: "",
//   sender_name: "",
//   sender_email: "tech@vindove.com",
//   receiver_id: 1046,
//   receiver_picture:
//     "https://profile11.s3.ca-central-1.amazonaws.com/2635010406",
//   receiver_name: "ashish lakhani",
//   receiver_email: "ashish7730@gmail.com",
//   message: "Lets go again",
//   document: null,
//   archived_for: null,
//   deleted_for: null,
//   read_at: null,
//   created_at: "2025-04-10T14:16:27.000000Z",
//   updated_at: "2025-04-10T14:16:27.000000Z",
// },
// {
//   id: "0196200c-4493-7125-928a-bf95ba6cc3fe",
//   sender_id: 3731,
//   sender_picture: "",
//   sender_name: "",
//   sender_email: "tech@vindove.com",
//   receiver_id: 1046,
//   receiver_picture:
//     "https://profile11.s3.ca-central-1.amazonaws.com/2635010406",
//   receiver_name: "ashish lakhani",
//   receiver_email: "ashish7730@gmail.com",
//   message: "Hello, hope this works",
//   document: null,
//   archived_for: null,
//   deleted_for: null,
//   read_at: null,
//   created_at: "2025-04-10T14:13:17.000000Z",
//   updated_at: "2025-04-10T14:13:17.000000Z",
// },
// {
//   id: "0196200b-d6e4-7072-b38c-69697fd2bc73",
//   sender_id: 3731,
//   sender_picture: "",
//   sender_name: "",
//   sender_email: "tech@vindove.com",
//   receiver_id: 1046,
//   receiver_picture:
//     "https://profile11.s3.ca-central-1.amazonaws.com/2635010406",
//   receiver_name: "ashish lakhani",
//   receiver_email: "ashish7730@gmail.com",
//   message: "Hello, hope this works",
//   document: null,
//   archived_for: null,
//   deleted_for: null,
//   read_at: null,
//   created_at: "2025-04-10T14:12:49.000000Z",
//   updated_at: "2025-04-10T14:12:49.000000Z",
// },
