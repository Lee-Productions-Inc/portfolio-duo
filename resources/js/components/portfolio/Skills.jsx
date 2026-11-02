import SectionHeading from './SectionHeading';
import { team } from '../../data/team';
export default function Skills() {
  return <section id="skills" aria-labelledby="skills-heading" className="mx-auto w-[calc(100%-38px)] max-w-290 scroll-mt-24 pb-16 pt-18.75 md:w-[calc(100%-76px)] md:pb-20 md:pt-22.5 lg:pb-24 lg:pt-28.5">
    <SectionHeading number="02" label="Skills" title="A toolkit for the frontier." id="skills-heading" />
    <div className="mt-9 grid gap-8 lg:grid-cols-2">
      {team.map(member => <article key={member.id} className="border border-[#2b3542] bg-[#101720] p-5 sm:p-6">
        <div className="mb-6 flex items-center gap-4 border-b border-[#2b3542] pb-5">
          <img src={member.photo} alt={`${member.name} skills profile portrait placeholder`} className="h-18 w-18 shrink-0 border border-[#526d84] bg-[#152332] object-cover sm:h-22 sm:w-22" />
          <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#bd986b]">SKILLS / {member.id}</p><h3 className="mt-2 break-words text-lg font-semibold text-[#e5ecf4]">{member.name}</h3><p className="mt-1 text-xs text-[#a9daf8]">{member.role}</p></div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {Object.entries(member.skills).map(([category, list]) => <div key={category} className="border-t border-[#2b3542] pt-4">
            <h4 className="text-xs font-semibold text-[#c5d0de]">{category}</h4>
            <div className="mt-3 flex flex-wrap gap-2">{list.map(skill => <span key={skill} className="border border-[#314657] bg-[#16232e] px-2.5 py-1.5 text-[11px] text-[#adcfe3]">{skill}</span>)}</div>
          </div>)}
        </div>
      </article>)}
    </div>
  </section>;
}
