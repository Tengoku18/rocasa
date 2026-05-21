import { type ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  tone?: 'gold' | 'navy' | 'cream';
  icon?: ReactNode;
  className?: string;
};

const toneStyles = {
  gold: 'bg-[#FAF0BC] text-[#08162D] ring-1 ring-[#D0A455]/40',
  navy: 'bg-[#08162D] text-white ring-1 ring-white/10',
  cream: 'bg-white text-[#08162D] ring-1 ring-[#08162D]/10',
} as const;

export function Badge({ children, tone = 'gold', icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase ${toneStyles[tone]} ${className}`}
    >
      {icon ? <span className="inline-flex h-3.5 w-3.5">{icon}</span> : null}
      {children}
    </span>
  );
}
