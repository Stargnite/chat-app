import { Avatar } from "@/components/ui/avatar"
import { useChatStore } from "../lib/store"
import ChatInput from "./ChatInput"

export default function ChatMain() {
  const { selectedUser } = useChatStore()

  return (
    <div className="flex flex-col h-[90vh] w-[100vw] bg-white shadow-sm rounded-sm ">
      {selectedUser ? (
        <>
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              <img src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
            </Avatar>
            <div>
              <h3 className="font-medium text-sm text-gray-800">{selectedUser.name}</h3>
              <p className="text-xs text-gray-500">{selectedUser.online ? "Online" : "Offline"}</p>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Messages would be rendered here */}
            <div className="flex justify-center items-center h-full text-gray-500 text-sm">
              Start a conversation with {selectedUser.name}
            </div>
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

