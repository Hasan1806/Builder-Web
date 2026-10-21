"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 180]);
  const opacity = useTransform(scrollY, [0, 700], [1, 0.15]);
  return (
    <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-ink text-linen">
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.04]">
        <Image src="/images/repose-exterior.png" alt="Reposé Residence illuminated at dusk" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,13,.94)_0%,rgba(12,14,13,.58)_38%,rgba(12,14,13,.08)_72%),linear-gradient(0deg,rgba(12,14,13,.9)_0%,transparent_45%,rgba(12,14,13,.26)_100%)]" />
      <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/10 px-5 py-5 md:px-10">
        <a href="#top" className="font-serif text-2xl tracking-[.16em]">REPOSÉ</a>
        <div className="hidden items-center gap-9 text-[10px] uppercase tracking-[.24em] text-linen/70 md:flex">
          <a href="#residences">Residences</a><a href="#interiors">Interiors</a><a href="#amenities">Amenities</a>
        </div>
        <a href="#enquire" className="border border-white/20 px-4 py-3 text-[9px] uppercase tracking-[.22em] transition hover:bg-linen hover:text-ink">Private viewing</a>
      </nav>
      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col justify-end px-5 pb-9 md:px-10 md:pb-12">
        <p className="mb-7 max-w-sm text-[10px] uppercase leading-5 tracking-[.3em] text-bronze">A private collection in<br />Al Furjan, Dubai</p>
        <h1 className="max-w-5xl font-serif text-[clamp(3.4rem,8.7vw,9rem)] font-normal leading-[.78] tracking-[-.05em]">
          The website your<br /><em className="font-normal text-linen/75">$10M project</em><br />actually deserves
        </h1>
        <div className="mt-9 flex flex-col justify-between gap-8 border-t border-white/15 pt-5 md:flex-row md:items-end">
          <div className="flex gap-8 text-[9px] uppercase tracking-[.23em] text-linen/55"><span>Architecture<br /><b className="mt-1 block font-medium text-linen">Aedas Studio</b></span><span>Interiors<br /><b className="mt-1 block font-medium text-linen">Studio MKV</b></span></div>
          <a href="#residences" className="flex items-center gap-3 text-[10px] uppercase tracking-[.22em]">Explore the residence <ArrowDown size={14} className="animate-bounce" /></a>
        </div>
      </motion.div>
    </section>
  );
}
