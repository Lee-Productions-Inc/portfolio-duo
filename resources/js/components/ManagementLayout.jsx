import { Link, Head, usePage } from '@inertiajs/react';

export default function ManagementLayout({ title, description, children }) {
  const { flash } = usePage().props;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#e5eaf1]">
      <Head title={title} />
      <a href="#management-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[#a9daf8] focus:px-4 focus:py-2 focus:text-[#0b0e14]">Skip to content</a>
      <header className="border-b border-[#283746] bg-[#0f1620]">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-4 sm:py-5">
          <Link href="/" className="text-sm font-bold tracking-wide text-[#e6edf5] transition-colors hover:text-[#a9daf8]">
            <span aria-hidden="true" className="mr-2 text-[#a9daf8]">✦</span> Team Portfolio
          </Link>
          <nav aria-label="Project management" className="flex flex-wrap items-center gap-2 text-xs sm:gap-3">
            <Link href="/" className="rounded-md px-3 py-2.5 text-[#b2c2d0] transition-colors hover:bg-[#1a2b39] hover:text-white">View portfolio</Link>
            <Link href="/projects" aria-current="page" className="rounded-md bg-[#1a2b39] px-3 py-2.5 font-semibold text-[#a9daf8]">Projects</Link>
            <Link href="/team/logout" method="post" as="button" className="cursor-pointer rounded-md border border-[#445d70] px-3 py-2.5 font-medium text-[#cddbe7] transition-colors hover:border-[#a9daf8] hover:text-white">Sign out</Link>
          </nav>
        </div>
      </header>
      <main id="management-main" className="mx-auto w-full max-w-5xl px-5 pb-20 pt-10 sm:pt-14">
        <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#c7a479]">Team workspace / Projects</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#f0f5fa] sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-[#9eafbf]">{description}</p>}
        {flash?.success && (
          <div role="status" aria-live="polite" className="mt-6 rounded-md border border-[#3d6d5c] bg-[#142b25] px-4 py-3 text-sm text-[#b9efd6]">
            <span aria-hidden="true" className="mr-2">✓</span>{flash.success}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
