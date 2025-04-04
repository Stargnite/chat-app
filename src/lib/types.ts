export type ChatTab = "chat" | "email"

export interface User {
  id: string
  name: string
  avatar: string
  online: boolean
  archived?: boolean
}

export interface Message {
  id: string
  userId: string
  text: string
  timestamp: string
  time: string
  unread: boolean
  unreadCount: number
  isNew: boolean
  archived: boolean
}

