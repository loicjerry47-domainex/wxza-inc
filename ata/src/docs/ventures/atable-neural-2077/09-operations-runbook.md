# ATABLE NEURAL 2077 - Operations Runbook
## Production Operations & Incident Response

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Classification:** Operations Manual  
**Reading Time:** 25 minutes

---

## Executive Summary

This runbook provides operational procedures for ATABLE NEURAL 2077 platform, covering monitoring, incident response, performance tuning, backup/recovery, and on-call procedures.

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

### 1.1 Key Metrics

**Application Metrics:**
| Metric | Normal Range | Warning | Critical | Action |
|--------|--------------|---------|----------|--------|
| **API Latency (p95)** | <100ms | 100-200ms | >200ms | Scale API pods |
| **Threat Detection Accuracy** | >99.5% | 99-99.5% | <99% | Investigate model drift |
| **False Positive Rate** | <0.15% | 0.15-0.3% | >0.3% | Retrain models |
| **Events/Second** | 600K | 400-600K | <400K | Check Kafka consumers |
| **ML Inference Latency** | <50ms | 50-100ms | >100ms | Scale GPU pods |

**Infrastructure Metrics:**
| Metric | Normal | Warning | Critical |
|--------|--------|---------|----------|
| **CPU Utilization** | <70% | 70-85% | >85% |
| **Memory Utilization** | <80% | 80-90% | >90% |
| **Disk I/O Utilization** | <70% | 70-85% | >85% |
| **Network Throughput** | <80% capacity | 80-90% | >90% |

### 1.2 Grafana Dashboards

**Dashboard URLs:**
- **Overview:** https://grafana.atableneuralai.com/d/overview
- **API Performance:** https://grafana.atableneuralai.com/d/api
- **ML Inference:** https://grafana.atableneuralai.com/d/ml
- **Infrastructure:** https://grafana.atableneuralai.com/d/infra
- **Database:** https://grafana.atableneuralai.com/d/db

### 1.3 Alert Channels

