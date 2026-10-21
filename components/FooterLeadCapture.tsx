"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { FormEvent, useState } from "react";

export default function FooterLeadCapture() {
  const [open, setOpen] = useState(false); const [calendar, setCalendar] = useState(false); const [sent, setSent] = useState(false); const [date, setDate] = useState(22);
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  return <><footer id="enquire" className="bg-ink px-5 pb-10 pt-24 text-linen md:px-10 md:pt-36">
    <p className="eyebrow">Private enquiries · Dubai</p><button onClick={() => setOpen(true)} className="group flex w-full items-end justify-between border-b border-white/20 pb-7 text-left"><span className="font-serif text-[clamp(3.4rem,8vw,8rem)] leading-none tracking-[-.04em]">Let’s talk about <em>Reposé.</em></span><span className="mb-2 hidden h-14 w-14 items-center justify-center rounded-full border border-white/25 transition group-hover:bg-linen group-hover:text-ink md:flex"><ArrowRight /></span></button>
    <div className="grid gap-10 pt-10 text-[10px] uppercase tracking-[.2em] text-linen/45 md:grid-cols-3"><p>Al Furjan<br />Dubai, UAE</p><p>Private sales gallery<br /><a href="mailto:private@repose.ae" className="text-linen">private@repose.ae</a></p><p className="md:text-right">© 2026 Reposé Residence<br />An illustrative digital showcase</p></div>
  </footer>
  <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setOpen(false)}><motion.aside initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",damping:28,stiffness:220}} onClick={(e)=>e.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-[#e7e1d6] p-6 text-ink md:p-12">
    <button onClick={() => setOpen(false)} aria-label="Close enquiry" className="ml-auto rounded-full border border-black/20 p-3"><X size={18}/></button>
    {sent ? <div className="m-auto text-center"><Check className="mx-auto mb-6" size={42}/><h3 className="font-serif text-5xl">Your private preview awaits.</h3><p className="mt-4 text-sm text-black/55">A residence advisor will contact you shortly.</p></div> : <><p className="eyebrow !text-[#776d5e]">By invitation</p><h3 className="font-serif text-5xl leading-none md:text-6xl">Begin a private conversation.</h3><p className="mt-5 max-w-md text-sm leading-7 text-black/55">Receive current availability, private pricing and an invitation to the Reposé sales gallery.</p>
    <form onSubmit={submit} className="mt-10 space-y-7"><label className="field">Your name<input required placeholder="Full name" /></label><label className="field">Email address<input required type="email" placeholder="name@email.com" /></label><label className="field">Mobile number<span className="flex"><select aria-label="Country code" defaultValue="+971"><option>+971</option><option>+44</option><option>+1</option><option>+91</option></select><input required type="tel" placeholder="50 000 0000" /></span></label>
      <button type="button" onClick={()=>setCalendar(!calendar)} className="flex w-full items-center justify-between border-b border-black/25 py-4 text-[10px] uppercase tracking-[.2em]"><span>Preferred private viewing</span><span>{calendar ? "Close calendar" : "Select date"}</span></button>
      <AnimatePresence>{calendar && <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden"><div className="grid grid-cols-7 gap-1 py-3 text-center text-xs">{["M","T","W","T","F","S","S"].map((d,i)=><span key={i} className="py-2 text-[9px] text-black/35">{d}</span>)}{Array.from({length:30},(_,i)=>i+1).map(d=><button type="button" onClick={()=>setDate(d)} key={d} className={`aspect-square ${date===d?"bg-ink text-linen":"hover:bg-black/5"}`}>{d}</button>)}</div></motion.div>}</AnimatePresence>
      <button className="flex w-full items-center justify-between bg-ink px-6 py-5 text-[10px] uppercase tracking-[.22em] text-linen">Request private access <ArrowRight size={16}/></button></form></>}
  </motion.aside></motion.div>}</AnimatePresence></>;
}
