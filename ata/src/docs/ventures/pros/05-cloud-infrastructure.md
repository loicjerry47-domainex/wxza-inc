# PRO'S Cloud Infrastructure & Deployment Architecture
## Production Infrastructure Specification

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Technical - Infrastructure Architecture  
**Cloud Provider**: AWS (Primary), Multi-cloud ready

---

## Executive Summary

PRO'S runs on a **globally distributed, multi-region cloud infrastructure** designed for:

- **99.97% uptime SLA** (achieved: 99.97% over 12 months)
- **Global low-latency** (<100ms API latency worldwide)
- **Horizontal scalability** (25K → 100K+ users)
- **Disaster recovery** (15-minute RPO, 1-hour RTO)
- **Security & compliance** (SOC 2, ISO 27001, GDPR)

### Infrastructure at a Glance

| Resource | Current | Target 2027 | Growth |
|----------|---------|-------------|--------|
| **AWS Regions** | 8 | 12 | 1.5× |
| **Availability Zones** | 24 | 36 | 1.5× |
| **Kubernetes Nodes** | 180 | 1,200 | 6.7× |
| **GPU Nodes** | 240 (H100) | 2,000 | 8.3× |
| **Total vCPUs** | 7,200 | 48,000 | 6.7× |
| **Total Memory** | 144TB | 960TB | 6.7× |
| **Storage** | 680TB | 5PB | 7.4× |
| **Network Bandwidth** | 100Gbps | 1Tbps | 10× |
| **Monthly Cost** | $420K | $2.8M | 6.7× |

---

## Global Infrastructure Map

```
┌─────────────────────────────────────────────────────────────────┐
│                     GLOBAL DEPLOYMENT MAP                       │
└─────────────────────────────────────────────────────────────────┘

🌎 AMERICAS
├─ us-east-1 (N. Virginia) ⭐ PRIMARY
│  ├─ 3 Availability Zones
│  ├─ 50 Kubernetes nodes (c7g.8xlarge)
│  ├─ 80 GPU nodes (p5.48xlarge w/ H100)
│  ├─ 3-node CockroachDB cluster
│  └─ Primary API gateway (api.pros.io)
│
├─ us-west-2 (Oregon) 🔄 SECONDARY
│  ├─ 3 Availability Zones
│  ├─ 40 Kubernetes nodes
│  ├─ 60 GPU nodes
│  └─ Disaster recovery site
│
└─ sa-east-1 (São Paulo) 🌐 LATAM
   ├─ 3 Availability Zones
   ├─ 20 Kubernetes nodes
   └─ 20 GPU nodes

🌍 EUROPE
├─ eu-west-1 (Ireland) ⭐ EMEA PRIMARY
│  ├─ 3 Availability Zones
│  ├─ 35 Kubernetes nodes
│  ├─ 50 GPU nodes
│  ├─ 3-node CockroachDB cluster
│  └─ GDPR compliance zone
│
├─ eu-central-1 (Frankfurt) 🔄 EMEA SECONDARY
│  ├─ 3 Availability Zones
│  ├─ 25 Kubernetes nodes
│  └─ 30 GPU nodes
│
└─ eu-north-1 (Stockholm) 🌐 NORDICS
   ├─ 3 Availability Zones
   └─ 10 Kubernetes nodes (sustainable energy)

🌏 ASIA-PACIFIC
├─ ap-southeast-1 (Singapore) ⭐ APAC PRIMARY
│  ├─ 3 Availability Zones
│  ├─ 30 Kubernetes nodes
│  ├─ 40 GPU nodes
│  └─ 3-node CockroachDB cluster
│
└─ ap-northeast-1 (Tokyo) 🌐 JAPAN
   ├─ 3 Availability Zones
   └─ 15 Kubernetes nodes

🌐 EDGE NETWORK
├─ 45 Cloudflare PoPs (Points of Presence)
├─ 12 AWS CloudFront distributions
└─ Global anycast (automatic routing to nearest region)

⭐ = Primary region (full stack)
🔄 = Disaster recovery site
🌐 = Regional presence (API + CDN)
```

