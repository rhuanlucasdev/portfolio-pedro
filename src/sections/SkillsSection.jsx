import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

const skills = [
  ["React", "Frontend", "Avançado", FaReact],
  ["Next.js", "Frontend", "Intermediário", SiNextdotjs],
  ["TypeScript", "Linguagem", "Intermediário", SiTypescript],
  ["TailwindCSS", "UI", "Avançado", SiTailwindcss],
  ["HTML5", "Base Web", "Avançado", FaHtml5],
  ["CSS3", "Base Web", "Avançado", FaCss3Alt],
  ["Node.js", "Backend", "Intermediário", FaNodeJs],
  ["Express", "Backend", "Intermediário", SiExpress],
  ["MongoDB", "Dados", "Intermediário", SiMongodb],
  ["Git", "Ferramenta", "Avançado", FaGitAlt],
  ["Figma", "Design", "Intermediário", FaFigma],
  ["Vite", "Build", "Avançado", SiVite],
  ["Vercel", "Deploy", "Intermediário", SiVercel],
];

export default function SkillsSection() {
  return (
    <section className="-m-5 min-h-[calc(100%+2.5rem)] bg-white text-sm text-slate-900">
      <header className="border-b border-slate-300 bg-[#f5f6f7] px-4 py-2">
        <p className="text-xs text-slate-600">Programas e Recursos</p>
        <h1 className="text-lg font-semibold">habilidades.exe</h1>
      </header>

      <main className="p-4">
        <div className="mb-4 border border-slate-300 bg-[#f7f7f7] p-3 text-xs text-slate-700">
          Stack técnica instalada neste ambiente de desenvolvimento.
        </div>

        <div className="border border-slate-300 bg-white">
          <div className="grid grid-cols-[minmax(170px,1fr)_150px_130px] border-b border-slate-200 bg-[#f7f7f7] text-xs font-semibold text-slate-600">
            <span className="border-r border-slate-200 px-3 py-1.5">
              Nome
            </span>
            <span className="border-r border-slate-200 px-3 py-1.5">
              Categoria
            </span>
            <span className="px-3 py-1.5">Nível</span>
          </div>

          {skills.map(([name, category, level, Icon]) => (
            <div
              key={name}
              className="grid grid-cols-[minmax(170px,1fr)_150px_130px] border-b border-slate-100 text-xs last:border-b-0 hover:bg-[#e5f3ff]"
            >
              <span className="flex items-center gap-2 px-3 py-2 font-semibold">
                <Icon className="text-[#0078d7]" size={18} />
                {name}
              </span>
              <span className="px-3 py-2 text-slate-600">{category}</span>
              <span className="px-3 py-2 text-slate-600">{level}</span>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
