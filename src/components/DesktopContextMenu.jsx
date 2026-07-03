import {
  HiChevronRight,
  HiDesktopComputer,
  HiFolderOpen,
  HiRefresh,
} from "react-icons/hi";
import { FaTerminal } from "react-icons/fa6";

export default function DesktopContextMenu({
  position,
  onClose,
  onRefresh,
  onOpenExplorer,
  onOpenCmd,
  onToggleWallpaper,
}) {
  const menuItems = [
    { label: "Exibir", shortcut: "", hasSubmenu: true },
    { label: "Classificar por", shortcut: "", hasSubmenu: true },
    { label: "Atualizar", icon: HiRefresh, onClick: onRefresh },
    { type: "separator" },
    { label: "Novo", shortcut: "", hasSubmenu: true },
    { type: "separator" },
    { label: "Abrir no Explorador", icon: HiFolderOpen, onClick: onOpenExplorer },
    { label: "Abrir Prompt aqui", icon: FaTerminal, onClick: onOpenCmd },
    { type: "separator" },
    {
      label: "Configurações de exibição",
      icon: HiDesktopComputer,
      disabled: true,
    },
    {
      label: "Personalizar",
      icon: HiDesktopComputer,
      onClick: onToggleWallpaper,
    },
  ];

  function handleItemClick(item) {
    if (item.disabled || item.hasSubmenu) return;
    item.onClick?.();
    onClose();
  }

  return (
    <div
      className="fixed z-[10000] w-56 border border-[#979797] bg-[#f2f2f2] py-1 text-[12px] text-slate-900 shadow-[3px_3px_12px_rgba(0,0,0,0.35)]"
      style={{ left: position.x, top: position.y }}
      role="menu"
      data-desktop-context-ignore
    >
      {menuItems.map((item, index) => {
        if (item.type === "separator") {
          return <div key={`sep-${index}`} className="my-1 border-t border-slate-300" />;
        }

        const Icon = item.icon;

        return (
          <button
            key={item.label}
            className={`flex h-7 w-full items-center gap-2 px-2 text-left ${
              item.disabled
                ? "text-slate-400"
                : "hover:bg-[#0078d7] hover:text-white"
            }`}
            onClick={() => handleItemClick(item)}
            role="menuitem"
            disabled={item.disabled}
          >
            <span className="grid w-5 place-items-center">
              {Icon ? <Icon size={16} /> : null}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.hasSubmenu ? <HiChevronRight size={14} /> : null}
          </button>
        );
      })}
    </div>
  );
}
