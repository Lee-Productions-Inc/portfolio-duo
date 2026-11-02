import {team} from '../../data/team';
import {Link} from '@inertiajs/react';
export default function Footer(){
  return <footer className="border-t border-[#29323e] py-9"><div className="mx-auto flex w-[calc(100%-38px)] max-w-290 flex-wrap items-center justify-between gap-6 md:w-[calc(100%-76px)]">
    <div><a href="#home" className="text-sm font-semibold text-[#e5eaf1] hover:text-[#a9dcf8]">{team[0].name} &amp; {team[1].name}</a>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.16em] text-[#8ca7bf]">✦ Web Development / Collaboration</p>
      <p className="mt-4 text-[11px] text-[#738396]">© {new Date().getFullYear()} Portfolio team. All rights reserved.</p>
    </div><div className="flex flex-wrap items-center gap-5"><a href="#home" className="text-xs text-[#a9daf8] hover:underline">↑ Back to top</a><Link href="/team/login" className="text-xs text-[#8599ab] hover:text-[#a9daf8]">Team sign in</Link></div>
  </div></footer>;
}
