import { useChatStore } from "../lib/store"
import { users, messages } from "./../lib/mock-data"
import { cn } from "../lib/utils"
import RightClickContext from "./RightClickContext"
import ChatCard from "./ChatCard"

const EmailTab = () => {
	const {
			searchQuery,
			emailsFilter,
			setEmailsFilter,
			selectedUser,
			handleUserSelect,
		} = useChatStore()
	
		// Filter and sort emails
		const filteredEmails = messages
			.filter((email) => {
				const user = users.find((u) => u.id === email.userId)
				if (!user) return false
	
				// Apply search filter
				if (
					searchQuery &&
					!user.name.toLowerCase().includes(searchQuery.toLowerCase())
					// &&
					// !email.text.toLowerCase().includes(searchQuery.toLowerCase())
				) {
					return false
				}
	
				// Apply tab filter
				// if (emailsFilter === "inbox" && !email.unread) return false
				if (emailsFilter === "sent" && !email.archived) return false
				if (emailsFilter === "drafts" && !email.archived) return false
				if (emailsFilter === "deleted" && !email.archived) return false
				if (emailsFilter === "starred" && !email.archived) return false
	
				return true
			})
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
	return (
		<>
      {/* Filters -- (All, Uread & Archived) */}
        <div className="flex w-full gap-x-1.5 px-5 self-center">
          <button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              emailsFilter === "inbox" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setEmailsFilter("inbox")}
          >
            Inbox
          </button>
          <button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              emailsFilter === "sent" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setEmailsFilter("sent")}
          >
            Sent
          </button>
          <button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              emailsFilter === "drafts" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setEmailsFilter("drafts")}
          >
            Drafts
          </button>
					<button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              emailsFilter === "deleted" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setEmailsFilter("deleted")}
          >
            Deleted
          </button>
					<button
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              emailsFilter === "starred" ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold" : "text-gray-500 poppins-regular",
            )}
            onClick={() => setEmailsFilter("starred")}
          >
            Starred
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.map((email) => {
            const user = users.find((u) => u.id === email.userId)
            if (!user) return null

            return (
              <RightClickContext key={email.id} user={user}>
                <ChatCard
                  // key={email.id}
                  user={user}
                  message={email}
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

export default EmailTab
