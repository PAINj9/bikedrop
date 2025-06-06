export default function CustomerInfoForm({ form, onChange, errors, inputRefs }) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Full Name*"
              value={form.name}
              onChange={onChange}
              className={`border p-3 rounded-lg focus:outline-blue-400 ${errors.name ? "border-red-400" : "border-gray-300"}`}
              required
              ref={inputRefs.name}
              autoComplete="off"
              maxLength={40}
            />
            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
          </div>
          <div className="flex flex-col">
            <input
              type="tel"
              name="phone"
              placeholder="Phone*"
              value={form.phone}
              onChange={onChange}
              className={`border p-3 rounded-lg focus:outline-blue-400 ${errors.phone ? "border-red-400" : "border-gray-300"}`}
              required
              ref={inputRefs.phone}
              autoComplete="off"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={15}
            />
            {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={form.email}
              onChange={onChange}
              className={`border p-3 rounded-lg focus:outline-blue-400 ${errors.email ? "border-red-400" : "border-gray-300"}`}
              required
              ref={inputRefs.email}
              autoComplete="off"
              maxLength={60}
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="city"
              placeholder="City*"
              value={form.city}
              onChange={onChange}
              className={`border p-3 rounded-lg focus:outline-blue-400 ${errors.city ? "border-red-400" : "border-gray-300"}`}
              required
              ref={inputRefs.city}
              autoComplete="off"
              maxLength={40}
            />
            {errors.city && <div className="text-red-600 text-sm mt-1">{errors.city}</div>}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <input
            type="text"
            name="address"
            placeholder="Address*"
            value={form.address}
            onChange={onChange}
            className={`border p-3 rounded-lg w-full focus:outline-blue-400 ${errors.address ? "border-red-400" : "border-gray-300"}`}
            required
            ref={inputRefs.address}
            autoComplete="off"
            maxLength={60}
          />
          {errors.address && <div className="text-red-600 text-sm mt-1">{errors.address}</div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <input
              type="text"
              name="floor"
              placeholder="Floor*"
              value={form.floor}
              onChange={onChange}
              className={`border p-3 rounded-lg w-full focus:outline-blue-400 ${errors.floor ? "border-red-400" : "border-gray-300"}`}
              required
              ref={inputRefs.floor}
              autoComplete="off"
              maxLength={10}
            />
            {errors.floor && <div className="text-red-600 text-sm mt-1">{errors.floor}</div>}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code*"
              value={form.postalCode}
              onChange={onChange}
              className={`border p-3 rounded-lg w-full focus:outline-blue-400 ${errors.postalCode ? "border-red-400" : "border-gray-300"}`}
              required
              ref={inputRefs.postalCode}
              autoComplete="off"
              maxLength={10}
            />
            {errors.postalCode && <div className="text-red-600 text-sm mt-1">{errors.postalCode}</div>}
          </div>
        </div>
      </>
    );
  }
  