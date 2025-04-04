import { create } from 'zustand'
import type { User, ChatTab } from './types'

interface ChatStore {
  // State
  activeTab: ChatTab
  selectedUser: User | null
  searchQuery: string
  messagesFilter: 'all' | 'unread' | 'archived'
  emailsFilter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred'
  recipientMenuOpen: boolean
  message: string

  // Actions
  setActiveTab: (tab: ChatTab) => void
  setSelectedUser: (user: User | null) => void
  setSearchQuery: (query: string) => void
  setMessagesFilter: (filter: 'all' | 'unread' | 'archived') => void
  setEmailsFilter: (filter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred') => void
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
  messagesFilter: 'all',
  emailsFilter: 'inbox',
  recipientMenuOpen: false,
  message: '',
  // messages: Message[],
  // userMessages: {},

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setMessagesFilter: (filter) => set({ messagesFilter: filter }),
  setEmailsFilter: (filter) => set({ emailsFilter: filter }),
  setRecipientMenuOpen: (open) => set({ recipientMenuOpen: open }),
  setMessage: (message) => set({ message: message }),
  // setMessages: (messages: []) => set({ messages: [...messages] }),
  
  handleUserSelect: (user) => set({ 
    selectedUser: user, 
    recipientMenuOpen: false,
  }),
  
  handleNewChat: () => set({ 
    selectedUser: null, 
    recipientMenuOpen: true,
  }),
})) 