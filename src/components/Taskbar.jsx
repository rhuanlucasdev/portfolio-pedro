import { AnimatePresence, motion } from "framer-motion";
import { FaWindows } from "react-icons/fa6";
import {
  HiChatBubbleLeftRight,
  HiChevronRight,
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
import { useEffect, useRef, useState } from "react";

export default function Taskbar({ onPowerAction }) {
  const { time, date } = useClock();
  const {
    apps,
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewWindowId, setPreviewWindowId] = useState(null);
  const [previewAnchorX, setPreviewAnchorX] = useState(8);
  const previewHideTimeout = useRef(null);

  const activeWindows = Object.values(windows).filter((window) => window.isOpen);
  const previewWindow = activeWindows.find(
    (window) => window.id === previewWindowId
  );
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = apps.filter((app) => {
    if (!normalizedQuery) return true;

    return [app.title, app.shortTitle, app.id]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  useEffect(() => {
    function closeMenu() {
      setTaskbarMenu(null);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
        setSearchOpen(false);
        setSearchQuery("");
        setPreviewWindowId(null);
      }
    }

    window.addEventListener("click", closeMenu);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setStartOpen(false);
        setSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    return () => clearPreviewHide();
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
    setPreviewWindowId(null);
  }

  function clearPreviewHide() {
    if (!previewHideTimeout.current) return;
    window.clearTimeout(previewHideTimeout.current);
    previewHideTimeout.current = null;
  }

  function showPreview(windowId, event) {
    clearPreviewHide();
    const bounds = event.currentTarget.getBoundingClientRect();
    setPreviewAnchorX(bounds.left + bounds.width / 2);
    setPreviewWindowId(windowId);
  }

  function schedulePreviewHide() {
    clearPreviewHide();
    previewHideTimeout.current = window.setTimeout(() => {
      setPreviewWindowId(null);
      previewHideTimeout.current = null;
    }, 120);
  }

  function openSearchResult(app) {
    openWindow(app.id);
    setSearchOpen(false);
    setSearchQuery("");
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const [firstResult] = searchResults;
    if (firstResult) openSearchResult(firstResult);
  }

  return (
    <>
      <AnimatePresence>
        {startOpen && (
          <StartMenu
            onClose={() => setStartOpen(false)}
            onPowerAction={onPowerAction}
          />
        )}
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

      <AnimatePresence>
        {searchOpen && (
          <motion.section
            className="fixed bottom-10 left-12 z-[10000] w-[min(92vw,520px)] border border-[#5b5b5b] bg-[#f3f3f3] text-slate-900 shadow-[0_18px_60px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            data-desktop-context-ignore
          >
            <form
              className="flex h-12 items-center gap-3 border-b border-slate-300 bg-white px-4"
              onSubmit={handleSearchSubmit}
            >
              <HiMagnifyingGlass size={19} className="text-slate-500" />
              <input
                autoFocus
                className="h-full flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Digite o nome de um app"
                aria-label="Pesquisar aplicativos"
              />
              <button
                className="grid h-8 w-8 place-items-center text-slate-600 hover:bg-slate-100"
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                aria-label="Fechar busca"
              >
                <HiXMark size={18} />
              </button>
            </form>

            <div className="max-h-[320px] overflow-auto py-2">
              {searchResults.length > 0 ? (
                searchResults.map((app) => {
                  const Icon = app.icon;

                  return (
                    <button
                      key={app.id}
                      className="flex h-14 w-full items-center gap-3 px-4 text-left hover:bg-[#0078d7] hover:text-white"
                      onClick={() => openSearchResult(app)}
                    >
                      <span
                        className={`grid h-9 w-9 place-items-center bg-gradient-to-br ${app.accent} text-white`}
                      >
                        <Icon size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                          {app.shortTitle}
                        </span>
                        <span className="block truncate text-xs opacity-75">
                          {app.title}
                        </span>
                      </span>
                      <HiChevronRight size={17} className="opacity-65" />
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-sm text-slate-500">
                  Nenhum aplicativo encontrado.
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewWindow && (
          <motion.div
            className="fixed bottom-12 z-[10000] w-56 border border-white/20 bg-[#202020]/96 p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur"
            style={{
              left: Math.max(
                8,
                Math.min(globalThis.innerWidth - 232, previewAnchorX - 112)
              ),
            }}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            onMouseEnter={clearPreviewHide}
            onMouseLeave={schedulePreviewHide}
            data-desktop-context-ignore
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2 text-xs font-semibold">
                {(() => {
                  const Icon = previewWindow.icon;
                  return <Icon size={16} />;
                })()}
                <span className="truncate">{previewWindow.title}</span>
              </div>
              <button
                className="grid h-6 w-6 place-items-center hover:bg-[#e81123]"
                onClick={() => closeTaskbarWindow(previewWindow)}
                aria-label={`Fechar ${previewWindow.title}`}
              >
                <HiXMark size={15} />
              </button>
            </div>

            <button
              className="block h-28 w-full border border-white/15 bg-[#f3f3f3] text-left text-slate-900"
              onClick={() => {
                openWindow(previewWindow.id);
                setPreviewWindowId(null);
              }}
            >
              <div className="flex h-6 items-center gap-2 border-b border-slate-300 bg-white px-2 text-[11px]">
                {(() => {
                  const Icon = previewWindow.icon;
                  return (
                    <span
                      className={`grid h-4 w-4 place-items-center bg-gradient-to-br ${previewWindow.accent} text-white`}
                    >
                      <Icon size={10} />
                    </span>
                  );
                })()}
                <span className="truncate">{previewWindow.title}</span>
              </div>
              <div className="grid h-[calc(100%-1.5rem)] place-items-center bg-[linear-gradient(135deg,#e5e7eb,#ffffff)] px-3 text-center text-xs text-slate-500">
                {previewWindow.isMinimized
                  ? "Janela minimizada"
                  : "Preview ativo"}
              </div>
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

        <button
          className={`grid h-10 w-10 place-items-center text-white hover:bg-white/15 md:hidden ${
            searchOpen ? "bg-white/20" : ""
          }`}
          onClick={() => {
            setStartOpen(false);
            setSearchOpen((value) => !value);
          }}
          aria-label="Abrir busca"
        >
          <HiMagnifyingGlass size={19} />
        </button>

        <button
          className={`hidden h-10 w-72 items-center gap-3 bg-white px-3 text-left text-sm text-slate-700 hover:bg-slate-100 md:flex ${
            searchOpen ? "ring-2 ring-[#76b9ed]" : ""
          }`}
          onClick={() => {
            setStartOpen(false);
            setSearchOpen((value) => !value);
          }}
        >
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
                onMouseEnter={(event) => showPreview(window.id, event)}
                onMouseLeave={schedulePreviewHide}
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

        <div
          className="hidden h-full min-w-24 place-items-center px-3 text-right text-[11px] leading-tight text-white/95 hover:bg-white/10 sm:grid"
        >
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
