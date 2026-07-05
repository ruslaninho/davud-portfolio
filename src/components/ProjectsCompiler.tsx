"use client";

import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Project = {
    id: string;
    slug: string;
    name: string;
    url: string;
    type: string;
    description: string;
    tags: string[];
    image_url: string | null;
    sort_order: number;
};

const fallbackProjects: Project[] = [
    {
        id: "01",
        slug: "ski-center",
        name: "Ski Center",
        url: "skicenter.az",
        type: "Premium sports website",
        description:
            "A sharp digital presence for an indoor ski experience. Premium, energetic and built around action.",
        tags: ["website", "sports", "premium", "ux"],
        image_url: "/work/skicenter.jpg",
        sort_order: 1,
    },
    {
        id: "02",
        slug: "padel-center",
        name: "Padel Center",
        url: "padelcenter.az",
        type: "Sports booking / brand website",
        description:
            "A dynamic website experience for a padel brand, focused on clarity, energy and booking behavior.",
        tags: ["website", "sport", "booking", "brand"],
        image_url: "/work/padelcenter.jpg",
        sort_order: 2,
    },
];

export default function ProjectsCompiler() {
    const sectionRef = useRef<HTMLElement | null>(null);

    const [projects, setProjects] = useState<Project[]>(fallbackProjects);
    const [backendStatus, setBackendStatus] = useState("connecting backend");
    const [activeId, setActiveId] = useState<string>(fallbackProjects[0].id);
    const [loadedCount, setLoadedCount] = useState(0);
    const [bootDone, setBootDone] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 22,
        mass: 0.4,
    });

    useEffect(() => {
        async function loadProjects() {
            const { data, error } = await supabase
                .from("projects")
                .select(
                    "id, slug, name, url, type, description, tags, image_url, sort_order"
                )
                .eq("is_featured", true)
                .order("sort_order", { ascending: true });

            if (error) {
                console.error(error);
                setBackendStatus("backend fallback active");
                return;
            }

            if (!data || data.length === 0) {
                setBackendStatus("no backend projects found");
                return;
            }

            setProjects(data);
            setActiveId(data[0].id);
            setLoadedCount(0);
            setBootDone(false);
            setBackendStatus("backend connected");
        }

        loadProjects();
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const total = projects.length;

        const nextLoadedCount = Math.min(
            total,
            Math.max(0, Math.floor(latest * (total + 1.2)))
        );

        setLoadedCount(nextLoadedCount);
        setBootDone(latest > 0.82);

        if (nextLoadedCount > 0 && latest < 0.86) {
            const activeIndex = Math.min(nextLoadedCount - 1, total - 1);
            setActiveId(projects[activeIndex].id);
        }
    });

    const activeProject =
        projects.find((project) => project.id === activeId) ?? projects[0];

    return (
        <section
            id="work"
            ref={sectionRef}
            className="relative h-[240vh] bg-black text-white"
        >
            <div className="sticky top-0 h-screen overflow-hidden bg-black px-6 py-8">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />

                <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col">
                    <div className="mb-6 grid gap-6 border-b border-white/20 pb-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-emerald-400">
                                work.index / scroll to mount
                            </p>

                            <h2 className="mt-3 font-mono text-[15vw] font-black leading-none tracking-[-0.15em] md:text-[78px]">
                                WORK
                            </h2>
                        </div>

                        <div className="md:justify-self-end">
                            <div className="mb-3 flex items-center justify-between gap-6 border border-white/20 bg-black px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                                <span className="text-white/40">{backendStatus}</span>
                                <span className="text-emerald-400">
                                    {bootDone
                                        ? "index ready"
                                        : loadedCount === 0
                                            ? "waiting for scroll"
                                            : `mounting ${loadedCount}/${projects.length}`}
                                </span>
                            </div>

                            <div className="h-[3px] w-full bg-white md:w-[420px]">
                                <motion.div
                                    style={{ scaleX: smoothProgress }}
                                    className="h-full origin-left bg-emerald-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-[0.82fr_1.18fr]">
                        <div className="space-y-2">
                            {projects.map((project, index) => {
                                const isLoaded = index < loadedCount;

                                return (
                                    <ProjectRow
                                        key={project.id}
                                        project={project}
                                        displayId={String(index + 1).padStart(2, "0")}
                                        isLoaded={isLoaded}
                                        isActive={project.id === activeId && isLoaded}
                                        index={index}
                                        onActivate={() => {
                                            if (isLoaded) setActiveId(project.id);
                                        }}
                                    />
                                );
                            })}
                        </div>

                        <div className="relative hidden min-h-0 lg:block">
                            {loadedCount === 0 ? (
                                <BootPreview />
                            ) : (
                                <ProjectPreview
                                    project={activeProject}
                                    bootDone={bootDone}
                                    loadedCount={loadedCount}
                                    totalCount={projects.length}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectRow({
    project,
    displayId,
    isLoaded,
    isActive,
    index,
    onActivate,
}: {
    project: Project;
    displayId: string;
    isLoaded: boolean;
    isActive: boolean;
    index: number;
    onActivate: () => void;
}) {
    return (
        <motion.div
            onMouseEnter={onActivate}
            onClick={onActivate}
            initial={false}
            animate={{
                opacity: isLoaded ? 1 : 0.3,
                y: isLoaded ? 0 : 8,
            }}
            transition={{ duration: 0.4 }}
            className={`group relative cursor-pointer overflow-hidden border bg-black px-4 py-3 transition ${isActive
                    ? "border-emerald-400 shadow-[0_0_35px_rgba(52,211,153,0.12)]"
                    : isLoaded
                        ? "border-white/20 hover:border-white/45"
                        : "border-white/10"
                }`}
        >
            {!isLoaded ? (
                <LoadingRow index={index} />
            ) : (
                <>
                    <div className="grid gap-3 md:grid-cols-[54px_1fr_150px] md:items-center">
                        <p
                            className={`font-mono text-[10px] uppercase tracking-[0.26em] ${isActive ? "text-emerald-400" : "text-white/35"
                                }`}
                        >
                            {displayId}
                        </p>

                        <div>
                            <h3 className="font-mono text-2xl font-black uppercase leading-none tracking-[-0.1em] md:text-[30px]">
                                {project.name}
                            </h3>

                            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                                {project.url}
                            </p>
                        </div>

                        <p className="font-mono text-[10px] uppercase leading-4 text-white/35 md:text-right">
                            {project.type}
                        </p>
                    </div>

                    <motion.div
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-emerald-400"
                    />
                </>
            )}
        </motion.div>
    );
}

function LoadingRow({ index }: { index: number }) {
    return (
        <div className="relative grid gap-3 md:grid-cols-[54px_1fr_150px] md:items-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/20">
                {String(index + 1).padStart(2, "0")}
            </p>

            <div>
                <div className="h-7 w-48 bg-white/10" />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                    awaiting scroll input
                </p>
            </div>

            <div className="hidden h-4 w-28 justify-self-end bg-white/10 md:block" />

            <motion.div
                animate={{ x: ["-30%", "130%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-px w-24 bg-emerald-400"
            />
        </div>
    );
}

function ProjectPreview({
    project,
    bootDone,
    loadedCount,
    totalCount,
}: {
    project: Project;
    bootDone: boolean;
    loadedCount: number;
    totalCount: number;
}) {
    return (
        <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative flex h-full min-h-0 flex-col overflow-hidden border border-white/30 bg-black p-4"
        >
            <Corners />

            <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-3 font-mono text-[10px] uppercase tracking-[0.24em]">
                <span className="text-emerald-400">{project.url}</span>
                <span className="text-white/40">
                    {bootDone ? "preview active" : `loading ${loadedCount}/${totalCount}`}
                </span>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden border border-white/25 bg-[#050505]">
                <PreviewImage project={project} />

                {!bootDone && (
                    <div className="absolute inset-0 bg-black/35">
                        <motion.div
                            animate={{ y: ["-20%", "120%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="h-20 w-full bg-gradient-to-b from-transparent via-emerald-400/15 to-transparent"
                        />
                    </div>
                )}
            </div>

            <div className="pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
                    {project.type}
                </p>

                <h3 className="mt-3 font-mono text-4xl font-black uppercase leading-none tracking-[-0.12em]">
                    {project.name}
                </h3>

                <p className="mt-4 font-mono text-xs uppercase leading-6 text-white/50">
                    {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="border border-white/25 px-3 py-2 font-mono text-[10px] uppercase text-white/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
                <Link
                    href={`/work/${project.slug}`}
                    className="bg-emerald-400 px-5 py-4 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:shadow-[0_0_35px_rgba(52,211,153,0.25)]"
                >
                    view details
                </Link>

                <a
                    href={withProtocol(project.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white/20 bg-black px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-white/70 transition hover:border-emerald-400 hover:text-emerald-400"
                >
                    visit website
                </a>
            </div>
        </motion.div>
    );
}

function BootPreview() {
    return (
        <div className="relative flex h-full min-h-0 items-center justify-center overflow-hidden border border-white/30 bg-black p-4">
            <Corners />

            <div className="text-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="mx-auto h-24 w-24 rounded-full border border-white/20 border-t-emerald-400"
                />

                <p className="mt-8 font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                    opening work index
                </p>

                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.26em] text-white/35">
                    scroll to mount projects
                </p>
            </div>
        </div>
    );
}

function PreviewImage({ project }: { project: Project }) {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setFailed(false);
    }, [project.id]);

    if (failed || !project.image_url) {
        return <FallbackPreview project={project} />;
    }

    return (
        <img
            src={project.image_url}
            alt={`${project.name} website preview`}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
        />
    );
}

function FallbackPreview({ project }: { project: Project }) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-25" />

            <motion.div
                animate={{ x: ["-20%", "120%"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 h-px w-40 bg-emerald-400"
            />

            <div className="absolute left-6 top-6 border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 font-mono text-[10px] uppercase text-emerald-400">
                {project.url}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
                <p className="font-mono text-4xl font-black uppercase leading-none tracking-[-0.12em] text-white">
                    {project.name}
                </p>

                <p className="mt-4 max-w-md font-mono text-[10px] uppercase leading-5 text-white/45">
                    Add screenshot URL to Supabase image_url field.
                </p>
            </div>
        </div>
    );
}

function Corners() {
    return (
        <>
            <div className="absolute left-0 top-0 z-10 h-9 w-9 border-l-2 border-t-2 border-emerald-400" />
            <div className="absolute right-0 top-0 z-10 h-9 w-9 border-r-2 border-t-2 border-emerald-400" />
            <div className="absolute bottom-0 left-0 z-10 h-9 w-9 border-b-2 border-l-2 border-r-0 border-emerald-400" />
            <div className="absolute bottom-0 right-0 z-10 h-9 w-9 border-b-2 border-r-2 border-emerald-400" />
        </>
    );
}

function withProtocol(url: string) {
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    return `https://${url}`;
}