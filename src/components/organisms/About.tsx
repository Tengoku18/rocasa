import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { FeatureItem } from '../molecules/FeatureItem';

export function About() {
  return (
    <section id="about" className="relative bg-[#FAF0BC]/30 py-20 sm:py-28">
      <Container size="xl">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[32px] bg-[#D0A455]/20 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[28px] bg-[#08162D] p-10 text-white shadow-[0_24px_48px_-20px_rgba(8,22,45,0.4)] sm:p-12">
              <div className="absolute -right-8 -top-8 grid h-40 w-40 place-items-center rounded-full bg-[#D0A455]/15">
                <Icon name="scale" size={64} className="text-[#D0A455]" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D0A455]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D0A455]" />
                  Our mission
                </div>
                <p className="mt-6 font-[family-name:var(--font-open-sans)] text-2xl font-bold leading-snug sm:text-3xl">
                  &ldquo;To deliver unmatched property transfer services with a
                  focus on reliability and professionalism.&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#D0A455] text-[#08162D] font-bold">
                    K
                  </span>
                  <div>
                    <div className="font-semibold">Khem</div>
                    <div className="text-xs text-white">
                      Licensed Conveyancer · JP (NSW) · Engineering Consultant
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About Rocasa"
              title={
                <>
                  Two disciplines.{' '}
                  <span className="text-[#D0A455]">One trusted advisor.</span>
                </>
              }
              description="Most buyers juggle a conveyancer, a building inspector, and a JP — each speaking a different language. At Rocasa, you get all three in one office, working from the same file."
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <FeatureItem
                icon="shield-check"
                title="Licensed & insured"
                description="Fully licensed under the NSW Conveyancing Licensing scheme with professional indemnity cover."
              />
              <FeatureItem
                icon="building"
                title="Engineer's perspective"
                description="Structural background means we spot building issues your contract review would otherwise miss."
              />
              <FeatureItem
                icon="gavel"
                title="JP on staff"
                description="Witness statutory declarations, affidavits and certified copies without a separate appointment."
              />
              <FeatureItem
                icon="sparkle"
                title="Fixed-fee clarity"
                description="No surprises. You get a clear, written quote before any work begins."
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="#contact" variant="secondary" size="md" iconRight={<Icon name="arrow-right" size={16} />}>
                Book a consultation
              </Button>
              <Button href="#services" variant="ghost" size="md">
                View all services
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
