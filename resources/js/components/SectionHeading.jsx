export default function SectionHeading({ number, label, title, id, description }) {
  return <>
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#bd986b]">
      <span>{number} / {label}</span><span aria-hidden="true" className="h-px grow bg-[#263440]" />
      <span className="text-[#a9daf8]">✦</span>
    </div>
    <h2 id={id} className="mt-4 text-[clamp(2rem,3.1vw,2.8rem)] font-medium leading-[1.18] tracking-[-.045em] text-[#e9edf3]">{title}</h2>
    {description && <p className="mt-5 max-w-185 text-sm leading-[1.9] text-[#99a5b4]">{description}</p>}
  </>;
}
