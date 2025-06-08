import React from "react";

export default function PersonalInfoForm({ form, errors, handleChange, inputRefs }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <input
            ref={inputRefs.name}
            type="text"
            name="name"
            placeholder="Full Name*"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
            required
            maxLength={40}
          />
          {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
        </div>
        <div>
          <input
            ref={inputRefs.phone}
            type="tel"
            name="phone"
            placeholder="Phone*"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
            required
            maxLength={15}
          />
          {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
        </div>
        <div>
          <input
            ref={inputRefs.email}
            type="email"
            name="email"
            placeholder="Email*"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
            required
            maxLength={60}
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>
        <div>
          <input
            ref={inputRefs.city}
            type="text"
            name="city"
            placeholder="City*"
            value={form.city}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
            required
            maxLength={30}
          />
          {errors.city && <div className="text-red-600 text-sm mt-1">{errors.city}</div>}
        </div>
      </div>

      <input
        ref={inputRefs.address}
        type="text"
        name="address"
        placeholder="Address*"
        value={form.address}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 mt-4 text-base"
        required
        maxLength={50}
      />
      {errors.address && <div className="text-red-600 text-sm mt-1">{errors.address}</div>}

      <div className="flex gap-3 mt-4">
        <div className="w-1/2">
          <input
            ref={inputRefs.floor}
            type="text"
            name="floor"
            placeholder="Floor*"
            value={form.floor}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
            required
            maxLength={10}
          />
          {errors.floor && <div className="text-red-600 text-sm mt-1">{errors.floor}</div>}
        </div>
        <div className="w-1/2">
          <input
            ref={inputRefs.postalCode}
            type="text"
            name="postalCode"
            placeholder="Postal Code*"
            value={form.postalCode}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 text-base"
            required
            maxLength={12}
          />
          {errors.postalCode && <div className="text-red-600 text-sm mt-1">{errors.postalCode}</div>}
        </div>
      </div>
    </>
  );
}
