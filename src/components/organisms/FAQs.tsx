import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { FAQItem } from '../molecules/FAQItem';

const FAQS = [
  {
    question: 'How much does conveyancing cost in NSW?',
    answer:
      'Rocasa charges a clear, fixed fee — quoted in writing before any work begins. Government disbursements (title searches, council certificates, transfer duty) are passed through at cost with no markup, so you always know exactly where your money is going.',
  },
  {
    question: 'How long does a typical property settlement take?',
    answer:
      'Most NSW settlements complete in 6 weeks from contract exchange, but this is set by the contract itself. Off-the-plan and complex matters can take longer. We map the full timeline up front so you can plan deposits, finance and moving day with confidence.',
  },
  {
    question: 'What is PEXA and why does it matter?',
    answer:
      'PEXA is the secure electronic platform used for almost all NSW property settlements. It replaces paper cheques and in-person meetings — settlement happens online with funds and title transferred simultaneously. It is faster, safer and reduces the risk of settlement-day delays.',
  },
  {
    question: 'Should I get my Contract of Sale reviewed before I sign?',
    answer:
      'Yes — always. Once you sign, you are bound by every clause inside. A pre-signature review identifies risky special conditions, hidden costs, easements and zoning issues so you can negotiate changes before committing.',
  },
  {
    question: "What is the difference between a conveyancer and a solicitor?",
    answer:
      'A licensed conveyancer is a specialist in property transfers — fully regulated under the NSW Conveyancers Licensing Act and required to hold professional indemnity insurance. For most residential and commercial property matters, a conveyancer offers the same protection as a solicitor, typically at a lower fixed fee.',
  },
  {
    question: 'Do you handle off-the-plan and vacant land purchases?',
    answer:
      'Yes — these contracts are longer and riskier than standard sales. We review sunset clauses, strata documents, deposit-bond options and final inspection rights. For vacant land, we also check zoning, easements and any council restrictions on what you can build.',
  },
  {
    question: 'Can you witness statutory declarations and affidavits?',
    answer:
      'Yes. Khem is a Justice of the Peace (NSW) and can witness statutory declarations, affidavits and certify true copies of documents — by appointment at the Pitt St office, or on-site for clients who need it.',
  },
  {
    question: 'Do you handle properties outside Sydney?',
    answer:
      'Yes. We act on conveyancing matters across all of New South Wales. The vast majority of work — searches, contracts, PEXA settlement — is done digitally, so location rarely affects the service or the price.',
  },
];

export function FAQs() {
  return (
    <section id="faqs" className="bg-[#FAF0BC]/40 py-20 sm:py-28">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQs"
              title={
                <>
                  Questions buyers &amp; sellers{' '}
                  <span className="text-[#D0A455]">ask us most.</span>
                </>
              }
              description="Straight answers about cost, timing and what you can expect when you engage Rocasa. Still curious? Send us your question — we reply within one business day."
            />

            <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-[#08162D]/10">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#FAF0BC] text-[#08162D]">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#475569]">
                    Question not answered?
                  </div>
                  <div className="text-sm font-bold text-[#08162D]">
                    Ask us anything
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Button
                  href="#contact"
                  variant="secondary"
                  size="md"
                  fullWidth
                  iconRight={<Icon name="arrow-right" size={16} />}
                >
                  Send your question
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-3 sm:gap-4">
              {FAQS.map((faq, i) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
