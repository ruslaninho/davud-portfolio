"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const stages = [
  {
    id: "01",
    title: "DAVUD",
    sub: ".DEV",
    command: "init(davud)",
    caption: "creative developer / ai product builder",
    type: "identity",
    tags: ["code", "design", "ai systems"],
  },
  {
    id: "02",
    title: "GOAL",
    sub: "",
    command: "solve(problem)",
    caption: "messy business problems → clean digital systems",
    type: "goal",
    tags: ["clarity", "logic", "speed"],
  },
  {
    id: "03",
    title: "STACK",
    sub: "",
    command: "build(system)",
    caption: "next.js / react / typescript / supabase / ai",
    type: "stack",
    tags: ["next", "react", "ts", "ai"],
  },
  {
    id: "04",
    title: "SHIP",
    sub: "",
    command: "deploy(product)",
    caption: "idea → interface → working product",
    type: "ship",
    tags: ["launch", "test", "iterate"],
  },
] as const;

type Stage = (typeof stages)[number];

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.35,
  });

  const glowOpacity = useTransform(
    smoothProgress,
    [0, 0.45, 1],
    [0.18, 0.36, 0.18]
  );

  return (
    <section ref={sectionRef} className="relative h-[380vh] bg-black text-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />

        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 blur-[210px]"
        />

        <TopBar />

        <div className="absolute inset-0 top-12">
          <FrameLines />
          <Timeline scrollYProgress={smoothProgress} />

          {stages.map((stage, index) => (
            <StageScreen
              key={stage.id}
              stage={stage}
              index={index}
              scrollYProgress={smoothProgress}
            />
          ))}
        </div>

        <BottomProgress scrollYProgress={smoothProgress} />
      </div>
    </section>
  );
}

function TopBar() {
  return (
    <div className="absolute left-0 right-0 top-0 z-50 flex h-12 items-center justify-between border-b border-white/20 bg-black/85 px-6 font-mono text-xs uppercase tracking-[0.28em] text-white/65">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full border border-white/50" />
        <span className="h-3 w-3 rounded-full border border-white/50" />
        <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
      </div>

      <span>DAVUD.SYSTEM</span>

      <span className="text-emerald-400">LIVE</span>
    </div>
  );
}

function StageScreen({
  stage,
  index,
  scrollYProgress,
}: {
  stage: Stage;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / stages.length;
  const middle = start + 0.11;
  const end = index === stages.length - 1 ? 1 : start + 0.26;

  const opacity = useTransform(
    scrollYProgress,
    [start, middle, end],
    index === stages.length - 1 ? [0, 1, 1] : [0, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, middle, end],
    index === stages.length - 1 ? [70, 0, 0] : [70, 0, -60]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, middle, end],
    index === stages.length - 1 ? [0.98, 1, 1] : [0.98, 1, 1.01]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 z-20 flex items-center justify-center px-6 pb-20 pt-12"
    >
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
            {stage.id} / {stage.command}
          </p>

          <h2 className="mt-8 font-mono text-[18vw] font-black leading-none tracking-[-0.15em] md:text-[150px]">
            {stage.title}
          </h2>

          {stage.sub && (
            <p className="mt-2 font-mono text-3xl uppercase tracking-[-0.08em] text-white/75 md:text-5xl">
              {stage.sub}
            </p>
          )}

          <p className="mt-8 max-w-lg font-mono text-sm uppercase leading-7 text-white/50">
            {stage.caption}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {stage.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/25 bg-black px-4 py-2 font-mono text-xs uppercase text-white/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Module stage={stage} />
      </div>
    </motion.div>
  );
}

function Module({ stage }: { stage: Stage }) {
  if (stage.type === "identity") return <IdentityModule />;
  if (stage.type === "goal") return <GoalModule />;
  if (stage.type === "stack") return <StackModule />;
  return <ShipModule />;
}

function IdentityModule() {
  return (
    <div className="relative mx-auto flex h-[430px] w-full max-w-[520px] items-center justify-center">
      <SystemCore label="AI" />

      <div className="absolute left-4 top-8 border border-white/30 bg-black p-4 font-mono text-xs uppercase text-white/55">
        <p className="text-emerald-400">status</p>
        <p className="mt-2">creative system online</p>
      </div>

      <div className="absolute bottom-8 right-4 border border-white/30 bg-black p-4 font-mono text-xs uppercase text-white/55">
        <p className="text-emerald-400">mode</p>
        <p className="mt-2">build / design / ship</p>
      </div>
    </div>
  );
}

function GoalModule() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] border border-white/35 bg-black p-8">
      <Corners />

      <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
        problem.signal
      </p>

      <div className="mt-10 space-y-5 font-mono text-sm uppercase text-white/55">
        <Line active label="manual work detected" />
        <Line active label="weak flow detected" />
        <Line active label="system opportunity found" />
      </div>

      <div className="mt-10 border-t border-white/20 pt-6 font-mono text-3xl font-black uppercase tracking-[-0.08em] text-white">
        convert mess into structure
      </div>
    </div>
  );
}

