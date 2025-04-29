import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
// import { Switch } from "@/components/ui/switch"
import { Check, Trash, Ban, Pin } from "lucide-react";
import { SwitchButton } from "@/components/switch-button";
import { ChatCardType } from "@/lib/types";
import { useEffect } from "react";
import { archiveChat, unarchiveChat } from "@/services/ChatServices";
import { useChatStore } from "@/lib/store";
import { deleteChat } from "@/services/ChatServices";

interface RightClickContextProps {
  children: React.ReactNode;
  user: ChatCardType
}

const ChatRightClickContext = ({ children, user }: RightClickContextProps) => {
  const {updateArchivedStatus} = useChatStore();
  // const toggleChatArchived = useChatStore((state) => state.toggleChatArchived);

  useEffect(() => {
    // console.log("Right clicked user>>>>>>>", user);
  });
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="flex flex-col justify-around w-[270px] h-72 bg-white p-3 text-gray-800 shadow-lg border-1 border-gray-300">
        <ContextMenuItem className="flex items-center justify-between text-lg cursor-pointer transition-all">
          <p>Archive Chat</p>
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <SwitchButton
              defaultChecked={user?.archived}
              onToggle={async (checked) => {
                if (!user?.receiver_email) return;
              
                const email = user.receiver_email;
                const action = checked ? archiveChat : unarchiveChat;
              
                const success = await action(email, checked);
                if (success) {
                  updateArchivedStatus(email, checked);
                  console.log(`Chat ${checked ? "archived" : "unarchived"} successfully`);
                }
              }}
            />
          </div>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center justify-between text-lg cursor-pointer transition-all">
          <p>Mute Notification</p>
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); // prevent radix from closing the menu
            }}
          >
            <SwitchButton />
          </div>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-x-2 text-lg cursor-pointer hover:bg-gray-300 transition-all">
          <div className="text-gray-500 px-0.5">
            <Pin className="w-5 h-5 rotate-45" />
          </div>
          <p>Pin Chat</p>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-x-2 text-lg cursor-pointer hover:bg-gray-300 transition-all">
          <div className="bg-green-600 text-white rounded-full p-0.5">
            <Check className="w-5 h-5" />
          </div>
          <p>Mark As Read</p>
        </ContextMenuItem>
        <ContextMenuItem
        onClick={()=> deleteChat(user.receiver_email)}
         className="flex items-center gap-x-3 text-lg cursor-pointer hover:bg-gray-300 transition-all">
          <div className="text-red-500">
            <Trash className="w-5 h-5" />
          </div>
          <p>Delete Chat</p>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-x-3 text-lg cursor-pointer hover:bg-gray-300 transition-all">
          <div className="text-red-500">
            <Ban className="w-5 h-5" />
          </div>
          <p>Block</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ChatRightClickContext;

// import {
// 	ContextMenu,
// 	ContextMenuContent,
// 	ContextMenuItem,
// 	ContextMenuTrigger,
// } from "@/components/ui/context-menu"
// // import { Switch } from "@/components/ui/switch"
// import { Check, Trash, Ban, Pin } from "lucide-react";
// import { SwitchButton } from "@/components/switch-button"
// import { User } from "@/lib/types";

// interface RightClickContextProps {
// 	children: React.ReactNode;
// 	user: User
// }

// const RightClickContext = ({
// 	children, user
// }: RightClickContextProps) => {

// 	const toggleArchive = () => {
// 		user.archived = !user.archived
// 		console.log("Archive toggled:", user.archived)
// 	}
// 	return (
// 		<ContextMenu>
// 			<ContextMenuTrigger>{children}</ContextMenuTrigger>
// 			<ContextMenuContent className="flex flex-col justify-around w-[270px] h-72 bg-white p-3 text-gray-800 shadow-lg border-1 border-gray-300">
// 				<ContextMenuItem className="flex items-center justify-between text-lg cursor-pointer transition-all">
// 					<p>Archive Chat</p>
// 					<div
// 						onClick={(e) => {
// 							toggleArchive();
// 							e.stopPropagation();
// 							e.preventDefault(); // prevent radix from closing the menu
// 						}}
// 					>
// 						<SwitchButton />
// 					</div>
// 				</ContextMenuItem>
// 				<ContextMenuItem className="flex items-center justify-between text-lg cursor-pointer transition-all">
// 					<p>Mute Notification</p>
// 					<div
// 						onClick={(e) => {
// 							e.stopPropagation();
// 							e.preventDefault(); // prevent radix from closing the menu
// 						}}
// 					>
// 						<SwitchButton />
// 					</div>
// 				</ContextMenuItem>
// 				<ContextMenuItem className="flex items-center gap-x-2 text-lg cursor-pointer hover:bg-gray-300 transition-all">
// 					<div className="text-gray-500 px-0.5">
// 						<Pin className="w-5 h-5 rotate-45" />
// 					</div>
// 					<p>Pin Chat</p>
// 				</ContextMenuItem>
// 				<ContextMenuItem className="flex items-center gap-x-2 text-lg cursor-pointer hover:bg-gray-300 transition-all">
// 					<div className="bg-green-600 text-white rounded-full p-0.5">
// 						<Check className="w-5 h-5" />
// 					</div>
// 					<p>Mark As Read</p>
// 				</ContextMenuItem>
// 				<ContextMenuItem className="flex items-center gap-x-3 text-lg cursor-pointer hover:bg-gray-300 transition-all">
// 					<div className="text-red-500">
// 						<Trash className="w-5 h-5" />
// 					</div>
// 					<p>Delete Chat</p>
// 				</ContextMenuItem>
// 				<ContextMenuItem className="flex items-center gap-x-3 text-lg cursor-pointer hover:bg-gray-300 transition-all">
// 					<div className="text-red-500">
// 						<Ban className="w-5 h-5" />
// 					</div>
// 					<p>Block</p>
// 				</ContextMenuItem>
// 			</ContextMenuContent>
// 		</ContextMenu>

// 	)
// }

// export default RightClickContext
