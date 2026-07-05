"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  slug: string;
  name: string;
  url: string;
  type: string;
  description: string;
  tags: string[];
  image_url: string | null;
  year: string | null;
  role: string | null;
  services: string[];
  challenge: string | null;
  solution: string | null;
  result: string | null;
  sort_order: number;
};

const bootSteps = [
  "fetching project data",
  "mounting case header",
  "loading preview module",
  "compiling case blocks",
  "unlocking actions",
];

export default function WorkDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState("loading project");
  const [visibleStep, setVisibleStep] = useState(0);
  const [activeBlock, setActiveBlock] = useState("challenge");
  const [failedImage, setFailedImage] = useState(false);

  useEffect(() => {
    async function loadProject() {
      setStatus("fetching case study");

      const { data, error } = await supabase
        .from("projects")
        .select(
          "id, slug, name, url, type, description, tags, image_url, year, role, services, challenge, solution, result, sort_order"
        )
        .eq("is_featured", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error(error);
        setStatus("project not found");
        return;
      }

      const normalizedProjects = (data ?? []).map((item) => ({
        ...item,
        tags: item.tags ?? [],
        services: item.services ?? [],
      })) as Project[];

      const currentProject = normalizedProjects.find(
        (item) => item.slug === slug
      );

      if (!currentProject) {
        setStatus("project not found");
        return;
      }

      setProjects(normalizedProjects);
      setProject(currentProject);
      setFailedImage(false);
      setStatus("booting case study");
    }

    if (slug) {
      loadProject();
    }
  }, [slug]);

  useEffect(() => {
    if (!project) return;

    setVisibleStep(0);

    const timers = bootSteps.map((_, index) =>
      setTimeout(() => {
        setVisibleStep(index + 1);

        if (index === bootSteps.length - 1) {
          setStatus("case study ready");
        }
      }, 350 + index * 430)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [project]);

  const nextProject = useMemo(() => {
    if (!project || projects.length <= 1) return null;

    const currentIndex = projects.findIndex((item) => item.id === project.id);
    const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;

    return projects[nextIndex];
  }, [project, projects]);

  if (!project) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
        <Background />

        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="mx-auto h-24 w-24 rounded-full border border-white/20 border-t-emerald-400"
          />

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
            {status}
          </p>

          {status === "project not found" && (
            <Link
              href="/#work"
              className="mt-8 inline-block border border-white/20 px-5 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white/60 hover:border-emerald-400 hover:text-emerald-400"
            >
              back to work
            </Link>
          )}
        </div>
      </main>
    );
  }

  const caseBlocks = [
    {
      id: "challenge",
      title: "challenge",
      text:
        project.challenge ||
        "The project needed a clearer digital presence, stronger visual structure and a more trusted user experience.",
    },
    {
      id: "solution",
      title: "solution",
      text:
        project.solution ||
        "The interface, content structure and visual direction were shaped around clarity, premium feeling and simple user flow.",
    },
    {
      id: "result",
      title: "result",
      text:
        project.result ||
        "A sharper website experience that presents the brand better and makes the offer easier to understand.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background />

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <CaseBootHeader status={status} visibleStep={visibleStep} />

        {visibleStep >= 1 && (
          <motion.section
            initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                case.study / {project.type}
              </p>

              <h1 className="mt-7 font-mono text-[16vw] font-black uppercase leading-[0.82] tracking-[-0.16em] md:text-[116px]">
                {project.name}
              </h1>

              <p className="mt-7 max-w-xl font-mono text-sm uppercase leading-8 text-white/58">
                {project.description}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <InfoBox label="year" value={project.year || "-"} />
              <InfoBox label="role" value={project.role || "-"} />
              <InfoBox label="website" value={project.url} active />
            </div>
          </motion.section>
        )}

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {visibleStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 34, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              className="relative overflow-hidden border border-white/30 bg-black p-4"
            >
              <Corners />

              <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-3 font-mono text-[10px] uppercase tracking-[0.24em]">
                <span className="text-emerald-400">{project.url}</span>
                <span className="text-white/40">
                  {visibleStep >= 5 ? "preview active" : "loading preview"}
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden border border-white/25 bg-[#050505]">
                {project.image_url && !failedImage ? (
                  <img
                    src={project.image_url}
                    alt={`${project.name} project preview`}
                    onError={() => setFailedImage(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FallbackPreview project={project} />
                )}

                {visibleStep < 5 && (
                  <div className="absolute inset-0 bg-black/35">
                    <motion.div
                      animate={{ y: ["-20%", "120%"] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-20 w-full bg-gradient-to-b from-transparent via-emerald-400/15 to-transparent"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {visibleStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              className="grid gap-4"
            >
              {caseBlocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.45,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <CaseBlock
                    title={block.title}
                    text={block.text}
                    active={activeBlock === block.id}
                    onHover={() => setActiveBlock(block.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {visibleStep >= 4 && (
          <motion.section
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="border border-white/25 bg-white/[0.02] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
                services
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {(project.services.length > 0
                  ? project.services
                  : project.tags
                ).map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="border border-white/25 px-3 py-2 font-mono text-[10px] uppercase text-white/60"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <motion.a
                href={withProtocol(project.url)}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -3,
                  boxShadow: "0 0 35px rgba(52,211,153,0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-emerald-400 px-5 py-4 text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-black"
              >
                visit website
              </motion.a>

              <motion.a
                href="mailto:hello@okee.agency"
                whileHover={{
                  y: -3,
                  borderColor: "rgba(52,211,153,0.8)",
                  color: "rgb(52,211,153)",
                }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/20 bg-black px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.14em] text-white/70"
              >
                start similar project
              </motion.a>
            </div>
          </motion.section>
        )}

        {visibleStep >= 5 && (
          <motion.footer
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="mt-10 grid gap-3 border-t border-white/20 pt-6 md:grid-cols-2"
          >
            <Link
              href="/#work"
              className="border border-white/20 bg-black px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-white/60 hover:border-emerald-400 hover:text-emerald-400"
            >
              ← back to work
            </Link>

            {nextProject && (
              <Link
                href={`/work/${nextProject.slug}`}
                className="border border-emerald-400 bg-emerald-400/10 px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-emerald-400 hover:bg-emerald-400 hover:text-black"
              >
                next project → {nextProject.name}
              </Link>
            )}
          </motion.footer>
        )}
      </section>
    </main>
  );
}

function CaseBootHeader({
  status,
  visibleStep,
}: {
  status: string;
  visibleStep: number;
}) {
  return (
    <header className="border border-white/25 bg-black/80 p-4 backdrop-blur-md">
      <div className="flex flex-col justify-between gap-4 border-b border-white/20 pb-4 md:flex-row md:items-center">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-[0.24em] text-white/45 hover:text-emerald-400"
        >
          ← back to work
        </Link>

        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-emerald-400">
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]"
          />
          {status}
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-5">
        {bootSteps.map((step, index) => {
          const isActive = index + 1 <= visibleStep;

          return (
            <div
              key={step}
              className={`border px-3 py-2 font-mono text-[9px] uppercase leading-4 tracking-[0.14em] ${
                isActive
                  ? "border-emerald-400/60 text-emerald-400"
                  : "border-white/15 text-white/30"
              }`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-1">{step}</p>
            </div>
          );
        })}
      </div>
    </header>
  );
}

function InfoBox({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: "rgba(52,211,153,0.75)" }}
      className={`border p-4 font-mono uppercase ${
        active
          ? "border-emerald-400 bg-emerald-400/10"
          : "border-white/20 bg-black"
      }`}
    >
      <p className="text-[10px] tracking-[0.24em] text-white/35">{label}</p>
      <p
        className={`mt-3 text-xs tracking-[0.12em] ${
          active ? "text-emerald-400" : "text-white/65"
        }`}
      >
        {value}
      </p>
    </motion.div>
  );
}

function CaseBlock({
  title,
  text,
  active,
  onHover,
}: {
  title: string;
  text: string;
  active: boolean;
  onHover: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      whileHover={{ y: -3 }}
      className={`border p-5 transition ${
        active
          ? "border-emerald-400 bg-emerald-400/10"
          : "border-white/25 bg-white/[0.02]"
      }`}
    >
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.3em] ${
          active ? "text-emerald-400" : "text-white/40"
        }`}
      >
        {title}
      </p>

      <p className="mt-5 font-mono text-xs uppercase leading-7 text-white/55">
        {text}
      </p>
    </motion.div>
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
        <p className="font-mono text-5xl font-black uppercase leading-none tracking-[-0.12em] text-white">
          {project.name}
        </p>

        <p className="mt-4 max-w-md font-mono text-[10px] uppercase leading-5 text-white/45">
          Add screenshot URL to Supabase image_url field.
        </p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-[210px]" />
    </>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute left-0 top-0 z-10 h-9 w-9 border-l-2 border-t-2 border-emerald-400" />
      <div className="absolute right-0 top-0 z-10 h-9 w-9 border-r-2 border-t-2 border-emerald-400" />
      <div className="absolute bottom-0 left-0 z-10 h-9 w-9 border-b-2 border-l-2 border-emerald-400" />
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