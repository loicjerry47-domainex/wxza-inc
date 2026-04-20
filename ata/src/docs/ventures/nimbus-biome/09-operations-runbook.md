# NIMBUS BIOME - Operations Runbook
## Monitoring, Maintenance, Incident Response & SLA Management

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Operations Documentation  
**Reading Time:** 25 minutes

---

## Executive Summary

This runbook provides **operational procedures** for maintaining **99.97% uptime**, **responding to incidents**, and **managing the NIMBUS BIOME platform** at scale (**2,500 buildings, 125M sensors, 100M+ data points/hour**).

### SLA Targets

| Service | Uptime SLA | Actual (2025) | Latency (p95) |
|---------|-----------|---------------|---------------|
| **API Gateway** | 99.95% | 99.97% | 42ms |
| **Data Ingestion** | 99.9% | 99.95% | N/A |
| **Sensor Network** | 99.9% | 99.98% | N/A |
| **Web Dashboard** | 99.9% | 99.96% | 1.2s load time |
| **Mobile App** | 99.5% | 99.8% | N/A |

### Incident Response

| Severity | Response Time | Resolution Time | 2025 Count |
|----------|---------------|-----------------|------------|
| **P0 (Critical)** | 5 minutes | <2 hours | 2 |
| **P1 (High)** | 15 minutes | <8 hours | 12 |
| **P2 (Medium)** | 1 hour | <24 hours | 45 |
| **P3 (Low)** | Next business day | <1 week | 120 |

---

## Table of Contents

