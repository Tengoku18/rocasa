'use client';

import { useEffect, useState } from 'react';
import { Container } from '../atoms/Container';
import { Logo } from '../atoms/Logo';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { NavLink } from '../molecules/NavLink';
import { business } from '../../lib/theme';

const NAV = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="hidden lg:block bg-[#08162D] text-white text-xs">
        <Container size="xl">
          <div className="flex h-9 items-center justify-between">
            <div className="flex items-center gap-6 text-white/75">
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2 cursor-pointer transition-colors hover:text-[#D0A455]"
              >
                <Icon name="phone" size={12} /> {business.phone}
              </a>
              <a
                href={business.emailHref}
                className="inline-flex items-center gap-2 cursor-pointer transition-colors hover:text-[#D0A455]"
              >
                <Icon name="mail" size={12} /> {business.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Icon name="map-pin" size={12} />
              <span>{business.address.line1} {business.address.line2}</span>
            </div>
          </div>
        </Container>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-12px_rgba(8,22,45,0.18)]'
            : 'bg-white'
        }`}
      >
        <Container size="xl">
          <div className="flex h-18 items-center justify-between py-3">
            <Logo />

            <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
              {NAV.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Button href={business.phoneHref} variant="ghost" size="sm" iconLeft={<Icon name="phone" size={14} />}>
                Call now
              </Button>
              <Button href="#contact" variant="primary" size="sm" iconRight={<Icon name="arrow-right" size={14} />}>
                Request a quote
              </Button>
            </div>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden grid h-11 w-11 place-items-center rounded-lg border border-[#08162D]/15 text-[#08162D] cursor-pointer transition-colors duration-200 hover:bg-[#FAF0BC]"
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </Container>

        {open ? (
          <div className="lg:hidden border-t border-[#08162D]/10 bg-white">
            <Container size="xl">
              <nav aria-label="Mobile" className="flex flex-col gap-1 py-4">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-[15px] font-medium text-[#08162D] cursor-pointer transition-colors duration-200 hover:bg-[#FAF0BC] hover:text-[#08162D]"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-[#08162D]/10 pt-4">
                  <Button href={business.phoneHref} variant="outline" size="md" iconLeft={<Icon name="phone" size={16} />}>
                    {business.phone}
                  </Button>
                  <Button href="#contact" variant="primary" size="md" iconRight={<Icon name="arrow-right" size={16} />}>
                    Request a quote
                  </Button>
                </div>
              </nav>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  );
}
