import { Icon } from '../atoms/Icon';

type FAQItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl bg-white ring-1 ring-[#08162D]/10 shadow-[0_4px_18px_-12px_rgba(8,22,45,0.12)] transition-colors duration-200 open:ring-[#D0A455]/50 hover:ring-[#D0A455]/40"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-semibold text-[#08162D] outline-none focus-visible:ring-2 focus-visible:ring-[#D0A455] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-7 sm:py-6 sm:text-[17px] [&::-webkit-details-marker]:hidden">
        <span className="flex-1">{question}</span>
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FAF0BC] text-[#08162D] transition-transform duration-300 ease-out group-open:rotate-45 group-open:bg-[#D0A455]"
        >
          <Icon name="close" size={16} className="rotate-45" />
        </span>
      </summary>
      <div className="px-6 pb-6 text-[15px] leading-relaxed text-[#475569] sm:px-7 sm:pb-7">
        <div className="border-t border-[#08162D]/8 pt-4">{answer}</div>
      </div>
    </details>
  );
}