| Channel | Use Case | Response Time |
|---------|----------|---------------|
| **PagerDuty** | Critical incidents (P0/P1) | <15 minutes |
| **Slack (#alerts)** | Warnings, informational | <1 hour |
| **Email (ops@)** | Daily reports, summaries | Next business day |

---

## 2. Incident Response

### 2.1 Incident Severity Levels

| Severity | Description | Examples | Response SLA |
|----------|-------------|----------|--------------|
| **P0 - Critical** | Complete outage | API down, database unavailable | <15 minutes |
| **P1 - High** | Major degradation | 50%+ error rate, high latency | <1 hour |
| **P2 - Medium** | Minor degradation | Single region issue, non-critical feature down | <4 hours |
| **P3 - Low** | Minor issue | UI bug, documentation error | <24 hours |

### 2.2 Incident Response Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    INCIDENT DETECTED                             │
│          (Alert triggered OR reported by customer)               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    1. ACKNOWLEDGE                                │
│  • On-call engineer acknowledges alert (PagerDuty)              │
│  • Create incident channel: #incident-2025-11-30-001            │
│  • Post initial status: "Investigating..."                      │
│  • Time: <5 minutes                                             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    2. ASSESS SEVERITY                            │
│  • Determine impact (customers affected, data loss risk)        │
│  • Classify severity (P0/P1/P2/P3)                              │
│  • Escalate if needed (page manager for P0)                     │
│  • Time: <10 minutes                                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    3. INVESTIGATE                                │
│  • Check monitoring dashboards (Grafana)                        │
│  • Review logs (Loki, CloudWatch)                               │
│  • Check recent deployments (any changes?)                      │
│  • Run diagnostic commands (see section 3)                      │
│  • Time: Varies                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    4. MITIGATE                                   │
│  • Apply immediate fix (restart service, rollback, etc.)        │
│  • Communicate status updates (every 30 min for P0/P1)          │
│  • Document actions taken                                       │
│  • Time: <Response SLA                                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    5. RESOLVE                                    │
│  • Verify issue is resolved (monitoring returns to normal)      │
│  • Notify customers (if customer-facing)                        │
│  • Mark incident as resolved                                    │
│  • Time: After successful mitigation + monitoring               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    6. POST-MORTEM                                │
│  • Write incident report (within 48 hours)                      │
│  • Identify root cause                                          │
│  • Document lessons learned                                     │
│  • Create action items (prevent recurrence)                     │
│  • Time: <48 hours after resolution                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Common Issues & Solutions

### 3.1 Issue: API High Latency

**Symptoms:**
- API latency (p95) > 200ms
- Slow dashboard loading
- Customer complaints

**Diagnosis:**
```bash
# Check API pod status
kubectl get pods -n atable-prod -l app=api

# Check resource utilization
kubectl top pods -n atable-prod -l app=api

# Check logs for errors
kubectl logs -n atable-prod -l app=api --tail=100 | grep ERROR

# Check database queries
# (connect to PostgreSQL, run pg_stat_statements)
```

**Solutions:**
1. **Scale API pods** (if CPU/memory high):
   ```bash
   kubectl scale deployment api -n atable-prod --replicas=100
   ```

2. **Restart pods** (if memory leak):
   ```bash
   kubectl rollout restart deployment api -n atable-prod
   ```

3. **Optimize slow database queries**:
   ```sql
   -- Find slow queries
   SELECT query, mean_exec_time, calls
   FROM pg_stat_statements
   ORDER BY mean_exec_time DESC
   LIMIT 10;
   
   -- Add missing indexes
   CREATE INDEX idx_threats_detection_timestamp 
   ON threats (detection_timestamp DESC);
   ```

---

### 3.2 Issue: Kafka Consumer Lag

**Symptoms:**
- `kafka_consumer_lag` metric > 100K messages
- Delayed threat detection (MTTD > 60 seconds)
- Event processing backup

**Diagnosis:**
```bash
# Check consumer lag
kubectl exec -it kafka-0 -n atable-prod -- \
  kafka-consumer-groups.sh \
  --bootstrap-server localhost:9092 \
  --group threat-detection-consumer \
  --describe

# Output shows lag per partition
```

**Solutions:**
1. **Scale consumers**:
   ```bash
   kubectl scale deployment threat-detection-engine -n atable-prod --replicas=50
   ```

2. **Increase partition count** (if current partitions are saturated):
   ```bash
   kubectl exec -it kafka-0 -n atable-prod -- \
     kafka-topics.sh \
     --bootstrap-server localhost:9092 \
     --alter \
     --topic security-events \
     --partitions 1000
   ```

3. **Check for slow consumers** (investigate consumer logs)

---

### 3.3 Issue: Database Connection Exhaustion

**Symptoms:**
- `FATAL: remaining connection slots are reserved for non-replication superuser connections`
- API errors: `connection pool exhausted`

**Diagnosis:**
```sql
-- Check current connections
SELECT count(*) FROM pg_stat_activity;

-- Check max connections
SHOW max_connections;

-- Check connections by application
SELECT application_name, count(*) 
FROM pg_stat_activity 
GROUP BY application_name 
ORDER BY count DESC;
```

**Solutions:**
1. **Increase max connections** (PostgreSQL):
   ```sql
   ALTER SYSTEM SET max_connections = 500;
   -- Requires PostgreSQL restart
   ```

2. **Use connection pooler** (PgBouncer):
   ```yaml
   # Deploy PgBouncer
   kubectl apply -f k8s/pgbouncer.yaml
   
   # Update API to use PgBouncer
   # DATABASE_URL=postgresql://pgbouncer:5432/atable
   ```

3. **Fix connection leaks** in application code

---

### 3.4 Issue: High False Positive Rate

**Symptoms:**
- False positive rate > 0.3%
- Customer complaints about false alarms
- `false_positives_total` metric increasing

**Diagnosis:**
```bash
# Check model performance metrics
curl http://ml-inference:9090/metrics | grep model_accuracy

# Review recent false positives
psql -c "SELECT * FROM threats WHERE status='false_positive' ORDER BY created_at DESC LIMIT 100;"
```

**Solutions:**
1. **Retrain models** with recent data:
   ```bash
   # Trigger retraining DAG
   airflow dags trigger retrain_threat_detection_models
   ```

2. **Adjust detection thresholds** (temporary fix):
   ```python
   # In ml-inference service
   ANOMALY_THRESHOLD = 0.95  # Increase from 0.90 (more conservative)
   ```

3. **Investigate specific false positive patterns**

---

## 4. Performance Tuning

### 4.1 Database Optimization

**PostgreSQL:**
```sql
-- Vacuum analyze (reclaim space, update statistics)
VACUUM ANALYZE threats;

-- Reindex (if index bloat detected)
REINDEX TABLE threats;

-- Update statistics
ANALYZE threats;
```

**ClickHouse:**
```sql
-- Optimize table (merge small parts)
OPTIMIZE TABLE security_events FINAL;

-- Check table size
SELECT 
    table,
    formatReadableSize(sum(bytes)) AS size,
    sum(rows) AS rows
FROM system.parts
WHERE table = 'security_events'
GROUP BY table;
```

### 4.2 Kubernetes Resource Tuning

```yaml
# Adjust resource requests/limits

apiVersion: apps/v1
kind: Deployment
metadata:
  name: threat-detection-engine
spec:
  template:
    spec:
      containers:
        - name: detector
          resources:
            requests:
              cpu: "8000m"      # Increase if CPU-constrained
              memory: "32Gi"     # Increase if memory-constrained
            limits:
              cpu: "16000m"
              memory: "64Gi"
```

---

## 5. Backup & Recovery

### 5.1 Backup Schedule

| Data Type | Frequency | Retention | Location |
|-----------|-----------|-----------|----------|
| **PostgreSQL (full)** | Daily (3 AM UTC) | 30 days | S3 + Glacier |
| **PostgreSQL (incremental)** | Hourly | 7 days | S3 |
| **ClickHouse (snapshot)** | Daily | 7 days | S3 |
| **Elasticsearch (snapshot)** | Daily | 14 days | S3 |
| **Configs (GitOps)** | Continuous | Indefinite | GitHub |

### 5.2 Restore Procedures

**PostgreSQL Recovery:**
```bash
# 1. Stop application (prevent writes)
kubectl scale deployment api -n atable-prod --replicas=0

# 2. Restore from backup
pg_restore -h postgres-host -U postgres -d atable \
  s3://atable-backups/postgres/2025-11-30-03-00-00.dump

# 3. Verify data
psql -h postgres-host -U postgres -d atable -c "SELECT count(*) FROM threats;"

# 4. Restart application
kubectl scale deployment api -n atable-prod --replicas=50
```

---

## 6. On-Call Procedures

### 6.1 On-Call Schedule

- **Rotation:** Weekly (Mon 9 AM - Mon 9 AM)
- **Primary:** On-call engineer
- **Secondary:** Backup engineer (escalation)
- **Manager:** Escalation for P0 incidents

**On-Call Calendar:** https://atableneuralai.pagerduty.com/schedules

### 6.2 On-Call Responsibilities

**Before Shift:**
- ☐ Test PagerDuty alert (send test page)
- ☐ Check laptop, charger, mobile phone
- ☐ Review open incidents
- ☐ Read recent changes (deployments, configs)

**During Shift:**
- ☐ Acknowledge alerts within 5 minutes
- ☐ Follow incident response workflow
- ☐ Communicate status updates
- ☐ Document actions taken
- ☐ Escalate if needed (don't struggle alone >30 min)

**After Shift:**
- ☐ Hand off open incidents to next on-call
- ☐ Update runbook (if you learned something new)
- ☐ File post-mortems for P0/P1 incidents

### 6.3 Escalation Path

```
Level 1: On-Call Engineer (Primary)
  ↓ (if unresponsive after 10 minutes OR needs help)
Level 2: Backup Engineer (Secondary)
  ↓ (if P0 incident OR outage >1 hour)
Level 3: Engineering Manager
  ↓ (if customer-facing impact OR PR crisis)
Level 4: VP Engineering / CTO
```

---

## Emergency Contacts

| Role | Name | Phone | Slack |
|------|------|-------|-------|
| **On-Call (Primary)** | See PagerDuty | - | @oncall-primary |
| **On-Call (Backup)** | See PagerDuty | - | @oncall-backup |
| **Engineering Manager** | Sarah Chen | +1-555-0123 | @sarah.chen |
| **VP Engineering** | David Kim | +1-555-0456 | @david.kim |
| **CTO** | Dr. Alex Rodriguez | +1-555-0789 | @alex.rodriguez |

---

## Useful Commands

```bash
# Check pod status
kubectl get pods -n atable-prod

# Describe pod (for events/errors)
kubectl describe pod <pod-name> -n atable-prod

# View logs
kubectl logs -f <pod-name> -n atable-prod

# Exec into pod
kubectl exec -it <pod-name> -n atable-prod -- /bin/bash

# Port forward (access service locally)
kubectl port-forward svc/api 8080:8080 -n atable-prod

# Scale deployment
kubectl scale deployment <name> --replicas=<count> -n atable-prod

# Rollback deployment
kubectl rollout undo deployment <name> -n atable-prod

# Check resource usage
kubectl top nodes
kubectl top pods -n atable-prod
```

---

## Conclusion

Follow this runbook for operational procedures, incident response, and on-call duties for ATABLE NEURAL 2077.

**For additional help, contact #ops-help on Slack.**

---

**© 2025 ATABLE NEURAL AI Inc. All rights reserved.**
