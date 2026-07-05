"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ProjectApplicationModule from "@/components/ProjectApplicationModule";

const options = ["brand website", "product system", "ai workflow"];

export default function FinalCTA() {
  const [status, setStatus] = useState("waiting for project signal");
  const [activeOption, setActiveOption] = useState(options[0]);
  const [applicationOpen, setApplicationOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#020806] px-6 py-20 text-white"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 30%, rgba(52,211,153,0.24), transparent 28%), radial-gradient(circle at 82% 72%, rgba(16,185,129,0.13), transparent 32%), linear-gradient(135deg, rgba(52,211,153,0.1), transparent 42%, rgba(255,255,255,0.035))",
        }}
      />

      <div className="absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[repeating-linear-gradient(115deg,white_0px,white_1px,transparent_1px,transparent_18px)]" />
      </div>

      <div className="pointer-events-none absolute bottom-[-4vw] left-1/2 -translate-x-1/2 font-mono text-[20vw] font-black uppercase leading-none tracking-[-0.18em] text-emerald-400/10">
        BUILD
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-emerald-400/60 shadow-[0_0_30px_rgba(52,211,153,0.7)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-emerald-400">
              final command / contact
            </p>

            <h2 className="mt-6 font-mono text-[15vw] font-black uppercase leading-[0.82] tracking-[-0.16em] md:text-[86px]">
              LET&apos;S
              <br />
              BUILD
              <span className="text-emerald-400"> SHARP</span>
            </h2>

            <p className="mt-6 max-w-xl font-mono text-xs uppercase leading-7 text-white/60">
              Websites, interfaces and AI-powered systems for brands that want
              to look better, move faster and convert smarter.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-full overflow-hidden border border-emerald-400/40 bg-black/75 p-4 shadow-[0_0_90px_rgba(52,211,153,0.13)] backdrop-blur-md xl:justify-self-end xl:max-w-[620px]"
          >
            <Corners />

            <div className="absolute inset-0 bg-emerald-400/[0.035]" />

            <motion.div
              animate={{ x: ["-30%", "130%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 h-px w-60 bg-emerald-400/90 shadow-[0_0_24px_rgba(52,211,153,0.8)]"
            />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-emerald-400/20 pb-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                <span className="text-emerald-400">cta.module</span>
                <span className="text-right text-white/45">{status}</span>
              </div>

              <div className="grid gap-3 xl:grid-cols-[1fr_1.2fr]">
                <div className="border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/35">
                    selected command
                  </p>

                  <p className="mt-3 font-mono text-xs uppercase leading-6 text-white/70">
                    <span className="text-emerald-400">$</span> start_project{" "}
                    <span className="text-white/35">--type</span>{" "}
                    <span className="text-emerald-400">
                      {toCommandSlug(activeOption)}
                    </span>
                  </p>
                </div>

                <div className="grid gap-2">
                  {options.map((option, index) => {
                    const isActive = activeOption === option;

                    return (
                      <motion.button
                        key={option}
                        type="button"
                        onMouseEnter={() => {
                          setActiveOption(option);
                          setStatus(`${option} selected`);
                        }}
                        onClick={() => {
                          setActiveOption(option);
                          setStatus(`${option} selected`);
                        }}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative border px-4 py-2.5 text-left transition ${
                          isActive
                            ? "border-emerald-400 bg-emerald-400/10"
                            : "border-white/15 bg-black/55 hover:border-white/45"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/75">
                            <span
                              className={
                                isActive ? "text-emerald-400" : "text-white/35"
                              }
                            >
                              0{index + 1}
                            </span>{" "}
                            {option}
                          </p>

                          <span
                            className={`font-mono text-[9px] uppercase ${
                              isActive ? "text-emerald-400" : "text-white/35"
                            }`}
                          >
                            {isActive ? "active" : "idle"}
                          </span>
                        </div>

                        <motion.div
                          animate={{ scaleX: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-emerald-400"
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <motion.button
                  type="button"
                  onClick={() => {
                    setApplicationOpen((prev) => !prev);
                    setStatus(
                      applicationOpen
                        ? "application module closed"
                        : "application module opened"
                    );
                  }}
                  onMouseEnter={() => setStatus("application command ready")}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 0 35px rgba(52,211,153,0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-emerald-400 px-5 py-3.5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black"
                >
                  {applicationOpen ? "close form" : "start project"}
                </motion.button>

                <motion.a
                  href="#work"
                  onMouseEnter={() => setStatus("returning to work index")}
                  whileHover={{
                    y: -3,
                    borderColor: "rgba(52,211,153,0.8)",
                    color: "rgb(52,211,153)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-white/20 bg-black/60 px-5 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-white/70"
                >
                  view work
                </motion.a>
              </div>

              <AnimatePresence>
                {applicationOpen && (
                  <ProjectApplicationModule
                    activeOption={activeOption}
                    onStatusChange={setStatus}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <footer className="mt-14 flex flex-col justify-between gap-4 border-t border-emerald-400/25 pt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 md:flex-row">
          <span>davud.dev</span>
          <span>baku / remote</span>
          <span className="text-emerald-400">available for selected work</span>
        </footer>
      </div>
    </section>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-emerald-400" />
      <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-emerald-400" />
      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-emerald-400" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-emerald-400" />
    </>
  );
}

function toCommandSlug(value: string) {
  return value.replaceAll(" ", "-");
}