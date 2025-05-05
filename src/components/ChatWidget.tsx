import { useState, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import Sidebar from "./SideBar";
import ChatBox from "./ChatBox";
import EmailBox from "./EmailBox";
import ComposeMailBox from "./ComposeMailBox";

export interface ChatUser {
  id: number;
  name: string;
  email: string;
  picture: string;
}

interface ChatWidgetProps {
  currentUser: ChatUser;
}

export default function ChatWidget({ currentUser }: ChatWidgetProps) {
  const { selectedUser, activeTab, isComposingMail, selectedMail } =
    useChatStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🛠 Prioritize ComposeMailBox if active
  if (isComposingMail) {
    return (
      <div className="w-full items-end justify-center md:justify-end">
        <div className="flex w-full max-w-[1280px] md:p-8 gap-x-5 h-[100vh] bg-transparent items-center md:items-end">
          {/* <Sidebar />
          <ComposeMailBox /> */}
          {isMobile ? (
            !selectedUser || !selectedMail ? (
              <ComposeMailBox />
            ) : (
              <Sidebar />
            )
          ) : (
            <>
              <Sidebar />
              <ComposeMailBox />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full items-end justify-center md:justify-end">
      <div className="flex w-full max-w-[1280px] md:p-8 gap-x-5 h-[100vh] bg-transparent items-center md:items-end">
        {activeTab === "chat" ? (
          isMobile ? (
            selectedUser ? (
              <ChatBox currentUser={currentUser} />
            ) : (
              <Sidebar />
            )
          ) : (
            <>
              <Sidebar />
              <ChatBox
                currentUser={currentUser}
              />
            </>
          )
        ) : isMobile ? (
          selectedMail ? (
            <EmailBox />
          ) : (
            <Sidebar />
          )
        ) : (
          <>
            <Sidebar />
            <EmailBox />
          </>
        )}
      </div>
    </div>
  );
}
