"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const bootLines = [
  {
    command: "create davud.dev",
    output: "portfolio interface initialized",
  },
  {
    command: "load profile --creative-developer",
    output: "code, design, automation, AI systems",
  },
  {
    command: "compile projects",
    output: "LeadFlow, Okee systems, dashboards, web products",
  },
  {
    command: "optimize experience",
    output: "minimal, sharp, fast, interactive",
  },
  {
    command: "launch",
    output: "ready",
  },
];

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  const activeLine = useMemo(() => {
    return Math.min(
      Math.floor((progress / 100) * bootLines.length),
      bootLines.length - 1
    );
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 42);

    const timeout = setTimeout(() => {
      onFinish();
    }, 2850);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.025,
        filter: "blur(14px)",
      }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050605] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.16),transparent_34%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px] opacity-70" />

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(52,211,153,0.13)_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-[90%] max-w-3xl overflow-hidden rounded-2xl border border-emerald-400/25 bg-[#101110]/95 shadow-[0_0_90px_rgba(16,185,129,0.10)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 font-mono text-xs text-white/35">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
          </div>

          <span>~/boot-portfolio.sh</span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            compiling
          </span>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-400/70">
                davud.dev
              </p>

              <h2 className="mt-3 font-mono text-3xl font-bold tracking-[-0.07em] md:text-5xl">
                building interface
              </h2>
            </div>

            <div className="hidden text-right font-mono text-xs text-white/35 md:block">
              <p>system</p>
              <p className="mt-1 text-emerald-400">online</p>
            </div>
          </div>

          <div className="space-y-4 font-mono text-sm">
            {bootLines.map((line, index) => {
              const isActive = index === activeLine;
              const isDone = index < activeLine;

              return (
                <motion.div
                  key={line.command}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: isDone || isActive ? 1 : 0.28,
                    y: 0,
                  }}
                  transition={{ delay: index * 0.12, duration: 0.35 }}
                  className="grid gap-1 border-l border-white/10 pl-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        isDone || isActive
                          ? "text-emerald-400"
                          : "text-white/25"
                      }
                    >
                      $
                    </span>

                    <span
                      className={
                        isActive
                          ? "text-white"
                          : isDone
                            ? "text-white/60"
                            : "text-white/25"
                      }
                    >
                      {line.command}
                    </span>

                    {isActive && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity }}
                        className="h-4 w-2 bg-emerald-400"
                      />
                    )}
                  </div>

                  {(isDone || isActive) && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="pl-6 text-white/35"
                    >
                      → {line.output}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-9">
            <div className="mb-3 flex items-center justify-between font-mono text-xs text-white/35">
              <span>loading experience</span>
              <span>{progress}%</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.18 }}
                className="h-full rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}