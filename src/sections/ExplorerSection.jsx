import {
  HiChevronRight,
  HiClipboardList,
  HiDesktopComputer,
  HiDocumentText,
  HiFolder,
  HiFolderOpen,
  HiHome,
  HiCog,
  HiTrash,
} from "react-icons/hi";
import { FaTerminal } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useWindows } from "../context/WindowContext.jsx";

const quickAccess = [
  { label: "Área de Trabalho", icon: HiDesktopComputer },
  { label: "Downloads", icon: HiFolder },
  { label: "Documentos", icon: HiDocumentText },
];

const items = [
  {
    id: "recycle",
    name: "Lixeira",
    type: "Pasta do sistema",
    modified: "03/07/2026 10:12",
    icon: HiTrash,
    color: "text-slate-600",
  },
  {
    id: "settings",
    name: "Configurações",
    type: "Aplicativo",
    modified: "03/07/2026 10:14",
    icon: HiCog,
    color: "text-slate-700",
  },
  {
    id: "readme",
    name: "README.txt",
    type: "Documento de Texto",
    modified: "03/07/2026 10:18",
    icon: HiDocumentText,
    color: "text-slate-700",
  },
  {
    id: "projects",
    name: "Projetos",
    type: "Pasta de arquivos",
    modified: "03/07/2026 10:22",
    icon: HiFolder,
    color: "text-yellow-500",
  },
  {
    id: "about",
    name: "Sobre mim",
    type: "Aplicativo",
    modified: "03/07/2026 10:24",
    icon: HiDocumentText,
    color: "text-sky-600",
  },
  {
    id: "skills",
    name: "Habilidades",
    type: "Aplicativo",
    modified: "03/07/2026 10:26",
    icon: HiFolderOpen,
    color: "text-yellow-500",
  },
  {
    id: "resume",
    name: "curriculo.pdf",
    type: "PDF",
    modified: "03/07/2026 10:28",
    icon: HiDocumentText,
    color: "text-red-600",
  },
  {
    id: "contact",
    name: "Contato",
    type: "Atalho",
    modified: "03/07/2026 10:30",
    icon: HiDocumentText,
    color: "text-blue-600",
  },
  {
    id: "cmd",
    name: "cmd.exe",
    type: "Aplicativo",
    modified: "03/07/2026 10:32",
    icon: FaTerminal,
    color: "text-slate-900",
  },
];

