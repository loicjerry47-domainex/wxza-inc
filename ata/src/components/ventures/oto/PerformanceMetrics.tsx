import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Heart, TrendingUp, Users, Sparkles } from 'lucide-react';

export function OtoPerformanceMetrics() {
  const relationshipHealthData = [
    { month: 'Jan', health: 72, interactions: 45 },
    { month: 'Feb', health: 75, interactions: 52 },
    { month: 'Mar', health: 78, interactions: 61 },
    { month: 'Apr', health: 82, interactions: 58 },
    { month: 'May', health: 85, interactions: 67 },
    { month: 'Jun', health: 87, interactions: 73 },
  ];

  const engagementData = [
    { week: 'Week 1', messages: 28, calls: 5, meetings: 3 },
    { week: 'Week 2', messages: 35, calls: 7, meetings: 4 },
    { week: 'Week 3', messages: 42, calls: 6, meetings: 5 },
    { week: 'Week 4', messages: 38, calls: 8, meetings: 3 },
  ];

  const relationshipTypeData = [
    { type: 'Family', count: 45, avgHealth: 92 },
    { type: 'Friends', count: 127, avgHealth: 85 },
    { type: 'Colleagues', count: 89, avgHealth: 78 },
    { type: 'Professional', count: 34, avgHealth: 81 },
    { type: 'Acquaintances', count: 156, avgHealth: 65 },
  ];

  const aiInsightCategories = [
    { category: 'Communication', score: 88 },
    { category: 'Gift Ideas', score: 94 },
    { category: 'Event Planning', score: 82 },
    { category: 'Sentiment', score: 91 },
    { category: 'Follow-ups', score: 85 },
    { category: 'Preferences', score: 89 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-pink-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">OTO - Relationship Analytics & AI Insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+5</div>
            </div>
            <div className="text-3xl text-white mb-1">87/100</div>
            <div className="text-sm text-[#717182]">Avg Health Score</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+12%</div>
            </div>
            <div className="text-3xl text-white mb-1">451</div>
            <div className="text-sm text-[#717182]">Active Relationships</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+23%</div>
            </div>
            <div className="text-3xl text-white mb-1">143</div>
            <div className="text-sm text-[#717182]">Interactions (30d)</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">42 new</div>
            </div>
            <div className="text-3xl text-white mb-1">89%</div>
            <div className="text-sm text-[#717182]">AI Insight Accuracy</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Relationship Health Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={relationshipHealthData}>
                <defs>
                  <linearGradient id="healthGradientOto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#717182" />
                <YAxis stroke="#717182" domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="health" stroke="#ec4899" fill="url(#healthGradientOto)" strokeWidth={3} />
                <Line type="monotone" dataKey="interactions" stroke="#06b6d4" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Engagement Breakdown (Monthly)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#717182" />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="messages" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                <Bar dataKey="calls" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="meetings" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Relationship Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={relationshipTypeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#717182" />
                <YAxis dataKey="type" type="category" stroke="#717182" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="count" fill="url(#barGradientOto)" radius={[0, 8, 8, 0]} />
                <defs>
                  <linearGradient id="barGradientOto" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">AI Insight Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={aiInsightCategories}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="category" stroke="#717182" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#717182" />
                <Radar name="Accuracy" dataKey="score" stroke="#eab308" fill="#eab308" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">Engagement Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Follow-up Success Rate</span>
                <span className="text-white">94%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: '94%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Gift Recommendation Hit Rate</span>
                <span className="text-white">87%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '87%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Sentiment Analysis Accuracy</span>
                <span className="text-white">91%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500" style={{ width: '91%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Reminder Completion Rate</span>
                <span className="text-white">96%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}