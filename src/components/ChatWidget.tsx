// import Sidebar from "./SideBar"
// import ChatBox from "./ChatBox"
// import { useChatStore } from "@/lib/store"


// export default function ChatWidget() {
//   const {selectedUser} = useChatStore();
//   return (
//     <div className="flex w-full max-w-[1280px] md:p-10 gap-x-5 h-[100vh] md:h-full bg-transparent items-center justify-center md:justify-end">
//       {selectedUser !== null && window.innerWidth < 768 ? <ChatBox /> : <Sidebar />}

//       {window.innerWidth >= 768 && (<><Sidebar /> <ChatBox /></>)}
  
//     </div>
//   )
// }

import { useState, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import Sidebar from "./SideBar";
import ChatBox from "./ChatBox";

export default function ChatWidget() {
  const { selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size reactively
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full max-w-[1280px] md:p-10 gap-x-5 h-[100vh] md:h-full bg-transparent items-center justify-center md:justify-end">
      {isMobile ? (
        selectedUser ? <ChatBox /> : <Sidebar />
      ) : (
        <>
          <Sidebar />
          <ChatBox />
        </>
      )}
    </div>
  );
}
