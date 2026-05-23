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
  { href: '#faqs', label: 'FAQs' },
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-sidebar"
              onClick={() => setOpen(true)}
              className="lg:hidden grid h-11 w-11 place-items-center rounded-lg border border-[#08162D]/15 text-[#08162D] cursor-pointer transition-colors duration-200 hover:bg-[#FAF0BC]"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </Container>
      </header>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-[#08162D]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-white shadow-[8px_0_32px_-12px_rgba(8,22,45,0.35)] transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#08162D]/10 px-5 py-4">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-[#08162D]/15 text-[#08162D] cursor-pointer transition-colors duration-200 hover:bg-[#FAF0BC]"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-semibold text-[#08162D] cursor-pointer transition-colors duration-200 hover:bg-[#FAF0BC]"
                >
                  <span>{item.label}</span>
                  <Icon name="chevron-right" size={16} className="text-[#D0A455]" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[#08162D]/10 bg-[#FAF0BC]/30 px-5 py-5">
          <div className="flex flex-col gap-2.5">
            <Button
              href={business.phoneHref}
              variant="outline"
              size="md"
              fullWidth
              iconLeft={<Icon name="phone" size={16} />}
            >
              {business.phone}
            </Button>
            <Button
              href="#contact"
              variant="primary"
              size="md"
              fullWidth
              iconRight={<Icon name="arrow-right" size={16} />}
            >
              Request a quote
            </Button>
          </div>
          <a
            href={business.emailHref}
            className="mt-4 flex items-center gap-2 text-xs text-[#475569] cursor-pointer transition-colors hover:text-[#08162D]"
          >
            <Icon name="mail" size={14} className="text-[#D0A455]" />
            {business.email}
          </a>
        </div>
      </aside>
    </>
  );
}
