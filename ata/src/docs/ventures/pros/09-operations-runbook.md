# PRO'S Operations Runbook
## Production Operations & Incident Response

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification**: Internal - Operations  
**On-Call Rotation**: https://pagerduty.pros.io

---

## Executive Summary

This runbook provides step-by-step procedures for operating PRO'S production infrastructure, responding to incidents, and performing routine maintenance. **All on-call engineers must be familiar with this document.**

### Emergency Contacts

| Role | Name | Phone | Slack | Escalation Level |
|------|------|-------|-------|-----------------|
| **On-Call Primary** | Rotating | See PagerDuty | @oncall-primary | 1st |
| **On-Call Secondary** | Rotating | See PagerDuty | @oncall-secondary | 2nd |
| **Engineering Manager** | Alex Zhang | +1-xxx-xxx-xxxx | @alex-zhang | 3rd |
| **CTO** | Marcus Chen | +1-xxx-xxx-xxxx | @marcus-chen | 4th |
| **CEO** | Dr. Alexandra Rivera | +1-xxx-xxx-xxxx | @alexandra-rivera | 5th |

**Emergency Slack Channels**:
- **#incidents** - Active incident discussion
- **#oncall** - On-call questions & handoffs
- **#deploys** - Deployment notifications

---

## On-Call Responsibilities

### Shift Schedule

- **Duration**: 1 week (Monday 9am PT → Monday 9am PT)
- **Primary**: Responds to all alerts
- **Secondary**: Backup if primary doesn't respond within 15 minutes
- **Compensation**: $500/week on-call stipend + overtime pay for incidents

### Expectations

**Response Times**:
- **P0 (Critical)**: 15 minutes
- **P1 (High)**: 1 hour
- **P2 (Medium)**: 4 hours (during business hours)
- **P3 (Low)**: 24 hours (during business hours)

**Handoff Protocol**:
```
Monday 9am PT:
1. Outgoing engineer posts summary in #oncall:
   - Incidents handled
   - Ongoing issues
   - Upcoming maintenance
2. Incoming engineer acknowledges
3. Video call for complex issues (optional)
```

---

## Incident Response

### Incident Severity Levels

| Severity | Description | Examples | Response Time | Notification |
|----------|-------------|----------|---------------|--------------|
| **P0** | Complete outage | API down, database offline, data loss | 15 min | CTO, CEO, all engineering |
| **P1** | Partial outage | Region down, major feature broken | 1 hour | Engineering managers |
| **P2** | Degraded performance | Slow API, elevated errors | 4 hours | Team leads |
| **P3** | Minor issue | Single customer issue, cosmetic bug | 24 hours | Assigned team |

### P0 Incident Response (Critical)

**Step 1: Acknowledge Alert (0-2 minutes)**
```bash
# In PagerDuty
1. Click "Acknowledge" on alert
2. Set status to "Investigating"

# In Slack
Post in #incidents:
"🚨 P0 INCIDENT: [Brief description]
Investigating now. Updates every 15 minutes."
```

**Step 2: Create Incident War Room (2-5 minutes)**
```bash
# Automatically created by PagerDuty → Slack integration
# War room channel: #incident-2025-11-28-1430

# Join war room
/join #incident-2025-11-28-1430

# Assign roles
Incident Commander (IC): @oncall-primary
Comms Lead: @engineering-manager
Tech Lead: @backend-lead (or relevant)

# Start incident tracking document
https://docs.pros.io/incidents/2025-11-28-1430
```

**Step 3: Assess Scope (5-10 minutes)**
```bash
# Check dashboards
open https://grafana.pros.io/d/overview

# Check error rates
curl -s https://api.pros.io/health | jq .

# Check database
psql $DATABASE_URL -c "SELECT 1"

# Check recent deployments
kubectl rollout history deployment/api-gateway -n pros-production
```

**Step 4: Mitigate Impact (10-30 minutes)**

**Option A: Rollback Recent Deployment**
```bash
# Rollback to previous version
kubectl rollout undo deployment/api-gateway -n pros-production

# Verify rollback
kubectl rollout status deployment/api-gateway -n pros-production

# Monitor metrics
watch kubectl get pods -n pros-production
```

