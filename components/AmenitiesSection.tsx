"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

const amenities = [
  { title: "Zen Garden & Reflection Pool", type: "Quiet", time: "06:30", image: "/images/wellness-terrace.png", desc: "A shaded garden composed for ritual, stillness and early light." },
  { title: "Padel Court & Golf Simulator", type: "Movement", time: "09:00", image: "/images/repose-exterior.png", desc: "Private, reservation-only spaces for play at your own pace." },
  { title: "Adults’ Infinity Pool & Cold Plunge Suites", type: "Restore", time: "16:00", image: "/images/wellness-terrace.png", desc: "A horizon pool and contrast therapy rooms reserved for residents." },
  { title: "Private Co-working & Resident Lounge", type: "Connect", time: "19:30", image: "/images/living-room.png", desc: "A library-like salon for focused work and effortless hosting." },
];

export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.22], [reduceMotion ? 0 : 45, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.16], [0, 1]);
  const listY = useTransform(scrollYProgress, [0.04, 0.3], [reduceMotion ? 0 : 60, 0]);
  const listOpacity = useTransform(scrollYProgress, [0.04, 0.2], [0, 1]);
  const previewY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 45, reduceMotion ? 0 : -45]);

  return (
    <section ref={sectionRef} id="amenities" className="relative bg-panel text-linen lg:h-[180vh]">
      <div className="relative min-h-[100svh] overflow-hidden px-5 py-20 md:px-10 lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-[700px] lg:py-[5vh]">
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="relative z-10 grid gap-5 will-change-transform md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">At your service · 03</p>
            <h2 className="font-serif text-[clamp(3.3rem,5.8vw,6.5rem)] font-normal leading-[.82] tracking-[-.045em]">
              Twelve ways to<br /><em className="font-normal text-linen/55">spend a day.</em>
            </h2>
          </div>
          <p className="max-w-sm self-end text-sm leading-7 text-linen/50 md:justify-self-end">Spaces that move easily from solitude to sociability—considered extensions of your home.</p>
        </motion.div>

        <motion.div style={{ y: listY, opacity: listOpacity }} className="relative z-10 mt-[clamp(1.75rem,4vh,3.5rem)] max-w-5xl will-change-transform lg:max-w-[70vw]">
          {amenities.map((item, i) => (
            <button
              key={item.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group grid w-full grid-cols-[42px_1fr_auto] items-start gap-3 border-t border-white/12 py-[clamp(.9rem,1.9vh,1.45rem)] text-left md:grid-cols-[70px_1fr_130px_auto]"
            >
              <span className="pt-1 text-[9px] tracking-[.22em] text-bronze">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <b className="font-serif text-[clamp(1.55rem,2.25vw,2.75rem)] font-normal leading-none transition-colors group-hover:text-bronze">{item.title}</b>
                <motion.span initial={false} animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }} transition={{ duration: .35 }} className="block overflow-hidden">
                  <span className="block max-w-lg pt-2 text-xs leading-5 text-linen/45">{item.desc}</span>
                </motion.span>
              </span>
              <span className="hidden pt-1 text-[9px] uppercase tracking-[.22em] text-linen/35 md:block">{item.type} · {item.time}</span>
              <ArrowUpRight size={17} className="text-linen/30 transition-colors group-hover:text-bronze" />
            </button>
          ))}
        </motion.div>

        <motion.div style={{ y: previewY }} className="pointer-events-none absolute right-[3vw] top-[37%] z-0 hidden aspect-[4/5] w-[23vw] max-w-[390px] overflow-hidden rounded-t-full border border-white/10 will-change-transform lg:block">
          <AnimatePresence mode="wait">
            <motion.div key={amenities[active].image} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }} className="absolute inset-0">
              <Image src={amenities[active].image} alt="" fill className="object-cover opacity-75" sizes="23vw" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: listOpacity }} className="relative z-10 mt-4 max-w-5xl border-t border-white/12 pt-4 text-[8px] uppercase tracking-[.22em] text-linen/35 lg:max-w-[70vw]">
          Plus eight more spaces to explore on your private viewing
        </motion.div>
      </div>
    </section>
  );
}
