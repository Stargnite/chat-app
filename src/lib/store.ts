import { create } from 'zustand'
import type { ChatTab, ChatCardType, Message } from './types'

interface ChatStore {
  // State
  activeTab: ChatTab
  selectedUser: ChatCardType | undefined
  searchQuery: string
  messagesFilter: 'all' | 'unread' | 'archived'
  emailsFilter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred'
  recipientMenuOpen: boolean
  messageData: Message | null
  chatList: ChatCardType[]

  // Actions
  setActiveTab: (tab: ChatTab) => void
  setSelectedUser: (user: ChatCardType | undefined) => void
  setSearchQuery: (query: string) => void
  setMessagesFilter: (filter: 'all' | 'unread' | 'archived') => void
  setEmailsFilter: (filter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred') => void
  setMessageData: (messageData: Message | null) => void
  handleUserSelect: (user: ChatCardType) => void
  handleNewChat: () => void
  setRecipientMenuOpen: (open: boolean) => void
  setChatList: (list: ChatCardType[] | ((prevList: ChatCardType[]) => ChatCardType[])) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  // Initial state
  activeTab: 'chat',
  selectedUser: undefined,
  searchQuery: '',
  messagesFilter: 'all',
  emailsFilter: 'inbox',
  recipientMenuOpen: false,
  messageData: null,
  chatList: [],

  // for email tab
  


  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setMessagesFilter: (filter) => set({ messagesFilter: filter }),
  setEmailsFilter: (filter) => set({ emailsFilter: filter }),
  setRecipientMenuOpen: (open) => set({ recipientMenuOpen: open }),
  setMessageData: (messageData) => set({ messageData: messageData }),
  setChatList: (listOrFunction) => set((state) => {
    if (typeof listOrFunction === 'function') {
      return { chatList: listOrFunction(state.chatList) };
    }
    return { chatList: listOrFunction };
  }),
  
  handleUserSelect: (user) => set({ 
    selectedUser: user, 
    recipientMenuOpen: false,
  }),
  
  handleNewChat: () => set({ 
    selectedUser: undefined, 
    recipientMenuOpen: true,
  }),
})) 













// import { create } from 'zustand'
// import type { User, ChatTab, ChatCardType } from './types'

// interface ChatStore {
//   // State
//   activeTab: ChatTab
//   selectedUser: ChatCardType | null | User
//   searchQuery: string
//   messagesFilter: 'all' | 'unread' | 'archived'
//   emailsFilter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred'
//   recipientMenuOpen: boolean
//   message: string

//   // Actions
//   setActiveTab: (tab: ChatTab) => void
//   setSelectedUser: (user: User | null) => void
//   setSearchQuery: (query: string) => void
//   setMessagesFilter: (filter: 'all' | 'unread' | 'archived') => void
//   setEmailsFilter: (filter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred') => void
//   setMessage: (message: string) => void
//   handleUserSelect: (user: User) => void
//   handleNewChat: () => void
//   setRecipientMenuOpen: (open: boolean) => void
// }

// export const useChatStore = create<ChatStore>((set) => ({
//   // Initial state
//   activeTab: 'chat',
//   selectedUser: null,
//   searchQuery: '',
//   messagesFilter: 'all',
//   emailsFilter: 'inbox',
//   recipientMenuOpen: false,
//   message: '',

//   // for email tab
  


//   // Actions
//   setActiveTab: (tab) => set({ activeTab: tab }),
//   setSelectedUser: (user) => set({ selectedUser: user }),
//   setSearchQuery: (query) => set({ searchQuery: query }),
//   setMessagesFilter: (filter) => set({ messagesFilter: filter }),
//   setEmailsFilter: (filter) => set({ emailsFilter: filter }),
//   setRecipientMenuOpen: (open) => set({ recipientMenuOpen: open }),
//   setMessage: (message) => set({ message: message }),
  
//   handleUserSelect: (user) => set({ 
//     selectedUser: user, 
//     recipientMenuOpen: false,
//   }),
  
//   handleNewChat: () => set({ 
//     selectedUser: null, 
//     recipientMenuOpen: true,
//   }),
// })) 