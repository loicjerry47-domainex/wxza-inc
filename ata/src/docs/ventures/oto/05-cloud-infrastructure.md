# OTO - Cloud Infrastructure
## Multi-Cloud Kubernetes Architecture

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 50 minutes

---

## Executive Summary

OTO operates on a **multi-cloud architecture** spanning **AWS** (primary) and **GCP** (ML workloads), with **300+ Kubernetes nodes** across **3 regions** (us-east-1, us-west-2, eu-west-1). Infrastructure handles **50M+ daily events**, **5M API requests/hour**, and maintains **99.95% uptime** through auto-scaling, disaster recovery, and comprehensive monitoring.

---

## Table of Contents

1. [Infrastructure Overview](#1-infrastructure-overview)
2. [Kubernetes Architecture](#2-kubernetes-architecture)
3. [CI/CD Pipeline](#3-cicd-pipeline)
4. [Auto-Scaling Strategies](#4-auto-scaling-strategies)
5. [Disaster Recovery](#5-disaster-recovery)
6. [Monitoring & Observability](#6-monitoring--observability)

---

## 1. Infrastructure Overview

### 1.1 Multi-Cloud Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      AWS (PRIMARY)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   us-east-1    │  │   us-west-2    │  │   eu-west-1    │   │
│  │   (Primary)    │  │   (Failover)   │  │   (GDPR)       │   │
│  ├────────────────┤  ├────────────────┤  ├────────────────┤   │
│  │ EKS: 150 nodes │  │ EKS: 100 nodes │  │ EKS: 50 nodes  │   │
│  │ RDS: Postgres  │  │ RDS: Replica   │  │ RDS: Replica   │   │
│  │ ElastiCache    │  │ ElastiCache    │  │ ElastiCache    │   │
│  │ Neo4j Aura     │  │ Neo4j Replica  │  │ Neo4j Replica  │   │
│  │ InfluxDB Cloud │  │ InfluxDB Rep   │  │ InfluxDB Rep   │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           SHARED SERVICES (us-east-1)                     │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ • CloudFront CDN (50+ edge locations)                    │  │
│  │ • Route 53 (DNS, health checks, failover)                │  │
│  │ • S3 (gift images, user uploads, backups)                │  │
│  │ • SES (email notifications)                              │  │
│  │ • SNS/SQS (async messaging)                              │  │
│  │ • Secrets Manager (API keys, DB passwords)               │  │
│  │ • CloudWatch (logs, metrics, alarms)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      GCP (ML WORKLOADS)                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐ │
│  │   us-central1 (ML Training & Inference)                    │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │ • GKE: 20 GPU nodes (NVIDIA A100)                          │ │
│  │ • Vertex AI (model training, serving)                      │ │
│  │ • Cloud Storage (training data, models)                    │ │
│  │ • BigQuery (analytics, feature engineering)                │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Infrastructure Statistics

| Resource | Count | Capacity |
|----------|-------|----------|
| **Total Kubernetes Nodes** | 320 | 1,280 vCPUs, 5.1 TB RAM |
| **AWS EKS Clusters** | 3 | us-east-1, us-west-2, eu-west-1 |
| **GCP GKE Clusters** | 1 | us-central1 (GPU workloads) |
| **RDS PostgreSQL** | 3 | 1 primary + 2 read replicas |
| **ElastiCache Redis** | 6 | 3 primaries + 3 replicas |
| **Neo4j Aura** | 3 | 1 primary + 2 read replicas |
| **InfluxDB Cloud** | 3 | 1 primary + 2 replicas |
| **S3 Buckets** | 8 | 850 TB storage |
| **CloudFront Distributions** | 3 | 50+ edge locations |
| **Total Monthly Cost** | - | ~$285K USD |

### 1.3 Traffic Distribution

| Region | Traffic % | Monthly Requests |
|--------|-----------|------------------|
| **us-east-1** | 60% | 2.7B requests |
| **us-west-2** | 25% | 1.1B requests |
| **eu-west-1** | 15% | 675M requests |
| **Total** | 100% | **4.5B requests/month** |

---

## 2. Kubernetes Architecture

### 2.1 EKS Cluster Configuration (us-east-1)

```yaml
# eks-cluster-config.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: oto-production-us-east-1
  region: us-east-1
  version: "1.28"

vpc:
  cidr: 10.0.0.0/16
  nat:
    gateway: HighlyAvailable

managedNodeGroups:
  # General workloads
  - name: general-purpose
    instanceType: m6i.2xlarge
    minSize: 30
    maxSize: 100
    desiredCapacity: 50
    volumeSize: 100
    volumeType: gp3
    labels:
      workload: general
    taints:
      - key: workload
        value: general
        effect: NoSchedule

  # High-memory workloads (databases)
  - name: high-memory
    instanceType: r6i.4xlarge
    minSize: 10
    maxSize: 30
    desiredCapacity: 15
    volumeSize: 200
    volumeType: gp3
    labels:
      workload: database
    taints:
      - key: workload
        value: database
        effect: NoSchedule

  # Compute-intensive (ML inference)
  - name: compute-optimized
    instanceType: c6i.8xlarge
    minSize: 5
    maxSize: 20
    desiredCapacity: 10
    volumeSize: 150
    volumeType: gp3
    labels:
      workload: ml-inference
    taints:
      - key: workload
        value: ml-inference
        effect: NoSchedule

addons:
  - name: vpc-cni
  - name: coredns
  - name: kube-proxy
  - name: aws-ebs-csi-driver
  - name: aws-efs-csi-driver

iam:
  withOIDC: true
  serviceAccounts:
    - metadata:
        name: aws-load-balancer-controller
        namespace: kube-system
      attachPolicyARNs:
        - arn:aws:iam::aws:policy/AWSLoadBalancerControllerPolicy
    - metadata:
        name: external-secrets
        namespace: external-secrets-system
      attachPolicyARNs:
        - arn:aws:iam::123456789:policy/ExternalSecretsPolicy
```

### 2.2 Namespace Organization

```yaml
# Namespaces by environment and service type
kubectl get namespaces

NAME                     STATUS
production               Active   # Production services
staging                  Active   # Staging environment
development              Active   # Dev environment
monitoring               Active   # Prometheus, Grafana
logging                  Active   # Loki, Promtail
database                 Active   # Neo4j, InfluxDB operators
messaging                Active   # Kafka, RabbitMQ
external-secrets-system  Active   # External Secrets Operator
cert-manager             Active   # TLS certificate management
ingress-nginx            Active   # Ingress controller
```

### 2.3 Service Deployments

#### API Gateway Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  namespace: production
spec:
  replicas: 10
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
        version: v1.2.5
    spec:
      containers:
      - name: kong
        image: kong:3.4
        ports:
        - containerPort: 8000
          name: proxy
        - containerPort: 8001
          name: admin
        env:
        - name: KONG_DATABASE
          value: "postgres"
        - name: KONG_PG_HOST
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: host
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /status
            port: 8001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /status
            port: 8001
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
  namespace: production
spec:
  type: LoadBalancer
  selector:
    app: api-gateway
  ports:
  - port: 80
    targetPort: 8000
    name: http
  - port: 443
    targetPort: 8443
    name: https
```

#### Contact Service Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: contact-service
  namespace: production
spec:
  replicas: 15
  selector:
    matchLabels:
      app: contact-service
  template:
    metadata:
      labels:
        app: contact-service
        version: v2.1.8
    spec:
      containers:
      - name: contact-service
        image: oto-ai/contact-service:v2.1.8
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEO4J_URI
          valueFrom:
            secretKeyRef:
              name: neo4j-credentials
              key: uri
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-credentials
              key: url
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: contact-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: contact-service
  minReplicas: 10
  maxReplicas: 50
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

### 2.4 StatefulSet for Kafka

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: kafka
  namespace: messaging
spec:
  serviceName: kafka-headless
  replicas: 6
  selector:
    matchLabels:
      app: kafka
  template:
    metadata:
      labels:
        app: kafka
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - kafka
            topologyKey: kubernetes.io/hostname
      containers:
      - name: kafka
        image: confluentinc/cp-kafka:7.5.0
        ports:
        - containerPort: 9092
          name: client
        - containerPort: 9093
          name: internal
        env:
        - name: KAFKA_BROKER_ID
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: KAFKA_ZOOKEEPER_CONNECT
          value: "zookeeper-0.zookeeper-headless:2181,zookeeper-1.zookeeper-headless:2181,zookeeper-2.zookeeper-headless:2181"
        - name: KAFKA_LISTENERS
          value: "PLAINTEXT://:9092,INTERNAL://:9093"
        - name: KAFKA_ADVERTISED_LISTENERS
          value: "PLAINTEXT://$(POD_NAME).kafka-headless:9092,INTERNAL://$(POD_NAME).kafka-headless:9093"
        volumeMounts:
        - name: kafka-data
          mountPath: /var/lib/kafka/data
        resources:
          requests:
            memory: "4Gi"
            cpu: "2000m"
          limits:
            memory: "8Gi"
            cpu: "4000m"
  volumeClaimTemplates:
  - metadata:
      name: kafka-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: gp3
      resources:
        requests:
          storage: 500Gi
```

---

## 3. CI/CD Pipeline

### 3.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AWS_REGION: us-east-1
  EKS_CLUSTER: oto-production-us-east-1

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/contact-service:$IMAGE_TAG .
          docker push $ECR_REGISTRY/contact-service:$IMAGE_TAG
          docker tag $ECR_REGISTRY/contact-service:$IMAGE_TAG $ECR_REGISTRY/contact-service:latest
          docker push $ECR_REGISTRY/contact-service:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Update kubeconfig
        run: |
          aws eks update-kubeconfig --name ${{ env.EKS_CLUSTER }} --region ${{ env.AWS_REGION }}
      
      - name: Deploy to Kubernetes (ArgoCD)
        run: |
          kubectl apply -f k8s/contact-service/deployment.yaml
          kubectl rollout status deployment/contact-service -n production
      
      - name: Verify deployment
        run: |
          kubectl get pods -n production -l app=contact-service
          kubectl logs -n production -l app=contact-service --tail=50
```

### 3.2 ArgoCD GitOps

```yaml
# argocd-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: contact-service
  namespace: argocd
spec:
  project: production
  source:
    repoURL: https://github.com/oto-ai/infrastructure
    targetRevision: main
    path: k8s/contact-service
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
  revisionHistoryLimit: 10
```

### 3.3 Deployment Frequency

| Metric | Value |
|--------|-------|
| **Deployments per Day** | 50-80 |
| **Average Deploy Time** | 8 minutes |
| **Rollback Time** | <2 minutes |
| **Success Rate** | 98.7% |
| **Lead Time (commit → production)** | <30 minutes |

---

## 4. Auto-Scaling Strategies

### 4.1 Horizontal Pod Autoscaler (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: contact-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: contact-service
  minReplicas: 10
  maxReplicas: 50
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
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 30
```

### 4.2 Cluster Autoscaler

```yaml
# cluster-autoscaler-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
      - name: cluster-autoscaler
        image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.28.0
        command:
        - ./cluster-autoscaler
        - --cloud-provider=aws
        - --namespace=kube-system
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/oto-production-us-east-1
        - --balance-similar-node-groups
        - --skip-nodes-with-system-pods=false
        - --scale-down-delay-after-add=10m
        - --scale-down-unneeded-time=10m
        resources:
          requests:
            cpu: 100m
            memory: 300Mi
          limits:
            cpu: 100m
            memory: 300Mi
```

### 4.3 Karpenter (Node Autoscaler)

```yaml
# karpenter-provisioner.yaml
apiVersion: karpenter.sh/v1alpha5
kind: Provisioner
metadata:
  name: default
spec:
  requirements:
    - key: karpenter.sh/capacity-type
      operator: In
      values: ["spot", "on-demand"]
    - key: node.kubernetes.io/instance-type
      operator: In
      values: ["m6i.2xlarge", "m6i.4xlarge", "r6i.4xlarge", "c6i.8xlarge"]
  limits:
    resources:
      cpu: 1000
      memory: 4000Gi
  providerRef:
    name: default
  ttlSecondsAfterEmpty: 30
  ttlSecondsUntilExpired: 604800 # 7 days
```

---

## 5. Disaster Recovery

### 5.1 Backup Strategy

**Database Backups:**
```bash
# PostgreSQL (RDS)
- Automated snapshots: Every 6 hours
- Retention: 30 days
- Cross-region replication: us-west-2

# Neo4j
- Automated backups: Daily
- Retention: 30 days
- Backup to S3: s3://oto-backups/neo4j/

# InfluxDB
- Continuous backups: Hourly
- Retention: 90 days
- Backup to S3: s3://oto-backups/influxdb/
```

**Application Backups:**
```bash
# Kubernetes etcd
velero backup create oto-production-backup \
  --include-namespaces production,staging \
  --storage-location aws \
  --volume-snapshot-locations aws \
  --ttl 720h

# S3 versioning
aws s3api put-bucket-versioning \
  --bucket oto-user-uploads \
  --versioning-configuration Status=Enabled

# Cross-region replication
aws s3api put-bucket-replication \
  --bucket oto-user-uploads \
  --replication-configuration file://replication.json
```

### 5.2 Disaster Recovery Plan

| Disaster Scenario | RTO | RPO | Recovery Steps |
|------------------|-----|-----|----------------|
| **Single AZ failure** | 5 min | 0 | Auto-failover to other AZs |
| **Regional failure** | 30 min | 5 min | Failover to us-west-2, update DNS |
| **Database corruption** | 2 hours | 6 hours | Restore from latest snapshot |
| **Complete AWS outage** | 4 hours | 1 hour | Failover to GCP (manual) |
| **Ransomware attack** | 12 hours | 24 hours | Restore from immutable backups |

### 5.3 Failover Procedure

```bash
# Regional failover (us-east-1 → us-west-2)

# 1. Update Route 53 health checks
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch file://failover-dns.json

# 2. Promote read replica to primary
aws rds promote-read-replica \
  --db-instance-identifier oto-production-us-west-2

# 3. Update application config
kubectl set env deployment/contact-service \
  -n production \
  DATABASE_HOST=oto-production-us-west-2.rds.amazonaws.com

# 4. Scale up us-west-2 cluster
kubectl scale deployment contact-service \
  -n production \
  --replicas=30

# 5. Verify traffic routing
curl -I https://api.oto.ai/health
# Should return 200 OK from us-west-2
```

---

## 6. Monitoring & Observability

### 6.1 Prometheus Metrics

```yaml
# prometheus-config.yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
    - role: endpoints
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

  - job_name: 'kubernetes-nodes'
    kubernetes_sd_configs:
    - role: node
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
    relabel_configs:
    - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
      action: keep
      regex: true
```

### 6.2 Grafana Dashboards

**Key Dashboards:**
1. **Cluster Overview** - Node health, resource usage
2. **API Performance** - Request rate, latency, errors
3. **Database Metrics** - Query performance, connections
4. **Business Metrics** - Active users, interactions/sec, health score updates
5. **Cost Dashboard** - AWS spend by service

### 6.3 Logging (Loki)

```yaml
# promtail-config.yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: kubernetes-pods
    kubernetes_sd_configs:
    - role: pod
    relabel_configs:
    - source_labels: [__meta_kubernetes_pod_node_name]
      target_label: node_name
    - source_labels: [__meta_kubernetes_namespace]
      target_label: namespace
    - source_labels: [__meta_kubernetes_pod_name]
      target_label: pod
    - source_labels: [__meta_kubernetes_pod_container_name]
      target_label: container
```

### 6.4 Distributed Tracing (Jaeger)

**Trace Collection:**
- **Traces per day:** 10M+
- **Retention:** 7 days
- **Sampling rate:** 1% (100% for errors)

**Example Trace:**
```
GET /contacts/cnt_7xk2p9mz (152ms total)
├─ api-gateway (12ms)
├─ contact-service (85ms)
│  ├─ neo4j query (45ms)
│  └─ redis cache miss (8ms)
├─ sentiment-analysis (32ms)
└─ health-score-update (23ms)
```

### 6.5 Alerting Rules

```yaml
# prometheus-alerts.yaml
groups:
  - name: oto-alerts
    rules:
    - alert: HighErrorRate
      expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "High error rate detected"
        description: "Error rate is {{ $value }} (> 5%)"

    - alert: PodCrashLooping
      expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Pod {{ $labels.pod }} is crash looping"

    - alert: DatabaseConnectionsHigh
      expr: pg_stat_database_numbackends > 800
      for: 10m
      labels:
        severity: warning
      annotations:
        summary: "PostgreSQL connections high: {{ $value }}/1000"
```

---

## Conclusion

OTO's cloud infrastructure leverages **multi-cloud Kubernetes** (AWS EKS + GCP GKE) across **320 nodes** and **3 regions**, achieving **99.95% uptime**, **50M+ daily events**, and **<30 minute deploy times** through automated scaling, GitOps, and comprehensive monitoring.

**Next:** [Security & Compliance](./06-security-compliance.md)

---

**© 2025 OTO AI Inc. All rights reserved.**
