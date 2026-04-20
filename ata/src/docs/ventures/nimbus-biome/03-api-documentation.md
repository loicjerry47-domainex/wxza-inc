# NIMBUS BIOME - API Documentation
## REST, GraphQL & MQTT API Reference

**Last Updated:** November 28, 2025  
**API Version:** v2.1.0  
**Document Version:** 1.0  
**Reading Time:** 25 minutes

---

## Executive Summary

NIMBUS BIOME provides **120+ API endpoints** across REST, GraphQL, and MQTT protocols for comprehensive building data access and control. All APIs support **OAuth 2.0 authentication**, **rate limiting (300 requests/minute)**, and **99.95% uptime SLA**.

### Quick Stats

| Metric | Value |
|--------|-------|
| **Total Endpoints** | 120+ |
| **Protocols** | REST, GraphQL, MQTT, WebSocket |
| **Authentication** | OAuth 2.0, API Keys |
| **Rate Limit** | 300 req/min (standard), unlimited (enterprise) |
| **Latency (p95)** | 42ms |
| **Uptime SLA** | 99.95% |
| **SDKs Available** | JavaScript, Python, C#, Java |

---

## Base URLs

**Production**:
```
REST:      https://api.nimbusbiome.io/v2
GraphQL:   https://api.nimbusbiome.io/graphql
MQTT:      mqtts://mqtt.nimbusbiome.io:8883
WebSocket: wss://ws.nimbusbiome.io/stream
```

**Sandbox**:
```
REST:      https://sandbox.nimbusbiome.io/v2
GraphQL:   https://sandbox.nimbusbiome.io/graphql
```

---

## Authentication

### OAuth 2.0 (Recommended)

**Authorization Flow**:
```http
# Step 1: Get authorization code
GET https://auth.nimbusbiome.io/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=buildings:read sensors:read metrics:read

# Step 2: Exchange code for access token
POST https://auth.nimbusbiome.io/oauth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE_FROM_STEP1",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "https://yourapp.com/callback"
}

# Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "tGzv3JOkF0XG5Qx2TlKWIA",
  "scope": "buildings:read sensors:read metrics:read"
}
```

**Using Access Token**:
```http
GET https://api.nimbusbiome.io/v2/buildings
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### API Keys (Simple)

```http
GET https://api.nimbusbiome.io/v2/buildings
X-API-Key: nmbs_sk_live_abc123...
```

---

## Core Endpoints

### Buildings

#### List Buildings
```http
GET /v2/buildings
Authorization: Bearer {token}
```

**Query Parameters**:
- `limit` (integer, default: 20, max: 100)
- `offset` (integer, default: 0)
- `sort` (string: "name" | "created_at" | "size")
- `filter` (string: JSON filter expression)

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "bld_2L8F9mKpN4Qr",
      "name": "Empire State Building",
      "address": {
        "street": "350 5th Ave",
        "city": "New York",
        "state": "NY",
        "zip": "10118",
        "country": "USA"
      },
      "area_sqft": 2768591,
      "floors": 102,
      "sensors": {
        "total": 48523,
        "active": 48412,
        "inactive": 111
      },
      "energy": {
        "current_kw": 12450,
        "today_kwh": 287340
      },
      "occupancy": {
        "current": 3842,
        "capacity": 15000
      },
      "created_at": "2024-01-15T08:30:00Z",
      "updated_at": "2025-11-28T14:32:18Z"
    }
  ],
  "meta": {
    "total": 2500,
    "limit": 20,
    "offset": 0
  }
}
```

#### Get Building Details
```http
GET /v2/buildings/{building_id}
```

