import axiosInstance from "@/api/api";
import { useChatStore } from "../lib/store";

// Export these functions to be imported where needed
export const archiveChat = async (userMail: string) => {
  try {
    await axiosInstance.put(`/api/v1/archive/${userMail}`);
    
    // Get the store functions - you can also pass these as parameters
    const { setChatList } = useChatStore.getState();
    
    // Update local state to reflect archived status
    setChatList(prevList => 
      prevList.map(chat => 
        chat.receiver_email === userMail 
          ? { ...chat, archived: true } 
          : chat
      )
    );
    
    console.log("Chat archived successfully");
    return true;
  } catch (err) {
    console.error("Error archiving chat:", err);
    return false;
  }
};

export const unarchiveChat = async (userMail: string) => {
  try {
    await axiosInstance.put(`/api/v1/unarchive/${userMail}`);
    
    // Get the store functions
    const { setChatList } = useChatStore.getState();
    
    // Update local state to reflect unarchived status
    setChatList(prevList => 
      prevList.map(chat => 
        chat.receiver_email === userMail
          ? { ...chat, archived: false } 
          : chat
      )
    );
    
    console.log("Chat unarchived successfully");
    return true;
  } catch (err) {
    console.error("Error unarchiving chat:", err);
    return false;
  }
};


export const deleteMessage = async (messageId: string) => {
  try {
    await axiosInstance.delete(`/api/v1/messages/${messageId}`);
    
    // Update local state to remove the message
    // This depends on how you're storing messages
    
    console.log("Message deleted successfully");
    return true;
  } catch (err) {
    console.error("Error deleting message:", err);
    return false;
  }
};



export const deleteChat = async (userMail: string) => {
  try {
    await axiosInstance.delete(`/api/v1/messages/${userMail}`);
    
    // Update local state to remove the message
    // This depends on how you're storing messages
    
    console.log("Chat deleted successfully");
    return true;
  } catch (err) {
    console.error("Error deleting chat:", err);
    return false;
  }
};
