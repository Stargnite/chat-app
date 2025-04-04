import ChatSidebar from "./ChatSideBar"
import ChatMain from "./ChatMain"
import { users, messages } from "./../lib/mock-data"

export default function ChatWidget() {
  return (
    <div className="flex w-[95vw] max-w-[1280px] gap-x-5 md:h-full bg-transparent justify-center md:justify-end">
      <ChatSidebar
        users={users}
        messages={messages}
      />
      <ChatMain />
    </div>
  )
}

