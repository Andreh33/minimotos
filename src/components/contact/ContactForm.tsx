"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { ok: false };

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.ok) {
    return (
      <div className="rounded-mm-md border border-mm-green/40 bg-mm-green/10 p-6">
        <p className="font-mono text-sm uppercase tracking-widest text-mm-green">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <Field name="nombre" label={t("name")} required />
      <Field name="email" label={t("email")} type="email" required />
      <Field name="telefono" label={t("phone")} type="tel" />
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">
          {t("message")}
        </span>
        <textarea
          name="mensaje"
          required
          rows={5}
          className="resize-none rounded-mm-sm border border-mm-line bg-mm-ink-800 px-4 py-3 text-sm text-mm-text focus:border-mm-cyan/60 focus:outline-none"
        />
      </label>
      {state.error && <p className="font-mono text-xs text-mm-danger">{t("error")}</p>}
      <button
        type="submit"
        disabled={pending}
        className="group relative mt-2 inline-flex h-12 w-fit items-center justify-center overflow-hidden rounded-mm-pill px-8 font-mono text-xs uppercase tracking-[0.14em] text-black disabled:opacity-60"
      >
        <span aria-hidden className="absolute inset-0 -z-10" style={{ background: "var(--mm-spectrum)" }} />
        {t("send")}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 rounded-mm-sm border border-mm-line bg-mm-ink-800 px-4 text-sm text-mm-text focus:border-mm-cyan/60 focus:outline-none"
      />
    </label>
  );
}
