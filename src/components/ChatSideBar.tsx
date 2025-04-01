// import { Search, X } from "lucide-react"
import type { User, Message } from "../lib/types"
import ChatCard from "./ChatCard"
import SearchBar from "@/components/SearchBar"
import { cn } from "../lib/utils"
import { useChatStore } from "../lib/store"
import { SquarePen } from "lucide-react"

interface ChatSidebarProps {
  users: User[]
  messages: Message[]
}

export default function ChatSidebar({ users, messages }: ChatSidebarProps) {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    filter,
    setFilter,
    selectedUser,
    handleUserSelect,
    handleNewChat
  } = useChatStore()

  // Filter and sort messages
  const filteredMessages = messages
    .filter((message) => {
      const user = users.find((u) => u.id === message.userId)
      if (!user) return false

      // Apply search filter
      if (
        searchQuery &&
        !user.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        // &&
        // !message.text.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Apply tab filter
      if (filter === "unread" && !message.unread) return false
      if (filter === "archived" && !message.archived) return false

      return true
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <div className="min-w-80 shadow-sm rounded-sm flex flex-col h-full bg-white">
      {/* Tabs -- (Chat & Email) */}
      <div className="flex justify-between space-x-2 p-3">
        <div className="flex w-[80%]">
          <button
            className={cn(
              "flex-1 rounded-bl-lg rounded-tl-lg py-1 font-semibold transition-all ",
              activeTab === "chat" ? "bg-blue-600 text-white" : "text-gray-800 bg-blue-200 cursor-pointer hover:opacity-70",
            )}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={cn(
              "flex-1 rounded-br-lg rounded-tr-lg py-1 font-semibold transition-all",
              activeTab === "email" ? "bg-blue-600 text-white" : "text-gray-800 bg-blue-200 cursor-pointer hover:opacity-70",
            )}
            onClick={() => setActiveTab("email")}
          >
            Email
          </button>
        </div>
        <button className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70" onClick={handleNewChat}>
          <div className="rounded-full p-1.5 bg-blue-600 text-white flex items-center justify-center">
            <SquarePen className="w-4 h-4"  />
          </div>
        </button>
      </div>

      {/* Search bar */}
      <SearchBar />

      {/* Filters -- (All, Uread & Archived) */}
      <div className="flex border-b border-gray-200">
        <button
          className={cn(
            "flex-1 py-2 text-xs font-medium",
            filter === "all" ? "text-blue-800 border-b-2 border-blue-800 overflow-hidden" : "text-gray-500",
          )}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={cn(
            "flex-1 py-2 text-xs font-medium",
            filter === "unread" ? "text-blue-800 border-b-2 border-blue-800 overflow-hidden" : "text-gray-500",
          )}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
        <button
          className={cn(
            "flex-1 py-2 text-xs font-medium",
            filter === "archived" ? "text-blue-800 border-b-2 border-blue-800 overflow-hidden" : "text-gray-500",
          )}
          onClick={() => setFilter("archived")}
        >
          Archived
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.map((message) => {
          const user = users.find((u) => u.id === message.userId)
          if (!user) return null

          return (
            <ChatCard
              key={message.id}
              user={user}
              message={message}
              onUserSelect={handleUserSelect}
              selectedUser={selectedUser}
            />
          )
        })}
      </div>
    </div>
  )
}

