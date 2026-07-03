import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DesktopContextMenu from "./DesktopContextMenu.jsx";
import DesktopIcon from "./DesktopIcon.jsx";
import Taskbar from "./Taskbar.jsx";
import Window from "./Window.jsx";
import { useWindows } from "../context/WindowContext.jsx";

const desktopOrder = [
  "explorer",
  "projects",
  "about",
  "skills",
  "resume",
  "contact",
  "readme",
  "cmd",
  "recycle",
  "settings",
];

export default function Desktop() {
  const { apps, windows, openWindow, focusWindow } = useWindows();
  const [contextMenu, setContextMenu] = useState(null);
  const [wallpaperVariant, setWallpaperVariant] = useState("default");
  const [refreshing, setRefreshing] = useState(false);
  const [altTab, setAltTab] = useState({ active: false, index: 0 });

  const openWindows = Object.values(windows).filter((window) => window.isOpen);
  const desktopApps = [...apps].sort(
    (first, second) =>
      desktopOrder.indexOf(first.id) - desktopOrder.indexOf(second.id)
  );

  useEffect(() => {
    function closeMenu() {
      setContextMenu(null);
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

  useEffect(() => {
    function handleKeyDown(event) {
      if (!event.altKey || event.key !== "Tab" || openWindows.length === 0) {
        return;
      }

      event.preventDefault();
      setAltTab((current) => ({
        active: true,
        index: current.active
          ? (current.index + 1) % openWindows.length
          : Math.max(
              0,
              openWindows.findIndex((window) => !window.isMinimized)
            ),
      }));
    }

    function handleKeyUp(event) {
      if (event.key !== "Alt") return;

      setAltTab((current) => {
        if (!current.active || openWindows.length === 0) return current;

        const selectedWindow = openWindows[current.index % openWindows.length];
        if (selectedWindow) focusWindow(selectedWindow.id);

        return { active: false, index: 0 };
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [focusWindow, openWindows]);

  useEffect(() => {
    function handleWallpaperChange(event) {
      setWallpaperVariant(event.detail?.variant ?? "default");
    }

    window.addEventListener("portfolio:set-wallpaper", handleWallpaperChange);
    return () =>
      window.removeEventListener(
        "portfolio:set-wallpaper",
        handleWallpaperChange
      );
  }, []);

  function handleContextMenu(event) {
    if (event.target.closest("[data-desktop-context-ignore]")) return;

    event.preventDefault();
    const menuWidth = 224;
    const menuHeight = 310;
    const x = Math.min(event.clientX, window.innerWidth - menuWidth - 8);
    const y = Math.min(event.clientY, window.innerHeight - menuHeight - 48);
    setContextMenu({ x: Math.max(8, x), y: Math.max(8, y) });
  }

  function handleRefresh() {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 280);
  }

  const wallpaperClass =
    wallpaperVariant === "default"
      ? "bg-[linear-gradient(135deg,#082342_0%,#005a9e_44%,#00a4ef_100%)]"
      : "bg-[linear-gradient(135deg,#1b1b1b_0%,#30475f_46%,#0078d7_100%)]";

  return (
    <motion.main
      className={`relative h-screen w-screen overflow-hidden ${wallpaperClass} p-4 pb-12 font-system text-slate-900`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onContextMenu={handleContextMenu}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0_43%,rgba(255,255,255,0.22)_43%_45%,transparent_45%),radial-gradient(circle_at_76%_44%,rgba(255,255,255,0.22),transparent_24%)]" />
        <div className="absolute bottom-10 right-0 h-[68vh] w-[58vw] bg-cyan-300/20 blur-3xl" />
      </div>

      <motion.section
        className="relative z-10 grid w-fit max-w-[calc(100vw-1rem)] grid-cols-2 gap-x-2 gap-y-1 overflow-hidden"
        style={{ maxHeight: "calc(100vh - 4rem)" }}
        animate={refreshing ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
        transition={{ duration: 0.28 }}
      >
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </motion.section>

      <AnimatePresence>
        {Object.values(windows)
          .filter((window) => window.isOpen && !window.isMinimized)
          .map((window) => (
            <Window key={window.id} windowData={window} />
          ))}
      </AnimatePresence>

      <Taskbar />

      <AnimatePresence>
        {altTab.active && openWindows.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[10004] grid place-items-center bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-desktop-context-ignore
          >
            <div className="flex max-w-[90vw] gap-3 border border-white/20 bg-[#1f1f1f]/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              {openWindows.map((window, index) => {
                const Icon = window.icon;
                const selected = index === altTab.index % openWindows.length;

                return (
                  <div
                    key={window.id}
                    className={`grid h-28 w-36 place-items-center border p-3 text-center text-xs text-white ${
                      selected
                        ? "border-[#76b9ed] bg-[#0078d7]"
                        : "border-white/10 bg-white/8"
                    }`}
                  >
                    <Icon size={28} />
                    <span className="mt-2 line-clamp-2">{window.title}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.08 }}
          >
            <DesktopContextMenu
              position={contextMenu}
              onClose={() => setContextMenu(null)}
              onRefresh={handleRefresh}
              onOpenExplorer={() => openWindow("explorer")}
              onOpenCmd={() => openWindow("cmd")}
              onToggleWallpaper={() =>
                setWallpaperVariant((value) =>
                  value === "default" ? "dark" : "default"
                )
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
