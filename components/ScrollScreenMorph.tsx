"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, MoveUpRight } from "lucide-react";
import { useRef, useState } from "react";

const chapters = [
  { index: "01", label: "Context", at: 0.08 },
  { index: "02", label: "Architecture", at: 0.5 },
  { index: "03", label: "Interiors", at: 0.88 },
] as const;

function RevealWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [28, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-transform">
      {children}&nbsp;
    </motion.span>
  );
}

export default function ScrollScreenMorph() {
  const trackRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState(0);

  const { scrollYProgress: rawProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(rawProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(rawProgress, "change", (latest) => {
    const nextPhase = latest < 0.35 ? 0 : latest < 0.7 ? 1 : 2;
    setActivePhase((current) => (current === nextPhase ? current : nextPhase));
  });

  const aerialScale = useTransform(progress, [0, 0.38], [1, reduceMotion ? 1 : 1.15]);
  const aerialOpacity = useTransform(progress, [0.27, 0.48], [1, 0]);
  const aerialDarkness = useTransform(progress, [0, 0.35], [0.08, 0.44]);

  const firstCopyOpacity = useTransform(progress, [0, 0.08, 0.24, 0.35], [0, 1, 1, 0]);
  const firstCopyY = useTransform(progress, [0, 0.26, 0.36], [36, 0, -46]);

  const facadeClip = useTransform(
    progress,
    [0.29, 0.7],
    [
      "inset(46% 47% 43% 47% round 999px 999px 4px 4px)",
      "inset(-2% -2% -2% -2% round 0px 0px 0px 0px)",
    ],
  );
  const facadeScale = useTransform(progress, [0.3, 0.68, 0.84], [1.08, 1, reduceMotion ? 1 : 1.18]);
  const facadeOpacity = useTransform(progress, [0.28, 0.36, 0.75, 0.86], [0, 1, 1, 0]);
  const secondCopyOpacity = useTransform(progress, [0.39, 0.47, 0.62, 0.71], [0, 1, 1, 0]);
  const secondCopyY = useTransform(progress, [0.39, 0.5, 0.71], [30, 0, -36]);

  const interiorOpacity = useTransform(progress, [0.7, 0.83], [0, 1]);
  const interiorScale = useTransform(progress, [0.69, 1], [reduceMotion ? 1 : 1.17, 1]);
  const interiorX = useTransform(progress, [0.69, 1], [reduceMotion ? "0%" : "3%", "0%"]);
  const thirdCopyOpacity = useTransform(progress, [0.77, 0.87], [0, 1]);
  const thirdCopyScale = useTransform(progress, [0.77, 0.94], [0.94, 1]);
  const detailsOpacity = useTransform(progress, [0.83, 0.94], [0, 1]);
  const detailsY = useTransform(progress, [0.83, 0.96], [22, 0]);
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  const jumpTo = (at: number) => {
    const element = trackRef.current;
    if (!element) return;
    const maxTravel = element.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: element.offsetTop + maxTravel * at,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={trackRef}
      id="story"
      className="relative h-[300vh] bg-[#0c0e0d]"
      aria-label="The Reposé story"
    >
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden bg-[#0c0e0d] text-white">
        <motion.div
          style={{ scale: aerialScale, opacity: aerialOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/repose-aerial.png"
            alt="Aerial view of Reposé Residence and the surrounding Dubai neighborhood"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <motion.div
            style={{ opacity: aerialDarkness }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>

        <motion.div
          style={{ clipPath: facadeClip, opacity: facadeOpacity, scale: facadeScale }}
          className="absolute inset-0 origin-center will-change-transform"
        >
          <Image
            src="/images/repose-exterior.png"
            alt="Limestone and bronze facade of Reposé Residence"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,13,.72),rgba(12,14,13,.05)_55%,rgba(12,14,13,.28)),linear-gradient(0deg,rgba(12,14,13,.62),transparent_55%,rgba(12,14,13,.25))]" />
        </motion.div>

        <motion.div
          style={{ opacity: interiorOpacity, scale: interiorScale, x: interiorX }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/living-room.png"
            alt="The living suite inside Reposé Residence"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,14,13,.82)_0%,rgba(12,14,13,.05)_52%,rgba(12,14,13,.42)_100%)]" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />

        <motion.div
          style={{ opacity: firstCopyOpacity, y: firstCopyY }}
          className="absolute inset-x-5 top-[18%] z-10 max-w-[830px] will-change-transform md:left-10 md:top-[20%]"
        >
          <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[#c5b89e]">Why Dubai? · The wider view</p>
          <h2 className="font-serif text-[clamp(3.5rem,8vw,8rem)] font-normal leading-[0.84] tracking-[-0.045em] text-white/[0.96]">
            Built on ambition.<br /><em className="font-normal text-white/62">Designed for serenity.</em>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: secondCopyOpacity, y: secondCopyY }}
          className="absolute inset-x-5 top-[17%] z-10 max-w-4xl will-change-transform md:left-10 md:top-[19%]"
        >
          <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[#c5b89e]">Explore residences · Level by level</p>
          <h2 className="font-serif text-[clamp(3.5rem,8vw,8rem)] font-normal leading-[0.84] tracking-[-0.045em] text-white/[0.96]">
            {[
              ["Level", [0.43, 0.48]],
              ["by", [0.455, 0.505]],
              ["level,", [0.48, 0.53]],
              ["discovery", [0.505, 0.555]],
              ["unfolds.", [0.53, 0.58]],
            ].map(([word, range]) => (
              <RevealWord
                key={word as string}
                progress={progress}
                range={range as [number, number]}
              >
                {word as string}
              </RevealWord>
            ))}
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: thirdCopyOpacity, scale: thirdCopyScale }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center will-change-transform"
        >
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[#c5b89e]">Within Reposé · A quieter world</p>
            <h2 className="font-serif text-[clamp(4rem,10vw,10rem)] font-normal leading-[0.78] tracking-[-0.055em] text-white/[0.97]">
              Step inside<br /><em className="font-normal text-white/65">the everyday.</em>
            </h2>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: detailsOpacity, y: detailsY }}
          className="absolute bottom-20 left-5 z-20 hidden w-[310px] border border-white/10 bg-black/40 p-5 backdrop-blur-md md:left-10 md:block"
        >
          <div className="flex items-start justify-between">
            <p className="text-[9px] uppercase leading-5 tracking-[0.28em] text-[#c5b89e]">Residence<br />materiality</p>
            <MoveUpRight size={15} className="text-white/50" />
          </div>
          <p className="mt-8 font-serif text-2xl leading-tight text-white/90">Italian marble, natural oak and an uninterrupted horizon.</p>
        </motion.div>

        <div className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-5 md:right-10">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.index}
              type="button"
              onClick={() => jumpTo(chapter.at)}
              aria-label={`Jump to ${chapter.label}`}
              aria-current={activePhase === index ? "step" : undefined}
              className="group flex items-center gap-3"
            >
              <span className="hidden text-[8px] uppercase tracking-[0.24em] text-white/0 transition group-hover:text-white/55 md:block">{chapter.label}</span>
              <span className={`block h-px transition-all duration-500 ${activePhase === index ? "w-9 bg-[#d3b68c]" : "w-4 bg-white/35 group-hover:w-6"}`} />
            </button>
          ))}
        </div>

        <div className="absolute inset-x-5 bottom-5 z-30 flex items-end gap-5 md:inset-x-10 md:bottom-8">
          <div className="min-w-14 font-serif text-2xl tabular-nums text-white/90">
            {chapters[activePhase].index}<span className="mx-2 text-white/30">/</span><span className="text-sm text-white/40">03</span>
          </div>
          <div className="mb-2 h-px flex-1 overflow-hidden bg-white/20">
            <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-[#c5a880]" />
          </div>
          <div className="hidden items-center gap-2 pb-1 text-[8px] uppercase tracking-[0.25em] text-white/45 sm:flex">
            Scroll to discover <ArrowDown size={12} />
          </div>
        </div>
      </div>
    </section>
  );
}
