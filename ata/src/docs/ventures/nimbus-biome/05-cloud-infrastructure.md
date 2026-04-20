# NIMBUS BIOME - Cloud Infrastructure
## AWS Architecture, IoT Core, Edge Computing & Kubernetes Deployment

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Technical Architecture - Infrastructure  
**Reading Time:** 50 minutes

---

## Executive Summary

NIMBUS BIOME's cloud infrastructure is a **globally distributed, multi-region AWS architecture** supporting **2,500 buildings**, **125 million active sensors**, and **100 million+ data points per hour**. Our infrastructure delivers **99.97% uptime**, **42ms p95 API latency**, and automatic scaling from **10 to 10,000+ requests per second**.

### Infrastructure Highlights

| Component | Specification | Scale |
|-----------|--------------|-------|
| **Cloud Provider** | AWS (primary), Multi-cloud capable | 8 regions globally |
| **Container Orchestration** | Amazon EKS (Kubernetes 1.28) | 500 nodes, 5,000+ pods |
| **IoT Platform** | AWS IoT Core + Greengrass | 125M devices, 2,500 edge nodes |
| **Compute** | EC2 (m6i, c6i, r6i instances) | 180 nodes (current), 1,200 (capacity) |
| **Database** | RDS, InfluxDB Cloud, ElastiCache | Multi-AZ, read replicas |
| **Storage** | S3, EBS, EFS | 680TB+ (S3), 50TB (EBS) |
| **CDN** | CloudFront + Cloudflare | 45 edge locations |
| **Monitoring** | Prometheus, Grafana, CloudWatch | 10M time-series metrics |

### Performance Metrics

