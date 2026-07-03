import { motion } from "framer-motion";
import {
  HiBell,
  HiCalendar,
  HiCog,
  HiDesktopComputer,
  HiMoon,
  HiOutlineWifi,
} from "react-icons/hi";
import { useWindows } from "../context/WindowContext.jsx";

const notifications = [
  {
    title: "Projeto no GitHub",
    body: "dnd-character-generator está disponível no repositório do Pedro.",
    time: "Agora",
  },
  {
    title: "Currículo atualizado",
    body: "curriculo.pdf recebeu uma revisão com stack e experiência.",
    time: "Hoje",
  },
  {
    title: "Disponível para oportunidades",
    body: "Entre em contato por email, LinkedIn ou GitHub.",
    time: "03/07",
  },
];

const quickActions = [
  { label: "Todas configs.", icon: HiCog, active: true, app: "settings" },
  { label: "Projetar", icon: HiDesktopComputer, active: false },
  { label: "Rede", icon: HiOutlineWifi, active: true },
  { label: "Luz noturna", icon: HiMoon, active: false },
];

export default function ActionCenter({ onClose }) {
  const { openWindow } = useWindows();

  function handleQuickAction(action) {
    if (action.app) {
      openWindow(action.app);
      onClose();
    }
  }

  return (
    <motion.aside
      className="fixed bottom-10 right-0 z-[9998] flex h-[calc(100vh-2.5rem)] w-[min(92vw,360px)] flex-col border-l border-[#333333] bg-[#1f1f1f] text-white shadow-[0_0_40px_rgba(0,0,0,0.45)]"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      data-desktop-context-ignore
    >
      <header className="flex items-center justify-between border-b border-[#333333] px-4 py-3">
        <div>
          <h2 className="text-base font-semibold">Central de ações</h2>
          <p className="text-xs text-white/55">Windows Portfolio</p>
        </div>
        <button
          className="text-xs text-[#76b9ed] hover:underline"
          onClick={onClose}
        >
          Limpar tudo
        </button>
      </header>

      <div className="flex-1 overflow-auto p-3">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-white/60">
          <HiBell size={16} />
          Notificações
        </div>

        <div className="grid gap-2">
          {notifications.map((notification) => (
            <article
              key={notification.title}
              className="border-l-4 border-[#0078d7] bg-[#2b2b2b] p-3 hover:bg-[#333333]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold">{notification.title}</h3>
                <span className="text-[11px] text-white/55">
                  {notification.time}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/72">
                {notification.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <footer className="border-t border-[#333333] p-3">
        <div className="mb-2 flex items-center gap-2 text-xs text-white/60">
          <HiCalendar size={15} />
          Ações rápidas
        </div>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className={`flex h-16 flex-col justify-between p-2 text-left text-xs ${
                  action.active
                    ? "bg-[#0078d7] text-white"
                    : "bg-[#2b2b2b] text-white/85 hover:bg-[#333333]"
                }`}
                onClick={() => handleQuickAction(action)}
              >
                <Icon size={20} />
                {action.label}
              </button>
            );
          })}
        </div>
      </footer>
    </motion.aside>
  );
}
