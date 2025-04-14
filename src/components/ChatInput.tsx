import axiosInstance from "@/api/api"
import { useChatStore } from "../lib/store"
import { Input } from "./ui/input"
// import { Button } from "./ui/button"
import { Send, Paperclip, Smile, Mic } from "lucide-react"


const ChatInput = () => {
	const { message, setMessage, selectedUser } = useChatStore()

	// const handleSendMessage = (e: React.FormEvent) => {
	//   e.preventDefault()
	//   if (message.trim() && selectedUser) {
	//     const userId = selectedUser.id

	//     // Add the new message to user messages
	//     const newMessage = {
	//       id: Date.now().toString(),
	//       message: message.trim(),
	//       timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
	//       isReceived: false,
	//     }

	//     setUserMessages((prev) => ({
	//       ...prev,
	//       [userId]: [...(prev[userId] || []), newMessage],
	//     }))

	//     setMessage("")

	//     // Simulate a reply after 1 second
	//     // setTimeout(() => {
	//     //   const replyMessage = {
	//     //     id: (Date.now() + 1).toString(),
	//     //     message: "Thanks for your message! I'll get back to you soon.",
	//     //     timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
	//     //     isReceived: true,
	//     //   }

	//     //   setUserMessages((prev) => ({
	//     //     ...prev,
	//     //     [userId]: [...(prev[userId] || []), replyMessage],
	//     //   }))
	//     // }, 1000)
	//   }
	// }


	const handleSendMessage = async (messageText: string, e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await axiosInstance.post("/api/v1/message", {
				receiver_id: selectedUser?.receiver_id,
				message: messageText,
				"sender_id": "3731",
				"sender_name": "",
				"sender_email": "tech@vindove.com",
				"sender_picture": "",
				"receiver_picture": "https://profile11.s3.ca-central-1.amazonaws.com/2635010406",
				"receiver_name": "ashish lakhani",
				"receiver_email": "ashish7730@gmail.com",
				"document": null,
				"id": "0196200c-4493-7125-928a-bf95ba6cc3fe",
				"updated_at": "2025-04-10T14:13:17.000000Z",
				"created_at": "2025-04-10T14:13:17.000000Z"
			});

			// Update local state with new message
			const newMessage = response.data.data;
			// Update your chat list or messages array

			setMessage(''); // Clear input field
			console.log("Message sent successfully:", newMessage);
			return newMessage;
		} catch (err) {
			console.error("Error sending message:", err);
			return null;
		}
	};

	return (
		<div className="flex space-x-4 items-center justify-center p-3 border-t border-gray-200">
			<Paperclip className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
			<form
				onSubmit={() => handleSendMessage}
				className="flex relative w-full">
				<Input
					type="text"
					placeholder="Type a message..."
					className="flex-1 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 p-2 text-gray-800"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70 absolute right-1 top-1" type="submit">
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
	)
}

export default ChatInput