---

## AWS Infrastructure Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                 │
│  (Web, Mobile, PRO'S Studio, PRO'S Creator, Unity SDK)          │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE (CDN + DDoS)                      │
│  • Global anycast DNS                                           │
│  • DDoS protection (L3/L4/L7)                                   │
│  • Web Application Firewall (WAF)                               │
│  • TLS termination (1.3 + ChaCha20)                             │
│  • Edge caching (static assets, API responses)                  │
│  • Rate limiting (per-IP, per-API-key)                          │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  AWS GLOBAL ACCELERATOR                         │
│  • Anycast IP addresses (2 static IPs)                          │
│  • Automatic failover (health checks)                           │
│  • TCP/UDP optimization                                         │
│  • DDoS Shield Standard (included)                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    [us-east-1]   [eu-west-1]   [ap-southeast-1]
        │              │              │
        ▼              ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LOAD BALANCER (ALB)              │
│  • TLS termination (ACM certificates)                           │
│  • HTTP/2, gRPC support                                         │
│  • Path-based routing                                           │
│  • Health checks (5s interval)                                  │
│  • Cross-zone load balancing                                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  EKS Cluster │ │  EKS Cluster │ │  EKS Cluster │
│   (us-east)  │ │  (eu-west)   │ │(ap-southeast)│
│              │ │              │ │              │
│ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
│ │ Ingress  │ │ │ │ Ingress  │ │ │ │ Ingress  │ │
│ │ (Istio)  │ │ │ │ (Istio)  │ │ │ │ (Istio)  │ │
│ └────┬─────┘ │ │ └────┬─────┘ │ │ └────┬─────┘ │
│      │       │ │      │       │ │      │       │
│      ▼       │ │      ▼       │ │      ▼       │
│ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
│ │ Services │ │ │ │ Services │ │ │ │ Services │ │
│ │ (Pods)   │ │ │ │ (Pods)   │ │ │ │ (Pods)   │ │
│ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │
└──────────────┘ └──────────────┘ └──────────────┘
        │              │              │
        └──────────────┼──────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DATA LAYER                                  │
│                                                                 │
│  ┌────────────────┐  ┌────────────┐  ┌──────────────┐         │
│  │ CockroachDB    │  │   Redis    │  │    MinIO     │         │
│  │ (9-node multi- │  │  Cluster   │  │  (S3-compat) │         │
│  │  region)       │  │  (6 nodes) │  │  (16 nodes)  │         │
│  └────────────────┘  └────────────┘  └──────────────┘         │
│                                                                 │
│  ┌────────────────┐  ┌────────────┐  ┌──────────────┐         │
│  │  TimescaleDB   │  │Elasticsearch│  │  S3 Glacier  │         │
│  │  (metrics)     │  │  (search)   │  │  (archives)  │         │
│  └────────────────┘  └────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Kubernetes (EKS) Architecture

### Cluster Configuration

