"use client";

import { motion } from "motion/react";
import { FormEvent, useState } from "react";

type ProjectApplicationData = {
  name: string;
  contact: string;
  business: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialFormData: ProjectApplicationData = {
  name: "",
  contact: "",
  business: "",
  budget: "",
  timeline: "",
  message: "",
};

export default function ProjectApplicationModule({
  activeOption,
  onStatusChange,
}: {
  activeOption: string;
  onStatusChange: (status: string) => void;
}) {
  const [formData, setFormData] =
    useState<ProjectApplicationData>(initialFormData);

  function updateField(field: keyof ProjectApplicationData, value: string) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `Project application - ${activeOption}`;
    const body = `
Project type: ${activeOption}

Name:
${formData.name}

Contact:
${formData.contact}

Business / Brand:
${formData.business}

Budget:
${formData.budget}

Timeline:
${formData.timeline}

Message:
${formData.message}
    `.trim();

    window.location.href = `mailto:hello@okee.agency?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    onStatusChange("application prepared");
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20, height: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, height: "auto", filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, height: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onSubmit={handleSubmit}
      className="mt-5 overflow-hidden border border-emerald-400/30 bg-black/70 p-4"
    >
      <div className="mb-4 flex items-center justify-between border-b border-white/15 pb-3 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-emerald-400">application.form</span>
        <span className="text-white/35">{toCommandSlug(activeOption)}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <InputField
          label="name"
          value={formData.name}
          onChange={(value) => updateField("name", value)}
          placeholder="Your name"
        />

        <InputField
          label="contact"
          value={formData.contact}
          onChange={(value) => updateField("contact", value)}
          placeholder="Email / WhatsApp / Telegram"
        />

        <InputField
          label="business"
          value={formData.business}
          onChange={(value) => updateField("business", value)}
          placeholder="Brand or company name"
        />

        <InputField
          label="budget"
          value={formData.budget}
          onChange={(value) => updateField("budget", value)}
          placeholder="Example: 1500-3000 AZN"
        />

        <InputField
          label="timeline"
          value={formData.timeline}
          onChange={(value) => updateField("timeline", value)}
          placeholder="Example: 2-4 weeks"
        />

        <label className="md:col-span-2">
          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
            project brief
          </span>

          <textarea
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell me what you want to build, what problem it solves, and what result you need."
            rows={5}
            className="w-full resize-none border border-white/15 bg-black/70 px-4 py-3 font-mono text-xs uppercase leading-6 text-white/70 outline-none transition placeholder:text-white/20 focus:border-emerald-400"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-white/35">
          This prepares an email with your project application details.
        </p>

        <motion.button
          type="submit"
          whileHover={{
            y: -3,
            boxShadow: "0 0 35px rgba(52,211,153,0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-emerald-400 px-5 py-3.5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black"
        >
          submit application
        </motion.button>
      </div>
    </motion.form>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label>
      <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-white/15 bg-black/70 px-4 py-3 font-mono text-xs uppercase text-white/70 outline-none transition placeholder:text-white/20 focus:border-emerald-400"
      />
    </label>
  );
}

function toCommandSlug(value: string) {
  return value.replaceAll(" ", "-");
}