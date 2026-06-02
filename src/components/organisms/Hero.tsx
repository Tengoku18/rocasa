'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Container } from '../atoms/Container';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Icon } from '../atoms/Icon';
import { SuccessModal } from '../atoms/SuccessModal';
import { sendQuickEnquiry } from '../../lib/actions';
import { initialQuickState, type QuickEnquiryState } from '../../lib/contact-form';

export function Hero() {
  const [state, formAction] = useActionState(sendQuickEnquiry, initialQuickState);
  // Success modal shows on a successful submission; dismissing marks that state handled.
  const [dismissed, setDismissed] = useState<QuickEnquiryState | null>(null);
  const showSuccess = state.status === 'success' && dismissed !== state;

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#08162D] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(80% 60% at 15% 0%, rgba(208,164,85,0.18) 0%, transparent 60%), radial-gradient(70% 60% at 100% 100%, rgba(250,240,188,0.10) 0%, transparent 55%), radial-gradient(45% 50% at 50% 110%, rgba(208,164,85,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 mix-blend-soft-light"
        style={{
          backgroundImage:
            'linear-gradient(120deg, transparent 0%, rgba(208,164,85,0.06) 45%, transparent 55%, rgba(250,240,188,0.04) 80%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 -z-10 h-105 w-105 rounded-full bg-[#D0A455]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-20 -z-10 h-90 w-90 rounded-full bg-[#FAF0BC]/6 blur-3xl"
      />

      <Container size="xl">
        <div className="grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <div className="lg:col-span-7">
            <Badge tone="gold">Licensed Conveyancer · JP (NSW)</Badge>

            <h1 className="mt-6 font-[family-name:var(--font-open-sans)] text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Property transfers handled
              <span className="block text-[#D0A455]"> with care &amp; precision.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Sydney&rsquo;s trusted licensed conveyancing practice, contract reviews, secure PEXA
              settlements and JP services, all under one roof, with clear fixed fees and one expert
              handling your matter.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Request a contract review
              </Button>
              <Button
                href="#services"
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white hover:!text-[#08162D]"
              >
                Explore services
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-[#D0A455]" /> PEXA electronic
                settlements
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-[#D0A455]" /> Fixed-fee transparency
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-[#D0A455]" /> NSW-wide service
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[28px] bg-[#D0A455]/15 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative rounded-[22px] bg-white p-7 text-[#08162D] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.22em] text-[#D0A455] uppercase">
                      Free initial review
                    </div>
                    <div className="mt-1 font-[family-name:var(--font-open-sans)] text-xl font-bold">
                      Talk to Khem today
                    </div>
                  </div>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#FAF0BC] text-[#08162D]">
                    <Icon name="scale" size={22} />
                  </span>
                </div>

                <form action={formAction} className="mt-6 space-y-3.5">
                  {state.status === 'error' && state.message ? (
                    <p
                      role="alert"
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 ring-1 ring-red-200"
                    >
                      {state.message}
                    </p>
                  ) : null}
                  <div className="grid grid-cols-2 gap-3">
                    <HeroField
                      label="First name"
                      name="firstName"
                      placeholder="Jane"
                      autoComplete="given-name"
                      state={state}
                    />
                    <HeroField
                      label="Last name"
                      name="lastName"
                      placeholder="Doe"
                      autoComplete="family-name"
                      state={state}
                    />
                  </div>
                  <HeroField
                    label="Phone"
                    name="phone"
                    type="tel"
                    placeholder="+61 ..."
                    autoComplete="tel"
                    state={state}
                  />
                  <HeroField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    autoComplete="email"
                    state={state}
                  />
                  <label className="block">
                    <span className="text-xs font-semibold text-[#08162D]/70">
                      Service required
                    </span>
                    <select
                      name="service"
                      className="mt-1 h-11 w-full rounded-lg border border-[#08162D]/15 bg-white px-3 text-sm text-[#08162D] transition-colors outline-none focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
                      defaultValue={state.values?.service ?? ''}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option>Sale & purchase</option>
                      <option>Off the plan / vacant land</option>
                      <option>Building & pest inspection</option>
                      <option>Simultaneous settlement</option>
                      <option>First home buyer / FHOG</option>
                      <option>JP witnessing</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <HeroSubmitButton />
                  <p className="text-center text-[11px] text-[#475569]">
                    No obligation. We respond within one business day.
                  </p>
                </form>
              </div>
            </div>
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

function HeroSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      size="md"
      fullWidth
      disabled={pending}
      iconRight={pending ? undefined : <Icon name="arrow-right" size={16} />}
    >
      {pending ? 'Sending…' : 'Get a free quote'}
    </Button>
  );
}

type HeroFieldProps = {
  label: string;
  name: 'firstName' | 'lastName' | 'phone' | 'email';
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  state: QuickEnquiryState;
};

function HeroField({
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  state,
}: HeroFieldProps) {
  const error = state.errors[name];
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[#08162D]/70">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={state.values?.[name] ?? ''}
        aria-invalid={error ? true : undefined}
        className={`mt-1 h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#08162D] transition-colors outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30'
            : 'border-[#08162D]/15 focus:border-[#D0A455] focus:ring-[#D0A455]/30'
        }`}
      />
      {error ? <span className="mt-1 block text-[11px] text-red-600">{error}</span> : null}
    </label>
  );
}