**Option B: Scale Up Resources**
```bash
# Scale up pods
kubectl scale deployment/api-gateway --replicas=100 -n pros-production

# Verify scaling
kubectl get hpa -n pros-production
```

**Option C: Failover to Secondary Region**
```bash
# Execute disaster recovery failover
cd ~/pros-workspace/infrastructure/scripts
./failover-to-us-west-2.sh

# Update DNS (Cloudflare)
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"content": "52.12.34.56"}'  # us-west-2 IP
```

**Option D: Enable Maintenance Mode**
```bash
# Enable maintenance page
kubectl apply -f k8s/maintenance-mode.yaml

# Verify
curl -I https://api.pros.io
# Should return 503 Service Unavailable
```

**Step 5: Communicate Status (Every 15 minutes)**
```
# Internal (Slack #incidents)
"Update 15min: API restored in us-west-2. Investigating root cause in us-east-1. ETA 30min."

# External (Status Page)
https://status.pros.io → Post update
"We are experiencing issues with the API. Our team is investigating. ETA: 30 minutes."

# Customers (Email - if >2 hour outage)
Subject: PRO'S Service Disruption - Update
"We are aware of and actively working to resolve service issues affecting [describe impact]..."
```

**Step 6: Root Cause Analysis (Post-Mitigation)**
```bash
# Collect logs
kubectl logs deployment/api-gateway -n pros-production --since=1h > incident-logs.txt

# Check metrics
# Download Prometheus data for time range
curl 'http://prometheus.pros.io/api/v1/query_range?query=...' > metrics.json

# Database query analysis
psql $DATABASE_URL -c "
  SELECT query, calls, total_time, mean_time
  FROM pg_stat_statements
  WHERE mean_time > 1000
  ORDER BY total_time DESC
  LIMIT 20;
" > slow-queries.txt
```

**Step 7: Resolution & Post-Mortem (After Incident)**
```
# Mark incident resolved
In PagerDuty: Status → Resolved

# Schedule post-mortem (within 48 hours)
Calendar invite: "Post-Mortem: API Outage 2025-11-28"
Attendees: IC, Tech Lead, Engineering Manager, relevant engineers

# Create post-mortem document
Template: https://docs.pros.io/post-mortem-template

Required sections:
1. Timeline
2. Root cause
3. Impact (users affected, revenue lost, SLA breach)
4. What went well
5. What went wrong
6. Action items (with owners + due dates)
```

---

## Common Runbooks

### 1. Database Connection Pool Exhaustion

**Symptoms**:
- `FATAL: remaining connection slots are reserved`
- API returns 500 errors
- Grafana shows 100% connection pool utilization

**Diagnosis**:
```sql
-- Check active connections
SELECT count(*) FROM pg_stat_activity;

-- Find long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active'
ORDER BY duration DESC;

-- Find idle connections
SELECT count(*) FROM pg_stat_activity WHERE state = 'idle';
```

**Resolution**:
```bash
# Option 1: Kill idle connections (temporary)
psql $DATABASE_URL -c "
  SELECT pg_terminate_backend(pid)
  FROM pg_stat_activity
  WHERE state = 'idle'
    AND state_change < now() - interval '5 minutes';
"

# Option 2: Increase connection pool (short-term)
kubectl set env deployment/api-gateway DATABASE_MAX_CONNECTIONS=200 -n pros-production

# Option 3: Use PgBouncer (long-term)
kubectl apply -f k8s/pgbouncer.yaml
kubectl set env deployment/api-gateway DATABASE_URL=$PGBOUNCER_URL -n pros-production
```

---

### 2. High API Latency (>500ms p95)

**Symptoms**:
- Grafana alerts: `api_latency_p95 > 500ms`
- User complaints about slow responses
- Increased error rate

