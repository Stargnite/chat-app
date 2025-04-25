import { Avatar } from "@/components/ui/avatar";
import { useChatStore } from "../lib/store";
// import ChatInput from "./ChatInput";
import { ArrowLeft, Trash, Reply, Forward } from "lucide-react";
// import RightClickContext from "./RightClickContext";
// import ChatBubble from "./ChatBubble";
import axiosInstance from "@/api/api";
import { useEffect, useState } from "react";
import { deleteMail } from "@/services/ChatServices";

export default function EmailBox() {
  const { selectedMail, setSelectedMail } = useChatStore();
  const [conversation, setConversation] = useState([]);
  // const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/email/${selectedMail?.senders_email}`
        );
        const data = response.data.data;

        setConversation(data);
        console.log("email conversation>>>>>>", conversation);

        console.log("Conversation for the selected user>>>>>>>>>>", data);
      } catch (error) {
        console.log("error for fetching selectedUser's chats", error);
      }
    };

    fetchMail();
  }, [selectedMail]);

  return (
    <div
      className={`flex flex-col min-h-full md:min-h-[88vh] md:max-h-[88vh] w-[100vw] bg-white shadow-sm rounded-sm
      ${selectedMail ? "block" : "hidden"}`}
    >
      {selectedMail ? (
        <>
          {/* Chat header */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-y-2 md:justify-between px-4 py-3 border-b border-gray-200">
            <div className=" flex items-center justify-between sm:justify-self-start w-full sm:w-auto text-center md:text-start">
              <ArrowLeft
                className="h-5 w-5 mr-3 text-black cursor-pointer hover:text-gray-700 transition-all"
                onClick={() => setSelectedMail(undefined)}
              />
              <Avatar className="h-8 w-8 mr-3">
                <img
                  src={selectedMail.name || "/placeholder.svg"}
                  alt={selectedMail.senders_email}
                />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm text-gray-800 poppins-medium">
                  {selectedMail.senders_email}
                </h3>
                <p className="text-xs text-gray-500 poppins-regular">
                  {new Date(selectedMail.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    weekday: "long",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-2 text-md cursor-pointer hover:bg-gray-300 py-0.5 px-1 rounded-md transition-all ">
                <div className="text-gray-500">
                  <Reply className="w-5 h-5" />
                </div>
                <p className="text-gray-800 font-semibold">Reply</p>
              </div>
              <div className="flex items-center gap-x-2 text-md cursor-pointer hover:bg-gray-300 py-0.5 px-1 rounded-md transition-all">
                <div className="text-gray-500">
                  <Forward className="w-5 h-5" />
                </div>
                <p className="text-gray-800 font-semibold">Forward</p>
              </div>
              <div
                className="flex items-center gap-x-2 text-md cursor-pointer hover:bg-gray-300 py-0.5 px-1 rounded-md transition-all"
                onClick={() => deleteMail(selectedMail.id)}
              >
                <div className="text-red-500">
                  <Trash className="w-5 h-5" />
                </div>
                <p className="text-gray-800 font-semibold">Delete</p>
              </div>
            </div>
          </div>

          <div className="p-4 overflow-y-auto poppins-medium text-gray-900">
            Re: {selectedMail.name}
          </div>

          {selectedMail.attachments && (
            <div className="p-4">
              {selectedMail.attachments.media_type.startsWith("image/") ? (
                <div className="flex flex-col gap-0.5">
                  <img
                    src={selectedMail.attachments.media_url}
                    alt="attachment"
                    className="w-full max-w-xs rounded"
                  />
                  <p>{selectedMail.attachments.media_type}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <a
                    href={selectedMail.attachments.media_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-center items-center justify-center min-w-[100px] min-h-[100px] bg-gray-600 rounded-sm text-whiteunderline text-sm"
                  >
                    <span className="text-white">
                      {selectedMail.attachments.media_type}
                    </span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Mail message */}
          <div className="p-4 overflow-y-auto poppins-regular text-gray-900">
            {selectedMail.message}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="font-normal text-lg text-gray-500">
            Select a user to begin chatting
          </p>
        </div>
      )}
    </div>
  );
}
