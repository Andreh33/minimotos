import { legalDocs } from "@/lib/legal";

export function LegalShell({ slug }: { slug: string }) {
  const doc = legalDocs[slug];
  if (!doc) return null;

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-24 md:px-12 md:pt-32">
      <p className="mm-eyebrow text-mm-text-mute">// Legal</p>
      <h1 className="mm-display mt-4 text-[length:var(--fs-h2)]">{doc.title}</h1>
      <p className="mt-4 text-mm-text-dim">{doc.intro}</p>

      <div className="mt-12 space-y-8">
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-mono text-sm uppercase tracking-widest text-mm-cyan">{s.h}</h2>
            <p className="mt-2 text-mm-text-dim">{s.p}</p>
          </section>
        ))}
      </div>

      <p className="mt-14 rounded-mm-sm border border-dashed border-mm-line p-4 font-mono text-[0.65rem] uppercase tracking-widest text-mm-text-mute">
        TODO:REVISIÓN-JURÍDICA — borrador orientativo, revisar con un profesional antes de publicar.
      </p>
    </main>
  );
}
