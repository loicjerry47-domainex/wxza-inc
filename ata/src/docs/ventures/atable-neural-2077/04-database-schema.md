# ATABLE NEURAL 2077 - Database Schema
## Multi-Database Architecture for Security Intelligence

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Classification:** Technical Architecture  
**Reading Time:** 55 minutes

---

## Executive Summary

ATABLE NEURAL 2077 uses a **polyglot persistence architecture** with 5 specialized databases optimized for different data types and access patterns. The system handles **50 billion+ security events daily** with **<100ms query latency** across **850 enterprise customers**.

### Database Stack

| Database | Purpose | Data Volume | Read/Write Pattern |
|----------|---------|-------------|-------------------|
| **PostgreSQL 16** | Relational data (users, incidents, configs) | 2TB | 70% read, 30% write |
| **ClickHouse 24.1** | Time-series security events | 500TB+ | 95% write, 5% read |
| **Redis 7.2** | Caching, sessions, real-time state | 50GB | 90% read, 10% write |
| **Neo4j 5.14** | Attack path graph analysis | 5TB | 60% read, 40% write |
| **Elasticsearch 8.11** | Full-text search, threat hunting | 100TB | 40% write, 60% read |

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [PostgreSQL Schema](#2-postgresql-schema)
3. [ClickHouse Schema](#3-clickhouse-schema)
4. [Redis Data Structures](#4-redis-data-structures)
5. [Neo4j Graph Model](#5-neo4j-graph-model)
6. [Elasticsearch Indices](#6-elasticsearch-indices)
7. [Data Lifecycle Management](#7-data-lifecycle-management)
8. [Backup & Recovery](#8-backup--recovery)

---

## 1. Architecture Overview

### 1.1 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATA INGESTION (Kafka)                        │
│                   50B events/day → 600K events/sec               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ├──────────────────────────────────────┐
                           │                                       │
                ┌──────────▼────────┐                  ┌──────────▼────────┐
                │  ClickHouse       │                  │  Elasticsearch    │
                │  (Time-Series)    │                  │  (Full-Text)      │
                ├───────────────────┤                  ├───────────────────┤
                │ • Raw events      │                  │ • Threat intel    │
                │ • Metrics         │                  │ • Hunt queries    │
                │ • Logs            │                  │ • Enriched data   │
                │                   │                  │                   │
                │ 500TB+ data       │                  │ 100TB+ data       │
                │ 95% write         │                  │ 60% read          │
                └───────────────────┘                  └───────────────────┘
                           │
                           │
                ┌──────────▼────────────────────────────────────────────┐
                │          THREAT CORRELATION ENGINE                     │
                │          (AI/ML Processing)                            │
                └──────────┬────────────────────────────────────────────┘
                           │
                           ├────────────┬──────────────┬────────────────┐
                           │            │              │                │
                ┌──────────▼──────┐ ┌──▼────────┐ ┌───▼──────┐  ┌─────▼─────┐
                │  PostgreSQL     │ │  Neo4j    │ │  Redis   │  │  Object   │
                │  (Relational)   │ │  (Graph)  │ │  (Cache) │  │  Storage  │
                ├─────────────────┤ ├───────────┤ ├──────────┤  │  (S3)     │
                │ • Users         │ │ • Attack  │ │ • Session│  │           │
                │ • Incidents     │ │   paths   │ │ • Real-  │  │ • Memory  │
                │ • Playbooks     │ │ • Entity  │ │   time   │  │   dumps   │
                │ • Configs       │ │   graph   │ │   data   │  │ • PCAPs   │
                │                 │ │ • Lateral │ │          │  │ • Logs    │
                │ 2TB data        │ │   movement│ │ 50GB     │  │ 2PB+      │
                └─────────────────┘ └───────────┘ └──────────┘  └───────────┘
```

### 1.2 Database Performance Metrics

| Database | Avg Latency (p95) | Max Throughput | Replication | Sharding |
|----------|------------------|----------------|-------------|----------|
| **PostgreSQL** | 15ms | 50K TPS | 3 replicas | Horizontal (Citus) |
| **ClickHouse** | 45ms | 1M rows/sec | 2 replicas | Distributed tables |
| **Redis** | 1ms | 100K ops/sec | 3 replicas | Redis Cluster (12 shards) |
| **Neo4j** | 25ms | 10K queries/sec | 3 replicas | Fabric sharding |
| **Elasticsearch** | 50ms | 500K docs/sec | 2 replicas | 50 shards |

---

## 2. PostgreSQL Schema

### 2.1 Core Tables

#### Table: `users`
**Purpose:** User accounts, authentication, permissions

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- bcrypt
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(255),
    
    -- Profile
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL,  -- admin, analyst, viewer
    department VARCHAR(100),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',  -- active, suspended, deleted
    last_login_at TIMESTAMP WITH TIME ZONE,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(user_id),
    
    -- Indexes
    INDEX idx_users_email (email),
    INDEX idx_users_status (status),
    INDEX idx_users_role (role)
);
```

#### Table: `threats`
**Purpose:** Detected threats (metadata only, events in ClickHouse)

```sql
CREATE TABLE threats (
    threat_id VARCHAR(50) PRIMARY KEY,  -- THR-2025-11-30-12345
    
    -- Classification
    threat_name VARCHAR(255) NOT NULL,
    threat_type VARCHAR(50) NOT NULL,  -- malware, phishing, apt, etc.
    severity VARCHAR(20) NOT NULL,  -- critical, high, medium, low
    confidence DECIMAL(5,4) NOT NULL,  -- 0.0000 - 1.0000
    threat_score DECIMAL(5,2) NOT NULL,  -- 0.00 - 100.00
    
    -- Detection
    detection_method VARCHAR(100),  -- signature, anomaly, behavioral, etc.
    detection_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    first_seen TIMESTAMP WITH TIME ZONE,
    last_seen TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',  -- active, investigating, resolved, false_positive
    resolution VARCHAR(50),  -- auto_blocked, analyst_resolved, etc.
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES users(user_id),
    
    -- MITRE ATT&CK
    mitre_tactics JSONB,  -- ["TA0001", "TA0006"]
    mitre_techniques JSONB,  -- ["T1566.001", "T1003.001"]
    kill_chain_stage VARCHAR(50),
    
    -- Affected Assets
    affected_assets JSONB,  -- [{"type": "host", "id": "host-001"}, ...]
    affected_users JSONB,
    
    -- Indicators
    indicators JSONB,  -- {"ips": [...], "domains": [...], "hashes": [...]}
    
    -- Response
    automated_response BOOLEAN DEFAULT FALSE,
    playbook_executed VARCHAR(50),  -- playbook_id
    incident_id VARCHAR(50) REFERENCES incidents(incident_id),
    
    -- Analysis
    analyst_assigned UUID REFERENCES users(user_id),
    analyst_notes TEXT,
    tags TEXT[],
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_threats_severity (severity),
    INDEX idx_threats_status (status),
    INDEX idx_threats_type (threat_type),
    INDEX idx_threats_detection_timestamp (detection_timestamp DESC),
    INDEX idx_threats_mitre_techniques USING GIN (mitre_techniques),
    INDEX idx_threats_indicators USING GIN (indicators),
    INDEX idx_threats_tags USING GIN (tags)
);
```

#### Table: `incidents`
**Purpose:** Security incidents (one incident may contain multiple threats)

```sql
CREATE TABLE incidents (
    incident_id VARCHAR(50) PRIMARY KEY,  -- INC-2025-11-30-001
    
    -- Classification
    title VARCHAR(500) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'open',  -- open, investigating, contained, resolved, closed
    
    -- Assignment
    assigned_to UUID REFERENCES users(user_id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    team VARCHAR(100),  -- SOC, Incident Response, etc.
    
    -- SLA
    sla_deadline TIMESTAMP WITH TIME ZONE,
    sla_breached BOOLEAN DEFAULT FALSE,
    
    -- Impact
    affected_systems INTEGER DEFAULT 0,
    affected_users INTEGER DEFAULT 0,
    data_compromised BOOLEAN DEFAULT FALSE,
    estimated_impact_usd DECIMAL(12,2),
    
    -- Timeline
    detected_at TIMESTAMP WITH TIME ZONE,
    contained_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE,
    
    -- Metrics
    time_to_detect_seconds INTEGER,
    time_to_contain_seconds INTEGER,
    time_to_resolve_seconds INTEGER,
    
    -- Classification
    incident_type VARCHAR(100),  -- data_breach, malware_outbreak, etc.
    root_cause TEXT,
    lessons_learned TEXT,
    
    -- Related
    related_threats TEXT[],  -- Array of threat_ids
    related_incidents TEXT[],  -- Array of incident_ids
    
    -- Tags & Notes
    tags TEXT[],
    priority INTEGER DEFAULT 3,  -- 1 (highest) to 5 (lowest)
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(user_id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_incidents_status (status),
    INDEX idx_incidents_severity (severity),
    INDEX idx_incidents_assigned_to (assigned_to),
    INDEX idx_incidents_detected_at (detected_at DESC),
    INDEX idx_incidents_sla_deadline (sla_deadline) WHERE status IN ('open', 'investigating')
);
```

#### Table: `playbooks`
**Purpose:** Automated response playbooks

```sql
CREATE TABLE playbooks (
    playbook_id VARCHAR(50) PRIMARY KEY,  -- PB-RANSOMWARE-001
    
    -- Metadata
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),  -- ransomware, phishing, apt, etc.
    version VARCHAR(20) DEFAULT '1.0.0',
    
    -- Configuration
    trigger_conditions JSONB,  -- {"threat_type": "ransomware", "severity": "critical"}
    steps JSONB NOT NULL,  -- Array of playbook steps
    parameters JSONB,  -- Configurable parameters
    
    -- Execution
    auto_execute BOOLEAN DEFAULT FALSE,
    require_approval BOOLEAN DEFAULT TRUE,
    approval_roles TEXT[],  -- Roles that can approve execution
    
    -- Performance
    avg_execution_time_seconds INTEGER,
    success_rate DECIMAL(5,4),  -- 0.0000 - 1.0000
    execution_count INTEGER DEFAULT 0,
    last_executed_at TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',  -- active, draft, deprecated
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(user_id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(user_id),
    
    -- Indexes
    INDEX idx_playbooks_category (category),
    INDEX idx_playbooks_status (status),
    INDEX idx_playbooks_auto_execute (auto_execute) WHERE auto_execute = TRUE
);
```

#### Table: `playbook_executions`
**Purpose:** Track playbook execution history

```sql
CREATE TABLE playbook_executions (
    execution_id VARCHAR(50) PRIMARY KEY,  -- EXEC-2025-11-30-001
    
    -- Reference
    playbook_id VARCHAR(50) REFERENCES playbooks(playbook_id),
    threat_id VARCHAR(50) REFERENCES threats(threat_id),
    incident_id VARCHAR(50) REFERENCES incidents(incident_id),
    
    -- Execution
    status VARCHAR(20) NOT NULL,  -- queued, running, completed, failed, cancelled
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    
    -- Results
    steps_completed INTEGER DEFAULT 0,
    steps_failed INTEGER DEFAULT 0,
    steps_total INTEGER,
    step_results JSONB,  -- Detailed step-by-step results
    error_message TEXT,
    
    -- Approval
    requires_approval BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES users(user_id),
    approved_at TIMESTAMP WITH TIME ZONE,
    
    -- Context
    triggered_by VARCHAR(50),  -- auto | manual | scheduled
    executed_by UUID REFERENCES users(user_id),
    parameters JSONB,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_playbook_executions_playbook_id (playbook_id),
    INDEX idx_playbook_executions_threat_id (threat_id),
    INDEX idx_playbook_executions_status (status),
    INDEX idx_playbook_executions_started_at (started_at DESC)
);
```

#### Table: `threat_intelligence`
**Purpose:** Threat intelligence IOCs (Indicators of Compromise)

```sql
CREATE TABLE threat_intelligence (
    ioc_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Indicator
    ioc_type VARCHAR(50) NOT NULL,  -- ip, domain, url, hash, email, etc.
    ioc_value VARCHAR(500) NOT NULL,
    
    -- Classification
    threat_type VARCHAR(100),  -- malware, c2, phishing, exploit, etc.
    threat_actor VARCHAR(200),  -- APT28, Lazarus Group, etc.
    malware_family VARCHAR(200),  -- Emotet, TrickBot, etc.
    
    -- Reputation
    reputation_score DECIMAL(5,4),  -- 0.0000 (malicious) to 1.0000 (benign)
    confidence DECIMAL(5,4),  -- 0.0000 to 1.0000
    severity VARCHAR(20),
    
    -- Timeline
    first_seen TIMESTAMP WITH TIME ZONE,
    last_seen TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Context
    tags TEXT[],
    campaigns TEXT[],  -- Associated campaigns
    mitre_techniques JSONB,
    
    -- Sources
    source_feeds TEXT[],  -- AlienVault, Recorded Future, etc.
    source_urls TEXT[],
    
    -- Enrichment
    geolocation JSONB,  -- {"country": "RU", "city": "Moscow"}
    asn INTEGER,
    asn_name VARCHAR(255),
    whois_data JSONB,
    ssl_cert_data JSONB,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active',  -- active, expired, false_positive
    false_positive BOOLEAN DEFAULT FALSE,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_ti_ioc_type_value (ioc_type, ioc_value),
    INDEX idx_ti_threat_actor (threat_actor),
    INDEX idx_ti_reputation_score (reputation_score),
    INDEX idx_ti_status (status),
    INDEX idx_ti_expires_at (expires_at),
    INDEX idx_ti_tags USING GIN (tags),
    INDEX idx_ti_mitre_techniques USING GIN (mitre_techniques),
    
    -- Unique constraint
    UNIQUE (ioc_type, ioc_value)
);
```

### 2.2 Database Statistics

| Table | Estimated Rows | Avg Row Size | Total Size | Growth Rate |
|-------|---------------|--------------|------------|-------------|
| `users` | 15,000 | 500 bytes | 7.5 MB | +100/month |
| `threats` | 50M | 2 KB | 100 GB | +1.5M/day |
| `incidents` | 2M | 3 KB | 6 GB | +50K/day |
| `playbooks` | 10,000 | 5 KB | 50 MB | +10/month |
| `playbook_executions` | 100M | 1 KB | 100 GB | +3M/day |
| `threat_intelligence` | 500M | 1.5 KB | 750 GB | +500K/day |

---

## 3. ClickHouse Schema

### 3.1 Time-Series Event Tables

#### Table: `security_events`
**Purpose:** Raw security events (50 billion+ events/day)

```sql
CREATE TABLE security_events (
    -- Timestamp (partition key)
    timestamp DateTime64(3),  -- Millisecond precision
    date Date DEFAULT toDate(timestamp),  -- For partitioning
    
    -- Event ID
    event_id String,
    
    -- Source
    source_type LowCardinality(String),  -- SIEM, EDR, Firewall, IDS, etc.
    source_name String,
    customer_id UUID,
    
    -- Event Classification
    event_category LowCardinality(String),  -- network, endpoint, identity, etc.
    event_type LowCardinality(String),  -- login, file_access, connection, etc.
    severity LowCardinality(String),  -- critical, high, medium, low, info
    
    -- Network Events
    src_ip IPv6,  -- Supports both IPv4 and IPv6
    dst_ip IPv6,
    src_port UInt16,
    dst_port UInt16,
    protocol LowCardinality(String),
    bytes_in UInt64,
    bytes_out UInt64,
    packets_in UInt32,
    packets_out UInt32,
    duration_seconds Float32,
    
    -- Endpoint Events
    hostname String,
    username String,
    process_name String,
    process_id UInt32,
    process_command_line String,
    parent_process String,
    file_path String,
    file_hash String,
    registry_key String,
    
    -- Identity Events
    auth_method LowCardinality(String),
    auth_result LowCardinality(String),  -- success, failure
    session_id String,
    user_agent String,
    
    -- Detection
    is_threat Boolean,
    threat_id Nullable(String),  -- References threats table
    detection_method LowCardinality(String),
    anomaly_score Float32,
    
    -- Enrichment
    threat_intel JSONB,  -- IP reputation, domain age, etc.
    geolocation JSONB,
    mitre_technique Nullable(String),
    
    -- Raw Data
    raw_event String,  -- Original event (compressed)
    
    -- Indexes
    INDEX idx_threat_id threat_id TYPE bloom_filter GRANULARITY 1,
    INDEX idx_src_ip src_ip TYPE bloom_filter GRANULARITY 1,
    INDEX idx_dst_ip dst_ip TYPE bloom_filter GRANULARITY 1,
    INDEX idx_hostname hostname TYPE bloom_filter GRANULARITY 1,
    INDEX idx_username username TYPE bloom_filter GRANULARITY 1,
    INDEX idx_file_hash file_hash TYPE bloom_filter GRANULARITY 1
    
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)  -- Monthly partitions
ORDER BY (customer_id, timestamp)
TTL date + INTERVAL 90 DAY;  -- Auto-delete after 90 days
```

**Partitioning Strategy:**
- **Monthly partitions:** `202511`, `202512`, `202601`, etc.
- **Automatic cleanup:** Events older than 90 days deleted
- **Compression:** Zstandard (ZSTD) - 10:1 compression ratio
- **Storage:** 500TB compressed (5PB uncompressed)

**Query Performance:**
```sql
-- Example: Query last 24 hours of critical threats
SELECT 
    toHour(timestamp) AS hour,
    count() AS event_count,
    countIf(is_threat = true) AS threat_count
FROM security_events
WHERE 
    date >= today() - 1
    AND severity = 'critical'
GROUP BY hour
ORDER BY hour;

-- Performance: <100ms for 50B+ events
```

---

## 4. Redis Data Structures

### 4.1 Session Management

```redis
# User session (TTL: 24 hours)
HSET session:{session_id}
  user_id "{uuid}"
  username "john.doe@company.com"
  role "analyst"
  login_at "2025-11-30T10:00:00Z"
  last_activity "2025-11-30T14:30:00Z"
  ip_address "192.168.1.100"

EXPIRE session:{session_id} 86400  # 24 hours
```

### 4.2 Real-Time Threat Counters

```redis
# Threat statistics (updated every second)
HINCRBY stats:threats:realtime total_threats_24h 1
HINCRBY stats:threats:realtime critical_threats_24h 1
HINCRBY stats:threats:realtime blocked_threats_24h 1

# Threat type counters
ZINCRBY threats:by_type:24h 1 "ransomware"
ZINCRBY threats:by_type:24h 1 "phishing"

# Top attacked assets (leaderboard)
ZINCRBY assets:attacked:24h 1 "host-dc-01.company.com"
```

### 4.3 Rate Limiting

```redis
# API rate limiting (10,000 requests/hour)
INCR ratelimit:api:{api_key}:{hour}
EXPIRE ratelimit:api:{api_key}:{hour} 3600

# Check rate limit
GET ratelimit:api:{api_key}:{hour}
# If > 10000, return 429 Too Many Requests
```

---

## 5. Neo4j Graph Model

### 5.1 Graph Schema

**Nodes:**
- `(:User)` - User accounts
- `(:Host)` - Servers, workstations, devices
- `(:IpAddress)` - IP addresses
- `(:Domain)` - Domain names
- `(:File)` - Files, executables
- `(:Process)` - Running processes
- `(:Threat)` - Detected threats

**Relationships:**
- `(User)-[:LOGGED_IN_TO]->(Host)`
- `(Host)-[:CONNECTED_TO]->(IpAddress)`
- `(Process)-[:EXECUTED_ON]->(Host)`
- `(Process)-[:ACCESSED_FILE]->(File)`
- `(Host)-[:COMMUNICATED_WITH]->(Domain)`
- `(Threat)-[:AFFECTED]->(Host)`
- `(Threat)-[:AFFECTED]->(User)`

### 5.2 Lateral Movement Detection

```cypher
// Detect lateral movement (RDP hop pattern)
MATCH path = (start:Host)-[:CONNECTED_TO*1..5]->(end:Host)
WHERE 
  start.hostname = 'workstation-001'
  AND ALL(r IN relationships(path) WHERE r.protocol = 'RDP')
  AND ALL(r IN relationships(path) WHERE r.timestamp > datetime() - duration({hours: 1}))
  AND length(path) >= 3  // At least 3 hops
RETURN path, length(path) AS hop_count
ORDER BY hop_count DESC;
```

**Example Attack Path Visualization:**
```
workstation-001 --RDP--> server-app-01 --RDP--> server-db-01 --RDP--> server-dc-01
                                                                         (Domain Controller)
                                                                         🚨 CRITICAL ASSET
```

---

## 6. Elasticsearch Indices

### 6.1 Threat Intelligence Index

```json
PUT /threat_intelligence
{
  "mappings": {
    "properties": {
      "ioc_value": {"type": "keyword"},
      "ioc_type": {"type": "keyword"},
      "threat_actor": {"type": "text", "fields": {"keyword": {"type": "keyword"}}},
      "reputation_score": {"type": "float"},
      "first_seen": {"type": "date"},
      "last_seen": {"type": "date"},
      "tags": {"type": "keyword"},
      "description": {"type": "text"},
      "enrichment": {"type": "object", "enabled": false}
    }
  }
}
```

### 6.2 Full-Text Threat Hunting

```json
GET /security_events/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {"process_command_line": "powershell"}},
        {"match": {"process_command_line": "Invoke-WebRequest"}}
      ],
      "filter": [
        {"range": {"timestamp": {"gte": "now-24h"}}}
      ]
    }
  }
}
```

---

## 7. Data Lifecycle Management

| Data Type | Retention | Hot Storage | Warm Storage | Cold Storage | Archive |
|-----------|-----------|-------------|--------------|--------------|---------|
| **Security Events** | 90 days | 7 days (SSD) | 30 days (HDD) | 90 days (S3) | 7 years (Glacier) |
| **Threats** | 5 years | 1 year | 2 years | 5 years | Indefinite |
| **Incidents** | Indefinite | 2 years | 5 years | Indefinite | - |
| **Threat Intel** | 2 years | 6 months | 2 years | - | - |

---

## 8. Backup & Recovery

**PostgreSQL:**
- **Full backup:** Daily (3 AM UTC)
- **Incremental backup:** Hourly
- **Point-in-time recovery:** Yes (WAL archiving)
- **RPO:** 1 hour
- **RTO:** 4 hours

**ClickHouse:**
- **Snapshot backup:** Daily
- **Replication:** 2× real-time replicas
- **RPO:** 24 hours
- **RTO:** 2 hours

---

## Conclusion

ATABLE NEURAL 2077's polyglot database architecture provides optimal performance for all security data types, handling **50B+ events/day** with **<100ms query latency**.

**Next:** [Cloud Infrastructure](./05-cloud-infrastructure.md)

---

**© 2025 ATABLE NEURAL AI Inc. All rights reserved.**
