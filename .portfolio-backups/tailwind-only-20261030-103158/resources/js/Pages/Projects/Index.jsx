import {useState} from 'react';
import {Link, router} from '@inertiajs/react';
import ManagementLayout from '../../Components/ManagementLayout';
export default function Index({projects}) {
  const [pending,setPending]=useState(null);
  const [busy,setBusy]=useState(false);
  const remove=()=>{
    if(!pending)return;
    setBusy(true);
    router.delete(`/projects/${pending.id}`,{preserveScroll:true,onFinish:()=>{setBusy(false);setPending(null);}});
  };
  return <ManagementLayout title="Projects" description="Manage the project case files stored in SQLite. Changes are reflected on the public portfolio.">
    <div className="mt-9 flex flex-wrap items-center justify-between gap-4"><p className="text-xs text-[#8da0b2]">{projects.length} record{projects.length!==1?'s':''} in database</p><Link href="/projects/create" className="btn-main">+ Add project</Link></div>
    <div className="mt-5 space-y-4">
      {projects.length===0 && <div className="panel p-8 text-sm text-[#a5b8c9]">No projects yet. Add your first project to show it publicly.</div>}
      {projects.map(project=><article key={project.id} className="panel grid gap-5 p-4 sm:grid-cols-[145px_1fr] sm:p-5">
        <div className="border border-[#314454] bg-[#101721]">{project.image_url?<img src={project.image_url} alt="Project preview" className="h-36 w-full object-cover sm:h-full" />:<div className="grid h-36 place-items-center text-xs text-[#6c8496]">NO IMAGE</div>}</div>
        <div className="min-w-0"><div className="eyebrow">{project.status.replace('_',' ')}{project.completed_at && ` / ${project.completed_at}`}</div>
          <h2 className="mt-2 break-words text-lg font-semibold text-[#e9f0f7]">{project.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#9daebd]">{project.description}</p>
          <p className="mt-2 text-xs text-[#a9daf8]">{project.tech_stack}</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href={`/projects/${project.id}/edit`} className="btn-outline">Edit ↗</Link><button type="button" className="btn-danger" onClick={()=>setPending(project)}>Delete</button></div>
        </div>
      </article>)}
    </div>
    {pending && <div role="presentation" className="fixed inset-0 z-80 grid place-items-center bg-[#03080c]/90 px-5" onMouseDown={e=>{if(e.target===e.currentTarget && !busy)setPending(null);}}>
      <section role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-description" className="w-full max-w-md border border-[#526d82] bg-[#121a24] p-6 shadow-2xl">
        <div className="eyebrow">DELETE CONFIRMATION</div><h2 id="confirm-title" className="mt-3 text-xl font-semibold">Delete this project?</h2>
        <p id="confirm-description" className="mt-3 text-sm leading-6 text-[#a5b5c3]">“{pending.title}” will be permanently removed from the public portfolio.</p>
        <div className="mt-6 flex flex-wrap gap-3"><button className="btn-danger" disabled={busy} onClick={remove} autoFocus>{busy?'Deleting...':'Yes, delete'}</button><button className="btn-outline" disabled={busy} onClick={()=>setPending(null)}>Cancel</button></div>
      </section>
    </div>}
  </ManagementLayout>;
}
