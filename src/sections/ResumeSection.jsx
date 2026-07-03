export default function ResumeSection() {
  return (
    <section className="-m-5 min-h-[calc(100%+2.5rem)] bg-[#9b9b9b] p-5 text-sm text-slate-900">
      <div className="mx-auto max-w-[620px] border border-slate-400 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
        <header className="border-b border-slate-200 bg-[#f7f7f7] px-4 py-2">
          <p className="text-xs text-slate-600">Visualizador de PDF</p>
          <h1 className="text-lg font-semibold">curriculo.pdf</h1>
        </header>

        <article className="p-6">
          <div className="border-b border-slate-300 pb-4">
            <h2 className="text-2xl font-semibold">Rhuan Lucas</h2>
            <p className="mt-1 text-sm text-slate-600">
              Frontend Developer · React · TypeScript · TailwindCSS
            </p>
          </div>

          <div className="mt-5 grid gap-4 text-sm leading-relaxed">
            {[
              [
                "Resumo",
                "Desenvolvedor com foco em interfaces modernas, componentização, responsividade e boas práticas de UI.",
              ],
              [
                "Experiência",
                "Projetos com landing pages, dashboards, e-commerce e aplicações web responsivas.",
              ],
              [
                "Tecnologias",
                "React, Next.js, TypeScript, TailwindCSS, Git, APIs REST.",
              ],
            ].map(([title, content]) => (
              <section key={title}>
                <h3 className="border-b border-slate-200 pb-1 font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-slate-700">{content}</p>
              </section>
            ))}
          </div>

          <button className="mt-6 bg-[#0078d7] px-5 py-2 text-sm font-semibold text-white hover:bg-[#006cc1]">
            Baixar currículo
          </button>
        </article>
      </div>
    </section>
  );
}
