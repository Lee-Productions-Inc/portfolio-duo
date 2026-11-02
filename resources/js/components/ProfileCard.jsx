export default function ProfileCard({ member, compact=false }) {
  return <div className="group mx-auto w-full max-w-102.5 transition-[filter,transform] duration-300 hover:-translate-y-1 hover:drop-shadow-[0_12px_24px_rgba(23,67,95,.2)]">
    <div className="flex items-center justify-between bg-[#171d25] px-3 py-2 text-[10px] font-semibold tracking-wider text-[#9ab5ca]">
      <span><span className="mr-1 text-[#a9dcf8]">✦</span> CAM {member.id} / PORTRAIT</span>
      <span className="text-[#b18c61]">EDIT PHOTO</span>
    </div>
    <div className="border border-[#526d84] bg-[#0e141c] p-2">
      <div className="flex justify-between pb-2 text-[10px] font-semibold tracking-[.09em] text-[#a9dcf8]"><span>IDENTITY</span><span className="text-[#c19869]">✦</span></div>
      <div className="relative overflow-hidden bg-[#16212b]">
        <img src={member.photo} alt={`${member.name} portrait placeholder`} className={`block w-full object-cover transition-transform duration-500 group-hover:scale-[1.035] ${compact ? 'aspect-[1.5/1]' : 'aspect-[1.05/1]'}`} />
        <span aria-hidden="true" className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-[#a9daf8]" />
        <span aria-hidden="true" className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-[#a9daf8]" />
      </div>
      <div className="flex items-center justify-between gap-3 pt-2 text-[10px] text-[#a8b5c2]"><span>{member.name}</span><span>PROFILE / {member.id}</span></div>
    </div>
    <div className="flex justify-between border-x border-b border-[#242f3c] bg-[#121820] px-3 py-2 text-[10px] font-semibold tracking-wider text-[#8c9cac]"><span>{member.role}</span><span className="text-[#ba8d5d]">✦ NODE {member.id}</span></div>
  </div>;
}