```yaml
# Cluster spec (us-east-1 primary)
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: pros-production-us-east-1
  region: us-east-1
  version: "1.28"

vpc:
  cidr: 10.0.0.0/16
  nat:
    gateway: HighlyAvailable
  clusterEndpoints:
    privateAccess: true
    publicAccess: true

iam:
  withOIDC: true
  serviceAccounts:
    - metadata:
        name: cluster-autoscaler
        namespace: kube-system
      wellKnownPolicies:
        autoScaler: true
    - metadata:
        name: ebs-csi-controller-sa
        namespace: kube-system
      wellKnownPolicies:
        ebsCSIController: true
    - metadata:
        name: aws-load-balancer-controller
        namespace: kube-system
      wellKnownPolicies:
        awsLoadBalancerController: true

managedNodeGroups:
  # API & Web Workloads (ARM Graviton3)
  - name: api-arm64
    instanceType: c7g.8xlarge  # 32 vCPU, 64GB RAM
    minSize: 10
    maxSize: 100
    desiredCapacity: 50
    volumeSize: 200
    volumeType: gp3
    volumeIOPS: 16000
    volumeThroughput: 1000
    privateNetworking: true
    iam:
      withAddonPolicies:
        autoScaler: true
        cloudWatch: true
    labels:
      workload: api
      arch: arm64
    taints:
      - key: workload
        value: api
        effect: NoSchedule
    tags:
      Environment: production
      ManagedBy: eksctl
  
  # GPU Workloads (NVIDIA H100)
  - name: gpu-h100
    instanceType: p5.48xlarge  # 8× H100 80GB, 192 vCPU, 2TB RAM
    minSize: 20
    maxSize: 100
    desiredCapacity: 80
    volumeSize: 2000
    volumeType: gp3
    ami: ami-0a1b2c3d4e5f67890  # EKS optimized AMI with GPU drivers
    privateNetworking: true
    labels:
      workload: render
      gpu: h100
      nvidia.com/gpu: "true"
    taints:
      - key: nvidia.com/gpu
        value: "true"
        effect: NoSchedule
    preBootstrapCommands:
      - "sudo nvidia-smi -pm 1"  # Enable persistence mode
      - "sudo nvidia-smi -ac 1593,1980"  # Set clock speeds

  # Database & Stateful Workloads
  - name: database
    instanceType: r7g.16xlarge  # 64 vCPU, 512GB RAM (Graviton3)
    minSize: 3
    maxSize: 9
    desiredCapacity: 9
    volumeSize: 5000
    volumeType: io2
    volumeIOPS: 64000
    privateNetworking: true
    labels:
      workload: database
      arch: arm64
    taints:
      - key: workload
        value: database
        effect: NoSchedule

cloudWatch:
  clusterLogging:
    enableTypes: ["api", "audit", "authenticator", "controllerManager", "scheduler"]
```

### Node Autoscaling

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: api-gateway-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
      - containerName: "*"
        minAllowed:
          cpu: 500m
          memory: 512Mi
        maxAllowed:
          cpu: 8000m
          memory: 16Gi

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  minReplicas: 10
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
        - type: Pods
          value: 10
          periodSeconds: 30
      selectPolicy: Max
```

---

## Service Mesh (Istio)

### Istio Configuration

```yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  name: pros-istio
spec:
  profile: production
  
  meshConfig:
    # Telemetry
    accessLogFile: /dev/stdout
    accessLogEncoding: JSON
    
    # Tracing
    enableTracing: true
    defaultConfig:
      tracing:
        sampling: 1.0  # 100% sampling for demo, 1% in prod
        zipkin:
          address: jaeger-collector.observability:9411
    
    # mTLS
    outboundTrafficPolicy:
      mode: REGISTRY_ONLY
    
  components:
    # Ingress Gateway
    ingressGateways:
      - name: istio-ingressgateway
        enabled: true
        k8s:
          serviceAnnotations:
            service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
            service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
          resources:
            requests:
              cpu: 2000m
              memory: 4Gi
            limits:
              cpu: 4000m
              memory: 8Gi
          hpaSpec:
            minReplicas: 3
            maxReplicas: 20
            metrics:
              - type: Resource
                resource:
                  name: cpu
                  targetAverageUtilization: 80
    
    # Egress Gateway
    egressGateways:
      - name: istio-egressgateway
        enabled: true
        k8s:
          resources:
            requests:
              cpu: 1000m
              memory: 2Gi
    
    # Pilot (control plane)
    pilot:
      k8s:
        resources:
          requests:
            cpu: 2000m
            memory: 4Gi
        hpaSpec:
          minReplicas: 3
          maxReplicas: 10

  values:
    global:
      # Multi-cluster setup
      multiCluster:
        clusterName: pros-us-east-1
      
      # Proxy settings
      proxy:
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 2000m
            memory: 1Gi
      
      # mTLS
      mtls:
        auto: true
