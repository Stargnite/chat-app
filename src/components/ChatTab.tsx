import { useMemo, useEffect } from "react"
import { useChatStore } from "../lib/store"
import { cn } from "../lib/utils"
import RightClickContext from "./RightClickContext"
import ChatCard from "./ChatCard"
import axiosInstance from "@/api/api"
// import { ChatCardType } from "@/lib/types"

const ChatTab = () => {
  const {
    chatList,
    setChatList,
    searchQuery,
    messagesFilter,
    setMessagesFilter,
    handleUserSelect,
  } = useChatStore() // This is from zustand store 

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/contacts")
        const data = response.data.data
        setChatList(data)
        console.log("Contacts fetched successfully:", data)
      } catch (err) {
        console.error("Error fetching contacts:", err)
      }
    }
  
    fetchContacts()
  }, [setChatList])
  





  // Filter and sort messages
  const filteredMessages = useMemo(() => {
    return chatList
      .filter((user) => {
        const matchesSearch = searchQuery
          ? user.receiver_name.toLowerCase().includes(searchQuery.toLowerCase())
          : true

        const matchesFilter =
          messagesFilter === "unread"
            ? false // TODO: implement unread logic
            : messagesFilter === "archived"
            ? false // TODO: implement archived logic
            : true

        return matchesSearch && matchesFilter
      })
      .sort((a, b) => new Date(b.last_sent_at).getTime() - new Date(a.last_sent_at).getTime())
  }, [chatList, searchQuery, messagesFilter])



  return (
    <>
      {/* Filters -- (All, Uread & Archived) */}
      <div className="flex w-full max-w-[266.5px] self-center justify-between ">
        {["all", "unread", "archived"].map((filter) => (
          <button
            key={filter}
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              messagesFilter === filter
                ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold"
                : "text-gray-500 poppins-regular"
            )}
            onClick={() => setMessagesFilter(filter as "all" | "unread" | "archived")}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.map((user) => (
          <RightClickContext key={user.receiver_id} user={user}>
            <ChatCard user={user} onUserSelect={handleUserSelect} />
          </RightClickContext>
        ))}
      </div>
    </>
  )
}

export default ChatTab