**Response** (200 OK):
```json
{
  "id": "bld_2L8F9mKpN4Qr",
  "name": "Empire State Building",
  "coordinates": {
    "lat": 40.748817,
    "lon": -73.985428
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[...]]  // GeoJSON
  },
  "zones": [
    {
      "id": "zn_8Xy9Za1Bc2Cd",
      "name": "Floor 25 - Zone A",
      "floor": 25,
      "area_sqft": 4000,
      "sensors": 42,
      "hvac_control": true
    }
  ],
  "certifications": ["LEED Platinum", "WELL Gold"],
  "metadata": {
    "construction_year": 1931,
    "building_type": "office",
    "owner": "Empire State Realty Trust"
  }
}
```

### Sensors

#### List Sensors
```http
GET /v2/buildings/{building_id}/sensors
```

**Query Parameters**:
- `type` (string: "co2" | "temperature" | "occupancy" | "energy" | etc.)
- `zone_id` (string)
- `status` (string: "active" | "inactive" | "maintenance")

**Response**:
```json
{
  "data": [
    {
      "id": "sns_4Mn6Op7Qr8St",
      "type": "co2",
      "location": {
        "zone_id": "zn_8Xy9Za1Bc2Cd",
        "floor": 25,
        "coordinates": {"x": 12.5, "y": 8.3, "z": 2.4}  // meters
      },
      "status": "active",
      "battery_level": 87,
      "signal_strength": -72,  // dBm
      "last_reading": {
        "value": 650,
        "unit": "ppm",
        "timestamp": "2025-11-28T14:32:15Z",
        "quality_score": 0.98
      },
      "calibration": {
        "last_calibrated": "2025-11-01T00:00:00Z",
        "next_calibration": "2026-11-01T00:00:00Z"
      }
    }
  ]
}
```

#### Get Real-Time Sensor Data
```http
GET /v2/sensors/{sensor_id}/readings
```

**Query Parameters**:
- `start_time` (ISO 8601 timestamp)
- `end_time` (ISO 8601 timestamp)
- `interval` (string: "1s" | "1m" | "1h" | "1d")
- `aggregation` (string: "avg" | "min" | "max" | "sum")

**Response**:
```json
{
  "sensor_id": "sns_4Mn6Op7Qr8St",
  "type": "co2",
  "unit": "ppm",
  "interval": "1m",
  "data_points": [
    {"timestamp": "2025-11-28T14:00:00Z", "value": 645, "quality": 0.99},
    {"timestamp": "2025-11-28T14:01:00Z", "value": 648, "quality": 0.98},
    {"timestamp": "2025-11-28T14:02:00Z", "value": 652, "quality": 0.99}
  ],
  "statistics": {
    "min": 645,
    "max": 652,
    "avg": 648.3,
    "std_dev": 2.9
  }
}
```

### Metrics & Analytics

#### Building Performance Dashboard
```http
GET /v2/buildings/{building_id}/metrics/dashboard
```

**Response**:
```json
{
  "building_id": "bld_2L8F9mKpN4Qr",
  "timestamp": "2025-11-28T14:32:18Z",
  "energy": {
    "current_kw": 12450,
    "today_kwh": 287340,
    "vs_baseline": -34.2,  // % change
    "cost_today_usd": 28734
  },
  "carbon": {
    "today_kg_co2": 120540,
    "intensity_kg_per_sqft": 0.043,
    "vs_baseline": -32.8
  },
  "comfort": {
    "temperature_avg_f": 72.4,
    "humidity_avg_pct": 45.2,
    "co2_avg_ppm": 620,
    "comfort_score": 92  // 0-100
  },
  "occupancy": {
    "current_count": 3842,
    "capacity": 15000,
    "utilization_pct": 25.6
  },
  "air_quality": {
    "pm25_avg": 8.2,
    "aqi": 34,  // Air Quality Index
    "status": "good"
  }
}
```

#### Energy Consumption Analysis
```http
GET /v2/buildings/{building_id}/metrics/energy
```

**Query Parameters**:
- `start_date` (YYYY-MM-DD)
- `end_date` (YYYY-MM-DD)
- `granularity` (string: "hourly" | "daily" | "monthly")

