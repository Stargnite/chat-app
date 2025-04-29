import { useState, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import Sidebar from "./SideBar";
import ChatBox from "./ChatBox";
import EmailBox from "./EmailBox";
import ComposeMailBox from "./ComposeMailBox";

export default function ChatWidget() {
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
              <ChatBox
                currentUser={{
                  id: 3731,
                  name: "Your Name",
                  email: "tech@vindove.com",
                  picture: "https://your-picture-url.com/avatar.jpg",
                }}
              />
            ) : (
              <Sidebar />
            )
          ) : (
            <>
              <Sidebar />
              <ChatBox
                currentUser={{
                  id: 3731,
                  name: "Your Name",
                  email: "tech@vindove.com",
                  picture: "https://your-picture-url.com/avatar.jpg",
                }}
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
