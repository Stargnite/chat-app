import { Avatar } from "@/components/ui/avatar";
import { useChatStore } from "../lib/store";
import ChatInput from "./ChatInput";
import { ArrowLeft, Ellipsis } from "lucide-react";
import RightClickContext from "./RightClickContext";
import ToolTipWrapper from "./ToolTipWrapper";
import ChatBubble from "./ChatBubble";
import axiosInstance from "@/api/api";
import { useEffect, useState } from "react";

export default function ChatBox() {
  const { selectedUser, setSelectedUser, messageData } = useChatStore();
  const [conversation, setConversation] = useState([]);
  const [isReceived, setIsReceived] = useState(false)

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/chat/${selectedUser?.receiver_email}`
        );
        const data = response.data.data;

        setConversation(data)
        console.log("conversations>>>>", conversation)

        console.log("Conversation for the selected user>>>>>>>>>>", data);
      } catch (error) {
        console.log("error for fetching selectedUser's chats", error);
      }
    };

 
      if(selectedUser?.receiver_email === messageData?.userId) {
        setIsReceived(true)
        
      } else {
        setIsReceived(false)
      }


    getConversations();
  }, [selectedUser]);

  return (
    <div
      className={`flex flex-col min-h-[100vh] md:min-h-[88vh] md:max-h-[88vh] w-[100vw] bg-white shadow-sm rounded-sm
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
                <button className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70">
                  <div className="rounded-full w-6 h-6 bg-blue-600 text-white flex items-center justify-center">
                    <Ellipsis className="w-4 h-4" />
                  </div>
                </button>
              </RightClickContext>
            </ToolTipWrapper>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <ChatBubble
              message={"heyy"}
              timestamp="12:00"
              userName={selectedUser.receiver_name}
              userAvatar={selectedUser.receiver_picture}
              isReceived={true}
            />
            {messageData && (
              <ChatBubble
                messageId={messageData.id}
                message={messageData.text}
                timestamp={messageData.timestamp}
                userName={selectedUser.receiver_name}
                userAvatar="test"
                isReceived={false}
              />
            )}
            {/* {conversation.length > 0 ? (
              conversation.map((message) => (
              <ChatBubble
                messageId={messageData.id}
                message={messageData.text}
                timestamp={messageData.timestamp}
                userName={selectedUser.receiver_name}
                userAvatar="test"
                isReceived={false}
              />
                <ChatBubble key={index} message={msg.message} timestamp={msg.timestamp} userName={selectedUser.name} userAvatar="test" isReceived={msg.isReceived} />
              ))} */}
            {/* <div className="flex flex-col space-y-5 items-center h-full text-gray-500 text-sm">
              <Avatar className="h-20 w-20 mr-3">
                <img src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
              </Avatar>
              <p className="poppins-medium">Start a conversation with {selectedUser.name} </p>
            </div> */}
          </div>

          {/* Message input */}
          <ChatInput />
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

// import { Avatar } from "@/components/ui/avatar"
// import { useChatStore } from "../lib/store"
// import ChatInput from "./ChatInput"
// import { ArrowLeft, Ellipsis } from "lucide-react"
// import RightClickContext from "./RightClickContext"
// import ToolTipWrapper from "./ToolTipWrapper"
// import ChatBubble from "./ChatBubble"

// export default function ChatBox() {
//   const { selectedUser, setSelectedUser, message } = useChatStore();

//   return (
//     <div className={`flex flex-col min-h-[100vh] md:min-h-[88vh] md:max-h-[88vh] w-[100vw] bg-white shadow-sm rounded-sm
//       ${selectedUser ? "block" : "hidden"}`}>
//       {selectedUser ? (
//         <>
//           {/* Chat header */}
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//             <div className=" flex items-center">
//               <ArrowLeft className="h-5 w-5 mr-3 text-black cursor-pointer hover:text-gray-700 transition-all" onClick={() => setSelectedUser(null)} />
//               <Avatar className="h-8 w-8 mr-3">
//                 <img src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
//               </Avatar>
//               <div>
//                 <h3 className="font-medium text-sm text-gray-800 poppins-medium">{selectedUser.name}</h3>
//                 <p className="text-xs text-gray-500 poppins-regular">{selectedUser.online ? "Active now" : "Offline"}</p>
//               </div>
//             </div>

//             {/* Right click context menu trigger */}
//             <ToolTipWrapper>
//               <RightClickContext user={selectedUser}>
//                 <button className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70">
//                   <div className="rounded-full w-6 h-6 bg-blue-600 text-white flex items-center justify-center">
//                     <Ellipsis className="w-4 h-4" />
//                   </div>
//                 </button>
//               </RightClickContext>
//             </ToolTipWrapper>

//           </div>

//           {/* Chat messages */}
//           <div className="flex-1 p-4 overflow-y-auto">
//             <ChatBubble message={"heyy"} timestamp="12:00" userName={selectedUser.name} userAvatar={selectedUser.avatar} isReceived={true} />
//             {message && (<ChatBubble message={message} timestamp="12:00" userName={selectedUser.name} userAvatar="test" isReceived={false} />)}
//             {/* {message && message.length > 0 ? (
//               message.map((msg, index) => (
//                 <ChatBubble key={index} message={msg.message} timestamp={msg.timestamp} userName={selectedUser.name} userAvatar="test" isReceived={msg.isReceived} />
//               ))} */}
//             {/* <div className="flex flex-col space-y-5 items-center h-full text-gray-500 text-sm">
//               <Avatar className="h-20 w-20 mr-3">
//                 <img src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
//               </Avatar>
//               <p className="poppins-medium">Start a conversation with {selectedUser.name} </p>
//             </div> */}
//           </div>

//           {/* Message input */}
//           <ChatInput />
//         </>
//       ) : (
//         <div className="flex justify-center items-center h-full">
//           <p className="font-normal text-lg text-gray-500">Select a user to begin chatting</p>
//         </div>
//       )}
//     </div>
//   )
// }
