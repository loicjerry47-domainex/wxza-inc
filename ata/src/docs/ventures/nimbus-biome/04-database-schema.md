# NIMBUS BIOME - Database Schema
## Time-Series, Spatial & Relational Database Architecture

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Technical Architecture - Database  
**Reading Time:** 55 minutes

---

## Executive Summary

NIMBUS BIOME's database architecture is a **multi-modal hybrid system** combining **time-series (InfluxDB)**, **spatial (PostGIS)**, **relational (PostgreSQL)**, and **caching (Redis)** databases to handle **100 million+ data points per hour** with **sub-100ms query latency** at scale.

### Database Architecture Highlights

| Component | Technology | Purpose | Scale |
|-----------|-----------|---------|-------|
| **Time-Series** | InfluxDB 2.7 | Sensor metrics | 100M+ points/hour |
| **Spatial** | PostGIS 3.4 | Building geometry | 2,500 buildings |
| **Relational** | PostgreSQL 16 | Metadata, users | 50M+ records |
| **Cache** | Redis 7.2 | Hot data, sessions | 50GB dataset |
| **Event Streaming** | Kafka 3.6 | Real-time pipeline | 500K events/sec |
| **Object Storage** | S3 / MinIO | Historical archive | 680TB+ |

### Key Performance Metrics

| Metric | Value | Context |
|--------|-------|---------|
| **Data Ingestion Rate** | 100M+ points/hour | 50,000 sensors × 2,000 buildings |
| **Query Latency (p95)** | 87ms | Complex aggregation queries |
| **Write Throughput** | 500K writes/sec | Sustained performance |
| **Data Retention** | 1 year (1s), 5 years (1h), 7 years (1d) | Tiered storage |
| **Database Size** | 2.8TB (active), 680TB (archive) | Growing 15TB/month |
| **Backup Frequency** | Continuous (WAL), hourly (snapshots) | 99.99% durability |

---

## Table of Contents

