import { useState } from 'react';
import { Link } from '@inertiajs/react';
import SectionHeading from './SectionHeading';
import ProjectModal from './ProjectModal';
export default function Projects({ projects }) {
  const [selected, setSelected] = useState(null);
  return <section id="projects" aria-labelledby="projects-heading" className="mx-auto w-[calc(100%-38px)] max-w-290 scroll-mt-24 pb-16 pt-18.75 md:w-[calc(100%-76px)] md:pb-20 md:pt-22.5 lg:pb-24 lg:pt-28.5">
    <SectionHeading number="03" label="Projects" title="Projects and case files." id="projects-heading" description="Our selected builds and concepts, managed through the database. Explore each case file to see the tools, goals, and progress." />
    <div className="mt-6"><Link href="/projects" className="inline-flex items-center gap-2 border-b border-[#536c82] py-2 text-xs font-semibold text-[#a9daf8] hover:border-[#a9daf8]">Manage projects ↗</Link></div>
    <div className="mt-7 border-t border-[#2b3542]">
      {projects.length === 0 && <p className="py-10 text-sm text-[#9baebd]">No projects available yet. Add a case file through Manage Projects.</p>}
      {projects.map((project, index) => <article key={project.id} className="grid grid-cols-[42px_minmax(0,1fr)] gap-3.5 border-b border-[#29343f] py-6.5 transition-colors duration-200 hover:bg-[#121923]/30 md:grid-cols-[46px_240px_minmax(0,1fr)] md:gap-4.25 lg:grid-cols-[60px_315px_minmax(0,1fr)] lg:gap-6.25 lg:py-7.5">
        <div className="col-start-1 row-start-1 pt-0.5 text-[25px] leading-none text-[#bd9463] md:col-auto md:row-auto md:text-[28px]">{String(index + 1).padStart(2, '0')}</div>
        <button type="button" onClick={() => setSelected(project)} aria-label={`View details of ${project.title}`} className="group col-start-2 row-start-1 flex min-h-41.25 max-w-100 flex-col justify-between overflow-hidden border border-[#314251] bg-[#151c25] text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#7098b0] hover:shadow-[0_14px_34px_rgba(0,0,0,.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a9daf8] md:col-auto md:row-auto md:max-w-none lg:min-h-44.5">
          <span className="px-3 py-2.5 text-[9px] font-bold tracking-wider text-[#98a9b8]">PROJECT / MEDIA SLOT</span>
          {project.image_url ? <img src={project.image_url} alt={`${project.title} preview`} className="block h-28 w-full object-cover transition-[transform,filter] duration-500 group-hover:scale-[1.065] group-hover:brightness-110 min-[421px]:h-30 lg:h-31.25" /> : <div className="grid h-30 place-items-center text-xs text-[#70899b]">NO IMAGE PROVIDED</div>}
          <span className="flex justify-between px-3 py-2.5 text-[9px] font-bold tracking-wider text-[#a9daf8]">VIEW CASE FILE <span aria-hidden="true">↗</span></span>
        </button>
        <div className="col-start-2 row-start-2 pt-1 md:col-auto md:row-auto md:pt-0.5">
          <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {project.status.replace('_', ' ')} project</span>
          <h3 className="mt-2 text-[clamp(1.45rem,2.2vw,1.8rem)] font-medium tracking-tight text-[#e5edf4]">{project.title}</h3>
          <p className="mt-3 line-clamp-3 max-w-150 text-sm leading-[1.85] text-[#9daab8]">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{project.tech_stack.split(',').map(t => t.trim()).filter(Boolean).map(t => <span key={t} className="inline-flex border border-[#2d4355] bg-[#14202a] px-2.5 py-1.25 text-[10px] text-[#a9d0e8]">{t}</span>)}</div>
          <div className="mt-6 flex flex-wrap gap-6 text-xs"><button type="button" onClick={() => setSelected(project)} className="text-[#a8d8f3] hover:underline">View case file ↗</button>
            {project.project_url && <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-[#a8d8f3] hover:underline">Live project ↗</a>}
            {project.repository_url && <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className="text-[#a8d8f3] hover:underline">Source code ↗</a>}
          </div>
        </div>
      </article>)}
    </div>
    <ProjectModal project={selected} onClose={() => setSelected(null)} />
  </section>;
}
