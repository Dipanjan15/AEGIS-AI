import { useEffect, useState } from "react";
import { Shield, Radio, Sparkles } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-950/20 text-sky-400">
          <Shield className="h-5 w-5 animate-pulse" />
          <div className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>
        <div>
          <h1 className="font-display text-xl font-bold tracking-wider text-zinc-100 flex items-center gap-1.5">
            AEGIS AI
            <span className="text-[10px] font-mono font-medium tracking-normal text-sky-400 border border-sky-400/30 rounded px-1.5 py-0.5 bg-sky-950/20">
              V3.5 ENGINE
            </span>
          </h1>
          <p className="text-xs text-zinc-400">Autonomous Schedule Triage & Execution Core</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Connection Status Panel */}
        <div className="hidden lg:flex items-center gap-3 border-r border-zinc-800 pr-6">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
            <span>TELEMETRY:</span>
            <span className="font-mono text-emerald-400 font-medium">SYNCED</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Sparkles className="h-3 w-3 text-sky-400" />
            <span>COGNITIVE GUARD:</span>
            <span className="font-mono text-sky-400 font-medium">ARMED</span>
          </div>
        </div>

        {/* Live Clock */}
        <div className="text-right flex flex-col items-center md:items-end">
          <div className="font-mono text-sm font-semibold tracking-wider text-zinc-200">
            {formattedTime}
          </div>
          <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
            {formattedDate} // UTC-7
          </div>
        </div>
      </div>
    </header>
  );
}
