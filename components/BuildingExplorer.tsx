"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Bath, BedDouble, Maximize2 } from "lucide-react";
import { useState } from "react";

const levels = [
  { id: "04", y: 63, title: "1 BHK + Study", area: "1,184 sq ft", living: "876 sq ft", outside: "168 sq ft", beds: "1 + Study", baths: "2", price: "From AED 2.8M", features: ["Private lift lobby", "West-facing sunset balcony", "Integrated Miele kitchen"] },
  { id: "09", y: 42, title: "3 BHK Sky Residence", area: "2,764 sq ft", living: "2,142 sq ft", outside: "406 sq ft", beds: "3", baths: "4", price: "From AED 6.9M", features: ["Private elevator access", "Dual-aspect living gallery", "Panoramic sunset terrace"] },
  { id: "15", y: 18, title: "4 BHK Penthouse with Jacuzzi", area: "5,821 sq ft", living: "4,180 sq ft", outside: "1,260 sq ft", beds: "4", baths: "6", price: "Price on request", features: ["Private rooftop jacuzzi", "Show kitchen + chef’s kitchen", "360° skyline outlook"] },
];

function FloorPlan({ id }: { id: string }) {
  return <div className="flex h-full items-center justify-center bg-[#e9e4da] p-8 text-ink">
    <svg viewBox="0 0 640 460" className="h-auto w-full" aria-label={`Level ${id} architectural floor plan`}>
      <path d="M65 65H575V395H65Z" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M65 235H575M325 65V395M175 65V235M455 65V235M215 235V395M465 235V395" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M80 80H160V150H80ZM470 80H560V150H470ZM80 250H195V375H80ZM480 250H560V375H480Z" fill="none" stroke="#9d7c53"/><circle cx="390" cy="310" r="43" fill="none" stroke="#9d7c53"/><text x="85" y="220" fontSize="12" letterSpacing="3">LIVING</text><text x="345" y="220" fontSize="12" letterSpacing="3">KITCHEN</text><text x="230" y="380" fontSize="12" letterSpacing="3">PRIVATE TERRACE</text><text x="292" y="35" fontSize="13" letterSpacing="4">LEVEL {id}</text>
    </svg>
  </div>;
}

export default function BuildingExplorer() {
  const [selected, setSelected] = useState(levels[1]);
  const [view, setView] = useState<"exterior" | "plan">("exterior");
  return <section id="residences" className="bg-ink px-5 py-24 text-linen md:px-10 md:py-36">
    <div className="mb-14 grid gap-7 md:grid-cols-2 md:items-end">
      <div><p className="eyebrow">The residences · 01</p><h2 className="section-title">Choose your<br /><em>point of view.</em></h2></div>
      <p className="max-w-md text-sm leading-7 text-linen/55 md:justify-self-end">Sixteen considered levels. Thirty-eight residences. Every home is shaped by light, proportion and the quiet privilege of space.</p>
    </div>
    <div className="grid overflow-hidden border border-white/10 bg-white/[.02] lg:grid-cols-[1.45fr_.85fr]">
      <div className="relative aspect-[4/5] min-h-[560px] overflow-hidden lg:aspect-auto lg:min-h-[760px]">
        <AnimatePresence mode="wait">
          {view === "exterior" ? <motion.div key="exterior" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0">
            <Image src="/images/repose-exterior.png" alt="Interactive facade of Reposé Residence" fill sizes="(min-width:1024px) 65vw,100vw" className="object-cover object-[66%_center] opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" role="group" aria-label="Select a residence level">
              {levels.map((level) => <polygon key={level.id} points={`42,${level.y} 81,${level.y-2} 82,${level.y+4} 41,${level.y+6}`} onMouseEnter={() => setSelected(level)} onClick={() => setSelected(level)} tabIndex={0} role="button" aria-label={`Select Level ${level.id}`} onKeyDown={(e) => e.key === "Enter" && setSelected(level)} className={`cursor-pointer transition-all duration-300 focus:outline-none ${selected.id === level.id ? "fill-[#c5a880]/35 stroke-[#e5c79f]" : "fill-white/0 stroke-white/20 hover:fill-white/10"}`} vectorEffect="non-scaling-stroke" strokeWidth="1" />)}
            </svg>
            <div className="absolute bottom-5 left-5 text-[9px] uppercase tracking-[.25em] text-white/55">Hover or tap a level</div>
          </motion.div> : <motion.div key="plan" initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="absolute inset-0"><FloorPlan id={selected.id} /></motion.div>}
        </AnimatePresence>
        <div className="absolute right-5 top-5 flex bg-ink/75 p-1 backdrop-blur-md">
          <button onClick={() => setView("exterior")} className={`px-4 py-3 text-[9px] uppercase tracking-[.18em] ${view === "exterior" ? "bg-linen text-ink" : "text-linen/60"}`}>3D Exterior</button>
          <button onClick={() => setView("plan")} className={`px-4 py-3 text-[9px] uppercase tracking-[.18em] ${view === "plan" ? "bg-linen text-ink" : "text-linen/60"}`}>2D Floor plan</button>
        </div>
      </div>
      <div className="flex flex-col border-t border-white/10 p-6 md:p-10 lg:border-l lg:border-t-0">
        <div className="mb-8 flex gap-2">{levels.map((level) => <button key={level.id} onClick={() => setSelected(level)} className={`flex-1 border px-2 py-3 text-[9px] uppercase tracking-[.18em] transition ${selected.id === level.id ? "border-bronze bg-bronze/10 text-bronze" : "border-white/10 text-linen/45 hover:border-white/30"}`}>Level {level.id}</button>)}</div>
        <AnimatePresence mode="wait"><motion.div key={selected.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
          <p className="eyebrow">Level {selected.id} · Private collection</p><h3 className="font-serif text-4xl leading-[1.03] md:text-5xl">{selected.title}</h3><p className="mt-5 text-sm text-bronze">{selected.price}</p>
          <div className="my-9 grid grid-cols-3 gap-3 border-y border-white/10 py-6 text-xs"><span><Maximize2 size={16} className="mb-3 text-bronze" />{selected.area}<small>Saleable area</small></span><span><BedDouble size={16} className="mb-3 text-bronze" />{selected.beds}<small>Bedrooms</small></span><span><Bath size={16} className="mb-3 text-bronze" />{selected.baths}<small>Bathrooms</small></span></div>
          <dl className="space-y-4 text-xs"><div className="flex justify-between"><dt className="text-linen/45">Internal living</dt><dd>{selected.living}</dd></div><div className="flex justify-between"><dt className="text-linen/45">Balcony / terrace</dt><dd>{selected.outside}</dd></div></dl>
          <ul className="mt-8 space-y-3 text-xs text-linen/65">{selected.features.map((feature) => <li key={feature} className="flex items-center gap-3"><span className="h-px w-5 bg-bronze" />{feature}</li>)}</ul>
        </motion.div></AnimatePresence>
        <button onClick={() => window.print()} className="mt-auto flex w-full items-center justify-between border border-white/15 px-5 py-4 text-[10px] uppercase tracking-[.2em] transition hover:bg-linen hover:text-ink">Download unit blueprint <ArrowDownToLine size={15} /></button>
        <a href="#enquire" className="mt-3 flex items-center justify-between px-1 py-3 text-[10px] uppercase tracking-[.2em] text-bronze">Request availability <ArrowUpRight size={15}/></a>
      </div>
    </div>
  </section>;
}
