import React, { useState } from 'react';
import { Database, Table, Key, Link as LinkIcon } from 'lucide-react';

export function AtableDatabaseSchemaVisualizer() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const tables = [
    {
      name: 'endpoints',
      color: 'from-blue-500 to-cyan-500',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'device_id', type: 'VARCHAR(255)', isUnique: true },
        { name: 'hostname', type: 'VARCHAR(255)' },
        { name: 'os_type', type: 'VARCHAR(50)' },
        { name: 'last_seen', type: 'TIMESTAMP' },
        { name: 'threat_level', type: 'INTEGER' },
      ],
      position: { x: 100, y: 100 },
    },
    {
      name: 'threats',
      color: 'from-red-500 to-orange-500',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'endpoint_id', type: 'UUID', isForeignKey: true },
        { name: 'threat_type', type: 'VARCHAR(100)' },
        { name: 'severity', type: 'VARCHAR(20)' },
        { name: 'detected_at', type: 'TIMESTAMP' },
        { name: 'status', type: 'VARCHAR(20)' },
        { name: 'source_ip', type: 'INET' },
      ],
      position: { x: 500, y: 100 },
    },
    {
      name: 'ml_predictions',
      color: 'from-purple-500 to-pink-500',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'threat_id', type: 'UUID', isForeignKey: true },
        { name: 'model_name', type: 'VARCHAR(100)' },
        { name: 'confidence_score', type: 'DECIMAL(5,4)' },
        { name: 'prediction', type: 'VARCHAR(50)' },
        { name: 'features', type: 'JSONB' },
      ],
      position: { x: 500, y: 400 },
    },
    {
      name: 'behavioral_analytics',
      color: 'from-green-500 to-emerald-500',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'endpoint_id', type: 'UUID', isForeignKey: true },
        { name: 'activity_type', type: 'VARCHAR(100)' },
        { name: 'timestamp', type: 'TIMESTAMP' },
        { name: 'anomaly_score', type: 'DECIMAL(5,4)' },
        { name: 'baseline_deviation', type: 'DECIMAL(8,4)' },
      ],
      position: { x: 100, y: 400 },
    },
  ];

  const relationships = [
    { from: 'endpoints', to: 'threats', label: '1:N' },
    { from: 'threats', to: 'ml_predictions', label: '1:1' },
    { from: 'endpoints', to: 'behavioral_analytics', label: '1:N' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-cyan-400" />
            <h1 className="text-white">Database Schema</h1>
          </div>
          <p className="text-[#717182]">ATABLE NEURAL 2077 - PostgreSQL + Time-Series (InfluxDB)</p>
        </div>

        {/* Schema Visualization */}
        <div className="glass-medium rounded-2xl p-8 mb-8">
          <div className="relative" style={{ height: '700px' }}>
            {/* Relationship Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {relationships.map((rel, index) => {
                const fromTable = tables.find(t => t.name === rel.from);
                const toTable = tables.find(t => t.name === rel.to);
                if (!fromTable || !toTable) return null;

                const x1 = fromTable.position.x + 200;
                const y1 = fromTable.position.y + 80;
                const x2 = toTable.position.x;
                const y2 = toTable.position.y + 80;

                return (
                  <g key={index}>
                    <path
                      d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1} ${x2} ${y2}`}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 10}
                      fill="#717182"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {rel.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Tables */}
            {tables.map((table, index) => (
              <div
                key={table.name}
                className={`absolute bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedTable === table.name ? 'ring-2 ring-cyan-400 scale-105' : ''
                }`}
                style={{
                  left: `${table.position.x}px`,
                  top: `${table.position.y}px`,
                  width: '350px',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedTable(table.name)}
              >
                {/* Table Header */}
                <div className={`bg-gradient-to-r ${table.color} p-4`}>
                  <div className="flex items-center gap-2">
                    <Table className="w-5 h-5 text-white" />
                    <h3 className="text-white">{table.name}</h3>
                  </div>
                </div>

                {/* Columns */}
                <div className="p-4 space-y-2">
                  {table.columns.map((column, colIndex) => (
                    <div
                      key={colIndex}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {column.isPrimary && <Key className="w-4 h-4 text-yellow-400" />}
                        {column.isForeignKey && <LinkIcon className="w-4 h-4 text-cyan-400" />}
                        <span className="text-white text-sm">{column.name}</span>
                      </div>
                      <span className="text-[#717182] text-xs">{column.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schema Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">4</div>
            <div className="text-sm text-[#717182]">Core Tables</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">3</div>
            <div className="text-sm text-[#717182]">Relationships</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">127K</div>
            <div className="text-sm text-[#717182]">Active Endpoints</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">8.2M</div>
            <div className="text-sm text-[#717182]">Threats Logged (30d)</div>
          </div>
        </div>
      </div>
    </div>
  );
}