| Metric | Value | SLA |
|--------|-------|-----|
| **API Uptime** | 99.97% | 99.95% |
| **API Latency (p95)** | 42ms | <100ms |
| **Data Ingestion** | 100M+ points/hour | No limit |
| **Device Connectivity** | 99.98% | 99.9% |
| **Recovery Time (RTO)** | 30 minutes | <1 hour |
| **Recovery Point (RPO)** | 5 minutes | <15 minutes |

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [AWS IoT Core & Device Management](#2-aws-iot-core--device-management)
3. [Edge Computing (AWS IoT Greengrass)](#3-edge-computing-aws-iot-greengrass)
4. [Kubernetes Cluster (Amazon EKS)](#4-kubernetes-cluster-amazon-eks)
5. [Compute Resources](#5-compute-resources)
6. [Networking & Load Balancing](#6-networking--load-balancing)
7. [Data Storage & Databases](#7-data-storage--databases)
8. [Monitoring & Observability](#8-monitoring--observability)
9. [Security & Compliance](#9-security--compliance)
10. [Cost Optimization](#10-cost-optimization)

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     GLOBAL ARCHITECTURE                              │
│  8 AWS Regions: us-east-1, us-west-2, eu-west-1, eu-central-1,     │
│                 ap-southeast-1, ap-northeast-1, ap-south-1, ca-central-1│
└─────────────────────────────────────────────────────────────────────┘

┌────────────────────── EDGE LAYER ───────────────────────────────────┐
│  • 2,500 Buildings (on-premises edge nodes)                          │
│  • AWS IoT Greengrass (Raspberry Pi 4 / Intel NUC)                  │
│  • 125M sensors → 50,000 sensors/building                            │
│  • Local ML inference, data buffering                                │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ TLS 1.3 / MQTT / HTTPS
┌──────────────────────────▼──────────────────────────────────────────┐
│                    AWS IOT CORE                                      │
│  • Device registry (125M devices)                                    │
│  • MQTT broker (1M messages/sec)                                     │
│  • Rules Engine (message routing)                                    │
│  • Device shadows (state management)                                 │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
       ┌───────────────────┴────────────────┬─────────────────────────┐
       │                                    │                         │
┌──────▼──────┐                  ┌─────────▼────────┐     ┌─────────▼────────┐
│ Kinesis     │                  │ Lambda           │     │ DynamoDB         │
│ Firehose    │                  │ (Event           │     │ (Device          │
│ (Streaming) │                  │ Processing)      │     │  State)          │
└──────┬──────┘                  └──────────────────┘     └──────────────────┘
       │
┌──────▼──────────────────────────────────────────────────────────────┐
│                    AMAZON EKS CLUSTER                                │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  KUBERNETES WORKLOADS (500 nodes, 5,000 pods)                  │ │
│  │                                                                 │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │ │
│  │  │ API       │  │ Ingestion │  │ ML        │  │ Analytics │  │ │
│  │  │ Gateway   │  │ Pipeline  │  │ Inference │  │ Engine    │  │ │
│  │  │ (Rust)    │  │ (Go)      │  │ (Python)  │  │ (Spark)   │  │ │
│  │  │           │  │           │  │           │  │           │  │ │
│  │  │ 100 pods  │  │ 200 pods  │  │ 50 pods   │  │ 30 pods   │  │ │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │ │
│  │                                                                 │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  │ │
│  │  │ WebSocket │  │ HVAC      │  │ Carbon    │  │ Monitoring│  │ │
│  │  │ Server    │  │ Control   │  │ Tracking  │  │ (Prom)    │  │ │
│  │  │ (Node.js) │  │ (Rust)    │  │ (Python)  │  │           │  │ │
│  │  │ 50 pods   │  │ 40 pods   │  │ 30 pods   │  │ 20 pods   │  │ │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘  │ │
│  └────────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                    DATA LAYER                                        │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐       │
│  │ InfluxDB  │  │ RDS       │  │ElastiCache│  │ S3        │       │
│  │ (Time-    │  │(PostgreSQL│  │ (Redis)   │  │ (Archive) │       │
│  │  series)  │  │ + PostGIS)│  │           │  │           │       │
│  │ 2.8TB     │  │ 500GB     │  │ 50GB      │  │ 680TB     │       │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘       │
└──────────────────────────────────────────────────────────────────────┘
```

### 1.2 Multi-Region Deployment

**Primary Regions**:
- **us-east-1** (N. Virginia): Primary production (50% traffic)
- **us-west-2** (Oregon): Secondary production (20% traffic)
- **eu-west-1** (Ireland): Europe production (20% traffic)

**Secondary Regions** (Disaster Recovery):
- **eu-central-1** (Frankfurt): Europe DR
- **ap-southeast-1** (Singapore): Asia-Pacific production
- **ap-northeast-1** (Tokyo): Asia-Pacific DR
- **ap-south-1** (Mumbai): India/Middle East
- **ca-central-1** (Montreal): Canada compliance

**Traffic Routing**:
```python
# AWS Route 53 geolocation routing
ROUTING_POLICY = {
    'North America': ['us-east-1', 'us-west-2'],
    'Europe': ['eu-west-1', 'eu-central-1'],
    'Asia Pacific': ['ap-southeast-1', 'ap-northeast-1'],
    'India': ['ap-south-1'],
    'Canada': ['ca-central-1']
}

# Latency-based routing within region
# (Route 53 automatically routes to lowest-latency endpoint)
```

---

## 2. AWS IoT Core & Device Management

### 2.1 Device Registry

**Scale**: 125 million devices (sensors) registered

**Device Naming Convention**:
```
arn:aws:iot:us-east-1:123456789012:thing/nimbus-sensor-{building_id}-{sensor_id}

Example:
arn:aws:iot:us-east-1:123456789012:thing/nimbus-sensor-bld_2L8F9mKpN4Qr-sns_4Mn6Op7Qr8St
```

**Device Certificates** (X.509):
```bash
# Generate device certificate during manufacturing
aws iot create-keys-and-certificate \
  --set-as-active \
  --certificate-pem-outfile sensor-cert.pem \
  --public-key-outfile sensor-public.key \
  --private-key-outfile sensor-private.key

# Attach policy
aws iot attach-policy \
  --policy-name NimbusSensorPolicy \
  --target arn:aws:iot:us-east-1:123456789012:cert/abc123...
```

**Device Shadow** (State Management):
```json
{
  "state": {
    "reported": {
      "battery_level": 87,
      "signal_strength": -72,
      "firmware_version": "1.2.3",
      "last_reading": {
        "value": 650,
        "unit": "ppm",
        "timestamp": 1638360000
      }
    },
    "desired": {
      "sampling_interval_seconds": 60,
      "power_mode": "normal"
    }
  },
  "metadata": {
    "reported": {
      "battery_level": {
        "timestamp": 1638360000
      }
    }
  },
  "version": 123,
  "timestamp": 1638360000
}
```

### 2.2 MQTT Broker Configuration

**Endpoint**: `a1b2c3d4e5f6g7.iot.us-east-1.amazonaws.com:8883`

**Topic Structure**:
```
# Sensor publishes readings
nimbus/{building_id}/sensors/{sensor_id}/readings

# Sensor receives commands
nimbus/{building_id}/sensors/{sensor_id}/commands

# Edge node publishes aggregated data
nimbus/{building_id}/edge/data
```

**Message Rate Limits**:
- **Per-connection**: 100 publishes/second
- **Per-account**: 20,000 concurrent connections per region
- **Message size**: 128KB max
- **Throughput**: 1M messages/second (account-level)

**Connection Example** (Python):
```python
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

# Initialize MQTT client
mqtt_client = AWSIoTMQTTClient("nimbus-sensor-sns_4Mn6Op7Qr8St")
mqtt_client.configureEndpoint("a1b2c3d4e5f6g7.iot.us-east-1.amazonaws.com", 8883)
mqtt_client.configureCredentials(
    "/certs/root-CA.crt",
    "/certs/sensor-private.key",
    "/certs/sensor-cert.pem"
)

# Connect
mqtt_client.connect()

# Publish sensor reading
mqtt_client.publish(
    "nimbus/bld_2L8F9mKpN4Qr/sensors/sns_4Mn6Op7Qr8St/readings",
    json.dumps({
        "timestamp": int(time.time()),
        "value": 650,
        "unit": "ppm",
        "quality_score": 0.98
    }),
    1  # QoS 1 (at least once delivery)
)
```

### 2.3 IoT Rules Engine

**Rule 1: Route sensor data to Kinesis Firehose**

```sql
SELECT 
    topic(2) AS building_id,
    topic(4) AS sensor_id,
    timestamp() AS aws_timestamp,
    * 
FROM 'nimbus/+/sensors/+/readings'
```

**Action**: Forward to Kinesis Firehose → InfluxDB

**Rule 2: Detect offline sensors**

```sql
SELECT 
    clientId() AS sensor_id,
    eventType AS event,
    timestamp() AS disconnected_at
FROM '$aws/events/presence/disconnected/#'
WHERE eventType = 'disconnected'
```

**Action**: Publish to SNS topic → Alert system

**Rule 3: High CO₂ alert**

```sql
SELECT 
    building_id,
    sensor_id,
    value,
    timestamp
FROM 'nimbus/+/sensors/+/readings'
WHERE value > 1000 AND topic(4) LIKE '%co2%'
```

**Action**: Lambda function → Create alert in database

---

## 3. Edge Computing (AWS IoT Greengrass)

### 3.1 Edge Node Specifications

**Hardware** (per building):
- **Option 1**: Raspberry Pi 4 (8GB RAM) - $150
- **Option 2**: Intel NUC 11 (16GB RAM, i5) - $600
- **Storage**: 128GB SSD (local buffering)
- **Network**: Gigabit Ethernet + WiFi 6

**Software Stack**:
```yaml
# Greengrass Core v2.9
system:
  os: Ubuntu 22.04 LTS
  architecture: arm64 (Pi) / x86_64 (NUC)
  
greengrass:
  version: 2.9.0
  java_version: 11
  
components:
  - aws.greengrass.Nucleus (core runtime)
  - aws.greengrass.StreamManager (data buffering)
  - aws.greengrass.SecretManager (credentials)
  - aws.greengrass.TokenExchangeService (IAM auth)
  - custom.SensorAggregator (data collection)
  - custom.LocalML (anomaly detection)
  - custom.HVAC Controller (building automation)
```

### 3.2 Greengrass Components

**Custom Component: Sensor Aggregator**

```yaml
# recipe.yaml
RecipeFormatVersion: '2020-01-25'
ComponentName: custom.SensorAggregator
ComponentVersion: '1.0.0'
ComponentDescription: Aggregates sensor data from LoRaWAN gateway
ComponentPublisher: NIMBUS BIOME Inc.

Manifests:
  - Platform:
      os: linux
    Lifecycle:
      run: |
        python3 {artifacts:path}/sensor_aggregator.py \
          --building-id {configuration:/BuildingId} \
          --batch-size 1000 \
          --interval-seconds 60

ComponentConfiguration:
  DefaultConfiguration:
    BuildingId: "bld_unknown"
    SamplingInterval: 60
    BatchSize: 1000
    LocalBufferDays: 7
```

**Python Implementation**:
```python
# sensor_aggregator.py
import awsiot.greengrasscoreipc
import time

ipc_client = awsiot.greengrasscoreipc.connect()

def aggregate_sensor_data():
    """Collect sensor readings from local LoRaWAN gateway"""
    
    # Read from LoRaWAN gateway (local TCP socket)
    sensor_readings = collect_from_lorawan_gateway()
    
    # Batch for efficiency
    batched_readings = batch_by_time_window(sensor_readings, window_seconds=60)
    
    # Publish to IoT Core (via Greengrass)
    for batch in batched_readings:
        ipc_client.publish_to_iot_core(
            topic_name=f"nimbus/{BUILDING_ID}/edge/data",
            qos=QualityOfService.AT_LEAST_ONCE,
            payload=json.dumps(batch).encode()
        )
    
    # Also write to local buffer (offline resilience)
    write_to_local_buffer(batched_readings)

# Run continuously
while True:
    aggregate_sensor_data()
    time.sleep(60)  # Every minute
```

**Custom Component: Local ML (Anomaly Detection)**

```python
# Runs locally on edge node (no cloud dependency)
import joblib

# Load pre-trained Isolation Forest model
model = joblib.load('/ml/models/anomaly_detector.pkl')

def detect_anomalies(sensor_readings):
    """Detect anomalous sensor readings locally"""
    
    # Extract features
    features = extract_features(sensor_readings)
    
    # Predict (-1 = anomaly, 1 = normal)
    predictions = model.predict(features)
    
    # Flag anomalies for immediate alert
    anomalies = [
        reading for reading, pred in zip(sensor_readings, predictions)
        if pred == -1
    ]
    
    if anomalies:
        # Send high-priority alert to cloud
        publish_alert(anomalies, severity='high')
    
    return anomalies
```

### 3.3 Edge-to-Cloud Data Flow

```python
def edge_data_pipeline():
    """
    Optimized data flow from edge to cloud
    Reduces bandwidth by 90% (local aggregation)
    """
    
    # Collect 50,000 sensor readings (1-minute window)
    raw_readings = collect_sensors()  # 50,000 readings
    
    # Local aggregation (edge processing)
    aggregated = {
        'timestamp': int(time.time()),
        'building_id': BUILDING_ID,
        'summary': {
            'total_sensors': len(raw_readings),
            'avg_co2': np.mean([r['value'] for r in raw_readings if r['type'] == 'co2']),
            'avg_temp': np.mean([r['value'] for r in raw_readings if r['type'] == 'temperature']),
            'occupancy_count': sum([r['count'] for r in raw_readings if r['type'] == 'occupancy'])
        },
        'anomalies': detect_anomalies(raw_readings),  # Only send anomalies
        'raw_sample': raw_readings[:100]  # Sample for quality monitoring
    }
    
    # Send to cloud (1 message instead of 50,000)
    publish_to_cloud(aggregated)  # 10KB vs. 5MB (500× reduction)
```

---

## 4. Kubernetes Cluster (Amazon EKS)

### 4.1 Cluster Configuration

**Primary Cluster** (us-east-1):
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: nimbus-prod-us-east-1
  region: us-east-1
  version: "1.28"

managedNodeGroups:
  # General purpose (API, web services)
  - name: general-purpose
    instanceType: m6i.2xlarge  # 8 vCPU, 32GB RAM
    minSize: 20
    maxSize: 100
    desiredCapacity: 50
    volumeSize: 200
    labels:
      workload: general
    tags:
      Environment: production
      
  # Compute-intensive (ML inference)
  - name: compute-optimized
    instanceType: c6i.4xlarge  # 16 vCPU, 32GB RAM
    minSize: 10
    maxSize: 50
    desiredCapacity: 20
    volumeSize: 200
    labels:
      workload: compute
    
  # Memory-intensive (analytics, caching)
  - name: memory-optimized
    instanceType: r6i.2xlarge  # 8 vCPU, 64GB RAM
    minSize: 5
    maxSize: 20
    desiredCapacity: 10
    volumeSize: 500
    labels:
      workload: memory

addons:
  - name: vpc-cni
    version: latest
  - name: coredns
    version: latest
  - name: kube-proxy
    version: latest
  - name: aws-ebs-csi-driver
    version: latest

iam:
  withOIDC: true
  serviceAccounts:
    - metadata:
        name: cluster-autoscaler
      attachPolicyARNs:
        - arn:aws:iam::aws:policy/AutoScalingFullAccess
```

### 4.2 Core Services

**API Gateway** (Rust/Actix-web):
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  namespace: nimbus-prod
spec:
  replicas: 100  # Auto-scales 50-200
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
    spec:
      containers:
      - name: api-gateway
        image: nimbus/api-gateway:v2.1.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
          limits:
            cpu: 2000m
            memory: 4Gi
        env:
        - name: RUST_LOG
          value: "info"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: url
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
  namespace: nimbus-prod
spec:
  type: LoadBalancer
  selector:
    app: api-gateway
  ports:
  - protocol: TCP
    port: 443
    targetPort: 8080
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "arn:aws:acm:us-east-1:123456789012:certificate/abc123"
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
  namespace: nimbus-prod
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

**Data Ingestion Pipeline** (Go):
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: data-ingestion
  namespace: nimbus-prod
spec:
  replicas: 200  # High throughput
  selector:
    matchLabels:
      app: data-ingestion
  template:
    metadata:
      labels:
        app: data-ingestion
    spec:
      nodeSelector:
        workload: compute  # Run on compute-optimized nodes
      containers:
      - name: ingestion-worker
        image: nimbus/data-ingestion:v1.5.0
        resources:
          requests:
            cpu: 2000m
            memory: 4Gi
          limits:
            cpu: 4000m
            memory: 8Gi
        env:
        - name: INFLUXDB_URL
          value: "https://influx.nimbus.io"
        - name: KAFKA_BROKERS
          value: "kafka1.nimbus.io:9092,kafka2.nimbus.io:9092"
        - name: WORKERS
          value: "16"  # Concurrent workers per pod
```

### 4.3 Service Mesh (Istio)

**Why Istio?**
- ✅ Mutual TLS (mTLS) between services (zero-trust)
- ✅ Traffic management (canary deployments, A/B testing)
- ✅ Observability (distributed tracing, metrics)
- ✅ Rate limiting, circuit breaking

**Installation**:
```bash
istioctl install --set profile=production

# Enable sidecar injection
kubectl label namespace nimbus-prod istio-injection=enabled
```

**Virtual Service** (Traffic Routing):
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: api-gateway
spec:
  hosts:
  - api.nimbusbiome.io
  http:
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: api-gateway
        subset: v2-1-1  # Canary version
      weight: 10
    - destination:
        host: api-gateway
        subset: v2-1-0  # Stable version
      weight: 90
  - route:
    - destination:
        host: api-gateway
        subset: v2-1-0
```

---

## 5. Compute Resources

### 5.1 EC2 Instance Types

**Current Deployment**:

| Instance Type | vCPU | RAM | Storage | Count | Workload |
|---------------|------|-----|---------|-------|----------|
| **m6i.2xlarge** | 8 | 32GB | 200GB EBS | 100 | API, web services |
| **c6i.4xlarge** | 16 | 32GB | 200GB EBS | 40 | ML inference |
| **r6i.2xlarge** | 8 | 64GB | 500GB EBS | 20 | Analytics, cache |
| **g5.2xlarge** | 8 | 32GB | 225GB EBS + NVIDIA A10G GPU | 20 | GPU compute (future) |
| **Total** | **1,360** vCPU | **5.76TB** RAM | **36TB** storage | **180 nodes** | |

**Capacity Planning (2027 Target)**:
- **1,200 nodes** (6.7× scale-up)
- **48,000 vCPUs**
- **144TB RAM**
- **960TB storage**

### 5.2 Auto-Scaling Configuration

**Cluster Autoscaler**:
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cluster-autoscaler
  namespace: kube-system
---
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
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.28.0
        name: cluster-autoscaler
        command:
          - ./cluster-autoscaler
          - --v=4
          - --cloud-provider=aws
          - --skip-nodes-with-local-storage=false
          - --expander=least-waste
          - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/nimbus-prod-us-east-1
          - --balance-similar-node-groups
          - --skip-nodes-with-system-pods=false
          - --scale-down-delay-after-add=10m
          - --scale-down-unneeded-time=10m
```

**Scaling Behavior**:
- **Scale up**: Within 30 seconds (new pod pending)
- **Scale down**: After 10 minutes idle
- **Max scale**: 3× current capacity (safety limit)

---

## 6. Networking & Load Balancing

### 6.1 VPC Architecture

**Primary VPC** (us-east-1):
```
VPC CIDR: 10.0.0.0/16

Subnets:
  Public (Internet Gateway attached):
    - 10.0.1.0/24 (AZ: us-east-1a) - Load balancers
    - 10.0.2.0/24 (AZ: us-east-1b) - Load balancers
    - 10.0.3.0/24 (AZ: us-east-1c) - Load balancers
  
  Private (NAT Gateway for outbound):
    - 10.0.10.0/23 (AZ: us-east-1a) - EKS nodes
    - 10.0.12.0/23 (AZ: us-east-1b) - EKS nodes
    - 10.0.14.0/23 (AZ: us-east-1c) - EKS nodes
  
  Database (No internet access):
    - 10.0.20.0/24 (AZ: us-east-1a) - RDS, InfluxDB
    - 10.0.21.0/24 (AZ: us-east-1b) - RDS read replica
    - 10.0.22.0/24 (AZ: us-east-1c) - Redis
```

**Security Groups**:
```yaml
# ALB Security Group
alb-sg:
  ingress:
    - port: 443 (HTTPS)
      source: 0.0.0.0/0  # Public internet
  egress:
    - port: 8080
      destination: eks-nodes-sg

# EKS Nodes Security Group
eks-nodes-sg:
  ingress:
    - port: 8080
      source: alb-sg
    - port: 1025-65535 (NodePort range)
      source: alb-sg
  egress:
    - port: 5432 (PostgreSQL)
      destination: database-sg
    - port: 8086 (InfluxDB)
      destination: database-sg
    - port: 6379 (Redis)
      destination: database-sg

# Database Security Group
database-sg:
  ingress:
    - port: 5432, 8086, 6379
      source: eks-nodes-sg
  egress:
    - none (no outbound)
```

### 6.2 Load Balancing

**Application Load Balancer** (AWS ALB):
```yaml
Type: Application Load Balancer
Scheme: internet-facing
Subnets: 
  - subnet-public-1a
  - subnet-public-1b
  - subnet-public-1c

Listeners:
  - Port: 443 (HTTPS)
    Protocol: HTTPS
    SSL Certificate: arn:aws:acm:us-east-1:123456789012:certificate/abc123
    Default Action: Forward to api-gateway-target-group
  
  - Port: 80 (HTTP)
    Protocol: HTTP
    Default Action: Redirect to HTTPS 443

Target Groups:
  - Name: api-gateway
    Protocol: HTTP
    Port: 8080
    Health Check:
      Path: /health
      Interval: 30s
      Timeout: 5s
      Healthy Threshold: 2
      Unhealthy Threshold: 3
```

**Global Load Balancing** (AWS Global Accelerator):
```yaml
# Anycast IP addresses (static, globally distributed)
Static IPs:
  - 75.2.60.5
  - 99.83.190.51

Endpoints:
  - Region: us-east-1
    Weight: 50
    Health Check: Enabled
  
  - Region: eu-west-1
    Weight: 20
    Health Check: Enabled
  
  - Region: ap-southeast-1
    Weight: 20
    Health Check: Enabled

Client Affinity: Source IP (sticky sessions)
```

---

## 7. Data Storage & Databases

### 7.1 Amazon RDS (PostgreSQL)

**Configuration**:
```yaml
Instance Class: db.r6g.2xlarge (8 vCPU, 64GB RAM)
Engine: PostgreSQL 16.1
Storage: 1TB gp3 SSD (12,000 IOPS, 500 MB/s throughput)
Multi-AZ: Yes (automatic failover)

Read Replicas:
  - Region: us-east-1 (same region, 2× replicas)
  - Region: eu-west-1 (cross-region, 1× replica)

Backup:
  Automated: Daily at 03:00 UTC
  Retention: 7 days (snapshots)
  Point-in-Time Recovery: 5-minute granularity

Encryption:
  At-rest: AES-256 (AWS KMS)
  In-transit: TLS 1.3
```

**Connection Pooling** (PgBouncer):
```ini
[databases]
nimbus_biome = host=nimbus-prod.cluster-abc123.us-east-1.rds.amazonaws.com port=5432 dbname=nimbus_biome

[pgbouncer]
pool_mode = transaction
max_client_conn = 10000
default_pool_size = 25
min_pool_size = 10
reserve_pool_size = 5
reserve_pool_timeout = 5
```

### 7.2 InfluxDB Cloud

**Deployment**: InfluxDB Cloud (managed service)

**Configuration**:
```yaml
Organization: nimbus-biome
Bucket: nimbus_biome/raw_data
Region: us-east-1

Capacity:
  Write: 500,000 points/second
  Query: 100 concurrent queries
  Storage: Unlimited (pay-as-you-go)
  Retention: 1 year (raw), 5 years (downsampled)

High Availability:
  Replication: 3× (automatic)
  Backup: Continuous
```

### 7.3 Amazon ElastiCache (Redis)

**Configuration**:
```yaml
Node Type: cache.r6g.xlarge (4 vCPU, 26GB RAM)
Engine: Redis 7.0
Cluster Mode: Enabled (sharded)

Shards: 6 shards × 2 replicas = 12 nodes total
Capacity:
  Memory: 156GB (6× 26GB)
  Throughput: 6M ops/sec

Backup:
  Automatic: Daily snapshots
  Retention: 7 days

Multi-AZ: Yes (automatic failover)
```

### 7.4 Amazon S3 (Object Storage)

**Buckets**:
```yaml
# Raw sensor data archive
nimbus-biome-archive:
  Storage Class: S3 Glacier Deep Archive
  Lifecycle Policy:
    - Transition to Glacier after 1 year
    - Delete after 7 years
  Encryption: SSE-KMS
  Versioning: Disabled (immutable data)
  Size: 680TB

# Application assets (web app, mobile app)
nimbus-biome-assets:
  Storage Class: S3 Standard
  CloudFront Distribution: Enabled
  Encryption: SSE-S3
  Size: 50GB

# Database backups
nimbus-biome-backups:
  Storage Class: S3 Intelligent-Tiering
  Lifecycle Policy:
    - Transition to Glacier after 30 days
  Encryption: SSE-KMS
  Cross-Region Replication: eu-west-1 (DR)
  Size: 10TB
```

---

## 8. Monitoring & Observability

### 8.1 Prometheus & Grafana

**Prometheus Configuration**:
```yaml
# Scrape metrics from all Kubernetes pods
scrape_configs:
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

# Retention: 30 days (then aggregate to long-term storage)
storage:
  tsdb:
    retention.time: 30d
    retention.size: 500GB
```

**Grafana Dashboards**:
- **Platform Overview**: Cluster health, pod status, resource utilization
- **Application Metrics**: API latency, throughput, error rate
- **Database Performance**: Query latency, connection pool, cache hit rate
- **IoT Metrics**: Device connectivity, message throughput, shadow updates
- **Business Metrics**: Active buildings, sensor count, data ingestion rate

### 8.2 Distributed Tracing (Jaeger)

**Setup**:
```yaml
# Jaeger all-in-one (Kubernetes deployment)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
  namespace: observability
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: jaeger
        image: jaegertracing/all-in-one:1.50
        ports:
        - containerPort: 5775  # Zipkin compact
        - containerPort: 6831  # Jaeger compact
        - containerPort: 6832  # Jaeger binary
        - containerPort: 16686 # Jaeger UI
        - containerPort: 14268 # Jaeger collector HTTP
```

**Instrumentation** (OpenTelemetry):
```rust
// Rust API Gateway example
use opentelemetry::trace::{Tracer, Span};
use opentelemetry_jaeger::JaegerPipeline;

#[actix_web::get("/buildings/{id}")]
async fn get_building(
    id: web::Path<String>,
    tracer: web::Data<TracerHandle>
) -> Result<HttpResponse> {
    let mut span = tracer.start("get_building");
    span.set_attribute(KeyValue::new("building.id", id.to_string()));
    
    // Database query (child span)
    let building = {
        let _db_span = tracer.start_with_context("database_query", &span.context());
        database::get_building(&id).await?
    };
    
    span.set_attribute(KeyValue::new("building.found", building.is_some()));
    span.end();
    
    Ok(HttpResponse::Ok().json(building))
}
```

### 8.3 Alerting (AlertManager)

**Alert Rules**:
```yaml
groups:
  - name: infrastructure
    interval: 30s
    rules:
      # High API error rate
      - alert: HighErrorRate
        expr: (rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High API error rate ({{ $value }}%)"
      
      # High API latency
      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1.0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High API latency p95 ({{ $value }}s)"
      
      # Pods crashing
      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Pod {{ $labels.pod }} is crash-looping"
      
      # Disk space low
      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) < 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Disk space below 10% on {{ $labels.instance }}"
```

**Notification Channels**:
- **PagerDuty**: Critical alerts (24/7 on-call)
- **Slack**: Warning alerts (#infrastructure channel)
- **Email**: Daily digest (non-urgent)

---

## 9. Security & Compliance

### 9.1 Network Security

**Web Application Firewall** (AWS WAF):
```yaml
Rules:
  - Name: RateLimitRule
    Priority: 1
    Action: Block
    Condition: Requests > 300/5min from single IP
  
  - Name: SQLInjectionRule
    Priority: 2
    Action: Block
    Condition: Managed rule group (SQL injection patterns)
  
  - Name: XSSRule
    Priority: 3
    Action: Block
    Condition: Managed rule group (XSS patterns)
  
  - Name: GeoBlockRule
    Priority: 4
    Action: Block
    Condition: Country NOT IN [US, CA, EU, UK, AU, JP, SG]
```

**DDoS Protection** (AWS Shield Advanced):
- ✅ Layer 3/4 DDoS protection (automatic)
- ✅ Layer 7 DDoS protection (AWS WAF integration)
- ✅ 24/7 DDoS Response Team (DRT)
- ✅ Cost protection (no surge pricing during attack)

### 9.2 Identity & Access Management

**IAM Roles** (Principle of Least Privilege):
```yaml
# EKS Node Role (allows nodes to join cluster)
NimbusEKSNodeRole:
  Policies:
    - AmazonEKSWorkerNodePolicy
    - AmazonEC2ContainerRegistryReadOnly
    - AmazonEKS_CNI_Policy

# API Gateway Pod Role (access to RDS, InfluxDB)
ApiGatewayServiceAccountRole:
  Policies:
    - RDSReadWriteAccess (custom policy, limited to nimbus_biome DB)
    - SecretsManagerReadOnly (custom policy, limited to API keys)

# Data Ingestion Pod Role (write to InfluxDB, Kafka)
DataIngestionServiceAccountRole:
  Policies:
    - InfluxDBWriteAccess (custom policy)
    - KafkaProducerAccess (custom policy)
```

**IAM for Service Accounts** (IRSA):
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: api-gateway
  namespace: nimbus-prod
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/ApiGatewayServiceAccountRole
```

### 9.3 Secrets Management

**AWS Secrets Manager**:
```bash
# Store database password
aws secretsmanager create-secret \
  --name nimbus/prod/database-password \
  --secret-string "$(openssl rand -base64 32)"

# Rotate automatically every 30 days
aws secretsmanager rotate-secret \
  --secret-id nimbus/prod/database-password \
  --rotation-lambda-arn arn:aws:lambda:us-east-1:123456789012:function:SecretsManagerRotation \
  --rotation-rules AutomaticallyAfterDays=30
```

**Kubernetes External Secrets Operator**:
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
  namespace: nimbus-prod
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: database-credentials
    creationPolicy: Owner
  data:
    - secretKey: url
      remoteRef:
        key: nimbus/prod/database-url
    - secretKey: password
      remoteRef:
        key: nimbus/prod/database-password
```

---

## 10. Cost Optimization

### 10.1 Current Monthly Cost (2,500 Buildings)

| Service | Monthly Cost | Percentage |
|---------|--------------|------------|
| **EC2 (EKS nodes)** | $85,000 | 40% |
| **RDS (PostgreSQL)** | $12,000 | 6% |
| **InfluxDB Cloud** | $35,000 | 16% |
| **ElastiCache (Redis)** | $8,000 | 4% |
| **S3 (Storage)** | $15,000 | 7% |
| **Data Transfer** | $20,000 | 9% |
| **IoT Core** | $18,000 | 8% |
| **Load Balancers** | $5,000 | 2% |
| **CloudFront CDN** | $8,000 | 4% |
| **Monitoring & Logs** | $6,000 | 3% |
| **Other (WAF, KMS, etc.)** | $3,000 | 1% |
| **TOTAL** | **$215,000/month** | **100%** |

**Cost per Building**: $86/month  
**Cost per Sensor**: $0.0017/month

### 10.2 Cost Optimization Strategies

**1. Reserved Instances** (1-year commitment):
```yaml
EC2 Savings:
  Current: $85,000/month (On-Demand)
  Reserved (1-year, no upfront): $58,000/month
  Savings: $27,000/month (32%)
```

**2. Spot Instances** (for non-critical workloads):
```yaml
# Use Spot for ML inference (interruptible)
Spot Savings:
  ML Inference Nodes: 20× c6i.4xlarge
  On-Demand Cost: $12,000/month
  Spot Cost (70% discount): $3,600/month
  Savings: $8,400/month
```

**3. S3 Intelligent-Tiering**:
```yaml
S3 Optimization:
  Current (S3 Standard): $15,000/month
  Intelligent-Tiering (auto-archive): $9,000/month
  Savings: $6,000/month (40%)
```

**4. Data Transfer Optimization** (VPC Endpoints):
```yaml
# Use VPC Endpoints to avoid NAT Gateway data transfer fees
NAT Gateway Savings:
  Current: $0.045/GB × 200TB/month = $9,000/month
  VPC Endpoints: $0.01/GB × 200TB/month = $2,000/month
  Savings: $7,000/month (78%)
```

**Total Monthly Savings**: $48,400 (23% reduction)  
**Optimized Cost**: $166,600/month

---

## Conclusion

NIMBUS BIOME's cloud infrastructure is designed for **global scale**, **high availability** (**99.97% uptime**), and **cost efficiency** ($86/building/month). Our **multi-region AWS architecture** with **Kubernetes orchestration**, **IoT Core integration**, and **edge computing** enables **real-time processing** of **100 million+ data points per hour** while maintaining **sub-100ms API latency** and **99.98% device connectivity**.

---

**Document Classification**: Technical Architecture - Infrastructure  
**Last Updated**: November 28, 2025  
**Next Review**: February 28, 2026  
**Owner**: Cloud Infrastructure Team  

© 2025 NIMBUS BIOME Inc. All rights reserved.
