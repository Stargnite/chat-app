import type { User, Message } from "./types"
import img1 from "@/assets/dummyImgs/dummyImg1.png"
import img2 from "@/assets/dummyImgs/dummyImg2.png"
import img3 from "@/assets/dummyImgs/dummyImg3.png"
import img4 from "@/assets/dummyImgs/dummyImg4.png"
import img5 from "@/assets/dummyImgs/dummyImg5.png"

export const users: User[] = [
  {
    id: "1",
    name: "Alex Linderson",
    avatar: img1,
    online: true,
    archived: false,
  },
  {
    id: "2",
    name: "John Abraham",
    avatar: img2,
    online: false,
    archived: false,
  },
  {
    id: "3",
    name: "Sabile Sayma",
    avatar: img3,
    online: true,
    archived: false,
  },
  {
    id: "4",
    name: "John Borino",
    avatar: img4,
    online: false,
    archived: false
  },
  {
    id: "5",
    name: "Angel Dayna",
    avatar: img5,
    online: true,
    archived: false,
  },
  {
    id: "6",
    name: "Maria Wadhwani",
    avatar: img1,
    online: true,
    archived: false,
  },
  {
    id: "7",
    name: "Monish Jain",
    avatar: img3,
    online: true,
    archived: false,
  },
  {
    id: "8",
    name: "Medha Verma",
    avatar: img2,
    online: true,
    archived: false,
  },
  
]

export const messages: Message[] = [
  {
    id: "1",
    userId: "1",
    text: "How are you today?",
    timestamp: "2023-06-01T10:30:00Z",
    time: "Just now",
    unread: true,
    unreadCount: 3,
    isNew: true,
    archived: false,
  },
  {
    id: "2",
    userId: "2",
    text: "Can we do the meeting?",
    timestamp: "2023-06-01T09:45:00Z",
    time: "9:45 AM",
    unread: true,
    unreadCount: 1,
    isNew: false,
    archived: false,
  },
  {
    id: "3",
    userId: "3",
    text: "How are you today?",
    timestamp: "2023-06-01T08:20:00Z",
    time: "Yesterday",
    unread: false,
    unreadCount: 0,
    isNew: false,
    archived: false,
  },
  {
    id: "4",
    userId: "4",
    text: "About yesterday...",
    timestamp: "2023-05-31T15:10:00Z",
    time: "31 min ago",
    unread: false,
    unreadCount: 0,
    isNew: false,
    archived: false,
  },
  {
    id: "5",
    userId: "5",
    text: "Did you see that?",
    timestamp: "2023-05-31T11:05:00Z",
    time: "Yesterday",
    unread: false,
    unreadCount: 0,
    isNew: false,
    archived: false,
  },
  {
    id: "6",
    userId: "3",
    text: "How are you today?",
    timestamp: "2023-05-30T14:30:00Z",
    time: "Yesterday",
    unread: false,
    unreadCount: 0,
    isNew: false,
    archived: false,
  },
]

