"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const modes = [
  {
    id: "01",
    title: "Brand Websites",
    command: "build(brand)",
    text: "Premium websites that make brands feel sharper, clearer and more trusted.",
    items: ["visual direction", "landing pages", "conversion"],
  },
  {
    id: "02",
    title: "Product Systems",
    command: "build(system)",
    text: "Dashboards, portals and web tools that turn messy workflows into usable interfaces.",
    items: ["dashboards", "booking flows", "business tools"],
  },
  {
    id: "03",
    title: "AI Workflows",
    command: "build(ai)",
    text: "AI-powered workflows that help businesses respond faster and operate smarter.",
    items: ["ai inbox", "automation", "smart logic"],
  },
];

const loadingLines = [
  "loading works",
  "compiling case studies",
  "mounting previews",
  "opening selected work",
];

export default function WorkTransition() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const activeMode = modes[activeIndex];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const panelOpacity = useTransform(smoothProgress, [0, 0.76, 0.94], [1, 1, 0]);
  const unlockY = useTransform(smoothProgress, [0.74, 1], ["100%", "0%"]);
  const openingOpacity = useTransform(smoothProgress, [0.82, 1], [0, 1]);

  useEffect(() => {
    const modeTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modes.length);
    }, 1300);

    const loadingTimer = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingLines.length);
    }, 650);

    return () => {
      clearInterval(modeTimer);
      clearInterval(loadingTimer);
    };
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="relative bg-black text-white lg:h-[175vh]"
    >
      <div className="relative min-h-[100svh] overflow-hidden bg-black py-16 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-15 lg:bg-[size:96px_96px]" />

        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-[140px] lg:h-[560px] lg:w-[560px] lg:blur-[180px]" />

        <motion.div
          style={{ y: unlockY }}
          className="absolute inset-x-0 bottom-0 z-10 hidden h-full border-t border-emerald-400 bg-emerald-400/10 shadow-[0_-40px_120px_rgba(52,211,153,0.18)] lg:block"
        />

        <motion.div
          style={isDesktop ? { opacity: panelOpacity } : undefined}
          className="relative z-20 flex min-h-[100svh] items-center justify-center px-4 lg:h-full lg:px-6"
        >
          <div className="relative w-full max-w-md overflow-hidden border border-white/30 bg-black p-3 shadow-[0_0_120px_rgba(0,0,0,0.8)] sm:p-5 md:max-w-2xl lg:h-[580px] lg:max-w-5xl lg:p-8">
            <Corners />

            <div className="mb-5 flex flex-col gap-3 border-b border-white/20 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:justify-between md:text-xs md:tracking-[0.26em] lg:mb-6 lg:pb-5">
              <span className="text-emerald-400">work.engine</span>

              <div className="flex items-center gap-3 text-white/40">
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]"
                />

                <span className="text-emerald-400">
                  {loadingLines[loadingIndex]}
                </span>
              </div>
            </div>

            <div className="grid gap-6 lg:h-[390px] lg:grid-cols-[300px_1fr] lg:items-center lg:gap-10">
              <LoaderCore activeIndex={activeIndex} />

              <div className="flex flex-col justify-center overflow-hidden lg:h-full">
                <motion.p
                  key={`${activeMode.id}-command`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400 md:text-xs md:tracking-[0.34em]"
                >
                  {activeMode.id} / {activeMode.command}
                </motion.p>

                <div className="mt-4 overflow-hidden lg:mt-5 lg:h-[116px]">
                  <motion.h2
                    key={`${activeMode.id}-title`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                    className="break-words font-mono text-[16vw] font-black uppercase leading-[0.9] tracking-[-0.15em] sm:text-[58px] md:text-[72px] lg:text-[86px]"
                  >
                    {activeMode.title}
                  </motion.h2>
                </div>

                <div className="mt-5 overflow-hidden lg:h-[76px]">
                  <motion.p
                    key={`${activeMode.id}-text`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                    className="max-w-xl font-mono text-xs uppercase leading-6 text-white/50 md:text-sm md:leading-7"
                  >
                    {activeMode.text}
                  </motion.p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:mt-7 lg:h-[78px]">
                  {activeMode.items.map((item, index) => (
                    <motion.div
                      key={`${activeMode.id}-${item}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="border border-white/20 bg-white/[0.02] p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55"
                    >
                      <span className="text-emerald-400">0{index + 1}</span>
                      <p className="mt-3">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {loadingLines.map((step, index) => (
                <div
                  key={step}
                  className={`border p-3 font-mono text-[9px] uppercase leading-4 tracking-[0.14em] ${
                    index === loadingIndex
                      ? "border-emerald-400/70 text-emerald-400"
                      : "border-white/20 text-white/35"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            <div className="mt-6 h-[3px] w-full bg-white/20 lg:bg-white">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full origin-left bg-emerald-400"
              />
            </div>

            <p className="mt-5 text-center font-mono text-[9px] uppercase leading-5 tracking-[0.24em] text-white/35 sm:text-[10px] sm:tracking-[0.3em]">
              scroll to continue · selected work is loading
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: openingOpacity }}
          className="absolute inset-0 z-30 hidden items-center justify-center px-6 text-center lg:flex"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-emerald-400">
              selected work ready
            </p>

            <h2 className="mt-6 font-mono text-[15vw] font-black uppercase leading-none tracking-[-0.15em] md:text-[132px]">
              OPENING
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LoaderCore({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative mx-auto flex h-[230px] w-full max-w-[300px] items-center justify-center lg:h-[250px]">
      <div className="relative flex h-[250px] w-[250px] scale-[0.78] items-center justify-center sm:scale-90 lg:scale-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute h-[250px] w-[250px] rounded-full border border-white/20 border-t-emerald-400"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
          className="absolute h-[184px] w-[184px] rounded-full border border-white/15 border-r-emerald-400"
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-[92px] w-[92px] items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-400/10 font-mono text-3xl font-black text-emerald-400 shadow-[0_0_45px_rgba(52,211,153,0.25)]"
        >
          0{activeIndex + 1}
        </motion.div>

        {modes.map((mode, index) => {
          const angle = (index / modes.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 124;
          const y = Math.sin(angle) * 124;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={mode.id}
              animate={{
                opacity: isActive ? 1 : 0.38,
                scale: isActive ? 1.08 : 1,
              }}
              transition={{ duration: 0.35 }}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 border bg-black px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] ${
                isActive
                  ? "border-emerald-400 text-emerald-400"
                  : "border-white/25 text-white/45"
              }`}
            >
              {mode.title}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-emerald-400 lg:h-10 lg:w-10" />
      <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-emerald-400 lg:h-10 lg:w-10" />
      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-emerald-400 lg:h-10 lg:w-10" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-emerald-400 lg:h-10 lg:w-10" />
    </>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    function updateMatch() {
      setMatches(media.matches);
    }

    updateMatch();
    media.addEventListener("change", updateMatch);

    return () => {
      media.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
}