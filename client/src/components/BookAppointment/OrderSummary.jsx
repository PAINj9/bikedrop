export default function OrderSummary({ form, dateTime, plan, note }) {
  return (
    <div className="bg-white border border-blue-100 shadow-xl rounded-2xl p-6 sticky top-24 min-h-[350px]">
      <h3 className="text-xl font-bold mb-4 text-blue-700">Order Summary</h3>
      <div className="text-base">
        <div><span className="font-semibold">Name:</span> {form.name}</div>
        <div><span className="font-semibold">Phone:</span> {form.phone}</div>
        <div><span className="font-semibold">Email:</span> {form.email}</div>
        <div><span className="font-semibold">Address:</span> {form.address}</div>
        <div><span className="font-semibold">City:</span> {form.city}</div>
        <div><span className="font-semibold">Floor:</span> {form.floor}</div>
        <div><span className="font-semibold">Postal Code:</span> {form.postalCode}</div>
        <div><span className="font-semibold">Date:</span> {dateTime?.date ? (typeof dateTime.date === "string" ? dateTime.date : dateTime.date.toLocaleDateString()) : "-"}</div>
        <div><span className="font-semibold">Time:</span> {dateTime?.slot || "-"}</div>
        <div><span className="font-semibold">Plan:</span> {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "-"}</div>
        {note && <div><span className="font-semibold">Notes:</span> {note}</div>}
      </div>
      <div className="text-xs mt-4 text-gray-400">
        Please check your details before confirming.
      </div>
    </div>
  );
}
