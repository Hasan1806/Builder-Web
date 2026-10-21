"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef, useState } from "react";

const spaces = [
  {
    name: "The Living Room",
    image: "/images/living-room.png",
    index: "01",
    eyebrow: "Inside Reposé",
    title: <>Step inside<br /><em>the everyday.</em></>,
    detail: "Italian marble",
    copy: "Book-matched stone brings movement and permanence to the social heart of every residence.",
    at: 0.08,
  },
  {
    name: "The Master Suite",
    image: "/images/master-suite.png",
    index: "02",
    eyebrow: "Private quarters",
    title: <>Space to find<br /><em>your stillness.</em></>,
    detail: "3.65m ceilings",
    copy: "Hotel-scaled volume creates a serene retreat, framed by quiet materiality and soft light.",
    at: 0.5,
  },
  {
    name: "The Wellness Terrace",
    image: "/images/wellness-terrace.png",
    index: "03",
    eyebrow: "Above the city",
    title: <>A horizon<br /><em>of your own.</em></>,
    detail: "Double-glazed glass",
    copy: "Full-height, solar-controlled glazing dissolves the edge between private interiors and the skyline.",
    at: 0.88,
  },
];

type GallerySceneProps = {
  room: (typeof spaces)[number];
  progress: MotionValue<number>;
  opacityInput: number[];
  opacityOutput: number[];
  scaleInput: [number, number];
  reduceMotion: boolean;
};

function GalleryScene({ room, progress, opacityInput, opacityOutput, scaleInput, reduceMotion }: GallerySceneProps) {
  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const scale = useTransform(progress, scaleInput, [reduceMotion ? 1 : 1.1, 1]);
  const textY = useTransform(progress, scaleInput, [reduceMotion ? 0 : 38, reduceMotion ? 0 : -12]);
  const textOpacity = useTransform(progress, opacityInput, opacityOutput);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 will-change-transform">
      <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
        <Image src={room.image} alt={room.name} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,13,.8)_0%,rgba(12,14,13,.26)_48%,rgba(12,14,13,.12)_100%),linear-gradient(0deg,rgba(12,14,13,.82)_0%,transparent_55%,rgba(12,14,13,.36)_100%)]" />
      <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-x-5 top-[18%] max-w-4xl will-change-transform md:left-10 md:top-[20%]">
        <p className="mb-6 text-[9px] uppercase tracking-[.32em] text-[#c5a880]">{room.eyebrow} · {room.index}</p>
        <h2 className="font-serif text-[clamp(3.8rem,9vw,9rem)] font-normal leading-[.8] tracking-[-.05em] text-white/[.96] [&_em]:font-normal [&_em]:text-white/60">
          {room.title}
        </h2>
      </motion.div>
      <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute bottom-24 left-5 w-[calc(100%-2.5rem)] max-w-sm border border-white/10 bg-black/35 p-5 backdrop-blur-md will-change-transform md:bottom-24 md:left-10">
        <p className="font-serif text-2xl text-white/95">{room.detail}</p>
        <p className="mt-2 text-xs leading-6 text-white/55">{room.copy}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ArchedGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.34 ? 0 : value < 0.68 ? 1 : 2;
    setActive((current) => current === next ? current : next);
  });

  const archClip = useTransform(
    scrollYProgress,
    [0, 0.2],
    [
      "inset(8% 14% 8% 14% round 50% 50% 0% 0%)",
      "inset(0% 0% 0% 0% round 0% 0% 0% 0%)",
    ],
  );
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const jumpTo = (at: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + travel * at,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section ref={sectionRef} id="interiors" className="relative h-[320vh] bg-[#0c0e0d] text-white" aria-label="Inside Reposé">
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden bg-[#0c0e0d]">
        <motion.div style={{ clipPath: archClip }} className="absolute inset-0 bg-[#0c0e0d] will-change-transform">
          <GalleryScene room={spaces[0]} progress={scrollYProgress} opacityInput={[0, 0.26, 0.4]} opacityOutput={[1, 1, 0]} scaleInput={[0, 0.36]} reduceMotion={reduceMotion} />
          <GalleryScene room={spaces[1]} progress={scrollYProgress} opacityInput={[0.28, 0.4, 0.6, 0.72]} opacityOutput={[0, 1, 1, 0]} scaleInput={[0.3, 0.68]} reduceMotion={reduceMotion} />
          <GalleryScene room={spaces[2]} progress={scrollYProgress} opacityInput={[0.62, 0.75, 1]} opacityOutput={[0, 1, 1]} scaleInput={[0.64, 1]} reduceMotion={reduceMotion} />
        </motion.div>

        <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-5 md:right-10">
          {spaces.map((space, index) => (
            <button key={space.name} type="button" onClick={() => jumpTo(space.at)} aria-label={`View ${space.name}`} aria-current={active === index ? "step" : undefined} className="group flex items-center justify-end gap-3">
              <span className={`hidden text-[8px] uppercase tracking-[.24em] transition md:block ${active === index ? "text-white/75" : "text-white/0 group-hover:text-white/50"}`}>{space.name}</span>
              <span className={`h-px transition-all duration-500 ${active === index ? "w-9 bg-[#c5a880]" : "w-4 bg-white/35 group-hover:w-6"}`} />
            </button>
          ))}
        </div>

        <div className="absolute inset-x-5 bottom-5 z-30 flex items-center gap-5 md:inset-x-10 md:bottom-8">
          <p className="min-w-[72px] font-serif text-2xl tabular-nums">{spaces[active].index}<span className="mx-2 text-white/30">/</span><span className="text-sm text-white/40">03</span></p>
          <div className="h-px flex-1 overflow-hidden bg-white/20"><motion.div style={{ scaleX: progressScale }} className="h-full origin-left bg-[#c5a880]" /></div>
          <p className="hidden items-center gap-2 text-[8px] uppercase tracking-[.25em] text-white/45 sm:flex">Scroll to explore <ArrowDown size={12} /></p>
        </div>
      </div>
    </section>
  );
}
