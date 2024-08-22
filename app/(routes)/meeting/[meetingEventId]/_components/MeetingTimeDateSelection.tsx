"use client";

import { Button } from "@/components/ui/button";
import { addMinutes, format, setHours, setMinutes } from "date-fns";
import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ScheduledMeetings } from "@/app/(routes)/dashboard/availability/data";
import { render } from "@react-email/render";
import Email from "@/emails";
import { scheduleMeeting } from "@/actions";

function MeetingTimeDateSelection({ eventInfo, availabilities }: any) {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [enableTimeSlot, setEnabledTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNote, setUserNote] = useState("");
  const [prevBooking, setPrevBooking]: any = useState();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // TODO: Move to parent component
  // const resend = new Resend(process.env.RESEND_API_KEY)
  useEffect(() => {
    eventInfo?.duration && generateTimeSlots(8, 22, eventInfo.duration);
  }, [eventInfo]);

  const generateTimeSlots = (startHour = 0, endHour = 0, interval = 30) => {
    const slots = [];
    const startTime = setMinutes(setHours(new Date(), startHour), 0); // Start at startHour:00
    const endTime = setMinutes(setHours(new Date(), endHour), 0); // End at endHour:00

    let currentTime = startTime;

    while (currentTime <= endTime) {
      slots.push(format(currentTime, "hh:mm a"));
      currentTime = addMinutes(currentTime, interval); // Increment by 30 minutes
    }
    setTimeSlots(slots);
  };

  /**
   * On Date Change Handle Method
   * @param {*} date
   */
  const handleDateChange = (date: Date) => {
    setDate(date);
    const day = format(date, "EEEE");
    if (availabilities?.daysAvailable?.[day]) {
      addPrevEventBooking(date);
      setEnabledTimeSlot(true);
    } else {
      setEnabledTimeSlot(false);
    }
  };

  /**
   * Handle Schedule Event on Click Schedule Button
   * @returns
   */
  const handleScheduleEvent = () => {
    setLoading(true);
    scheduleMeeting({ date, selectedTime, userEmail, userName, userNote });
    router.replace("/confirmation");
    toast("Meeting Scheduled successfully!");
    setLoading(false);

    // await setDoc(doc(db, "ScheduledMeetings", docId), {
    //   businessName: businessInfo.businessName,
    //   businessEmail: businessInfo.email,
    //   selectedTime: selectedTime,
    //   selectedDate: date,
    //   formatedDate: format(date, "PPP"),
    //   formatedTimeStamp: format(date, "t"),
    //   duration: eventInfo.duration,
    //   locationUrl: eventInfo.locationUrl,
    //   eventId: eventInfo.id,
    //   id: docId,
    //   userName: userName,
    //   userEmail: userEmail,
    //   userNote: userNote,
    // }).then((resp) => {
    //   toast("Meeting Scheduled successfully!");
    //   sendEmail(userName);
    // });
  };

  /**
   * Used to email to User
   * @param {*} user
   */
  const sendEmail = (user: any) => {
    const emailHtml = render(
      <Email
        userName={"username"}
        date={format(date, "PPP").toString()}
        duration={eventInfo?.duration}
        meetingTime={selectedTime}
        meetingUrl={eventInfo.locationUrl}
        inviteeName={user}
      />,
    );

    // resend.emails.send({
    //   from: 'fromemail@gmail.com',
    //   to: [userEmail],
    //   subject: "Meeting Schedule Details",
    //   react: emailHtml
    // }).then(({data, error}) => {
    //   console.log(data, userEmail, error, process.env.RESEND_API_KEY);
    //   setLoading(false);
    //   router.replace("/confirmation");
    // })
  };

  /**
   * Used to Fetch Previous Booking for given event
   * @param {*} date
   */

  //TODO: Fix naming to add Selected Date
  const addPrevEventBooking = async (date: any) => {
    const getSelectedDateSchedule = ScheduledMeetings.filter(
      (meeting) => meeting.selectedDate.toDateString() === date.toDateString(),
    );
    setPrevBooking(getSelectedDateSchedule);
  };

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8
    mx-10
    md:mx-26
    lg:mx-56
    my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.svg" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting Info  */}
        <div className="p-4 border-r">
          {/*<h2>{businessInfo?.businessName}</h2>*/}
          <h2 className="font-bold text-3xl">
            {eventInfo?.name || "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventInfo?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType} Meeting
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, "PPP")}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime}
              </h2>
            )}

            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>
        {/* Time & Date Selction  */}
        {step == 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
            availabilities={availabilities}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className="flex gap-3 justify-end">
        {step == 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail || !userName}
            onClick={handleScheduleEvent}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Schedule"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDateSelection;
