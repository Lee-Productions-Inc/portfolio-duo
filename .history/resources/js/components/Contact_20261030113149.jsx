import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { team } from '../data/team';
import { contactDetails } from '../data/contact';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasValidAddress = (value) => emailPattern.test((value || '').trim());

function SocialLink({ href, label, symbol }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex min-h-9 items-center gap-2 border border-[#304255] bg-[#15202a] px-3 py-2 text-[11px] font-semibold text-[#bcd4e5] transition-colors hover:border-[#a9daf8] hover:text-[#e5f5ff]"
    >
      <span aria-hidden="true" className="text-[#a9daf8]">{symbol}</span>{label} ↗
    </a>
  );
}

export default function Contact() {
  const [recipientId, setRecipientId] = useState(team[0]?.id || '01');
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const selectedMember = team.find((member) => member.id === recipientId) || team[0];
  const recipientEmail = (contactDetails[selectedMember?.id]?.email || '').trim();
  const canEmailRecipient = hasValidAddress(recipientEmail);

  function updateField(name, value) {
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus('');
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (fields.name.trim().length < 2) nextErrors.name = 'Please enter at least 2 characters.';
    if (!hasValidAddress(fields.email)) nextErrors.email = 'Please enter a valid email address.';
    if (fields.message.trim().length < 10) nextErrors.message = 'Please write at least 10 characters.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('Please correct the highlighted fields.');
      return;
    }
    if (!canEmailRecipient) {
      setStatus('This member’s email is not configured yet. Set it in resources/js/data/contact.js.');
      return;
    }

    const subject = `Portfolio inquiry from ${fields.name.trim()}`;
    const body = [
      `Hello ${selectedMember.name},`,
      '',
      fields.message.trim(),
      '',
      `From: ${fields.name.trim()}`,
      `Reply to: ${fields.email.trim()}`,
    ].join('\n');
    // Opens the visitor's own configured mail application. It does NOT send silently.
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app should open. Please review and click Send there; nothing was sent automatically.');
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto w-[calc(100%-38px)] max-w-290 scroll-mt-24 pb-28 pt-18.75 md:w-[calc(100%-76px)] md:pb-20 md:pt-22.5 lg:pb-24 lg:pt-28.5">
      <SectionHeading number="05" label="Contact" title="Let's open a channel." id="contact-heading" />
      <div className="mt-9 grid gap-12 lg:grid-cols-[.9fr_1.15fr] lg:gap-14">
        <div>
          <p className="mb-7 max-w-100 text-sm leading-[1.85] text-[#a0abba]">
            Have a question or an idea? Choose who you'd like to contact, then reach out directly.
          </p>
          <div className="grid gap-3">
            {team.map((member) => {
              const details = contactDetails[member.id] || {};
              const email = (details.email || '').trim();
              const ready = hasValidAddress(email);
              return (
                <article key={member.id} className="border border-[#293a48] bg-[#111923] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#bd986b]">TEAM / {member.id}</p>
                  <h3 className="mt-2 text-base font-semibold text-[#e6edf4]">{member.name}</h3>
                  <p className="mt-1 text-xs text-[#9faebe]">{member.role}</p>
                  <div className="mt-4">
                    {ready ? (
                      <a href={`mailto:${email}`} className="break-all text-sm font-medium text-[#a9daf8] underline-offset-4 hover:underline">✉ {email}</a>
                    ) : (
                      <p className="text-xs text-[#8898a9]">Email address will be added soon.</p>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <SocialLink href={details.github} label="GitHub" symbol="⌘" />
                    <SocialLink href={details.linkedin} label="LinkedIn" symbol="in" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <form onSubmit={submit} noValidate className="space-y-5">
          <div>
            <label htmlFor="contact-recipient" className="mb-[7px] block text-xs font-semibold text-[#bed0df]">Send to *</label>
            <select
              id="contact-recipient"
              value={recipientId}
              onChange={(event) => { setRecipientId(event.target.value); setStatus(''); }}
              className="block min-h-[45px] w-full border border-[#364c60] bg-[#0b141e] px-3 py-2.5 text-[#e9f1f8] outline-none focus:border-[#a9daf8] focus:ring-2 focus:ring-[#a9daf8]/10"
            >
              {team.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
            </select>
            {!canEmailRecipient && <p className="mt-2 text-xs text-[#e7b791]">This person's email isn't configured yet.</p>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ['name', 'Your name', 'text'],
              ['email', 'Your email', 'email'],
            ].map(([key, label, type]) => (
              <div key={key}>
                <label htmlFor={`contact-${key}`} className="mb-[7px] block text-xs font-semibold text-[#bed0df]">{label} *</label>
                <input
                  id={`contact-${key}`}
                  type={type}
                  value={fields[key]}
                  onChange={(event) => updateField(key, event.target.value)}
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
                  placeholder={label}
                  className="block min-h-[45px] w-full border border-[#364c60] bg-[#0b141e] px-3 py-2.5 text-[#e9f1f8] outline-none focus:border-[#a9daf8] focus:ring-2 focus:ring-[#a9daf8]/10 aria-[invalid=true]:border-[#d99b8c]"
                />
                {errors[key] && <p id={`contact-${key}-error`} className="mt-[5px] text-xs text-[#ffb8ae]" role="alert">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-[7px] block text-xs font-semibold text-[#bed0df]">Message *</label>
            <textarea
              id="contact-message"
              rows={6}
              value={fields.message}
              onChange={(event) => updateField('message', event.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              placeholder="Tell us what you'd like to discuss"
              className="block min-h-[45px] w-full resize-y border border-[#364c60] bg-[#0b141e] px-3 py-2.5 text-[#e9f1f8] outline-none focus:border-[#a9daf8] focus:ring-2 focus:ring-[#a9daf8]/10 aria-[invalid=true]:border-[#d99b8c]"
            />
            {errors.message && <p id="contact-message-error" className="mt-[5px] text-xs text-[#ffb8ae]" role="alert">{errors.message}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2.5 border border-[#a9daf8] bg-[#a9daf8] px-[17px] py-2.5 text-xs font-extrabold text-[#0b1824] transition-colors duration-200 hover:bg-[#d5edfb]">
              Open email app ↗
            </button>
            <span aria-live="polite" className="max-w-85 text-xs text-[#a9daf8]">{status}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[#75899a]">
            This form prepares an email in the visitor's email app. The visitor must click Send there.
            No message is sent directly from this website.
          </p>
        </form>
      </div>
    </section>
  );
}
