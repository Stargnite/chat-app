import { useState } from "react"
import ChatSidebar from "./ChatSideBar"
import ChatMain from "./ChatMain"
import type { User, ChatTab } from "./../lib/types"
import { users, messages } from "./../lib/mock-data"

export default function ChatWidget() {
  const [activeTab, setActiveTab] = useState<ChatTab>("chat")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all")
  const [recipientMenuOpen, setRecipientMenuOpen] = useState(true)
  // const [recipients, setRecipients] = useState<User[]>([])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setRecipientMenuOpen(false)
  }

  const handleNewChat = () => {
    setSelectedUser(null)
    setRecipientMenuOpen(true)
  }

  const handleRecipientSelect = (user: User) => {
    setSelectedUser(user)
    setRecipientMenuOpen(false)
  }

  return (
    <div className="flex w-full gap-x-5 h-full">
      <ChatSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        users={users}
        messages={messages}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        selectedUser={selectedUser}
        onUserSelect={handleUserSelect}
        onNewChat={handleNewChat}
      />
      <ChatMain
        selectedUser={selectedUser}
        recipientMenuOpen={recipientMenuOpen}
        onRecipientSelect={handleRecipientSelect}
        users={users}
      />
    </div>
  )
}