**Response**:
```json
{
  "building_id": "bld_2L8F9mKpN4Qr",
  "period": {
    "start": "2025-11-01",
    "end": "2025-11-30"
  },
  "total_kwh": 8620140,
  "cost_usd": 862014,
  "breakdown": {
    "hvac": {"kwh": 5172084, "pct": 60},
    "lighting": {"kwh": 1724028, "pct": 20},
    "plug_loads": {"kwh": 1293021, "pct": 15},
    "other": {"kwh": 431007, "pct": 5}
  },
  "time_series": [
    {"date": "2025-11-01", "kwh": 287338, "cost_usd": 28734},
    {"date": "2025-11-02", "kwh": 289012, "cost_usd": 28901}
  ],
  "savings_vs_baseline": {
    "kwh": 4580000,
    "pct": 34.7,
    "cost_usd": 458000
  }
}
```

#### Carbon Footprint Report
```http
GET /v2/buildings/{building_id}/metrics/carbon
```

**Response**:
```json
{
  "building_id": "bld_2L8F9mKpN4Qr",
  "period": "2025-11",
  "emissions": {
    "total_kg_co2e": 3615720,
    "scope1_kg_co2e": 542358,  // Direct (natural gas)
    "scope2_kg_co2e": 3073362,  // Indirect (electricity)
    "scope3_kg_co2e": 0  // Other (water, waste)
  },
  "intensity": {
    "kg_per_sqft": 1.31,
    "kg_per_occupant": 941.3
  },
  "grid_carbon_intensity": {
    "avg_g_per_kwh": 356.5,
    "region": "NYISO (New York)"
  },
  "reduction_vs_baseline": {
    "kg_co2e": 1820000,
    "pct": 33.5
  },
  "equivalent_to": {
    "cars_removed": 395,
    "trees_planted": 59762
  }
}
```

### HVAC Control

#### Get HVAC Status
```http
GET /v2/buildings/{building_id}/hvac/status
```

**Response**:
```json
{
  "building_id": "bld_2L8F9mKpN4Qr",
  "systems": [
    {
      "id": "hvac_ahu_floor25",
      "type": "AHU",  // Air Handling Unit
      "zone_id": "zn_8Xy9Za1Bc2Cd",
      "status": "running",
      "setpoints": {
        "supply_air_temp_f": 55,
        "return_air_temp_f": 72,
        "fan_speed_pct": 75
      },
      "measurements": {
        "supply_air_temp_f": 54.8,
        "return_air_temp_f": 71.6,
        "airflow_cfm": 12000,
        "power_kw": 18.5
      },
      "optimization": {
        "mode": "ai_auto",  // AI-optimized
        "estimated_savings_pct": 38
      }
    }
  ]
}
```

#### Update HVAC Setpoint
```http
PATCH /v2/buildings/{building_id}/hvac/{system_id}
Content-Type: application/json

{
  "setpoint_temp_f": 72,
  "mode": "auto"  // "auto" | "manual" | "eco"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "system_id": "hvac_ahu_floor25",
  "updated_setpoint": 72,
  "effective_at": "2025-11-28T14:33:00Z",
  "estimated_savings_pct": -5  // Negative = less efficient
}
```

### Alerts & Notifications

#### Get Active Alerts
```http
GET /v2/buildings/{building_id}/alerts
```

**Response**:
```json
{
  "data": [
    {
      "id": "alt_9Bc3De4Fg5Hi",
      "severity": "warning",
      "type": "high_co2",
      "zone_id": "zn_8Xy9Za1Bc2Cd",
      "message": "CO₂ level exceeded 1000 ppm",
      "value": 1050,
      "threshold": 1000,
      "first_detected": "2025-11-28T14:25:00Z",
      "status": "active",
      "recommended_action": "Increase ventilation rate by 20%"
    },
    {
      "id": "alt_6Jk7Lm8No9Pq",
      "severity": "critical",
      "type": "sensor_offline",
      "sensor_id": "sns_4Mn6Op7Qr8St",
      "message": "Sensor hasn't reported in 15 minutes",
      "last_seen": "2025-11-28T14:17:00Z",
      "status": "active"
    }
  ]
}
```

