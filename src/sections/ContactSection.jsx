import { FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa6";

const links = [
  { icon: FaRegEnvelope, label: "Email", value: "seuemail@email.com" },
  { icon: FaLinkedin, label: "LinkedIn", value: "/in/seuusuario" },
  { icon: FaGithub, label: "GitHub", value: "@seuusuario" },
];

export default function ContactSection() {
  return (
    <section className="-m-5 min-h-[calc(100%+2.5rem)] bg-white text-sm text-slate-900">
      <header className="border-b border-slate-300 bg-[#f5f6f7] px-4 py-2">
        <p className="text-xs text-slate-600">Contatos</p>
        <h1 className="text-lg font-semibold">contato.exe</h1>
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_1.1fr]">
        <section className="border border-slate-300 bg-white">
          <div className="border-b border-slate-200 bg-[#f7f7f7] px-3 py-2 font-semibold">
            Links rápidos
          </div>
          <div className="divide-y divide-slate-100">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  className="grid grid-cols-[34px_90px_1fr] items-center px-3 py-3 text-sm hover:bg-[#e5f3ff]"
                  href="#"
                >
                  <Icon className="text-[#0078d7]" size={18} />
                  <span className="font-semibold">{item.label}</span>
                  <span className="truncate text-slate-600">{item.value}</span>
                </a>
              );
            })}
          </div>
        </section>

        <form className="border border-slate-300 bg-white">
          <div className="border-b border-slate-200 bg-[#f7f7f7] px-3 py-2 font-semibold">
            Nova mensagem
          </div>
          <div className="grid gap-3 p-3">
            <label className="grid gap-1 text-xs font-semibold text-slate-700">
              Seu nome
              <input
                className="h-9 border border-slate-300 bg-white px-2 text-sm font-normal outline-none focus:border-[#0078d7]"
                placeholder="Nome"
              />
            </label>
            <label className="grid gap-1 text-xs font-semibold text-slate-700">
              Seu email
              <input
                className="h-9 border border-slate-300 bg-white px-2 text-sm font-normal outline-none focus:border-[#0078d7]"
                placeholder="email@exemplo.com"
              />
            </label>
            <label className="grid gap-1 text-xs font-semibold text-slate-700">
              Mensagem
              <textarea
                className="min-h-28 border border-slate-300 bg-white px-2 py-2 text-sm font-normal outline-none focus:border-[#0078d7]"
                placeholder="Digite sua mensagem"
              />
            </label>
            <button
              className="w-fit bg-[#0078d7] px-5 py-2 text-sm font-semibold text-white hover:bg-[#006cc1]"
              type="button"
            >
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
