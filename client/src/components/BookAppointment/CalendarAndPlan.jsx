import React from "react";
import CalendarSelector from "./CalendarSelector";
import PlanSelector from "../PlanSelector";

export default function CalendarAndPlan({
  isPersonalInfoValid,
  dateTime,
  setDateTime,
  bookedSlotsByDate,
  selectedPlan,
  setSelectedPlan,
  planError
}) {
  if (!isPersonalInfoValid) return null;

  return (
    <div className="mt-7">
      <CalendarSelector
        value={dateTime}
        onChange={setDateTime}
        bookedSlotsByDate={bookedSlotsByDate}
      />

      {dateTime.date && dateTime.slot && (
        <PlanSelector
          value={selectedPlan}
          onChange={setSelectedPlan}
          error={planError}
        />
      )}
    </div>
  );
}