#### Create Custom Alert Rule
```http
POST /v2/buildings/{building_id}/alert-rules
Content-Type: application/json

{
  "name": "High PM2.5 Detection",
  "condition": {
    "metric": "pm25",
    "operator": "greater_than",
    "threshold": 35,
    "duration_minutes": 10
  },
  "actions": [
    {
      "type": "email",
      "recipients": ["facilities@company.com"]
    },
    {
      "type": "webhook",
      "url": "https://yourapp.com/nimbus-webhook"
    }
  ],
  "enabled": true
}
```

---

## GraphQL API

**Endpoint**: `https://api.nimbusbiome.io/graphql`

### Example Query

```graphql
query GetBuildingOverview($buildingId: ID!) {
  building(id: $buildingId) {
    id
    name
    area_sqft
    
    metrics {
      energy {
        current_kw
        today_kwh
        vs_baseline_pct
      }
      
      carbon {
        today_kg_co2
        intensity_kg_per_sqft
      }
      
      comfort {
        temperature_avg_f
        humidity_avg_pct
        co2_avg_ppm
        comfort_score
      }
    }
    
    zones {
      id
      name
      floor
      sensors {
        total
        active
      }
    }
  }
}
```

**Variables**:
```json
{
  "buildingId": "bld_2L8F9mKpN4Qr"
}
```

### Mutations

```graphql
mutation UpdateHVACSetpoint($systemId: ID!, $temperature: Float!) {
  updateHVACSetpoint(
    systemId: $systemId,
    setpointTempF: $temperature,
    mode: AUTO
  ) {
    success
    updatedSetpoint
    effectiveAt
    estimatedSavingsPct
  }
}
```

---

## MQTT API

### Connection

```python
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.username_pw_set("YOUR_API_KEY", "")
client.tls_set()  # Enable TLS
client.connect("mqtt.nimbusbiome.io", 8883, 60)
```

### Topics

**Subscribe to Real-Time Sensor Data**:
```
buildings/{building_id}/sensors/{sensor_id}/readings
```

**Example Message**:
```json
{
  "sensor_id": "sns_4Mn6Op7Qr8St",
  "timestamp": "2025-11-28T14:32:45Z",
  "value": 652,
  "unit": "ppm",
  "quality_score": 0.98
}
```

**Subscribe to Alerts**:
```
buildings/{building_id}/alerts
```

**Publish HVAC Control Command**:
```
buildings/{building_id}/hvac/{system_id}/command
```

**Payload**:
```json
{
  "action": "set_setpoint",
  "setpoint_temp_f": 72,
  "mode": "auto"
}
```

---

## WebSocket API

**Real-Time Streaming**: `wss://ws.nimbusbiome.io/stream`

**Connect with Authorization**:
```javascript
const ws = new WebSocket('wss://ws.nimbusbiome.io/stream?token=YOUR_TOKEN');

ws.onopen = () => {
  // Subscribe to building metrics
  ws.send(JSON.stringify({
    action: 'subscribe',
    channel: 'buildings/bld_2L8F9mKpN4Qr/metrics'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time metrics:', data);
};
```

---

## Rate Limiting

**Standard Tier**: 300 requests/minute  
**Professional**: 1,000 requests/minute  
**Enterprise**: Unlimited

**Headers**:
```http
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 287
X-RateLimit-Reset: 1638360000
```

**429 Response** (Rate limit exceeded):
```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "You have exceeded the rate limit",
    "retry_after_seconds": 42
  }
}
```

---

## Error Handling

