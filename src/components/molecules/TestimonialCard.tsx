import { Icon } from '../atoms/Icon';

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  rating?: number;
};

export function TestimonialCard({ quote, author, role, rating = 5 }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-[#08162D]/8 shadow-[0_6px_24px_-12px_rgba(8,22,45,0.12)]">
      <div className="flex items-center gap-1 text-[#D0A455]" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Icon key={i} name="star" size={16} className="fill-current" />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-[#08162D]/85">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-[#08162D]/8 pt-5">
        <div className="text-sm font-bold text-[#08162D]">{author}</div>
        <div className="mt-0.5 text-xs text-[#475569]">{role}</div>
      </figcaption>
    </figure>
  );
}
