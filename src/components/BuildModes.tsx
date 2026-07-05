"use client";

import { motion } from "motion/react";
import { useState } from "react";

const modes = [
  {
    id: "01",
    title: "Brand Websites",
    command: "build(brand)",
    description:
      "Premium websites that make a brand feel sharper, clearer and more trusted.",
    items: ["landing pages", "web presence", "visual systems", "conversion"],
  },
  {
    id: "02",
    title: "Product Systems",
    command: "build(system)",
    description:
      "Dashboards, portals and web tools that turn messy business workflows into usable interfaces.",
    items: ["dashboards", "crm logic", "booking flows", "admin panels"],
  },
  {
    id: "03",
    title: "AI Workflows",
    command: "build(ai)",
    description:
      "AI-powered automations and workflows that help businesses respond faster and operate smarter.",
    items: ["ai inbox", "lead logic", "automation", "smart replies"],
  },
];

export default function BuildModes() {
  const [activeMode, setActiveMode] = useState(modes[0]);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/20 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
              build modes / what i create
            </p>

            <h2 className="mt-6 font-mono text-[13vw] font-black leading-none tracking-[-0.15em] md:text-[100px]">
              BUILD
              <br />
              MODES
            </h2>
          </div>

          <div className="max-w-md border border-emerald-400/45 bg-emerald-400/10 p-5 font-mono text-xs uppercase leading-6 text-white/55">
            <span className="text-emerald-400">$</span> selected mode:{" "}
            <span className="text-emerald-400">{activeMode.command}</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {modes.map((mode) => {
              const isActive = activeMode.id === mode.id;

              return (
                <motion.button
                  key={mode.id}
                  onMouseEnter={() => setActiveMode(mode)}
                  onClick={() => setActiveMode(mode)}
                  whileHover={{ x: 8 }}
                  className={`group relative border p-5 text-left transition ${
                    isActive
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-white/25 bg-black hover:border-white/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p
                        className={`font-mono text-xs uppercase tracking-[0.34em] ${
                          isActive ? "text-emerald-400" : "text-white/35"
                        }`}
                      >
                        {mode.id} / {mode.command}
                      </p>

                      <h3 className="mt-4 font-mono text-4xl font-black uppercase leading-none tracking-[-0.12em] md:text-5xl">
                        {mode.title}
                      </h3>
                    </div>

                    <span
                      className={`font-mono text-xs uppercase ${
                        isActive ? "text-emerald-400" : "text-white/35"
                      }`}
                    >
                      {isActive ? "active" : "idle"}
                    </span>
                  </div>

                  <motion.div
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-emerald-400"
                  />
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeMode.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="relative min-h-[430px] border border-white/30 bg-black p-6"
          >
            <Corners />

            <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 font-mono text-xs uppercase tracking-[0.28em]">
              <span className="text-emerald-400">mode.preview</span>
              <span className="text-white/40">{activeMode.id}</span>
            </div>

            <h3 className="font-mono text-[12vw] font-black uppercase leading-none tracking-[-0.15em] md:text-[96px]">
              {activeMode.title}
            </h3>

            <p className="mt-8 max-w-xl font-mono text-sm uppercase leading-7 text-white/50">
              {activeMode.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">
              {activeMode.items.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="border border-white/20 bg-white/[0.02] p-4 font-mono text-xs uppercase text-white/60"
                >
                  <span className="text-emerald-400">0{index + 1}</span>
                  <p className="mt-3">{item}</p>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-6 left-6 right-6 h-[3px] bg-white">
              <motion.div
                key={activeMode.id}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.65 }}
                className="h-full origin-left bg-emerald-400"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-emerald-400" />
      <div className="absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-emerald-400" />
      <div className="absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-emerald-400" />
      <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-emerald-400" />
    </>
  );
}