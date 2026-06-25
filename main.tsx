import { useState } from "react";
import { SavedTask, TriageResult } from "../types";
import { FolderGit2, Trash2, Calendar, ShieldCheck, Clock, Search, X } from "lucide-react";

interface HistorySidebarProps {
  history: SavedTask[];
  onSelect: (result: TriageResult) => void;
  onClear: () => void;
  activeId?: string;
}

export default function HistorySidebar({ history, onSelect, onClear, activeId }: HistorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (history.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3 h-[180px]">
        <FolderGit2 className="h-8 w-8 text-zinc-600" />
        <div>
          <h3 className="text-xs font-semibold text-zinc-400">NO TRIAGE HISTORY</h3>
          <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
            Triaged operations will be recorded in local memory.
          </p>
        </div>
      </div>
    );
  }

  // Filter history based on search query (case-insensitive)
  const filteredHistory = history.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const taskMatch = item.task.toLowerCase().includes(query);
    const deadlineMatch = (item.deadline || "").toLowerCase().includes(query);
    const severityMatch = (item.result?.task_analysis.deadline_severity || "").toLowerCase().includes(query);
    return taskMatch || deadlineMatch || severityMatch;
  });

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-4 max-h-[350px] lg:max-h-[550px]">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4.5 w-4.5 text-sky-400" />
          <h2 className="font-display text-xs font-bold tracking-wide text-zinc-100 uppercase">
            Triaged Operations
          </h2>
        </div>
        <button
          onClick={onClear}
          className="text-[10px] font-mono text-zinc-500 hover:text-rose-400 flex items-center gap-1 hover:bg-rose-950/20 px-2 py-1 rounded border border-transparent hover:border-rose-900/30 transition-all cursor-pointer"
          title="Clear all stored runs"
        >
          <Trash2 className="h-3 w-3" />
          <span>Reset List</span>
        </button>
      </div>

      {/* Search Input Box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-3.5 w-3.5 text-zinc-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by keyword, deadline, severity..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-8 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-sky-500 transition-all font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto pr-1 flex-1">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-6 text-zinc-500 font-mono text-[11px]">
            No matching tasks found.
          </div>
        ) : (
          filteredHistory.map((item) => {
            if (!item.result) return null;
            const isActive = item.id === activeId;
            const timestampDate = new Date(item.timestamp);
            const timeStr = timestampDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.result!)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all duration-200 cursor-pointer flex flex-col gap-1 group ${
                  isActive
                    ? "bg-sky-950/20 border-sky-500/50 text-sky-400 glow-cyan"
                    : "bg-zinc-950/60 hover:bg-zinc-800/80 border-zinc-800/60 text-zinc-300 hover:text-zinc-100"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={`text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded ${
                    item.result.task_analysis.deadline_severity === "High"
                      ? "bg-rose-950/30 text-rose-400 border border-rose-900/40"
                      : item.result.task_analysis.deadline_severity === "Medium"
                      ? "bg-amber-950/30 text-amber-400 border border-amber-900/40"
                      : "bg-emerald-950/30 text-emerald-400 border border-emerald-900/40"
                  }`}>
                    SV-{item.result.task_analysis.deadline_severity.toUpperCase()}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {timeStr}
                  </span>
                </div>
                <p className="font-semibold truncate w-full mt-1">
                  {item.task}
                </p>
                <p className="text-[10px] text-zinc-500 truncate w-full flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-zinc-600 group-hover:text-sky-500" />
                  {item.deadline || "Immediate"}
                </p>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
