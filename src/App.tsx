import { Activity, AlertTriangle, CheckCircle, Shield, ChevronRight, Play, Server, Zap, Globe, ShieldAlert, FileText, Settings, Users, Database } from 'lucide-react';
import { motion } from 'motion/react';
import { agentsData, hitlData, logsData, modelsData, chartData, agentLinks } from './data';
import { AgentTerminal } from './components/AgentTerminal';
import { NetworkGraph } from './components/NetworkGraph';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color = 'bg-slate-800 text-slate-300';
  let dotColor = 'bg-slate-400';
  
  if (status === 'running' || status === 'optimal') {
    color = 'bg-green-950/30 text-green-400 border border-green-900/50';
    dotColor = 'bg-green-500';
  } else if (status === 'error' || status === 'down') {
    color = 'bg-red-950/30 text-red-400 border border-red-900/50';
    dotColor = 'bg-red-500';
  } else if (status === 'recovering' || status === 'degraded') {
    color = 'bg-amber-950/30 text-amber-400 border border-amber-900/50';
    dotColor = 'bg-amber-500';
  }

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor} animate-pulse`} />
      <span className="capitalize">{status}</span>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-300">
      {/* Sidebar Navigation */}
      <nav className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight leading-none">HERMES</h1>
              <p className="text-[10px] font-mono text-indigo-400 mt-1 uppercase tracking-wider">E-AIOS v2.0</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-2">Control Plane</p>
            <div className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Agent Fleet</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
                <Database className="w-4 h-4" />
                <span className="text-sm font-medium">Data Connections</span>
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-2">Human Governance</p>
            <div className="space-y-1">
              <a href="#" className="flex items-center justify-between px-2 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-sm font-medium">Approvals</span>
                </div>
                <span className="bg-rose-500/20 text-rose-400 py-0.5 px-2 rounded font-mono text-xs">4</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Audit Logs</span>
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-800">
          <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">System Settings</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-white">Global Overview</h2>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              All Systems Operational
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md flex items-center gap-2 text-sm">
              <Server className="w-4 h-4 text-slate-500" />
              <span className="font-mono">us-central-1</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Users className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-5 flex flex-col justify-between h-32 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                  <Activity className="w-16 h-16" />
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-slate-400">Active Workflows</p>
                  <span className="text-green-400 text-xs font-mono bg-green-400/10 px-2 py-0.5 rounded">+12%</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-semibold text-white">1,248</h3>
                  <span className="text-xs text-slate-500 font-mono">/hr</span>
                </div>
              </Card>

              <Card className="p-5 flex flex-col justify-between h-32 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                  <Zap className="w-16 h-16" />
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-slate-400">Autonomy Rate</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-semibold text-indigo-400">96.4%</h3>
                </div>
              </Card>

              <Card className="p-5 flex flex-col justify-between h-32 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-16 h-16" />
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-slate-400">Pending Approvals</p>
                  <span className="text-amber-400 text-xs font-mono bg-amber-400/10 px-2 py-0.5 rounded">Action Req</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-semibold text-white">4</h3>
                </div>
              </Card>

              <Card className="p-5 flex flex-col justify-between h-32 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
                  <Database className="w-16 h-16" />
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-slate-400">Cost Optimized</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-semibold text-emerald-400">$12.4k</h3>
                  <span className="text-xs text-slate-500 font-mono">/mo</span>
                </div>
              </Card>
            </div>

            {/* Middle Row: Graph & Agent Fleet */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Orchestration Volume */}
              <Card className="lg:col-span-2 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-white">Orchestration Volume</h3>
                    <p className="text-sm text-slate-400">Task distribution across execution layers</p>
                  </div>
                  <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-indigo-500"></div> Agentic
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-emerald-500"></div> RPA
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded bg-sky-500"></div> BPMN
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAgentic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRpa" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBpmn" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '0.5rem' }}
                        itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                      />
                      <Area type="monotone" dataKey="agentic" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAgentic)" />
                      <Area type="monotone" dataKey="rpa" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRpa)" />
                      <Area type="monotone" dataKey="bpmn" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorBpmn)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* LLM Federation Status */}
              <Card className="p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-white">LLM Federation</h3>
                    <p className="text-sm text-slate-400">Model health & routing</p>
                  </div>
                  <Settings className="w-4 h-4 text-slate-500 hover:text-slate-300 cursor-pointer" />
                </div>
                
                <div className="flex-1 space-y-4">
                  {modelsData.map((model) => (
                    <div key={model.name} className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm text-white">{model.name}</span>
                        <StatusBadge status={model.status} />
                      </div>
                      <div className="flex justify-between text-xs font-mono text-slate-500 mb-2">
                        <span>Latency: {model.latencyMs}ms</span>
                        <span>Routing: {model.usagePercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${model.status === 'optimal' ? 'bg-indigo-500' : 'bg-amber-500'}`} 
                          style={{ width: `${model.usagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Agent Interdependencies Network Graph */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">Agent Interdependencies</h3>
                  <p className="text-sm text-slate-400">Live task flow and communication across the active fleet</p>
                </div>
                <div className="flex gap-4 text-xs font-mono">
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-emerald-500"></div> Running</div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-rose-500"></div> Error</div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-amber-500"></div> Degraded</div>
                </div>
              </div>
              <div className="h-96 w-full border border-slate-800 rounded-lg bg-slate-900/50 backdrop-blur-sm">
                <NetworkGraph nodes={agentsData} links={agentLinks} />
              </div>
            </Card>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Multi-Agent Fleet Status */}
              <Card className="flex flex-col h-96">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                  <div>
                    <h3 className="text-lg font-medium text-white">Agent Fleet Status</h3>
                    <p className="text-sm text-slate-400">Real-time orchestrated workforce</p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-900 z-10">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Agent</th>
                        <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Layer</th>
                        <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Tasks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {agentsData.map((agent) => (
                        <tr key={agent.id} className="hover:bg-slate-800/20 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-medium text-sm text-slate-200">{agent.name}</div>
                            <div className="text-xs text-slate-500">{agent.role}</div>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400 font-mono">{agent.layer}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={agent.status} />
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-sm text-slate-300">
                            {agent.activeTasks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Human In The Loop & System Logs */}
              <div className="space-y-6 flex flex-col h-96">
                {/* HITL Approvals */}
                <Card className="flex-1 flex flex-col min-h-0">
                  <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-500" />
                      Pending Approvals
                    </h3>
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-xs">View All</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {hitlData.map((task) => (
                      <div key={task.id} className="p-3 rounded-lg border border-slate-800 bg-slate-950/50 flex gap-4 items-start group hover:border-slate-700 transition-colors">
                        <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${task.urgency === 'high' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-sm font-medium text-slate-200 truncate">{task.type}</h4>
                            <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap ml-2">{task.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2">{task.description}</p>
                          <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-wider">
                            Origin: {task.requestedBy}
                          </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-slate-800 rounded transition-all">
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* System Stream */}
                <Card className="flex-1 flex flex-col min-h-0 bg-slate-950 border-slate-800 relative z-20 overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                      <Activity className="w-12 h-12" />
                   </div>
                  <div className="p-3 border-b border-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xs uppercase tracking-wider font-mono text-slate-400">Live Operation Stream</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-2">
                    {logsData.map((log) => (
                      <div key={log.id} className="flex gap-3">
                        <span className="text-slate-600 shrink-0">{log.timestamp}</span>
                        <span className={`shrink-0 w-12 ${
                          log.level === 'error' ? 'text-red-400' :
                          log.level === 'warn' ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          [{log.level.toUpperCase()}]
                        </span>
                        <span className="text-slate-500 shrink-0 w-24 truncate">{log.source}</span>
                        <span className="text-slate-300 break-words">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </main>
      <AgentTerminal />
    </div>
  );
}

