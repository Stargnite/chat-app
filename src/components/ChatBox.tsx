import { Avatar } from "@/components/ui/avatar"
import { useChatStore } from "../lib/store"
import ChatInput from "./ChatInput"
import { ArrowLeft, Ellipsis } from "lucide-react"
import RightClickContext from "./RightClickContext"
import ToolTipWrapper from "./ToolTipWrapper"
import ChatBubble from "./ChatBubble"

export default function ChatBox() {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className={`flex flex-col min-h-[88vh] max-h-[88vh] w-[100vw] bg-white shadow-sm rounded-sm
      ${selectedUser ? "block" : "hidden"}`}>
      {selectedUser ? (
        <>
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className=" flex items-center">
              <ArrowLeft className="h-5 w-5 mr-3 text-black cursor-pointer hover:text-gray-700 transition-all" onClick={() => setSelectedUser(null)} />
              <Avatar className="h-8 w-8 mr-3">
                <img src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm text-gray-800 poppins-medium">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500 poppins-regular">{selectedUser.online ? "Active now" : "Offline"}</p>
              </div>
            </div>

            {/* Right click context menu trigger */}
            <ToolTipWrapper>
              <RightClickContext>
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
            <ChatBubble message={"heyy"} timestamp="12:00" userName={selectedUser.name} userAvatar="test" isReceived={true} />
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
          <p className="font-normal text-lg text-gray-500">Select a user to begin chatting</p>
        </div>
      )}
    </div>
  )
}

