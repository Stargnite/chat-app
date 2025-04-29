import axiosInstance from "@/api/api";

// Export these functions to be imported where needed
export const archiveChat = async (userMail: string, is_archived: boolean | undefined) => {
  try {
    await axiosInstance.put(`/api/v1/archive/${userMail}`);
    
    console.log("Chat archived successfully");
    is_archived = true;
    alert("Chat archived successfully");
    return true;
  } catch (err) {
    console.error("Error archiving chat:", err);
    return false;
  }
};

export const unarchiveChat = async (userMail: string, is_archived: boolean | undefined) => {
  try {
    await axiosInstance.put(`/api/v1/unarchive/${userMail}`);
    is_archived = false;
    console.log("Chat unarchived successfully");
    alert("Chat unarchived successfully");
    return true;
  } catch (err) {
    console.error("Error unarchiving chat:", err);
    return false;
  }
};


export const deleteMessage = async (messageId: string) => {
  try {
    await axiosInstance.delete(`/api/v1/message/${messageId}`);
    
    // Update local state to remove the message
    // This depends on how you're storing messages
    
    console.log("Message deleted successfully");
    return true;
  } catch (err) {
    console.error("Error deleting message:", err);
    return false;
  }
};

export const deleteMail = async (messageId: string) => {
  try {
    await axiosInstance.delete(`/api/v1/mail/${messageId}`);
    
    // Update local state to remove the message
    // This depends on how you're storing messages
    
    console.log("Mail deleted successfully");
    return true;
  } catch (err) {
    console.error("Error deleting mail:", err);
    return false;
  }
};




export const deleteChat = async (userMail: string) => {
  try {
    await axiosInstance.delete(`/api/v1/chat/${userMail}`);
    
    // Update local state to remove the message
    // This depends on how you're storing messages
    
    console.log("Chat deleted successfully");
    return true;
  } catch (err) {
    console.error("Error deleting chat:", err);
    return false;
  }
};