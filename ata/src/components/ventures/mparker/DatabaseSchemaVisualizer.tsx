import React from 'react';
import { Database } from 'lucide-react';

export function MparkerDatabaseSchemaVisualizer() {
  const tables = [
    {
      name: 'users',
      color: 'from-blue-500 to-cyan-500',
      fields: ['id', 'email', 'name', 'phone', 'created_at', 'membership_tier']
    },
    {
      name: 'parking_spaces',
      color: 'from-green-500 to-emerald-500',
      fields: ['id', 'location_id', 'space_number', 'type', 'ev_charging', 'status']
    },
    {
      name: 'vehicles',
      color: 'from-purple-500 to-pink-500',
      fields: ['id', 'user_id', 'license_plate', 'make', 'model', 'is_ev']
    },
    {
      name: 'mobility_devices',
      color: 'from-yellow-500 to-amber-500',
      fields: ['id', 'device_type', 'location_id', 'battery_level', 'status']
    },
    {
      name: 'bookings',
      color: 'from-orange-500 to-red-500',
      fields: ['id', 'user_id', 'space_id', 'start_time', 'end_time', 'total_cost']
    },
    {
      name: 'rides',
      color: 'from-indigo-500 to-violet-500',
      fields: ['id', 'user_id', 'device_id', 'start_time', 'end_time', 'distance']
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-blue-400" />
            <h1 className="text-white">Database Schema</h1>
          </div>
          <p className="text-[#717182]">Mparker - PostgreSQL + Redis (Cache)</p>
        </div>

        {/* Schema Visualization */}
        <div className="glass-medium rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tables.map((table, index) => (
              <div key={index} className="glass-light glass-hover rounded-2xl p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${table.color} flex items-center justify-center mb-4`}>
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-4">{table.name}</h3>
                <div className="space-y-2">
                  {table.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                      <span className="text-gray-300 font-mono">{field}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}