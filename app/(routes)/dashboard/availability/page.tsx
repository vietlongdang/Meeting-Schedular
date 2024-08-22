"use client";
import DaysList from "@/app/_utils/DaysList";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Availabilities } from "@/app/(routes)/dashboard/availability/data";

function Availability() {
  const [daysAvailable, setDaysAvailable] = useState(
    Availabilities.daysAvailable,
  );
  const [startTime, setStartTime] = useState(Availabilities.startTime);
  const [endTime, setEndTime] = useState(Availabilities.endTime);

  const onHandleChange = (day: any, value: any) => {
    setDaysAvailable({
      ...daysAvailable,
      [day]: value,
    });
  };

  const handleSave = () => {
    Availabilities.daysAvailable = daysAvailable;
    Availabilities.startTime = startTime;
    Availabilities.endTime = endTime;
    toast("Availability Updated!");
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item: any, index) => (
            <div key={index}>
              <h2>
                <Checkbox
                  checked={daysAvailable[item.day]}
                  onCheckedChange={(e: any) => onHandleChange(item.day, e)}
                />{" "}
                {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              defaultValue={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              defaultValue={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default Availability;