```

### Traffic Management

```yaml
# VirtualService for API routing
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api-gateway
spec:
  hosts:
    - api.pros.io
  gateways:
    - istio-ingressgateway
  http:
    # Canary deployment (10% to v2)
    - match:
        - headers:
            x-api-version:
              exact: "v2"
      route:
        - destination:
            host: api-gateway
            subset: v2
          weight: 100
    
    - match:
        - uri:
            prefix: "/v2/"
      route:
        - destination:
            host: api-gateway
            subset: v2
          weight: 10
        - destination:
            host: api-gateway
            subset: v1
          weight: 90
      timeout: 30s
      retries:
        attempts: 3
        perTryTimeout: 10s
        retryOn: 5xx,reset,refused-stream

---
# DestinationRule for circuit breaking
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: api-gateway
spec:
  host: api-gateway
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 1000
      http:
        http1MaxPendingRequests: 100
        http2MaxRequests: 1000
        maxRequestsPerConnection: 10
    outlierDetection:
      consecutiveErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
      minHealthPercent: 30
    loadBalancer:
      simple: LEAST_REQUEST
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
```

---

## CI/CD Pipeline (ArgoCD + GitHub Actions)

### GitHub Actions Workflow

```yaml
name: Build & Deploy to Production

on:
  push:
    branches:
      - main
    paths:
      - 'services/**'
      - 'k8s/**'

env:
  AWS_REGION: us-east-1
  ECR_REGISTRY: 123456789012.dkr.ecr.us-east-1.amazonaws.com
  EKS_CLUSTER: pros-production-us-east-1

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service:
          - api-gateway
          - render-engine
          - ai-service
          - collab-server
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActions
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: ./services/${{ matrix.service }}
          file: ./services/${{ matrix.service }}/Dockerfile
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ${{ env.ECR_REGISTRY }}/pros-${{ matrix.service }}:${{ github.sha }}
            ${{ env.ECR_REGISTRY }}/pros-${{ matrix.service }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            VERSION=${{ github.sha }}
            BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
      
      - name: Run Trivy security scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.ECR_REGISTRY }}/pros-${{ matrix.service }}:${{ github.sha }}
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Update Kubernetes manifests
        run: |
          cd k8s/overlays/production
          kustomize edit set image \
            ${{ env.ECR_REGISTRY }}/pros-${{ matrix.service }}=${{ env.ECR_REGISTRY }}/pros-${{ matrix.service }}:${{ github.sha }}
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Update ${{ matrix.service }} to ${{ github.sha }}"
          git push

  deploy:
    needs: build
    runs-on: ubuntu-latest
    
    steps:
      - name: Trigger ArgoCD sync
        run: |
          argocd app sync pros-production \
            --auth-token ${{ secrets.ARGOCD_TOKEN }} \
            --server argocd.pros.io \
            --grpc-web
      
      - name: Wait for deployment
        run: |
          argocd app wait pros-production \
            --auth-token ${{ secrets.ARGOCD_TOKEN }} \
            --server argocd.pros.io \
            --timeout 600

  smoke-test:
    needs: deploy
    runs-on: ubuntu-latest
    
    steps:
      - name: Run smoke tests
        run: |
          curl -f https://api.pros.io/health || exit 1
          curl -f https://api.pros.io/v2/health || exit 1
      
      - name: Notify Slack on success
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "✅ Deployment to production successful!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deployment Successful*\nCommit: `${{ github.sha }}`\nAuthor: ${{ github.actor }}"
                  }
                }
              ]
            }
      
      - name: Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "❌ Deployment to production FAILED!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deployment Failed*\nCommit: `${{ github.sha }}`\nAuthor: ${{ github.actor }}\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Logs>"
                  }
                }
              ]
            }
```

### ArgoCD Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: pros-production
  namespace: argocd
spec:
  project: production
  
  source:
    repoURL: https://github.com/pros-platform/infrastructure
    targetRevision: main
    path: k8s/overlays/production
    kustomize:
      version: v5.0.0
  
  destination:
    server: https://kubernetes.default.svc
    namespace: pros-production
  
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  
  revisionHistoryLimit: 10
  
  # Health checks
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas  # Ignore replicas (managed by HPA)
```

---

## Observability Stack

