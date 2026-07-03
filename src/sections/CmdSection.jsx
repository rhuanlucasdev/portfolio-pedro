import { useEffect, useRef, useState } from "react";
import { useWindows } from "../context/WindowContext.jsx";

const prompt = "C:\\Users\\Pedro\\portfolio>";

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
    "  projects    Lista projetos publicados no GitHub",
    "  contact     Mostra canais de contato",
    "  resume      Abre um resumo do currículo",
    "  open <app>   Abre uma janela (ex: open projects)",
    "  cls/clear   Limpa o terminal",
  ],
  about: [
    "Pedro Lucas de Martino - Frontend Developer",
    "Crio interfaces modernas, responsivas e otimizadas para experiência do usuário.",
    "Foco em ReactJS, TypeScript, JavaScript, TailwindCSS e Next.js.",
    "Este portfólio simula um ambiente Windows 10 com apps, janelas e taskbar.",
  ],
  skills: [
    "Linguagens e frameworks: JavaScript, TypeScript, ReactJS, Next.js, HTML5, CSS3",
    "Estilização: TailwindCSS, UX/UI, Design Responsivo",
    "Boas práticas: Clean Code, Componentização, Reutilização de Componentes, Integração com APIs",
    "Backend: noções de Node.js, .NET e C#",
    "Complementares: melhoria contínua, análise de risco, prevenção de perdas e resolução de problemas",
  ],
  projects: [
    "1. dnd-character-generator",
    "   Repositório: https://github.com/Lyguinees/dnd-character-generator",
    "   Status: disponível no GitHub, sem deploy em produção.",
  ],
  contact: [
    "Email: lyguines@gmail.com",
    "LinkedIn: https://www.linkedin.com/in/pedrolucasmartino/",
    "GitHub: https://github.com/Lyguinees",
    "WhatsApp: +55 35 98479-0919",
  ],
  resume: [
    "Frontend Developer Júnior / Estagiário",
    "Foco: ReactJS, TypeScript, Next.js, TailwindCSS, Clean Code e UI responsiva.",
    "Almoxarife na Aptiv desde agosto de 2025.",
    "ADS no Centro Universitário Una: junho/2024 a dezembro/2026.",
    "Abra curriculo.pdf no desktop para ver o preview e baixar o PDF.",
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
