import { useEffect, useState } from 'react';
const links = [
  ['Home','home'],['About','about'],['Skills','skills'],
  ['Projects','projects'],['Education','education'],['Contact','contact'],
];
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sync = () => {
      setScrolled(window.scrollY > 24);
      let id = 'home';
      for (const section of document.querySelectorAll('main section[id]')) {
        if (section.getBoundingClientRect().top <= 180) id = section.id;
      }
      setActive(id);
    };
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    const onEscape = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onEscape);
    sync();
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onEscape);
    };
  }, []);
  return <header id="site-header" data-scrolled={scrolled} className="fixed inset-x-0 top-0 z-50 border-b border-[#242d38] bg-[#0b0e14]/95 backdrop-blur-xl transition-shadow duration-200 data-[scrolled=true]:shadow-[0_14px_38px_rgba(0,0,0,.24)]">
    <div className="mx-auto flex h-19 w-[calc(100%-38px)] max-w-290 items-center justify-between gap-5 md:w-[calc(100%-76px)]">
      <a href="#home" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-3 text-[13px] font-semibold tracking-tight text-[#e5eaf1] hover:text-[#a9daf8]">
        <span aria-hidden="true" className="text-2xl leading-none text-[#a9dbf8]">✦</span>
        <span>GODOY <span className="text-[#b18c61]">/</span> PARTNER</span>
      </a>
      <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
        {links.map(([label,id]) => <a key={id} href={`#${id}`} aria-current={active===id?'page':undefined} className="relative py-2.5 text-xs text-[#aab4c1] transition-colors hover:text-[#a9daf8] aria-[current=page]:text-[#a9daf8] after:absolute after:bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#a9daf8] after:transition-[width] hover:after:w-full aria-[current=page]:after:w-full">{label}</a>)}
      </nav>
      <button type="button" aria-label={menuOpen?'Close navigation menu':'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(x=>!x)} className="border border-[#354653] px-3 py-2 text-[#a9daf8] lg:hidden">{menuOpen?'✕':'☰'} <span className="ml-1 text-[10px] uppercase">Menu</span></button>
    </div>
    {menuOpen && <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-[#293440] bg-[#111721] px-6 py-4 shadow-xl lg:hidden">
      {links.map(([label,id],i) => <a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)} className="block border-b border-[#293440] py-3 text-sm text-[#d6e2ef]"><span className="mr-3 text-[10px] text-[#bd986b]">{String(i+1).padStart(2,'0')} /</span>{label}</a>)}
    </nav>}
  </header>;
}
