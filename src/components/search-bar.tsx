import { Search, X } from "lucide-react"

interface SearchBarProps {
	searchQuery: string
	setSearchQuery: (query: string) => void
}

const SearchBar = ({searchQuery, setSearchQuery}: SearchBarProps) => {
	return (
		<div className="p-2 ">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="absolute right-2 top-2.5" onClick={() => setSearchQuery("")}>
              <X className="h-4 w-4 text-gray-700" />
            </button>
          )}
        </div>
      </div>
	)
}

export default SearchBar