### Prometheus Configuration

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: observability
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
      external_labels:
        cluster: pros-us-east-1
        region: us-east-1
    
    # Alert manager
    alerting:
      alertmanagers:
        - static_configs:
            - targets:
                - alertmanager:9093
    
    # Scrape configs
    scrape_configs:
      # Kubernetes API server
      - job_name: 'kubernetes-apiservers'
        kubernetes_sd_configs:
          - role: endpoints
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs:
          - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
            action: keep
            regex: default;kubernetes;https
      
      # Nodes
      - job_name: 'kubernetes-nodes'
        kubernetes_sd_configs:
          - role: node
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs:
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
      
      # Pods
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
            action: replace
            regex: ([^:]+)(?::\d+)?;(\d+)
            replacement: $1:$2
            target_label: __address__
      
      # Istio telemetry
      - job_name: 'istio-mesh'
        kubernetes_sd_configs:
          - role: endpoints
            namespaces:
              names:
                - istio-system
        relabel_configs:
          - source_labels: [__meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
            action: keep
            regex: istio-telemetry;prometheus
      
      # GPU metrics (NVIDIA DCGM)
      - job_name: 'gpu-metrics'
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_label_gpu]
            action: keep
            regex: h100
          - source_labels: [__address__]
            action: replace
            regex: ([^:]+)(?::\d+)?
            replacement: $1:9400
            target_label: __address__
```

### Grafana Dashboards

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboards
  namespace: observability
data:
  pros-overview.json: |
    {
      "dashboard": {
        "title": "PRO'S Production Overview",
        "panels": [
          {
            "title": "Request Rate (req/s)",
            "targets": [
              {
                "expr": "sum(rate(istio_requests_total[5m]))"
              }
            ]
          },
          {
            "title": "Error Rate (%)",
            "targets": [
              {
                "expr": "sum(rate(istio_requests_total{response_code=~\"5..\"}[5m])) / sum(rate(istio_requests_total[5m])) * 100"
              }
            ]
          },
          {
            "title": "P95 Latency (ms)",
            "targets": [
              {
                "expr": "histogram_quantile(0.95, sum(rate(istio_request_duration_milliseconds_bucket[5m])) by (le))"
              }
            ]
          },
          {
            "title": "Active Collaboration Sessions",
            "targets": [
              {
                "expr": "sum(pros_collaboration_sessions_active)"
              }
            ]
          },
          {
            "title": "GPU Utilization (%)",
            "targets": [
              {
                "expr": "avg(DCGM_FI_DEV_GPU_UTIL)"
              }
            ]
          },
          {
            "title": "Render Queue Depth",
            "targets": [
              {
                "expr": "sum(pros_render_queue_depth) by (priority)"
              }
            ]
          }
        ]
      }
    }
```

---

## Disaster Recovery Plan

### Backup Strategy

```bash
#!/bin/bash
# Daily backup script (runs via CronJob)

# CockroachDB backup
cockroach sql --execute="
  BACKUP DATABASE pros_production
  TO 's3://pros-backups/cockroach/daily/$(date +%Y%m%d)?AWS_ACCESS_KEY_ID=${AWS_KEY}&AWS_SECRET_ACCESS_KEY=${AWS_SECRET}'
  WITH revision_history;
"

# Redis backup (RDB snapshot)
redis-cli --rdb /backup/redis-$(date +%Y%m%d).rdb

# MinIO backup (cross-region replication already handles this)
mc mirror --overwrite pros-primary/designs pros-dr-replica/designs

# Kubernetes etcd backup
ETCDCTL_API=3 etcdctl snapshot save \
  /backup/etcd-$(date +%Y%m%d).db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# Upload to S3 Glacier
aws s3 cp /backup/ s3://pros-backups/$(date +%Y%m%d)/ \
  --recursive \
  --storage-class GLACIER
```

### RTO/RPO Targets

| Component | RPO (Recovery Point Objective) | RTO (Recovery Time Objective) |
|-----------|-------------------------------|------------------------------|
| **CockroachDB** | 15 minutes (incremental backups) | 1 hour (restore from backup) |
| **Redis** | 1 second (AOF) | 5 minutes (replica promotion) |
| **MinIO** | 0 seconds (cross-region replication) | 0 seconds (automatic failover) |
| **Kubernetes** | 1 minute (etcd snapshots) | 30 minutes (cluster rebuild) |
| **Application** | 0 seconds (GitOps) | 5 minutes (ArgoCD sync) |