export default function ExplorerSection() {
  const { openWindow } = useWindows();
  const [contextMenu, setContextMenu] = useState(null);
  const [propertiesItem, setPropertiesItem] = useState(null);

  useEffect(() => {
    function closeMenu() {
      setContextMenu(null);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMenu();
        setPropertiesItem(null);
      }
    }

    window.addEventListener("click", closeMenu);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleItemContextMenu(event, item) {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      item,
    });
  }

  return (
    <section className="-m-5 flex min-h-[calc(100%+2.5rem)] flex-col bg-white text-sm text-slate-900">
      <div className="border-b border-slate-300 bg-[#f5f6f7]">
        <div className="flex h-9 items-end gap-1 px-2 text-xs">
          {["Arquivo", "Início", "Compartilhar", "Exibir"].map((tab, index) => (
            <button
              key={tab}
              className={`h-7 px-4 ${
                index === 1
                  ? "border border-slate-300 border-b-white bg-white"
                  : "hover:bg-white/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex h-11 items-center gap-2 border-t border-slate-200 bg-white px-2">
          <button className="grid h-7 w-7 place-items-center border border-slate-300 hover:bg-slate-100">
            ‹
          </button>
          <button className="grid h-7 w-7 place-items-center border border-slate-300 hover:bg-slate-100">
            ›
          </button>

          <div className="flex h-7 flex-1 items-center border border-slate-300 bg-white px-2 text-xs">
            <HiHome className="mr-2 text-sky-700" size={16} />
            <span>Este Computador</span>
            <HiChevronRight className="mx-1 text-slate-500" size={14} />
            <span>Portfólio</span>
          </div>

          <div className="hidden h-7 w-48 items-center border border-slate-300 px-2 text-xs text-slate-500 sm:flex">
            Pesquisar Portfólio
          </div>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[150px_1fr]">
        <aside className="border-r border-slate-200 bg-[#f7f7f7] py-2 text-xs">
          <p className="px-3 py-1 font-semibold text-slate-600">
            Acesso rápido
          </p>
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="flex h-8 w-full items-center gap-2 px-4 text-left hover:bg-[#e5f3ff]"
              >
                <Icon className="text-yellow-500" size={17} />
                {item.label}
              </button>
            );
          })}

          <p className="mt-3 px-3 py-1 font-semibold text-slate-600">
            Este Computador
          </p>
          <button className="flex h-8 w-full items-center gap-2 bg-[#dbeeff] px-4 text-left">
            <HiFolderOpen className="text-yellow-500" size={17} />
            Portfólio
          </button>
        </aside>

        <main className="min-w-0 overflow-auto bg-white">
          <div className="grid grid-cols-[minmax(180px,1fr)_150px_170px] border-b border-slate-200 bg-[#f7f7f7] text-xs text-slate-600">
            <div className="border-r border-slate-200 px-3 py-1.5">Nome</div>
            <div className="border-r border-slate-200 px-3 py-1.5">Tipo</div>
            <div className="px-3 py-1.5">Modificado em</div>
          </div>

          <div>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="grid w-full grid-cols-[minmax(180px,1fr)_150px_170px] text-left text-xs hover:bg-[#e5f3ff] focus:bg-[#cce8ff] focus:outline-none"
                  onClick={() => openWindow(item.id)}
                  onDoubleClick={() => openWindow(item.id)}
                  onContextMenu={(event) => handleItemContextMenu(event, item)}
                >
                  <span className="flex items-center gap-2 px-3 py-2">
                    <Icon className={item.color} size={21} />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span className="px-3 py-2 text-slate-600">{item.type}</span>
                  <span className="px-3 py-2 text-slate-600">
                    {item.modified}
                  </span>
                </button>
              );
            })}
          </div>
        </main>
      </div>

      {contextMenu && (
        <div
          className="fixed z-[10002] w-44 border border-[#979797] bg-[#f2f2f2] py-1 text-xs text-slate-900 shadow-[3px_3px_12px_rgba(0,0,0,0.35)]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(event) => event.stopPropagation()}
          data-desktop-context-ignore
        >
          <button
            className="flex h-7 w-full items-center gap-2 px-2 text-left hover:bg-[#0078d7] hover:text-white"
            onClick={() => {
              openWindow(contextMenu.item.id);
              setContextMenu(null);
            }}
          >
            <HiFolderOpen size={15} />
            Abrir
          </button>
          <button
            className="flex h-7 w-full items-center gap-2 px-2 text-left hover:bg-[#0078d7] hover:text-white"
            onClick={() => {
              setPropertiesItem(contextMenu.item);
              setContextMenu(null);
            }}
          >
            <HiClipboardList size={15} />
            Propriedades
          </button>
        </div>
      )}

      {propertiesItem && (
        <div
          className="fixed inset-0 z-[10003] grid place-items-center bg-black/20"
          data-desktop-context-ignore
        >
          <section className="w-[min(92vw,380px)] border border-[#6b6b6b] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
            <header className="flex h-8 items-center justify-between border-b border-slate-200 bg-white pl-3">
              <span className="text-xs">{propertiesItem.name} Propriedades</span>
              <button
                className="grid h-8 w-11 place-items-center hover:bg-[#e81123] hover:text-white"
                onClick={() => setPropertiesItem(null)}
              >
                ×
              </button>
            </header>

            <div className="p-4 text-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                {(() => {
                  const Icon = propertiesItem.icon;
                  return (
                    <Icon className={propertiesItem.color} size={36} />
                  );
                })()}
                <input
                  className="h-8 flex-1 border border-slate-300 px-2"
                  value={propertiesItem.name}
                  readOnly
                />
              </div>

              <dl className="mt-4 grid grid-cols-[90px_1fr] gap-y-2 text-xs">
                <dt className="text-slate-500">Tipo:</dt>
                <dd>{propertiesItem.type}</dd>
                <dt className="text-slate-500">Local:</dt>
                <dd>C:\Users\Pedro\portfolio</dd>
                <dt className="text-slate-500">Modificado:</dt>
                <dd>{propertiesItem.modified}</dd>
                <dt className="text-slate-500">Atributos:</dt>
                <dd>Somente leitura, Arquivo</dd>
              </dl>
            </div>

            <footer className="flex justify-end gap-2 border-t border-slate-200 bg-[#f3f3f3] p-3">
              <button
                className="border border-slate-400 bg-white px-4 py-1 text-xs hover:bg-slate-100"
                onClick={() => setPropertiesItem(null)}
              >
                OK
              </button>
            </footer>
          </section>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-[#f7f7f7] px-3 py-1 text-xs text-slate-600">
        {items.length} itens
      </footer>
    </section>
  );
}
