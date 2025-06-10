export default function NotesInput({ value, onChange }) {
  return (
    <div className="flex flex-col">
      <textarea
        name="note"
        placeholder="Additional notes (optional)"
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-blue-400 resize-none"
        rows={3}
        maxLength={250}
      />
      <div className="text-xs text-gray-400 text-right mt-1">
        {value.length}/250
      </div>
    </div>
  );
}