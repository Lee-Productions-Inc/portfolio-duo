import {useState} from 'react';
import SectionHeading from './SectionHeading';
export default function Contact(){
  const [fields,setFields]=useState({name:'',email:'',message:''});
  const [errors,setErrors]=useState({});
  const [status,setStatus]=useState('');
  function validate(values){
    const e={};
    if(values.name.trim().length<2)e.name='Please enter at least 2 characters.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))e.email='Please enter a valid email address.';
    if(values.message.trim().length<10)e.message='Please write at least 10 characters.';
    return e;
  }
  function submit(e){
    e.preventDefault();const next=validate(fields);setErrors(next);
    if(Object.keys(next).length){setStatus('Please correct the highlighted fields.');return;}
    setStatus('✓ Demo validation successful. No message was sent.');
    setFields({name:'',email:'',message:''});
  }
  const socials=[
    {type:'Email',text:'godoyleebron3@gmail.com',url:'mailto:godoyleebron3@gmail.com',icon:'✉'},
    {type:'GitHub',text:'leeeeeedesu',url:'https://github.com/leeeeeedesu',icon:'⌘'},
    {type:'LinkedIn',text:'Lee Bron Godoy',url:'https://linkedin.com/in/lee-bron-godoy-76b3553b7',icon:'in'},
  ];
  return <section id="contact" aria-labelledby="contact-heading" className="mx-auto w-[calc(100%-38px)] max-w-290 scroll-mt-24 pb-28 pt-18.75 md:w-[calc(100%-76px)] md:pb-20 md:pt-22.5 lg:pb-24 lg:pt-28.5">
    <SectionHeading number="05" label="Contact" title="Let's open a channel." id="contact-heading" />
    <div className="mt-9 grid gap-12 lg:grid-cols-[.72fr_1.3fr] lg:gap-20">
      <div><p className="mb-8 max-w-82.5 text-sm leading-[1.85] text-[#a0abba]">Have an idea, a question, or an opportunity to collaborate? We'd be glad to hear from you.</p>
        <div className="max-w-102.5 border-t border-[#25323e]">{socials.map(x=><a key={x.type} href={x.url} target={x.url.startsWith('http')?'_blank':undefined} rel={x.url.startsWith('http')?'noopener noreferrer':undefined} className="flex min-h-16 items-center gap-3 border-b border-[#25323e] py-3 text-[#c9d3df] transition-transform hover:translate-x-1 hover:bg-[#81b2d1]/[.035]">
          <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center border border-[#304255] bg-[#15202a] text-sm font-semibold text-[#9ccce9]">{x.icon}</span>
          <span><strong className="block text-[10px] uppercase tracking-wider">{x.type}</strong><small className="mt-1 block text-xs text-[#9faebe]">{x.text}</small></span><span aria-hidden="true" className="ml-auto text-[#a9daf8]">↗</span>
        </a>)}</div>
      </div>
      <form onSubmit={submit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">{[['name','Name','text'],['email','Email','email']].map(([key,label,type])=><div key={key}><label htmlFor={`contact-${key}`} className="mb-[7px] block text-xs font-semibold text-[#bed0df]">{label} *</label><input className="block min-h-[45px] w-full rounded-none border border-[#364c60] bg-[#0b141e] px-3 py-2.5 text-[#e9f1f8] outline-none focus:border-[#a9daf8] focus:ring-2 focus:ring-[#a9daf8]/10 aria-[invalid=true]:border-[#d99b8c]" id={`contact-${key}`} type={type} value={fields[key]} placeholder={`[Your ${label.toLowerCase()}]`} onChange={e=>{setFields({...fields,[key]:e.target.value});setErrors({...errors,[key]:null});setStatus('');}} aria-invalid={!!errors[key]} />{errors[key]&&<p className="mt-[5px] text-xs text-[#ffb8ae]" role="alert">{errors[key]}</p>}</div>)}</div>
        <div><label htmlFor="contact-message" className="mb-[7px] block text-xs font-semibold text-[#bed0df]">Message *</label><textarea id="contact-message" rows="6" className="block min-h-[45px] w-full rounded-none border border-[#364c60] bg-[#0b141e] px-3 py-2.5 text-[#e9f1f8] outline-none focus:border-[#a9daf8] focus:ring-2 focus:ring-[#a9daf8]/10 aria-[invalid=true]:border-[#d99b8c] resize-y" placeholder="[Your message]" value={fields.message} onChange={e=>{setFields({...fields,message:e.target.value});setErrors({...errors,message:null});setStatus('');}} aria-invalid={!!errors.message} />{errors.message&&<p className="mt-[5px] text-xs text-[#ffb8ae]" role="alert">{errors.message}</p>}</div>
        <div className="flex flex-wrap items-center gap-4"><button className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2.5 border border-[#a9daf8] bg-[#a9daf8] px-[17px] py-2.5 text-xs font-extrabold text-[#0b1824] no-underline transition-colors duration-200 hover:bg-[#d5edfb] disabled:cursor-not-allowed disabled:opacity-60" type="submit">Check message ↗</button><span aria-live="polite" className="text-xs text-[#a9daf8]">{status}</span></div>
        <p className="text-[11px] text-[#75899a]">Demo-only form from the original portfolio. It validates input locally but does not send email.</p>
      </form>
    </div>
  </section>;
}
