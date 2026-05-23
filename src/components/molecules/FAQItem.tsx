'use client';

import { useId, useState } from 'react';
import { Icon } from '../atoms/Icon';

type FAQItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div
      data-open={open}
      className="group rounded-2xl bg-white ring-1 ring-[#08162D]/10 shadow-[0_4px_18px_-12px_rgba(8,22,45,0.12)] transition-colors duration-300 data-[open=true]:ring-[#D0A455]/50 hover:ring-[#D0A455]/40"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-semibold text-[#08162D] outline-none focus-visible:ring-2 focus-visible:ring-[#D0A455] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-7 sm:py-6 sm:text-[17px]"
      >
        <span className="flex-1">{question}</span>
        <span
          aria-hidden="true"
          data-open={open}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FAF0BC] text-[#08162D] transition-[transform,background-color] duration-300 ease-out data-[open=true]:rotate-45 data-[open=true]:bg-[#D0A455]"
        >
          <Icon name="close" size={16} className="rotate-45" />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-hidden={!open}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-in-out data-[open=true]:grid-rows-[1fr]"
        data-open={open}
      >
        <div className="overflow-hidden">
          <div
            data-open={open}
            className="px-6 pb-6 text-[15px] leading-relaxed text-brand-muted opacity-0 transition-opacity duration-300 ease-out data-[open=true]:opacity-100 sm:px-7 sm:pb-7"
          >
            <div className="border-t border-[#08162D]/8 pt-4">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
