import { Avatar } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  userName?: string;
  userAvatar?: string | null;
  isReceived?: boolean;
}

export default function ChatBubble({
  message,
  timestamp,
  userName,
  userAvatar,
  isReceived = true,
}: ChatBubbleProps) {
  // If it's a received message, show the avatar and name
  if (isReceived) {
    return (
      <div className="flex items-start mb-4 max-w-[85%]">
        <Avatar className="h-10 w-10 mr-3 bg-gray-400 flex-shrink-0">
          {userAvatar ? (
            <img src={userAvatar || "/placeholder.svg"} alt={userName || "User"} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-medium">
              {userName?.charAt(0) || "U"}
            </div>
          )}
        </Avatar>
        <div className="flex flex-col">
          {userName && (
            <span className="text-sm font-medium mb-1 poppins-medium text-gray-900">{userName}</span>
          )}
          <div className="flex flex-col items-end">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none py-2 px-4 max-w-full">
              <p className="text-gray-800">{message}</p>
            </div>
            <span className="text-xs text-gray-400 ml-2">{timestamp}</span>
          </div>
        </div>
      </div>
    );
  }

  // If it's a sent message, align to the right without avatar
  return (
    <div className="flex  items-end mb-4 max-w-[85%] ml-auto flex-col">
      <div className="bg-blue-500 text-white rounded-2xl py-2 px-4 max-w-full">
        <p>{message}</p>
      </div>
      <span className="text-xs text-gray-400 mr-2">{timestamp}</span>
    </div>
  );
}
