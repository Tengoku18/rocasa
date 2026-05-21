type ProcessStepProps = {
  step: number;
  title: string;
  description: string;
  last?: boolean;
};

export function ProcessStep({ step, title, description, last = false }: ProcessStepProps) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#08162D] font-[family-name:var(--font-open-sans)] text-sm font-bold text-[#D0A455] ring-4 ring-[#FAF0BC]">
          {String(step).padStart(2, '0')}
        </span>
        {!last ? (
          <span
            aria-hidden="true"
            className="mt-2 mb-2 h-full w-px flex-1 bg-gradient-to-b from-[#D0A455] to-transparent"
          />
        ) : null}
      </div>
      <div className={`flex-1 ${last ? 'pb-0' : 'pb-10'}`}>
        <h4 className="text-lg font-bold text-[#08162D]">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-[#475569]">{description}</p>
      </div>
    </div>
  );
}
