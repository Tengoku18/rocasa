import { Container } from '../atoms/Container';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { business } from '../../lib/theme';

export function CTA() {
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <Container size="xl">
        <div className="relative overflow-hidden rounded-[28px] bg-[#08162D] px-8 py-14 text-white shadow-[0_24px_48px_-20px_rgba(8,22,45,0.5)] sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D0A455]/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-[#FAF0BC]/15 blur-3xl"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#D0A455]">
                Ready to start?
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-open-sans)] text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[40px]">
                Sign with confidence.{' '}
                <span className="text-[#D0A455]">Settle without stress.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
                Send your Contract of Sale today — we&rsquo;ll come back with a
                fixed-fee quote and a clear timeline within one business day.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end lg:flex-col lg:items-stretch">
              <Button href="#contact" variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={18} />}>
                Send a contract for review
              </Button>
              <Button
                href={business.phoneHref}
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white hover:!text-[#08162D]"
                iconLeft={<Icon name="phone" size={18} />}
              >
                {business.phone}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
