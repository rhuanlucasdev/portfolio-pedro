import { FaGithub } from "react-icons/fa6";
import { HiFolder } from "react-icons/hi";

const projects = [
  {
    name: "dnd-character-generator",
    stack: "Frontend / JavaScript",
    status: "GitHub",
    description:
      "Gerador de personagens de Dungeons & Dragons publicado como repositório no GitHub. O projeto ainda não possui versão em produção.",
    repository: "https://github.com/Lyguinees/dnd-character-generator",
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
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub size={14} />
                    Abrir GitHub
                  </a>
                  <span className="inline-flex items-center border border-slate-300 bg-[#f7f7f7] px-3 py-1.5 font-semibold text-slate-500">
                    Sem deploy
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
