"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
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
    sort_order: number;
    is_featured: boolean;
    year: string | null;
    role: string | null;
    services: string[] | null;
    challenge: string | null;
    solution: string | null;
    result: string | null;
};

const emptyForm = {
    slug: "",
    name: "",
    url: "",
    type: "",
    description: "",
    tags: "",
    image_url: "",
    sort_order: "1",
    is_featured: true,
    year: "",
    role: "",
    services: "",
    challenge: "",
    solution: "",
    result: "",
};

export default function AdminProjectsPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("checking session");
    const [projects, setProjects] = useState<Project[]>([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);

    const isEditing = Boolean(editingId);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setStatus(data.session ? "admin online" : "not signed in");
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            setStatus(nextSession ? "admin online" : "not signed in");
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session) {
            loadProjects();
        }
    }, [session]);

    async function signIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending magic link");

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/admin/projects`,
            },
        });

        if (error) {
            setStatus(error.message);
            return;
        }

        setStatus("check your email");
    }

    async function signOut() {
        await supabase.auth.signOut();
        setProjects([]);
        setEditingId(null);
        setForm(emptyForm);
    }

    async function loadProjects() {
        setStatus("loading projects");

        const { data, error } = await supabase
            .from("projects")
            .select(
                "id, slug, name, url, type, description, tags, image_url, sort_order, is_featured, year, role, services, challenge, solution, result"
            )
            .order("sort_order", { ascending: true });

        if (error) {
            setStatus(error.message);
            return;
        }

        const normalizedProjects = (data ?? []).map((project) => ({
            ...project,
            tags: project.tags ?? [],
            services: project.services ?? [],
        }));

        setProjects(normalizedProjects); setStatus("projects loaded");
    }

    function resetForm() {
        setForm(emptyForm);
        setEditingId(null);
    }

    function startEdit(project: Project) {
        setEditingId(project.id);

        setForm({
            slug: project.slug,
            name: project.name,
            url: project.url,
            type: project.type,
            description: project.description,
            tags: project.tags.join(", "),
            image_url: project.image_url ?? "",
            sort_order: String(project.sort_order),
            is_featured: project.is_featured,
            year: project.year ?? "",
            role: project.role ?? "",
            services: (project.services ?? []).join(", "),
            challenge: project.challenge ?? "",
            solution: project.solution ?? "",
            result: project.result ?? "",
        });

        setStatus(`editing ${project.name}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    async function submitProject(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const payload = {
            slug: form.slug.trim(),
            name: form.name.trim(),
            url: form.url.trim(),
            type: form.type.trim(),
            description: form.description.trim(),
            tags: toArray(form.tags),
            image_url: form.image_url.trim() || null,
            sort_order: Number(form.sort_order) || 1,
            is_featured: form.is_featured,
            year: form.year.trim() || null,
            role: form.role.trim() || null,
            services: toArray(form.services),
            challenge: form.challenge.trim() || null,
            solution: form.solution.trim() || null,
            result: form.result.trim() || null,
        };

        if (isEditing && editingId) {
            setStatus("updating project");

            const { error } = await supabase
                .from("projects")
                .update(payload)
                .eq("id", editingId);

            if (error) {
                setStatus(error.message);
                return;
            }

            setStatus("project updated");
            resetForm();
            loadProjects();
            return;
        }

        setStatus("creating project");

        const { error } = await supabase.from("projects").insert(payload);

        if (error) {
            setStatus(error.message);
            return;
        }

        setStatus("project created");
        resetForm();
        loadProjects();
    }

    async function deleteProject(id: string) {
        const confirmDelete = window.confirm("Delete this project?");
        if (!confirmDelete) return;

        setStatus("deleting project");

        const { error } = await supabase.from("projects").delete().eq("id", id);

        if (error) {
            setStatus(error.message);
            return;
        }

        if (editingId === id) {
            resetForm();
        }

        setStatus("project deleted");
        loadProjects();
    }

    if (!session) {
        return (
            <main className="min-h-screen bg-black px-6 py-10 text-white">
                <div className="mx-auto max-w-xl border border-emerald-400/40 bg-black p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                        admin login
                    </p>

                    <h1 className="mt-6 font-mono text-5xl font-black uppercase leading-none tracking-[-0.12em]">
                        Project CMS
                    </h1>

                    <form onSubmit={signIn} className="mt-8 space-y-4">
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="your email"
                            className="w-full border border-white/20 bg-black px-4 py-3 font-mono text-sm uppercase text-white outline-none placeholder:text-white/30 focus:border-emerald-400"
                        />

                        <button className="w-full bg-emerald-400 px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black">
                            send magic link
                        </button>
                    </form>

                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-white/40">
                        {status}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8 flex items-center justify-between border-b border-white/20 pb-5">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.34em] text-emerald-400">
                            admin / projects
                        </p>

                        <h1 className="mt-4 font-mono text-6xl font-black uppercase leading-none tracking-[-0.14em]">
                            CMS
                        </h1>
                    </div>

                    <button
                        onClick={signOut}
                        className="border border-white/20 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-white/60 hover:border-emerald-400 hover:text-emerald-400"
                    >
                        sign out
                    </button>
                </header>

                <div className="mb-6 border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
                    {status}
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <form
                        onSubmit={submitProject}
                        className="border border-white/25 bg-white/[0.02] p-5"
                    >
                        <div className="flex items-center justify-between gap-5">
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
                                {isEditing ? "edit project" : "add project"}
                            </p>

                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="border border-white/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50 hover:border-emerald-400 hover:text-emerald-400"
                                >
                                    cancel edit
                                </button>
                            )}
                        </div>

                        <div className="mt-6 grid gap-4">
                            <Input
                                label="name"
                                value={form.name}
                                onChange={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        name: value,
                                        slug:
                                            prev.slug ||
                                            value
                                                .toLowerCase()
                                                .replace(/[^a-z0-9]+/g, "-")
                                                .replace(/(^-|-$)/g, ""),
                                    }))
                                }
                            />

                            <Input
                                label="slug"
                                value={form.slug}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, slug: value }))
                                }
                            />

                            <Input
                                label="url"
                                value={form.url}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, url: value }))
                                }
                            />

                            <Input
                                label="type"
                                value={form.type}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, type: value }))
                                }
                            />

                            <Textarea
                                label="description"
                                value={form.description}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, description: value }))
                                }
                            />

                            <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                    label="year"
                                    value={form.year}
                                    onChange={(value) =>
                                        setForm((prev) => ({ ...prev, year: value }))
                                    }
                                />

                                <Input
                                    label="role"
                                    value={form.role}
                                    onChange={(value) =>
                                        setForm((prev) => ({ ...prev, role: value }))
                                    }
                                />
                            </div>

                            <Input
                                label="tags comma separated"
                                value={form.tags}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, tags: value }))
                                }
                            />

                            <Input
                                label="services comma separated"
                                value={form.services}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, services: value }))
                                }
                            />

                            <Input
                                label="image url"
                                value={form.image_url}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, image_url: value }))
                                }
                            />

                            <Input
                                label="sort order"
                                value={form.sort_order}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, sort_order: value }))
                                }
                            />

                            <Textarea
                                label="challenge"
                                value={form.challenge}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, challenge: value }))
                                }
                            />

                            <Textarea
                                label="solution"
                                value={form.solution}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, solution: value }))
                                }
                            />

                            <Textarea
                                label="result"
                                value={form.result}
                                onChange={(value) =>
                                    setForm((prev) => ({ ...prev, result: value }))
                                }
                            />

                            <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                                <input
                                    type="checkbox"
                                    checked={form.is_featured}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            is_featured: event.target.checked,
                                        }))
                                    }
                                />
                                featured
                            </label>

                            <button className="bg-emerald-400 px-5 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black">
                                {isEditing ? "update project" : "create project"}
                            </button>
                        </div>
                    </form>

                    <div className="border border-white/25 bg-white/[0.02] p-5">
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
                            project list
                        </p>

                        <div className="mt-6 space-y-3">
                            {projects.map((project, index) => {
                                const isCurrentEdit = editingId === project.id;

                                return (
                                    <div
                                        key={project.id}
                                        className={`border bg-black p-4 ${isCurrentEdit
                                                ? "border-emerald-400"
                                                : "border-white/20"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-5">
                                            <div>
                                                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-400">
                                                    {String(index + 1).padStart(2, "0")} /{" "}
                                                    {project.slug}
                                                </p>

                                                <h2 className="mt-3 font-mono text-2xl font-black uppercase leading-none tracking-[-0.08em]">
                                                    {project.name}
                                                </h2>

                                                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                                                    {project.url}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => startEdit(project)}
                                                    className="border border-emerald-400/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300 hover:bg-emerald-400/10"
                                                >
                                                    edit
                                                </button>

                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    className="border border-red-400/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-red-300 hover:bg-red-400/10"
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                                            <SmallInfo label="year" value={project.year || "-"} />
                                            <SmallInfo label="role" value={project.role || "-"} />
                                            <SmallInfo
                                                label="featured"
                                                value={project.is_featured ? "yes" : "no"}
                                            />
                                        </div>

                                        <p className="mt-4 font-mono text-xs uppercase leading-6 text-white/50">
                                            {project.description}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="border border-white/20 px-3 py-2 font-mono text-[10px] uppercase text-white/45"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {(project.services ?? []).length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {(project.services ?? []).map((service) => (
                                                    <span
                                                        key={service}
                                                        className="border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 font-mono text-[10px] uppercase text-emerald-300"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {projects.length === 0 && (
                                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/35">
                                    no projects yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function toArray(value: string) {
    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}

function SmallInfo({ label, value }: { label: string; value: string }) {
    return (
        <div className="border border-white/15 bg-white/[0.02] p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                {label}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
                {value}
            </p>
        </div>
    );
}

function Input({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                {label}
            </p>

            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full border border-white/20 bg-black px-4 py-3 font-mono text-sm text-white outline-none focus:border-emerald-400"
            />
        </label>
    );
}

function Textarea({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                {label}
            </p>

            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                rows={4}
                className="w-full resize-none border border-white/20 bg-black px-4 py-3 font-mono text-sm text-white outline-none focus:border-emerald-400"
            />
        </label>
    );
}