**Diagnosis**:
```bash
# Check API gateway metrics
curl https://api.pros.io/metrics | grep http_request_duration

# Check slow queries
psql $DATABASE_URL -c "
  SELECT query, mean_time, calls
  FROM pg_stat_statements
  WHERE mean_time > 100
  ORDER BY mean_time DESC
  LIMIT 10;
"

# Check Redis cache hit rate
redis-cli INFO stats | grep keyspace_hits
redis-cli INFO stats | grep keyspace_misses

# Check external API latency (OpenAI, Stripe, etc.)
curl -w "@curl-format.txt" -o /dev/null -s https://api.openai.com/v1/chat/completions
```

**Resolution**:
```bash
# Option 1: Enable query caching
# Add to application config
ENABLE_QUERY_CACHE=true
CACHE_TTL=300  # 5 minutes

# Option 2: Add database indexes
psql $DATABASE_URL <<EOF
CREATE INDEX CONCURRENTLY idx_designs_user_created
  ON designs(user_id, created_at DESC);
EOF

# Option 3: Scale up API pods
kubectl scale deployment/api-gateway --replicas=100 -n pros-production

# Option 4: Enable CDN caching for static responses
# Update Cloudflare page rule: Cache Level = Cache Everything
```

---

### 3. GPU Out of Memory (OOM)

**Symptoms**:
- Render jobs failing with `CUDA out of memory`
- GPU utilization 100%
- Pods getting OOMKilled

**Diagnosis**:
```bash
# Check GPU memory usage
kubectl exec -it <render-pod> -- nvidia-smi

# Check pod resource limits
kubectl describe pod <render-pod> -n pros-production

# Check job queue depth
redis-cli LLEN render:queue:high
```

**Resolution**:
```bash
# Option 1: Reduce batch size
kubectl set env deployment/render-engine BATCH_SIZE=2 -n pros-production

# Option 2: Enable gradient checkpointing (for training)
# In training script: model.gradient_checkpointing_enable()

# Option 3: Scale up GPU nodes
eksctl scale nodegroup --cluster=pros-production --name=gpu-h100 --nodes=100

# Option 4: Clear GPU cache periodically
kubectl exec -it <render-pod> -- python -c "
import torch
torch.cuda.empty_cache()
print('GPU cache cleared')
"
```

---

### 4. Render Queue Backup (>1000 jobs)

**Symptoms**:
- Render queue depth > 1000
- User complaints about slow renders
- Grafana alert: `render_queue_depth{priority='normal'} > 1000`

**Diagnosis**:
```bash
# Check queue depths by priority
redis-cli <<EOF
LLEN render:queue:urgent
LLEN render:queue:high
LLEN render:queue:normal
LLEN render:queue:low
EOF

# Check render job throughput
# Jobs completed in last hour
redis-cli GET render:stats:completed:$(date -u +%Y%m%d%H)

# Check GPU utilization
kubectl top nodes -l gpu=h100
```

**Resolution**:
```bash
# Option 1: Scale up GPU workers
kubectl scale deployment/render-engine --replicas=100 -n pros-production

# Option 2: Prioritize urgent jobs
# Already handled by queue priority system

# Option 3: Use spot instances for overflow
eksctl create nodegroup \
  --cluster=pros-production \
  --name=gpu-spot \
  --node-type=p5.48xlarge \
  --nodes=20 \
  --spot

# Option 4: Notify users of delay
# Post on status page
curl -X POST https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents \
  -H "Authorization: OAuth ${TOKEN}" \
  -d '{
    "incident": {
      "name": "Elevated render queue times",
      "status": "investigating",
      "body": "We are experiencing higher than normal render queue depths. Renders may take longer than usual."
    }
  }'
```

---

### 5. Redis Memory Pressure

**Symptoms**:
- `redis_memory_used_percent > 90%`
- Eviction count increasing
- Cache hit rate decreasing

**Diagnosis**:
```bash
# Check memory usage
redis-cli INFO memory

# Check eviction policy
redis-cli CONFIG GET maxmemory-policy
# Should be: allkeys-lru

# Find largest keys
redis-cli --bigkeys

# Check key expiration
redis-cli TTL <key>
```

