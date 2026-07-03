import { AnimatePresence, motion } from "framer-motion";
import { FaWindows } from "react-icons/fa6";
import {
  HiChatBubbleLeftRight,
  HiEye,
  HiMagnifyingGlass,
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark,
  HiXMark,
} from "react-icons/hi2";
import { useClock } from "../hooks/useClock.js";
import { useWindows } from "../context/WindowContext.jsx";
import ActionCenter from "./ActionCenter.jsx";
import StartMenu from "./StartMenu.jsx";
import { useEffect, useState } from "react";

export default function Taskbar() {
  const { time, date } = useClock();
  const {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    muted,
    setMuted,
  } = useWindows();
  const [startOpen, setStartOpen] = useState(false);
  const [actionCenterOpen, setActionCenterOpen] = useState(false);
  const [taskbarMenu, setTaskbarMenu] = useState(null);

  const activeWindows = Object.values(windows).filter((window) => window.isOpen);

  useEffect(() => {
    function closeMenu() {
      setTaskbarMenu(null);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") closeMenu();
    }

    window.addEventListener("click", closeMenu);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleTaskbarClick(window) {
    setTaskbarMenu(null);
    if (window.isMinimized) openWindow(window.id);
    else {
      focusWindow(window.id);
      minimizeWindow(window.id);
    }
  }

  function handleTaskbarContextMenu(event, window) {
    event.preventDefault();
    event.stopPropagation();

    const menuWidth = 220;
    const x = Math.min(event.clientX, globalThis.innerWidth - menuWidth - 8);
    setTaskbarMenu({
      x: Math.max(8, x),
      y: Math.max(8, event.clientY - 86),
      window,
    });
  }

  function restoreWindow(window) {
    openWindow(window.id);
    setTaskbarMenu(null);
  }

  function closeTaskbarWindow(window) {
    closeWindow(window.id);
    setTaskbarMenu(null);
  }

  return (
    <>
      <AnimatePresence>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {actionCenterOpen && (
          <ActionCenter onClose={() => setActionCenterOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {taskbarMenu && (
          <motion.div
            className="fixed z-[10001] w-[220px] border border-[#979797] bg-[#f2f2f2] py-1 text-[12px] text-slate-900 shadow-[3px_3px_12px_rgba(0,0,0,0.35)]"
            style={{ left: taskbarMenu.x, top: taskbarMenu.y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.08 }}
            role="menu"
            data-desktop-context-ignore
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-300 px-3 py-2 font-semibold">
              {(() => {
                const Icon = taskbarMenu.window.icon;
                return <Icon size={16} />;
              })()}
              <span className="truncate">{taskbarMenu.window.title}</span>
            </div>

            <button
              className="flex h-8 w-full items-center gap-2 px-3 text-left hover:bg-[#0078d7] hover:text-white"
              onClick={() => restoreWindow(taskbarMenu.window)}
              role="menuitem"
            >
              <HiEye size={16} />
              {taskbarMenu.window.isMinimized ? "Restaurar" : "Mostrar"}
            </button>
            <button
              className="flex h-8 w-full items-center gap-2 px-3 text-left hover:bg-[#0078d7] hover:text-white"
              onClick={() => closeTaskbarWindow(taskbarMenu.window)}
              role="menuitem"
            >
              <HiXMark size={17} />
              Fechar janela
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer
        className="fixed bottom-0 left-0 z-[9999] flex h-10 w-full items-center bg-[#101010]/95 text-white shadow-[0_-1px_0_rgba(255,255,255,0.08)] backdrop-blur"
        data-desktop-context-ignore
      >
        <motion.button
          className={`grid h-10 w-12 place-items-center text-white transition hover:bg-white/15 ${
            startOpen ? "bg-white/20 text-[#00a4ef]" : ""
          }`}
          onClick={() => setStartOpen((value) => !value)}
          whileTap={{ scale: 0.96 }}
          aria-label="Abrir menu iniciar"
        >
          <FaWindows size={19} />
        </motion.button>

        <button className="hidden h-10 w-72 items-center gap-3 bg-white px-3 text-left text-sm text-slate-700 hover:bg-slate-100 md:flex">
          <HiMagnifyingGlass size={18} />
          Digite aqui para pesquisar
        </button>

        <div className="flex h-full flex-1 items-center">
          {activeWindows.map((window) => {
            const Icon = window.icon;
            return (
              <motion.button
                key={window.id}
                className={`relative grid h-10 w-12 place-items-center text-white transition hover:bg-white/15 ${
                  !window.isMinimized ? "bg-white/12" : ""
                }`}
                onClick={() => handleTaskbarClick(window)}
                onContextMenu={(event) =>
                  handleTaskbarContextMenu(event, window)
                }
                whileTap={{ scale: 0.96 }}
                title={window.title}
              >
                <Icon size={20} />
                <span className="absolute bottom-0 h-0.5 w-8 bg-[#76b9ed]" />
              </motion.button>
            );
          })}
        </div>

        <button
          className="grid h-10 w-10 place-items-center text-white hover:bg-white/15"
          onClick={() => setMuted((value) => !value)}
          title={muted ? "Som desligado" : "Som ligado"}
        >
          {muted ? (
            <HiMiniSpeakerXMark size={19} />
          ) : (
            <HiMiniSpeakerWave size={19} />
          )}
        </button>

        <div className="hidden h-full min-w-24 place-items-center px-3 text-right text-[11px] leading-tight text-white/95 hover:bg-white/10 sm:grid">
          <div>{time}</div>
          <div>{date}</div>
        </div>

        <button
          className={`grid h-10 w-10 place-items-center text-white hover:bg-white/15 ${
            actionCenterOpen ? "bg-white/20" : ""
          }`}
          onClick={() => setActionCenterOpen((value) => !value)}
          aria-label="Abrir central de ações"
        >
          <HiChatBubbleLeftRight size={19} />
        </button>
      </footer>
    </>
  );
}
