import { useEffect, useState } from 'react';

/** Shared image display: gracefully handles projects without a preview or with a broken storage link. */
export default function ProjectCover({ project, className = '', imageClassName = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [project.image_url]);

  return (
    <div className={`relative overflow-hidden bg-[#101925] ${className}`}>
      {project.image_url && !failed ? (
        <img
          src={project.image_url}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <div className="flex h-full min-h-32 w-full flex-col items-center justify-center gap-2 px-4 text-center">
          <span aria-hidden="true" className="text-2xl text-[#648198]">▧</span>
          <span className="text-[11px] font-medium text-[#91aabe]">
            {failed ? 'Preview unavailable' : 'No preview image'}
          </span>
        </div>
      )}
    </div>
  );
}
