import { Agent, ModelStatus, HITLTask, SystemLog, ChartDataPoint } from './types';

export const agentsData: Agent[] = [
  { id: 'a1', name: 'CEO Orchestrator', role: 'Executive Control', status: 'running', activeTasks: 142, successRate: 99.9, layer: 'Layer 1' },
  { id: 'a2', name: 'Cognitive Orchestrator', role: 'Workflow Decomposition', status: 'running', activeTasks: 45, successRate: 98.5, layer: 'Layer 2' },
  { id: 'a3', name: 'Adaptive Reasoning', role: 'Exception Handling', status: 'idle', activeTasks: 0, successRate: 97.2, layer: 'Layer 2' },
  { id: 'a4', name: 'Knowledge Graph', role: 'Semantic Search', status: 'running', activeTasks: 89, successRate: 99.1, layer: 'Layer 2' },
  { id: 'a5', name: 'Human-in-the-Loop', role: 'Escalation Mgmt', status: 'running', activeTasks: 12, successRate: 100, layer: 'Layer 3' },
  { id: 'a6', name: 'Security & Compliance', role: 'Audit & Governance', status: 'running', activeTasks: 234, successRate: 100, layer: 'Layer 3' },
  { id: 'a7', name: 'UiPath Maestro', role: 'BPMN Engine', status: 'running', activeTasks: 560, successRate: 99.8, layer: 'Layer 4' },
  { id: 'a8', name: 'Optimization Agent', role: 'Process Mining', status: 'idle', activeTasks: 0, successRate: 96.4, layer: 'Layer 6' },
  { id: 'a9', name: 'Resilience & Recovery', role: 'Failover Execution', status: 'recovering', activeTasks: 3, successRate: 94.5, layer: 'Layer 7' },
  { id: 'a10', name: 'AI Validation', role: 'Hallucination Detection', status: 'running', activeTasks: 112, successRate: 99.9, layer: 'Layer 8' },
];

export const modelsData: ModelStatus[] = [
  { provider: 'gemini', name: 'Gemini 2.5 Pro', latencyMs: 245, status: 'optimal', usagePercentage: 45 },
  { provider: 'claude', name: 'Claude 3.5 Sonnet', latencyMs: 310, status: 'optimal', usagePercentage: 25 },
  { provider: 'openai', name: 'GPT-4o', latencyMs: 420, status: 'degraded', usagePercentage: 20 },
  { provider: 'codex', name: 'OpenAI Codex', latencyMs: 180, status: 'optimal', usagePercentage: 10 },
];

export const hitlData: HITLTask[] = [
  { id: 'tsk-001', type: 'Insurance Claim', description: 'Review high-value claim #IN-8829 based on fraud detection flag.', urgency: 'high', requestedBy: 'Fraud Detection Agent', timestamp: '10 mins ago' },
  { id: 'tsk-002', type: 'HR Onboarding', description: 'Manual verification of international background check.', urgency: 'medium', requestedBy: 'Policy Validation Agent', timestamp: '22 mins ago' },
  { id: 'tsk-003', type: 'Financial Approval', description: 'Approve $50k PO #PR-9921 for new server hardware.', urgency: 'high', requestedBy: 'Vendor Validation Agent', timestamp: '1 hour ago' },
  { id: 'tsk-004', type: 'Compliance', description: 'Review potential GDPR violation in Data Extract Job X.', urgency: 'high', requestedBy: 'Security Agent', timestamp: '2 hours ago' },
];

export const logsData: SystemLog[] = [
  { id: 'log-1', timestamp: '18:45:02', level: 'info', message: 'CEO Orchestrator routed 45 tasks to UiPath Maestro.', source: 'L1-CEO' },
  { id: 'log-2', timestamp: '18:44:15', level: 'warn', message: 'GPT-4o latency degraded; failover to Gemini 2.5 Pro initiated.', source: 'L8-Validation' },
  { id: 'log-3', timestamp: '18:42:30', level: 'info', message: 'Knowledge Graph updated with 1,200 new SharePoint docs.', source: 'L2-KG' },
  { id: 'log-4', timestamp: '18:39:10', level: 'error', message: 'API timeout connecting to Legacy ERP System.', source: 'L4-RPA' },
  { id: 'log-5', timestamp: '18:39:15', level: 'info', message: 'Resilience Agent activated retry mechanism. Success.', source: 'L7-Resilience' },
];

export const agentLinks = [
  { source: 'a1', target: 'a2', value: 5 }, // CEO to Cognitive
  { source: 'a1', target: 'a7', value: 3 }, // CEO to Maestro
  { source: 'a2', target: 'a3', value: 2 }, // Cognitive to Reasoning
  { source: 'a2', target: 'a4', value: 4 }, // Cognitive to KG
  { source: 'a2', target: 'a5', value: 1 }, // Cognitive to HITL
  { source: 'a3', target: 'a6', value: 1 }, // Reasoning to Compliance
  { source: 'a2', target: 'a10', value: 3 }, // Cognitive to AI Validation
  { source: 'a7', target: 'a9', value: 2 }, // Maestro to Resilience
  { source: 'a9', target: 'a1', value: 1 },  // Resilience to CEO (feedback)
  { source: 'a8', target: 'a1', value: 2 },  // Optimization to CEO
  { source: 'a6', target: 'a5', value: 2 },  // Compliance to HITL
];

export const chartData: ChartDataPoint[] = [
  { time: '08:00', agentic: 120, rpa: 400, bpmn: 200 },
  { time: '10:00', agentic: 250, rpa: 430, bpmn: 220 },
  { time: '12:00', agentic: 380, rpa: 450, bpmn: 250 },
  { time: '14:00', agentic: 520, rpa: 480, bpmn: 280 },
  { time: '16:00', agentic: 610, rpa: 520, bpmn: 310 },
  { time: '18:00', agentic: 750, rpa: 590, bpmn: 350 },
];
