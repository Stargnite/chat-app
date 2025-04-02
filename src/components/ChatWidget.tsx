import ChatSidebar from "./ChatSideBar"
import ChatMain from "./ChatMain"
import { users, messages } from "./../lib/mock-data"

export default function ChatWidget() {
  return (
    <div className="flex w-full gap-x-5 h-full bg-transparent">
      <ChatSidebar
        users={users}
        messages={messages}
      />
      <ChatMain />
    </div>
  )
}

