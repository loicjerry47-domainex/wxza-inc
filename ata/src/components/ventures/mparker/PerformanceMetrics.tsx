import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Zap, Clock, TrendingUp } from 'lucide-react';

export function MparkerPerformanceMetrics() {
  const performanceData = [
    { time: '00:00', api: 45, db: 12, rides: 234 },
    { time: '04:00', api: 42, db: 11, rides: 189 },
    { time: '08:00', api: 98, db: 28, rides: 567 },
    { time: '12:00', api: 156, db: 45, rides: 892 },
    { time: '16:00', api: 203, db: 67, rides: 1024 },
    { time: '20:00', api: 178, db: 52, rides: 743 },
  ];

  const metrics = [
    { label: 'Avg Response Time', value: '23ms', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { label: 'Uptime', value: '99.97%', icon: Activity, color: 'from-green-500 to-emerald-500' },
    { label: 'Requests/min', value: '12,450', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { label: 'Success Rate', value: '99.8%', icon: TrendingUp, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-blue-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">Real-time System Performance Monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="glass-light glass-hover rounded-2xl p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">24-Hour Performance Overview</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#717182" />
              <YAxis stroke="#717182" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="api" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="db" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="rides" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}