"use client";

import { motion } from "motion/react";
import { MouseEvent, useEffect, useState } from "react";

const navItems = [
    { label: "~/home", href: "#home", status: "home selected" },
    { label: "~/system", href: "#system", status: "system selected" },
    { label: "~/work", href: "#work", status: "work index selected" },
    { label: "~/contact", href: "#contact", status: "contact selected" },
];

const skills = [
    "Full Stack",
    "UI/UX",
    "AI Workflows",
    "Digital Systems",
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
    "Webflow",
];

const websites = [
    "skicenter.az",
    "padelcenter.az",
    "okee.agency",
    "whitestone.az",
    "davudbaghir.com",
];

const meta = [
    { label: "base", value: "Baku" },
    { label: "mode", value: "remote/local" },
    { label: "focus", value: "creative code" },
    { label: "status", value: "available" },
];

const profileRows = [
    { label: "user", value: "DAVUD" },
    { label: "role", value: "Web/System Developer" },
    { label: "system", value: "Web / AI / Brand" },
    { label: "stack", value: "Next + React + Webflow" },
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
            className="relative min-h-[100svh] overflow-hidden bg-black text-white lg:h-[100svh]"
        >
            <Background spotlight={spotlight} />

            <header className="relative z-30 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px]">
                <motion.a
                    href="#home"
                    whileHover={{ x: 4 }}
                    onMouseEnter={() => setStatus("davud.dev active")}
                    className="flex items-center gap-3 font-mono text-sm"
                >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
                    <span className="font-semibold">davud</span>
                    <span className="text-white/35">.dev</span>
                </motion.a>

                <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.14em] text-white/35 md:flex">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.href}
                            href={item.href}
                            whileHover={{ y: -2 }}
                            onMouseEnter={() => setStatus(item.status)}
                            className="transition hover:text-emerald-400"
                        >
                            {item.label}
                        </motion.a>
                    ))}
                </nav>

                <div className="hidden border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400 lg:block">
                    {status}
                </div>
            </header>

            <section className="relative z-20 mx-auto min-h-[calc(100svh-64px)] max-w-7xl px-3 pb-3 sm:px-6 lg:h-[calc(100svh-72px)] lg:min-h-0 lg:px-6 lg:pb-4">
                <motion.div
                    initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.75,
                        delay: 0.1,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="relative flex min-h-[calc(100svh-76px)] w-full overflow-hidden border border-emerald-400/55 bg-[#030806]/95 p-3 shadow-[0_0_130px_rgba(16,185,129,0.16)] sm:p-4 lg:h-full lg:min-h-0"
                >
                    <Corners />

                    <motion.div
                        animate={{ x: ["-20%", "120%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="pointer-events-none absolute top-0 h-px w-80 bg-emerald-400 shadow-[0_0_28px_rgba(52,211,153,0.9)]"
                    />

                    <div className="absolute inset-0 opacity-[0.045]">
                        <div className="h-full w-full bg-[repeating-linear-gradient(115deg,white_0px,white_1px,transparent_1px,transparent_18px)]" />
                    </div>

                    <div className="relative z-10 flex w-full flex-col lg:min-h-0">
                        <div className="mb-3 flex items-center justify-between border-b border-emerald-400/20 pb-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/45 sm:text-[10px]">
                            <span className="text-emerald-400">davud.os / hero.interface</span>
                            <span className="hidden text-white/45 sm:block">{status}</span>
                        </div>

                        <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[0.95fr_1.05fr]">
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
            whileHover={{ y: -3 }}
            onMouseEnter={() => setStatus("creative profile selected")}
            className="relative flex flex-col overflow-hidden border border-emerald-400/35 bg-emerald-400/[0.035] p-3 sm:p-4 lg:min-h-0"
        >
            <div className="mb-3 flex items-center justify-between">
                <PanelLabel label="initializing user..." />
                <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 sm:block">
                    creative.profile
                </span>
            </div>

            <div className="grid gap-3 md:grid-cols-[160px_1fr] lg:min-h-0 lg:grid-cols-[180px_1fr]">
                <ProfileVisual />

                <div className="border border-emerald-400/25 bg-black/55 p-3 sm:p-4 lg:min-h-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-emerald-400">
                        who am i ??
                    </p>

                    <div className="mt-3 space-y-1.5">
                        {profileRows.map((row) => (
                            <TerminalRow key={row.label} label={row.label} value={row.value} />
                        ))}
                    </div>

                    <div className="mt-4 border-t border-emerald-400/15 pt-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-emerald-400">
                            uname -a
                        </p>

                        <p className="mt-2 font-mono text-[10px] leading-5 text-white/45">
                            creative-os / baku / selected-builds / frontend-system
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-3 flex flex-col border border-emerald-400/25 bg-black/55 p-3 sm:p-4 lg:min-h-0 lg:flex-1">
                <TypewriterHeroTitle />
                <TypewriterHeroDescription />

                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:mt-auto lg:pt-3">
                    <motion.a
                        href="#contact"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setStatus("contact command ready")}
                        className="bg-emerald-400 px-4 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-[0_0_28px_rgba(52,211,153,0.22)]"
                    >
                        start brief
                    </motion.a>

                    <motion.a
                        href="#work"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setStatus("opening selected work")}
                        className="border border-white/20 bg-black/70 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 transition hover:border-emerald-400 hover:text-emerald-400"
                    >
                        $ ls work/
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}

