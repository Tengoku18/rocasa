import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#D0A455] text-[#08162D] hover:bg-[#b2873a] hover:text-white focus-visible:ring-[#D0A455]',
  secondary:
    'bg-[#08162D] text-white hover:bg-[#142447] focus-visible:ring-[#08162D]',
  outline:
    'bg-transparent text-[#08162D] border border-[#08162D] hover:bg-[#08162D] hover:text-white focus-visible:ring-[#08162D]',
  ghost:
    'bg-transparent text-[#08162D] hover:bg-[#FAF0BC] focus-visible:ring-[#D0A455]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-[15px] gap-2',
  lg: 'h-14 px-8 text-base gap-2.5',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    fullWidth,
    className = '',
    children,
  } = props;

  const base =
    'inline-flex items-center justify-center rounded-full font-semibold tracking-wide cursor-pointer transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = [
    base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, iconLeft: _il, iconRight: _ir, fullWidth: _fw, className: _c, children: _ch, ...rest } = props;
    void _v; void _s; void _il; void _ir; void _fw; void _c; void _ch;
    return (
      <a href={href} className={classes} {...rest}>
        {iconLeft ? <span className="inline-flex shrink-0">{iconLeft}</span> : null}
        <span>{children}</span>
        {iconRight ? <span className="inline-flex shrink-0">{iconRight}</span> : null}
      </a>
    );
  }

  const { variant: _v, size: _s, iconLeft: _il, iconRight: _ir, fullWidth: _fw, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  void _v; void _s; void _il; void _ir; void _fw; void _c; void _ch;
  return (
    <button className={classes} {...rest}>
      {iconLeft ? <span className="inline-flex shrink-0">{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span className="inline-flex shrink-0">{iconRight}</span> : null}
    </button>
  );
}
