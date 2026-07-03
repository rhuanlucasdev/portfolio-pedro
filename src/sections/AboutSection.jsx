const details = [
  ["Nome", "Pedro Lucas de Martino"],
  ["Localização", "Paraisópolis, Minas Gerais, Brasil"],
  ["Função", "Frontend Developer Júnior / Estagiário"],
  ["Foco", "ReactJS / TypeScript / Next.js"],
  ["Formação", "ADS - Centro Universitário Una"],
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
            PM
          </div>
          <h2 className="mt-3 font-semibold">Pedro Lucas de Martino</h2>
          <p className="text-xs text-slate-600">Conta local</p>
        </aside>

        <main className="grid gap-4">
          <section className="border border-slate-300 bg-white">
            <div className="border-b border-slate-200 bg-[#f7f7f7] px-3 py-2 font-semibold">
              Informações do perfil
            </div>
            <p className="p-3 leading-relaxed text-slate-700">
              Desenvolvedor Frontend com foco em ReactJS, TypeScript,
              JavaScript e TailwindCSS, criando interfaces modernas,
              responsivas e otimizadas para melhor experiência do usuário.
              Possui experiência prática no desenvolvimento de componentes
              reutilizáveis, integração com APIs e aplicação de boas práticas de
              Clean Code.
            </p>
            <p className="border-t border-slate-100 p-3 leading-relaxed text-slate-700">
              Tem familiaridade com UX/UI, Next.js e noções de backend com
              Node.js, .NET e C#. Atualmente cursa Análise e Desenvolvimento de
              Sistemas no Centro Universitário Una, com previsão de conclusão
              em dezembro de 2026. Seu histórico em processos operacionais
              agrega disciplina, atenção a detalhes e foco em melhoria contínua.
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
