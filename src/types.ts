export type AgentStatus = 'idle' | 'running' | 'error' | 'recovering';
export type WorkflowType = 'order-to-cash' | 'procure-to-pay' | 'customer-service' | 'insurance-claim' | 'hr-onboarding';
export type ModelProvider = 'gemini' | 'openai' | 'claude' | 'codex';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  activeTasks: number;
  successRate: number;
  layer: string;
}

export interface ModelStatus {
  provider: ModelProvider;
  name: string;
  latencyMs: number;
  status: 'optimal' | 'degraded' | 'down';
  usagePercentage: number;
}

export interface HITLTask {
  id: string;
  type: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  requestedBy: string;
  timestamp: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'critical';
  message: string;
  source: string;
}

export interface ChartDataPoint {
  time: string;
  agentic: number;
  rpa: number;
  bpmn: number;
}
