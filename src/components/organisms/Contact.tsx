'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { SuccessModal } from '../atoms/SuccessModal';
import { ContactItem } from '../molecules/ContactItem';
import { business } from '../../lib/theme';
import { sendContactEnquiry } from '../../lib/actions';
import { initialContactState, type ContactFormState } from '../../lib/contact-form';

export function Contact() {
  const [state, formAction] = useActionState(sendContactEnquiry, initialContactState);
  // Success modal shows on a successful submission; dismissing marks that state handled.
  const [dismissed, setDismissed] = useState<ContactFormState | null>(null);
  const showSuccess = state.status === 'success' && dismissed !== state;

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
                <strong>JP available</strong> for statutory declarations &amp; certifying documents
                by appointment.
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              action={formAction}
              className="rounded-3xl bg-[#08162D] p-8 text-white shadow-[0_24px_48px_-20px_rgba(8,22,45,0.4)] sm:p-10"
            >
              <h3 className="font-[family-name:var(--font-open-sans)] text-2xl font-bold">
                Request a free quote
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Tell us about your matter and we&rsquo;ll come back with a clear next step.
              </p>

              {state.status === 'error' && state.message ? (
                <div
                  role="alert"
                  className="mt-6 rounded-2xl bg-red-500/15 px-5 py-4 text-sm text-red-100 ring-1 ring-red-400/30"
                >
                  {state.message}
                </div>
              ) : null}

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="name"
                  placeholder="Jane Doe"
                  required
                  autoComplete="name"
                  state={state}
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="+61 ..."
                  required
                  autoComplete="tel"
                  state={state}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  autoComplete="email"
                  className="sm:col-span-2"
                  state={state}
                />
                <SelectField
                  label="Service required"
                  name="service"
                  defaultValue={state.values?.service ?? ''}
                  options={[
                    'Sale & purchase (residential or commercial)',
                    'Off the plan / vacant land',
                    'Building & pest inspection',
                    'Split contract',
                    'Transfer of lease',
                    'Simultaneous settlement',
                    'Strata report',
                    'First home buyer assistance / FHOG',
                    'Property division / separation on title',
                    'Part tenancy / related party transfer',
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
                  state={state}
                />
                <TextAreaField
                  label="Tell us about your matter"
                  name="message"
                  placeholder="Settlement date, special conditions, anything we should know..."
                  required
                  className="sm:col-span-2"
                  state={state}
                />
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/55">
                  By submitting, you agree to our privacy practices. No spam, ever.
                </p>
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      </Container>

      <SuccessModal
        open={showSuccess}
        message={state.message}
        onClose={() => setDismissed(state)}
      />
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      disabled={pending}
      iconRight={pending ? undefined : <Icon name="arrow-right" size={18} />}
    >
      {pending ? 'Sending…' : 'Send enquiry'}
    </Button>
  );
}

type FieldProps = {
  label: string;
  name: 'name' | 'phone' | 'email' | 'address';
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
  state: ContactFormState;
};

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  className = '',
  required,
  autoComplete,
  state,
}: FieldProps) {
  const error = state.errors[name];
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">
        {label}
        {required ? <span className="text-[#D0A455]"> *</span> : null}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        defaultValue={state.values?.[name] ?? ''}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-2 h-12 w-full rounded-lg border bg-white/5 px-4 text-sm text-white transition-colors duration-200 outline-none placeholder:text-white/35 focus:ring-2 ${
          error
            ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/30'
            : 'border-white/15 focus:border-[#D0A455] focus:ring-[#D0A455]/30'
        }`}
      />
      {error ? (
        <span id={`${name}-error`} className="mt-1.5 block text-xs text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue = '',
  className = '',
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">
        {label}
      </span>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white transition-colors duration-200 outline-none focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
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
  required,
  state,
}: {
  label: string;
  name: 'message';
  placeholder?: string;
  className?: string;
  required?: boolean;
  state: ContactFormState;
}) {
  const error = state.errors[name];
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">
        {label}
        {required ? <span className="text-[#D0A455]"> *</span> : null}
      </span>
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder}
        required={required}
        defaultValue={state.values?.[name] ?? ''}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-2 w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white transition-colors duration-200 outline-none placeholder:text-white/35 focus:ring-2 ${
          error
            ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/30'
            : 'border-white/15 focus:border-[#D0A455] focus:ring-[#D0A455]/30'
        }`}
      />
      {error ? (
        <span id={`${name}-error`} className="mt-1.5 block text-xs text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}
