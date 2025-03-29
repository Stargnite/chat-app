import type React from "react"
import { useState } from "react"
import type { User } from "../lib/types"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatMainProps {
  selectedUser: User | null
  recipientMenuOpen: boolean
  onRecipientSelect: (user: User) => void
  users: User[]
}

export default function ChatMain({
  selectedUser,
  // recipientMenuOpen,
  // onRecipientSelect,
  // users
}: ChatMainProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && selectedUser) {
      // Here you would typically send the message to your backend
      console.log(`Sending message to ${selectedUser.name}: ${message}`)
      setMessage("")
    }
  }

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
          <div className="p-3 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full focus:outline-none focus:ring-0 focus:ring-blue-500 p-2 text-gray-800"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" size="sm" className="cursor-pointer">
                <Send className="h-4 w-4 bg-blue-800 p-4 rounded-full " />
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="font-normal text-lg text-gray-500">Select a user to begin chatting</p>
        </div>
      )}
    </div>
  )
}

