import { motion } from "framer-motion";
import { useWindows } from "../context/WindowContext.jsx";

export default function DesktopIcon({ app }) {
  const { openWindow } = useWindows();
  const Icon = app.icon;

  return (
    <motion.button
      className="group flex h-[76px] w-24 flex-col items-center gap-1 overflow-hidden p-1.5 text-center text-xs font-medium text-white outline-none transition hover:bg-white/20 focus-visible:ring-1 focus-visible:ring-white"
      data-desktop-context-ignore
      onClick={() => openWindow(app.id)}
      onDoubleClick={() => openWindow(app.id)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      title={`Abrir ${app.title}`}
    >
      <span
        className={`grid h-10 w-10 place-items-center bg-gradient-to-br ${app.accent} text-white shadow-icon transition group-hover:scale-105`}
      >
        <Icon size={24} />
      </span>
      <span className="line-clamp-2 px-1 py-0.5 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
        {app.title}
      </span>
    </motion.button>
  );
}
