import React from "react";
import CalendarSelector from "../components/CalendarSelector";
import PlanSelector from "../components/PlanSelector";

export default function AppointmentExtras({
  formValid,
  dateTime,
  setDateTime,
  bookedSlotsByDate,
  selectedPlan,
  setSelectedPlan,
  planError
}) {
  return (
    <div className="mt-7">
      {formValid && (
        <CalendarSelector
          value={dateTime}
          onChange={setDateTime}
          bookedSlotsByDate={bookedSlotsByDate}
        />
      )}
      {formValid && dateTime.date && dateTime.slot && (
        <PlanSelector
          value={selectedPlan}
          onChange={setSelectedPlan}
          error={planError}
        />
      )}
    </div>
  );
}
