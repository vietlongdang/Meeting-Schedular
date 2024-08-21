import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {addMinutes, isAfter, isBefore, parse} from "date-fns";

function TimeDateSelection({
  date,
  handleDateChange,
  timeSlots,
  setSelectedTime,
  enableTimeSlot,
  selectedTime,
  prevBooking,
  availabilities
}: any) {
  const availableStartTime = parse(availabilities.startTime, 'HH:mm', new Date());
  const availableEndTime = parse(availabilities.endTime, 'HH:mm', new Date());

  /**
   * Used to check timeslot whether its already booked or not
   * @param {*} time
   * @returns Boolean
   */
  const isSlotBooked = (time: string) => {
    return (
      prevBooking.some((item: any) => {
        return item.selectedTime == time
      })
    );
  };

  const outOfAvailableRange = (time: string) => {
    const [hour, minutes, modifier] = time.split(/[:\s]/); // Split time into hour, minutes, and AM/PM
    const hourInt = parseInt(hour);
    const minutesInt = parseInt(minutes);
    const isPM = modifier === 'PM';

    // Convert 12-hour time to 24-hour time for easier comparison
    const hour24 = isPM ? (hourInt === 12 ? 12 : hourInt + 12) : hourInt;

    const timeInDate = parse(`${hour24}:${minutesInt}`, 'HH:mm', new Date());
    return !(isAfter(addMinutes(timeInDate, 1), availableStartTime) && isBefore(timeInDate, availableEndTime) || timeInDate.getTime() === availableEndTime.getTime());
  };

  return (
    <div className="md:col-span-2 flex px-4">
      <div className="flex flex-col">
        <h2 className="font-bold text-lg">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="rounded-md border mt-5"
          disabled={(date) => date <= new Date()}
          required={true}
        />
      </div>
      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5"
        style={{ maxHeight: "400px" }}
      >
        {timeSlots?.map((time: any, index: any) => (
          <Button
            key={index}
            disabled={!enableTimeSlot || isSlotBooked(time) || outOfAvailableRange(time)}
            onClick={() => setSelectedTime(time)}
            className={`border-primary
             text-primary
             ${time == selectedTime && "bg-primary text-white"}
             `}
            variant="outline"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default TimeDateSelection;