1. [Monitoring & Alerting](#1-monitoring--alerting)
2. [Incident Response](#2-incident-response)
3. [Common Incidents & Resolutions](#3-common-incidents--resolutions)
4. [Maintenance Procedures](#4-maintenance-procedures)
5. [Capacity Planning](#5-capacity-planning)
6. [Disaster Recovery](#6-disaster-recovery)
7. [On-Call Rotation](#7-on-call-rotation)
8. [Runbook Automation](#8-runbook-automation)

---

## 1. Monitoring & Alerting

### 1.1 Monitoring Stack

**Tools**:
- **Prometheus**: Metrics collection (10M time-series)
- **Grafana**: Dashboards (200+ dashboards)
- **PagerDuty**: Alert routing, on-call management
- **Jaeger**: Distributed tracing
- **ELK Stack**: Centralized logging

**Key Dashboards**:
- **Platform Overview**: https://grafana.nimbus.io/d/platform-overview
- **API Performance**: https://grafana.nimbus.io/d/api-performance
- **Database Health**: https://grafana.nimbus.io/d/database-health
- **IoT Devices**: https://grafana.nimbus.io/d/iot-devices
- **Cost Monitoring**: https://grafana.nimbus.io/d/aws-cost

### 1.2 Alert Rules

**Critical Alerts** (P0 - page on-call immediately):

```yaml
# Prometheus AlertManager rules
groups:
  - name: critical_alerts
    interval: 30s
    rules:
      # API Gateway Down
      - alert: APIGatewayDown
        expr: up{job="api-gateway"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "API Gateway is down"
          description: "API Gateway has been down for more than 1 minute"
          runbook: "https://wiki.nimbus.io/runbooks/api-gateway-down"
      
      # High Error Rate
      - alert: HighErrorRate
        expr: (rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High API error rate (>5%)"
          description: "Error rate is {{ $value }}%"
      
      # Database Connection Exhaustion
      - alert: DatabaseConnectionsExhausted
        expr: pg_stat_activity_count > 900
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "PostgreSQL connection pool exhausted"
          description: "{{ $value }} connections (max: 1000)"
      
      # Disk Space Low
      - alert: DiskSpaceCritical
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) < 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Disk space below 5%"
          description: "{{ $labels.instance }} has {{ $value }}% free"
```

**Warning Alerts** (P1 - notify team, investigate):

```yaml
  - name: warning_alerts
    interval: 1m
    rules:
      # High API Latency
      - alert: HighAPILatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1.0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High API latency (p95 >1s)"
          description: "p95 latency is {{ $value }}s"
      
      # Pod Crash Looping
      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Pod {{ $labels.pod }} is crash-looping"
      
      # High CPU Usage
      - alert: HighCPUUsage
        expr: (100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)) > 85
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is {{ $value }}%"
```

### 1.3 On-Call Alerting

**PagerDuty Escalation Policy**:

```
Incident Created
       ↓
   (Immediate)
Primary On-Call Engineer
       ↓
   (15 minutes, no ack)
Secondary On-Call Engineer
       ↓
   (30 minutes, no ack)
Engineering Manager
       ↓
   (1 hour, no ack)
CTO + CEO
```

**Alert Routing**:
- **P0 (Critical)**: PagerDuty (phone call + SMS + push notification)
- **P1 (High)**: PagerDuty (push notification) + Slack (#incidents)
- **P2 (Medium)**: Slack (#engineering) + Email
- **P3 (Low)**: Email + Jira ticket

---

## 2. Incident Response

### 2.1 Incident Severity Definitions

| Severity | Definition | Examples | Response |
|----------|-----------|----------|----------|
| **P0** | Complete service outage, data loss risk | API Gateway down, database unavailable | Page on-call, all hands |
| **P1** | Major functionality broken, degraded performance | High error rate (>5%), high latency (>2s) | Page on-call, incident channel |
| **P2** | Minor functionality broken, workaround exists | Single endpoint broken, non-critical feature down | Notify team, fix in next deploy |
| **P3** | Cosmetic issue, no user impact | UI bug, typo, minor performance issue | Create Jira ticket, fix in sprint |

### 2.2 Incident Response Workflow

**Step 1: Acknowledge** (within 5 minutes for P0)
```bash
# 1. Acknowledge in PagerDuty
pd incident acknowledge <incident_id>

# 2. Join incident Slack channel
# Auto-created: #incident-2025-11-28-001

# 3. Announce in channel
"🚨 P0 INCIDENT: API Gateway down in us-east-1
Incident Commander: @john.doe
Status: Investigating
ETA: TBD"
```

**Step 2: Assess Impact**
```bash
# Check service health
kubectl get pods -n nimbus-prod | grep -v Running

# Check recent deployments
kubectl rollout history deployment/api-gateway -n nimbus-prod

# Check error rate
promtool query instant 'rate(http_requests_total{status=~"5.."}[5m])'

# Check affected users
psql -c "SELECT COUNT(DISTINCT user_id) FROM active_sessions WHERE last_seen > NOW() - INTERVAL '5 minutes'"
```

**Step 3: Mitigate** (stop the bleeding)
```bash
# Common mitigations:

# Rollback deployment
kubectl rollout undo deployment/api-gateway -n nimbus-prod

# Scale up replicas
kubectl scale deployment/api-gateway --replicas=200 -n nimbus-prod

# Failover to DR region
./scripts/failover-to-dr.sh us-west-2

# Disable problematic feature
kubectl set env deployment/api-gateway FEATURE_HVAC_CONTROL=false -n nimbus-prod
```

**Step 4: Resolve** (fix root cause)
```bash
# Identify root cause (logs, metrics, traces)
stern api-gateway -n nimbus-prod --since 30m | grep ERROR

# Deploy hotfix
git checkout -b hotfix/api-gateway-crash
# ... make fix ...
git commit -m "fix: handle null pointer in HVAC controller"
git push origin hotfix/api-gateway-crash
gh pr create --title "HOTFIX: API Gateway crash" --base main
# ... merge after approval ...
```

**Step 5: Communicate**
```bash
# Update status page
curl -X POST https://status.nimbusbiome.io/api/incidents \
  -d '{"status": "resolved", "message": "API Gateway restored to normal operation"}'

# Notify customers (for P0/P1 incidents >30 minutes)
# Email template: /docs/templates/incident-notification.md
```

**Step 6: Post-Incident Review** (within 48 hours)
- **Blameless postmortem**: Focus on system, not people
- **Timeline**: Detailed incident timeline
- **Root cause**: What failed and why
- **Action items**: Preventative measures

**Postmortem Template**:
```markdown
# Incident Postmortem: API Gateway Outage (2025-11-28)

## Summary
API Gateway was unavailable for 37 minutes (14:32 - 15:09 UTC) due to 
database connection pool exhaustion.

## Impact
- **Duration**: 37 minutes
- **Affected users**: ~3,500 (25% of active users)
- **Revenue impact**: ~$2,500 (37 min × $4,050/hour)
- **SLA breach**: No (within 99.95% target for month)

## Timeline (UTC)
- 14:32: PagerDuty alert: API Gateway high error rate
- 14:33: On-call engineer acknowledges, begins investigation
- 14:35: Identified: PostgreSQL connection pool exhausted (1000/1000)
- 14:38: Mitigation: Increased connection pool size to 2000
- 14:40: Partial recovery: Error rate drops to 2%
- 14:45: Identified: Long-running query causing connection leak
- 14:50: Killed long-running queries
- 14:55: Full recovery: Error rate <0.1%
- 15:09: Monitoring confirms stable, incident closed

## Root Cause
A database query introduced in v2.1.0 had no timeout, causing connections
to remain open indefinitely. Under high load, this exhausted the connection
pool (1000 connections), causing all API requests to fail.

## Action Items
1. [P0] Add query timeout to all database queries (default: 30s) - @john.doe - 2025-11-29
2. [P1] Increase connection pool size to 2000 (temporary) - @jane.smith - DONE
3. [P1] Implement connection pool monitoring alerts - @bob.jones - 2025-11-30
4. [P2] Review all database queries for performance - @team - 2025-12-05
5. [P3] Improve load testing to catch this class of bugs - @qa-team - 2025-12-15

## Lessons Learned
- **What went well**: Fast detection (2 min), clear mitigation path
- **What went poorly**: No query timeout enforcement, insufficient load testing
- **Prevention**: Mandatory query timeouts, better monitoring
```

---

## 3. Common Incidents & Resolutions

### 3.1 API Gateway High Latency

**Symptoms**:
- p95 latency >1s
- Slow page loads
- User complaints

**Diagnosis**:
```bash
# Check API latency metrics
promtool query instant 'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))'

# Identify slow endpoints
kubectl logs -l app=api-gateway --tail=1000 | grep "duration_ms" | sort -k3 -nr | head -20

# Check database query performance
psql -c "SELECT query, mean_time, calls FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"
```

**Resolution**:
1. **Optimize slow queries**: Add indexes, rewrite inefficient queries
2. **Increase cache hit rate**: Warm up Redis cache, increase TTL
3. **Scale horizontally**: Increase API Gateway replicas
4. **Enable CDN**: Cache static assets, API responses (where appropriate)

### 3.2 Database Connection Pool Exhaustion

**Symptoms**:
- "Too many connections" errors
- API requests failing with 500 errors

**Diagnosis**:
```bash
# Check active connections
psql -c "SELECT COUNT(*) FROM pg_stat_activity;"

# Identify long-running queries
psql -c "SELECT pid, now() - query_start AS duration, query FROM pg_stat_activity WHERE state = 'active' ORDER BY duration DESC;"
```

**Resolution**:
```bash
# Kill long-running queries
psql -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE now() - query_start > interval '5 minutes';"

# Increase connection pool size (temporary)
kubectl set env deployment/api-gateway DATABASE_POOL_SIZE=2000 -n nimbus-prod

# Permanent fix: Add query timeouts
# In code: SET statement_timeout = '30s';
```

### 3.3 Sensor Offline (Mass Outage)

**Symptoms**:
- Spike in "sensor offline" alerts
- Missing data in dashboards

**Diagnosis**:
```bash
# Check sensor connectivity rate
psql -c "SELECT COUNT(*) AS offline FROM sensors WHERE last_reading_at < NOW() - INTERVAL '15 minutes';"

# Check AWS IoT Core metrics
aws iot describe-endpoint --endpoint-type iot:Data-ATS
aws cloudwatch get-metric-statistics --namespace AWS/IoT --metric-name Connect.Success --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) --end-time $(date -u +%Y-%m-%dT%H:%M:%S) --period 300 --statistics Sum
```

**Resolution**:
1. **Check AWS IoT Core health**: https://status.aws.amazon.com
2. **Check building network**: Contact facility manager, verify internet connectivity
3. **Check edge node health**: SSH to Greengrass node, restart if needed
4. **Escalate to hardware vendor**: If sensors physically damaged

### 3.4 High AWS Costs (Budget Alert)

**Symptoms**:
- AWS budget alert: "Exceeded 80% of monthly budget"
- Unexpected cost spike in Cost Explorer

**Diagnosis**:
```bash
# Identify cost drivers
aws ce get-cost-and-usage --time-period Start=2025-11-01,End=2025-11-30 --granularity DAILY --metrics BlendedCost --group-by Type=SERVICE

# Check for runaway resources
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running" --query 'Reservations[].Instances[].InstanceId' | wc -l
```

**Resolution**:
1. **Terminate unused resources**: Old EKS nodes, stopped EC2 instances
2. **Enable auto-scaling**: Scale down during off-peak hours
3. **Optimize storage**: Delete old S3 objects, unused EBS snapshots
4. **Purchase Reserved Instances**: 30-70% savings for steady-state workloads

---

## 4. Maintenance Procedures

### 4.1 Database Maintenance

**Weekly** (Sunday 2 AM UTC):
```bash
#!/bin/bash
# Weekly database maintenance

# 1. Vacuum database (reclaim storage)
psql -c "VACUUM ANALYZE;"

# 2. Reindex tables
psql -c "REINDEX DATABASE nimbus_biome;"

# 3. Update statistics
psql -c "ANALYZE;"

# 4. Check for bloat
psql -f /scripts/check_table_bloat.sql
```

**Monthly** (First Sunday 2 AM UTC):
```bash
# Backup before major maintenance
pg_dump nimbus_biome > /backups/nimbus_biome_$(date +%Y%m%d).sql

# Upgrade PostgreSQL (minor version)
# Example: 16.0 → 16.1
helm upgrade postgres bitnami/postgresql --version 13.2.0 -n nimbus-prod
```

### 4.2 Kubernetes Cluster Maintenance

**Node Drain** (before OS updates):
```bash
# Mark node unschedulable
kubectl cordon node-abc123

# Evict all pods
kubectl drain node-abc123 --ignore-daemonsets --delete-emptydir-data

# Perform OS updates on node
ssh node-abc123 'sudo apt update && sudo apt upgrade -y && sudo reboot'

# Re-enable node
kubectl uncordon node-abc123
```

**Kubernetes Version Upgrade** (quarterly):
```bash
# Upgrade EKS control plane (AWS managed)
eksctl upgrade cluster --name nimbus-prod-us-east-1 --version 1.29

# Upgrade node groups (one at a time)
eksctl upgrade nodegroup --cluster nimbus-prod-us-east-1 --name general-purpose --kubernetes-version 1.29
```

### 4.3 Certificate Rotation

**TLS Certificates** (AWS Certificate Manager - automatic):
- Certificates automatically renew 60 days before expiration
- No manual intervention required

**Kubernetes Service Account Tokens** (manual):
```bash
# Rotate service account token
kubectl delete secret api-gateway-token -n nimbus-prod
kubectl create token api-gateway --duration=8760h > /secrets/api-gateway-token.txt  # 1 year
```

### 4.4 Backup Verification

**Monthly** (Third Sunday):
```bash
#!/bin/bash
# Verify database backups are restorable

# 1. Download latest backup
aws s3 cp s3://nimbus-backups/postgres/latest.sql.gz /tmp/

# 2. Restore to test database
gunzip /tmp/latest.sql.gz
psql -h test-db.nimbus.io -U postgres -c "DROP DATABASE IF EXISTS nimbus_test;"
psql -h test-db.nimbus.io -U postgres -c "CREATE DATABASE nimbus_test;"
psql -h test-db.nimbus.io -U postgres nimbus_test < /tmp/latest.sql

# 3. Verify row counts match production
psql -h test-db.nimbus.io -U postgres nimbus_test -c "SELECT COUNT(*) FROM buildings;"
psql -h prod-db.nimbus.io -U postgres nimbus_biome -c "SELECT COUNT(*) FROM buildings;"

# 4. Clean up
psql -h test-db.nimbus.io -U postgres -c "DROP DATABASE nimbus_test;"
```

---

## 5. Capacity Planning

### 5.1 Current Capacity (November 2025)

| Resource | Current Usage | Capacity | Utilization |
|----------|---------------|----------|-------------|
| **EKS Nodes** | 180 | 500 | 36% |
| **vCPUs** | 1,360 | 4,000 | 34% |
| **RAM** | 5.76TB | 16TB | 36% |
| **API RPS** | 5,000 | 20,000 | 25% |
| **Database IOPS** | 6,000 | 12,000 | 50% |
| **S3 Storage** | 680TB | Unlimited | N/A |

### 5.2 Growth Projections (2026)

**Assumptions**:
- 4× building growth (2,500 → 10,000 buildings)
- Linear scaling (sensors, data, compute)

**Projected Requirements** (Dec 2026):

| Resource | Projected | Target Capacity | Action Needed |
|----------|-----------|-----------------|---------------|
| **EKS Nodes** | 720 | 1,200 | Increase node group max size |
| **vCPUs** | 5,440 | 10,000 | Purchase Reserved Instances (30% savings) |
| **Database** | db.r6g.8xlarge | db.r6g.16xlarge | Schedule upgrade for Q2 2026 |
| **S3 Storage** | 2.7PB | Unlimited | Enable Intelligent-Tiering |

### 5.3 Scaling Triggers

**Auto-Scaling Policies**:
```yaml
# Horizontal Pod Autoscaler (HPA)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  minReplicas: 50
  maxReplicas: 200
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

## 6. Disaster Recovery

### 6.1 DR Plan

**RTO/RPO**:
- **RTO** (Recovery Time Objective): 1 hour
- **RPO** (Recovery Point Objective): 5 minutes

**DR Regions**:
- **Primary**: us-east-1 (N. Virginia)
- **Secondary**: us-west-2 (Oregon)
- **Tertiary**: eu-west-1 (Ireland)

### 6.2 Failover Procedure

**Scenario**: Complete us-east-1 region failure

```bash
#!/bin/bash
# Failover to us-west-2 (DR region)

# 1. Update DNS (Route 53)
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch file://failover-to-us-west-2.json

# 2. Promote read replica to primary (PostgreSQL)
aws rds promote-read-replica \
  --db-instance-identifier nimbus-prod-us-west-2-replica

# 3. Scale up Kubernetes cluster in DR region
eksctl scale nodegroup \
  --cluster nimbus-prod-us-west-2 \
  --name general-purpose \
  --nodes 180

# 4. Update application configuration
kubectl set env deployment/api-gateway \
  DATABASE_URL="postgresql://nimbus-prod-us-west-2.rds.amazonaws.com/nimbus_biome" \
  -n nimbus-prod

# 5. Verify services are healthy
kubectl get pods -n nimbus-prod | grep -c "Running"
# Expected: 5000+ pods

# 6. Update status page
curl -X POST https://status.nimbusbiome.io/api/incidents \
  -d '{"status": "monitoring", "message": "Failover to DR region complete"}'

echo "✅ Failover complete. Estimated recovery time: 30 minutes"
```

### 6.3 DR Testing

**Quarterly** (last Saturday of quarter, 8 AM UTC):
- Simulate complete region failure
- Failover to DR region
- Verify all services operational
- Failback to primary region
- Document lessons learned

---

## 7. On-Call Rotation

### 7.1 On-Call Schedule

**Rotation**: Weekly (Monday 9 AM - Monday 9 AM)

**Responsibilities**:
- **Primary on-call**: First responder for all alerts
- **Secondary on-call**: Backup if primary doesn't respond (15 min)
- **Escalation**: Engineering Manager → CTO → CEO

**Expectations**:
- Response time: <5 minutes (P0), <15 minutes (P1)
- Availability: Laptop + phone + internet 24/7
- Handoff: Documented summary on Monday morning

### 7.2 On-Call Handoff

**Monday 9 AM** (Slack #on-call channel):
```
🔄 ON-CALL HANDOFF

Outgoing: @john.doe
Incoming: @jane.smith

Last Week Summary:
- Incidents: 2 P2 (high API latency, sensor offline)
- Ongoing: Database migration scheduled for Wed 2 AM
- Known Issues: Intermittent Redis connection timeouts (investigating)

Upcoming This Week:
- Kubernetes upgrade (Thu 2 AM UTC)
- Black Friday load test (Fri 10 AM UTC)
- Expected high traffic due to new building onboarding

Runbook Updates:
- Added procedure for Redis failover
- Updated escalation policy (new Engineering Manager)

@jane.smith please acknowledge
```

### 7.3 On-Call Compensation

- **Base**: $500/week on-call stipend
- **Incident Response**: $100/hour (minimum 1 hour per incident)
- **Weekend/Holiday**: 1.5× rate

---

## 8. Runbook Automation

### 8.1 Automated Remediation

**Auto-Healing**:
```python
# Kubernetes liveness/readiness probes automatically restart unhealthy pods
# Example: api-gateway restart if health check fails 3 times

apiVersion: v1
kind: Pod
metadata:
  name: api-gateway
spec:
  containers:
  - name: api-gateway
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 10
      failureThreshold: 3  # Restart after 3 failures
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5
```

**Runbook Scripts**:
```bash
# /scripts/auto-remediate/high-error-rate.sh
#!/bin/bash
# Automatically triggered when error rate >5% for 5 minutes

# 1. Check recent deployments
LAST_DEPLOY=$(kubectl rollout history deployment/api-gateway -n nimbus-prod | tail -1)

# 2. If deployed in last 30 minutes, rollback
if [[ $(date -d "$LAST_DEPLOY" +%s) -gt $(date -d '30 minutes ago' +%s) ]]; then
    echo "Recent deployment detected. Rolling back..."
    kubectl rollout undo deployment/api-gateway -n nimbus-prod
    
    # Notify team
    slack-cli post -c incidents "🔄 Auto-rollback: API Gateway (high error rate)"
else
    # No recent deployment, scale up replicas
    echo "No recent deployment. Scaling up replicas..."
    kubectl scale deployment/api-gateway --replicas=200 -n nimbus-prod
fi
```

---

## Conclusion

This runbook provides **operational procedures** to maintain NIMBUS BIOME's **99.97% uptime SLA**. Follow these procedures for **incident response**, **maintenance**, and **disaster recovery**. Update this document as the platform evolves.

**Questions?** Contact #on-call in Slack or ops@nimbusbiome.io

---

**Document Classification**: Operations Documentation  
**Last Updated**: November 28, 2025  
**Maintained By**: DevOps Team  
**Review Schedule**: Quarterly  

© 2025 NIMBUS BIOME Inc. All rights reserved.
