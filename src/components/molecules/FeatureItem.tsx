import { Icon, type IconName } from '../atoms/Icon';

type FeatureItemProps = {
  icon: IconName;
  title: string;
  description: string;
  invert?: boolean;
};

export function FeatureItem({ icon, title, description, invert = false }: FeatureItemProps) {
  const titleColor = invert ? 'text-white' : 'text-[#08162D]';
  const descColor = invert ? 'text-white/70' : 'text-[#475569]';
  const iconBg = invert
    ? 'bg-[#D0A455]/15 text-[#D0A455] ring-1 ring-[#D0A455]/30'
    : 'bg-[#FAF0BC] text-[#08162D] ring-1 ring-[#D0A455]/40';

  return (
    <div className="flex items-start gap-4">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${iconBg}`}>
        <Icon name={icon} size={22} />
      </span>
      <div>
        <h4 className={`text-base font-bold ${titleColor}`}>{title}</h4>
        <p className={`mt-1.5 text-sm leading-relaxed ${descColor}`}>{description}</p>
      </div>
    </div>
  );
}
