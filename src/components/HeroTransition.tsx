"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function HeroTransition() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldType, setShouldType] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const lineScale = useTransform(smoothProgress, [0.05, 0.65], [0, 1]);

  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0]
  );

  const openingY = useTransform(smoothProgress, [0, 0.55, 1], [40, 0, -40]);

  const glowScale = useTransform(
    smoothProgress,
    [0, 0.55, 1],
    [0.75, 1.15, 1.4]
  );

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setShouldType(latest > 0.24 && latest < 0.9);
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[135vh] overflow-hidden bg-black text-white"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20 lg:bg-[size:96px_96px]" />

        <motion.div
          style={{ scale: glowScale }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-[190px]"
        />

        <motion.div
          style={{ opacity: overlayOpacity, y: openingY }}
          className="relative z-10 flex w-full flex-col items-center justify-center px-4 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-emerald-400 sm:text-xs">
            identity verified
          </p>

          <TransitionTypewriter active={shouldType} />

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.34em] text-white/35 sm:text-xs">
            work.engine
          </p>
        </motion.div>

        <div className="absolute left-0 right-0 top-1/2 z-20 h-px bg-emerald-400/25">
          <motion.div
            style={{ scaleX: lineScale }}
            className="h-full origin-left bg-emerald-400 shadow-[0_0_32px_rgba(52,211,153,0.95)]"
          />
        </div>

        <motion.div
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-10 left-6 right-6 z-20 h-[3px] origin-left bg-emerald-400 sm:left-12 sm:right-12"
        />

        <div className="absolute bottom-16 left-6 right-6 z-20 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-white/30 sm:left-12 sm:right-12 sm:text-[10px]">
          <span>auth profile</span>
          <span className="text-emerald-400">decrypt builds</span>
          <span>mount work</span>
        </div>

        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="absolute top-[calc(50%-80px)] z-20 h-px w-80 bg-emerald-400/70 shadow-[0_0_26px_rgba(52,211,153,0.9)]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.82)_100%)]" />
      </div>
    </section>
  );
}

function TransitionTypewriter({ active }: { active: boolean }) {
  const fullText = "ACCESSING";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!active) {
      return;
    }

    let index = 0;
{active ? typedText : ""}
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));

      if (index >= fullText.length) {
        window.clearInterval(timer);
      }
    }, 95);

    return () => {
      window.clearInterval(timer);
    };
  }, [active]);

  return (
    <h2 className="mt-6 min-h-[1em] font-mono text-[15vw] font-semibold uppercase leading-none tracking-[-0.08em] text-white/85 sm:text-[110px] lg:text-[140px]">
      {typedText}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-3 inline-block h-[0.11em] w-[0.7em] translate-y-[0.03em] bg-emerald-400 shadow-[0_0_28px_rgba(52,211,153,0.9)]"
      />
    </h2>
  );
}