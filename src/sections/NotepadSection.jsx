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

Olá, eu sou Rhuan Lucas.

Sou desenvolvedor frontend focado em interfaces modernas, responsivas e bem estruturadas. Este portfólio foi montado como uma experiência inspirada no Windows 10: área de trabalho, janelas, taskbar, menu iniciar, explorador de arquivos, terminal e ações rápidas.

O que você pode abrir:

- projetos.exe      Projetos em destaque
- sobre-mim.exe     Bio e informações pessoais
- habilidades.exe   Stack técnica
- curriculo.pdf     Preview do currículo
- contato.exe       Links e formulário de contato
- cmd.exe           Terminal interativo
- explorer.exe      Navegação pelos arquivos do portfólio

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
