import { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { HiMinus, HiOutlineSquare2Stack, HiXMark } from "react-icons/hi2";
import { useWindows } from "../context/WindowContext.jsx";

export default function Window({ windowData }) {
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updatePosition,
  } = useWindows();

  const Content = windowData.component;
  const Icon = windowData.icon;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const maximizedClasses = windowData.isMaximized
    ? "left-0 right-0 top-0 bottom-10 h-auto w-auto"
    : "";

  return (
    <motion.section
      className={`absolute left-0 top-0 overflow-hidden border border-[#6b6b6b] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.35)] ${maximizedClasses}`}
      data-desktop-context-ignore
      style={
        windowData.isMaximized
          ? { zIndex: windowData.zIndex }
          : {
              width: isMobile
                ? "calc(100vw - 1rem)"
                : windowData.size.width,
              height: isMobile
                ? "calc(100vh - 7rem)"
                : windowData.size.height,
              x: isMobile ? 8 : windowData.position.x,
              y: isMobile ? 8 : windowData.position.y,
              zIndex: windowData.zIndex,
            }
      }
      drag={!windowData.isMaximized && !isMobile}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      dragControls={dragControls}
      onMouseDown={() => focusWindow(windowData.id)}
      onDragEnd={(_, info) => {
        if (!windowData.isMaximized) {
          updatePosition(windowData.id, {
            x: windowData.position.x + info.offset.x,
            y: windowData.position.y + info.offset.y,
          });
        }
      }}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 16 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <motion.header
        className="flex items-center justify-between h-8 pl-2 bg-white border-b cursor-grab border-slate-200 active:cursor-grabbing"
        onPointerDown={(event) => {
          if (!windowData.isMaximized && !isMobile) {
            dragControls.start(event);
          }
        }}
      >
        <div className="flex items-center gap-2 text-xs font-normal text-slate-900">
          <span
            className={`grid h-5 w-5 place-items-center bg-gradient-to-br ${windowData.accent} text-white`}
          >
            <Icon size={13} />
          </span>
          {windowData.title}
        </div>

        <div className="flex items-center h-full">
          <button
            className="grid h-8 w-11 place-items-center text-slate-900 hover:bg-slate-200"
            onClick={() => minimizeWindow(windowData.id)}
            aria-label="Minimizar"
          >
            <HiMinus size={17} />
          </button>
          <button
            className="grid h-8 w-11 place-items-center text-slate-900 hover:bg-slate-200"
            onClick={() => toggleMaximize(windowData.id)}
            aria-label="Maximizar"
          >
            <HiOutlineSquare2Stack size={16} />
          </button>
          <button
            className="grid h-8 w-11 place-items-center text-slate-900 hover:bg-[#e81123] hover:text-white"
            onClick={() => closeWindow(windowData.id)}
            aria-label="Fechar"
          >
            <HiXMark size={18} />
          </button>
        </div>
      </motion.header>

      <div className="window-scrollbar h-[calc(100%-2rem)] overflow-auto bg-[#f3f3f3] p-5">
        <Content />
      </div>
    </motion.section>
  );
}
