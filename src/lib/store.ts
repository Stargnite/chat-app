import { create } from 'zustand'
import type { ChatTab, ChatCardType, MailCardType, Message } from './types'
// import ChatCard from '@/components/ChatCard'

export const defaultChatUser: ChatCardType = {
  receiver_id: "",
  receiver_name: "No User",
  receiver_email: "",
  receiver_picture: null,
  last_message: "",
  last_sent_at: "",
  archived: false,
};

interface ChatStore {
  // State
  activeTab: ChatTab
  selectedUser: ChatCardType | null
  selectedMail: MailCardType | undefined
  searchQuery: string
  messagesFilter: 'all' | 'unread' | 'archived'
  emailsFilter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred'
  recipientMenuOpen: boolean
  messageData: Message | null
  mailList: MailCardType[] | null
  isComposingMail: boolean
  // toggleChatArchived: (email: string, archived: boolean) => void;
  contacts: ChatCardType[]
  setContacts: (contacts: ChatCardType[]) => void
  updateArchivedStatus: (email: string, archived: boolean) => void


  // Actions
  setActiveTab: (tab: ChatTab) => void
  setSelectedUser: (user: ChatCardType | null) => void
  setSelectedMail: (email: MailCardType | undefined) => void
  setSearchQuery: (query: string) => void
  setMessagesFilter: (filter: 'all' | 'unread' | 'archived') => void
  setEmailsFilter: (filter: 'inbox' | 'sent' | 'drafts' | 'deleted' | 'starred') => void
  setMessageData: (messageData: Message | null) => void
  handleUserSelect: (user: ChatCardType) => void
  handleMailSelect: (mail: MailCardType) => void
  handleNewChat: () => void
  setRecipientMenuOpen: (open: boolean) => void
  setIsComposingMail: (open: boolean) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  activeTab: 'chat',
  selectedUser: null,
  selectedMail: undefined,
  searchQuery: '',
  messagesFilter: 'all',
  emailsFilter: 'inbox',
  recipientMenuOpen: false,
  messageData: null,
  contacts: [],
  mailList: null,
  isComposingMail: false,
  // toggleChatArchived: (email, archived) =>
  //   set((state) => {
  //     // Update selectedUser if it matches
  //     if (state.selectedUser?.receiver_email === email) {
  //       return {
  //         selectedUser: {
  //           ...state.selectedUser,
  //           archived,
  //         },
  //       };
  //     }
  //     return {};
  //   }),

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedMail: (email) => set({ selectedMail: email }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setMessagesFilter: (filter) => set({ messagesFilter: filter }),
  setEmailsFilter: (filter) => set({ emailsFilter: filter }),
  setRecipientMenuOpen: (open) => set({ recipientMenuOpen: open }),
  setMessageData: (messageData) => set({ messageData }),
  setIsComposingMail: (status: boolean) => set({ isComposingMail: status }),
  setContacts: (contacts) => set({ contacts }),

  updateArchivedStatus: (email, archived) => {
    const { contacts, selectedUser } = get();

    const updatedContacts = contacts.map((contact: ChatCardType) =>
      contact.receiver_email === email
        ? { ...contact, archived }
        : contact
    );
  
    const updatedSelectedUser =
      selectedUser?.receiver_email === email
        ? { ...selectedUser, archived }
        : selectedUser;

    set({
      contacts: updatedContacts,
      selectedUser: updatedSelectedUser,
    });
  },

  handleUserSelect: (user) => set({
    selectedUser: user,
    recipientMenuOpen: false,
    isComposingMail:false
  }),

  handleMailSelect: (mail) => set({
    selectedMail: mail,
    recipientMenuOpen: false,
    isComposingMail:false
  }),

  handleNewChat: () => set({
    selectedUser: undefined,
    selectedMail: undefined,
    isComposingMail: true,
    recipientMenuOpen: true,
  }),
}))