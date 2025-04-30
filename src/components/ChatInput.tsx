import { useRef, useState } from "react";
// import { useChatStore } from "../lib/store";
import { Input } from "./ui/input";
import { Send, Paperclip, Smile, Mic } from "lucide-react";
// import socket from "../lib/socket";
import axiosInstance from "@/api/api";

const ChatInput = ({
  // currentUser,
  selectedUser,
}: {
  // currentUser: {
  //   id: number;
  //   name: string;
  //   email: string;
  //   picture: string;
  // };
  selectedUser: {
    receiver_id: string;
    receiver_name: string;
    receiver_email: string;
    receiver_picture: string | null;
  };
}) => {
  const [unSentText, setUnsentText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append("message", unSentText);
    formData.append("identifier", selectedUser.receiver_email);
    if (attachedFile) {
      formData.append("document", attachedFile);
    }

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      
      const res = await axiosInstance.post(`/api/v1/message`, formData);
      console.log("Send response>>>>>>>", res.data.message);

      setUnsentText("");
      setAttachedFile(null);
      removeFilePreview();
      setIsSending(false);
      // Emit via socket
      // socket.emit("sendMessage", data.data);
    } catch (err) {
      console.error("Failed to send message:", err);
      setIsSending(false);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachedFile(file);

    // Preview image
    const fileUrl = URL.createObjectURL(file);
    setFilePreviewUrl(fileUrl);
  };

  const removeFilePreview = () => {
    setAttachedFile(null);
    setFilePreviewUrl(null);
  };

  return (
    <div className="">
      <div className=" px-5 md:px-10">
      {filePreviewUrl && (
        <div className="w-full flex justify-between items-center mb-2 p-2 rounded border border-gray-300 bg-gray-50">
          <div className="flex items-center space-x-3">
            <img
              src={filePreviewUrl}
              alt="Selected"
              className="w-16 h-16 object-cover rounded-md border"
            />
            <p className="text-sm text-gray-700">{attachedFile?.name}</p>
          </div>
          <button
            type="button"
            onClick={removeFilePreview}
            className="text-red-500 hover:underline text-sm"
          >
            Remove
          </button>
        </div>
      )}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex space-x-4 items-center justify-center p-3 border-t border-gray-200"
      >
        <Paperclip
          className="text-gray-700 cursor-pointer transition-all hover:text-blue-500"
          onClick={handleFileClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-full flex flex-col">
          <div className="flex relative w-full">
            <Input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 p-2 text-gray-800"
              value={unSentText}
              onChange={(e) => setUnsentText(e.target.value)}
              disabled={isSending}
            />
            <button
              type="submit"
              className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70 absolute right-1 top-1"
              disabled={unSentText.trim().length === 0 || isSending}
            >
              <div className="rounded-full p-1.5 bg-blue-600 text-white flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Smile className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
          <Mic className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
