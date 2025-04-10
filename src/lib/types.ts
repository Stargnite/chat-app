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

export interface Email {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  subject: string
  preview: string
  timestamp: string
  threadCount: number
  hasAttachment: boolean
  isRead: boolean
  archived: boolean
}