import {
  FaGithub,
  FaLinkedin,
  FaRegEnvelope,
  FaWhatsapp,
} from "react-icons/fa6";

const links = [
  {
    icon: FaRegEnvelope,
    label: "Email",
    value: "lyguines@gmail.com",
    href: "mailto:lyguines@gmail.com",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/pedrolucasmartino",
    href: "https://www.linkedin.com/in/pedrolucasmartino/",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/Lyguinees",
    href: "https://github.com/Lyguinees",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+55 35 98479-0919",
    href: "https://wa.me/5535984790919",
  },
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
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Icon className="text-[#0078d7]" size={18} />
                  <span className="font-semibold">{item.label}</span>
                  <span className="truncate text-slate-600">{item.value}</span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="border border-slate-300 bg-white">
          <div className="border-b border-slate-200 bg-[#f7f7f7] px-3 py-2 font-semibold">
            Disponível para contato
          </div>
          <div className="grid gap-4 p-4">
            <p className="leading-relaxed text-slate-700">
              Pedro busca oportunidades como Frontend Developer Júnior ou
              Estagiário, com foco em ReactJS, TypeScript, Next.js e
              TailwindCSS.
            </p>
            <div className="grid gap-2 text-xs text-slate-600">
              <p>
                Prefira contato por email, LinkedIn ou WhatsApp para propostas,
                networking e conversas sobre projetos.
              </p>
              <p>Os links ao lado abrem diretamente os canais oficiais.</p>
            </div>
            <a
              className="w-fit bg-[#0078d7] px-5 py-2 text-sm font-semibold text-white hover:bg-[#006cc1]"
              href="mailto:lyguines@gmail.com"
            >
              Enviar email
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
