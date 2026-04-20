import React from 'react';
import { Users, Heart, Gift, Calendar, TrendingUp, Sparkles } from 'lucide-react';

export function OtoPlatformDashboard() {
  const metrics = [
    { label: 'Total Contacts', value: '2,847', icon: Users, trend: '+12%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Relationship Health', value: '87/100', icon: Heart, trend: '+5', color: 'from-pink-500 to-rose-500' },
    { label: 'Upcoming Events', value: '23', icon: Calendar, trend: '8 this week', color: 'from-purple-500 to-violet-500' },
    { label: 'Gift Suggestions', value: '15', icon: Gift, trend: '94% accuracy', color: 'from-green-500 to-emerald-500' },
    { label: 'AI Insights', value: '42', icon: Sparkles, trend: 'New', color: 'from-yellow-500 to-amber-500' },
    { label: 'Engagement Score', value: '91%', icon: TrendingUp, trend: '+3%', color: 'from-indigo-500 to-blue-500' },
  ];

  const recentActivity = [
    { id: 1, contact: 'Sarah Johnson', type: 'Birthday Reminder', time: '2 days away', action: 'Gift suggestion ready', priority: 'high' },
    { id: 2, contact: 'Mike Chen', type: 'Follow-up Due', time: '1 week overdue', action: 'Schedule coffee', priority: 'medium' },
    { id: 3, contact: 'Emily Rodriguez', type: 'Anniversary', time: '1 month away', action: 'Plan celebration', priority: 'high' },
    { id: 4, contact: 'James Wilson', type: 'Check-in', time: '3 days', action: 'Send message', priority: 'low' },
    { id: 5, contact: 'Lisa Anderson', type: 'New Connection', time: 'Just now', action: 'Add details', priority: 'medium' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">OTO</h1>
          <p className="text-[#717182]">AI Relationship CRM - Meaningful Connections Dashboard</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="glass-light glass-hover rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm px-3 py-1 rounded-full bg-white/10 text-white">
                    {metric.trend}
                  </div>
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Table */}
        <div className="glass-light rounded-2xl p-6">
          <h2 className="text-white mb-6">Recent Activity & Reminders</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Contact</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Type</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Timing</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Suggested Action</th>
                  <th className="text-left text-[#717182] pb-4">Priority</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr
                    key={activity.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="py-4 pr-4">
                      <div className="text-white">{activity.contact}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-cyan-400">{activity.type}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-[#717182]">{activity.time}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white text-sm">{activity.action}</span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights Badge */}
        <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span className="text-white text-sm">42 AI Insights Available</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}