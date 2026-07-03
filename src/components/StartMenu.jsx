import { motion } from "framer-motion";
import { FaWindows } from "react-icons/fa6";
import {
  HiArrowPath,
  HiCog6Tooth,
  HiMagnifyingGlass,
  HiMoon,
  HiPower,
} from "react-icons/hi2";
import { useWindows } from "../context/WindowContext.jsx";
import { useState } from "react";

export default function StartMenu({ onClose, onPowerAction }) {
  const { apps, openWindow } = useWindows();
  const [powerOpen, setPowerOpen] = useState(false);

  function runPowerAction(action) {
    onClose();
    onPowerAction?.(action);
  }

  return (
    <motion.aside
      className="fixed bottom-10 left-0 z-[9998] flex h-[min(78vh,560px)] w-[min(94vw,760px)] border border-[#333333] bg-[#1f1f1f] text-white shadow-[0_0_40px_rgba(0,0,0,0.45)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
    >
      <div className="flex w-12 flex-col items-center justify-between bg-[#171717] py-3">
        <FaWindows size={18} />
        <div className="relative grid gap-4">
          <button
            className="grid h-8 w-8 place-items-center hover:bg-white/10"
            aria-label="Abrir configurações"
            onClick={() => {
              openWindow("settings");
              onClose();
            }}
          >
            <HiCog6Tooth size={21} />
          </button>
          <button
            className={`grid h-8 w-8 place-items-center hover:bg-white/10 ${
              powerOpen ? "bg-white/15" : ""
            }`}
            aria-label="Abrir opções de energia"
            onClick={() => setPowerOpen((value) => !value)}
          >
            <HiPower size={21} />
          </button>

          {powerOpen && (
            <div className="absolute bottom-0 left-10 w-44 border border-[#3a3a3a] bg-[#242424] py-1 text-sm shadow-[0_12px_34px_rgba(0,0,0,0.45)]">
              <button
                className="flex h-9 w-full items-center gap-3 px-3 text-left hover:bg-[#333333]"
                onClick={() => runPowerAction("shutdown")}
              >
                <HiMoon size={18} />
                Desligar
              </button>
              <button
                className="flex h-9 w-full items-center gap-3 px-3 text-left hover:bg-[#333333]"
                onClick={() => runPowerAction("restart")}
              >
                <HiArrowPath size={18} />
                Reiniciar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-[min(52vw,330px)] p-4">
        <div className="mb-4 flex h-9 items-center gap-2 border border-[#3a3a3a] bg-[#2b2b2b] px-3 text-sm text-white/75">
          <HiMagnifyingGlass size={17} />
          Pesquisar
        </div>

        <h2 className="mb-3 text-xs font-semibold uppercase text-white/70">
          Mais usados
        </h2>

        <div className="grid gap-1">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <button
                key={app.id}
                className="flex h-12 items-center gap-3 px-3 text-left text-sm hover:bg-[#333333]"
                onClick={() => {
                  openWindow(app.id);
                  onClose();
                }}
              >
                <span
                  className={`grid h-8 w-8 place-items-center bg-gradient-to-br ${app.accent} text-white`}
                >
                  <Icon size={18} />
                </span>
                <span>{app.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 border-t border-[#333333] pt-4 text-xs text-white/60">
          Rhuan Lucas · Frontend Developer
        </div>
      </div>

      <div className="hidden flex-1 border-l border-[#333333] p-4 sm:block">
        <h2 className="mb-3 text-xs font-semibold uppercase text-white/70">
          Fixados
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {apps.map((app, index) => {
            const Icon = app.icon;
            const spanClass = index === 0 ? "col-span-2 h-24" : "h-24";

            return (
              <button
                key={app.id}
                className={`${spanClass} bg-[#0078d7] p-3 text-left text-sm transition hover:bg-[#168eea]`}
                onClick={() => {
                  openWindow(app.id);
                  onClose();
                }}
              >
                <Icon size={24} />
                <span className="mt-6 block">{app.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
