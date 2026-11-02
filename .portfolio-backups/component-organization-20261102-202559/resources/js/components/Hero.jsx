import { team } from '../data/team';
import ProfileCard from './ProfileCard';
export default function Hero() {
  return <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-[#303039] bg-[#0b0e14] bg-[radial-gradient(circle_at_60%_48%,rgba(31,59,77,.055),transparent_43%)]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(#5d7180_0.7px,transparent_0.8px)] bg-size-130px_130px opacity-20 mask-[linear-gradient(to_bottom,transparent_4%,black_20%,black_68%,transparent_100%)]" />
    <div className="relative mx-auto grid min-h-162.5 w-[calc(100%-38px)] max-w-290 items-center gap-12 pb-20 pt-40 md:w-[calc(100%-76px)] lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:pb-28 lg:pt-36">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#bd986b] mb-8"><span className="mr-2 inline-block h-1 w-1 bg-[#b58d5f]" />Our Portfolio / Web development</p>
        <h1 id="hero-title" className="max-w-195 text-[clamp(2.8rem,5.5vw,5.1rem)] font-semibold leading-[1.06] tracking-[-.055em] text-[#edf2f8]">Two minds.
          <br /><span className="text-[#a9daf8]">One digital frontier.</span></h1>
        <div className="mt-4 flex items-center gap-2 text-lg font-medium text-[#b9d9ed]">
          <span>{team[0].name} &amp; {team[1].name}</span><span aria-hidden="true" className="inline-block h-5 w-0.5 animate-pulse bg-[#a9daf8]" /></div>
        <div className="mt-7 flex items-center gap-1">
          <span className="h-0.5 w-19 bg-[#b38d62]" /><span className="h-0.75 w-0.75 bg-[#b38d62]" /></div>
        <p className="mt-8 text-[13px] font-semibold uppercase tracking-[.095em] text-[#c6cbd3]">Building elegant solutions for the digital frontier.</p>
        <p className="mt-4 max-w-137.5 text-[15px] leading-[1.85] text-[#aeb7c3]">A collaborative portfolio showcasing web development, design interests, and the projects we build and learn from together.</p>
        <div className="mt-9 flex flex-wrap items-center gap-3"><a href="#projects" className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2.5 border border-[#a9daf8] bg-[#a9daf8] px-[17px] py-2.5 text-xs font-extrabold text-[#0b1824] no-underline transition-colors duration-200 hover:bg-[#d5edfb] disabled:cursor-not-allowed disabled:opacity-60 uppercase tracking-wider">View projects ↗</a><a href="#about" className="inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2.5 border border-[#536d84] bg-transparent px-[17px] py-2.5 text-xs font-bold text-[#cbe8f7] no-underline transition-colors duration-200 hover:border-[#a9daf8] hover:bg-[#152637] disabled:cursor-not-allowed disabled:opacity-60 uppercase tracking-wider">About us ↗</a></div>
        <p className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[.19em] text-[#657483]"><span aria-hidden="true" className="inline-block h-1.25 w-1.25 bg-[#a9daf8] shadow-[0_0_11px_rgba(169,218,248,.6)]" />System online<span className="text-[#394653]">/</span>Two profiles</p>
      </div>
      <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:justify-self-end">
        {team.map(member => <ProfileCard key={member.id} member={member} />)}
      </div>
    </div>
  </section>;
}
