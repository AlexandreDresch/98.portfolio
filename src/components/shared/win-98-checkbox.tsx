export function Win98Checkbox({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-start gap-2 cursor-default select-none group ${disabled ? "opacity-50" : ""}`}
      onClick={disabled ? undefined : () => onChange(!checked)}
    >
      <div
        className="flex-shrink-0 mt-[1px]"
        style={{
          width: 13,
          height: 13,
          background: disabled ? "#c0c0c0" : "white",
          border: "2px solid",
          borderColor: "#808080 white white #808080",
          boxShadow: "inset 1px 1px 0 #404040",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 9 9">
            <polyline
              points="1,5 3.5,7.5 8,1"
              stroke="#000"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-xs leading-tight">{label}</span>
    </label>
  );
}