import { useMemo, useState } from "react";
import { ArrowUpDown, Edit, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "../common/EmptyState";

export default function DataTable({ title, addHref, items = [], columns = [], search, setSearch, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const filtered = useMemo(() => {
    const matches = items.filter((item) => {
      const haystack = JSON.stringify(item).toLowerCase();
      return haystack.includes((search || "").toLowerCase());
    });

    if (!sortConfig.key) return matches;

    return [...matches].sort((first, second) => {
      const firstValue = String(first[sortConfig.key] ?? "").toLowerCase();
      const secondValue = String(second[sortConfig.key] ?? "").toLowerCase();
      const order = firstValue.localeCompare(secondValue, undefined, { numeric: true });
      return sortConfig.direction === "asc" ? order : order * -1;
    });
  }, [items, search, sortConfig]);

  function sortBy(key) {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc"
    }));
  }

  return (
    <div className="glass rounded-lg p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white/45">
            <Search className="h-4 w-4" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="bg-transparent outline-none" />
          </label>
          <Link to={addHref} className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black">
            <Plus className="h-4 w-4" />
            Add
          </Link>
        </div>
      </div>
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-white/40">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="border-b border-white/10 px-3 py-3 font-medium">
                    <button onClick={() => sortBy(column.key)} className="inline-flex items-center gap-2 text-left transition hover:text-white" type="button">
                      {column.label}
                      <ArrowUpDown className={`h-3.5 w-3.5 ${sortConfig.key === column.key ? "text-white" : "text-white/25"}`} />
                    </button>
                  </th>
                ))}
                <th className="border-b border-white/10 px-3 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id} className="border-b border-white/5 transition hover:bg-white/[0.025]">
                  {columns.map((column) => (
                    <td key={column.key} className="px-3 py-4 text-white/70">
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                  <td className="px-3 py-4">
                    <div className="flex gap-2">
                      <Link to={`${addHref.replace("/add", "")}/${item._id}/edit`} className="rounded-md border border-white/10 p-2 text-white/65">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button onClick={() => onDelete(item)} className="rounded-md border border-red-500/30 p-2 text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
