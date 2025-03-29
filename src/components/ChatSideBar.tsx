// import { Search, X } from "lucide-react"
import type { User, Message, ChatTab } from "../lib/types"
import ChatCard from "./ChatCard"
import SearchBar from "@/components/search-bar"
import { cn } from "../lib/utils"

interface ChatSidebarProps {
  activeTab: ChatTab
  setActiveTab: (tab: ChatTab) => void
  users: User[]
  messages: Message[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  filter: "all" | "unread" | "archived"
  setFilter: (filter: "all" | "unread" | "archived") => void
  selectedUser: User | null
  onUserSelect: (user: User) => void
  onNewChat: () => void
}

export default function ChatSidebar({
  activeTab,
  setActiveTab,
  users,
  messages,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  selectedUser,
  onUserSelect,
  onNewChat,
}: ChatSidebarProps) {
  // Filter and sort messages
  const filteredMessages = messages
    .filter((message) => {
      const user = users.find((u) => u.id === message.userId)
      if (!user) return false

      // Apply search filter
      if (
        searchQuery &&
        !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !message.text.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="flex border-gray-200 p-3">
        <button
          className={cn(
            "flex-1 rounded-bl-lg rounded-tl-lg py-2 font-semibold transition-all ",
            activeTab === "chat" ? "bg-blue-600 text-white" : "text-gray-800 bg-blue-200 cursor-pointer hover:opacity-70",
          )}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button
          className={cn(
            "flex-1 rounded-br-lg rounded-tr-lg py-2 font-semibold transition-all",
            activeTab === "email" ? "bg-blue-600 text-white" : "text-gray-800 bg-blue-200 cursor-pointer hover:opacity-70",
          )}
          onClick={() => setActiveTab("email")}
        >
          Email
        </button>
        <button className="w-10 flex items-center justify-center text-gray-500 cursor-pointer" onClick={onNewChat}>
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">+</div>
        </button>
      </div>

      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
              onUserSelect={onUserSelect}
              selectedUser={selectedUser}
            />
          )
        })}
      </div>
    </div>
  )
}

