export interface TaskAnalysis {
  urgency_score: string;
  fatigue_impact: string;
  deadline_severity: string;
}

export interface CalendarBlock {
  time: string;
  focus_area: string;
}

export interface ExecutionPlan {
  immediate_subtasks: string[];
  calendar_blocks: CalendarBlock[];
}

export interface AutonomousAction {
  action_type: string;
  status: string;
  content_preview: string;
  result?: string; // Stored expanded execution results
  executing?: boolean; // Loading state for execution
}

export interface TriageResult {
  id: string;
  task: string;
  deadline: string;
  fatigueLevel: number;
  schedule: string;
  currentContext: string;
  timestamp: string;
  task_analysis: TaskAnalysis;
  execution_plan: ExecutionPlan;
  autonomous_actions: AutonomousAction[];
  user_message: string;
  is_simulation?: boolean;
}

export interface SavedTask {
  id: string;
  task: string;
  deadline: string;
  fatigueLevel: number;
  schedule: string;
  currentContext: string;
  timestamp: string;
  result?: TriageResult;
}
