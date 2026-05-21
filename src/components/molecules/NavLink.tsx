import { type ReactNode } from 'react';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  invert?: boolean;
  onClick?: () => void;
};

export function NavLink({ href, children, invert = false, onClick }: NavLinkProps) {
  const base = invert
    ? 'text-white/85 hover:text-[#D0A455]'
    : 'text-[#08162D]/85 hover:text-[#D0A455]';

  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative inline-flex items-center text-[15px] font-medium cursor-pointer transition-colors duration-200 ease-out ${base} after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#D0A455] after:transition-all after:duration-200 hover:after:w-full`}
    >
      {children}
    </a>
  );
}
