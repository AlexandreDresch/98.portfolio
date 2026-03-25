export default function Win98Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className="w-[13px] h-[13px] bg-white border-2 border-[#808080] border-t-[#404040] border-l-[#404040] flex items-center justify-center"
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1 4L3 7L8 1" stroke="#000" strokeWidth="2" />
          </svg>
        )}
      </div>
      <span className="text-xs">{label}</span>
    </label>
  );
}
