'use client'
import MeetingTimeDateSelection from "./_components/MeetingTimeDateSelection";
import { MeetingEvents } from "@/app/(routes)/dashboard/meeting-type/_components/data";
import {Availabilities, ScheduledMeetings} from "@/app/(routes)/dashboard/availability/data";
import {Resend} from "resend";
import {toast} from "sonner";
import {render} from "@react-email/render";
import Email from "@/emails";
import {format} from "date-fns";
import React from "react";
import {redirect} from "next/navigation";

function SharedMeetingEvent({ params }: { params: any }) {
  // const db=getFirestore(app);
  // const [businessInfo, setBusinesInfo] = useState();
  // const [eventInfo, setEventInfo] = useState();
  // const [loading, setLoading] = useState(false);
  // const resend = new Resend(process.env.RESEND_API_KEY)
  const meeting = MeetingEvents.find(meeting => meeting.id === params.meetingEventId)

  /**
   * Used to get Business Info and Event Details for Give Login User/Business Owner
   */
  const getMeetingBusinessAndEventDetails = async () => {
    // setLoading(true);
    // const q=query(collection(db,'Business'),where('businessName','==',params.business));
    // const docSnap=await getDocs(q);
    // docSnap.forEach((doc)=>{
    //     setBusinessInfo(doc.data())
    // });
    //
    // const docRef=doc(db,'MeetingEvent',params?.meetingEventId);
    // const result=await getDoc(docRef);
    // setEventInfo(result.data());
  };

  return (
    <div>
      <MeetingTimeDateSelection
        eventInfo={meeting}
        availabilities={Availabilities}
      />
    </div>
  );
}

export default SharedMeetingEvent;
