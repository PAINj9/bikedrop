// src/pages/BookAppointment.jsx
import React from "react";
import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import StepProgressBar from "../components/BookAppointment/StepProgressBar";

import {
  PersonalInfoForm,
  AppointmentExtras,
  AppointmentSummary,
  Footer,
  NotesInput,
  SubmitButtonWithLoader,
} from "../components/BookAppointment";

import useBookAppointment from "../components/BookAppointment/useBookAppointment";

export default function BookAppointment() {
  const {
    loading,
    form,
    errors,
    dateTime,
    bookedSlotsByDate,
    selectedPlan,
    planError,
    step,
    inputRefs,
    handleChange,
    isPersonalInfoValid,
    isFormValid,
    handleSubmit,
    setDateTime,
    setSelectedPlan,
    note,
    setNote,
  } = useBookAppointment();

  return (
    <>
      <Helmet>
        <title>BikeDrop | Appointment</title>
      </Helmet>

      <Navbar small />

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-1">
        <div className="w-full max-w-5xl">
          <div className="pt-5 sm:pt-8">
            <StepProgressBar currentStep={step} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-white border border-blue-100 shadow-2xl rounded-2xl sm:rounded-3xl px-3 sm:px-10 py-7 sm:py-12 mt-6 mb-12 transition-all duration-300"
            autoComplete="off"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-7 text-blue-700 text-center">
              Book Appointment
            </h2>

            <div className="flex flex-col lg:flex-row gap-7 sm:gap-8">
              <div className="flex-1 transition-all duration-500">
                <PersonalInfoForm
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                  inputRefs={inputRefs}
                />

                <AppointmentExtras
                  formValid={isPersonalInfoValid()}
                  dateTime={dateTime}
                  setDateTime={setDateTime}
                  bookedSlotsByDate={bookedSlotsByDate}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  planError={planError}
                />

                <NotesInput
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <div className="mt-6">
                  <SubmitButtonWithLoader
                    loading={loading}
                    disabled={!isFormValid() || loading}
                  />
                </div>
              </div>

              <AppointmentSummary
                isPersonalInfoValid={isPersonalInfoValid()}
                form={form}
                dateTime={dateTime}
                selectedPlan={selectedPlan}
              />
            </div>
          </form>

          <Footer />
        </div>
      </div>
    </>
  );
}