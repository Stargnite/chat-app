// import { Search, X } from "lucide-react"
import SearchBar from "@/components/SearchBar"
import { cn } from "../lib/utils"
import { useChatStore } from "../lib/store"
import { SquarePen } from "lucide-react"
import ChatTab from "./ChatTab"
import EmailTab from "./EmailTab"



export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    handleNewChat,
  } = useChatStore()

  return (
    <div className="min-w-[100vw] sm:min-w-[370px] sm:max-w-[370px] min-h-full md:min-h-[88vh] md:max-h-[88vh] shadow-lg rounded-sm flex flex-col h-full bg-white"
    // "min-w-[370px] min-h-[88vh] max-h-[88vh] shadow-lg rounded-sm flex flex-col h-full bg-white"
    >

      <div className="flex justify-between space-x-2 py-4 px-5">
        {/* Tabs -- (Chat & Email) */}
        <div className="flex w-[260px] h-[36px] poppins-semibold">
          <button
            className={cn(
              "flex-1 rounded-bl-lg rounded-tl-lg py-1 font-semibold transition-all",
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
        {/* Create new mail button */}
        <button className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70" onClick={handleNewChat}>
          <div className="rounded-full w-7 h-7 bg-blue-600 text-white flex items-center justify-center">
            <SquarePen className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Search bar */}
      <SearchBar />
     
     {/* Either the list of chat or list of emails is rendered here */}
     {activeTab === "chat" && (<ChatTab />)}
     {activeTab === "email" && (<EmailTab />)}
    </div>
  )
}

