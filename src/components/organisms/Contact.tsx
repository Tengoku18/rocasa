'use client';

import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { ContactItem } from '../molecules/ContactItem';
import { business } from '../../lib/theme';

export function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <Container size="xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Get in touch"
              title={
                <>
                  Let&rsquo;s talk about your{' '}
                  <span className="text-[#D0A455]">property matter.</span>
                </>
              }
              description="Free initial consult, transparent fixed fees, and a response within one business day. Office visits by appointment."
            />

            <div className="mt-10 grid gap-6">
              <ContactItem
                icon="phone"
                label="Call"
                value={business.phone}
                href={business.phoneHref}
              />
              <ContactItem
                icon="mail"
                label="Email"
                value={business.email}
                href={business.emailHref}
              />
              <ContactItem
                icon="map-pin"
                label="Office"
                value={
                  <>
                    {business.address.line1}
                    <br />
                    {business.address.line2}
                  </>
                }
              />
              <ContactItem icon="clock" label="Hours" value={business.hours} />
            </div>

            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#FAF0BC]/60 px-5 py-4 text-sm text-[#08162D] ring-1 ring-[#D0A455]/30">
              <Icon name="shield-check" size={20} className="text-[#08162D]" />
              <span>
                <strong>JP available</strong> for statutory declarations &amp; certifying
                documents by appointment.
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-3xl bg-[#08162D] p-8 text-white shadow-[0_24px_48px_-20px_rgba(8,22,45,0.4)] sm:p-10"
            >
              <h3 className="font-[family-name:var(--font-open-sans)] text-2xl font-bold">
                Request a free quote
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Tell us about your matter and we&rsquo;ll come back with a clear next step.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Jane Doe" />
                <Field label="Phone" name="phone" type="tel" placeholder="+61 ..." />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  className="sm:col-span-2"
                />
                <SelectField
                  label="Service required"
                  name="service"
                  options={[
                    'Contract of Sale review',
                    'Property settlement (PEXA)',
                    'Pre-purchase structural inspection',
                    'Dilapidation survey',
                    'JP witnessing',
                    'Other',
                  ]}
                  className="sm:col-span-2"
                />
                <Field
                  label="Property address"
                  name="address"
                  placeholder="Suburb, NSW"
                  className="sm:col-span-2"
                />
                <TextAreaField
                  label="Tell us about your matter"
                  name="message"
                  placeholder="Settlement date, special conditions, anything we should know..."
                  className="sm:col-span-2"
                />
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/55">
                  By submitting, you agree to our privacy practices. No spam — ever.
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  iconRight={<Icon name="arrow-right" size={18} />}
                >
                  Send enquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

function Field({ label, name, type = 'text', placeholder, className = '' }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
        {label}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  className = '',
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
        {label}
      </span>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white outline-none transition-colors duration-200 focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
      >
        <option value="" disabled className="bg-[#08162D]">
          Select a service
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#08162D]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  className = '',
}: {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
        {label}
      </span>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
      />
    </label>
  );
}
