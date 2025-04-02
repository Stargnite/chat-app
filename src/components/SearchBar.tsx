import { Search, X } from "lucide-react"
import { useChatStore } from "../lib/store"

export default function SearchBar() {
	const { searchQuery, setSearchQuery } = useChatStore()

	return (
		<div className="relative p-3">
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
				<input
					type="text"
					placeholder="Search..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="text-gray-800 w-full pl-10 pr-8 py-2 border-0 bg-[#F9FAFB] rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
				{searchQuery && (
					<button
						onClick={() => setSearchQuery("")}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
		</div>
	)
}
