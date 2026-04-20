import React, { useState } from 'react';
import { Database, Table, Server, HardDrive, Zap, GitBranch, Clock, MapPin } from 'lucide-react';

interface SchemaTable {
  id: string;
  name: string;
  type: 'time-series' | 'relational' | 'spatial' | 'cache';
  database: string;
  columns: number;
  rows: string;
  size: string;
  description: string;
  keyColumns?: string[];
}

const DatabaseSchemaVisualizer: React.FC = () => {
  const [selectedDatabase, setSelectedDatabase] = useState<string>('all');
  const [selectedTable, setSelectedTable] = useState<SchemaTable | null>(null);

  const databases = [
    {
      id: 'influxdb',
      name: 'InfluxDB',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      type: 'Time-Series',
      scale: '2.8TB active, 680TB archive',
      description: 'Sensor metrics, energy data, occupancy counts'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      type: 'Relational',
      scale: '500GB, 50M+ records',
      description: 'Users, buildings, devices, alerts, configurations'
    },
    {
      id: 'postgis',
      name: 'PostGIS',
      icon: MapPin,
      color: 'from-green-500 to-green-600',
      type: 'Spatial',
      scale: '2,500 buildings, spatial queries',
      description: 'Building geometry, zones, sensor locations'
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: Zap,
      color: 'from-red-500 to-red-600',
      type: 'Cache',
      scale: '50GB hot data',
      description: 'Real-time aggregations, API cache, sessions'
    }
  ];

  const tables: SchemaTable[] = [
    // InfluxDB Measurements
    {
      id: 'sensor_readings',
      name: 'sensor_readings',
      type: 'time-series',
      database: 'InfluxDB',
      columns: 10,
      rows: '100M+/hour',
      size: '2.8TB',
      description: 'Primary sensor telemetry (CO₂, temp, humidity, occupancy)',
      keyColumns: ['timestamp', 'building_id', 'sensor_id', 'value', 'unit']
    },
    {
      id: 'energy_consumption',
      name: 'energy_consumption',
      type: 'time-series',
      database: 'InfluxDB',
      columns: 12,
      rows: '50M+/hour',
      size: '1.2TB',
      description: 'Energy metering (kWh, kW, voltage, current, power factor)',
      keyColumns: ['timestamp', 'building_id', 'meter_id', 'kwh', 'kw']
    },
    {
      id: 'occupancy_counts',
      name: 'occupancy_counts',
      type: 'time-series',
      database: 'InfluxDB',
      columns: 8,
      rows: '25M+/hour',
      size: '600GB',
      description: 'Zone-level occupancy counts (anonymized)',
      keyColumns: ['timestamp', 'building_id', 'zone_id', 'count', 'capacity']
    },
    {
      id: 'hvac_status',
      name: 'hvac_status',
      type: 'time-series',
      database: 'InfluxDB',
      columns: 15,
      rows: '10M+/hour',
      size: '400GB',
      description: 'HVAC system telemetry (AHU, VAV, chillers)',
      keyColumns: ['timestamp', 'system_id', 'supply_temp', 'fan_speed', 'power_kw']
    },

    // PostgreSQL Tables
    {
      id: 'buildings',
      name: 'buildings',
      type: 'relational',
      database: 'PostgreSQL',
      columns: 18,
      rows: '2,500',
      size: '2MB',
      description: 'Building metadata, address, physical characteristics',
      keyColumns: ['id', 'name', 'address', 'area_sqft', 'floors', 'timezone']
    },
    {
      id: 'zones',
      name: 'zones',
      type: 'relational',
      database: 'PostgreSQL',
      columns: 14,
      rows: '125,000',
      size: '50MB',
      description: 'Building zones (offices, conference rooms, lobbies)',
      keyColumns: ['id', 'building_id', 'name', 'floor', 'area_sqft', 'capacity']
    },
    {
      id: 'sensors',
      name: 'sensors',
      type: 'relational',
      database: 'PostgreSQL',
      columns: 22,
      rows: '125M',
      size: '45GB',
      description: 'Sensor inventory, metadata, network info',
      keyColumns: ['id', 'sensor_id', 'building_id', 'sensor_type', 'status', 'battery_level']
    },
    {
      id: 'users',
      name: 'users',
      type: 'relational',
      database: 'PostgreSQL',
      columns: 16,
      rows: '50,000',
      size: '25MB',
      description: 'User accounts, authentication, roles',
      keyColumns: ['id', 'email', 'role', 'organization_id', 'mfa_enabled']
    },
    {
      id: 'alerts',
      name: 'alerts',
      type: 'relational',
      database: 'PostgreSQL',
      columns: 18,
      rows: '5M',
      size: '2GB',
      description: 'Alert history (high CO₂, sensor offline, system faults)',
      keyColumns: ['id', 'building_id', 'severity', 'alert_type', 'status', 'created_at']
    },
    {
      id: 'api_keys',
      name: 'api_keys',
      type: 'relational',
      database: 'PostgreSQL',
      columns: 12,
      rows: '10,000',
      size: '5MB',
      description: 'API authentication keys, rate limits, scopes',
      keyColumns: ['id', 'key_prefix', 'user_id', 'scopes', 'rate_limit']
    },

    // PostGIS Spatial Tables
    {
      id: 'buildings_spatial',
      name: 'buildings (spatial)',
      type: 'spatial',
      database: 'PostGIS',
      columns: 20,
      rows: '2,500',
      size: '15MB',
      description: 'Building footprints, 3D geometry, geospatial queries',
      keyColumns: ['id', 'location (Point)', 'geometry (Polygon)', 'geometry_3d']
    },
    {
      id: 'zones_spatial',
      name: 'zones (spatial)',
      type: 'spatial',
      database: 'PostGIS',
      columns: 16,
      rows: '125,000',
      size: '500MB',
      description: 'Zone floor plans, 3D volumes, spatial containment',
      keyColumns: ['id', 'building_id', 'geometry (Polygon)', 'geometry_3d']
    },
    {
      id: 'sensors_spatial',
      name: 'sensors (spatial)',
      type: 'spatial',
      database: 'PostGIS',
      columns: 18,
      rows: '125M',
      size: '35GB',
      description: 'Sensor 3D coordinates, spatial proximity queries',
      keyColumns: ['id', 'location (PointZ)', 'x_meters', 'y_meters', 'z_meters']
    }
  ];

  const filteredTables = selectedDatabase === 'all' 
    ? tables 
    : tables.filter(t => {
        if (selectedDatabase === 'influxdb') return t.database === 'InfluxDB';
        if (selectedDatabase === 'postgresql') return t.database === 'PostgreSQL';
        if (selectedDatabase === 'postgis') return t.database === 'PostGIS';
        if (selectedDatabase === 'redis') return t.type === 'cache';
        return true;
      });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'time-series': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'relational': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'spatial': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cache': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Database Schema</h2>
          </div>
          <p className="text-sm text-gray-400">
            Multi-modal architecture: Time-series, Relational, Spatial, Cache
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Total Storage</div>
            <div className="text-lg font-medium text-white">3.96TB</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Ingestion Rate</div>
            <div className="text-lg font-medium text-white">100M+/hr</div>
          </div>
        </div>
      </div>

      {/* Database Type Selector */}
      <div className="grid grid-cols-5 gap-3">
        <button
          onClick={() => setSelectedDatabase('all')}
          className={`p-4 rounded-lg border transition-all ${
            selectedDatabase === 'all'
              ? 'bg-white/10 border-white/20'
              : 'bg-white/5 border-white/10 hover:bg-white/8'
          }`}
        >
          <Server className="w-5 h-5 text-gray-300 mb-2" />
          <div className="text-sm font-medium text-white">All Databases</div>
          <div className="text-xs text-gray-400 mt-1">4 systems</div>
        </button>

        {databases.map((db) => {
          const Icon = db.icon;
          return (
            <button
              key={db.id}
              onClick={() => setSelectedDatabase(db.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedDatabase === db.id
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${db.color} flex items-center justify-center mb-2`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-medium text-white">{db.name}</div>
              <div className="text-xs text-gray-400 mt-1">{db.type}</div>
            </button>
          );
        })}
      </div>

      {/* Database Info (when specific DB selected) */}
      {selectedDatabase !== 'all' && (
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-white mb-1">
                {databases.find(d => d.id === selectedDatabase)?.name}
              </div>
              <div className="text-xs text-gray-400">
                {databases.find(d => d.id === selectedDatabase)?.description}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">Scale</div>
              <div className="text-sm text-white">
                {databases.find(d => d.id === selectedDatabase)?.scale}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tables Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredTables.map((table) => (
          <button
            key={table.id}
            onClick={() => setSelectedTable(table)}
            className={`p-4 rounded-lg border text-left transition-all ${
              selectedTable?.id === table.id
                ? 'bg-white/10 border-white/20'
                : 'bg-white/5 border-white/10 hover:bg-white/8'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-white">{table.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded border ${getTypeColor(table.type)}`}>
                {table.type}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-gray-400">{table.description}</div>
              
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                <div>
                  <div className="text-xs text-gray-500">Columns</div>
                  <div className="text-sm text-white">{table.columns}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Rows</div>
                  <div className="text-sm text-white">{table.rows}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Size</div>
                  <div className="text-sm text-white">{table.size}</div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Table Details */}
      {selectedTable && (
        <div className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-white">{selectedTable.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded border ${getTypeColor(selectedTable.type)}`}>
                  {selectedTable.database}
                </span>
              </div>
              <p className="text-sm text-gray-400">{selectedTable.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Columns</div>
              <div className="text-xl font-medium text-white">{selectedTable.columns}</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Rows</div>
              <div className="text-xl font-medium text-white">{selectedTable.rows}</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Storage Size</div>
              <div className="text-xl font-medium text-white">{selectedTable.size}</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-gray-400 mb-1">Database</div>
              <div className="text-xl font-medium text-white">{selectedTable.database}</div>
            </div>
          </div>

          {selectedTable.keyColumns && (
            <div>
              <div className="text-sm font-medium text-white mb-2">Key Columns</div>
              <div className="flex flex-wrap gap-2">
                {selectedTable.keyColumns.map((col, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs bg-white/10 border border-white/20 text-gray-300 font-mono"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Example Queries */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-sm font-medium text-white mb-2">Example Query</div>
            {selectedTable.type === 'time-series' && (
              <pre className="p-3 rounded-lg bg-black/30 border border-white/10 text-xs text-gray-300 overflow-x-auto">
{`from(bucket: "nimbus_biome/raw_data")
  |> range(start: -24h)
  |> filter(fn: (r) => r._measurement == "${selectedTable.name}")
  |> filter(fn: (r) => r.building_id == "bld_2L8F9mKpN4Qr")
  |> aggregateWindow(every: 5m, fn: mean)`}
              </pre>
            )}
            {selectedTable.type === 'relational' && (
              <pre className="p-3 rounded-lg bg-black/30 border border-white/10 text-xs text-gray-300 overflow-x-auto">
{`SELECT *
FROM ${selectedTable.name}
WHERE building_id = 'bld_2L8F9mKpN4Qr'
ORDER BY created_at DESC
LIMIT 100;`}
              </pre>
            )}
            {selectedTable.type === 'spatial' && (
              <pre className="p-3 rounded-lg bg-black/30 border border-white/10 text-xs text-gray-300 overflow-x-auto">
{`SELECT name, ST_AsText(geometry) AS footprint
FROM ${selectedTable.name.split(' ')[0]}
WHERE ST_DWithin(
  location,
  ST_MakePoint(-73.985428, 40.748817),
  5000  -- 5km radius
);`}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* Architecture Diagram */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
        <h3 className="text-sm font-medium text-white mb-4">Data Flow Architecture</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 whitespace-nowrap">
              125M Sensors
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-blue-500/50" />
            <div className="px-3 py-1.5 rounded bg-blue-500/20 border border-blue-500/30 text-xs text-blue-300 whitespace-nowrap">
              AWS IoT Core
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-green-500/50" />
            <div className="px-3 py-1.5 rounded bg-green-500/20 border border-green-500/30 text-xs text-green-300 whitespace-nowrap">
              Kinesis Firehose
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-purple-500/50" />
            <div className="px-3 py-1.5 rounded bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 whitespace-nowrap">
              InfluxDB (100M+/hr)
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Hot Tier (15min) → Redis → Warm Tier (1yr) → InfluxDB → Cold Tier (7yr) → S3 Glacier
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <div className="text-xs text-gray-400">Write Throughput</div>
          </div>
          <div className="text-lg font-medium text-white">500K writes/sec</div>
          <div className="text-xs text-gray-500 mt-1">InfluxDB sustained</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <div className="text-xs text-gray-400">Query Latency (p95)</div>
          </div>
          <div className="text-lg font-medium text-white">87ms</div>
          <div className="text-xs text-gray-500 mt-1">Complex aggregations</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <HardDrive className="w-4 h-4 text-green-400" />
            <div className="text-xs text-gray-400">Compression Ratio</div>
          </div>
          <div className="text-lg font-medium text-white">10:1</div>
          <div className="text-xs text-gray-500 mt-1">TSM engine (Snappy)</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-4 h-4 text-purple-400" />
            <div className="text-xs text-gray-400">Replication Factor</div>
          </div>
          <div className="text-lg font-medium text-white">2×</div>
          <div className="text-xs text-gray-500 mt-1">High availability</div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSchemaVisualizer;
