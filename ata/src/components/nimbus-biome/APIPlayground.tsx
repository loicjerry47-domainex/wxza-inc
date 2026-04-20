import React, { useState } from 'react';
import { Code, Send, Copy, Check, X, ChevronRight, Search, Filter } from 'lucide-react';

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  category: string;
  description: string;
  auth: boolean;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  requestBody?: string;
  responseExample: string;
}

const APIPlayground: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', name: 'All Endpoints', count: 127 },
    { id: 'buildings', name: 'Buildings', count: 18 },
    { id: 'sensors', name: 'Sensors', count: 22 },
    { id: 'metrics', name: 'Metrics', count: 35 },
    { id: 'alerts', name: 'Alerts', count: 15 },
    { id: 'hvac', name: 'HVAC Control', count: 12 },
    { id: 'ml', name: 'ML Predictions', count: 8 },
    { id: 'users', name: 'Users & Auth', count: 10 },
    { id: 'carbon', name: 'Carbon Tracking', count: 7 }
  ];

  const endpoints: APIEndpoint[] = [
    // Buildings
    {
      id: 'get-buildings',
      method: 'GET',
      path: '/api/v1/buildings',
      category: 'buildings',
      description: 'List all buildings with pagination',
      auth: true,
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number (default: 1)' },
        { name: 'limit', type: 'integer', required: false, description: 'Items per page (default: 20, max: 100)' },
        { name: 'city', type: 'string', required: false, description: 'Filter by city' }
      ],
      responseExample: `{
  "data": [
    {
      "id": "bld_2L8F9mKpN4Qr",
      "name": "Empire State Building",
      "address": "350 5th Ave, New York, NY 10118",
      "area_sqft": 2768591,
      "floors": 102,
      "sensors": {
        "total": 50000,
        "active": 49856
      },
      "metrics": {
        "current_kw": 12450,
        "occupancy": 3842,
        "avg_co2_ppm": 620,
        "avg_temp_f": 72.4
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 2500,
    "pages": 125
  }
}`
    },
    {
      id: 'get-building',
      method: 'GET',
      path: '/api/v1/buildings/{building_id}',
      category: 'buildings',
      description: 'Get detailed information for a specific building',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' }
      ],
      responseExample: `{
  "id": "bld_2L8F9mKpN4Qr",
  "name": "Empire State Building",
  "address": "350 5th Ave, New York, NY 10118",
  "location": {
    "lat": 40.748817,
    "lon": -73.985428
  },
  "area_sqft": 2768591,
  "floors": 102,
  "construction_year": 1931,
  "building_type": "office",
  "timezone": "America/New_York",
  "sensors": {
    "total": 50000,
    "active": 49856,
    "by_type": {
      "co2": 12500,
      "temperature": 12500,
      "humidity": 12500,
      "occupancy": 10000,
      "pm25": 2500
    }
  },
  "energy": {
    "current_kw": 12450,
    "today_kwh": 156000,
    "baseline_eui": 85.0,
    "actual_eui": 55.3,
    "savings_pct": 35.0
  }
}`
    },
    {
      id: 'create-building',
      method: 'POST',
      path: '/api/v1/buildings',
      category: 'buildings',
      description: 'Register a new building in the system',
      auth: true,
      requestBody: `{
  "name": "One World Trade Center",
  "street_address": "285 Fulton St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10007",
  "country": "USA",
  "area_sqft": 3501274,
  "floors": 94,
  "construction_year": 2014,
  "building_type": "office",
  "timezone": "America/New_York"
}`,
      responseExample: `{
  "id": "bld_9Xa2Bc3De4Fg",
  "name": "One World Trade Center",
  "status": "pending_setup",
  "next_steps": [
    "Install edge computing node (AWS IoT Greengrass)",
    "Deploy sensors (recommended: 50,000 sensors)",
    "Configure HVAC integration",
    "Complete network connectivity test"
  ],
  "created_at": "2025-11-28T15:32:18Z"
}`
    },

    // Sensors
    {
      id: 'get-sensors',
      method: 'GET',
      path: '/api/v1/buildings/{building_id}/sensors',
      category: 'sensors',
      description: 'List all sensors for a building',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' },
        { name: 'status', type: 'string', required: false, description: 'Filter by status (active, inactive, maintenance)' },
        { name: 'sensor_type', type: 'string', required: false, description: 'Filter by type (co2, temperature, etc.)' }
      ],
      responseExample: `{
  "data": [
    {
      "id": "sns_4Mn6Op7Qr8St",
      "sensor_type": "co2",
      "zone_id": "zn_8Xy9Za1Bc2Cd",
      "floor": 25,
      "status": "active",
      "battery_level": 87,
      "signal_strength": -72,
      "last_reading": {
        "value": 650,
        "unit": "ppm",
        "timestamp": "2025-11-28T15:32:00Z",
        "quality_score": 0.98
      }
    }
  ],
  "summary": {
    "total": 50000,
    "active": 49856,
    "offline": 144,
    "low_battery": 342
  }
}`
    },

    // Metrics
    {
      id: 'get-building-metrics',
      method: 'GET',
      path: '/api/v1/buildings/{building_id}/metrics',
      category: 'metrics',
      description: 'Get real-time metrics for a building',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' }
      ],
      responseExample: `{
  "building_id": "bld_2L8F9mKpN4Qr",
  "timestamp": "2025-11-28T15:32:18Z",
  "energy": {
    "current_kw": 12450,
    "today_kwh": 156000,
    "current_cost_per_hour": 4050,
    "peak_demand_kw": 15200
  },
  "occupancy": {
    "current": 3842,
    "capacity": 5000,
    "utilization_pct": 76.8
  },
  "air_quality": {
    "avg_co2_ppm": 620,
    "avg_pm25_ugm3": 8.2,
    "compliance_rate": 99.8
  },
  "thermal_comfort": {
    "avg_temp_f": 72.4,
    "avg_humidity_pct": 45.0,
    "ashrae_55_compliance": 95.2
  },
  "carbon": {
    "today_kg_co2e": 45600,
    "intensity_kg_per_sqft": 0.0165
  }
}`
    },
    {
      id: 'get-time-series',
      method: 'GET',
      path: '/api/v1/buildings/{building_id}/metrics/time-series',
      category: 'metrics',
      description: 'Get historical time-series data',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' },
        { name: 'metric', type: 'string', required: true, description: 'Metric name (energy, co2, temperature, etc.)' },
        { name: 'start', type: 'string', required: true, description: 'Start timestamp (ISO 8601)' },
        { name: 'end', type: 'string', required: true, description: 'End timestamp (ISO 8601)' },
        { name: 'interval', type: 'string', required: false, description: 'Aggregation interval (5m, 1h, 1d)' }
      ],
      responseExample: `{
  "building_id": "bld_2L8F9mKpN4Qr",
  "metric": "energy",
  "interval": "1h",
  "unit": "kWh",
  "data": [
    { "timestamp": "2025-11-28T00:00:00Z", "value": 6200 },
    { "timestamp": "2025-11-28T01:00:00Z", "value": 5800 },
    { "timestamp": "2025-11-28T02:00:00Z", "value": 5500 },
    { "timestamp": "2025-11-28T03:00:00Z", "value": 5400 }
  ],
  "summary": {
    "min": 5400,
    "max": 15200,
    "avg": 6500,
    "total": 156000
  }
}`
    },

    // Alerts
    {
      id: 'get-alerts',
      method: 'GET',
      path: '/api/v1/buildings/{building_id}/alerts',
      category: 'alerts',
      description: 'Get active and historical alerts',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' },
        { name: 'status', type: 'string', required: false, description: 'Filter by status (active, acknowledged, resolved)' },
        { name: 'severity', type: 'string', required: false, description: 'Filter by severity (info, warning, critical)' }
      ],
      responseExample: `{
  "data": [
    {
      "id": "alt_5Uv6Wx7Yz8Ab",
      "severity": "warning",
      "alert_type": "high_co2",
      "message": "CO₂ level exceeds threshold in Zone 25-A",
      "zone_id": "zn_8Xy9Za1Bc2Cd",
      "threshold_value": 1000,
      "actual_value": 1250,
      "status": "active",
      "first_detected_at": "2025-11-28T15:15:00Z"
    }
  ],
  "summary": {
    "active": 8,
    "by_severity": {
      "critical": 0,
      "warning": 8,
      "info": 15
    }
  }
}`
    },
    {
      id: 'acknowledge-alert',
      method: 'PATCH',
      path: '/api/v1/alerts/{alert_id}/acknowledge',
      category: 'alerts',
      description: 'Acknowledge an alert',
      auth: true,
      parameters: [
        { name: 'alert_id', type: 'string', required: true, description: 'Alert UUID' }
      ],
      requestBody: `{
  "acknowledged_by": "usr_9Xa2Bc3De4Fg",
  "notes": "Investigated - HVAC system adjusting, resolving in 15 minutes"
}`,
      responseExample: `{
  "id": "alt_5Uv6Wx7Yz8Ab",
  "status": "acknowledged",
  "acknowledged_by": "usr_9Xa2Bc3De4Fg",
  "acknowledged_at": "2025-11-28T15:32:18Z"
}`
    },

    // HVAC Control
    {
      id: 'get-hvac-status',
      method: 'GET',
      path: '/api/v1/buildings/{building_id}/hvac/status',
      category: 'hvac',
      description: 'Get current HVAC system status',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' }
      ],
      responseExample: `{
  "building_id": "bld_2L8F9mKpN4Qr",
  "systems": [
    {
      "system_id": "ahu_floor_25",
      "type": "AHU",
      "zone_id": "zn_8Xy9Za1Bc2Cd",
      "status": "running",
      "supply_air_temp_f": 55.2,
      "return_air_temp_f": 72.8,
      "setpoint_temp_f": 72.0,
      "fan_speed_pct": 75,
      "airflow_cfm": 12000,
      "power_kw": 45.2,
      "efficiency_cop": 3.2
    }
  ],
  "optimization": {
    "mode": "ml_enabled",
    "energy_savings_pct": 35.0,
    "comfort_compliance_pct": 95.2
  }
}`
    },
    {
      id: 'set-hvac-setpoint',
      method: 'POST',
      path: '/api/v1/buildings/{building_id}/hvac/setpoint',
      category: 'hvac',
      description: 'Set HVAC temperature setpoint',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' }
      ],
      requestBody: `{
  "zone_id": "zn_8Xy9Za1Bc2Cd",
  "setpoint_temp_f": 74.0,
  "mode": "manual",
  "duration_minutes": 120
}`,
      responseExample: `{
  "zone_id": "zn_8Xy9Za1Bc2Cd",
  "setpoint_temp_f": 74.0,
  "previous_setpoint_f": 72.0,
  "mode": "manual",
  "expires_at": "2025-11-28T17:32:18Z",
  "note": "Manual override active. Will revert to ML optimization at expiry."
}`
    },

    // ML Predictions
    {
      id: 'predict-occupancy',
      method: 'POST',
      path: '/api/v1/ml/predict/occupancy',
      category: 'ml',
      description: 'Get occupancy forecast for next 24 hours',
      auth: true,
      requestBody: `{
  "building_id": "bld_2L8F9mKpN4Qr",
  "zone_id": "zn_8Xy9Za1Bc2Cd",
  "start_time": "2025-11-29T00:00:00Z"
}`,
      responseExample: `{
  "building_id": "bld_2L8F9mKpN4Qr",
  "zone_id": "zn_8Xy9Za1Bc2Cd",
  "model_version": "occupancy_forecaster_v1.2.0",
  "predictions": [
    { "timestamp": "2025-11-29T00:00:00Z", "count": 12, "confidence": 0.95 },
    { "timestamp": "2025-11-29T01:00:00Z", "count": 8, "confidence": 0.94 },
    { "timestamp": "2025-11-29T08:00:00Z", "count": 420, "confidence": 0.88 }
  ],
  "accuracy_metrics": {
    "mae": 8,
    "r2_score": 0.942
  }
}`
    },

    // Carbon Tracking
    {
      id: 'get-carbon-footprint',
      method: 'GET',
      path: '/api/v1/buildings/{building_id}/carbon',
      category: 'carbon',
      description: 'Get carbon footprint breakdown',
      auth: true,
      parameters: [
        { name: 'building_id', type: 'string', required: true, description: 'Building UUID' },
        { name: 'start_date', type: 'string', required: false, description: 'Start date (YYYY-MM-DD)' },
        { name: 'end_date', type: 'string', required: false, description: 'End date (YYYY-MM-DD)' }
      ],
      responseExample: `{
  "building_id": "bld_2L8F9mKpN4Qr",
  "period": "2025-11-01 to 2025-11-28",
  "total_kg_co2e": 1276800,
  "breakdown": {
    "scope1_kg_co2e": 125000,
    "scope2_kg_co2e": 1100000,
    "scope3_kg_co2e": 51800
  },
  "by_source": {
    "electricity": 1100000,
    "natural_gas": 125000,
    "water": 8600,
    "waste": 43200
  },
  "intensity_kg_per_sqft": 0.461,
  "savings_vs_baseline": {
    "baseline_kg_co2e": 1965600,
    "reduction_kg_co2e": 688800,
    "reduction_pct": 35.0
  }
}`
    }
  ];

  const filteredEndpoints = endpoints.filter(e => {
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesSearch = e.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'POST': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'PUT': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'PATCH': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'DELETE': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleSendRequest = () => {
    setIsLoading(true);
    setResponse(null);

    // Simulate API call
    setTimeout(() => {
      setResponse(selectedEndpoint?.responseExample || '{}');
      setIsLoading(false);
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30">
              <Code className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-medium text-white">API Playground</h2>
          </div>
          <p className="text-sm text-gray-400">
            Interactive testing for 120+ REST API endpoints
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Total Endpoints</div>
            <div className="text-lg font-medium text-white">127</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">API Version</div>
            <div className="text-lg font-medium text-white">v1.0</div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg border whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/8'
            }`}
          >
            {cat.name}
            <span className="ml-2 text-xs opacity-60">({cat.count})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
          {filteredEndpoints.map((endpoint) => (
            <button
              key={endpoint.id}
              onClick={() => {
                setSelectedEndpoint(endpoint);
                setRequestBody(endpoint.requestBody || '');
                setResponse(null);
              }}
              className={`w-full p-3 rounded-lg border text-left transition-all ${
                selectedEndpoint?.id === endpoint.id
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded border font-mono ${getMethodColor(endpoint.method)}`}>
                  {endpoint.method}
                </span>
                {endpoint.auth && (
                  <span className="text-xs px-2 py-0.5 rounded border bg-purple-500/20 text-purple-300 border-purple-500/30">
                    🔒
                  </span>
                )}
              </div>
              <div className="text-sm font-mono text-white mb-1">{endpoint.path}</div>
              <div className="text-xs text-gray-400">{endpoint.description}</div>
            </button>
          ))}
        </div>

        {/* Request/Response Panel */}
        <div className="col-span-2 space-y-4">
          {selectedEndpoint ? (
            <>
              {/* Endpoint Details */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded border font-mono ${getMethodColor(selectedEndpoint.method)}`}>
                        {selectedEndpoint.method}
                      </span>
                      <span className="text-sm font-mono text-white">{selectedEndpoint.path}</span>
                    </div>
                    <p className="text-sm text-gray-400">{selectedEndpoint.description}</p>
                  </div>
                </div>

                {/* Parameters */}
                {selectedEndpoint.parameters && selectedEndpoint.parameters.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="text-xs font-medium text-white mb-2">Parameters</div>
                    <div className="space-y-2">
                      {selectedEndpoint.parameters.map((param, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-white">{param.name}</span>
                              <span className="text-xs text-gray-500">{param.type}</span>
                              {param.required && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                                  required
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400">{param.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Request Body */}
              {selectedEndpoint.requestBody && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-white">Request Body</div>
                    <button
                      onClick={() => handleCopy(requestBody)}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full h-40 p-3 rounded-lg bg-black/30 border border-white/10 text-gray-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none"
                  />
                </div>
              )}

              {/* Send Request Button */}
              <button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Request
                  </>
                )}
              </button>

              {/* Response */}
              {response && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-white">Response</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-300 border border-green-500/30">
                        200 OK
                      </span>
                      <button
                        onClick={() => handleCopy(response)}
                        className="p-1.5 rounded hover:bg-white/10 transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 rounded-lg bg-black/30 border border-white/10 text-gray-300 font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto">
                    {response}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <Code className="w-12 h-12 text-gray-600 mb-4" />
              <div className="text-lg font-medium text-white mb-2">Select an endpoint</div>
              <div className="text-sm text-gray-400">Choose an endpoint from the list to test it</div>
            </div>
          )}
        </div>
      </div>

      {/* Authentication Info */}
      <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Code className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <div className="text-sm font-medium text-white mb-1">Authentication</div>
            <div className="text-xs text-gray-400 mb-2">
              All API requests require Bearer token authentication
            </div>
            <div className="p-2 rounded bg-black/30 border border-white/10 font-mono text-xs text-gray-300">
              Authorization: Bearer nmbs_sk_live_abc123...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIPlayground;
