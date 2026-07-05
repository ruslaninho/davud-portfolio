"use client";

import { motion } from "motion/react";
import { MouseEvent, useState } from "react";

const navItems = [
    { label: "~/home", href: "#home", status: "home selected" },
    { label: "~/system", href: "#system", status: "system selected" },
    { label: "~/work", href: "#work", status: "work index selected" },
    { label: "~/contact", href: "#contact", status: "contact selected" },
];

const skills = [
    "Web Development",
    "UI/UX Direction",
    "AI Workflows",
    "Brand Systems",
    "Automation",
    "Landing Pages",
];

const tools = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Supabase",
    "Figma",
    "AI",
];

const websites = [
    "skicenter.az",
    "padelcenter.az",
    "okee.agency",
    "whitestone.az",
    "cheechak.az",
];

const meta = [
    { label: "base", value: "Baku" },
    { label: "mode", value: "remote / local" },
    { label: "focus", value: "creative code" },
    { label: "status", value: "selected" },
];

export default function Hero() {
    const [status, setStatus] = useState("creative system online");
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

    function handleMouseMove(event: MouseEvent<HTMLElement>) {
        const rect = event.currentTarget.getBoundingClientRect();

        setSpotlight({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
        });
    }

    return (
        <main
            id="home"
            onMouseMove={handleMouseMove}
            className="relative min-h-screen overflow-hidden bg-black text-white"
        >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />

            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(52,211,153,0.13), transparent 34%)`,
                }}
            />

            <header className="relative z-30 mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
                <motion.div
                    whileHover={{ x: 4 }}
                    onMouseEnter={() => setStatus("davud.dev active")}
                    className="flex items-center gap-3 font-mono text-sm"
                >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
                    <span className="font-semibold">davud</span>
                    <span className="text-white/35">.dev</span>
                </motion.div>

                <nav className="hidden items-center gap-10 font-mono text-sm text-white/35 md:flex">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            whileHover={{ y: -2, color: "rgb(52,211,153)" }}
                            onMouseEnter={() => setStatus(item.status)}
                            className="cursor-pointer"
                        >
                            {item.label}
                        </motion.a>
                    ))}
                </nav>

                <motion.button
                    whileHover={{ scale: 1.04, borderColor: "rgba(52,211,153,0.8)" }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setStatus("theme control ready")}
                    className="border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/45"
                >
                    theme
                </motion.button>
            </header>

            <section className="relative z-20 mx-auto h-[calc(100vh-76px)] max-w-7xl px-6 pb-5">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                    className="relative flex h-full w-full overflow-hidden border border-emerald-400/45 bg-black p-4 shadow-[0_0_110px_rgba(16,185,129,0.14)]"
                >
                    <Corners />

                    <motion.div
                        animate={{ y: ["-10%", "115%"] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-emerald-400/80 shadow-[0_0_28px_rgba(52,211,153,0.9)]"
                    />

                    <div className="flex h-full w-full flex-col">
                        <div className="mb-3 flex items-center justify-between border-b border-white/20 pb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
                            <span>davud.os / hero.interface</span>
                            <span className="text-emerald-400">{status}</span>
                        </div>

                        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_1fr]">
                            <CreativeProfile setStatus={setStatus} />
                            <RightDashboard setStatus={setStatus} />
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}

function CreativeProfile({
    setStatus,
}: {
    setStatus: (value: string) => void;
}) {
    return (
        <motion.div
            whileHover={{
                y: -3,
                borderColor: "rgba(52,211,153,0.8)",
            }}
            onMouseEnter={() => setStatus("creative profile selected")}
            className="relative flex h-full min-h-0 flex-col overflow-hidden border border-white/25 bg-white/[0.02] p-5"
        >
            <div className="mb-4 inline-flex w-fit items-center gap-3 border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                available · selected work
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-emerald-400">
                creative profile
            </p>

            <h1 className="mt-4 font-mono text-[10vw] font-black leading-[0.82] tracking-[-0.16em] md:text-[78px] lg:text-[88px] xl:text-[96px]">
                <span className="text-white/25">$</span> hi,
                <br />
                I&apos;m
                <br />
                <span className="inline-flex items-end text-emerald-400 drop-shadow-[0_0_28px_rgba(52,211,153,0.35)]">
                    Davud
                    <motion.span
                        aria-hidden="true"
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="ml-2 mb-1 inline-block h-[0.72em] w-[0.075em] bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]"
                    />
                </span>
            </h1>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                Creative Developer / AI Product Builder / Founder
            </p>

            <p className="mt-4 max-w-xl font-mono text-[11px] uppercase leading-6 text-white/58">
                I build websites, dashboards, AI workflows and digital systems for
                brands that want to look sharper, move faster and convert better.
            </p>

            <div className="mt-auto pt-5">
                <div className="flex flex-wrap items-center gap-3">
                    <motion.a
                        href='#contact'
                        whileHover={{
                            y: -3,
                            boxShadow: "0 0 35px rgba(52,211,153,0.28)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setStatus("contact command ready")}
                        className="cursor-pointer bg-emerald-400 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-black"
                    >
                        → get in touch
                    </motion.a>

                    <motion.a
                        href="#work"
                        whileHover={{
                            y: -3,
                            borderColor: "rgba(52,211,153,0.8)",
                            color: "rgb(52,211,153)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setStatus("opening selected work")}
                        className="cursor-pointer border border-white/20 bg-black px-5 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/75"
                    >
                        $ ls work/
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}

function RightDashboard({
    setStatus,
}: {
    setStatus: (value: string) => void;
}) {
    return (
        <div className="grid min-h-0 h-full grid-rows-[auto_0.9fr_1fr] gap-3">
            <MetaBar setStatus={setStatus} />
            <SkillsPanel setStatus={setStatus} />

            <div className="grid min-h-0 gap-3 md:grid-cols-[1.05fr_0.95fr]">
                <WebsitesPanel setStatus={setStatus} />
                <ToolsPanel setStatus={setStatus} />
            </div>
        </div>
    );
}

function MetaBar({
    setStatus,
}: {
    setStatus: (value: string) => void;
}) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="border border-white/25 bg-white/[0.02] p-3"
        >
            <div className="grid grid-cols-4 gap-2">
                {meta.map((item) => (
                    <motion.div
                        key={item.label}
                        whileHover={{
                            y: -2,
                            borderColor: "rgba(52,211,153,0.9)",
                        }}
                        onMouseEnter={() => setStatus(`${item.label}: ${item.value}`)}
                        className={`border px-3 py-2 font-mono text-[10px] uppercase ${item.label === "status"
                            ? "border-emerald-400 bg-emerald-400/10"
                            : "border-white/20 bg-black"
                            }`}
                    >
                        <p className="text-white/35">{item.label}</p>
                        <p
                            className={
                                item.label === "status"
                                    ? "mt-1 text-emerald-400"
                                    : "mt-1 text-white/65"
                            }
                        >
                            {item.value}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function SkillsPanel({
    setStatus,
}: {
    setStatus: (value: string) => void;
}) {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="flex min-h-0 flex-col overflow-hidden border border-white/25 bg-white/[0.02] p-4"
        >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
                core skills
            </p>

            <div className="mt-4 grid flex-1 grid-cols-2 gap-2 md:grid-cols-3">
                {skills.map((skill, index) => (
                    <InteractiveCell
                        key={skill}
                        label={skill}
                        delay={index * 0.04}
                        onHover={() => setStatus(`${skill.toLowerCase()} loaded`)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function WebsitesPanel({
    setStatus,
}: {
    setStatus: (value: string) => void;
}) {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="flex min-h-0 flex-col overflow-hidden border border-white/25 bg-white/[0.02] p-4"
        >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
                websites built
            </p>

            <div className="mt-4 flex-1 space-y-2">
                {websites.map((site) => (
                    <WebsiteRow
                        key={site}
                        site={site}
                        onHover={() => setStatus(`${site} preview ready`)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

function ToolsPanel({
    setStatus,
}: {
    setStatus: (value: string) => void;
}) {
    return (
        <motion.div
            whileHover={{ y: -3 }}
            className="flex min-h-0 flex-col overflow-hidden border border-white/25 bg-white/[0.02] p-4"
        >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
                tools
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                    <motion.span
                        key={tool}
                        whileHover={{
                            y: -3,
                            scale: 1.04,
                            borderColor: "rgba(52,211,153,0.9)",
                            color: "rgb(52,211,153)",
                        }}
                        onMouseEnter={() => setStatus(`${tool} module active`)}
                        className="cursor-default border border-white/25 bg-black px-3 py-2 font-mono text-[10px] uppercase text-white/65"
                    >
                        {tool}
                    </motion.span>
                ))}
            </div>

            <motion.div
                whileHover={{
                    borderColor: "rgba(52,211,153,0.9)",
                    backgroundColor: "rgba(52,211,153,0.14)",
                }}
                onMouseEnter={() => setStatus("build with taste, ship with logic")}
                className="mt-auto border border-emerald-400/45 bg-emerald-400/10 p-3 font-mono text-[10px] uppercase leading-5 text-white/55"
            >
                <span className="text-emerald-400">$</span> build with taste, ship with
                logic.
            </motion.div>
        </motion.div>
    );
}

function InteractiveCell({
    label,
    delay,
    onHover,
}: {
    label: string;
    delay: number;
    onHover: () => void;
}) {
    return (
        <motion.div
            animate={{
                opacity: [0.55, 1, 0.55],
            }}
            transition={{
                duration: 2.6,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
            whileHover={{
                y: -4,
                scale: 1.03,
                opacity: 1,
                borderColor: "rgba(52,211,153,0.95)",
                color: "rgb(52,211,153)",
            }}
            onMouseEnter={onHover}
            className="flex items-center border border-white/20 bg-black px-3 py-3 font-mono text-[10px] uppercase leading-4 text-white/60"
        >
            {label}
        </motion.div>
    );
}

function WebsiteRow({
    site,
    onHover,
}: {
    site: string;
    onHover: () => void;
}) {
    return (
        <motion.div
            whileHover={{ x: 5 }}
            onMouseEnter={onHover}
            className="group flex cursor-default items-center justify-between border-b border-white/15 pb-2 font-mono text-[10px] uppercase"
        >
            <span className="text-white/60 transition group-hover:text-emerald-400">
                {site}
            </span>

            <span className="text-emerald-400">live</span>
        </motion.div>
    );
}

function Corners() {
    return (
        <>
            <div className="absolute left-0 top-0 h-9 w-9 border-l-2 border-t-2 border-emerald-400" />
            <div className="absolute right-0 top-0 h-9 w-9 border-r-2 border-t-2 border-emerald-400" />
            <div className="absolute bottom-0 left-0 h-9 w-9 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-0 right-0 h-9 w-9 border-b-2 border-r-2 border-emerald-400" />
        </>
    );
}