function TypewriterHeroTitle() {
    const fullText = "Hi, I am\nDavud";
    const [typedText, setTypedText] = useState("");

    useEffect(() => {

        let index = 0;

        const timer = window.setInterval(() => {
            index += 1;
            setTypedText(fullText.slice(0, index));

            if (index >= fullText.length) {
                window.clearInterval(timer);
            }
        }, 55);

        return () => {
            window.clearInterval(timer);
        };
    }, []);

    const lines = typedText.split("\n");

    return (
        <h1 className="min-h-[1.8em] font-mono text-[clamp(2rem,11vw,4.7rem)] font-medium leading-[0.92] tracking-[-0.055em] text-white lg:text-[clamp(3rem,4.2vw,4.5rem)]">
            {lines.map((line, index) => (
                <span key={index}>
                    {line}
                    {index < lines.length - 1 && <br />}
                </span>
            ))}

            <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-2 inline-block h-[0.12em] w-[0.8em] translate-y-[0.04em] bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.8)]"
            />
        </h1>
    );
}

function TypewriterHeroDescription() {
    const fullText =
        "build.websites({ dashboards: true, aiWorkflows: true, sharperSystems: true })";

    const [typedText, setTypedText] = useState("");

    useEffect(() => {

        let index = 0;

        const timer = window.setInterval(() => {
            index += 1;
            setTypedText(fullText.slice(0, index));

            if (index >= fullText.length) {
                window.clearInterval(timer);
            }
        }, 26);

        return () => {
            window.clearInterval(timer);
        };
    }, []);

    return (
        <div className="mt-3 min-h-[44px] overflow-hidden border border-emerald-400/15 bg-black/45 px-3 py-2 font-mono text-[9px] leading-5 tracking-[0.08em] sm:text-[10px]">
            <span className="text-emerald-400">$ </span>
            <span className="text-white/45">davud</span>
            <span className="text-white/25">.</span>
            <span className="break-all text-cyan-300 sm:break-normal">{typedText}</span>

            <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-emerald-400"
            />
        </div>
    );
}

