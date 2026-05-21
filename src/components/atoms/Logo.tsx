type LogoProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const primary = variant === 'dark' ? '#08162D' : '#FFFFFF';
  const accent = '#D0A455';

  return (
    <a
      href="#top"
      aria-label="Rocasa Conveyancing home"
      className={`inline-flex items-center gap-3 cursor-pointer ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-lg"
        style={{ backgroundColor: primary }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5Z"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12.5h6"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="font-[family-name:var(--font-open-sans)] text-lg font-extrabold tracking-tight"
          style={{ color: primary }}
        >
          Rocasa
        </span>
        <span
          className="font-[family-name:var(--font-roboto)] text-[10px] font-medium tracking-[0.22em] uppercase mt-1"
          style={{ color: accent }}
        >
          Conveyancing
        </span>
      </span>
    </a>
  );
}
