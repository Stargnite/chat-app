import { useChatStore } from "../lib/store";
import { useState, useRef } from "react";
import axiosInstance from "@/api/api";
import { Paperclip } from "lucide-react"

export default function ComposeMailBox() {
  const { setIsComposingMail, selectedMail } = useChatStore();

  const [formData, setFormData] = useState({
    name: "",
    senders_email: "",
    recipient_email: "",
    phone_no: "",
    message: "",
    attachments: [] as File[], 
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        attachments: Array.from(files),
      }));
    }
  };

  const handleSend = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("senders_email", formData.senders_email);
    data.append("recipient_email", formData.recipient_email);
    data.append("phone_no", formData.phone_no);
    data.append("message", formData.message);

    formData.attachments.forEach((file) => {
      data.append("attachments", file);
    });

    try {
      const response = await axiosInstance.post("/api/v1/email", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Email sent:", response.data);
      setIsComposingMail(false);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  // const handleSend = async () => {
  //   try {
  //     const response = await axiosInstance.post("/api/v1/email", formData);
  //     console.log("Email sent:", response.data);
  //     setIsComposingMail(false);
  //   } catch (error) {
  //     console.error("Failed to send email:", error);
  //   }
  // };

  return (
    <div
      className={`flex flex-col min-h-full md:min-h-[88vh] md:max-h-[88vh] w-[100vw] bg-white shadow-sm rounded-sm text-black  ${
        selectedMail ? "hidden" : "block"
      }`}
    >
      <div className="flex items-center gap-x-3 px-4 py-3 border-b border-gray-200">
        To:{" "}
        <input
          name="recipient_email"
          placeholder="Recipient's email"
          className="bg-[#E6EEFF] border-0 rounded-md p-1 text-[#4C6EF5] outline-none"
          onChange={handleChange}
        />
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          name="message"
          placeholder="Write your message..."
          className="outline-none w-full"
          onChange={handleChange}
        />
      </div>
      {formData.attachments.length > 0 && (
  <div className="px-4 text-sm text-gray-600">
    Attached: {formData.attachments.map((f) => f.name).join(", ")}
  </div>
)}

      {/* Optional file input for attachments */}
      {/* <input type="file" multiple onChange={handleFileChange} /> */}

      <div className="flex items-center space-x-3 p-2">
      <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Paperclip triggers file input */}
        <Paperclip
          className="text-gray-700 cursor-pointer transition-all hover:text-blue-500"
          onClick={() => fileInputRef.current?.click()}
        />
      

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleSend}
        >
          Send
        </button>
        <button
          className="px-4 py-1.5 rounded border cursor-pointer"
          onClick={() => setIsComposingMail(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


 {/* <input
        name="name"
        placeholder="Your name"
        className="input"
        onChange={handleChange}
      />
      <input
        name="senders_email"
        placeholder="Your email"
        className="input"
        onChange={handleChange}
      />

      <input
        name="phone_no"
        placeholder="Phone number"
        className="input"
        onChange={handleChange}
      /> */}