**Resolution**:
```bash
# Option 1: Flush expired keys manually
redis-cli <<EOF
SCAN 0 MATCH * COUNT 1000
# For each expired key: DEL <key>
EOF

# Option 2: Increase Redis memory
# Edit k8s/redis.yaml
resources:
  limits:
    memory: 64Gi  # Increase from 32Gi

kubectl apply -f k8s/redis.yaml

# Option 3: Reduce cache TTL
# Application config
CACHE_TTL=60  # Reduce from 300

# Option 4: Scale Redis horizontally (cluster mode)
kubectl apply -f k8s/redis-cluster.yaml  # 6-node cluster
```

---

## Routine Maintenance

### Weekly Tasks

**Monday**:
```bash
# Review incident reports from past week
open https://docs.pros.io/incidents/

# Check expiring SSL certificates
certbot certificates

# Review cost report
aws ce get-cost-and-usage --time-period Start=2025-11-22,End=2025-11-29 \
  --granularity DAILY --metrics BlendedCost
```

**Wednesday**:
```bash
# Database maintenance
psql $DATABASE_URL -c "VACUUM ANALYZE"

# Check for unused indexes
psql $DATABASE_URL -c "
  SELECT schemaname, tablename, indexname
  FROM pg_stat_user_indexes
  WHERE idx_scan = 0
    AND indexname NOT LIKE '%_pkey';
"

# Prune old Docker images
docker system prune -a -f --volumes
```

**Friday**:
```bash
# Review and merge dependabot PRs
gh pr list --label dependencies

# Update infrastructure docs
cd ~/pros-workspace/infrastructure
git pull
# Update any outdated runbooks

# Test disaster recovery
./scripts/dr-test.sh  # Non-disruptive test
```

### Monthly Tasks

**First Monday**:
```bash
# Rotate database passwords
# Use 1Password CLI
new_password=$(op item create --category=password --title="DB Password $(date +%Y-%m)")
kubectl create secret generic db-password --from-literal=password=$new_password

# Rotate API keys
./scripts/rotate-api-keys.sh
```

**Second Monday**:
```bash
# Security scan
trivy image 123456789012.dkr.ecr.us-east-1.amazonaws.com/pros-api:latest
snyk test

# Dependency updates
dependabot security update
```

**Third Monday**:
```bash
# Backup verification
# Restore latest backup to staging
./scripts/restore-backup-to-staging.sh

# Test restore
psql $STAGING_DATABASE_URL -c "SELECT count(*) FROM users"
```

**Fourth Monday**:
```bash
# Capacity planning review
# Check resource utilization trends
open https://grafana.pros.io/d/capacity-planning

# Review auto-scaling metrics
kubectl get hpa -n pros-production
```

---

## Disaster Recovery Procedures

### Scenario 1: Complete AWS Region Failure (us-east-1)

**Detection**:
- Multiple services down
- AWS Health Dashboard shows region issues
- CloudWatch alarms firing

**Response**:
```bash
# 1. Confirm region outage
aws health describe-events --filter eventTypeCategories=issue,accountSpecific

# 2. Initiate failover to us-west-2
cd ~/pros-workspace/infrastructure
./scripts/failover-to-us-west-2.sh

# This script does:
# - Updates Route53 to point to us-west-2
# - Promotes us-west-2 database replica to primary
# - Scales up us-west-2 Kubernetes cluster
# - Updates configuration

# 3. Verify services restored
curl https://api.pros.io/health
# Should return 200 from us-west-2

# 4. Communicate to users
# Post on status page, send email

# 5. Monitor us-west-2 performance
open https://grafana.pros.io/d/us-west-2-overview
```

**Recovery** (when us-east-1 restored):
```bash
# 1. Restore us-east-1 infrastructure
eksctl create cluster -f k8s/cluster-us-east-1.yaml

# 2. Replicate data from us-west-2 to us-east-1
./scripts/replicate-data-east-to-west.sh

# 3. Verify data consistency
./scripts/verify-data-consistency.sh

# 4. Gradual traffic shift (10% → 50% → 100%)
./scripts/traffic-shift.sh --from=us-west-2 --to=us-east-1 --percent=10
# Monitor for 30 minutes
./scripts/traffic-shift.sh --from=us-west-2 --to=us-east-1 --percent=50
# Monitor for 30 minutes
./scripts/traffic-shift.sh --from=us-west-2 --to=us-east-1 --percent=100

# 5. Return to normal operations
```

