import { type ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  invert?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  className = '',
}: SectionHeadingProps) {
  const titleColor = invert ? 'text-white' : 'text-[#08162D]';
  const descColor = invert ? 'text-white/75' : 'text-[#475569]';
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? (
        <div
          className={`mb-4 flex items-center gap-2 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-8 bg-[#D0A455]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D0A455]">
            {eyebrow}
          </span>
        </div>
      ) : null}
      <h2
        className={`text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[40px] ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base sm:text-lg leading-relaxed ${descColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
