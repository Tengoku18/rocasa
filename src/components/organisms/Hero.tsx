'use client';

import { Container } from '../atoms/Container';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Icon } from '../atoms/Icon';
import { StatCard } from '../molecules/StatCard';

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#08162D] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 10%, #D0A455 0%, transparent 40%), radial-gradient(circle at 80% 80%, #FAF0BC 0%, transparent 35%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(transparent 95%, rgba(208,164,85,0.08) 95%), linear-gradient(90deg, transparent 95%, rgba(208,164,85,0.08) 95%)',
          backgroundSize: '60px 60px',
        }}
      />

      <Container size="xl">
        <div className="grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <div className="lg:col-span-7">
            <Badge tone="gold">
              Licensed Conveyancer · JP (NSW)
            </Badge>

            <h1 className="mt-6 font-[family-name:var(--font-open-sans)] text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Property transfers handled with
              <span className="block text-[#D0A455]"> an engineer&rsquo;s eye.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Sydney&rsquo;s only dual practice combining licensed conveyancing,
              JP services, and structural engineering consultancy — so the
              contract you sign and the building you buy are both safe.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#contact" variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={18} />}>
                Request a contract review
              </Button>
              <Button href="#services" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white hover:!text-[#08162D]">
                Explore services
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-[#D0A455]" /> PEXA electronic settlements
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-[#D0A455]" /> Engineer-led inspections
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} className="text-[#D0A455]" /> NSW-wide service
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[28px] bg-[#D0A455]/15 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[22px] bg-white p-7 text-[#08162D] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/5 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D0A455]">
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

                <form className="mt-6 space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs font-semibold text-[#08162D]/70">First name</span>
                      <input
                        type="text"
                        className="mt-1 h-11 w-full rounded-lg border border-[#08162D]/15 bg-white px-3 text-sm text-[#08162D] outline-none transition-colors focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
                        placeholder="Jane"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-[#08162D]/70">Last name</span>
                      <input
                        type="text"
                        className="mt-1 h-11 w-full rounded-lg border border-[#08162D]/15 bg-white px-3 text-sm text-[#08162D] outline-none transition-colors focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
                        placeholder="Doe"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold text-[#08162D]/70">Email</span>
                    <input
                      type="email"
                      className="mt-1 h-11 w-full rounded-lg border border-[#08162D]/15 bg-white px-3 text-sm text-[#08162D] outline-none transition-colors focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
                      placeholder="you@email.com"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold text-[#08162D]/70">Service required</span>
                    <select
                      className="mt-1 h-11 w-full rounded-lg border border-[#08162D]/15 bg-white px-3 text-sm text-[#08162D] outline-none transition-colors focus:border-[#D0A455] focus:ring-2 focus:ring-[#D0A455]/30"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option>Contract of Sale review</option>
                      <option>Pre-purchase structural inspection</option>
                      <option>Property settlement (PEXA)</option>
                      <option>JP witnessing</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <Button type="submit" variant="primary" size="md" fullWidth iconRight={<Icon name="arrow-right" size={16} />}>
                    Get a free quote
                  </Button>
                  <p className="text-center text-[11px] text-[#475569]">
                    No obligation. We respond within one business day.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-white/10 py-10 sm:grid-cols-4 sm:gap-8">
          <StatCard invert value="500+" label="Settlements completed" />
          <StatCard invert value="15+" label="Years experience" />
          <StatCard invert value="100%" label="PEXA settlements" />
          <StatCard invert value="5★" label="Average client rating" />
        </div>
      </Container>
    </section>
  );
}