### Failover Procedure

```bash
#!/bin/bash
# Disaster recovery failover script

echo "🚨 INITIATING DISASTER RECOVERY FAILOVER"
echo "Primary region: us-east-1"
echo "Failover target: us-west-2"

# 1. Update DNS (Cloudflare)
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "content": "52.12.34.56",
    "comment": "Failover to us-west-2 at $(date)"
  }'

# 2. Promote read replica to primary (CockroachDB)
cockroach sql --host=us-west-2-lb --execute="
  ALTER DATABASE pros_production SET PRIMARY REGION 'us-west-2';
"

# 3. Promote Redis replica to master
redis-cli -h redis-us-west-2 REPLICAOF NO ONE

# 4. Update load balancer targets
aws elbv2 modify-target-group \
  --target-group-arn ${TG_ARN} \
  --health-check-enabled \
  --matcher HttpCode=200-299

# 5. Scale up us-west-2 cluster
kubectl scale deployment api-gateway --replicas=50 -n pros-production
kubectl scale deployment render-engine --replicas=80 -n pros-production

# 6. Verify health
curl -f https://api.pros.io/health || exit 1

echo "✅ Failover complete. us-west-2 is now primary."
```

---

## Cost Optimization

### Current Monthly Costs (November 2025)

| Resource | Monthly Cost | % of Total |
|----------|-------------|------------|
| **EC2 (Compute)** | $180,000 | 42.9% |
| **GPU Instances (p5.48xlarge)** | $120,000 | 28.6% |
| **Data Transfer** | $45,000 | 10.7% |
| **S3/MinIO Storage** | $32,000 | 7.6% |
| **RDS/Database** | $25,000 | 6.0% |
| **CloudFront/CDN** | $10,000 | 2.4% |
| **VPC/Networking** | $5,000 | 1.2% |
| **Other (KMS, Secrets, Logs)** | $3,000 | 0.7% |
| **TOTAL** | **$420,000** | **100%** |

### Cost Optimization Strategies

```terraform
# Use Spot Instances for render jobs (60% savings)
resource "aws_eks_node_group" "render_spot" {
  cluster_name    = aws_eks_cluster.pros.name
  node_group_name = "render-spot"
  node_role_arn   = aws_iam_role.eks_node.arn
  subnet_ids      = aws_subnet.private[*].id

  capacity_type  = "SPOT"
  instance_types = ["p5.48xlarge", "p4d.24xlarge"]

  scaling_config {
    desired_size = 40
    max_size     = 100
    min_size     = 20
  }

  # Spot instance interruption handling
  lifecycle {
    ignore_changes = [scaling_config[0].desired_size]
  }

  tags = {
    "k8s.io/cluster-autoscaler/enabled" = "true"
    "k8s.io/cluster-autoscaler/pros-production" = "owned"
  }
}

# S3 Intelligent-Tiering (automatic cost optimization)
resource "aws_s3_bucket_intelligent_tiering_configuration" "designs" {
  bucket = aws_s3_bucket.designs.id
  name   = "EntireBucket"

  tiering {
    access_tier = "ARCHIVE_ACCESS"
    days        = 90
  }

  tiering {
    access_tier = "DEEP_ARCHIVE_ACCESS"
    days        = 180
  }
}

# Reserved Instances for baseline capacity (70% savings)
resource "aws_ec2_instance" "reserved" {
  # Purchase 1-year or 3-year reserved instances
  # for baseline load (50% of capacity)
}
```

---

**Document Classification**: Technical - Cloud Infrastructure  
**Last Updated**: November 28, 2025  
**Next Review**: February 28, 2026  
**Owner**: Infrastructure Engineering Team  
**Approved By**: Marcus Chen (CTO)

© 2025 PRO'S Inc. All rights reserved. Confidential and proprietary.