---

### Scenario 2: Database Corruption

**Detection**:
- Database queries failing
- Integrity check errors
- Data inconsistencies reported by users

**Response**:
```bash
# 1. Stop writes to database
kubectl scale deployment --all --replicas=0 -n pros-production

# 2. Enable maintenance mode
kubectl apply -f k8s/maintenance-mode.yaml

# 3. Identify corruption extent
psql $DATABASE_URL -c "
  SELECT schemaname, tablename, last_vacuum, last_analyze
  FROM pg_stat_user_tables;
"

# 4. Restore from backup
# Find latest clean backup
aws s3 ls s3://pros-backups/cockroach/full/ | tail -10

# Restore
cockroach sql --url $DATABASE_URL --execute="
  RESTORE DATABASE pros_production
  FROM 'https://s3://pros-backups/cockroach/full/2025-11-28-0200'
  WITH revision_history;
"

# 5. Verify data integrity
./scripts/verify-database-integrity.sh

# 6. Resume services
kubectl scale deployment --all --replicas=<original> -n pros-production
kubectl delete -f k8s/maintenance-mode.yaml
```

---

## Monitoring & Alerting

### Critical Alerts

| Alert | Threshold | Action | Runbook |
|-------|-----------|--------|---------|
| **API Down** | Uptime < 99% for 5min | Investigate immediately | API Health Check |
| **High Error Rate** | Error rate > 1% for 5min | Check logs, rollback if recent deploy | Error Rate Investigation |
| **Database Slow** | Query latency > 1s p95 | Check slow queries, add indexes | Database Performance |
| **GPU OOM** | GPU memory > 95% for 1min | Reduce batch size, scale up | GPU Memory Management |
| **Disk Full** | Disk usage > 85% | Clean up logs, increase disk | Disk Space Management |

### Non-Critical Alerts

| Alert | Threshold | Action | Runbook |
|-------|-----------|--------|---------|
| **SSL Expiring** | < 30 days | Renew certificate | SSL Management |
| **High CPU** | CPU > 80% for 15min | Investigate, scale if needed | CPU Investigation |
| **Cache Miss Rate** | < 80% hit rate for 10min | Check cache config | Cache Optimization |

---

## Appendix

### Useful Commands

```bash
# Kubernetes
alias k=kubectl
alias kgp='kubectl get pods'
alias kdp='kubectl describe pod'
alias kl='kubectl logs -f'
alias kx='kubectl exec -it'

# Docker
alias di='docker images'
alias dp='docker ps'
alias dl='docker logs -f'

# Git
alias gs='git status'
alias gl='git log --oneline --graph --decorate'
alias gp='git pull --rebase'

# AWS
alias ec2-list='aws ec2 describe-instances --query "Reservations[].Instances[].[InstanceId,State.Name,InstanceType,Tags[?Key==\`Name\`].Value|[0]]" --output table'
```

### Emergency Procedures Checklist

**When in doubt**:
1. ✅ Acknowledge alert in PagerDuty
2. ✅ Post in #incidents
3. ✅ Create war room if P0/P1
4. ✅ Assess scope (how many users affected?)
5. ✅ Mitigate first (restore service), debug later
6. ✅ Communicate every 15 minutes
7. ✅ Document everything
8. ✅ Schedule post-mortem

**Never**:
- ❌ Make changes without documenting
- ❌ Skip rollback if unsure
- ❌ Panic (you have a team!)
- ❌ Forget to update status page

---

**Document Classification**: Internal - Operations  
**Last Updated**: November 28, 2025  
**Owner**: Infrastructure Team  
**Emergency Contact**: +1-xxx-xxx-xxxx (24/7 hotline)

© 2025 PRO'S Inc. All rights reserved.
