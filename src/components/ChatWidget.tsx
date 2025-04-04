import Sidebar from "./SideBar"
import ChatBox from "./ChatBox"


export default function ChatWidget() {
  return (
    <div className="flex w-[95vw] max-w-[1280px] gap-x-5 md:h-full bg-transparent justify-center md:justify-end">
      <Sidebar />
      <ChatBox />
    </div>
  )
}

