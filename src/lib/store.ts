import { create } from 'zustand'
import type { User, ChatTab } from './types'

interface ChatStore {
  // State
  activeTab: ChatTab
  selectedUser: User | null
  searchQuery: string
  filter: 'all' | 'unread' | 'archived'
  recipientMenuOpen: boolean
  message: string

  // Actions
  setActiveTab: (tab: ChatTab) => void
  setSelectedUser: (user: User | null) => void
  setSearchQuery: (query: string) => void
  setFilter: (filter: 'all' | 'unread' | 'archived') => void
  setMessage: (message: string) => void
  handleUserSelect: (user: User) => void
  handleNewChat: () => void
  setRecipientMenuOpen: (open: boolean) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  // Initial state
  activeTab: 'chat',
  selectedUser: null,
  searchQuery: '',
  filter: 'all',
  recipientMenuOpen: false,
  message: '',

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (filter) => set({ filter: filter }),
  setRecipientMenuOpen: (open) => set({ recipientMenuOpen: open }),
  setMessage: (message) => set({ message: message }),
  
  handleUserSelect: (user) => set({ 
    selectedUser: user, 
    recipientMenuOpen: false,
  }),
  
  handleNewChat: () => set({ 
    selectedUser: null, 
    recipientMenuOpen: true,
  }),
})) 