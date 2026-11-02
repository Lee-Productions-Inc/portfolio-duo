import SectionHeading from './SectionHeading';
import {team} from '../data/team';
export default function About() {
  return <section id="about" aria-labelledby="about-heading" className="mx-auto w-[calc(100%-38px)] max-w-290 scroll-mt-24 pb-16 pt-18.75 md:w-[calc(100%-76px)] md:pb-20 md:pt-22.5 lg:pb-24 lg:pt-28.5">
    <SectionHeading number="01" label="About" id="about-heading" title="The people behind the code." />
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {team.map(member=><article key={member.id} className="border border-[#293a48] bg-[#111923] p-6 sm:p-8">
        <div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#bd986b]">✦ ID_{member.id} / DEVELOPER PROFILE</div>
        <h3 className="mt-5 text-xl font-medium text-[#e6edf4]">{member.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#a9daf8]">{member.role}</p>
        <div className="mt-5 h-px bg-[#2d3b4b]" />
        <p className="mt-5 text-sm leading-[1.9] text-[#a7b3c2]">{member.summary}</p>
        <div className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#b18c61]">PROFILE / {member.id} — IN PROGRESS</div>
      </article>)}
    </div>
  </section>;
}