1. [Database Architecture Overview](#1-database-architecture-overview)
2. [Time-Series Database (InfluxDB)](#2-time-series-database-influxdb)
3. [Spatial Database (PostGIS)](#3-spatial-database-postgis)
4. [Relational Database (PostgreSQL)](#4-relational-database-postgresql)
5. [Cache Layer (Redis)](#5-cache-layer-redis)
6. [Event Streaming (Kafka)](#6-event-streaming-kafka)
7. [Data Lifecycle Management](#7-data-lifecycle-management)
8. [Query Patterns & Optimization](#8-query-patterns--optimization)
9. [Backup & Disaster Recovery](#9-backup--disaster-recovery)
10. [Security & Access Control](#10-security--access-control)

---

## 1. Database Architecture Overview

### 1.1 Multi-Modal Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                            │
│  • Web Dashboard (React)                                         │
│  • Mobile App (React Native)                                     │
│  • API Gateway (Rust/Actix)                                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────────┐
│                    CACHE LAYER (Redis)                           │
│  • Hot data (last 15 minutes)                                    │
│  • API response cache (5-minute TTL)                             │
│  • Session store                                                 │
│  • Real-time aggregations                                        │
└─────┬──────────────┬──────────────┬──────────────┬──────────────┘
      │              │              │              │
┌─────▼──────┐ ┌────▼─────┐ ┌──────▼─────┐ ┌──────▼──────┐
│ InfluxDB   │ │ PostGIS  │ │PostgreSQL  │ │   Kafka     │
│Time-Series │ │ Spatial  │ │Relational  │ │  Streaming  │
│            │ │          │ │            │ │             │
│• Sensor    │ │• Building│ │• Users     │ │• Real-time  │
│  metrics   │ │  geometry│ │• Devices   │ │  events     │
│• Energy    │ │• Zones   │ │• Alerts    │ │• Audit log  │
│  data      │ │• Spatial │ │• Configs   │ │• ML pipeline│
│• Occupancy │ │  queries │ │• API keys  │ │             │
│            │ │          │ │            │ │             │
│100M+/hour  │ │2,500 bldg│ │50M records │ │500K/sec     │
└─────┬──────┘ └────┬─────┘ └──────┬─────┘ └──────┬──────┘
      │              │              │              │
┌─────▼──────────────▼──────────────▼──────────────▼──────────────┐
│                 OBJECT STORAGE (S3 / MinIO)                      │
│  • Historical data archive (>1 year)                             │
│  • Compliance data (7-year retention)                            │
│  • ML training datasets                                          │
│  • Backup snapshots                                              │
│  • 680TB+ stored, 15TB/month growth                              │
└──────────────────────────────────────────────────────────────────┘
```

### 1.2 Design Principles

**1. Polyglot Persistence**: Use the right database for each data type
- **Time-series → InfluxDB**: Optimized for timestamp-indexed metrics
- **Spatial → PostGIS**: Geospatial queries (building footprints, zones)
- **Relational → PostgreSQL**: Transactional data (users, configs)
- **Cache → Redis**: Sub-millisecond reads for hot data

**2. Immutable Data Model**: Sensor readings never updated, only inserted
- Append-only architecture (simplifies replication)
- Event sourcing for state changes
- Temporal queries ("What was the temperature at 2pm yesterday?")

**3. Tiered Storage**: Balance performance and cost
- **Hot tier**: Last 15 minutes in Redis (sub-ms latency)
- **Warm tier**: Last 1 year in InfluxDB (1-second granularity)
- **Cold tier**: 1-7 years in S3 (1-hour granularity)
- **Archive tier**: >7 years in Glacier (compliance)

**4. Horizontal Scalability**: Shard by building ID
- Each building is an independent tenant
- Easy to scale (add more shards)
- Fault isolation (one building failure doesn't affect others)

---

## 2. Time-Series Database (InfluxDB)

### 2.1 Why InfluxDB?

**Time-Series Optimized**:
- ✅ 10-100× faster than PostgreSQL for time-series queries
- ✅ Built-in downsampling (automatic aggregation)
- ✅ Compression (10:1 ratio typical)
- ✅ Native retention policies (automatic data deletion)
- ✅ Flux query language (powerful time-series operations)

**Performance**:
- **Write throughput**: 500,000 points/second (single node)
- **Query latency**: <100ms (p95) for complex aggregations
- **Compression**: 90% (1TB raw → 100GB stored)
- **Retention**: 1 year (1-second), 5 years (1-minute), 7 years (1-hour)

### 2.2 Data Model

**Measurement Schema** (equivalent to SQL tables):

#### **sensor_readings** (Primary measurement)

```
measurement: sensor_readings

tags:
  - building_id (indexed, for sharding)
  - sensor_id (indexed, unique identifier)
  - sensor_type (indexed: "co2", "temperature", "occupancy", etc.)
  - zone_id (indexed, spatial grouping)
  - floor (indexed, vertical grouping)

fields:
  - value (float64, the actual measurement)
  - unit (string, e.g., "ppm", "°F", "count")
  - quality_score (float64, 0.0-1.0, sensor health)
  - battery_level (int, 0-100, for wireless sensors)
  - signal_strength (int, dBm, network quality)

timestamp: (nanosecond precision)
```

**Example Data Point**:
```
sensor_readings,building_id=bld_2L8F9mKpN4Qr,sensor_id=sns_4Mn6Op7Qr8St,sensor_type=co2,zone_id=zn_8Xy9Za1Bc2Cd,floor=25 value=650,unit="ppm",quality_score=0.98,battery_level=87,signal_strength=-72 1638360000000000000
```

**Cardinality Analysis**:
```
Total series cardinality:
  2,500 buildings × 50,000 sensors = 125,000,000 series

Per-building cardinality:
  50,000 sensors (typical enterprise deployment)

Query planning:
  Always filter by building_id first (shard routing)
  Then sensor_type (reduces search space)
```

#### **energy_consumption** (Measurement)

```
measurement: energy_consumption

tags:
  - building_id
  - meter_id
  - circuit_name (e.g., "HVAC_Floor_25")
  - category (e.g., "hvac", "lighting", "plug_loads")

fields:
  - kwh (float64, cumulative energy)
  - kw (float64, instantaneous power)
  - voltage (float64, volts)
  - current (float64, amps)
  - power_factor (float64, 0.0-1.0)
  - frequency (float64, Hz)

timestamp:
```

#### **occupancy_counts** (Measurement)

```
measurement: occupancy_counts

tags:
  - building_id
  - zone_id
  - floor
  - detection_method (e.g., "thermal", "ultrasonic", "co2_based")

fields:
  - count (int, number of people)
  - capacity (int, max occupancy)
  - utilization_pct (float64, count/capacity × 100)
  - confidence_score (float64, 0.0-1.0)

timestamp:
```

#### **hvac_status** (Measurement)

```
measurement: hvac_status

tags:
  - building_id
  - system_id (e.g., "ahu_floor_25")
  - system_type (e.g., "AHU", "VAV", "Chiller")
  - zone_id

fields:
  - supply_air_temp_f (float64)
  - return_air_temp_f (float64)
  - setpoint_temp_f (float64)
  - fan_speed_pct (float64, 0-100)
  - airflow_cfm (int, cubic feet per minute)
  - power_kw (float64)
  - efficiency (float64, COP or EER)
  - status (string, "running", "idle", "fault")

timestamp:
```

### 2.3 Retention Policies

**Multi-Tier Retention Strategy**:

```sql
-- Raw data (1-second granularity)
CREATE RETENTION POLICY "raw_data" 
  ON "nimbus_biome" 
  DURATION 365d 
  REPLICATION 2 
  DEFAULT;

-- Downsampled to 1-minute (for historical analysis)
CREATE RETENTION POLICY "downsampled_1m" 
  ON "nimbus_biome" 
  DURATION 1825d  -- 5 years
  REPLICATION 2;

-- Downsampled to 1-hour (for long-term trends)
CREATE RETENTION POLICY "downsampled_1h" 
  ON "nimbus_biome" 
  DURATION 2555d  -- 7 years
  REPLICATION 2;
```

**Continuous Queries** (Automatic Downsampling):

```sql
-- Downsample sensor readings to 1-minute averages
CREATE CONTINUOUS QUERY "downsample_sensors_1m" 
ON "nimbus_biome"
BEGIN
  SELECT 
    MEAN(value) AS value,
    MEAN(quality_score) AS quality_score,
    MIN(battery_level) AS battery_level,
    MEAN(signal_strength) AS signal_strength
  INTO "downsampled_1m"."sensor_readings"
  FROM "raw_data"."sensor_readings"
  GROUP BY time(1m), building_id, sensor_id, sensor_type, zone_id, floor
END;

-- Downsample to 1-hour averages
CREATE CONTINUOUS QUERY "downsample_sensors_1h" 
ON "nimbus_biome"
BEGIN
  SELECT 
    MEAN(value) AS value,
    MEAN(quality_score) AS quality_score
  INTO "downsampled_1h"."sensor_readings"
  FROM "downsampled_1m"."sensor_readings"
  GROUP BY time(1h), building_id, sensor_id, sensor_type, zone_id, floor
END;
```

### 2.4 Query Examples (Flux)

**Example 1: Get last 24 hours of CO₂ data for a zone**

```flux
from(bucket: "nimbus_biome/raw_data")
  |> range(start: -24h)
  |> filter(fn: (r) => r.building_id == "bld_2L8F9mKpN4Qr")
  |> filter(fn: (r) => r.zone_id == "zn_8Xy9Za1Bc2Cd")
  |> filter(fn: (r) => r.sensor_type == "co2")
  |> filter(fn: (r) => r._measurement == "sensor_readings")
  |> filter(fn: (r) => r._field == "value")
  |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
  |> yield(name: "co2_5min_avg")
```

**Example 2: Calculate daily energy consumption by category**

```flux
from(bucket: "nimbus_biome/raw_data")
  |> range(start: -30d)
  |> filter(fn: (r) => r.building_id == "bld_2L8F9mKpN4Qr")
  |> filter(fn: (r) => r._measurement == "energy_consumption")
  |> filter(fn: (r) => r._field == "kwh")
  |> derivative(unit: 1d, nonNegative: true)  // Convert cumulative to daily
  |> group(columns: ["category"])
  |> sum(column: "_value")
  |> map(fn: (r) => ({ r with _value: r._value }))
  |> yield(name: "daily_energy_by_category")
```

**Example 3: Peak occupancy analysis**

```flux
from(bucket: "nimbus_biome/raw_data")
  |> range(start: -7d)
  |> filter(fn: (r) => r.building_id == "bld_2L8F9mKpN4Qr")
  |> filter(fn: (r) => r._measurement == "occupancy_counts")
  |> filter(fn: (r) => r._field == "count")
  |> aggregateWindow(every: 1h, fn: max, createEmpty: false)
  |> group(columns: ["floor"])
  |> max(column: "_value")
  |> yield(name: "peak_occupancy_by_floor")
```

**Example 4: Anomaly detection (temperature spikes)**

```flux
import "contrib/anaisdg/anomalydetection"

from(bucket: "nimbus_biome/raw_data")
  |> range(start: -24h)
  |> filter(fn: (r) => r.building_id == "bld_2L8F9mKpN4Qr")
  |> filter(fn: (r) => r.sensor_type == "temperature")
  |> filter(fn: (r) => r._field == "value")
  |> anomalydetection.mad(threshold: 3.0)  // 3 standard deviations
  |> filter(fn: (r) => r.level == "anomaly")
  |> yield(name: "temperature_anomalies")
```

### 2.5 Sharding Strategy

**Shard by Building ID**:
- Each building = independent shard
- Enables horizontal scaling (add nodes for new buildings)
- Fault isolation (one building down doesn't affect others)

**Shard Routing**:
```python
def get_influx_shard(building_id):
    """Route query to appropriate InfluxDB shard"""
    # Consistent hashing based on building_id
    shard_num = hash(building_id) % NUM_INFLUX_NODES
    return INFLUX_NODES[shard_num]

# Example:
shard = get_influx_shard("bld_2L8F9mKpN4Qr")
# Returns: influx-node-3.nimbus.io
```

**Shard Configuration**:
```yaml
# 10-node InfluxDB cluster
influxdb_cluster:
  nodes:
    - id: influx-node-1
      shards: [0, 1, 2, 3, 4]  # 5 shards, ~250 buildings each
      capacity: 10M points/sec
      
    - id: influx-node-2
      shards: [5, 6, 7, 8, 9]
      capacity: 10M points/sec
      
    # ... 8 more nodes
  
  replication_factor: 2  # Each shard replicated 2×
  load_balancing: "round_robin"
```

### 2.6 Performance Optimization

**Indexing**:
```sql
-- InfluxDB automatically indexes all tags
-- Optimize by limiting tag cardinality

-- Good: Low cardinality tags
tags: building_id, sensor_type, zone_id, floor

-- Bad: High cardinality tags (avoid)
-- tags: timestamp, value, sensor_serial_number
```

**Compression**:
```yaml
# InfluxDB compression settings
storage-engine:
  wal-fsync-delay: 100ms
  cache-max-memory-size: 1GB
  cache-snapshot-memory-size: 25MB
  cache-snapshot-write-cold-duration: 10m
  
  # TSM (Time-Structured Merge tree) settings
  compact-full-write-cold-duration: 4h
  max-concurrent-compactions: 3
  
  # Compression (Snappy + Delta encoding)
  compression: snappy
  expected-compression-ratio: 10  # 10:1 typical
```

**Query Performance**:
```python
# Best practices for fast queries

# ✅ Always filter by building_id first (shard routing)
query = '''
from(bucket: "nimbus_biome")
  |> range(start: -1h)
  |> filter(fn: (r) => r.building_id == "bld_2L8F9mKpN4Qr")  # ← First!
  |> filter(fn: (r) => r.sensor_type == "co2")
'''

# ✅ Use aggregateWindow() instead of group() + aggregation
query = '''
|> aggregateWindow(every: 5m, fn: mean)  # Faster
'''

# ❌ Avoid: Unbounded queries (no time range)
query_bad = '''
from(bucket: "nimbus_biome")
  |> filter(fn: (r) => r.sensor_type == "co2")  # Scans all data!
'''

# ❌ Avoid: High-cardinality grouping
query_bad = '''
|> group(columns: ["sensor_id"])  # 50,000 groups = slow
'''
```

---

## 3. Spatial Database (PostGIS)

### 3.1 Why PostGIS?

**Geospatial Operations**:
- ✅ Building footprint analysis (area, perimeter)
- ✅ Zone containment queries ("Which sensors are in this zone?")
- ✅ Proximity searches ("Find all buildings within 5km")
- ✅ Heat map generation (spatial aggregation)
- ✅ 3D geometry support (floor-by-floor analysis)

### 3.2 Schema: Buildings Table

```sql
CREATE TABLE buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    
    -- Address
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    country VARCHAR(50) DEFAULT 'USA',
    
    -- Geospatial (2D footprint)
    location GEOGRAPHY(POINT, 4326),  -- WGS84 lat/lon
    geometry GEOGRAPHY(POLYGON, 4326),  -- Building footprint
    
    -- 3D geometry (for floor-by-floor analysis)
    geometry_3d GEOMETRY(POLYHEDRALSURFACE, 4326),
    
    -- Physical characteristics
    area_sqft INTEGER,
    floors INTEGER,
    height_ft NUMERIC(8, 2),
    construction_year INTEGER,
    building_type VARCHAR(50),  -- 'office', 'residential', 'mixed_use'
    
    -- Metadata
    timezone VARCHAR(50),  -- 'America/New_York'
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Indexes
    CONSTRAINT buildings_name_key UNIQUE (name)
);

-- Spatial indexes (R-tree for fast geospatial queries)
CREATE INDEX idx_buildings_location ON buildings USING GIST (location);
CREATE INDEX idx_buildings_geometry ON buildings USING GIST (geometry);
CREATE INDEX idx_buildings_geometry_3d ON buildings USING GIST (geometry_3d);

-- Regular indexes
CREATE INDEX idx_buildings_city_state ON buildings (city, state);
CREATE INDEX idx_buildings_type ON buildings (building_type);
```

**Example Data**:
```sql
INSERT INTO buildings (
    name, 
    street_address, 
    city, 
    state, 
    zip_code,
    location,
    geometry,
    area_sqft,
    floors,
    building_type
) VALUES (
    'Empire State Building',
    '350 5th Ave',
    'New York',
    'NY',
    '10118',
    ST_SetSRID(ST_MakePoint(-73.985428, 40.748817), 4326),  -- Point
    ST_SetSRID(ST_GeomFromGeoJSON('{
        "type": "Polygon",
        "coordinates": [[
            [-73.985550, 40.748900],
            [-73.985300, 40.748900],
            [-73.985300, 40.748700],
            [-73.985550, 40.748700],
            [-73.985550, 40.748900]
        ]]
    }'), 4326),  -- Footprint polygon
    2768591,  -- area
    102,  -- floors
    'office'
);
```

### 3.3 Schema: Zones Table

```sql
CREATE TABLE zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    zone_type VARCHAR(50),  -- 'office', 'conference', 'lobby', etc.
    floor INTEGER NOT NULL,
    
    -- 2D geometry (floor plan outline)
    geometry GEOGRAPHY(POLYGON, 4326),
    
    -- 3D geometry (includes floor and ceiling)
    geometry_3d GEOMETRY(POLYHEDRALSURFACE, 4326),
    
    -- Physical characteristics
    area_sqft INTEGER,
    ceiling_height_ft NUMERIC(5, 2) DEFAULT 9.0,
    volume_cuft INTEGER,
    
    -- Occupancy
    capacity INTEGER,  -- Max occupancy (fire code)
    typical_occupancy INTEGER,  -- Typical usage
    
    -- HVAC
    hvac_system_id VARCHAR(100),  -- Links to BAS
    target_temp_f NUMERIC(4, 1) DEFAULT 72.0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT zones_building_floor_name_key UNIQUE (building_id, floor, name)
);

-- Indexes
CREATE INDEX idx_zones_building ON zones (building_id);
CREATE INDEX idx_zones_floor ON zones (floor);
CREATE INDEX idx_zones_geometry ON zones USING GIST (geometry);
CREATE INDEX idx_zones_geometry_3d ON zones USING GIST (geometry_3d);
```

### 3.4 Schema: Sensors Table (Spatial)

```sql
CREATE TABLE sensors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sensor_id VARCHAR(50) UNIQUE NOT NULL,  -- Hardware ID
    
    building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
    
    -- Sensor type
    sensor_type VARCHAR(50) NOT NULL,  -- 'co2', 'temperature', etc.
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    firmware_version VARCHAR(50),
    
    -- 3D location (x, y, z in meters)
    location GEOMETRY(POINTZ, 4326),  -- Z = height above floor
    
    -- Alternatively: Relative coordinates
    floor INTEGER,
    x_meters NUMERIC(8, 3),
    y_meters NUMERIC(8, 3),
    z_meters NUMERIC(5, 3),  -- Height above floor
    
    -- Sensor characteristics
    measurement_range NUMRANGE,  -- e.g., [0, 5000] for CO₂
    accuracy_pct NUMERIC(5, 2),  -- ±2.5%
    resolution NUMERIC(10, 4),
    
    -- Network
    network_protocol VARCHAR(20),  -- 'LoRaWAN', 'Zigbee', etc.
    mac_address VARCHAR(20),
    ip_address INET,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',  -- 'active', 'inactive', 'maintenance'
    battery_level INTEGER,  -- 0-100%
    signal_strength INTEGER,  -- dBm
    
    -- Maintenance
    installed_date DATE,
    last_calibration_date DATE,
    next_calibration_date DATE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_reading_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_sensors_building ON sensors (building_id);
CREATE INDEX idx_sensors_zone ON sensors (zone_id);
CREATE INDEX idx_sensors_type ON sensors (sensor_type);
CREATE INDEX idx_sensors_status ON sensors (status);
CREATE INDEX idx_sensors_location ON sensors USING GIST (location);
CREATE INDEX idx_sensors_sensor_id ON sensors (sensor_id);
```

### 3.5 Geospatial Query Examples

**Example 1: Find all sensors within a zone**

```sql
-- Method 1: Using zone_id (fast, indexed)
SELECT s.sensor_id, s.sensor_type, s.x_meters, s.y_meters
FROM sensors s
WHERE s.zone_id = 'zn_8Xy9Za1Bc2Cd'
  AND s.status = 'active';

-- Method 2: Using spatial containment (when zone_id is NULL)
SELECT s.sensor_id, s.sensor_type
FROM sensors s
JOIN zones z ON z.id = 'zn_8Xy9Za1Bc2Cd'
WHERE ST_Contains(z.geometry, s.location)
  AND s.status = 'active';
```

**Example 2: Calculate zone area and sensor density**

```sql
SELECT 
    z.name AS zone_name,
    z.floor,
    z.area_sqft,
    COUNT(s.id) AS sensor_count,
    ROUND(z.area_sqft::numeric / COUNT(s.id), 1) AS sqft_per_sensor
FROM zones z
LEFT JOIN sensors s ON s.zone_id = z.id AND s.status = 'active'
WHERE z.building_id = 'bld_2L8F9mKpN4Qr'
GROUP BY z.id, z.name, z.floor, z.area_sqft
ORDER BY z.floor, z.name;
```

**Example 3: Find buildings within 5km radius**

```sql
SELECT 
    b.name,
    b.city,
    b.state,
    ROUND(ST_Distance(
        b.location,
        ST_SetSRID(ST_MakePoint(-73.985428, 40.748817), 4326)
    )::numeric / 1000, 2) AS distance_km
FROM buildings b
WHERE ST_DWithin(
    b.location,
    ST_SetSRID(ST_MakePoint(-73.985428, 40.748817), 4326),
    5000  -- 5000 meters = 5km
)
ORDER BY distance_km;
```

**Example 4: Heat map data (sensor readings by spatial grid)**

```sql
-- Divide building into 10m × 10m grid cells, aggregate sensor values
WITH grid AS (
    SELECT 
        ST_PixelAsPolygons(
            ST_AsRaster(
                (SELECT geometry FROM buildings WHERE id = 'bld_2L8F9mKpN4Qr'),
                10,  -- 10m cell size
                10,
                '32BF'::text,
                0
            ),
            1
        ) AS geom
)
SELECT 
    g.x,
    g.y,
    AVG(sr.value) AS avg_co2,
    COUNT(s.id) AS sensor_count
FROM grid g
JOIN sensors s ON ST_Contains(ST_Transform(g.geom, 4326), s.location)
JOIN sensor_readings sr ON sr.sensor_id = s.sensor_id
WHERE s.sensor_type = 'co2'
  AND sr.timestamp > NOW() - INTERVAL '1 hour'
GROUP BY g.x, g.y
HAVING COUNT(s.id) > 0;
```

---

## 4. Relational Database (PostgreSQL)

### 4.1 Schema: Users & Authentication

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- bcrypt
    
    -- Profile
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    
    -- Role-based access control
    role VARCHAR(20) NOT NULL DEFAULT 'viewer',  -- 'admin', 'manager', 'viewer'
    
    -- Organization
    organization_id UUID REFERENCES organizations(id),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',  -- 'active', 'suspended', 'deleted'
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMPTZ,
    
    -- Security
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(32),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_organization ON users (organization_id);
CREATE INDEX idx_users_role ON users (role);
```

### 4.2 Schema: Organizations

```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,  -- URL-friendly
    
    -- Subscription
    plan VARCHAR(50) DEFAULT 'starter',  -- 'starter', 'professional', 'enterprise'
    billing_email VARCHAR(255),
    stripe_customer_id VARCHAR(100),
    
    -- Limits
    max_buildings INTEGER DEFAULT 10,
    max_sensors INTEGER DEFAULT 50000,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 Schema: API Keys

```sql
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    key_prefix VARCHAR(20) UNIQUE NOT NULL,  -- 'nmbs_sk_live_abc123'
    key_hash VARCHAR(255) NOT NULL,  -- SHA-256 of full key
    
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    
    name VARCHAR(100),  -- User-defined label
    
    -- Permissions (scope)
    scopes TEXT[],  -- ['buildings:read', 'sensors:read', 'metrics:read']
    
    -- Rate limiting
    rate_limit INTEGER DEFAULT 300,  -- requests/minute
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_api_keys_prefix ON api_keys (key_prefix);
CREATE INDEX idx_api_keys_user ON api_keys (user_id);
CREATE INDEX idx_api_keys_org ON api_keys (organization_id);
```

### 4.4 Schema: Alerts & Notifications

```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
    sensor_id UUID REFERENCES sensors(id) ON DELETE SET NULL,
    
    -- Alert details
    severity VARCHAR(20) NOT NULL,  -- 'info', 'warning', 'critical'
    alert_type VARCHAR(50) NOT NULL,  -- 'high_co2', 'sensor_offline', etc.
    
    message TEXT NOT NULL,
    details JSONB,  -- Additional context
    
    -- Threshold
    threshold_value NUMERIC,
    actual_value NUMERIC,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',  -- 'active', 'acknowledged', 'resolved'
    
    -- Resolution
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT,
    
    -- Timestamps
    first_detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_alerts_building ON alerts (building_id);
CREATE INDEX idx_alerts_status ON alerts (status);
CREATE INDEX idx_alerts_severity ON alerts (severity);
CREATE INDEX idx_alerts_type ON alerts (alert_type);
CREATE INDEX idx_alerts_created ON alerts (created_at DESC);
```

### 4.5 Schema: Alert Rules (User-Defined)

```sql
CREATE TABLE alert_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id),
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Condition
    metric VARCHAR(50) NOT NULL,  -- 'co2', 'temperature', 'pm25', etc.
    operator VARCHAR(20) NOT NULL,  -- 'greater_than', 'less_than', 'equals'
    threshold_value NUMERIC NOT NULL,
    duration_minutes INTEGER DEFAULT 5,  -- Alert after N minutes
    
    -- Filters
    zone_ids UUID[],  -- Apply to specific zones (NULL = all zones)
    sensor_types VARCHAR(50)[],
    
    -- Actions
    actions JSONB NOT NULL,  -- [{"type": "email", "recipients": [...]}]
    
    -- Status
    enabled BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Cache Layer (Redis)

### 5.1 Use Cases

**1. Hot Data Cache** (last 15 minutes of sensor readings)
```redis
# Key pattern: sensor:{sensor_id}:readings:recent
ZADD sensor:sns_4Mn6Op7Qr8St:readings:recent 1638360000 "650"
ZADD sensor:sns_4Mn6Op7Qr8St:readings:recent 1638360060 "652"
ZADD sensor:sns_4Mn6Op7Qr8St:readings:recent 1638360120 "648"

# Get last 15 minutes (900 seconds)
ZRANGEBYSCORE sensor:sns_4Mn6Op7Qr8St:readings:recent (NOW-900) +inf

# Auto-expire old data
EXPIRE sensor:sns_4Mn6Op7Qr8St:readings:recent 900
```

**2. API Response Cache**
```redis
# Cache building metrics for 5 minutes
SET api:buildings:bld_2L8F9mKpN4Qr:metrics "{...JSON...}" EX 300
```

**3. Real-Time Aggregations**
```redis
# Building-level live metrics (updated every 1 second)
HSET building:bld_2L8F9mKpN4Qr:live \
    current_kw 12450 \
    current_occupancy 3842 \
    avg_co2 620 \
    avg_temp_f 72.4

# Expire after 60 seconds (if not updated, data is stale)
EXPIRE building:bld_2L8F9mKpN4Qr:live 60
```

**4. Rate Limiting**
```redis
# Token bucket algorithm for API rate limiting
SET ratelimit:api_key:nmbs_sk_live_abc123:1638360000 1 EX 60
INCR ratelimit:api_key:nmbs_sk_live_abc123:1638360000

# Check if over limit (300/minute)
GET ratelimit:api_key:nmbs_sk_live_abc123:1638360000
# Returns: 287 (under limit)
```

**5. Session Store**
```redis
# User session (JWT not stored, only session metadata)
HSET session:sess_abc123 \
    user_id "usr_9Xa2Bc3De4Fg" \
    organization_id "org_5Hi6Jk7Lm8No" \
    role "admin" \
    last_active 1638360000

EXPIRE session:sess_abc123 3600  # 1-hour session
```

### 5.2 Redis Data Structures

```python
import redis

redis_client = redis.Redis(host='redis.nimbus.io', port=6379, db=0)

# Sorted Set (for time-series data)
redis_client.zadd(
    'sensor:sns_4Mn6Op7Qr8St:readings',
    {650: 1638360000, 652: 1638360060}  # {value: timestamp}
)

# Hash (for structured data)
redis_client.hset(
    'building:bld_2L8F9mKpN4Qr:live',
    mapping={
        'current_kw': 12450,
        'current_occupancy': 3842,
        'avg_co2': 620
    }
)

# String (for cache)
redis_client.setex(
    'api:buildings:bld_2L8F9mKpN4Qr:metrics',
    300,  # TTL: 5 minutes
    json.dumps(metrics_data)
)

# List (for recent alerts)
redis_client.lpush('alerts:recent', json.dumps(alert_data))
redis_client.ltrim('alerts:recent', 0, 99)  # Keep last 100
```

---

## 6. Event Streaming (Kafka)

### 6.1 Topics

```yaml
topics:
  # Raw sensor data (before InfluxDB insertion)
  - name: sensor-readings-raw
    partitions: 50  # Partition by building_id
    replication_factor: 3
    retention_ms: 86400000  # 1 day
    
  # Alerts (for real-time notifications)
  - name: alerts
    partitions: 10
    replication_factor: 3
    retention_ms: 604800000  # 7 days
    
  # Audit log (user actions)
  - name: audit-log
    partitions: 5
    replication_factor: 3
    retention_ms: 2592000000  # 30 days
    
  # ML predictions (HVAC optimization, occupancy forecast)
  - name: ml-predictions
    partitions: 20
    replication_factor: 3
    retention_ms: 86400000  # 1 day
```

### 6.2 Message Schema (Avro)

```json
{
  "namespace": "io.nimbusbiome.events",
  "type": "record",
  "name": "SensorReading",
  "fields": [
    {"name": "sensor_id", "type": "string"},
    {"name": "building_id", "type": "string"},
    {"name": "sensor_type", "type": "string"},
    {"name": "timestamp", "type": "long"},
    {"name": "value", "type": "double"},
    {"name": "unit", "type": "string"},
    {"name": "quality_score", "type": "double"}
  ]
}
```

### 6.3 Consumer Example (Python)

```python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'sensor-readings-raw',
    bootstrap_servers=['kafka1.nimbus.io:9092'],
    group_id='influxdb-writer',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    sensor_reading = message.value
    
    # Write to InfluxDB
    influx_client.write(
        bucket='nimbus_biome/raw_data',
        record={
            'measurement': 'sensor_readings',
            'tags': {
                'building_id': sensor_reading['building_id'],
                'sensor_id': sensor_reading['sensor_id'],
                'sensor_type': sensor_reading['sensor_type']
            },
            'fields': {
                'value': sensor_reading['value'],
                'quality_score': sensor_reading['quality_score']
            },
            'time': sensor_reading['timestamp']
        }
    )
```

---

## 7. Data Lifecycle Management

### 7.1 Data Retention Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│  DATA LIFECYCLE (Sensor Readings)                               │
├─────────────────────────────────────────────────────────────────┤
│  [0-15 min]   Redis (sub-ms latency)          50GB              │
│  [15 min-1 yr] InfluxDB raw (1s)              2.8TB             │
│  [1-5 years]  InfluxDB downsampled (1min)     560GB             │
│  [5-7 years]  InfluxDB downsampled (1hour)    84GB              │
│  [7+ years]   S3 Glacier (compliance)         680TB (compressed)│
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 Automated Data Movement

```python
# Daily cron job: Move old data from InfluxDB to S3
import boto3
from influxdb_client import InfluxDBClient

def archive_old_data():
    """Archive InfluxDB data older than 1 year to S3"""
    
    # Query old data
    query = '''
    from(bucket: "nimbus_biome/raw_data")
      |> range(start: -400d, stop: -365d)
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
    '''
    
    result = influx_client.query_api().query(query)
    
    # Convert to Parquet (efficient columnar format)
    df = result.to_pandas()
    parquet_buffer = df.to_parquet(compression='snappy')
    
    # Upload to S3
    s3_client = boto3.client('s3')
    s3_client.put_object(
        Bucket='nimbus-biome-archive',
        Key=f'sensor_readings/year=2024/month=11/data.parquet',
        Body=parquet_buffer
    )
    
    # Delete from InfluxDB (free up space)
    influx_client.delete_api().delete(
        start="2024-11-01T00:00:00Z",
        stop="2024-11-30T23:59:59Z",
        predicate='_measurement="sensor_readings"',
        bucket="nimbus_biome/raw_data"
    )
```

---

## 8. Query Patterns & Optimization

### 8.1 Common Query Patterns

**Pattern 1: Building Dashboard (Real-Time)**

```sql
-- Served from Redis cache (5-minute TTL)
-- Updated every 1 second by background job

SELECT 
    b.id,
    b.name,
    cache.current_kw::numeric AS current_power,
    cache.today_kwh::numeric AS today_energy,
    cache.current_occupancy::integer,
    cache.avg_co2::numeric,
    cache.avg_temp_f::numeric
FROM buildings b
LEFT JOIN LATERAL (
    SELECT 
        hget('building:' || b.id || ':live', 'current_kw') AS current_kw,
        hget('building:' || b.id || ':live', 'today_kwh') AS today_kwh,
        hget('building:' || b.id || ':live', 'current_occupancy') AS current_occupancy,
        hget('building:' || b.id || ':live', 'avg_co2') AS avg_co2,
        hget('building:' || b.id || ':live', 'avg_temp_f') AS avg_temp_f
) cache ON TRUE
WHERE b.id = 'bld_2L8F9mKpN4Qr';
```

**Pattern 2: Historical Energy Analysis**

```flux
// InfluxDB query (served from warm tier)
from(bucket: "nimbus_biome/downsampled_1h")
  |> range(start: -30d)
  |> filter(fn: (r) => r.building_id == "bld_2L8F9mKpN4Qr")
  |> filter(fn: (r) => r._measurement == "energy_consumption")
  |> filter(fn: (r) => r._field == "kwh")
  |> derivative(unit: 1d, nonNegative: true)
  |> group(columns: ["category"])
  |> sum()
```

**Pattern 3: Sensor Health Monitoring**

```sql
-- PostgreSQL + InfluxDB hybrid query
SELECT 
    s.sensor_id,
    s.sensor_type,
    s.zone_id,
    s.battery_level,
    s.last_reading_at,
    EXTRACT(EPOCH FROM (NOW() - s.last_reading_at)) AS seconds_since_reading,
    CASE 
        WHEN s.last_reading_at < NOW() - INTERVAL '15 minutes' THEN 'offline'
        WHEN s.battery_level < 20 THEN 'low_battery'
        ELSE 'healthy'
    END AS health_status
FROM sensors s
WHERE s.building_id = 'bld_2L8F9mKpN4Qr'
  AND s.status = 'active'
ORDER BY seconds_since_reading DESC;
```

### 8.2 Query Optimization Techniques

**1. Materialized Views (PostgreSQL)**

```sql
-- Pre-computed building statistics (refreshed hourly)
CREATE MATERIALIZED VIEW building_stats AS
SELECT 
    b.id AS building_id,
    b.name,
    COUNT(DISTINCT s.id) AS sensor_count,
    COUNT(DISTINCT s.id) FILTER (WHERE s.status = 'active') AS active_sensors,
    COUNT(DISTINCT z.id) AS zone_count,
    SUM(z.area_sqft) AS total_area_sqft
FROM buildings b
LEFT JOIN zones z ON z.building_id = b.id
LEFT JOIN sensors s ON s.building_id = b.id
GROUP BY b.id, b.name;

-- Refresh every hour
CREATE UNIQUE INDEX ON building_stats (building_id);
REFRESH MATERIALIZED VIEW CONCURRENTLY building_stats;
```

**2. Partitioning (PostgreSQL)**

```sql
-- Partition alerts table by month (for fast queries)
CREATE TABLE alerts (
    id UUID NOT NULL,
    building_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    -- ... other columns
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE alerts_2025_11 PARTITION OF alerts
    FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');

CREATE TABLE alerts_2025_12 PARTITION OF alerts
    FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');

-- Automatically create new partitions
-- (pg_partman extension or cron job)
```

**3. Connection Pooling**

```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

# PostgreSQL connection pool
pg_engine = create_engine(
    'postgresql://user:pass@postgres.nimbus.io/nimbus_biome',
    poolclass=QueuePool,
    pool_size=20,
    max_overflow=40,
    pool_timeout=30,
    pool_recycle=3600
)

# InfluxDB connection pool (client-side)
influx_client = InfluxDBClient(
    url='https://influx.nimbus.io',
    token='...',
    org='nimbus-biome',
    timeout=30000,  # 30 seconds
    pool_maxsize=50
)
```

---

## 9. Backup & Disaster Recovery

### 9.1 Backup Strategy

**PostgreSQL**:
```bash
# Continuous WAL archiving (point-in-time recovery)
wal_level = replica
archive_mode = on
archive_command = 'aws s3 cp %p s3://nimbus-backups/wal/%f'

# Daily full backup (pg_basebackup)
pg_basebackup -h postgres.nimbus.io -D /backups/daily \
    -Ft -z -P -X stream

# Retention: 7 daily, 4 weekly, 12 monthly
```

**InfluxDB**:
```bash
# Backup to S3 (daily)
influx backup /tmp/influx-backup --bucket nimbus_biome
aws s3 sync /tmp/influx-backup s3://nimbus-backups/influx/2025-11-28/
```

**Redis**:
```bash
# RDB snapshots (every 5 minutes)
save 300 1  # Save if at least 1 key changed in 300 seconds

# AOF (append-only file) for durability
appendonly yes
appendfsync everysec
```

### 9.2 Disaster Recovery Plan

**RTO (Recovery Time Objective)**: 1 hour  
**RPO (Recovery Point Objective)**: 5 minutes

**DR Scenario: Complete Database Failure**

1. **PostgreSQL Recovery**:
```bash
# Restore from latest base backup
pg_restore -d nimbus_biome /backups/daily/base.tar.gz

# Replay WAL logs (point-in-time recovery)
restore_command = 'aws s3 cp s3://nimbus-backups/wal/%f %p'
recovery_target_time = '2025-11-28 14:32:18'
```

2. **InfluxDB Recovery**:
```bash
# Restore from S3 backup
aws s3 sync s3://nimbus-backups/influx/latest/ /tmp/influx-restore
influx restore /tmp/influx-restore --bucket nimbus_biome
```

3. **Redis Recovery**:
```bash
# Redis automatically loads RDB snapshot on startup
redis-cli --rdb /backups/redis/dump.rdb
```

**Total Recovery Time**: ~45 minutes (within 1-hour RTO)

---

## 10. Security & Access Control

### 10.1 Encryption

**At Rest**:
- PostgreSQL: Transparent Data Encryption (TDE)
- InfluxDB: Disk encryption (LUKS)
- S3: Server-side encryption (SSE-KMS)

**In Transit**:
- TLS 1.3 for all database connections
- Certificate pinning for mobile apps

### 10.2 Access Control

**Row-Level Security (PostgreSQL)**:

```sql
-- Enable RLS
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see buildings in their organization
CREATE POLICY building_access ON buildings
    FOR SELECT
    USING (
        id IN (
            SELECT building_id 
            FROM building_access 
            WHERE user_id = current_user_id()
        )
    );
```

**InfluxDB Authorization**:

```yaml
# Organization-based access control
authorizations:
  - user: org_5Hi6Jk7Lm8No
    permissions:
      - action: read
        resource: buckets/nimbus_biome
      - action: write
        resource: buckets/nimbus_biome
```

---

## Conclusion

NIMBUS BIOME's **multi-modal database architecture** delivers **sub-100ms query latency** at massive scale (**100M+ data points/hour**), supporting **2,500 buildings** with **125 million active sensors**. By combining specialized databases (time-series, spatial, relational, cache) and implementing intelligent **tiered storage**, we achieve both **performance** and **cost-efficiency** while maintaining **99.99% durability** through comprehensive backup and disaster recovery procedures.

---

**Document Classification**: Technical Architecture - Database  
**Last Updated**: November 28, 2025  
**Next Review**: February 28, 2026  
**Owner**: Database Engineering Team  

© 2025 NIMBUS BIOME Inc. All rights reserved.
