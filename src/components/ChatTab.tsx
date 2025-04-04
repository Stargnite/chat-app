import { useChatStore } from "../lib/store"
import { users, messages } from "./../lib/mock-data"
import { cn } from "../lib/utils"
import RightClickContext from "./RightClickContext"
import ChatCard from "./ChatCard"

const ChatTab = () => {
	const {
			searchQuery,
			messagesFilter,
			setMessagesFilter,
			selectedUser,
			handleUserSelect,
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
				if (messagesFilter === "unread" && !message.unread) return false
				if (messagesFilter === "archived" && !message.archived) return false
	
				return true
			})
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
	return (
		<>
      {/* Filters -- (All, Uread & Archived) */}
        <div className="flex w-full max-w-[266.5px] self-center">
          <button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              messagesFilter === "all" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setMessagesFilter("all")}
          >
            All
          </button>
          <button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              messagesFilter === "unread" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setMessagesFilter("unread")}
          >
            Unread
          </button>
          <button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              messagesFilter === "archived" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setMessagesFilter("archived")}
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
              <RightClickContext key={message.id}>
                <ChatCard
                  // key={message.id}
                  user={user}
                  message={message}
                  onUserSelect={handleUserSelect}
                  selectedUser={selectedUser}
                />
              </ RightClickContext>
            )
          })}
        </div>
      </>
	)
}

export default ChatTab
