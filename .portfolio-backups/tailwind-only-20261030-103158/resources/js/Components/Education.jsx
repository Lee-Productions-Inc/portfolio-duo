import SectionHeading from './SectionHeading';
import {team} from '../data/team';
export default function Education(){
  return <section id="education" aria-labelledby="education-heading" className="mx-auto w-[calc(100%-38px)] max-w-290 scroll-mt-24 pb-16 pt-18.75 md:w-[calc(100%-76px)] md:pb-20 md:pt-22.5 lg:pb-24 lg:pt-28.5">
    <SectionHeading number="04" label="Education & Experience" title="A foundation for what comes next." id="education-heading" />
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {team.map(member=><article key={member.id} className="panel p-5 sm:p-7">
        <div className="mb-7 flex items-center gap-4 border-b border-[#2b3542] pb-5">
          <img src={member.photo} alt={`${member.name} education profile portrait placeholder`} className="h-18 w-18 border border-[#526d84] bg-[#152332] object-cover sm:h-22 sm:w-22" />
          <div><p className="eyebrow">EDUCATION / {member.id}</p><h3 className="mt-2 text-lg font-semibold text-[#e8eef5]">{member.name}</h3></div>
        </div>
        <div className="relative space-y-8 border-l border-[#304354] pl-6">
          {member.education.map((record,i)=><div key={i} className="relative"><span aria-hidden="true" className="absolute -left-[29px] top-1 h-2 w-2 border border-[#a9daf8] bg-[#a9daf8] shadow-[0_0_0_4px_#111923]" />
            <p className="eyebrow">SYSTEM RECORD / {String(i+1).padStart(2,'0')}</p>
            <p className="mt-2 text-xs text-[#8b9aab]">{record.dates}</p>
            <h4 className="mt-3 text-base font-medium text-[#e6eaf0]">{record.title}</h4>
            <p className="mt-2 text-[13px] text-[#9bcce8]">{record.school}</p>
            <p className="mt-3 text-sm leading-[1.75] text-[#98a5b4]">{record.detail}</p>
          </div>)}
        </div>
      </article>)}
    </div>
  </section>;
}
