import { FaGithub } from "react-icons/fa6";
import { HiExternalLink, HiFolder } from "react-icons/hi";

const projects = [
  {
    name: "Aether Commerce",
    stack: "React, Next.js, TailwindCSS",
    status: "Publicado",
    description:
      "E-commerce premium fictício com foco em experiência visual, catálogo e páginas de produto.",
    link: "#",
  },
  {
    name: "FitPlan",
    stack: "React, TypeScript, jsPDF",
    status: "Em evolução",
    description:
      "Gerador de planos de treino e dieta com tabelas dinâmicas e exportação para PDF.",
    link: "#",
  },
  {
    name: "Hydro Dashboard",
    stack: "React, Charts, REST API",
    status: "Protótipo",
    description:
      "Dashboard para monitoramento de indicadores, níveis de água e histórico de inspeções.",
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section className="-m-5 min-h-[calc(100%+2.5rem)] bg-white text-sm text-slate-900">
      <header className="border-b border-slate-300 bg-[#f5f6f7] px-4 py-2">
        <p className="text-xs text-slate-600">Biblioteca</p>
        <h1 className="text-lg font-semibold">projetos.exe</h1>
      </header>

      <main className="p-4">
        <div className="border border-slate-300 bg-white">
          <div className="grid grid-cols-[minmax(190px,1fr)_190px_110px] border-b border-slate-200 bg-[#f7f7f7] text-xs font-semibold text-slate-600">
            <span className="border-r border-slate-200 px-3 py-1.5">
              Nome
            </span>
            <span className="border-r border-slate-200 px-3 py-1.5">
              Stack
            </span>
            <span className="px-3 py-1.5">Status</span>
          </div>

          {projects.map((project) => (
            <article
              key={project.name}
              className="border-b border-slate-100 last:border-b-0 hover:bg-[#e5f3ff]"
            >
              <div className="grid grid-cols-[minmax(190px,1fr)_190px_110px] text-xs">
                <div className="flex items-center gap-2 px-3 py-2">
                  <HiFolder className="text-yellow-500" size={20} />
                  <span className="font-semibold">{project.name}</span>
                </div>
                <div className="px-3 py-2 text-slate-600">{project.stack}</div>
                <div className="px-3 py-2 text-slate-600">
                  {project.status}
                </div>
              </div>
              <div className="px-3 pb-3 pl-10 text-xs leading-relaxed text-slate-600">
                {project.description}
                <div className="mt-2 flex gap-2">
                  <a
                    className="inline-flex items-center gap-1 bg-[#0078d7] px-3 py-1.5 font-semibold text-white hover:bg-[#006cc1]"
                    href={project.link}
                  >
                    <HiExternalLink size={15} />
                    Ver projeto
                  </a>
                  <a
                    className="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100"
                    href={project.link}
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
