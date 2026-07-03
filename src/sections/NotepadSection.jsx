export default function NotepadSection() {
  return (
    <section className="-m-5 flex min-h-[calc(100%+2.5rem)] flex-col bg-white text-slate-900">
      <div className="flex h-8 items-center gap-5 border-b border-slate-200 bg-[#f7f7f7] px-3 text-xs">
        <button className="hover:underline">Arquivo</button>
        <button className="hover:underline">Editar</button>
        <button className="hover:underline">Formatar</button>
        <button className="hover:underline">Exibir</button>
        <button className="hover:underline">Ajuda</button>
      </div>

      <textarea
        className="min-h-0 flex-1 resize-none bg-white p-4 font-mono text-[14px] leading-relaxed text-slate-950 outline-none"
        defaultValue={`README.txt

Olá, eu sou Pedro Lucas de Martino.

Sou Desenvolvedor Frontend com foco em ReactJS, TypeScript, JavaScript e TailwindCSS, criando interfaces modernas, responsivas e otimizadas para melhor experiência do usuário.

Tenho experiência prática no desenvolvimento de componentes reutilizáveis, integração com APIs e aplicação de boas práticas de código limpo. Também tenho familiaridade com UX/UI, Next.js e noções de backend com Node.js, .NET e C#.

Atualmente curso Análise e Desenvolvimento de Sistemas na UNA e busco oportunidades como Frontend Developer Júnior ou Estagiário para aplicar e expandir meus conhecimentos em soluções web eficientes e escaláveis.

Experiência atual: Almoxarife na Aptiv desde agosto de 2025, com atuação em controle de estoque, conferência de cargas, rastreabilidade, análise de risco, prevenção de perdas e melhoria contínua.

Formação: Tecnólogo em Análise e Desenvolvimento de Sistemas no Centro Universitário Una, de junho de 2024 a dezembro de 2026.

Este portfólio foi montado como uma experiência inspirada no Windows 10: área de trabalho, janelas, taskbar, menu iniciar, explorador de arquivos, terminal e ações rápidas.

O que você pode abrir:

- projetos.exe      Projeto no GitHub
- sobre-mim.exe     Bio e informações pessoais
- habilidades.exe   Stack técnica
- curriculo.pdf     Preview do currículo
- contato.exe       Canais de contato
- cmd.exe           Terminal interativo
- explorer.exe      Navegação pelos arquivos do portfólio

Contatos:

- Email: lyguines@gmail.com
- LinkedIn: https://www.linkedin.com/in/pedrolucasmartino/
- GitHub: https://github.com/Lyguinees
- WhatsApp: +55 35 98479-0919

Comandos úteis no cmd.exe:

help
about
skills
projects
contact
resume

Obrigado por visitar.`}
        spellCheck="false"
        aria-label="Conteúdo do README"
      />

      <div className="border-t border-slate-200 bg-[#f7f7f7] px-3 py-1 text-xs text-slate-600">
        Windows Notepad · UTF-8
      </div>
    </section>
  );
}
