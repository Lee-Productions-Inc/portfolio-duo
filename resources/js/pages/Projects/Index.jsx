import { useEffect, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ManagementLayout from '../../components/portfolio/management/ManagementLayout';
import ProjectCover from '../../components/portfolio/ProjectCover';

const statusLabels = { planned: 'Planned', in_progress: 'In progress', completed: 'Completed' };

export default function Index({ projects = [] }) {
  const [pending, setPending] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const dialog = useRef(null);

  useEffect(() => {
    if (pending) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [pending]);

  const remove = () => {
    if (!pending || deleting) return;
    setDeleting(true);
    router.delete(`/projects/${pending.id}`, {
      preserveScroll: true,
      onSuccess: () => setPending(null),
      onFinish: () => setDeleting(false),
    });
  };

  return (
    <ManagementLayout title="Manage projects" description="Add and update work here. Every saved project appears on the public portfolio.">
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-b border-[#293846] pb-5">
        <div>
          <p className="text-sm font-semibold text-[#e6edf5]">Your projects</p>
          <p className="mt-1 text-xs text-[#91a5b8]">{projects.length} project{projects.length === 1 ? '' : 's'} total</p>
        </div>
        <Link href="/projects/create" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#a9daf8] bg-[#a9daf8] px-5 text-xs font-bold text-[#0b1824] transition-colors hover:bg-[#d5edfb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a9daf8]">
          + Add project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-[#425567] bg-[#111923] px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-[#e8eef5]">No projects yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#a2b2c1]">Create your first project and it will automatically be displayed in the public Projects section.</p>
          <Link href="/projects/create" className="mt-5 inline-flex rounded-md border border-[#526d82] px-4 py-2.5 text-sm font-medium text-[#a9daf8] hover:border-[#a9daf8]">Create a project</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {projects.map(project => (
            <article key={project.id} className="grid gap-5 rounded-lg border border-[#2b3a49] bg-[#111923] p-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:p-5">
              <ProjectCover project={project} className="aspect-video w-full rounded-md border border-[#34495b] sm:aspect-auto sm:min-h-40" />
              <div className="flex min-w-0 flex-col justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full border border-[#3a586c] bg-[#1b2c3b] px-3 py-1 text-[#b7d9ed]">{statusLabels[project.status] || project.status}</span>
                    {project.completed_at && <span className="text-[#91a5b8]">Completed {project.completed_at}</span>}
                  </div>
                  <h2 className="mt-3 break-words text-lg font-semibold text-[#f0f4f8]">{project.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#a9b8c8]">{project.description}</p>
                  <p className="mt-3 break-words text-xs text-[#a9daf8]">{project.tech_stack}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/projects/${project.id}/edit`} className="inline-flex min-h-10 items-center rounded-md border border-[#496378] px-4 text-xs font-semibold text-[#d0e4f2] transition-colors hover:border-[#a9daf8] hover:bg-[#182734]">Edit project</Link>
                  <button type="button" onClick={() => setPending(project)} className="min-h-10 cursor-pointer rounded-md border border-[#785454] px-4 text-xs font-semibold text-[#ffb8ae] transition-colors hover:border-[#e3a19d] hover:bg-[#3b2228]">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {pending && (
        <dialog
          ref={dialog}
          onClose={() => !deleting && setPending(null)}
          onCancel={event => { if (deleting) event.preventDefault(); }}
          className="m-auto w-[calc(100%-32px)] max-w-md rounded-lg border border-[#526d82] bg-[#121b26] p-6 text-[#e8eff7] shadow-2xl backdrop:bg-[#03080c]/85 backdrop:backdrop-blur-sm"
          aria-labelledby="delete-title" aria-describedby="delete-description"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[.15em] text-[#d6a987]">Confirm deletion</p>
          <h2 id="delete-title" className="mt-2 text-xl font-semibold">Delete this project?</h2>
          <p id="delete-description" className="mt-3 text-sm leading-6 text-[#aec0ce]">
            <strong className="text-[#e4edf5]">{pending.title}</strong> will be permanently removed from your portfolio.
          </p>
          <div className="mt-7 flex flex-wrap justify-end gap-3">
            <button type="button" autoFocus disabled={deleting} onClick={() => setPending(null)} className="cursor-pointer rounded-md border border-[#496378] px-4 py-2.5 text-xs font-semibold text-[#d0e4f2] disabled:opacity-50">Cancel</button>
            <button type="button" disabled={deleting} onClick={remove} className="cursor-pointer rounded-md border border-[#ac7171] bg-[#4a2b31] px-4 py-2.5 text-xs font-semibold text-[#ffe0d9] disabled:opacity-50">
              {deleting ? 'Deleting…' : 'Delete project'}
            </button>
          </div>
        </dialog>
      )}
    </ManagementLayout>
  );
}
