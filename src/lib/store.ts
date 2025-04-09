import { create } from 'zustand'
import type { ChatTab, ChatCardType } from './types'

interface ChatStore {
  // State
  activeTab: ChatTab
  selectedUser: ChatCardType | null
  searchQuery: string
  messagesFilter: 'all' | 'unread' | 'archived'
  emailsFilter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred'
  recipientMenuOpen: boolean
  message: string
  chatList: ChatCardType[]

  // Actions
  setActiveTab: (tab: ChatTab) => void
  setSelectedUser: (user: ChatCardType | null) => void
  setSearchQuery: (query: string) => void
  setMessagesFilter: (filter: 'all' | 'unread' | 'archived') => void
  setEmailsFilter: (filter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred') => void
  setMessage: (message: string) => void
  handleUserSelect: (user: ChatCardType) => void
  handleNewChat: () => void
  setRecipientMenuOpen: (open: boolean) => void
  setChatList: (list: ChatCardType[]) => void
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
  chatList: [],

  // for email tab
  


  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setMessagesFilter: (filter) => set({ messagesFilter: filter }),
  setEmailsFilter: (filter) => set({ emailsFilter: filter }),
  setRecipientMenuOpen: (open) => set({ recipientMenuOpen: open }),
  setMessage: (message) => set({ message: message }),
  setChatList: (list) => set({ chatList: list }),
  
  handleUserSelect: (user) => set({ 
    selectedUser: user, 
    recipientMenuOpen: false,
  }),
  
  handleNewChat: () => set({ 
    selectedUser: null, 
    recipientMenuOpen: true,
  }),
})) 