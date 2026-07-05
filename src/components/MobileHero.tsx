"use client";

import { motion } from "motion/react";

const navItems = [
  { label: "~/home", href: "#home" },
  { label: "~/system", href: "#system" },
  { label: "~/work", href: "#work" },
  { label: "~/contact", href: "#contact" },
];

const profileStats = [
  { label: "base", value: "baku.az" },
  { label: "mode", value: "creative dev" },
  { label: "focus", value: "web / ai / brand" },
  { label: "status", value: "available" },
];

const systemModules = [
  "brand websites",
  "product systems",
  "ai workflows",
  "content engines",
];

const bootLines = [
  "davud.os initialized",
  "creative profile mounted",
  "strategy layer active",
  "development stack connected",
];

export default function MobileHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black px-4 pb-8 pt-4 text-white">
      <MobileBackground />

      <div className="relative z-10 mx-auto max-w-md">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="border border-white/20 bg-black/80 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
            <a
              href="#home"
              className="font-mono text-xs font-bold uppercase tracking-[0.24em]"
            >
              davud.os
            </a>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-400">
                online
              </span>
            </div>
          </div>

          <nav className="grid grid-cols-4 divide-x divide-white/10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-2 py-3 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-white/40"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
          className="mt-5 border border-emerald-400/40 bg-emerald-400/10 px-4 py-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
            creative developer / founder
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
          className="mt-5 border border-white/20 bg-black p-4"
        >
          <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-400">
              creative.profile
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
              active
            </p>
          </div>

          <h1 className="break-words font-mono text-[18vw] font-black uppercase leading-[0.78] tracking-[-0.16em] text-white">
            Davud Baghir
          </h1>

          <p className="mt-6 font-mono text-xs uppercase leading-7 text-white/55">
            I design and build sharp websites, digital systems and AI workflows
            for brands that need clarity, speed and stronger digital presence.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {profileStats.map((item) => (
              <div
                key={item.label}
                className="border border-white/15 bg-white/[0.02] p-3 font-mono uppercase"
              >
                <p className="text-[9px] tracking-[0.2em] text-white/30">
                  {item.label}
                </p>
                <p className="mt-2 text-[10px] tracking-[0.12em] text-emerald-400">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4 grid gap-3"
        >
          <a
            href="#work"
            className="bg-emerald-400 px-5 py-4 text-center font-mono text-xs font-bold uppercase tracking-[0.16em] text-black"
          >
            $ ls work/
          </a>

          <a
            href="#contact"
            className="border border-white/20 bg-black px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-white/65"
          >
            $ start project
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.58, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4 border border-white/20 bg-black"
        >
          <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-400">
              system.modules
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
              04 loaded
            </p>
          </div>

          <div className="grid gap-2 p-4">
            {systemModules.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between border border-white/15 px-3 py-3 font-mono uppercase"
              >
                <span className="text-[9px] tracking-[0.18em] text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] tracking-[0.14em] text-white/65">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.76, ease: [0.76, 0, 0.24, 1] }}
          className="mt-4 overflow-hidden border border-white/20 bg-black"
        >
          <div className="border-b border-white/15 px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-400">
              terminal.output
            </p>
          </div>

          <div className="space-y-3 p-4">
            {bootLines.map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.12 }}
                className="flex gap-3 font-mono text-[10px] uppercase leading-5 tracking-[0.14em]"
              >
                <span className="text-emerald-400">
                  {">"}
                </span>
                <span className="text-white/45">{line}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:54px_54px] opacity-20" />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.12, 0.24, 0.12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-400 blur-[130px]"
      />

      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
    </>
  );
}