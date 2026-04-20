# ATABLE NEURAL 2077 - API Documentation
## RESTful & GraphQL API Reference

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**API Version:** v3.2  
**Reading Time:** 25 minutes

---

## Executive Summary

ATABLE NEURAL 2077 provides comprehensive **RESTful** and **GraphQL** APIs with **200+ endpoints** for threat detection, incident response, security orchestration, and analytics. All APIs support **OAuth 2.0 authentication**, **rate limiting**, and **webhook integration** for real-time event streaming.

### API Overview

| Feature | Specification |
|---------|--------------|
| **REST API Endpoints** | 200+ |
| **GraphQL Schema** | 150+ types |
| **Authentication** | OAuth 2.0, API Keys, mTLS |
| **Rate Limiting** | 10,000 requests/hour (standard), custom limits available |
| **API Uptime SLA** | 99.99% |
| **Response Time (p95)** | <100ms |
| **Webhook Support** | Real-time event streaming |
| **SDKs Available** | Python, JavaScript, Go, Java, C# |

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [RESTful API Endpoints](#2-restful-api-endpoints)
3. [GraphQL API](#3-graphql-api)
4. [Webhooks](#4-webhooks)
5. [SIEM Integrations](#5-siem-integrations)
6. [Rate Limiting](#6-rate-limiting)
7. [Error Handling](#7-error-handling)
8. [SDKs & Code Examples](#8-sdks--code-examples)

---

## 1. Authentication

### 1.1 OAuth 2.0 (Recommended)

```bash
# Step 1: Get access token
curl -X POST https://api.atableneuralai.com/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "client_credentials",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "scope": "threats:read incidents:write playbooks:execute"
  }'

# Response:
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "threats:read incidents:write playbooks:execute"
}

# Step 2: Use access token
curl -X GET https://api.atableneuralai.com/v3/threats \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 1.2 API Key Authentication

```bash
curl -X GET https://api.atableneuralai.com/v3/threats \
  -H "X-API-Key: your_api_key_here"
```

### 1.3 Mutual TLS (mTLS) - For High-Security Environments

```bash
curl -X GET https://api.atableneuralai.com/v3/threats \
  --cert client-cert.pem \
  --key client-key.pem \
  --cacert ca-cert.pem
```

---

## 2. RESTful API Endpoints

### 2.1 Threat Detection API

#### GET /v3/threats
**List all detected threats**

```bash
GET https://api.atableneuralai.com/v3/threats?status=active&severity=high&limit=50

Query Parameters:
  - status: active | resolved | investigating (default: all)
  - severity: critical | high | medium | low
  - time_range: last_1h | last_24h | last_7d | custom
  - limit: number of results (default: 100, max: 1000)
  - offset: pagination offset

Response (200 OK):
{
  "threats": [
    {
      "threat_id": "THR-2025-11-30-12345",
      "timestamp": "2025-11-30T14:32:18Z",
      "severity": "critical",
      "status": "active",
      "threat_score": 99.2,
      "confidence": 0.98,
      "threat_name": "APT28 Credential Harvesting",
      "affected_assets": [
        "host-dc-01.company.com",
        "user-john.doe@company.com"
      ],
      "mitre_attack": {
        "tactics": ["TA0006 - Credential Access"],
        "techniques": ["T1003.001 - LSASS Memory Dump"]
      },
      "indicators": {
        "ip_addresses": ["203.0.113.42"],
        "domains": ["evil-c2.com"],
        "file_hashes": ["a1b2c3d4..."]
      },
      "automated_response": "playbook_executed",
      "analyst_assigned": "soc-analyst-003"
    }
  ],
  "total_count": 847,
  "page": 1,
  "page_size": 50
}
```

#### GET /v3/threats/{threat_id}
**Get detailed threat information**

```bash
GET https://api.atableneuralai.com/v3/threats/THR-2025-11-30-12345

Response (200 OK):
{
  "threat_id": "THR-2025-11-30-12345",
  "timestamp": "2025-11-30T14:32:18Z",
  "severity": "critical",
  "threat_score": 99.2,
  "confidence": 0.98,
  
  "detection_details": {
    "detection_method": "behavioral_analysis",
    "detection_layers": [
      {
        "layer": "Layer 3 - Behavioral Analysis",
        "model": "LSTM",
        "confidence": 0.97,
        "evidence": "User accessed 2,847 files in 45 minutes (20× normal)"
      },
      {
        "layer": "Layer 4 - Threat Intelligence",
        "confidence": 0.95,
        "evidence": "IP 203.0.113.42 known APT28 C2 server"
      }
    ]
  },
  
  "timeline": [
    {
      "timestamp": "2025-11-30T14:30:00Z",
      "event": "Unusual login detected (VPN from Eastern Europe)"
    },
    {
      "timestamp": "2025-11-30T14:31:15Z",
      "event": "Mass file access detected (2,847 files)"
    },
    {
      "timestamp": "2025-11-30T14:32:18Z",
      "event": "Data exfiltration detected (8GB upload to Mega.nz)"
    },
    {
      "timestamp": "2025-11-30T14:32:45Z",
      "event": "Automated response triggered (account locked)"
    }
  ],
  
  "response_actions": [
    {
      "action": "lock_user_account",
      "status": "completed",
      "timestamp": "2025-11-30T14:32:45Z"
    },
    {
      "action": "isolate_endpoint",
      "status": "completed",
      "timestamp": "2025-11-30T14:32:50Z"
    },
    {
      "action": "block_external_ip",
      "target": "203.0.113.42",
      "status": "completed",
      "timestamp": "2025-11-30T14:33:00Z"
    }
  ],
  
  "forensic_data": {
    "memory_dump": "https://evidence.atableneuralai.com/THR-2025-11-30-12345/memory.dmp",
    "network_pcap": "https://evidence.atableneuralai.com/THR-2025-11-30-12345/traffic.pcap",
    "file_samples": ["https://evidence.atableneuralai.com/THR-2025-11-30-12345/malware.exe"]
  }
}
```

#### POST /v3/threats/{threat_id}/respond
**Execute response action on a threat**

```bash
POST https://api.atableneuralai.com/v3/threats/THR-2025-11-30-12345/respond

Request Body:
{
  "action": "execute_playbook",
  "playbook_id": "PB-RANSOMWARE-001",
  "parameters": {
    "isolate_host": true,
    "block_c2": true,
    "notify_team": "incident-response"
  }
}

Response (202 Accepted):
{
  "response_id": "RESP-2025-11-30-001",
  "status": "executing",
  "estimated_completion": "2025-11-30T14:35:00Z",
  "playbook_steps": [
    {
      "step": 1,
      "action": "isolate_host",
      "status": "in_progress"
    },
    {
      "step": 2,
      "action": "block_c2_server",
      "status": "queued"
    },
    {
      "step": 3,
      "action": "notify_incident_response_team",
      "status": "queued"
    }
  ]
}
```

---

### 2.2 Incident Management API

#### POST /v3/incidents
**Create security incident**

```bash
POST https://api.atableneuralai.com/v3/incidents

Request Body:
{
  "title": "Suspected APT28 Attack",
  "severity": "critical",
  "description": "Multiple indicators of APT28 activity detected",
  "affected_assets": [
    "host-dc-01.company.com",
    "user-john.doe@company.com"
  ],
  "related_threats": ["THR-2025-11-30-12345"],
  "assigned_to": "soc-analyst-003",
  "tags": ["apt28", "credential-theft", "exfiltration"]
}

Response (201 Created):
{
  "incident_id": "INC-2025-11-30-001",
  "status": "investigating",
  "created_at": "2025-11-30T14:35:00Z",
  "sla_deadline": "2025-11-30T18:35:00Z"
}
```

#### GET /v3/incidents
**List incidents**

```bash
GET https://api.atableneuralai.com/v3/incidents?status=open&severity=critical

Response (200 OK):
{
  "incidents": [
    {
      "incident_id": "INC-2025-11-30-001",
      "title": "Suspected APT28 Attack",
      "severity": "critical",
      "status": "investigating",
      "created_at": "2025-11-30T14:35:00Z",
      "assigned_to": "soc-analyst-003",
      "sla_remaining_hours": 3.5,
      "related_threats_count": 1
    }
  ],
  "total_count": 23
}
```

---

### 2.3 Playbook Automation API

#### GET /v3/playbooks
**List available playbooks**

```bash
GET https://api.atableneuralai.com/v3/playbooks?category=ransomware

Response (200 OK):
{
  "playbooks": [
    {
      "playbook_id": "PB-RANSOMWARE-001",
      "name": "Ransomware Automated Response",
      "description": "Isolate host, block C2, preserve evidence",
      "category": "ransomware",
      "steps_count": 8,
      "avg_execution_time_seconds": 120,
      "success_rate": 0.998
    },
    {
      "playbook_id": "PB-RANSOMWARE-002",
      "name": "Ransomware Recovery",
      "description": "Restore from backups, decrypt if possible",
      "category": "ransomware",
      "steps_count": 12,
      "avg_execution_time_seconds": 1800,
      "success_rate": 0.95
    }
  ]
}
```

#### POST /v3/playbooks/{playbook_id}/execute
**Execute playbook**

```bash
POST https://api.atableneuralai.com/v3/playbooks/PB-RANSOMWARE-001/execute

Request Body:
{
  "target": {
    "threat_id": "THR-2025-11-30-12345",
    "affected_host": "host-dc-01.company.com"
  },
  "parameters": {
    "isolation_mode": "full",
    "backup_before_action": true
  }
}

Response (202 Accepted):
{
  "execution_id": "EXEC-2025-11-30-001",
  "status": "running",
  "started_at": "2025-11-30T14:40:00Z",
  "steps": [...]
}
```

---

### 2.4 Threat Intelligence API

#### GET /v3/threat-intel/iocs
**Query indicators of compromise (IOCs)**

```bash
GET https://api.atableneuralai.com/v3/threat-intel/iocs?type=ip&value=203.0.113.42

Response (200 OK):
{
  "ioc": {
    "type": "ip",
    "value": "203.0.113.42",
    "reputation_score": 0.02,  # 0-1 (lower = more malicious)
    "threat_actor": "APT28 (Fancy Bear)",
    "first_seen": "2024-08-15T10:30:00Z",
    "last_seen": "2025-11-30T14:32:18Z",
    "tags": ["c2-server", "apt28", "credential-theft"],
    "related_campaigns": [
      "CloudHopper",
      "Operation Ghost"
    ],
    "threat_feeds": [
      "AlienVault OTX",
      "Recorded Future",
      "Internal Honeypot Network"
    ],
    "geolocation": {
      "country": "Russia",
      "city": "Moscow",
      "asn": "AS12345 - ShadyHosting LLC"
    }
  }
}
```

#### POST /v3/threat-intel/search
**Advanced threat intelligence search**

```bash
POST https://api.atableneuralai.com/v3/threat-intel/search

Request Body:
{
  "query": {
    "threat_actor": "APT28",
    "mitre_attack_technique": "T1003.001",
    "time_range": "last_30_days"
  }
}

Response (200 OK):
{
  "results": [
    {
      "campaign_name": "CloudHopper 2.0",
      "threat_actor": "APT28",
      "start_date": "2025-11-01",
      "targets": ["Technology", "Finance", "Government"],
      "ttps": ["T1003.001", "T1059.001", "T1041"],
      "iocs_count": 847
    }
  ]
}
```

---

### 2.5 Analytics API

#### GET /v3/analytics/dashboard
**Get security metrics for dashboard**

```bash
GET https://api.atableneuralai.com/v3/analytics/dashboard?time_range=last_24h

Response (200 OK):
{
  "time_range": {
    "start": "2025-11-29T14:00:00Z",
    "end": "2025-11-30T14:00:00Z"
  },
  "metrics": {
    "threats_detected": 1247,
    "threats_blocked": 1238,
    "false_positives": 9,
    "incidents_created": 23,
    "incidents_resolved": 18,
    "mean_time_to_detect_seconds": 28,
    "mean_time_to_respond_seconds": 115,
    "detection_accuracy": 0.997,
    "false_positive_rate": 0.0007,
    "top_threat_types": [
      {"type": "phishing", "count": 487},
      {"type": "malware", "count": 312},
      {"type": "data_exfiltration", "count": 156}
    ],
    "top_mitre_techniques": [
      {"technique": "T1566.001", "count": 487},
      {"technique": "T1059.001", "count": 312}
    ]
  }
}
```

---

## 3. GraphQL API

### 3.1 GraphQL Endpoint

```
POST https://api.atableneuralai.com/graphql
```

### 3.2 Example Queries

#### Query: Get Threat Details

```graphql
query GetThreat($threatId: ID!) {
  threat(id: $threatId) {
    id
    timestamp
    severity
    threatScore
    confidence
    threatName
    status
    
    detectionDetails {
      detectionMethod
      layers {
        layerName
        modelName
        confidence
        evidence
      }
    }
    
    affectedAssets {
      id
      hostname
      ipAddress
      assetType
      criticality
    }
    
    mitreAttack {
      tactics {
        id
        name
      }
      techniques {
        id
        name
        description
      }
    }
    
    indicators {
      ipAddresses {
        value
        reputation {
          score
          threatActor
        }
      }
      domains
      fileHashes
    }
    
    responseActions {
      action
      status
      timestamp
      result
    }
    
    timeline {
      timestamp
      event
      severity
    }
  }
}

# Variables:
{
  "threatId": "THR-2025-11-30-12345"
}
```

#### Mutation: Execute Playbook

```graphql
mutation ExecutePlaybook($input: ExecutePlaybookInput!) {
  executePlaybook(input: $input) {
    executionId
    status
    startedAt
    estimatedCompletion
    steps {
      stepNumber
      action
      status
      startedAt
      completedAt
    }
  }
}

# Variables:
{
  "input": {
    "playbookId": "PB-RANSOMWARE-001",
    "threatId": "THR-2025-11-30-12345",
    "parameters": {
      "isolateHost": true,
      "blockC2": true
    }
  }
}
```

---

## 4. Webhooks

### 4.1 Configure Webhook

```bash
POST https://api.atableneuralai.com/v3/webhooks

Request Body:
{
  "url": "https://your-server.com/atable-webhook",
  "events": [
    "threat.detected",
    "threat.critical",
    "incident.created",
    "playbook.completed"
  ],
  "secret": "your_webhook_secret_for_signature_verification"
}

Response (201 Created):
{
  "webhook_id": "WH-2025-11-30-001",
  "status": "active"
}
```

### 4.2 Webhook Payload Example

```json
POST https://your-server.com/atable-webhook

Headers:
  X-Atable-Signature: sha256=abc123def456...
  X-Atable-Event: threat.critical

Body:
{
  "event": "threat.critical",
  "timestamp": "2025-11-30T14:32:18Z",
  "data": {
    "threat_id": "THR-2025-11-30-12345",
    "severity": "critical",
    "threat_score": 99.2,
    "threat_name": "APT28 Credential Harvesting",
    "affected_assets": ["host-dc-01.company.com"],
    "automated_response": "executed"
  }
}
```

---

## 5. SIEM Integrations

### 5.1 Splunk Integration

```bash
# Send threat data to Splunk HEC (HTTP Event Collector)
POST https://api.atableneuralai.com/v3/integrations/splunk/configure

Request Body:
{
  "hec_url": "https://splunk.company.com:8088/services/collector",
  "hec_token": "your-splunk-hec-token",
  "source": "atable_neural",
  "sourcetype": "atable:threat",
  "index": "security"
}
```

### 5.2 Microsoft Sentinel Integration

```bash
POST https://api.atableneuralai.com/v3/integrations/sentinel/configure

Request Body:
{
  "workspace_id": "your-sentinel-workspace-id",
  "shared_key": "your-sentinel-shared-key",
  "log_type": "AtableNeuralThreats"
}
```

---

## 6. Rate Limiting

| Plan | Requests/Hour | Burst | Overage |
|------|--------------|-------|---------|
| **Standard** | 10,000 | 100/min | 429 error |
| **Professional** | 50,000 | 500/min | 429 error |
| **Enterprise** | Custom | Custom | Negotiated |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9847
X-RateLimit-Reset: 1701356400
```

---

## 7. Error Handling

### HTTP Status Codes

| Status | Description |
|--------|-------------|
| **200 OK** | Success |
| **201 Created** | Resource created |
| **202 Accepted** | Async operation started |
| **400 Bad Request** | Invalid input |
| **401 Unauthorized** | Invalid credentials |
| **403 Forbidden** | Insufficient permissions |
| **404 Not Found** | Resource not found |
| **429 Too Many Requests** | Rate limit exceeded |
| **500 Internal Server Error** | Server error |

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Threat ID is required",
    "details": {
      "field": "threat_id",
      "expected": "string (format: THR-YYYY-MM-DD-XXXXX)"
    },
    "request_id": "req_abc123def456"
  }
}
```

---

## 8. SDKs & Code Examples

### 8.1 Python SDK

```python
from atable_neural import AtableClient

client = AtableClient(api_key="your_api_key")

# Get threats
threats = client.threats.list(severity="critical", status="active")
for threat in threats:
    print(f"Threat: {threat.threat_name} (Score: {threat.threat_score})")

# Get threat details
threat = client.threats.get("THR-2025-11-30-12345")
print(f"Detection method: {threat.detection_details.detection_method}")

# Execute playbook
response = client.playbooks.execute(
    playbook_id="PB-RANSOMWARE-001",
    threat_id="THR-2025-11-30-12345",
    parameters={"isolate_host": True}
)
print(f"Execution ID: {response.execution_id}")
```

### 8.2 JavaScript SDK

```javascript
const { AtableClient } = require('@atable/neural-sdk');

const client = new AtableClient({ apiKey: 'your_api_key' });

// Get threats
const threats = await client.threats.list({
  severity: 'critical',
  status: 'active'
});

// Execute playbook
const response = await client.playbooks.execute({
  playbookId: 'PB-RANSOMWARE-001',
  threatId: 'THR-2025-11-30-12345',
  parameters: { isolateHost: true }
});
```

---

## Conclusion

ATABLE NEURAL 2077's comprehensive API ecosystem enables seamless integration with existing security tools, automated response orchestration, and custom security workflow development.

**Next:** [Database Schema](./04-database-schema.md)

---

**© 2025 ATABLE NEURAL AI Inc. All rights reserved.**
