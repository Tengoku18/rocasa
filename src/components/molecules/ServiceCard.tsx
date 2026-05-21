import { type ReactNode } from 'react';
import { Icon, type IconName } from '../atoms/Icon';

type ServiceCardProps = {
  icon: IconName;
  title: string;
  description: string;
  bullets?: string[];
  href?: string;
  tone?: 'light' | 'dark';
  badge?: ReactNode;
};

export function ServiceCard({
  icon,
  title,
  description,
  bullets = [],
  href = '#contact',
  tone = 'light',
  badge,
}: ServiceCardProps) {
  const isDark = tone === 'dark';
  const wrap = isDark
    ? 'bg-[#08162D] text-white ring-1 ring-white/10 hover:ring-[#D0A455]/60'
    : 'bg-white text-[#08162D] ring-1 ring-[#08162D]/8 hover:ring-[#D0A455]';
  const desc = isDark ? 'text-white/75' : 'text-[#475569]';
  const bulletColor = isDark ? 'text-white/85' : 'text-[#08162D]/85';

  return (
    <article
      className={`group relative flex h-full flex-col rounded-2xl p-7 sm:p-8 shadow-[0_6px_24px_-12px_rgba(8,22,45,0.15)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(8,22,45,0.28)] ${wrap}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid h-12 w-12 place-items-center rounded-xl ${
            isDark ? 'bg-[#D0A455] text-[#08162D]' : 'bg-[#FAF0BC] text-[#08162D]'
          } transition-colors duration-200 group-hover:bg-[#D0A455] group-hover:text-[#08162D]`}
        >
          <Icon name={icon} size={22} />
        </span>
        {badge}
      </div>
      <h3 className={`mt-6 text-xl font-bold sm:text-[22px] ${isDark ? 'text-white' : ''}`}>
        {title}
      </h3>
      <p className={`mt-3 text-[15px] leading-relaxed ${desc}`}>{description}</p>
      {bullets.length > 0 ? (
        <ul className="mt-5 space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className={`flex items-start gap-2.5 text-sm ${bulletColor}`}
            >
              <span
                className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  isDark ? 'bg-[#D0A455]/20 text-[#D0A455]' : 'bg-[#FAF0BC] text-[#08162D]'
                }`}
              >
                <Icon name="check" size={11} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <a
        href={href}
        className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold cursor-pointer ${
          isDark ? 'text-[#D0A455] hover:text-white' : 'text-[#08162D] hover:text-[#D0A455]'
        } transition-colors duration-200`}
      >
        Discuss your matter
        <Icon name="arrow-right" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </article>
  );
}
