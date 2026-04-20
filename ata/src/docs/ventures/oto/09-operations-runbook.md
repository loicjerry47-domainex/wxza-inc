# OTO - Operations Runbook
## Incident Response, Monitoring & Maintenance

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 25 minutes

---

## Executive Summary

This runbook provides operational procedures for **monitoring**, **incident response**, **performance tuning**, and **maintenance** of OTO's production systems. On-call engineers use this guide for **P0-P3 incidents**, achieving **<15 minute response time** for critical issues and maintaining **99.95% uptime**.

---

## Table of Contents

1. [Monitoring & Alerting](#1-monitoring--alerting)
2. [Incident Response](#2-incident-response)
3. [Common Issues & Solutions](#3-common-issues--solutions)
4. [Performance Tuning](#4-performance-tuning)
5. [Backup & Recovery](#5-backup--recovery)
6. [On-Call Procedures](#6-on-call-procedures)

---

## 1. Monitoring & Alerting

### 1.1 Key Metrics Dashboard

**Grafana Dashboard:** `https://grafana.oto.ai/d/platform-overview`

**Critical Metrics:**
| Metric | Threshold | Alert Level |
|--------|-----------|-------------|
| **API Error Rate** | >1% (5xx errors) | P1 |
| **API Latency (p95)** | >500ms | P2 |
| **Database Connections** | >800/1000 | P2 |
| **CPU Usage** | >85% | P2 |
| **Memory Usage** | >90% | P1 |
| **Disk Usage** | >85% | P2 |
| **Pod Restart Count** | >3 in 5min | P1 |

**Business Metrics:**
| Metric | Threshold | Alert Level |
|--------|-----------|-------------|
| **Active Users** | <50K (drop >20%) | P2 |
| **Interactions/Hour** | <1M (drop >30%) | P2 |
| **Health Score Updates** | <100K/hour | P3 |
| **Gift Recommendations** | <10K/hour | P3 |

### 1.2 Prometheus Alerts

**High Error Rate:**
```yaml
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.01
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "High error rate detected: {{ $value }}"
    description: "Service {{ $labels.service }} has error rate >1%"
    runbook: "https://runbooks.oto.ai/high-error-rate"
```

**Database Connection Pool Exhaustion:**
```yaml
- alert: DatabaseConnectionsHigh
  expr: pg_stat_database_numbackends > 800
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "PostgreSQL connections high: {{ $value }}/1000"
    description: "Consider increasing connection pool or investigating connection leaks"
    runbook: "https://runbooks.oto.ai/database-connections"
```

**Pod Crash Looping:**
```yaml
- alert: PodCrashLooping
  expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Pod {{ $labels.pod }} is crash looping"
    description: "Pod has restarted {{ $value }} times in 15 minutes"
    runbook: "https://runbooks.oto.ai/pod-crash-loop"
```

### 1.3 Alert Routing (PagerDuty)

```yaml
# pagerduty-config.yaml
routing_rules:
  - match:
      severity: critical
    receiver: oncall-engineers
    repeat_interval: 15m
  
  - match:
      severity: warning
    receiver: slack-engineering
    repeat_interval: 1h
  
  - match:
      severity: info
    receiver: slack-monitoring
    repeat_interval: 24h

receivers:
  - name: oncall-engineers
    pagerduty_configs:
      - service_key: $PAGERDUTY_SERVICE_KEY
        description: "{{ .CommonAnnotations.summary }}"
  
  - name: slack-engineering
    slack_configs:
      - channel: '#engineering-alerts'
        text: "{{ .CommonAnnotations.description }}"
  
  - name: slack-monitoring
    slack_configs:
      - channel: '#monitoring'
        text: "{{ .CommonAnnotations.summary }}"
```

---

## 2. Incident Response

### 2.1 Incident Severity Levels

| Severity | Definition | Response Time | Examples |
|----------|-----------|---------------|----------|
| **P0 (Critical)** | Complete outage, data breach | 15 minutes | API down, database outage, security breach |
| **P1 (High)** | Partial outage, major degradation | 1 hour | Single region down, >10% error rate |
| **P2 (Medium)** | Minor service disruption | 4 hours | High latency, cache failures |
| **P3 (Low)** | Non-critical bug, cosmetic issue | 24 hours | UI glitch, slow admin panel |

### 2.2 Incident Response Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. DETECTION (Alert fired, user report, monitoring)            │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. TRIAGE                                                       │
│    • Acknowledge alert (PagerDuty)                              │
│    • Assess severity (P0-P3)                                    │
│    • Assign incident commander                                  │
│    • Open incident channel (#incident-YYYYMMDD-NNN)             │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. COMMUNICATION                                                │
│    • Update status page (status.oto.ai)                         │
│    • Notify affected users (if P0/P1)                           │
│    • Post updates every 30 min                                  │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. MITIGATION                                                   │
│    • Follow runbook procedures                                  │
│    • Implement temporary fixes                                  │
│    • Escalate if needed                                         │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. RESOLUTION                                                   │
│    • Verify fix in production                                   │
│    • Monitor for 30 minutes                                     │
│    • Close incident                                             │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. POST-MORTEM (P0/P1 incidents)                                │
│    • Write incident report (within 48 hours)                    │
│    • Root cause analysis                                        │
│    • Action items to prevent recurrence                         │
└──────────────────────────────────────────────────────────────────┘
```

### 2.3 Incident Commander Responsibilities

**During Incident:**
- [ ] Coordinate response team
- [ ] Make critical decisions
- [ ] Communicate with stakeholders
- [ ] Update status page
- [ ] Track timeline

**After Incident:**
- [ ] Write post-mortem report
- [ ] Facilitate post-mortem meeting
- [ ] Track action items

---

## 3. Common Issues & Solutions

### 3.1 High API Latency

**Symptoms:**
- API latency >500ms (p95)
- Slow page loads
- User complaints

**Diagnosis:**
```bash
# Check service latencies
kubectl top pods -n production

# Check database query performance
kubectl exec -n database neo4j-0 -- cypher-shell "CALL dbms.listQueries()"

# Check Redis hit rate
redis-cli INFO stats | grep keyspace_hits

# Check Kafka consumer lag
kafka-consumer-groups --bootstrap-server kafka:9092 --describe --group contact-service
```

**Solutions:**

**Solution 1: Scale Up Services**
```bash
# Scale contact service
kubectl scale deployment contact-service -n production --replicas=30

# Verify scaling
kubectl get pods -n production -l app=contact-service
```

**Solution 2: Increase Database Connection Pool**
```yaml
# Update contact-service deployment
env:
  - name: DATABASE_POOL_SIZE
    value: "50"  # Increase from 20

kubectl apply -f k8s/contact-service/deployment.yaml
kubectl rollout status deployment/contact-service -n production
```

**Solution 3: Clear Redis Cache (if stale)**
```bash
# Flush specific keys
kubectl exec -n database redis-0 -- redis-cli FLUSHDB

# Monitor cache hit rate
watch -n 1 'kubectl exec -n database redis-0 -- redis-cli INFO stats | grep keyspace'
```

### 3.2 Database Connection Pool Exhaustion

**Symptoms:**
- PostgreSQL connections >800/1000
- "too many connections" errors
- API timeouts

**Diagnosis:**
```bash
# Check active connections
kubectl exec -n database postgres-0 -- psql -U oto -c "SELECT count(*) FROM pg_stat_activity;"

# Check connections by service
kubectl exec -n database postgres-0 -- psql -U oto -c "SELECT application_name, count(*) FROM pg_stat_activity GROUP BY application_name;"

# Check idle connections
kubectl exec -n database postgres-0 -- psql -U oto -c "SELECT count(*) FROM pg_stat_activity WHERE state = 'idle';"
```

**Solutions:**

**Solution 1: Kill Idle Connections**
```sql
-- Kill connections idle for >10 minutes
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle'
  AND state_change < NOW() - INTERVAL '10 minutes';
```

**Solution 2: Increase Max Connections**
```bash
# Edit PostgreSQL config
kubectl edit configmap postgres-config -n database

# Add/update:
# max_connections = 1500

# Restart PostgreSQL
kubectl rollout restart statefulset postgres -n database
```

**Solution 3: Fix Connection Leaks**
```bash
# Check code for missing connection.close()
git grep "pool.getConnection" | grep -v "finally"

# Deploy fix
git commit -am "fix: close database connections in finally block"
git push
# CI/CD will deploy automatically
```

### 3.3 Kafka Consumer Lag

**Symptoms:**
- Health score updates delayed
- Events not processing
- Consumer lag >1000 messages

**Diagnosis:**
```bash
# Check consumer lag
kafka-consumer-groups --bootstrap-server kafka:9092 \
  --describe --group contact-service

# Output:
# TOPIC       PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
# interactions 0          1234567         1250000         15433

# Check consumer status
kubectl logs -n production contact-service-abc123 | grep "Kafka"
```

**Solutions:**

**Solution 1: Scale Up Consumers**
```bash
# Increase replicas
kubectl scale deployment contact-service -n production --replicas=20

# Verify lag decreasing
watch -n 5 'kafka-consumer-groups --bootstrap-server kafka:9092 --describe --group contact-service'
```

**Solution 2: Increase Consumer Threads**
```yaml
# Update contact-service config
env:
  - name: KAFKA_CONSUMER_THREADS
    value: "8"  # Increase from 4

kubectl apply -f k8s/contact-service/deployment.yaml
```

**Solution 3: Clear Old Messages (if safe)**
```bash
# Delete old topic data (CAUTION: data loss)
kafka-topics --bootstrap-server kafka:9092 \
  --alter --topic interactions \
  --config retention.ms=86400000  # 1 day
```

### 3.4 Pod Crash Loop

**Symptoms:**
- Pod restarting repeatedly
- CrashLoopBackOff status
- Service unavailable

**Diagnosis:**
```bash
# Check pod status
kubectl get pods -n production -l app=sentiment-analysis

# Check logs
kubectl logs -n production sentiment-analysis-abc123 --previous

# Check events
kubectl describe pod -n production sentiment-analysis-abc123

# Common errors:
# - Out of memory (OOMKilled)
# - Missing environment variables
# - Database connection failed
```

**Solutions:**

**Solution 1: Increase Memory Limit**
```yaml
# Update deployment
resources:
  requests:
    memory: "4Gi"  # Increase from 2Gi
  limits:
    memory: "8Gi"  # Increase from 4Gi

kubectl apply -f k8s/sentiment-analysis/deployment.yaml
```

**Solution 2: Fix Missing Environment Variable**
```bash
# Check required env vars
kubectl exec -n production sentiment-analysis-abc123 -- env | grep MODEL

# Add missing variable
kubectl set env deployment/sentiment-analysis -n production MODEL_PATH=/models/sentiment_v2.1.0

# Verify
kubectl rollout status deployment/sentiment-analysis -n production
```

**Solution 3: Rollback to Previous Version**
```bash
# Check deployment history
kubectl rollout history deployment/sentiment-analysis -n production

# Rollback
kubectl rollout undo deployment/sentiment-analysis -n production

# Verify
kubectl get pods -n production -l app=sentiment-analysis
```

---

## 4. Performance Tuning

### 4.1 Database Query Optimization

**Slow Neo4j Query:**
```cypher
// Before (slow - no index)
MATCH (u:User)-[:KNOWS]->(c:Contact)
WHERE u.email = 'user@example.com'
RETURN c

// After (fast - with index)
CREATE INDEX user_email IF NOT EXISTS FOR (u:User) ON (u.email);

// Query now uses index
MATCH (u:User {email: 'user@example.com'})-[:KNOWS]->(c:Contact)
RETURN c
```

**Slow PostgreSQL Query:**
```sql
-- Before (slow - sequential scan)
SELECT * FROM users WHERE email = 'user@example.com';

-- Add index
CREATE INDEX idx_users_email ON users(email);

-- After (fast - index scan)
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
-- Index Scan using idx_users_email (cost=0.42..8.44 rows=1)
```

### 4.2 Redis Cache Tuning

**Increase Cache Hit Rate:**
```bash
# Check current hit rate
redis-cli INFO stats | grep keyspace_hits
# keyspace_hits:45000000
# keyspace_misses:5000000
# Hit rate: 90% (target: 95%+)

# Increase cache TTL for frequently accessed data
# contact:{id} TTL: 1h → 4h
redis-cli CONFIG SET maxmemory-policy allkeys-lru

# Monitor eviction rate
watch -n 5 'redis-cli INFO stats | grep evicted_keys'
```

### 4.3 Kubernetes Resource Tuning

**Right-Size Pod Resources:**
```bash
# Check actual resource usage
kubectl top pods -n production

# Adjust resource requests/limits
# If usage is consistently <50% of requests: reduce
# If usage is consistently >80% of limits: increase

# Example: Contact Service
resources:
  requests:
    memory: "1.5Gi"  # Reduce from 2Gi
    cpu: "750m"      # Reduce from 1000m
  limits:
    memory: "3Gi"    # Keep buffer
    cpu: "2000m"
```

---

## 5. Backup & Recovery

### 5.1 Backup Schedule

| Database | Frequency | Retention | Location |
|----------|-----------|-----------|----------|
| **PostgreSQL** | Every 6 hours | 30 days | S3: `s3://oto-backups/postgres/` |
| **Neo4j** | Daily (2 AM UTC) | 30 days | S3: `s3://oto-backups/neo4j/` |
| **InfluxDB** | Hourly | 90 days | S3: `s3://oto-backups/influxdb/` |
| **Kubernetes etcd** | Daily (3 AM UTC) | 30 days | S3: `s3://oto-backups/etcd/` |

### 5.2 Restore Procedures

**Restore PostgreSQL:**
```bash
# 1. Download backup
aws s3 cp s3://oto-backups/postgres/backup-2025-11-30.sql.gz /tmp/

# 2. Stop application services
kubectl scale deployment --all --replicas=0 -n production

# 3. Restore database
kubectl exec -n database postgres-0 -- psql -U oto -d oto_prod < /tmp/backup-2025-11-30.sql

# 4. Verify data
kubectl exec -n database postgres-0 -- psql -U oto -d oto_prod -c "SELECT COUNT(*) FROM users;"

# 5. Restart application services
kubectl scale deployment --all --replicas=10 -n production
```

**Restore Neo4j:**
```bash
# 1. Download backup
aws s3 cp s3://oto-backups/neo4j/neo4j-2025-11-30.dump /tmp/

# 2. Stop Neo4j
kubectl scale statefulset neo4j -n database --replicas=0

# 3. Restore
kubectl exec -n database neo4j-0 -- neo4j-admin load --from=/tmp/neo4j-2025-11-30.dump --database=neo4j --force

# 4. Start Neo4j
kubectl scale statefulset neo4j -n database --replicas=1

# 5. Verify
kubectl exec -n database neo4j-0 -- cypher-shell "MATCH (n) RETURN count(n);"
```

### 5.3 Disaster Recovery Test

**Schedule:** Monthly (first Sunday, 2 AM UTC)

**Procedure:**
```bash
# 1. Create test namespace
kubectl create namespace dr-test

# 2. Restore backups to test namespace
./scripts/restore-all-backups.sh --namespace=dr-test

# 3. Deploy application to test namespace
kubectl apply -f k8s/ --namespace=dr-test

# 4. Run smoke tests
npm run test:smoke -- --host=dr-test.oto.ai

# 5. Verify data integrity
./scripts/verify-data-integrity.sh --namespace=dr-test

# 6. Cleanup
kubectl delete namespace dr-test
```

---

## 6. On-Call Procedures

### 6.1 On-Call Rotation

**Schedule:** 1-week rotations, 24/7 coverage

**Responsibilities:**
- Respond to P0/P1 alerts within 15 minutes
- Triage all incidents
- Coordinate incident response
- Update status page
- Write post-mortem reports (P0/P1)

**Handoff Checklist:**
- [ ] Review open incidents
- [ ] Check scheduled maintenance
- [ ] Review recent deployments
- [ ] Test PagerDuty notifications
- [ ] Verify access to production systems

### 6.2 Escalation Matrix

| Issue Type | Primary | Secondary | Executive |
|-----------|---------|-----------|-----------|
| **Database** | DBA Team | Infrastructure Lead | CTO |
| **API** | Backend Team | Engineering Manager | CTO |
| **Frontend** | Frontend Team | Engineering Manager | CTO |
| **Security** | Security Team | CISO | CEO |
| **Infrastructure** | DevOps Team | Infrastructure Lead | CTO |

**Escalation Contacts:**
- DBA Team: dba-oncall@oto.ai
- Backend Team: backend-oncall@oto.ai
- Security Team: security@oto.ai
- CISO: ciso@oto.ai
- CTO: cto@oto.ai

### 6.3 Post-Mortem Template

```markdown
# Incident Post-Mortem: [TITLE]

**Date:** 2025-11-30  
**Duration:** 45 minutes  
**Severity:** P1  
**Incident Commander:** John Doe

## Summary
Brief description of what happened.

## Impact
- 30% of users experienced intermittent errors
- API latency increased to 2.5s (p95)
- No data loss

## Timeline (UTC)
- 14:32 - Alert fired: High API latency
- 14:35 - Incident acknowledged
- 14:40 - Root cause identified: Database connection pool exhausted
- 14:45 - Mitigation started: Increased connection pool size
- 14:55 - Service restored
- 15:15 - Incident closed

## Root Cause
Database connection pool size (20) was insufficient for peak traffic. Connections were not being released properly due to missing `finally` blocks.

## Resolution
1. Increased connection pool size: 20 → 50
2. Fixed connection leak in contact-service
3. Added monitoring for connection pool usage

## Action Items
- [ ] Add connection pool monitoring alerts (@backend-team, Dec 5)
- [ ] Audit all services for connection leaks (@backend-team, Dec 10)
- [ ] Implement automatic connection timeout (@dba-team, Dec 15)
- [ ] Load testing with 2× peak traffic (@devops-team, Dec 20)

## Lessons Learned
- Need better monitoring for database connection pools
- Code review should check for proper resource cleanup
- Load testing should cover 2× peak traffic scenarios
```

---

## Conclusion

OTO's operations runbook enables **<15 minute P0 response**, **99.95% uptime**, and **systematic incident resolution** through comprehensive monitoring, clear escalation paths, and well-documented procedures for common issues, performance tuning, and disaster recovery.

---

**© 2025 OTO AI Inc. All rights reserved.**
