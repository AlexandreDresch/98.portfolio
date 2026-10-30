export function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between text-[11px]">
      <span>{label}</span>
      <span className="font-bold tabular-nums">{value.toLocaleString()}</span>
    </div>
  );
}
