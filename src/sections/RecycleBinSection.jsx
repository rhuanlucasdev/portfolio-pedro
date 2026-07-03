import { HiDocumentText, HiTrash } from "react-icons/hi";

const deletedItems = [
  {
    name: "layout-ruim-final-final.zip",
    original: "C:\\Users\\Rhuan\\Desktop",
    removed: "03/07/2026 09:41",
  },
  {
    name: "bugs-antigos.log",
    original: "C:\\Projects\\portfolio",
    removed: "03/07/2026 09:58",
  },
  {
    name: "ideia-sem-contraste.png",
    original: "C:\\Designs\\drafts",
    removed: "03/07/2026 10:07",
  },
];

export default function RecycleBinSection() {
  return (
    <section className="-m-5 flex min-h-[calc(100%+2.5rem)] flex-col bg-white text-sm text-slate-900">
      <div className="border-b border-slate-300 bg-[#f5f6f7] px-3 py-2">
        <div className="flex items-center gap-2 text-xs">
          <HiTrash className="text-slate-600" size={18} />
          <span>Lixeira</span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[160px_1fr]">
        <aside className="border-r border-slate-200 bg-[#f7f7f7] p-3 text-xs">
          <button className="mb-2 block w-full text-left text-[#0067c0] hover:underline">
            Esvaziar Lixeira
          </button>
          <button className="block w-full text-left text-[#0067c0] hover:underline">
            Restaurar todos os itens
          </button>
        </aside>

        <main className="overflow-auto">
          <div className="grid grid-cols-[minmax(190px,1fr)_190px_150px] border-b border-slate-200 bg-[#f7f7f7] text-xs text-slate-600">
            <div className="border-r border-slate-200 px-3 py-1.5">Nome</div>
            <div className="border-r border-slate-200 px-3 py-1.5">
              Local original
            </div>
            <div className="px-3 py-1.5">Excluído em</div>
          </div>

          {deletedItems.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-[minmax(190px,1fr)_190px_150px] text-xs hover:bg-[#e5f3ff]"
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <HiDocumentText className="text-slate-500" size={20} />
                <span className="truncate">{item.name}</span>
              </div>
              <div className="truncate px-3 py-2 text-slate-600">
                {item.original}
              </div>
              <div className="px-3 py-2 text-slate-600">{item.removed}</div>
            </div>
          ))}
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-[#f7f7f7] px-3 py-1 text-xs text-slate-600">
        {deletedItems.length} itens
      </footer>
    </section>
  );
}
