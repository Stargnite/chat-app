import { useChatStore } from "../lib/store"
import { Input } from "./ui/input"
// import { Button } from "./ui/button"
import { Send, Paperclip, Smile, Mic } from "lucide-react"

const ChatInput = () => {
	const { selectedUser, message, setMessage } = useChatStore()

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault()
		if (message.trim() && selectedUser) {
			// send the message to backend
			console.log(`Sending message to ${selectedUser.name}: ${message}`)
			setMessage("")
		}
	}
	return (
		<div className="flex space-x-4 items-center justify-center p-3 border-t border-gray-200">
			<Paperclip className="text-gray-700 cursor-pointer transition-all hover:text-blue-500" />
			<form onSubmit={handleSendMessage} className="flex relative w-full">
				<Input
					type="text"
					placeholder="Type a message..."
					className="flex-1 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 p-2 text-gray-800"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className="flex items-center justify-center text-gray-500 cursor-pointer transition-all hover:opacity-70 absolute right-1 top-1">
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
