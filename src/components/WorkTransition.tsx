"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(0);

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

  const scanY = useTransform(smoothProgress, [0.04, 0.92], ["-18vh", "118vh"]);
  const scanOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.86, 0.96],
    [0, 1, 1, 0]
  );
  const scanGlow = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1.25, 0.9]);

  useEffect(() => {
    const modeTimer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modes.length);
    }, 1300);

    const loadingTimer = window.setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % loadingLines.length);
    }, 650);

    return () => {
      window.clearInterval(modeTimer);
      window.clearInterval(loadingTimer);
    };
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="relative bg-black text-white lg:h-[175vh]"
    >
      <div className="relative min-h-[100svh] overflow-hidden bg-black py-12 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-15 lg:bg-[size:96px_96px]" />

        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-[140px] lg:h-[560px] lg:w-[560px] lg:blur-[180px]" />

        <MovingBackgroundDetails />

        <motion.div
          style={{ y: scanY, opacity: scanOpacity, scaleY: scanGlow }}
          className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-[120px] bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent mix-blend-screen"
        />

        <motion.div
          style={{ y: scanY, opacity: scanOpacity }}
          className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-px bg-emerald-400 shadow-[0_0_38px_rgba(52,211,153,0.95)]"
        />

        <motion.div
          style={{ y: unlockY }}
          className="absolute inset-x-0 bottom-0 z-10 hidden h-full border-t border-emerald-400 bg-emerald-400/10 shadow-[0_-40px_120px_rgba(52,211,153,0.18)] lg:block"
        />

        <motion.div
          style={{ opacity: panelOpacity }}
          className="relative z-20 flex min-h-[100svh] items-center justify-center px-4 lg:h-full lg:px-6"
        >
          <div className="relative w-full max-w-md overflow-hidden border border-white/30 bg-black/[0.92] p-3 shadow-[0_0_120px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-5 md:max-w-2xl lg:h-[min(620px,calc(100vh-120px))] lg:max-w-6xl lg:p-7 xl:p-8">
            <Corners />

            <BuildModesInterfaceBackground />

            <div className="relative z-10 mb-5 flex flex-col gap-3 border-b border-white/20 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:justify-between md:text-xs md:tracking-[0.26em] lg:mb-6 lg:pb-5">
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

            <div className="relative z-10 grid gap-6 lg:h-[400px] lg:grid-cols-[310px_1fr] lg:items-center lg:gap-10">
              <LoaderCore activeIndex={activeIndex} />

              <div className="flex min-h-0 flex-col justify-center overflow-visible lg:h-full">
                <motion.p
                  key={`${activeMode.id}-command`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400 md:text-xs md:tracking-[0.34em]"
                >
                  {activeMode.id} / {activeMode.command}
                </motion.p>

                <div className="mt-4 overflow-visible lg:mt-5 lg:min-h-[150px]">
                  <motion.h2
                    key={`${activeMode.id}-title`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                    className="break-words font-mono text-[15vw] font-semibold uppercase leading-[0.92] tracking-[-0.065em] text-white sm:text-[52px] md:text-[64px] lg:text-[74px] xl:text-[82px]"
                  >
                    {activeMode.title}
                  </motion.h2>
                </div>

                <div className="mt-4 overflow-hidden lg:h-[74px]">
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

                <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:mt-6">
                  {activeMode.items.map((item, index) => (
                    <motion.div
                      key={`${activeMode.id}-${item}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="border border-white/20 bg-black/45 p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 backdrop-blur-sm"
                    >
                      <span className="text-emerald-400">0{index + 1}</span>
                      <p className="mt-3">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {loadingLines.map((step, index) => (
                <div
                  key={step}
                  className={`border p-3 font-mono text-[9px] uppercase leading-4 tracking-[0.14em] ${
                    index === loadingIndex
                      ? "border-emerald-400/70 bg-emerald-400/10 text-emerald-400"
                      : "border-white/20 bg-black/35 text-white/35"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-6 h-[3px] w-full bg-white/20 lg:bg-white">
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full origin-left bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.7)]"
              />
            </div>

            <p className="relative z-10 mt-5 text-center font-mono text-[9px] uppercase leading-5 tracking-[0.24em] text-white/35 sm:text-[10px] sm:tracking-[0.3em]">
              scroll to continue · selected work is loading
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: openingOpacity }}
          className="absolute inset-0 z-30 flex items-center justify-center px-6 text-center"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.38em] text-emerald-400">
              secure session connected
            </p>

            <h2 className="mt-6 font-mono text-[12vw] font-semibold uppercase leading-none tracking-[-0.08em] text-white md:text-[118px]">
              DEPLOYING PROJECTS
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
          className="flex h-[92px] w-[92px] items-center justify-center rounded-full border border-emerald-400/70 bg-emerald-400/10 font-mono text-3xl font-semibold text-emerald-400 shadow-[0_0_45px_rgba(52,211,153,0.25)]"
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

function BuildModesInterfaceBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(52,211,153,0.07)_0px,rgba(52,211,153,0.07)_1px,transparent_1px,transparent_22px)]" />

      <motion.div
        animate={{ x: ["-8%", "8%"], y: ["-4%", "4%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-12%] top-[10%] h-[520px] w-[520px] rounded-full border border-emerald-400/10"
      />

      <motion.div
        animate={{ x: ["8%", "-8%"], y: ["4%", "-4%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-18%] top-[18%] h-[620px] w-[620px] rounded-full border border-emerald-400/10"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute left-[14%] top-[23%] h-[360px] w-[360px] rounded-full border border-emerald-400/10 border-t-emerald-400/30"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        className="absolute right-[18%] top-[18%] h-[420px] w-[420px] rounded-full border border-white/5 border-r-emerald-400/20"
      />

      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_28%_45%,rgba(52,211,153,0.22),transparent_32%),radial-gradient(circle_at_72%_45%,rgba(52,211,153,0.12),transparent_34%)]"
      />

      <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-400/12" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-400/10" />

      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}

function MovingBackgroundDetails() {
  const drops = [
    { left: "7%", delay: 0, duration: 8, height: 90 },
    { left: "14%", delay: 1.2, duration: 10, height: 130 },
    { left: "22%", delay: 0.5, duration: 9, height: 70 },
    { left: "31%", delay: 2, duration: 11, height: 120 },
    { left: "43%", delay: 0.8, duration: 8.5, height: 95 },
    { left: "52%", delay: 1.6, duration: 10.5, height: 150 },
    { left: "61%", delay: 0.3, duration: 9.4, height: 80 },
    { left: "74%", delay: 2.4, duration: 12, height: 110 },
    { left: "86%", delay: 1, duration: 9.8, height: 140 },
    { left: "94%", delay: 1.9, duration: 10.8, height: 75 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        className="absolute top-[18%] h-px w-[42vw] bg-emerald-400/35 shadow-[0_0_28px_rgba(52,211,153,0.75)]"
      />

      <motion.div
        animate={{ x: ["120%", "-20%"] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[22%] h-px w-[34vw] bg-white/15"
      />

      <motion.div
        animate={{ y: ["-15%", "115%"] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "linear" }}
        className="absolute left-[18%] top-0 h-[45vh] w-px bg-emerald-400/20"
      />

      <motion.div
        animate={{ y: ["115%", "-15%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute right-[12%] top-0 h-[38vh] w-px bg-white/10"
      />

      {drops.map((drop, index) => (
        <motion.span
          key={index}
          initial={{ y: "-20vh", opacity: 0 }}
          animate={{
            y: "120vh",
            opacity: [0, 0.5, 0.15, 0],
          }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: drop.left,
            height: drop.height,
          }}
          className="absolute top-0 w-px bg-gradient-to-b from-transparent via-emerald-400/35 to-transparent"
        />
      ))}

      <motion.div
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(52,211,153,0.16),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(52,211,153,0.1),transparent_30%)]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:18px_18px] opacity-[0.035]" />
    </div>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-emerald-400 lg:h-10 lg:w-10" />
      <div className="absolute right-0 top-0 z-20 h-8 w-8 border-r-2 border-t-2 border-emerald-400 lg:h-10 lg:w-10" />
      <div className="absolute bottom-0 left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-emerald-400 lg:h-10 lg:w-10" />
      <div className="absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-emerald-400 lg:h-10 lg:w-10" />
    </>
  );
}
