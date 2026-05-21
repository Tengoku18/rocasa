type StatCardProps = {
  value: string;
  label: string;
  invert?: boolean;
};

export function StatCard({ value, label, invert = false }: StatCardProps) {
  const valueColor = invert ? 'text-[#D0A455]' : 'text-[#08162D]';
  const labelColor = invert ? 'text-white/70' : 'text-[#475569]';
  const border = invert ? 'border-white/10' : 'border-[#08162D]/10';

  return (
    <div className={`border-l-2 ${border} pl-5`}>
      <div className={`font-[family-name:var(--font-open-sans)] text-3xl font-extrabold sm:text-4xl ${valueColor}`}>
        {value}
      </div>
      <div className={`mt-1.5 text-xs font-medium uppercase tracking-[0.16em] ${labelColor}`}>
        {label}
      </div>
    </div>
  );
}
