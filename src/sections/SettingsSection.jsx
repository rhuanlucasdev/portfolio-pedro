import { HiColorSwatch, HiDesktopComputer, HiMoon, HiSun } from "react-icons/hi";
import { useEffect, useState } from "react";

const wallpapers = [
  {
    id: "default",
    name: "Windows Azul",
    preview: "bg-[linear-gradient(135deg,#082342,#005a9e,#00a4ef)]",
  },
  {
    id: "dark",
    name: "Noite",
    preview: "bg-[linear-gradient(135deg,#1b1b1b,#30475f,#0078d7)]",
  },
];

export default function SettingsSection({ theme = "light" }) {
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const isDark = selectedTheme === "dark";

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  function setWallpaper(variant) {
    window.dispatchEvent(
      new CustomEvent("portfolio:set-wallpaper", { detail: { variant } })
    );
  }

  function setSystemTheme(nextTheme) {
    setSelectedTheme(nextTheme);
    window.dispatchEvent(
      new CustomEvent("portfolio:set-theme", { detail: { theme: nextTheme } })
    );
  }

  return (
    <section className="-m-5 grid min-h-[calc(100%+2.5rem)] grid-cols-[180px_1fr] bg-white text-sm text-slate-900">
      <aside className="border-r border-slate-200 bg-[#f3f3f3] p-4">
        <h1 className="text-lg font-semibold">Configurações</h1>
        <div className="mt-4 grid gap-1 text-xs">
          <button className="flex items-center gap-2 bg-[#dbeeff] px-2 py-2 text-left">
            <HiDesktopComputer size={18} />
            Personalização
          </button>
          <button className="flex items-center gap-2 px-2 py-2 text-left hover:bg-white">
            <HiColorSwatch size={18} />
            Cores
          </button>
        </div>
      </aside>

      <main className="p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[#0067c0]">
          Personalização
        </p>
        <h2 className="mt-1 text-2xl font-semibold">Tela de fundo</h2>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Escolha um wallpaper para a área de trabalho do portfólio.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {wallpapers.map((wallpaper) => (
            <button
              key={wallpaper.id}
              className="border border-slate-300 bg-white p-3 text-left hover:border-[#0078d7] hover:bg-[#e5f3ff]"
              onClick={() => setWallpaper(wallpaper.id)}
            >
              <div className={`h-28 border border-slate-300 ${wallpaper.preview}`} />
              <p className="mt-2 font-semibold">{wallpaper.name}</p>
              <p className="text-xs text-slate-600">Aplicar plano de fundo</p>
            </button>
          ))}
        </div>

        <div className="mt-6 border border-slate-200 bg-[#f7f7f7] p-4">
          <h3 className="font-semibold">Modo do sistema</h3>
          <div className="mt-3 flex gap-2">
            <button
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold ${
                !isDark
                  ? "bg-[#0078d7] text-white"
                  : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
              }`}
              onClick={() => setSystemTheme("light")}
            >
              <HiSun size={17} />
              Claro
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold ${
                isDark
                  ? "bg-[#0078d7] text-white"
                  : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
              }`}
              onClick={() => setSystemTheme("dark")}
            >
              <HiMoon size={17} />
              Escuro
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
