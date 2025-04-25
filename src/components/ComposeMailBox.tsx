import { useChatStore } from "../lib/store";
import { useState } from "react";
import axiosInstance from "@/api/api";

export default function ComposeMailBox() {
  const { setIsComposingMail, selectedMail } = useChatStore();

  const [formData, setFormData] = useState({
    name: "",
    senders_email: "",
    recipient_email: "",
    phone_no: "",
    message: "",
    attachments: [], // optional
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = async () => {
    try {
      const response = await axiosInstance.post("/api/v1/email", formData);
      console.log("Email sent:", response.data);
      setIsComposingMail(false);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-[100vh] md:min-h-[88vh] md:max-h-[88vh] w-[100vw] bg-white shadow-sm rounded-sm text-black  ${
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

      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          name="message"
          placeholder="Write your message..."
          className="outline-none w-full"
          onChange={handleChange}
        />
      </div>

      {/* Optional file input for attachments */}
      {/* <input type="file" multiple onChange={handleFileChange} /> */}

      <div className="flex space-x-3 p-2">
        <button
          className="btn bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleSend}
        >
          Send
        </button>
        <button
          className="btn px-4 py-2 rounded border cursor-pointer"
          onClick={() => setIsComposingMail(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
