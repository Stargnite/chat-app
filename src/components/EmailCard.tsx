import { 
  // Star,
   Paperclip } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { MailCardType } from "./../lib/types";

interface ChatCardProps {
  selectedMail: MailCardType | undefined;
  mail: MailCardType;
  onMailSelect: (mail: MailCardType) => void;
}

export default function EmailCard({
  selectedMail,
  mail,
  onMailSelect,
}: ChatCardProps) {
  // const threadCount = message.unreadCount || 0

  return (
    <div
      className={cn(
        "p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors",
        selectedMail?.id === mail.id && "bg-gray-100 border-gray-300"
      )}
      onClick={() => onMailSelect(mail)}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar className="h-12 w-12 bg-blue-400 flex-shrink-0">
          {selectedMail?.name ? (
            <img src={mail.name || "/placeholder.svg"} alt={mail.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-medium">
              {mail.name.charAt(0)}
            </div>
          )}
        </Avatar>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <h3 className="font-bold text-gray-900">{mail.name}</h3>
              {/* {threadCount > 0 && <span className="ml-2 text-gray-400 text-sm">• {threadCount}rd+</span>} */}
            </div>
            {/* <button
              className="text-yellow-400 hover:text-yellow-500"
              onClick={(e) => {
                e.stopPropagation()
                // onStarToggle?.()
              }}
            >
              <Star className={cn("h-5 w-5", mail.unread ? "fill-yellow-400" : "")} />
            </button> */}
          </div>

          <div className="flex items-center text-gray-600 mb-1">
            <span className="font-medium poppin-regular">Re: Meeting</span>
            {/* {hasAttachment &&  */}
            <Paperclip className="h-4 w-4 ml-2 text-gray-500" />
            {/* } */}
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">{mail.message}</p>

          <div className="flex justify-end mt-2">
            <span className="text-gray-400 text-sm">
              {new Date(mail.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
