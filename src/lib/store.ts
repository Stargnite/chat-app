import { create } from 'zustand'
import type { ChatTab, ChatCardType, MailCardType, Message } from './types'

interface ChatStore {
  // State
  activeTab: ChatTab
  selectedUser: ChatCardType | undefined
  selectedMail: MailCardType | undefined
  searchQuery: string
  messagesFilter: 'all' | 'unread' | 'archived'
  emailsFilter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred'
  recipientMenuOpen: boolean
  messageData: Message | null
  mailList: MailCardType[] | null

  // Actions
  setActiveTab: (tab: ChatTab) => void
  setSelectedUser: (user: ChatCardType | undefined) => void
  setSelectedMail: (email: MailCardType | undefined) => void
  setSearchQuery: (query: string) => void
  setMessagesFilter: (filter: 'all' | 'unread' | 'archived') => void
  setEmailsFilter: (filter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred') => void
  setMessageData: (messageData: Message | null) => void
  handleUserSelect: (user: ChatCardType) => void
  handleMailSelect: (mail: MailCardType) => void
  handleNewChat: () => void
  setRecipientMenuOpen: (open: boolean) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  // Initial state
  activeTab: 'chat',
  selectedUser: undefined,
  selectedMail: undefined,
  searchQuery: '',
  messagesFilter: 'all',
  emailsFilter: 'inbox',
  recipientMenuOpen: false,
  messageData: null,
  chatList: [],
  mailList: null,

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedMail: (email) => set({ selectedMail: email }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setMessagesFilter: (filter) => set({ messagesFilter: filter }),
  setEmailsFilter: (filter) => set({ emailsFilter: filter }),
  setRecipientMenuOpen: (open) => set({ recipientMenuOpen: open }),
  setMessageData: (messageData) => set({ messageData }),

  handleUserSelect: (user) => set({
    selectedUser: user,
    recipientMenuOpen: false,
  }),

  handleMailSelect: (mail) => set({
    selectedMail: mail,
    recipientMenuOpen: false,
  }),

  handleNewChat: () => set({
    selectedUser: undefined,
    recipientMenuOpen: true,
  }),
}))
