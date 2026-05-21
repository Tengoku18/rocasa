import { Container } from '../atoms/Container';
import { Logo } from '../atoms/Logo';
import { Icon } from '../atoms/Icon';
import { business } from '../../lib/theme';

const FOOTER_NAV = [
  {
    title: 'Services',
    links: [
      { label: 'Contract review', href: '#services' },
      { label: 'Property settlement', href: '#services' },
      { label: 'Structural inspection', href: '#services' },
      { label: 'Dilapidation survey', href: '#services' },
      { label: 'JP witnessing', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Rocasa', href: '#about' },
      { label: 'Our process', href: '#process' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#08162D] text-white">
      <Container size="xl">
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Engineering consultant, licensed conveyancer &amp; JP (NSW) —
              safeguarding property transactions across Sydney and New South
              Wales.
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href={business.phoneHref}
                className="flex items-center gap-3 text-white/80 cursor-pointer transition-colors duration-200 hover:text-[#D0A455]"
              >
                <Icon name="phone" size={16} className="text-[#D0A455]" />
                {business.phone}
              </a>
              <a
                href={business.emailHref}
                className="flex items-center gap-3 text-white/80 cursor-pointer transition-colors duration-200 hover:text-[#D0A455]"
              >
                <Icon name="mail" size={16} className="text-[#D0A455]" />
                {business.email}
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <Icon name="map-pin" size={16} className="mt-0.5 text-[#D0A455]" />
                <span>
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                </span>
              </div>
            </div>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D0A455]">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/75 cursor-pointer transition-colors duration-200 hover:text-[#D0A455]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D0A455]">
              Credentials
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <Icon name="shield-check" size={16} className="text-[#D0A455]" />
                Licensed Conveyancer NSW
              </li>
              <li className="flex items-center gap-2">
                <Icon name="scale" size={16} className="text-[#D0A455]" />
                Justice of the Peace (NSW)
              </li>
              <li className="flex items-center gap-2">
                <Icon name="building" size={16} className="text-[#D0A455]" />
                Engineering Consultant
              </li>
              <li className="flex items-center gap-2">
                <Icon name="check" size={16} className="text-[#D0A455]" />
                PEXA accredited
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Rocasa Conveyancing. All rights reserved.
          </p>
          <p>Sydney, NSW · ABN provided on request</p>
        </div>
      </Container>
    </footer>
  );
}
