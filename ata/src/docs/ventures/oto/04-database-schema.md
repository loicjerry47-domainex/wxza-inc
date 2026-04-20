# OTO - Database Schema
## Polyglot Persistence Architecture

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 55 minutes

---

## Executive Summary

OTO uses **polyglot persistence** with 5 specialized databases: **Neo4j** (relationship graph), **InfluxDB** (time-series interactions), **PostgreSQL** (user accounts/billing), **Redis** (cache/sessions), and **Elasticsearch** (contact search). Total storage: **17.8TB** across **50M+ nodes**, **200M+ relationships**, and **2.5M users**.

---

## Table of Contents

1. [Database Architecture Overview](#1-database-architecture-overview)
2. [Neo4j Graph Database](#2-neo4j-graph-database)
3. [InfluxDB Time-Series Database](#3-influxdb-time-series-database)
4. [PostgreSQL Relational Database](#4-postgresql-relational-database)
5. [Redis Cache Layer](#5-redis-cache-layer)
6. [Elasticsearch Search Engine](#6-elasticsearch-search-engine)

---

## 1. Database Architecture Overview

### 1.1 Polyglot Persistence Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                            │
└──────────────┬──────────────────────────────────────────────────┘
               │
       ┌───────┴───────┬───────────┬───────────┬─────────┐
       │               │           │           │         │
       ▼               ▼           ▼           ▼         ▼
┌──────────┐  ┌────────────┐  ┌────────┐  ┌────────┐  ┌──────────┐
│  Neo4j   │  │ InfluxDB   │  │Postgres│  │ Redis  │  │Elastic   │
│ (Graph)  │  │(TimeSeries)│  │(RDBMS) │  │(Cache) │  │ (Search) │
└──────────┘  └────────────┘  └────────┘  └────────┘  └──────────┘
     │              │             │           │           │
     ▼              ▼             ▼           ▼           ▼
Relationships  Interactions   Users/       Sessions    Full-text
  Contacts      History      Billing      Real-time    Search
  Interests     Metrics      Payments     Counters     Contacts
  Gifts         Analytics    Audit        Rate Limits  Notes
```

### 1.2 Database Selection Rationale

| Database | Use Case | Why This DB? |
|----------|----------|--------------|
| **Neo4j** | Relationship graph | Native graph traversal, GNN support |
| **InfluxDB** | Interaction time-series | Optimized for time-series, 200M points/hour |
| **PostgreSQL** | User accounts, billing | ACID compliance, transactions, relational integrity |
| **Redis** | Cache, sessions, real-time | Sub-millisecond latency, pub/sub |
| **Elasticsearch** | Contact search | Full-text search, fuzzy matching |

### 1.3 Storage Statistics

| Database | Storage | Records | Growth Rate |
|----------|---------|---------|-------------|
| **Neo4j** | 8.5 TB | 50M nodes, 200M edges | +2.5M nodes/month |
| **InfluxDB** | 4.2 TB | 15B data points | +200M points/hour |
| **PostgreSQL** | 850 GB | 2.5M users | +50K users/month |
| **Redis** | 320 GB | 50M keys | Volatile (TTL) |
| **Elasticsearch** | 4.1 TB | 45M contact documents | +200K docs/month |
| **Total** | **17.8 TB** | - | - |

---

## 2. Neo4j Graph Database

### 2.1 Node Types

#### User Node
```cypher
CREATE CONSTRAINT user_id IF NOT EXISTS
FOR (u:User) REQUIRE u.id IS UNIQUE;

CREATE INDEX user_email IF NOT EXISTS
FOR (u:User) ON (u.email);

(:User {
  id: String,                    // "usr_7xk2p9mz"
  email: String,                 // "user@example.com"
  name: String,                  // "Jane Doe"
  password_hash: String,         // bcrypt hash
  premium: Boolean,              // true/false
  created_at: DateTime,          // ISO 8601
  updated_at: DateTime,
  last_login: DateTime,
  timezone: String               // "America/New_York"
})
```

#### Contact Node
```cypher
CREATE CONSTRAINT contact_id IF NOT EXISTS
FOR (c:Contact) REQUIRE c.id IS UNIQUE;

CREATE INDEX contact_user_id IF NOT EXISTS
FOR (c:Contact) ON (c.user_id);

CREATE INDEX contact_health_score IF NOT EXISTS
FOR (c:Contact) ON (c.health_score);

(:Contact {
  id: String,                    // "cnt_k9j2m4px"
  user_id: String,               // Foreign key to User
  name: String,                  // "John Smith"
  email: String,                 // "john@example.com"
  phone: String,                 // "+1-555-0123"
  birthday: Date,                // "1985-07-20"
  company: String,               // "Acme Corp"
  title: String,                 // "VP Engineering"
  notes: String,                 // Encrypted user notes
  health_score: Float,           // 0-100
  last_interaction: DateTime,    // Last contact time
  relationship_type: String,     // "friend", "family", "colleague", "client"
  relationship_strength: Float,  // 0-1
  created_at: DateTime,
  updated_at: DateTime
})
```

#### Interest Node
```cypher
CREATE CONSTRAINT interest_id IF NOT EXISTS
FOR (i:Interest) REQUIRE i.id IS UNIQUE;

CREATE INDEX interest_category IF NOT EXISTS
FOR (i:Interest) ON (i.category);

(:Interest {
  id: String,                    // "int_tennis"
  category: String,              // "sports", "music", "food", etc.
  name: String,                  // "Tennis", "Jazz Music"
  description: String,           // Optional description
  created_at: DateTime
})
```

#### Gift Node
```cypher
CREATE CONSTRAINT gift_id IF NOT EXISTS
FOR (g:Gift) REQUIRE g.id IS UNIQUE;

CREATE INDEX gift_category IF NOT EXISTS
FOR (g:Gift) ON (g.category);

CREATE INDEX gift_price IF NOT EXISTS
FOR (g:Gift) ON (g.price);

(:Gift {
  id: String,                    // "gift_j8k2m9x"
  name: String,                  // "Tennis Racket Pro"
  category: String,              // "Sports Equipment"
  description: String,
  price: Float,                  // 89.99
  url: String,                   // Product URL
  image_url: String,             // Product image
  vendor: String,                // "Amazon", "Etsy"
  created_at: DateTime
})
```

#### Occasion Node
```cypher
CREATE CONSTRAINT occasion_id IF NOT EXISTS
FOR (o:Occasion) REQUIRE o.id IS UNIQUE;

(:Occasion {
  id: String,                    // "occ_k9j2m4px"
  type: String,                  // "birthday", "anniversary", "holiday"
  date: Date,                    // "2026-05-15"
  recurring: Boolean,            // true (annual) or false
  description: String,
  created_at: DateTime
})
```

### 2.2 Relationship Types

#### KNOWS Relationship
```cypher
CREATE INDEX knows_since IF NOT EXISTS
FOR ()-[r:KNOWS]-() ON (r.since);

(:User)-[:KNOWS {
  since: DateTime,               // When relationship started
  relationship_type: String,     // "family", "friend", "colleague", "client"
  strength: Float,               // 0-1 (relationship strength)
  frequency: String,             // "daily", "weekly", "monthly", "yearly"
  notes: String,                 // Relationship context
  created_at: DateTime,
  updated_at: DateTime
}]->(:Contact)
```

#### INTERACTED_WITH Relationship
```cypher
CREATE INDEX interaction_timestamp IF NOT EXISTS
FOR ()-[r:INTERACTED_WITH]-() ON (r.timestamp);

(:User)-[:INTERACTED_WITH {
  timestamp: DateTime,           // When interaction occurred
  channel: String,               // "email", "sms", "call", "social", "in_person"
  direction: String,             // "sent", "received"
  sentiment: Float,              // -1 to 1
  response_time_ms: Integer,     // Response time in milliseconds
  created_at: DateTime
}]->(:Contact)
```

#### INTERESTED_IN Relationship
```cypher
(:Contact)-[:INTERESTED_IN {
  confidence: Float,             // 0-1 (confidence score)
  source: String,                // "explicit", "inferred", "social"
  discovered_at: DateTime,
  notes: String
}]->(:Interest)
```

#### GAVE_GIFT / RECEIVED_GIFT Relationships
```cypher
(:User)-[:GAVE_GIFT {
  date: DateTime,
  occasion: String,              // "birthday", "christmas", etc.
  value: Float,
  reaction: String,              // "loved", "liked", "neutral", "unknown"
  notes: String
}]->(:Gift)

(:Contact)-[:RECEIVED_GIFT {
  date: DateTime,
  from_user: String,             // User ID who gave the gift
  occasion: String
}]->(:Gift)
```

#### HAS_OCCASION Relationship
```cypher
(:Contact)-[:HAS_OCCASION {
  reminder_days_before: Integer, // How many days before to remind
  created_at: DateTime
}]->(:Occasion)
```

#### CONNECTED_TO Relationship
```cypher
// Social graph: contacts connected to each other
(:Contact)-[:CONNECTED_TO {
  platform: String,              // "facebook", "linkedin", "mutual_friend"
  strength: Float,               // 0-1
  discovered_at: DateTime
}]->(:Contact)
```

### 2.3 Example Queries

#### Query 1: Get User's Contact Network
```cypher
MATCH (u:User {id: $userId})-[r:KNOWS]->(c:Contact)
RETURN c.id, c.name, c.email, c.health_score, 
       r.relationship_type, r.strength
ORDER BY c.health_score DESC
LIMIT 50
```

#### Query 2: Find Neglected Relationships
```cypher
MATCH (u:User {id: $userId})-[:KNOWS]->(c:Contact)
WHERE c.health_score < 50 
  AND c.last_interaction < datetime() - duration('P30D')
RETURN c.id, c.name, c.health_score, 
       duration.between(c.last_interaction, datetime()).days as days_since_contact
ORDER BY c.health_score ASC
LIMIT 10
```

#### Query 3: Get Contact's Interests
```cypher
MATCH (c:Contact {id: $contactId})-[r:INTERESTED_IN]->(i:Interest)
RETURN i.id, i.category, i.name, r.confidence, r.source
ORDER BY r.confidence DESC
```

#### Query 4: Gift Recommendations by Interest
```cypher
MATCH (c:Contact {id: $contactId})-[:INTERESTED_IN]->(i:Interest)<-[:TAGGED_WITH]-(g:Gift)
WHERE g.price >= $budgetMin AND g.price <= $budgetMax
  AND NOT EXISTS((c)-[:RECEIVED_GIFT]->(g))
RETURN DISTINCT g.id, g.name, g.category, g.price, g.url, 
       collect(i.name) as matching_interests
ORDER BY g.price ASC
LIMIT 20
```

#### Query 5: Relationship Clusters (Mutual Connections)
```cypher
MATCH (u:User {id: $userId})-[:KNOWS]->(c1:Contact)-[:CONNECTED_TO]-(c2:Contact)<-[:KNOWS]-(u)
RETURN c1.name, c2.name, count(*) as mutual_connections
ORDER BY mutual_connections DESC
LIMIT 10
```

#### Query 6: Sentiment Trend Analysis
```cypher
MATCH (u:User {id: $userId})-[i:INTERACTED_WITH]->(c:Contact {id: $contactId})
WHERE i.timestamp > datetime() - duration('P90D')
RETURN date(i.timestamp) as date, avg(i.sentiment) as avg_sentiment
ORDER BY date ASC
```

### 2.4 Performance Optimization

#### Indexes
```cypher
// User indexes
CREATE INDEX user_email IF NOT EXISTS FOR (u:User) ON (u.email);
CREATE INDEX user_premium IF NOT EXISTS FOR (u:User) ON (u.premium);

// Contact indexes
CREATE INDEX contact_user_id IF NOT EXISTS FOR (c:Contact) ON (c.user_id);
CREATE INDEX contact_health_score IF NOT EXISTS FOR (c:Contact) ON (c.health_score);
CREATE INDEX contact_last_interaction IF NOT EXISTS FOR (c:Contact) ON (c.last_interaction);

// Interest indexes
CREATE INDEX interest_category IF NOT EXISTS FOR (i:Interest) ON (i.category);

// Gift indexes
CREATE INDEX gift_category IF NOT EXISTS FOR (g:Gift) ON (g.category);
CREATE INDEX gift_price IF NOT EXISTS FOR (g:Gift) ON (g.price);

// Relationship indexes
CREATE INDEX knows_since IF NOT EXISTS FOR ()-[r:KNOWS]-() ON (r.since);
CREATE INDEX interaction_timestamp IF NOT EXISTS FOR ()-[r:INTERACTED_WITH]-() ON (r.timestamp);
```

#### Query Performance
| Query Type | Avg Latency (p95) |
|-----------|-------------------|
| Single contact lookup | <5ms |
| Contact list (50 results) | <25ms |
| Health score calculation | <40ms |
| Gift recommendations | <120ms |
| Graph traversal (2 hops) | <80ms |
| Sentiment aggregation (90 days) | <150ms |

---

## 3. InfluxDB Time-Series Database

### 3.1 Schema Design

#### Interactions Measurement
```sql
-- Measurement: interactions
-- Tags (indexed)
user_id=usr_7xk2p9mz,
contact_id=cnt_k9j2m4px,
channel=email,
direction=sent

-- Fields (not indexed)
sentiment=0.85,
response_time_ms=3600000,
content_length=248

-- Timestamp
time=2025-11-30T10:30:00Z
```

#### Health Scores Measurement
```sql
-- Measurement: health_scores
-- Tags
user_id=usr_7xk2p9mz,
contact_id=cnt_k9j2m4px

-- Fields
score=87.5,
frequency_score=38.5,
recency_score=23.2,
sentiment_score=18.8,
reciprocity_score=14.5

-- Timestamp
time=2025-11-30T10:30:05Z
```

#### Gift Events Measurement
```sql
-- Measurement: gift_events
-- Tags
user_id=usr_7xk2p9mz,
contact_id=cnt_k9j2m4px,
gift_id=gift_j8k2m9x,
event_type=purchased

-- Fields
price=89.99,
occasion="birthday"

-- Timestamp
time=2025-11-30T15:00:00Z
```

### 3.2 Example Queries

#### Query 1: Interaction Frequency (Last 90 Days)
```sql
SELECT COUNT(*) 
FROM interactions 
WHERE user_id = 'usr_7xk2p9mz' 
  AND contact_id = 'cnt_k9j2m4px'
  AND time > now() - 90d
GROUP BY time(1d)
```

#### Query 2: Average Sentiment Trend
```sql
SELECT MEAN(sentiment) as avg_sentiment
FROM interactions
WHERE user_id = 'usr_7xk2p9mz'
  AND contact_id = 'cnt_k9j2m4px'
  AND time > now() - 90d
GROUP BY time(7d)
```

#### Query 3: Response Time Analysis
```sql
SELECT MEAN(response_time_ms) as avg_response,
       STDDEV(response_time_ms) as stddev_response,
       MEDIAN(response_time_ms) as median_response
FROM interactions
WHERE user_id = 'usr_7xk2p9mz'
  AND contact_id = 'cnt_k9j2m4px'
  AND direction = 'received'
  AND time > now() - 90d
```

#### Query 4: Health Score History
```sql
SELECT score
FROM health_scores
WHERE user_id = 'usr_7xk2p9mz'
  AND contact_id = 'cnt_k9j2m4px'
  AND time > now() - 180d
ORDER BY time ASC
```

### 3.3 Retention Policy

```sql
-- Hot data: 90 days (full resolution)
CREATE RETENTION POLICY "hot_data" 
  ON "oto_db" 
  DURATION 90d 
  REPLICATION 1 
  DEFAULT

-- Warm data: 1 year (1-hour downsampling)
CREATE RETENTION POLICY "warm_data" 
  ON "oto_db" 
  DURATION 365d 
  REPLICATION 1

-- Cold data: 2 years (1-day downsampling)
CREATE RETENTION POLICY "cold_data" 
  ON "oto_db" 
  DURATION 730d 
  REPLICATION 1
```

### 3.4 Continuous Queries (Downsampling)

```sql
-- Downsample to 1-hour intervals (for warm data)
CREATE CONTINUOUS QUERY "cq_interactions_1h"
ON "oto_db"
BEGIN
  SELECT MEAN(sentiment) as sentiment,
         COUNT(*) as count
  INTO "warm_data"."interactions_1h"
  FROM "hot_data"."interactions"
  GROUP BY time(1h), user_id, contact_id, channel
END

-- Downsample to 1-day intervals (for cold data)
CREATE CONTINUOUS QUERY "cq_interactions_1d"
ON "oto_db"
BEGIN
  SELECT MEAN(sentiment) as sentiment,
         SUM(count) as count
  INTO "cold_data"."interactions_1d"
  FROM "warm_data"."interactions_1h"
  GROUP BY time(1d), user_id, contact_id
END
```

### 3.5 Performance Metrics

| Metric | Value |
|--------|-------|
| **Write Rate** | 200M points/hour |
| **Query Latency (p95)** | <100ms |
| **Storage** | 4.2 TB (compressed) |
| **Compression Ratio** | 8:1 |
| **Retention** | 90d (hot), 365d (warm), 730d (cold) |

---

## 4. PostgreSQL Relational Database

### 4.1 Table Schemas

#### users Table
```sql
CREATE TABLE users (
  id VARCHAR(32) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  premium BOOLEAN DEFAULT FALSE,
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_premium ON users(premium);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### subscriptions Table
```sql
CREATE TABLE subscriptions (
  id VARCHAR(32) PRIMARY KEY,
  user_id VARCHAR(32) REFERENCES users(id),
  plan VARCHAR(50) NOT NULL, -- 'free', 'premium', 'enterprise'
  status VARCHAR(50) NOT NULL, -- 'active', 'cancelled', 'past_due'
  billing_period VARCHAR(20), -- 'monthly', 'yearly'
  price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  stripe_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

#### payments Table
```sql
CREATE TABLE payments (
  id VARCHAR(32) PRIMARY KEY,
  user_id VARCHAR(32) REFERENCES users(id),
  subscription_id VARCHAR(32) REFERENCES subscriptions(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) NOT NULL, -- 'succeeded', 'failed', 'pending', 'refunded'
  payment_method VARCHAR(50), -- 'card', 'paypal', 'bank_transfer'
  stripe_payment_id VARCHAR(255),
  stripe_invoice_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

#### api_keys Table
```sql
CREATE TABLE api_keys (
  id VARCHAR(32) PRIMARY KEY,
  user_id VARCHAR(32) REFERENCES users(id),
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  scopes TEXT[], -- Array of scopes: ['contacts:read', 'contacts:write']
  rate_limit INTEGER DEFAULT 1000,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  revoked_at TIMESTAMP
);

CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
```

#### audit_logs Table
```sql
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(32) REFERENCES users(id),
  action VARCHAR(100) NOT NULL, -- 'contact.created', 'gift.purchased', etc.
  resource_type VARCHAR(50), -- 'contact', 'gift', 'interaction'
  resource_id VARCHAR(32),
  metadata JSONB, -- Flexible JSON data
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_metadata ON audit_logs USING GIN(metadata);
```

### 4.2 Database Statistics

| Table | Rows | Storage |
|-------|------|---------|
| **users** | 2,500,000 | 350 GB |
| **subscriptions** | 500,000 | 80 GB |
| **payments** | 3,200,000 | 420 GB |
| **api_keys** | 15,000 | 2 GB |
| **audit_logs** | 450,000,000 | 250 GB |
| **Total** | - | **850 GB** |

### 4.3 Performance Metrics

| Metric | Value |
|--------|-------|
| **Query Latency (p95)** | <30ms |
| **Write Throughput** | 5,000 writes/sec |
| **Read Throughput** | 50,000 reads/sec |
| **Replication** | 3 replicas (1 primary, 2 read) |
| **Backup** | Hourly WAL, daily full |

---

## 5. Redis Cache Layer

### 5.1 Key Patterns

#### Session Storage
```redis
# Key: session:{session_id}
# Type: Hash
# TTL: 24 hours

HSET session:abc123 user_id "usr_7xk2p9mz"
HSET session:abc123 email "user@example.com"
HSET session:abc123 premium "true"
EXPIRE session:abc123 86400
```

#### Rate Limiting
```redis
# Key: rate_limit:{user_id}:{endpoint}
# Type: String (counter)
# TTL: 60 seconds

INCR rate_limit:usr_7xk2p9mz:/contacts
EXPIRE rate_limit:usr_7xk2p9mz:/contacts 60

# Check if rate limit exceeded
GET rate_limit:usr_7xk2p9mz:/contacts
# If > 1000, return 429 Too Many Requests
```

#### Cached Contact Data
```redis
# Key: contact:{contact_id}
# Type: Hash
# TTL: 1 hour

HSET contact:cnt_k9j2m4px name "John Smith"
HSET contact:cnt_k9j2m4px health_score "87.5"
HSET contact:cnt_k9j2m4px last_interaction "2025-11-30T10:30:00Z"
EXPIRE contact:cnt_k9j2m4px 3600
```

#### Real-Time Counters
```redis
# Key: counter:{metric}
# Type: String (counter)

INCR counter:total_interactions_today
INCR counter:total_gifts_purchased_today
INCR counter:active_users_now
```

#### Pub/Sub for Real-Time Events
```redis
# Publish health score update
PUBLISH health_score_updates '{"contact_id":"cnt_k9j2m4px","score":87.5}'

# Subscribe to updates
SUBSCRIBE health_score_updates
SUBSCRIBE churn_alerts
SUBSCRIBE gift_recommendations
```

### 5.2 Redis Statistics

| Metric | Value |
|--------|-------|
| **Total Keys** | 50,000,000 |
| **Memory Used** | 320 GB |
| **Hit Rate** | 98.7% |
| **Latency (p95)** | <2ms |
| **Cluster** | 6 nodes (3 primary, 3 replicas) |

---

## 6. Elasticsearch Search Engine

### 6.1 Index Mapping

```json
{
  "mappings": {
    "properties": {
      "id": {"type": "keyword"},
      "user_id": {"type": "keyword"},
      "name": {
        "type": "text",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      "email": {"type": "keyword"},
      "phone": {"type": "keyword"},
      "company": {
        "type": "text",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      "title": {"type": "text"},
      "notes": {"type": "text"},
      "tags": {"type": "keyword"},
      "health_score": {"type": "float"},
      "last_interaction": {"type": "date"},
      "created_at": {"type": "date"}
    }
  }
}
```

### 6.2 Example Queries

#### Fuzzy Name Search
```json
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "jhon smth",
        "fuzziness": "AUTO"
      }
    }
  }
}
```

#### Multi-Field Search
```json
{
  "query": {
    "multi_match": {
      "query": "engineer acme",
      "fields": ["name", "company", "title", "notes"]
    }
  }
}
```

#### Filter by Health Score
```json
{
  "query": {
    "bool": {
      "must": [
        {"match": {"user_id": "usr_7xk2p9mz"}}
      ],
      "filter": [
        {"range": {"health_score": {"lte": 50}}}
      ]
    }
  },
  "sort": [{"health_score": "asc"}]
}
```

### 6.3 Performance Metrics

| Metric | Value |
|--------|-------|
| **Total Documents** | 45,000,000 |
| **Index Size** | 4.1 TB |
| **Search Latency (p95)** | <80ms |
| **Indexing Rate** | 10,000 docs/sec |
| **Cluster** | 12 nodes (4 primary, 8 data) |

---

## Conclusion

OTO's polyglot persistence architecture leverages **5 specialized databases** for optimal performance: **Neo4j** for relationship graphs, **InfluxDB** for time-series interactions, **PostgreSQL** for ACID transactions, **Redis** for caching, and **Elasticsearch** for full-text search, managing **17.8TB** of data across **50M+ nodes** and **2.5M users**.

**Next:** [Cloud Infrastructure](./05-cloud-infrastructure.md)

---

**© 2025 OTO AI Inc. All rights reserved.**