function StackModule() {
  const items = ["NEXT", "REACT", "TS", "AI", "DB"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 850);

    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="relative mx-auto flex h-[460px] w-[460px] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute h-[360px] w-[360px] rounded-full border border-white/30 border-t-emerald-400"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute h-[250px] w-[250px] rounded-full border border-white/20 border-r-emerald-400"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute h-[360px] w-[360px]"
      >
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 180;
          const y = Math.sin(angle) * 180;
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={item}
              animate={{
                scale: isActive ? 1.16 : 1,
                opacity: isActive ? 1 : 0.55,
              }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className={`border bg-black px-4 py-2 font-mono text-xs uppercase ${
                isActive
                  ? "border-emerald-400 text-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.35)]"
                  : "border-white/35 text-white"
              }`}
            >
              {item}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute h-[165px] w-[165px] rounded-full border border-emerald-400/60 bg-emerald-400/10" />

      <div className="relative z-10 text-center font-mono">
        <p className="text-5xl font-black tracking-[-0.12em] text-emerald-400">
          {"</>"}
        </p>
      </div>

      <div className="absolute bottom-0 font-mono text-xs uppercase tracking-[0.28em] text-white/40">
        active: <span className="text-emerald-400">{items[activeIndex]}</span>
      </div>
    </div>
  );
}

function ShipModule() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] border border-white/35 bg-black p-8 font-mono uppercase">
      <Corners />

      <p className="text-xs tracking-[0.34em] text-emerald-400">
        deployment
      </p>

      <div className="mt-10 space-y-4 text-sm text-white/55">
        <p>
          <span className="text-emerald-400">$</span> npm run launch
        </p>
        <p className="text-emerald-400">✓ interface deployed</p>
        <p>✓ system ready</p>
        <p>✓ selected projects only</p>
      </div>

      <div className="mt-12 border-t border-white/20 pt-6 text-4xl font-black tracking-[-0.1em] text-white">
        READY
      </div>
    </div>
  );
}

function SystemCore({ label }: { label: string }) {
  return (
    <div className="relative flex h-[330px] w-[330px] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute h-[280px] w-[280px] rounded-full border border-white/30 border-t-emerald-400"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute h-[200px] w-[200px] rounded-full border border-white/20 border-r-emerald-400"
      />

      <div className="absolute h-[125px] w-[125px] rounded-full border border-emerald-400/60 bg-emerald-400/10" />

      <div className="relative z-10 text-center font-mono">
        <p className="text-4xl font-black tracking-[-0.12em] text-emerald-400">
          {label}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/40">
          system
        </p>
      </div>

      <span className="absolute left-6 top-20 h-2 w-2 rounded-full bg-white" />
      <span className="absolute bottom-16 right-8 h-2 w-2 rounded-full bg-emerald-400" />
      <span className="absolute right-14 top-8 h-2 w-2 rounded-full bg-white" />
    </div>
  );
}

function Timeline({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 md:flex">
      {stages.map((stage, index) => (
        <TimelineItem
          key={stage.id}
          index={index}
          stage={stage}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function TimelineItem({
  stage,
  index,
  scrollYProgress,
}: {
  stage: Stage;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / stages.length;
  const middle = start + 0.11;
  const end = index === stages.length - 1 ? 1 : start + 0.26;

  const opacity = useTransform(
    scrollYProgress,
    [start, middle, end],
    index === stages.length - 1 ? [0.35, 1, 1] : [0.35, 1, 0.35]
  );

  const x = useTransform(
    scrollYProgress,
    [start, middle, end],
    index === stages.length - 1 ? [-8, 0, 0] : [-8, 0, -8]
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em]"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <span className="text-white/65">{stage.id}</span>
      <span className="text-white/35">{stage.title}</span>
    </motion.div>
  );
}

function FrameLines() {
  return (
    <>
      <div className="absolute left-8 top-8 h-9 w-9 border-l border-t border-white/60" />
      <div className="absolute right-8 top-8 h-9 w-9 border-r border-t border-white/60" />
      <div className="absolute bottom-8 left-8 h-9 w-9 border-b border-l border-white/60" />
      <div className="absolute bottom-8 right-8 h-9 w-9 border-b border-r border-white/60" />

      <div className="absolute left-[12%] top-[25%] h-px w-52 bg-white/25" />
      <div className="absolute left-[12%] top-[25%] h-20 w-px bg-white/25" />

      <div className="absolute right-[12%] top-[28%] h-px w-52 bg-emerald-400/55" />
      <div className="absolute right-[12%] top-[28%] h-20 w-px bg-emerald-400/55" />

      <div className="absolute bottom-[20%] left-[18%] h-px w-72 bg-white/20" />
      <div className="absolute bottom-[20%] right-[18%] h-px w-72 bg-white/20" />
    </>
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

function Line({ label, active }: { label: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/15 pb-3">
      <span>{label}</span>
      <span className={active ? "text-emerald-400" : "text-white/30"}>
        {active ? "true" : "false"}
      </span>
    </div>
  );
}

function BottomProgress({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50">
      <div className="h-[3px] w-full bg-white">
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="h-full origin-left bg-emerald-400"
        />
      </div>
    </div>
  );
}