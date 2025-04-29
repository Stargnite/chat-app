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
  sender_id: string
  sender_name: string
  sender_email: string
  sender_picture: string
  receiver_id: number
  receiver_name: string
  receiver_email: string
  receiver_picture: string
  message: string
  document: File | null
  id: string
  created_at: string
  updated_at: string
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
