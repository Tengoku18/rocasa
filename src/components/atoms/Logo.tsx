import Image from 'next/image';

type LogoProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const src =
    variant === 'dark'
      ? '/_Transparent%20mono%20logo.png'
      : '/_Transparent%20logo.png';

  return (
    <a
      href="#top"
      aria-label="Rocasa Conveyancing home"
      className={`inline-flex items-center cursor-pointer ${className}`}
    >
      <Image
        src={src}
        alt="Rocasa Conveyancing"
        width={320}
        height={96}
        priority
        className="h-12 w-auto sm:h-14"
      />
    </a>
  );
}
