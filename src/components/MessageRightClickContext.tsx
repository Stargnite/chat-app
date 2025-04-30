import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
// import { Switch } from "@/components/ui/switch"
import { Forward, Reply, Trash } from "lucide-react";
import { deleteMessage } from "@/services/ChatServices";

interface RightClickContextProps {
  children: React.ReactNode;
  mailId: string;
}

const MessageRightClickContext = ({
  mailId,
  children,
}: RightClickContextProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="flex flex-col justify-center w-[120px] h-[150px] bg-white text-gray-800 shadow-lg border-1 border-gray-300">
        <ContextMenuItem className="flex items-center gap-x-3 text-lg cursor-pointer hover:bg-gray-300 transition-all">
          <div className="text-gray-500">
            <Reply className="w-5 h-5" />
          </div>
          <p>Reply</p>
        </ContextMenuItem>

        <ContextMenuItem className="flex items-center gap-x-3 text-lg cursor-pointer hover:bg-gray-300 transition-all">
          <div className="text-gray-500">
            <Forward className="w-5 h-5" />
          </div>
          <p>Forward</p>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => deleteMessage(mailId)}
          className="flex items-center gap-x-3 text-lg cursor-pointer hover:bg-gray-300 transition-all"
        >
          <div className="text-red-500">
            <Trash className="w-5 h-5" />
          </div>
          <p>Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MessageRightClickContext;
