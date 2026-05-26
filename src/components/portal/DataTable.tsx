'use client';
import { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';

export interface Column {
  key: string;
  label: string;
  defaultVisible?: boolean;
}

interface DataTableProps<T extends Record<string, unknown>> {
  id: string;
  columns: Column[];
  rows: T[];
  renderCell: (row: T, key: string) => React.ReactNode;
  actions?: (row: T) => React.ReactNode;
  exportFilename?: string;
}

function storageKey(id: string) {
  return `tappy-table-${id}`;
}

function getSortValue(row: Record<string, unknown>, key: string): string {
  const v = row[key];
  if (v == null) return '';
  if (typeof v === 'string') return v.toLowerCase();
  if (typeof v === 'number') return String(v).padStart(20, '0');
  // Firestore Timestamp
  if (typeof v === 'object' && 'toDate' in (v as object)) {
    return String((v as { toDate: () => Date }).toDate().getTime()).padStart(20, '0');
  }
  return String(v).toLowerCase();
}

export default function DataTable<T extends Record<string, unknown>>({
  id, columns, rows, renderCell, actions, exportFilename,
}: DataTableProps<T>) {
  const [visibleKeys, setVisibleKeys] = useState<string[]>(() =>
    columns.filter(c => c.defaultVisible !== false).map(c => c.key)
  );
  const [order, setOrder] = useState<string[]>(() => columns.map(c => c.key));
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showSettings, setShowSettings] = useState(false);
  const [sortKey, setSortKey] = useState<string>(() =>
    columns.find(c => c.defaultVisible !== false)?.key ?? columns[0]?.key ?? ''
  );
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey(id));
      if (saved) {
        const { visibleKeys: vk, order: o } = JSON.parse(saved);
        if (Array.isArray(vk)) setVisibleKeys(vk);
        if (Array.isArray(o)) setOrder(o);
      }
    } catch {}
  }, [id]);

  // Save preferences to localStorage
  const savePrefs = useCallback((vk: string[], o: string[]) => {
    try {
      localStorage.setItem(storageKey(id), JSON.stringify({ visibleKeys: vk, order: o }));
    } catch {}
  }, [id]);

  function toggleColumn(key: string) {
    const next = visibleKeys.includes(key)
      ? visibleKeys.filter(k => k !== key)
      : [...visibleKeys, key];
    setVisibleKeys(next);
    savePrefs(next, order);
  }

  function moveColumn(key: string, dir: -1 | 1) {
    const idx = order.indexOf(key);
    if (idx === -1) return;
    const next = [...order];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setOrder(next);
    savePrefs(visibleKeys, next);
  }

  function handleSortClick(key: string) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const orderedVisible = order
    .filter(k => visibleKeys.includes(k))
    .map(k => columns.find(c => c.key === k)!)
    .filter(Boolean);

  // Filter rows
  const filtered = rows.filter(row =>
    orderedVisible.every(col => {
      const f = filters[col.key];
      if (!f) return true;
      const cell = renderCell(row, col.key);
      const str = typeof cell === 'string' || typeof cell === 'number'
        ? String(cell)
        : row[col.key] != null ? String(row[col.key]) : '';
      return str.toLowerCase().includes(f.toLowerCase());
    })
  );

  // Sort rows
  const sorted = [...filtered].sort((a, b) => {
    const av = getSortValue(a, sortKey);
    const bv = getSortValue(b, sortKey);
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === 'asc' ? cmp : -cmp;
  });

  function handleExport() {
    const data = sorted.map(row =>
      Object.fromEntries(
        orderedVisible.map(col => {
          const v = row[col.key];
          let val: string | number;
          if (v == null) val = '';
          else if (typeof v === 'string' || typeof v === 'number') val = v;
          else if (typeof v === 'object' && 'toDate' in (v as object))
            val = (v as { toDate: () => Date }).toDate().toLocaleDateString('nl-NL');
          else val = String(v);
          return [col.label, val];
        })
      )
    );
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${exportFilename ?? id}.xlsx`);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-[#8B949E]">{sorted.length} resultaten</span>
        <div className="flex items-center gap-2">
          {exportFilename !== undefined && (
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-xs text-[#8B949E] hover:text-white bg-[#1E242D] border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              ↓ Exporteren
            </button>
          )}
          <div className="relative">
          <button
            onClick={() => setShowSettings(v => !v)}
            className="flex items-center gap-1.5 text-xs text-[#8B949E] hover:text-white bg-[#1E242D] border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            ⚙ Kolommen
          </button>
          {showSettings && (
            <div className="absolute right-0 top-8 z-20 bg-[#1E242D] border border-white/10 rounded-xl p-3 w-56 shadow-xl">
              <div className="text-xs text-[#8B949E] uppercase tracking-wide mb-3">Kolommen beheren</div>
              <div className="flex flex-col gap-1">
                {order.map((key, idx) => {
                  const col = columns.find(c => c.key === key);
                  if (!col) return null;
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={visibleKeys.includes(key)}
                        onChange={() => toggleColumn(key)}
                        className="accent-[#C6FF3B] w-3.5 h-3.5 cursor-pointer"
                      />
                      <span className="text-sm text-white flex-1">{col.label}</span>
                      <div className="flex gap-0.5">
                        <button
                          onClick={() => moveColumn(key, -1)}
                          disabled={idx === 0}
                          className="text-[#8B949E] hover:text-white disabled:opacity-20 px-1 text-xs"
                        >↑</button>
                        <button
                          onClick={() => moveColumn(key, 1)}
                          disabled={idx === order.length - 1}
                          className="text-[#8B949E] hover:text-white disabled:opacity-20 px-1 text-xs"
                        >↓</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1E242D] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            {/* Column headers */}
            <tr className="border-b border-white/5">
              {orderedVisible.map(col => (
                <th key={col.key}
                  onClick={() => handleSortClick(col.key)}
                  className="text-left px-5 py-3 text-xs text-[#8B949E] uppercase tracking-wide font-medium cursor-pointer select-none hover:text-white transition-colors group"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    <span className={`transition-opacity ${sortKey === col.key ? 'opacity-100 text-[#C6FF3B]' : 'opacity-0 group-hover:opacity-40'}`}>
                      {sortKey === col.key && sortDir === 'desc' ? '↓' : '↑'}
                    </span>
                  </span>
                </th>
              ))}
              {actions && <th className="px-5 py-3" />}
            </tr>
            {/* Filter row */}
            <tr className="border-b border-white/5 bg-white/[0.02]">
              {orderedVisible.map(col => (
                <th key={col.key} className="px-3 py-2">
                  <input
                    type="text"
                    value={filters[col.key] ?? ''}
                    onChange={e => setFilters(f => ({ ...f, [col.key]: e.target.value }))}
                    placeholder={`Zoek...`}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#C6FF3B]/40 transition-colors font-normal"
                  />
                </th>
              ))}
              {actions && <th className="px-3 py-2" />}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={orderedVisible.length + (actions ? 1 : 0)} className="px-5 py-10 text-center text-[#8B949E] text-sm">
                  Geen resultaten gevonden.
                </td>
              </tr>
            ) : sorted.map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                {orderedVisible.map(col => (
                  <td key={col.key} className="px-5 py-3 text-sm">
                    {renderCell(row, col.key)}
                  </td>
                ))}
                {actions && (
                  <td className="px-5 py-3 text-right">{actions(row)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
