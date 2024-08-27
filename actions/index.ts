import { toast } from "sonner";
import { ScheduledMeetings } from "@/app/(routes)/dashboard/availability/data";
import { render } from "@react-email/render";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export const scheduleMeeting = async ({
  meeting,
  selectedDate,
  selectedTime,
  userEmail,
  userName,
  userNote,
}: any) => {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!regex.test(userEmail)) {
    toast("Enter valid email address");
    return;
  }

  ScheduledMeetings.push({
    id: Date.now(),
    duration: meeting.duration,
    eventId: meeting.id,
    selectedDate,
    selectedTime,
    userEmail,
    userName,
    userNote,
  });

  resend.emails
    .send({
      from: "fromemail@gmail.com",
      to: [userEmail],
      subject: "Meeting Schedule Details",
      html: `<div>qwe</div>`,
    })
    .then(({ data, error }) => {
      console.log(data, userEmail, error, process.env.RESEND_API_KEY);
      redirect("/confirmation");
    });
};
