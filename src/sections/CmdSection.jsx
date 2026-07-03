import { useEffect, useRef, useState } from "react";
import { useWindows } from "../context/WindowContext.jsx";

const prompt = "C:\\Users\\Rhuan\\portfolio>";

const openTargets = {
  explorer: "explorer",
  readme: "readme",
  projects: "projects",
  about: "about",
  skills: "skills",
  resume: "resume",
  contact: "contact",
  cmd: "cmd",
  recycle: "recycle",
  settings: "settings",
};

const commandOutput = {
  help: [
    "Comandos disponíveis:",
    "  about       Mostra um resumo sobre mim",
    "  skills      Lista a stack técnica",
    "  projects    Lista projetos em destaque",
    "  contact     Mostra canais de contato",
    "  resume      Abre um resumo do currículo",
    "  open <app>   Abre uma janela (ex: open projects)",
    "  cls/clear   Limpa o terminal",
  ],
  about: [
    "Rhuan Lucas - Frontend Developer",
    "Crio interfaces modernas, responsivas e focadas em experiência.",
    "Este portfólio simula um ambiente Windows 10 com apps, janelas e taskbar.",
  ],
  skills: [
    "Frontend: React, Next.js, TypeScript, TailwindCSS, HTML5, CSS3",
    "Backend: Node.js, Express, REST APIs, MongoDB",
    "Ferramentas: Git, GitHub, Figma, Vite, Vercel",
  ],
  projects: [
    "1. Aether Commerce   - E-commerce premium em React/Next/Tailwind",
    "2. FitPlan           - Gerador de treino e dieta com exportação PDF",
    "3. Hydro Dashboard   - Dashboard de indicadores e inspeções",
  ],
  contact: [
    "Email: seuemail@email.com",
    "LinkedIn: /in/seuusuario",
    "GitHub: @seuusuario",
  ],
  resume: [
    "Frontend Developer",
    "Foco: React, TypeScript, TailwindCSS, componentização e UI responsiva.",
    "Abra curriculo.pdf no desktop para ver o preview completo.",
  ],
};

const initialLines = [
  "Microsoft Windows [versão 10.0.19045.4046]",
  "(c) Microsoft Corporation. Todos os direitos reservados.",
  "",
  "Digite 'help' para listar os comandos do portfólio.",
  "",
];

export default function CmdSection() {
  const { openWindow } = useWindows();
  const [history, setHistory] = useState(initialLines);
  const [command, setCommand] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  function runCommand(rawCommand) {
    const normalized = rawCommand.trim().toLowerCase();
    const typedLine = `${prompt} ${rawCommand}`;

    if (!normalized) {
      setHistory((current) => [...current, typedLine, ""]);
      return;
    }

    if (normalized === "clear" || normalized === "cls") {
      setHistory([]);
      return;
    }

    if (normalized.startsWith("open ")) {
      const target = normalized.replace("open ", "").trim();
      const appId = openTargets[target];

      if (appId) {
        openWindow(appId);
        setHistory((current) => [
          ...current,
          typedLine,
          `Abrindo ${target}...`,
          "",
        ]);
        return;
      }

      setHistory((current) => [
        ...current,
        typedLine,
        `Não encontrei o app '${target}'.`,
        "Tente: explorer, readme, projects, about, skills, resume, contact, recycle, settings.",
        "",
      ]);
      return;
    }

    const output = commandOutput[normalized] ?? [
      `'${rawCommand}' não é reconhecido como um comando interno ou externo.`,
      "Digite 'help' para ver os comandos disponíveis.",
    ];

    setHistory((current) => [...current, typedLine, ...output, ""]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    runCommand(command);
    setCommand("");
  }

  return (
    <section
      className="-m-5 min-h-[calc(100%+2.5rem)] cursor-text bg-black p-3 font-mono text-[13px] leading-relaxed text-[#f2f2f2]"
      onClick={() => inputRef.current?.focus()}
    >
      <div aria-live="polite">
        {history.map((line, index) => (
          <p key={`${line}-${index}`} className="min-h-[1.35rem] whitespace-pre-wrap">
            {line}
          </p>
        ))}
      </div>

      <form className="flex items-center" onSubmit={handleSubmit}>
        <label className="shrink-0" htmlFor="cmd-input">
          {prompt}
        </label>
        <input
          id="cmd-input"
          ref={inputRef}
          className="ml-1 min-w-0 flex-1 bg-transparent text-[#f2f2f2] caret-white outline-none"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          autoComplete="off"
          spellCheck="false"
          aria-label="Comando do terminal"
        />
      </form>

      <div ref={bottomRef} />
    </section>
  );
}
