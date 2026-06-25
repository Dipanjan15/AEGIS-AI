import React, { useState } from "react";
import { Zap, Clock, UserCheck, Flame, Sliders, Calendar, ChevronRight } from "lucide-react";

interface IntakeFormProps {
  onTriage: (payload: {
    task: string;
    deadline: string;
    fatigueLevel: number;
    schedule: string;
    currentContext: string;
  }) => void;
  loading: boolean;
}

const PRESETS = [
  {
    title: "RNX E-SPORTS registration & roster locks",
    task: "Submit tournament registration and finalized roster for RNX E-SPORTS, verifying player handles for Legend, Joker, and Starboi. Review tournament rulebook for roster locks.",
    deadline: "4 hours from now",
    fatigueLevel: 9,
    schedule: "Free for the next 2 hours, then in meetings",
    currentContext: "Feeling extremely overwhelmed, high mental fatigue."
  },
  {
    title: "Savage Squad announcement poster",
    task: "Design and format the 'Savage Squad' new player announcement poster. Select base template, isolate player rendering, add typography, sponsor logos.",
    deadline: "Tomorrow at 10:00 AM",
    fatigueLevel: 5,
    schedule: "Open evening, free from 19:00 onwards",
    currentContext: "Moderate fatigue, feeling creative but need structure."
  },
  {
    title: "Code Review & Deployment Strategy",
    task: "Review Express backend refactoring pull request and compile production deployment guide for the infrastructure team.",
    deadline: "Friday at 5:00 PM",
    fatigueLevel: 3,
    schedule: "Free blocks in afternoon between syncs",
    currentContext: "Fresh and sharp, ready for high focus depth."
  }
];

export default function IntakeForm({ onTriage, loading }: IntakeFormProps) {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [fatigueLevel, setFatigueLevel] = useState(5);
  const [schedule, setSchedule] = useState("");
  const [currentContext, setCurrentContext] = useState("");

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setTask(preset.task);
    setDeadline(preset.deadline);
    setFatigueLevel(preset.fatigueLevel);
    setSchedule(preset.schedule);
    setCurrentContext(preset.currentContext);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    onTriage({
      task,
      deadline,
      fatigueLevel,
      schedule,
      currentContext
    });
  };

  // Compute a descriptive string based on user fatigue level
  const getFatigueDescription = (level: number) => {
    if (level <= 3) return { label: "Razor Sharp / Fresh", color: "text-emerald-400 border-emerald-500/20 bg-emerald-950/20", policy: "Aegis Strategy: High-intensity, uninterrupted focus blocks. Schedules complex creative or technical work immediately." };
    if (level <= 6) return { label: "Moderate Fatigue / Productive", color: "text-sky-400 border-sky-500/20 bg-sky-950/20", policy: "Aegis Strategy: Balanced sessions with deliberate 5m micro-breaks. Mixes creative design and light structure." };
    if (level <= 8) return { label: "Fatigued / Cognitive Strain", color: "text-amber-400 border-amber-500/20 bg-amber-950/20", policy: "Aegis Strategy: Micro-task breakdown. Shifts intense writing, data-entry or design to Aegis's autonomous engine." };
    return { label: "Overwhelmed / Critical Satiation", color: "text-rose-400 border-rose-500/20 bg-rose-950/20", policy: "Aegis Strategy: Urgent focus only. Autonomous execution of preparatory subtasks. Minimizes user cognitive steps to click-and-approve." };
  };

  const fatigueInfo = getFatigueDescription(fatigueLevel);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-5 h-full">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        <Zap className="h-5 w-5 text-sky-400" />
        <h2 className="font-display text-base font-bold tracking-wide text-zinc-100">
          TRIAGE INTAKE CONSOLE
        </h2>
      </div>

      {/* Preset Pickers */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">
          Inject System Presets
        </label>
        <div className="flex flex-col gap-1.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-left text-xs bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-2.5 rounded-lg transition-all duration-200 group flex justify-between items-center"
            >
              <div className="truncate pr-4">
                <span className="font-medium text-zinc-200 group-hover:text-sky-400 block truncate">
                  {preset.title}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Fatigue: {preset.fatigueLevel}/10 • {preset.deadline}
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-sky-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 justify-between">
        <div className="flex flex-col gap-4">
          {/* Task Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex justify-between">
              <span>Task Payload Description *</span>
              <span className="text-zinc-500">Required</span>
            </label>
            <textarea
              required
              rows={3}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What are you trying to accomplish? Describe the task, subtasks, rule locks, etc."
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 placeholder-zinc-600 transition-all font-sans resize-none"
            />
          </div>

          {/* Deadline Context */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Submission Deadline</span>
            </label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. 4 hours from now, Tomorrow 10 AM, Friday noon"
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 placeholder-zinc-600 transition-all"
            />
          </div>

          {/* Schedule Context */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Your Available Schedule Blocks</span>
            </label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="e.g. Free next 2 hours then busy, open tonight"
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 placeholder-zinc-600 transition-all"
            />
          </div>

          {/* Fatigue Level Slider */}
          <div className="flex flex-col gap-2 border border-zinc-800/60 p-3 rounded-lg bg-zinc-950/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1">
                <Sliders className="h-3 w-3" />
                <span>Cognitive Fatigue Matrix</span>
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 border rounded-full font-semibold ${fatigueInfo.color}`}>
                {fatigueLevel}/10 • {fatigueInfo.label}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={fatigueLevel}
              onChange={(e) => setFatigueLevel(parseInt(e.target.value))}
              className="w-full accent-sky-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] font-mono text-zinc-400 leading-relaxed italic mt-1 bg-zinc-900/50 p-2 rounded border border-zinc-800/40">
              {fatigueInfo.policy}
            </p>
          </div>

          {/* Current Fatigue / Energy context */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1">
              <UserCheck className="h-3 w-3" />
              <span>Current Qualitative Mindstate</span>
            </label>
            <input
              type="text"
              value={currentContext}
              onChange={(e) => setCurrentContext(e.target.value)}
              placeholder="e.g. Overwhelmed, high caffeine, brain fog"
              className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-sky-500 placeholder-zinc-600 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !task.trim()}
          className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-lg font-display text-sm font-bold tracking-wide transition-all ${
            loading
              ? "bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-400 text-zinc-950 border border-sky-400 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          } glow-cyan`}
        >
          {loading ? (
            <>
              <Flame className="h-4 w-4 animate-spin" />
              <span>TRIAGING REAL-TIME CONTEXT...</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 text-zinc-950 fill-current" />
              <span>INITIALIZE AEGIS SYSTEM</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
