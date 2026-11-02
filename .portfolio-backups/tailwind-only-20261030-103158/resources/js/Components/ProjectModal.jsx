import { useEffect, useRef, useState } from 'react';
const modalClass='m-auto max-h-[88vh] w-[calc(100%-36px)] max-w-155 overflow-auto border border-[#526d82] bg-[#101720] text-[#e9f0f7] shadow-[0_26px_100px_rgba(0,0,0,.7)]';
export default function ProjectModal({ project, onClose }) {
  const dialogRef=useRef(null);
  const imageRef=useRef(null);
  const [fullImage,setFullImage]=useState(false);
  useEffect(()=>{
    if (project && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
    return ()=>{if(dialogRef.current?.open) dialogRef.current.close();};
  },[project]);
  useEffect(()=>{
    if(fullImage) imageRef.current?.showModal();
    else if(imageRef.current?.open) imageRef.current.close();
  },[fullImage]);
  if(!project) return null;
  const close=()=>{setFullImage(false);onClose();};
  const tools=(project.tech_stack||'').split(',').map(x=>x.trim()).filter(Boolean);
  return <>
    <dialog ref={dialogRef} aria-labelledby="case-file-heading" onClose={close} onClick={e=>{if(e.target===dialogRef.current)close();}} className={modalClass}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2a3a49] bg-[#151e28] px-5 py-3">
        <span className="eyebrow">PROJECT / CASE FILE</span>
        <button type="button" aria-label="Close case file" className="text-[#a9daf8]" onClick={close}>✕</button>
      </div>
      <div className="p-5 sm:p-7">
        {project.image_url && <button type="button" onClick={()=>setFullImage(true)} title="Open full preview" className="block w-full overflow-hidden border border-[#526d82]"><img src={project.image_url} className="max-h-78 w-full object-cover" alt={`${project.title} preview`} /></button>}
        <h2 id="case-file-heading" className="mt-5 text-2xl font-medium text-[#e9f0f7]">{project.title}</h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#a9b6c4]">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{tools.map(t=><span key={t} className="border border-[#34495b] bg-[#162736] px-2 py-1 text-[10px] text-[#b7def4]">{t}</span>)}</div>
        <p className="mt-5 text-[11px] uppercase tracking-wider text-[#c9a77e]">{project.status.replace('_',' ')}{project.completed_at?` / ${project.completed_at}`:''}</p>
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#a9daf8]">
          {project.project_url && <a target="_blank" rel="noopener noreferrer" href={project.project_url}>Live project ↗</a>}
          {project.repository_url && <a target="_blank" rel="noopener noreferrer" href={project.repository_url}>Repository ↗</a>}
          {project.image_url && <button type="button" onClick={()=>setFullImage(true)}>Full image ↗</button>}
        </div>
      </div>
    </dialog>
    <dialog ref={imageRef} onClose={()=>setFullImage(false)} onClick={e=>{if(e.target===imageRef.current)setFullImage(false);}} aria-label="Full project image preview" className="m-auto max-h-[95vh] w-[95vw] max-w-6xl overflow-auto border border-[#526d82] bg-[#101720] p-4 text-[#e9f0f7]">
      <div className="mb-3 flex items-center justify-between gap-4"><h2 className="text-sm text-[#a9daf8]">{project.title}</h2><button onClick={()=>setFullImage(false)} type="button" aria-label="Close full image">✕</button></div>
      {project.image_url && <img className="mx-auto max-h-[80vh] w-auto max-w-full object-contain" src={project.image_url} alt={`Full preview of ${project.title}`} />}
    </dialog>
  </>;
}
