import React from 'react';
import { Car, ParkingCircle, Bike, DollarSign, TrendingUp, Users } from 'lucide-react';

export function MparkerPlatformDashboard() {
  const metrics = [
    { label: 'Total Vehicles Parked', value: '8,742', icon: ParkingCircle, trend: '+142 today', color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Rides', value: '387', icon: Bike, trend: '+23%', color: 'from-green-500 to-emerald-500' },
    { label: 'Revenue Today', value: '$24,580', icon: DollarSign, trend: '+18%', color: 'from-purple-500 to-pink-500' },
    { label: 'Registered Users', value: '12,483', icon: Users, trend: '+245 this week', color: 'from-yellow-500 to-amber-500' },
    { label: 'Occupancy Rate', value: '87%', icon: TrendingUp, trend: '+5%', color: 'from-orange-500 to-red-500' },
    { label: 'EV Charging Stations', value: '156', icon: Car, trend: '94% active', color: 'from-indigo-500 to-violet-500' },
  ];

  const recentActivity = [
    { id: 1, location: 'Downtown Hub', type: 'Parking', user: 'Vehicle #A142', time: '2 min ago', status: 'active' },
    { id: 2, location: 'Market District', type: 'E-Scooter', user: 'User #7823', time: '5 min ago', status: 'completed' },
    { id: 3, location: 'Tech Quarter', type: 'Parking + Charge', user: 'Vehicle #T901', time: '12 min ago', status: 'active' },
    { id: 4, location: 'Downtown Hub', type: 'E-Bike', user: 'User #4521', time: '18 min ago', status: 'active' },
    { id: 5, location: 'University Ave', type: 'Parking', user: 'Vehicle #M334', time: '25 min ago', status: 'completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">Mparker</h1>
          <p className="text-[#717182]">Integrated Urban Mobility Hub - Live Operations Dashboard</p>
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
          <h2 className="text-white mb-6">Live Activity Feed</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Location</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Service Type</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">User/Vehicle</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Time</th>
                  <th className="text-left text-[#717182] pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 pr-4">
                      <span className="text-white">{activity.location}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-gray-300">{activity.type}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-gray-400">{activity.user}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-gray-400 text-sm">{activity.time}</span>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}