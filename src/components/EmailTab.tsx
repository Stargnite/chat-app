import { useChatStore } from "../lib/store";
import { cn } from "../lib/utils";
// import RightClickContext from "./RightClickContext";
import EmailCard from "./EmailCard";
import { MailCardType } from "@/lib/types";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/api";

const EmailTab = () => {
  const [mails, setMails] = useState<MailCardType[]>([
    {
      id: "9e2386a0-e73d-433f-9f0e-c14531f4d184",
      name: "Emeka",
      phone_no: "091234568",
      senders_email: "emelka@yahoo.com",
      recipient_email: "prof@vincode.com",
      message: "jshjsdnmsf sfhsjksfkj jdkajjadhkda",
      created_at: "2025-02-05T11:16:37.000000Z",
      updated_at: "2025-02-05T11:16:37.000000Z",
      attachments: {
        id: "9e2386a4-af6f-4d4b-a706-8085ad616254",
        media_type: "image",
        media_url:
          "https://spconsultationbucket.s3.ca-central-1.amazonaws.com/attachments/e071971f-b138-4977-b3a5-d90877a80207.jpg",
        email_id: "9e2386a0-e73d-433f-9f0e-c14531f4d184",
        created_at: "2025-02-05T11:16:39.000000Z",
        updated_at: "2025-02-05T11:16:39.000000Z",
      },
    },
  ]);
  const {
    // searchQuery,
    emailsFilter,
    setEmailsFilter,
    selectedMail,
    handleMailSelect,
  } = useChatStore();

  // Fetch Mails
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/email");
        const data = response.data.data;
        setMails([
          {
            id: "9e2386a0-e73d-433f-9f0e-c14531f4d184",
            name: "Emeka",
            phone_no: "091234568",
            senders_email: "emelka@yahoo.com",
            recipient_email: "prof@vincode.com",
            message: "jshjsdnmsf sfhsjksfkj jdkajjadhkda",
            created_at: "2025-02-05T11:16:37.000000Z",
            updated_at: "2025-02-05T11:16:37.000000Z",
            attachments: {
              id: "9e2386a4-af6f-4d4b-a706-8085ad616254",
              media_type: "image",
              media_url:
                "https://spconsultationbucket.s3.ca-central-1.amazonaws.com/attachments/e071971f-b138-4977-b3a5-d90877a80207.jpg",
              email_id: "9e2386a0-e73d-433f-9f0e-c14531f4d184",
              created_at: "2025-02-05T11:16:39.000000Z",
              updated_at: "2025-02-05T11:16:39.000000Z",
            },
          },
        ]);
        console.log(data);
        console.log("Contacts fetched successfully:", data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchMails();
  }, [setMails]);

  // Filter and sort emails
  // const filteredEmails = mails
  //   .filter((mail) => {
  //     const user = users.find((u) => u.id === email.userId);
  //     if (!user) return false;

  //     // Apply search filter
  //     if (
  //       searchQuery &&
  //       !user.name.toLowerCase().includes(searchQuery.toLowerCase())
  //       // &&
  //       // !email.text.toLowerCase().includes(searchQuery.toLowerCase())
  //     ) {
  //       return false;
  //     }

  //     // Apply tab filter
  //     // if (emailsFilter === "inbox" && !email.unread) return false
  //     if (emailsFilter === "sent" && !mail.archived) return false;
  //     if (emailsFilter === "drafts" && !mail.archived) return false;
  //     if (emailsFilter === "deleted" && !mail.archived) return false;
  //     if (emailsFilter === "starred" && !mail.archived) return false;

  //     return true;
  //   })
  //   .sort(
  //     (a, b) =>
  //       new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  //   );
  return (
    <>
      {/* Filters -- (All, Uread & Archived) */}
      <div className="flex w-full gap-x-1.5 px-5 self-center justify-evenly">
        {["inbox", "sent", "drafts", "deleted", "starred"].map((filter) => (
          <button
            key={filter}
            className={cn(
              "flex-1 py-2 font-medium transition-all",
              emailsFilter === filter
                ? "text-blue-500 border-b-2 border-blue-500 overflow-hidden poppins-semibold"
                : "text-gray-500 poppins-regular"
            )}
            onClick={() =>
              setEmailsFilter(
                filter as "inbox" | "sent" | "drafts" | "deleted" | "starred"
              )
            }
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto flex flex-col space-y-3 my-5 px-3">
        {mails?.map((mail: MailCardType) => (
          // <RightClickContext key={mail.id} mail={selectedMail}>
            <EmailCard
              mail={mail}
              onMailSelect={handleMailSelect}
              selectedMail={selectedMail}
            />
          // </RightClickContext>
        ))}
      </div>
    </>
  );
};

export default EmailTab;





 {/* {filteredEmails.map((email) => {
          const user = users.find((u) => u.id === email.userId);
          if (!user) return null;

          return (
            <RightClickContext key={email.id} user={user}>
              <EmailCard
                // key={email.id}
                user={user}
                message={email}
                onUserSelect={handleUserSelect}
                selectedUser={selectedUser}
              />
            </RightClickContext>
          );
        })} */}