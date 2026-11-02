import { Link, Head, usePage } from '@inertiajs/react';
export default function ManagementLayout({ title, description, children }) {
  const {flash}=usePage().props;
  return <div className="min-h-screen bg-[#0b0e14] text-[#e5eaf1]">
    <Head title={title} />
    <header className="border-b border-[#283746] bg-[#0f1620]"><div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5">
      <Link href="/" className="text-sm font-semibold tracking-wide text-[#a9daf8]">✦ GODOY / PARTNER</Link>
      <nav className="flex items-center gap-5 text-xs text-[#c7d2e0]"><Link href="/">Public portfolio</Link><Link href="/projects" className="text-[#a9daf8]">Manage projects</Link></nav>
    </div></header>
    <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <div className="eyebrow">PORTFOLIO / PROJECT MANAGEMENT</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#f0f5fa] sm:text-4xl">{title}</h1>
      {description && <p className="mt-4 text-sm leading-7 text-[#9eafbf]">{description}</p>}
      {flash?.success && <div role="status" className="status-success mt-7">✓ {flash.success}</div>}
      {children}
    </main>
  </div>;
}
