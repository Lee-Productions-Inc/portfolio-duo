import { useForm, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const fields = [
  {name:'title', label:'Project title', required:true, placeholder:'Example: Team Portfolio'},
  {name:'tech_stack', label:'Tech stack (comma-separated)', required:true, placeholder:'React, Laravel, SQLite'},
  {name:'project_url', label:'Project URL', placeholder:'https://example.com', type:'url'},
  {name:'repository_url', label:'Repository URL', placeholder:'https://github.com/...', type:'url'},
];
function Field({label,name,errors,children}) {
  return <div><label htmlFor={name} className="field-label">{label}</label>{children}{errors[name] && <p id={`${name}-error`} className="field-error" role="alert">{errors[name]}</p>}</div>;
}
export default function ProjectForm({ project=null }) {
  const editing=!!project;
  const {data,setData,post,processing,errors,progress,transform,reset}=useForm({
    title:project?.title ?? '', description:project?.description ?? '',
    tech_stack:project?.tech_stack ?? '', project_url:project?.project_url ?? '',
    repository_url:project?.repository_url ?? '', completed_at:project?.completed_at ?? '',
    status:project?.status ?? '', image:null,
  });
  const [preview,setPreview]=useState(null);
  useEffect(()=>{
    if(!data.image){setPreview(null);return;}
    const url=URL.createObjectURL(data.image);setPreview(url);
    return ()=>URL.revokeObjectURL(url);
  },[data.image]);
  const submit=e=>{
    e.preventDefault();
    // POST with method spoofing is required for multipart image replacement on update.
    transform(values=>editing?{...values,_method:'put'}:values);
    post(editing?`/projects/${project.id}`:'/projects',{forceFormData:true,preserveScroll:true,
      onSuccess:()=>reset('image')});
  };
  return <form onSubmit={submit} noValidate className="panel mt-8 space-y-6 p-5 sm:p-8">
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map(f=><Field key={f.name} label={<>{f.label}{f.required?' *':''}</>} name={f.name} errors={errors}>
        <input id={f.name} type={f.type||'text'} maxLength={f.name==='title'?130:2048} className="field-input" placeholder={f.placeholder} value={data[f.name]} onChange={e=>setData(f.name,e.target.value)} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name]?`${f.name}-error`:undefined} />
      </Field>)}
    </div>
    <Field label="Description *" name="description" errors={errors}>
      <textarea id="description" rows={5} className="field-input resize-y" placeholder="Explain the features and purpose of your project (minimum 30 characters)." value={data.description} onChange={e=>setData('description',e.target.value)} aria-invalid={!!errors.description} aria-describedby={errors.description?'description-error':undefined} />
    </Field>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Status *" name="status" errors={errors}>
        <select id="status" className="field-input" value={data.status} onChange={e=>setData('status',e.target.value)} aria-invalid={!!errors.status}>
          <option value="" disabled>Select status</option><option value="planned">Planned</option><option value="in_progress">In progress</option><option value="completed">Completed</option>
        </select>
      </Field>
      <Field label="Date completed (optional)" name="completed_at" errors={errors}>
        <input id="completed_at" type="date" className="field-input" max={new Date().toLocaleDateString('sv-SE')} value={data.completed_at} onChange={e=>setData('completed_at',e.target.value)} aria-invalid={!!errors.completed_at} />
      </Field>
    </div>
    <Field label="Project preview image (JPG, PNG, or WebP; max 2 MB)" name="image" errors={errors}>
      <input id="image" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="field-input file:mr-3 file:border-0 file:bg-[#a9daf8] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#0b1824]" onChange={e=>setData('image',e.target.files?.[0]||null)} aria-invalid={!!errors.image} />
      {(preview || project?.image_url) && <img className="mt-3 h-36 max-w-xs border border-[#354653] object-contain" src={preview||project.image_url} alt="Current project preview" />}
      {editing && <p className="mt-2 text-xs text-[#91a1b2]">Leave empty to keep the current preview image.</p>}
      {progress && <p className="mt-2 text-xs text-[#a9daf8]">Uploading: {progress.percentage}%</p>}
    </Field>
    <div className="flex flex-wrap items-center gap-3 border-t border-[#2d3a46] pt-5">
      <button type="submit" disabled={processing} className="btn-main">{processing?'Saving...':editing?'Save changes':'Create project'} ↗</button>
      <Link href="/projects" className="btn-outline">Cancel</Link>
    </div>
  </form>;
}
