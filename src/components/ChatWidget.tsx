import { useState, useEffect } from "react";
import { useChatStore } from "@/lib/store";
import Sidebar from "./SideBar";
import ChatBox from "./ChatBox";
import EmailBox from "./EmailBox";

export default function ChatWidget() {
  const { selectedUser, activeTab } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size reactively
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="justify-center md:justify-end">
      <div className="flex w-full max-w-[1280px] md:p-8 gap-x-5 h-[100vh] bg-transparent items-center md:items-end">
        {activeTab === "chat" ? (
          isMobile ? (
            selectedUser ? <ChatBox /> : <Sidebar />
          ) : (
            <>
              <Sidebar />
              <ChatBox />
            </>
          )
        ) : (
          isMobile ? (
            selectedUser ? <EmailBox /> : <Sidebar />
          ) : (
            <>
              <Sidebar />
              <EmailBox />
            </>
          )
        )}
      </div>
    </div>
  );
}








// import { useState, useEffect } from "react";
// import { useChatStore } from "@/lib/store";
// import Sidebar from "./SideBar";
// import ChatBox from "./ChatBox";
// import EmailBox from "./ChatBox";

// export default function ChatWidget() {
//   const { selectedUser, activeTab } = useChatStore();
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect screen size reactively
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize(); // call on mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return (
//     <div className="justify-center md:justify-end">
//     <div className="flex w-full max-w-[1280px] md:p-8 gap-x-5 h-[100vh] md bg-transparent items-center md:items-end"
//     // "flex w-[95vw] max-w-[1280px] gap-x-5 md:h-full bg-transparent justify-center md:justify-end"
//     >
//       {activeTab === "chat" ?( {isMobile ? (
//         selectedUser ? <ChatBox /> : <Sidebar />
//       ) : (
//         <>
//           <Sidebar />
//           <ChatBox />
//         </>
//       )}) :
//       ( {isMobile ? (
//         selectedUser ? <EmailBox /> : <Sidebar />
//       ) : (
//         <>
//           <Sidebar />
//           <ChatBox />
//         </>
//       )})
//       }
//     </div>
//     </div>
//   )
// }

