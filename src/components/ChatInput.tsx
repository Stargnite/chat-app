import { useRef, useState } from "react";
import { useChatStore } from "../lib/store";
import { Input } from "./ui/input";
import { Send, Paperclip, Smile, Mic } from "lucide-react";
import socket from "../lib/socket";
import axiosInstance from "@/api/api";

const ChatInput = () => {
  const { messageData, setMessageData } = useChatStore();
  const [unSentText, setUnsentText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unSentText.trim() && !attachedFile) return;
    if (!messageData) return;

    const formData = new FormData();
    formData.append("sender_id", messageData.sender_id.toString());
    formData.append("sender_name", messageData.sender_name || "");
    formData.append("sender_email", messageData.sender_email);
    formData.append("sender_picture", messageData.sender_picture || "");
    formData.append("receiver_id", messageData.receiver_id.toString());
    formData.append("receiver_name", messageData.receiver_name);
    formData.append("receiver_email", messageData.receiver_email);
    formData.append("receiver_picture", messageData.receiver_picture || "");
    formData.append("message", unSentText);
    formData.append("document", attachedFile || "");

    try {
      setIsSending(true);
      const res = await axiosInstance.post(`/api/v1/message`);
      const data = res;

      console.log("data gotten from the messagee post response>>>>>>>", data);

      // Emit via socket
      socket.emit("sendMessage", data.data);

      // Reset input
      setUnsentText("");
      setAttachedFile(null);
      setMessageData(null);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  return (
    <div className="flex space-x-4 items-center justify-center p-3 border-t border-gray-200">
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
      <form onSubmit={handleSendMessage} className="flex relative w-full">
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
          disabled={isSending}
        >
          <div className="rounded-full p-1.5 bg-blue-600 text-white flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
        </button>
      </form>
      <div className="flex items-center space-x-1">
        <Smile className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
        <Mic className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
      </div>
    </div>
  );
};

export default ChatInput;

// import { useState } from "react"
// import { useChatStore } from "../lib/store"
// import { Input } from "./ui/input"
// // import { Button } from "./ui/button"
// import { Send, Paperclip, Smile, Mic } from "lucide-react"

// const ChatInput = () => {
// 	const { messageData, setMessageData } = useChatStore()
// 	const [unSentText, setUnsentText] = useState("")

// 	const handleSendMessage = (e: React.FormEvent) => {
// 		e.preventDefault()
// 		setMessageData({
// 			...messageData,
// 			text: unSentText
// 		  })
// 		if (messageData) {
// 			// send the message to backend
// 			// console.log(`Sending message: ${messageData.text}`)
// 		}
// 		setMessageData(null)
// 	}

// 	return (
// 		<div className="flex space-x-4 items-center justify-center p-3 border-t border-gray-200">
// 			<Paperclip className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
// 			<form
// 			onSubmit={handleSendMessage}
// 			className="flex relative w-full">
// 				<Input
// 					type="text"
// 					placeholder="Type a message..."
// 					className="flex-1 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 p-2 text-gray-800"
// 					value={unSentText}
// 					onChange={(e) => setUnsentText(e.target.value)}
// 				/>
// 				<button className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70 absolute right-1 top-1" type="submit">
// 					<div className="rounded-full p-1.5 bg-blue-600 text-white flex items-center justify-center">
// 						<Send className="w-4 h-4" />
// 					</div>
// 				</button>
// 			</form>
// 			<div className="flex items-center space-x-1">
// 				<Smile className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
// 				<Mic className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
// 			</div>
// 		</div>
// 	)
// }

// export default ChatInput
