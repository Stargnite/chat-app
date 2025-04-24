export type ChatTab = "chat" | "email"
export type ChatCardType = {
  receiver_id: string
  receiver_name: string
  receiver_email: string
  receiver_picture: string | null,
  last_message: string
  last_sent_at: string
  archived?: boolean
}

export interface Message {
  id?: string
  userId?: string
  text?: string
  timestamp?: string
  time?: string
  unread?: boolean
  unreadCount?: number
  isNew?: boolean
  archived?: boolean
}

export  interface MailCardType {
  id: string;
  name: string;
  phone_no: string;
  senders_email: string;
  recipient_email: string;
  message: string;
  created_at: string;
  updated_at: string;
  attachments: {
    id: string;
    media_type: string;
    media_url: string;
    email_id: string;
    created_at: string;
    updated_at: string;
  };
};



// export interface User {
//   id: string
//   name: string
//   avatar: string
//   online: boolean
//   archived?: boolean
// }