**Standard Error Response**:
```json
{
  "error": {
    "code": "invalid_request",
    "message": "The 'start_time' parameter is required",
    "param": "start_time",
    "request_id": "req_9Xa2Bc3De4Fg"
  }
}
```

**Common Error Codes**:

| HTTP | Code | Description |
|------|------|-------------|
| 400 | `invalid_request` | Missing/invalid parameters |
| 401 | `unauthorized` | Invalid/expired token |
| 403 | `forbidden` | Insufficient permissions |
| 404 | `not_found` | Resource doesn't exist |
| 429 | `rate_limit_exceeded` | Too many requests |
| 500 | `internal_error` | Server error |
| 503 | `service_unavailable` | Temporary outage |

---

## SDKs

### JavaScript/TypeScript

```bash
npm install @nimbusbiome/sdk
```

```javascript
import { NimbusBiome } from '@nimbusbiome/sdk';

const nimbus = new NimbusBiome({
  apiKey: process.env.NIMBUS_API_KEY
});

// Get building metrics
const metrics = await nimbus.buildings.getMetrics('bld_2L8F9mKpN4Qr');
console.log('Energy consumption:', metrics.energy.today_kwh);
```

### Python

```bash
pip install nimbus-biome
```

```python
from nimbus_biome import Client

client = Client(api_key='YOUR_API_KEY')

# Get building details
building = client.buildings.get('bld_2L8F9mKpN4Qr')
print(f"Building: {building.name}, Sensors: {building.sensors.total}")

# Stream real-time sensor data
for reading in client.sensors.stream('sns_4Mn6Op7Qr8St'):
    print(f"CO₂: {reading.value} ppm")
```

---

## Webhooks

**Register Webhook**:
```http
POST /v2/webhooks
Content-Type: application/json

{
  "url": "https://yourapp.com/nimbus-webhook",
  "events": [
    "alert.created",
    "sensor.offline",
    "energy.threshold_exceeded"
  ],
  "secret": "whsec_abc123..."  // For HMAC signature verification
}
```

**Webhook Payload**:
```json
{
  "id": "evt_7Ij8Kl9Mn0Op",
  "type": "alert.created",
  "created_at": "2025-11-28T14:32:18Z",
  "data": {
    "alert_id": "alt_9Bc3De4Fg5Hi",
    "building_id": "bld_2L8F9mKpN4Qr",
    "severity": "warning",
    "type": "high_co2",
    "value": 1050
  }
}
```

**Signature Verification**:
```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, f"sha256={expected}")
```

---

## Best Practices

### 1. Use Pagination
```http
GET /v2/buildings?limit=100&offset=0
# Then: offset=100, offset=200, etc.
```

### 2. Cache Responses
```http
# Check ETag for unchanged data
GET /v2/buildings/{id}
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# Response: 304 Not Modified (use cached version)
```

### 3. Filter Data Server-Side
```http
# Better: Filter on server
GET /v2/sensors?type=co2&status=active

# Avoid: Fetching all sensors, filter client-side
GET /v2/sensors  # Returns 50,000 sensors
```

### 4. Use WebSockets for Real-Time
```javascript
// Use WebSocket for continuous updates
const ws = new WebSocket('wss://ws.nimbusbiome.io/stream');

// Avoid: Polling every second
setInterval(() => fetch('/v2/metrics'), 1000);  // ❌ Wasteful
```

---

## API Changelog

### v2.1.0 (Nov 2025)
- ✅ Added GraphQL API
- ✅ Added WebSocket streaming
- ✅ New `/metrics/carbon` endpoint
- ✅ Enhanced HVAC control API

### v2.0.0 (June 2025)
- ✅ OAuth 2.0 authentication
- ✅ Rate limiting (300/min)
- ✅ MQTT support
- ✅ Webhooks

---

**Document Classification**: API Documentation  
**Last Updated**: November 28, 2025  
**API Status**: https://status.nimbusbiome.io  

© 2025 NIMBUS BIOME Inc. All rights reserved.
