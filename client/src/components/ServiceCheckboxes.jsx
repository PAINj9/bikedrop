export default function ServiceCheckboxes({ form, onChange, errors }) {
  return (
    <fieldset className="mb-2">
      <legend className="font-semibold mb-2 text-gray-700">
        Service(s)*
      </legend>
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="clean"
            checked={form.service.clean}
            onChange={onChange}
            className="accent-blue-600"
          />
          Clean
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="brakeInspection"
            checked={form.service.brakeInspection}
            onChange={onChange}
            className="accent-blue-600"
          />
          Brake Inspection
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="chainReplacement"
            checked={form.service.chainReplacement}
            onChange={onChange}
            className="accent-blue-600"
          />
          Chain Replacement
        </label>
      </div>
      {errors.service && (
        <div className="text-red-600 text-sm mt-1">{errors.service}</div>
      )}
    </fieldset>
  );
}
