import { useChatStore } from "../lib/store";
// import { users } from "./../lib/mock-data";
import { cn } from "../lib/utils";
import ChatRightClickContext from "./ChatRightClickContext";
import ChatCard from "./ChatCard";
import axiosInstance from "@/api/api";
import { useEffect, useMemo, useState } from "react";
// import { ChatCardType } from "@/lib/types";

const ChatTab = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    searchQuery,
    messagesFilter,
    setMessagesFilter,
    handleUserSelect,
    selectedUser,
    contacts,
    setContacts,
  } = useChatStore();

  useEffect(() => {
    (async function fetchContacts() {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/api/v1/contacts");
        const data = response.data.data;
        setContacts(data);
        // console.log("Contacts fetched successfully:", data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    })();
    // fetchContacts();
    setIsLoading(false);
  }, []);

  // Filter and sort messages
  // Filter and sort messages
  const filteredMessages = useMemo(() => {
    return contacts
      .filter((contact: any) => {
        const matchesSearch = searchQuery
          ? contact.receiver_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true;

        const matchesFilter =
          messagesFilter === "unread"
            ? false // TODO: implement unread logic
            : messagesFilter === "archived"
            ? contact.archived === false // TODO: implement archived logic
            : true;

        return matchesSearch && matchesFilter;
      })
      .sort(
        (a: any, b: any) =>
          new Date(b.last_sent_at).getTime() -
          new Date(a.last_sent_at).getTime()
      );
  }, [contacts, searchQuery, messagesFilter]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center text-gray-700 py-5">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      {/* Filters -- (All, Uread & Archived) */}
      <div className="flex w-full max-w-[266.5px] self-center justify-between ">
        {["all", "unread", "archived"].map((filter) => (
          <button
            key={filter}
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              messagesFilter === filter
                ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold"
                : "text-gray-500 poppins-regular"
            )}
            onClick={() =>
              setMessagesFilter(filter as "all" | "unread" | "archived")
            }
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {/* {isLoading && (
          <div className="flex w-full items-center justify-center text-gray-700 py-5">
            <span>Loading...</span>
          </div>
        )} */}
        {filteredMessages.map((user) => (
          <ChatRightClickContext key={user?.receiver_id} user={user}>
            <ChatCard
              user={user}
              onUserSelect={handleUserSelect}
              selectedUser={selectedUser}
            />
          </ChatRightClickContext>
        ))}
      </div>
    </>
  );
};

export default ChatTab;

// [
//   {
//     receiver_id: "oksanasuxanova@mail.com",
//     receiver_name: "Robertodip Robertodip",
//     receiver_email: "oksanasuxanova@mail.com",
//     receiver_picture: null,
//     last_message: "How are you doing?",
//     last_sent_at: "2025-02-20T12:50:23.000000Z",
//   },
//   {
//     receiver_id: "ashu@gmail.com",
//     receiver_name: "ashutosh roy",
//     receiver_email: "ashu@gmail.com",
//     receiver_picture: null,
//     last_message: "Try again with document again",
//     last_sent_at: "2025-02-20T11:12:25.000000Z",
//   },
//   {
//     receiver_id: "ashu2@gmail.com",
//     receiver_name: "ashutosh roy",
//     receiver_email: "ashu@gmail.com",
//     receiver_picture: null,
//     last_message: "Try again with document again",
//     last_sent_at: "2025-02-20T11:12:25.000000Z",
//   },
//   {
//     receiver_id: "ashu3@gmail.com",
//     receiver_name: "ashutosh roy",
//     receiver_email: "ashu@gmail.com",
//     receiver_picture: null,
//     last_message: "Try again with document again",
//     last_sent_at: "2025-02-20T11:12:25.000000Z",
//   },
// ]