function RightDashboard({
    setStatus,
}: {
    setStatus: (value: string) => void;
}) {
    return (
        <div className="grid gap-3 lg:min-h-0 lg:grid-rows-[auto_0.8fr_1fr]">
            <MetaBar setStatus={setStatus} />
            <SkillsPanel setStatus={setStatus} />

            <div className="hidden min-h-0 gap-3 md:grid md:grid-cols-[1.05fr_0.95fr]">
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
        <div className="border border-emerald-400/25 bg-black/55 p-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {meta.map((item) => (
                    <motion.div
                        key={item.label}
                        whileHover={{ y: -2 }}
                        onMouseEnter={() => setStatus(`${item.label}: ${item.value}`)}
                        className={`border px-3 py-2 font-mono text-[9px] uppercase ${
                            item.label === "status"
                                ? "border-emerald-400 bg-emerald-400/10"
                                : "border-white/15 bg-black"
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
        </div>
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
            className="flex flex-col overflow-hidden border border-emerald-400/25 bg-black/55 p-3 sm:p-4 lg:min-h-0"
        >
            <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
                    services loaded
                </p>

                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                    06 active
                </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex-1">
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
            className="flex min-h-0 flex-col overflow-hidden border border-emerald-400/25 bg-black/55 p-4"
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
            className="flex min-h-0 flex-col overflow-hidden border border-emerald-400/25 bg-black/55 p-4"
        >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
                developer tools
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                    <motion.span
                        key={tool}
                        whileHover={{ y: -3, scale: 1.04 }}
                        onMouseEnter={() => setStatus(`${tool} module active`)}
                        className="cursor-default border border-white/20 bg-emerald-400/10 px-3 py-2 font-mono text-[10px] uppercase text-white/65 transition hover:border-emerald-400 hover:text-emerald-400"
                    >
                        {tool}
                    </motion.span>
                ))}
            </div>

            <div
                onMouseEnter={() => setStatus("build with taste, ship with logic")}
                className="mt-auto hidden border border-emerald-400/35 bg-emerald-400/10 p-3 font-mono text-[10px] uppercase leading-5 text-white/55 lg:block"
            >
                <span className="text-emerald-400">$</span> build with taste, ship with
                logic.
            </div>
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
            whileHover={{ y: -4, scale: 1.03, opacity: 1 }}
            onMouseEnter={onHover}
            className="flex min-h-12 items-center border border-white/15 bg-emerald-400/10 px-3 py-3 font-mono text-[10px] uppercase leading-4 text-white/65 transition hover:border-emerald-400 hover:text-emerald-400"
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

function ProfileVisual() {
    return (
        <div className="relative hidden min-h-[170px] overflow-hidden border border-emerald-400/25 bg-black md:block">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.22),transparent_56%)]" />

            <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-[58px] font-medium leading-none tracking-[-0.08em] text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.6)]">
                    DB
                </p>

                <div className="mt-3 h-[2px] w-full bg-emerald-400/70" />

                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
                    profile visual
                </p>
            </div>
        </div>
    );
}

function TerminalRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="grid grid-cols-[76px_1fr] gap-3 font-mono text-[10px] leading-5">
            <span className="text-white/40">{label}</span>
            <span className="text-emerald-400">: {value}</span>
        </div>
    );
}

function PanelLabel({ label }: { label: string }) {
    return (
        <div className="border border-emerald-400 bg-[#06150f] px-3 py-2 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-400 sm:text-[9px]">
            {label}
        </div>
    );
}

function Background({ spotlight }: { spotlight: { x: number; y: number } }) {
    return (
        <>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-20 lg:bg-[size:96px_96px]" />

            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(52,211,153,0.13), transparent 34%)`,
                }}
            />

            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[180px]" />
        </>
    );
}

function Corners() {
    return (
        <>
            <div className="absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-emerald-400 sm:h-9 sm:w-9" />
            <div className="absolute right-0 top-0 h-7 w-7 border-r-2 border-t-2 border-emerald-400 sm:h-9 sm:w-9" />
            <div className="absolute bottom-0 left-0 h-7 w-7 border-b-2 border-l-2 border-emerald-400 sm:h-9 sm:w-9" />
            <div className="absolute bottom-0 right-0 h-7 w-7 border-b-2 border-r-2 border-emerald-400 sm:h-9 sm:w-9" />
        </>
    );
}