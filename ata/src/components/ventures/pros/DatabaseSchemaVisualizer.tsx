import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Database, Table, Key, Link as LinkIcon, Zap, Shield } from "lucide-react";

interface DatabaseSchemaVisualizerProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function DatabaseSchemaVisualizer({ deviceView }: DatabaseSchemaVisualizerProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showRelationships, setShowRelationships] = useState(true);
  
  const isMobile = deviceView === 'mobile';

  const tables = [
    {
      name: "users",
      color: "from-blue-500 to-cyan-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "email", type: "VARCHAR(255)", key: "UNIQUE", icon: Shield },
        { name: "password_hash", type: "VARCHAR(255)", key: "", icon: null },
        { name: "name", type: "VARCHAR(255)", key: "", icon: null },
        { name: "plan", type: "VARCHAR(50)", key: "", icon: null },
        { name: "created_at", type: "TIMESTAMP", key: "", icon: null }
      ],
      relationships: ["designs", "organizations", "render_jobs"],
      recordCount: "25,000+"
    },
    {
      name: "designs",
      color: "from-purple-500 to-pink-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "user_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "name", type: "VARCHAR(500)", key: "", icon: null },
        { name: "file_url", type: "TEXT", key: "", icon: null },
        { name: "polygon_count", type: "INT", key: "", icon: null },
        { name: "visibility", type: "VARCHAR(20)", key: "", icon: null }
      ],
      relationships: ["versions", "materials", "sessions"],
      recordCount: "847,621"
    },
    {
      name: "versions",
      color: "from-green-500 to-emerald-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "design_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "version_number", type: "INT", key: "", icon: null },
        { name: "data_url", type: "TEXT", key: "", icon: null },
        { name: "commit_message", type: "TEXT", key: "", icon: null }
      ],
      relationships: ["designs"],
      recordCount: "3.2M+"
    },
    {
      name: "materials",
      color: "from-yellow-500 to-orange-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "design_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "type", type: "VARCHAR(50)", key: "", icon: null },
        { name: "properties", type: "JSONB", key: "", icon: null }
      ],
      relationships: ["designs"],
      recordCount: "1.8M+"
    },
    {
      name: "organizations",
      color: "from-indigo-500 to-purple-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "name", type: "VARCHAR(255)", key: "", icon: null },
        { name: "slug", type: "VARCHAR(100)", key: "UNIQUE", icon: Shield },
        { name: "plan", type: "VARCHAR(50)", key: "", icon: null },
        { name: "seats_total", type: "INT", key: "", icon: null }
      ],
      relationships: ["members", "subscriptions"],
      recordCount: "2,500"
    },
    {
      name: "sessions",
      color: "from-pink-500 to-red-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "design_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "host_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "status", type: "VARCHAR(20)", key: "", icon: null },
        { name: "started_at", type: "TIMESTAMP", key: "", icon: null }
      ],
      relationships: ["designs", "participants"],
      recordCount: "45,200/mo"
    },
    {
      name: "render_jobs",
      color: "from-cyan-500 to-blue-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "design_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "user_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "status", type: "VARCHAR(20)", key: "", icon: null },
        { name: "settings", type: "JSONB", key: "", icon: null }
      ],
      relationships: ["designs", "users"],
      recordCount: "2.4M+"
    },
    {
      name: "assets",
      color: "from-orange-500 to-red-500",
      columns: [
        { name: "id", type: "UUID", key: "PK", icon: Key },
        { name: "user_id", type: "UUID", key: "FK", icon: LinkIcon },
        { name: "category", type: "VARCHAR(50)", key: "", icon: null },
        { name: "file_url", type: "TEXT", key: "", icon: null },
        { name: "downloads", type: "INT", key: "", icon: null }
      ],
      relationships: ["users"],
      recordCount: "125K+"
    }
  ];

  const databases = [
    {
      name: "CockroachDB",
      purpose: "Primary transactional database",
      icon: Database,
      stats: { size: "2.8TB", tables: "10+", regions: "3" },
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Redis Stack",
      purpose: "Cache + vector search",
      icon: Zap,
      stats: { size: "450GB", keys: "5M+", hit_rate: "98.5%" },
      color: "from-red-500 to-pink-500"
    },
    {
      name: "MinIO",
      purpose: "Object storage (S3-compatible)",
      icon: Database,
      stats: { size: "680TB", objects: "12M+", buckets: "5" },
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className={`space-y-${isMobile ? '4' : '6'} p-${isMobile ? '4' : '6'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/10">
            <Database className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Database Architecture</h2>
            <p className="text-sm text-gray-400">Multi-database schema with 10+ core tables</p>
          </div>
        </div>

        {/* Database Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {databases.map((db, idx) => (
            <motion.div
              key={db.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${db.color} bg-opacity-20`}>
                      <db.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{db.name}</p>
                      <p className="text-xs text-gray-400">{db.purpose}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {Object.entries(db.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-gray-400 capitalize">{key.replace('_', ' ')}</p>
                        <p className="font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant={showRelationships ? "default" : "outline"}
            onClick={() => setShowRelationships(!showRelationships)}
            className={showRelationships ? "bg-purple-500 hover:bg-purple-600" : ""}
          >
            <LinkIcon className="w-4 h-4 mr-2" />
            {showRelationships ? "Hide" : "Show"} Relationships
          </Button>
          <p className="text-xs text-gray-400">
            Click on any table to view details
          </p>
        </div>
      </motion.div>

      {/* ERD Visualization */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Table className="w-5 h-5 text-purple-400" />
            Entity Relationship Diagram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tables.map((table, idx) => (
              <motion.div
                key={table.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedTable(selectedTable === table.name ? null : table.name)}
                className="cursor-pointer"
              >
                <Card
                  className={`bg-white/5 backdrop-blur-xl border ${
                    selectedTable === table.name
                      ? 'border-purple-500 ring-2 ring-purple-500/50'
                      : 'border-white/10 hover:border-white/30'
                  } transition-all duration-300`}
                >
                  <CardHeader className={`bg-gradient-to-r ${table.color} bg-opacity-20 p-3`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Table className="w-4 h-4 text-white" />
                        <span className="font-semibold text-white text-sm">{table.name}</span>
                      </div>
                      <Badge className="bg-white/20 text-white border-0 text-xs">
                        {table.recordCount}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-1">
                      {table.columns.slice(0, selectedTable === table.name ? undefined : 3).map((col, colIdx) => (
                        <div key={colIdx} className="flex items-center gap-2 text-xs">
                          {col.icon && <col.icon className="w-3 h-3 text-cyan-400 flex-shrink-0" />}
                          <span className={`font-mono ${col.key === 'PK' || col.key === 'FK' ? 'text-purple-400' : 'text-gray-300'}`}>
                            {col.name}
                          </span>
                          <span className="text-gray-500 text-xs ml-auto">{col.type.split('(')[0]}</span>
                        </div>
                      ))}
                      {!selectedTable && table.columns.length > 3 && (
                        <p className="text-xs text-gray-500 pt-1">
                          +{table.columns.length - 3} more columns
                        </p>
                      )}
                    </div>
                    
                    {showRelationships && table.relationships.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400 mb-1">Relationships:</p>
                        <div className="flex flex-wrap gap-1">
                          {table.relationships.map((rel) => (
                            <Badge key={rel} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                              → {rel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Table Details */}
      <AnimatePresence mode="wait">
        {selectedTable && (
          <motion.div
            key="table-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Table className="w-5 h-5 text-purple-400" />
                  Table: {selectedTable}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Full Schema */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Full Schema</h4>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-xs space-y-1">
                      {tables.find(t => t.name === selectedTable)?.columns.map((col, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <span className={`${col.key === 'PK' || col.key === 'FK' ? 'text-purple-400' : 'text-gray-300'}`}>
                            {col.name}
                          </span>
                          <span className="text-gray-500">{col.type}</span>
                          {col.key && (
                            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                              {col.key}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Indexes */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Indexes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        { name: `idx_${selectedTable}_created_at`, columns: ["created_at DESC"], type: "B-tree" },
                        { name: `idx_${selectedTable}_user_id`, columns: ["user_id"], type: "B-tree" },
                        { name: `idx_${selectedTable}_pkey`, columns: ["id"], type: "Primary Key" }
                      ].map((index, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="font-mono text-xs text-purple-400 mb-1">{index.name}</p>
                          <p className="text-xs text-gray-400">Columns: {index.columns.join(", ")}</p>
                          <Badge className="mt-2 bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                            {index.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Stats */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Zap className="w-5 h-5 text-yellow-400" />
            Database Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Query Latency (p95)", value: "<100ms", color: "text-green-400" },
              { label: "Cache Hit Rate", value: "98.5%", color: "text-green-400" },
              { label: "Replication Lag", value: "<50ms", color: "text-green-400" },
              { label: "Active Connections", value: "487/1000", color: "text-cyan-400" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
