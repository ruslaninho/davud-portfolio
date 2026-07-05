"use client";

import { motion } from "motion/react";

const skills = [
  "Web Development",
  "UI/UX Direction",
  "AI Workflows",
  "Brand Systems",
  "Automation",
  "Landing Pages",
];

const tools = ["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Figma", "AI"];

const websites = ["skicenter.az", "padelcenter.az", "okee.agency", "whitestone.az", "cheechak.az"];

export default function DavudOS() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-[220px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
            davud os / profile dashboard
          </p>

          <h2 className="mt-6 font-mono text-[13vw] font-black leading-none tracking-[-0.15em] md:text-[110px]">
            DAVUD
            <br />
            OS
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 70, rotateX: 8, rotateZ: -2 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateZ: -1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="relative overflow-hidden border border-emerald-400/45 bg-black p-5 shadow-[0_0_140px_rgba(16,185,129,0.15)] md:p-8"
        >
          <Corners />

          <motion.div
            animate={{ y: ["-10%", "110%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-emerald-400/80 shadow-[0_0_28px_rgba(52,211,153,0.9)]"
          />

          <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 font-mono text-xs uppercase tracking-[0.28em] text-white/55">
            <span>identity.interface</span>
            <span className="text-emerald-400">online</span>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border border-white/25 bg-white/[0.02] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                creative profile
              </p>

              <h3 className="mt-7 font-mono text-5xl font-black uppercase leading-none tracking-[-0.12em] md:text-7xl">
                Davud
                <br />
                Baghir
              </h3>

              <p className="mt-7 max-w-md font-mono text-sm uppercase leading-7 text-white/50">
                Creative developer and AI product builder. I build websites, dashboards, brand systems and digital tools for businesses.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 font-mono text-xs uppercase">
                <InfoCell label="base" value="Baku" />
                <InfoCell label="mode" value="remote / local" />
                <InfoCell label="focus" value="creative code" />
                <InfoCell label="status" value="selected work" active />
              </div>
            </div>

            <div className="grid gap-5">
              <div className="border border-white/25 bg-white/[0.02] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                  core skills
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      animate={{
                        opacity: [0.55, 1, 0.55],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        delay: index * 0.14,
                        ease: "easeInOut",
                      }}
                      className="border border-white/20 bg-black p-4 font-mono text-xs uppercase text-white/60"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="border border-white/25 bg-white/[0.02] p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                    websites built
                  </p>

                  <div className="mt-6 space-y-3">
                    {websites.map((site) => (
                      <div
                        key={site}
                        className="flex items-center justify-between border-b border-white/15 pb-3 font-mono text-xs uppercase"
                      >
                        <span className="text-white/60">{site}</span>
                        <span className="text-emerald-400">live</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-white/25 bg-white/[0.02] p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                    tools
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-white/25 bg-black px-3 py-2 font-mono text-xs uppercase text-white/65"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 border border-emerald-400/45 bg-emerald-400/10 p-4 font-mono text-xs uppercase leading-6 text-white/55">
                    <span className="text-emerald-400">$</span> build with taste, ship with logic.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCell({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      className={`border p-4 ${
        active
          ? "border-emerald-400 bg-emerald-400/10"
          : "border-white/20 bg-black"
      }`}
    >
      <p className="text-white/35">{label}</p>
      <p className={active ? "mt-2 text-emerald-400" : "mt-2 text-white/65"}>
        {value}
      </p>
    </div>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-emerald-400" />
      <div className="absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-emerald-400" />
      <div className="absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-emerald-400" />
      <div className="absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-emerald-400" />
    </>
  );
}