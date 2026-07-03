const details = [
  ["Nome", "Rhuan Lucas"],
  ["Localização", "Brasil"],
  ["Função", "Frontend Developer"],
  ["Foco", "React / Next.js"],
  ["Disponibilidade", "Projetos e oportunidades"],
];

export default function AboutSection() {
  return (
    <section className="-m-5 min-h-[calc(100%+2.5rem)] bg-white text-sm text-slate-900">
      <header className="border-b border-slate-300 bg-[#f5f6f7] px-4 py-2">
        <p className="text-xs text-slate-600">Painel de Controle</p>
        <h1 className="text-lg font-semibold">sobre-mim.exe</h1>
      </header>

      <div className="grid gap-4 p-4 md:grid-cols-[170px_1fr]">
        <aside className="border border-slate-300 bg-[#f7f7f7] p-4 text-center">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#7a8794] text-3xl font-semibold text-white">
            RL
          </div>
          <h2 className="mt-3 font-semibold">Rhuan Lucas</h2>
          <p className="text-xs text-slate-600">Conta local</p>
        </aside>

        <main className="grid gap-4">
          <section className="border border-slate-300 bg-white">
            <div className="border-b border-slate-200 bg-[#f7f7f7] px-3 py-2 font-semibold">
              Informações do perfil
            </div>
            <p className="p-3 leading-relaxed text-slate-700">
              Desenvolvedor Frontend focado em criar interfaces modernas,
              responsivas e bem estruturadas. Tenho interesse em produtos
              digitais, experiências criativas e aplicações com identidade
              visual forte.
            </p>
          </section>

          <section className="border border-slate-300 bg-white">
            <div className="grid grid-cols-[150px_1fr] border-b border-slate-200 bg-[#f7f7f7] text-xs font-semibold text-slate-600">
              <span className="border-r border-slate-200 px-3 py-1.5">
                Campo
              </span>
              <span className="px-3 py-1.5">Valor</span>
            </div>
            {details.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[150px_1fr] border-b border-slate-100 text-xs last:border-b-0"
              >
                <span className="border-r border-slate-100 px-3 py-2 text-slate-600">
                  {label}
                </span>
                <span className="px-3 py-2 font-medium">{value}</span>
              </div>
            ))}
          </section>
        </main>
      </div>
    </section>
  );
}
