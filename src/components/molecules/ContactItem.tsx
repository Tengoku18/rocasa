import { type ReactNode } from 'react';
import { Icon, type IconName } from '../atoms/Icon';

type ContactItemProps = {
  icon: IconName;
  label: string;
  value: ReactNode;
  href?: string;
  invert?: boolean;
};

export function ContactItem({ icon, label, value, href, invert = false }: ContactItemProps) {
  const labelColor = invert ? 'text-white/55' : 'text-[#475569]';
  const valueColor = invert ? 'text-white' : 'text-[#08162D]';
  const iconWrap = invert
    ? 'bg-white/10 text-[#D0A455]'
    : 'bg-[#FAF0BC] text-[#08162D]';

  const content = (
    <div className="flex items-start gap-4">
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${iconWrap}`}
      >
        <Icon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${labelColor}`}>
          {label}
        </div>
        <div className={`mt-1 text-[15px] font-semibold leading-snug ${valueColor}`}>
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block rounded-xl cursor-pointer transition-colors duration-200 hover:opacity-90"
      >
        {content}
      </a>
    );
  }

  return content;
}
