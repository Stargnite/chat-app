import { cn } from "../lib/utils"
import { Badge } from "@/components/ui/badge"
import type { User, Message } from "./../lib/types"

interface ChatCardProps {
  selectedUser: User | null,
  message: Message,
  user: User,
  onUserSelect: (user: User) => void
}

const ChatCard = ({ selectedUser, message, user, onUserSelect }: ChatCardProps) => {
  return (
    <div
      className={cn(
        "flex p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50",
        selectedUser?.id === user.id && "bg-gray-100",
      )}
      onClick={() => {
        onUserSelect(user)
        message.unread = false
        message.unreadCount = 0
      }
      }
    >

      <div className="relative h-10 w-10 mr-3">
        <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
        <div className={cn(
          "absolute bottom-0 right-1 h-2 w-2 rounded-full z-10",
          user.online ? "bg-green-500" : "bg-gray-400",
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <span className="truncate text-gray-800 poppins-medium">{user.name}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 truncate mt-1 poppins-regular">{message.text}</p>
      </div>
      <div className="flex flex-col items-end ml-3 gap-y-2">
        <span className="text-xs text-gray-400 poppins-regular">{message.time}</span>
        {message.unread && (
          <Badge className=" bg-red-500 text-white h-5 w-5 flex items-center justify-center rounded-full p-0 poppins-bold">
            {message.unreadCount}
          </Badge>
        )}
      </div>
    </div>
  )
}

export default ChatCard
