import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({ email: '', password: '' });
  const submit = (event) => {
    event.preventDefault();
    post('/team/login', { onFinish: () => reset('password') });
  };

  return <div className="flex min-h-screen items-center justify-center bg-[#0b0e14] px-5 py-12 text-[#e5eaf1]">
    <Head title="Team sign in" />
    <main className="w-full max-w-md border border-[#324457] bg-[#101924] p-7 shadow-2xl sm:p-9">
      <Link href="/" className="text-xs font-semibold tracking-[.17em] text-[#a9daf8] hover:underline">✦ GODOY / PARTNER</Link>
      <p className="mt-9 text-[10px] font-bold uppercase tracking-[.17em] text-[#bd986b]">PRIVATE PROJECT MANAGEMENT</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Team sign in</h1>
      <p className="mt-3 text-sm leading-7 text-[#aabac9]">Only authorized team members can add, edit, or remove projects.</p>
      <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-[#dce6ef]">Email</label>
          <input id="email" type="email" name="email" autoComplete="username" value={data.email}
            onChange={e => setData('email', e.target.value)} required
            aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full border border-[#465b6e] bg-[#0b111a] px-4 py-3 text-sm text-white outline-none focus:border-[#a9daf8]" />
          {errors.email && <p id="email-error" role="alert" className="mt-2 text-xs text-[#ffb8ae]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-xs font-medium text-[#dce6ef]">Password</label>
          <input id="password" type="password" name="password" autoComplete="current-password" value={data.password}
            onChange={e => setData('password', e.target.value)} required
            aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined}
            className="w-full border border-[#465b6e] bg-[#0b111a] px-4 py-3 text-sm text-white outline-none focus:border-[#a9daf8]" />
          {errors.password && <p id="password-error" role="alert" className="mt-2 text-xs text-[#ffb8ae]">{errors.password}</p>}
        </div>
        <button type="submit" disabled={processing}
          className="w-full cursor-pointer border border-[#a9daf8] bg-[#a9daf8] px-4 py-3 text-sm font-bold text-[#101b27] transition-colors hover:bg-[#d5edfb] disabled:cursor-wait disabled:opacity-60">
          {processing ? 'Signing in…' : 'Sign in to manage projects'}
        </button>
      </form>
      <Link href="/" className="mt-7 inline-block text-xs text-[#a9daf8] hover:underline">← Back to public portfolio</Link>
    </main>
  </div>;
}
