import { cn } from "../lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { User, Message } from "./../lib/types"

interface ChatCardProps {
selectedUser: User | null,
message: Message,
user: User,
onUserSelect: (user: User) => void
}

const ChatCard = ({selectedUser, message, user, onUserSelect}: ChatCardProps) => {
	return (
		<div
              className={cn(
                "flex p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50",
                selectedUser?.id === user.id && "bg-gray-100",
              )}
              onClick={() => onUserSelect(user)}
            >
              <Avatar className="h-10 w-10 mr-3">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm truncate text-gray-800">{user.name}</span>
                    {message.isNew && (
                      <span className="ml-2 text-xs bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">New</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">{message.text}</p>
              </div>
              {message.unread && (
                <Badge className="ml-2 bg-red-500 text-white h-5 w-5 flex items-center justify-center rounded-full p-0">
                  {message.unreadCount}
                </Badge>
              )}
            </div>
	)
}

export default ChatCard
