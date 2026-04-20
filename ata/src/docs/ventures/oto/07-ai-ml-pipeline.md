# OTO - AI/ML Pipeline
## Machine Learning Infrastructure & Model Training

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 40 minutes

---

## Executive Summary

OTO's AI/ML pipeline powers **12 specialized models** (sentiment analysis, gift recommendations, churn prediction) using **PyTorch**, **Hugging Face Transformers**, and **TorchServe**. Training runs on **20× NVIDIA A100 GPUs** (GCP), serving **10K inferences/second** with **<150ms latency**, achieving **94.2% sentiment accuracy** and **89.3% gift recommendation success rate**.

---

## Table of Contents

1. [ML Model Catalog](#1-ml-model-catalog)
2. [Model Training Pipeline](#2-model-training-pipeline)
3. [Feature Engineering](#3-feature-engineering)
4. [Model Serving](#4-model-serving)
5. [Monitoring & Retraining](#5-monitoring--retraining)
6. [Federated Learning](#6-federated-learning)

---

## 1. ML Model Catalog

### 1.1 Active Models

| # | Model | Type | Accuracy | Latency | Purpose |
|---|-------|------|----------|---------|---------|
| **1** | BERT Sentiment Analyzer | NLP | 94.2% | <50ms | Text sentiment (positive/neutral/negative) |
| **2** | Emoji Sentiment Classifier | Classification | 92.1% | <10ms | Emoji-based sentiment |
| **3** | Contact Health Scorer | Regression | 91.8% | <100ms | Relationship strength (0-100) |
| **4** | Gift Recommender | Collaborative Filtering | 89.3% | <200ms | Personalized gift suggestions |
| **5** | Occasion Detector | NER | 97.5% | <30ms | Detect birthdays, anniversaries |
| **6** | Response Time Predictor | Regression | 88.4% | <50ms | Estimate reply time |
| **7** | Churn Predictor | XGBoost | 86.7% | <150ms | Predict fading connections |
| **8** | Interest Extractor | NER | 93.6% | <80ms | Extract hobbies, interests from text |
| **9** | GNN Relationship Predictor | Graph NN | 91.8% | <200ms | Graph-based relationship forecasting |
| **10** | LLM Insight Generator | GPT-4 | N/A | <2s | Personalized suggestions |
| **11** | Voice Tone Analyzer | Audio + NLP | 90.2% | <500ms | Analyze voice call sentiment |
| **12** | Image Gift Recognizer | CNN | 94.7% | <300ms | Detect gift items from photos |

---

## 2. Model Training Pipeline

### 2.1 End-to-End Training Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   DATA COLLECTION                                │
│  • User interactions (50M/day)                                   │
│  • Sentiment labels (manual + semi-supervised)                  │
│  • Gift purchase history (5M transactions/year)                 │
│  • Feature engineering (500+ features per event)                │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                DATA PREPROCESSING & VALIDATION                   │
│  • Data cleaning (remove duplicates, outliers)                  │
│  • Train/validation/test split (70/15/15)                       │
│  • Feature normalization                                        │
│  • Class balancing (SMOTE for imbalanced data)                  │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FEATURE STORE (Feast)                          │
│  • Centralized feature repository                               │
│  • Online serving (real-time features, <10ms)                   │
│  • Offline serving (batch training)                             │
│  • Feature versioning & lineage                                 │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│              MODEL TRAINING (PyTorch + Ray Train)                │
│  • GPU Cluster: 20× NVIDIA A100 (80GB VRAM)                     │
│  • Distributed training (PyTorch DDP, FSDP)                     │
│  • Hyperparameter tuning (Optuna, Ray Tune)                     │
│  • Experiment tracking (MLflow)                                 │
│                                                                  │
│  Training Frequency:                                             │
│  • Sentiment models: Weekly                                     │
│  • Gift recommender: Daily (online learning)                    │
│  • Graph models: Monthly                                        │
│  • Churn predictor: Weekly                                      │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MODEL EVALUATION                                │
│  • Validation metrics (accuracy, precision, recall, F1)         │
│  • A/B testing (champion vs. challenger)                        │
│  • Fairness audits (bias detection)                             │
│  • Performance benchmarking                                     │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MODEL REGISTRY (MLflow)                         │
│  • Model versioning (semantic versioning)                       │
│  • Metadata tracking (hyperparameters, metrics)                 │
│  • Lineage tracking (data → features → model)                   │
│  • Automated rollback (if performance degrades)                 │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│             MODEL SERVING (TorchServe + Kubernetes)              │
│  • Kubernetes deployment (50 pods, auto-scaling)                │
│  • Load balancing (requests distributed across pods)            │
│  • Batch inference (for efficiency)                             │
│  • GPU optimization (TensorRT, mixed precision)                 │
│                                                                  │
│  Performance:                                                    │
│  • Throughput: 10K inferences/sec                               │
│  • Latency (p95): <150ms                                        │
│  • GPU utilization: 85%+                                        │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Training Infrastructure (GCP)

```yaml
# GKE GPU Node Pool Configuration
apiVersion: v1
kind: NodePool
metadata:
  name: gpu-training-pool
spec:
  cluster: oto-ml-us-central1
  initialNodeCount: 5
  autoscaling:
    enabled: true
    minNodeCount: 2
    maxNodeCount: 20
  config:
    machineType: a2-ultragpu-1g # NVIDIA A100 80GB
    accelerators:
      - acceleratorType: nvidia-tesla-a100
        acceleratorCount: 1
    diskSizeGb: 1000
    diskType: pd-ssd
    labels:
      workload: ml-training
    taints:
      - key: workload
        value: ml-training
        effect: NoSchedule
```

**GPU Cluster Stats:**
- **Total GPUs:** 20× NVIDIA A100 (80GB VRAM)
- **Total VRAM:** 1.6 TB
- **FP32 Performance:** 312 TFLOPS (total)
- **Tensor Core Performance:** 624 TFLOPS (total)
- **Utilization:** 85%+ (training jobs running 24/7)

---

## 3. Feature Engineering

### 3.1 Feature Store Architecture (Feast)

```python
# feast/features.py
from feast import Entity, FeatureView, Field, FileSource
from feast.types import Float32, Int64, String
from datetime import timedelta

# Entity: User
user = Entity(
    name="user",
    join_keys=["user_id"],
    description="User entity"
)

# Entity: Contact
contact = Entity(
    name="contact",
    join_keys=["contact_id"],
    description="Contact entity"
)

# Feature View: Interaction Features
interaction_features = FeatureView(
    name="interaction_features",
    entities=[user, contact],
    ttl=timedelta(days=90),
    schema=[
        Field(name="interaction_count_7d", dtype=Int64),
        Field(name="interaction_count_30d", dtype=Int64),
        Field(name="interaction_count_90d", dtype=Int64),
        Field(name="avg_sentiment_7d", dtype=Float32),
        Field(name="avg_sentiment_30d", dtype=Float32),
        Field(name="avg_sentiment_90d", dtype=Float32),
        Field(name="avg_response_time_ms", dtype=Float32),
        Field(name="reciprocity_ratio", dtype=Float32),
        Field(name="days_since_last_interaction", dtype=Int64),
    ],
    source=FileSource(
        path="gs://oto-ml-data/features/interactions.parquet",
        timestamp_field="event_timestamp"
    )
)

# Feature View: Contact Features
contact_features = FeatureView(
    name="contact_features",
    entities=[contact],
    ttl=timedelta(days=365),
    schema=[
        Field(name="relationship_age_days", dtype=Int64),
        Field(name="relationship_type", dtype=String),
        Field(name="health_score", dtype=Float32),
        Field(name="interest_count", dtype=Int64),
        Field(name="gift_received_count", dtype=Int64),
        Field(name="occasion_count", dtype=Int64),
    ],
    source=FileSource(
        path="gs://oto-ml-data/features/contacts.parquet",
        timestamp_field="event_timestamp"
    )
)
```

**Feature Store Stats:**
- **Total Features:** 500+
- **Feature Groups:** 12
- **Online Serving Latency:** <10ms (p95)
- **Offline Serving Throughput:** 100K rows/sec
- **Storage:** 2.5 TB (Parquet files on GCS)

### 3.2 Feature Engineering Pipeline

```python
# feature_engineering.py
import pandas as pd
from datetime import datetime, timedelta

def extract_features(user_id: str, contact_id: str, timestamp: datetime) -> dict:
    """
    Extract 500+ features for ML models
    """
    features = {}
    
    # 1. Interaction Frequency Features
    interactions = get_interactions(user_id, contact_id, days=90)
    features['interaction_count_7d'] = len([i for i in interactions if i.timestamp > timestamp - timedelta(days=7)])
    features['interaction_count_30d'] = len([i for i in interactions if i.timestamp > timestamp - timedelta(days=30)])
    features['interaction_count_90d'] = len(interactions)
    
    # 2. Sentiment Features
    sentiments = [i.sentiment for i in interactions]
    features['avg_sentiment_7d'] = np.mean([s for i, s in zip(interactions, sentiments) if i.timestamp > timestamp - timedelta(days=7)]) if sentiments else 0
    features['avg_sentiment_30d'] = np.mean([s for i, s in zip(interactions, sentiments) if i.timestamp > timestamp - timedelta(days=30)]) if sentiments else 0
    features['avg_sentiment_90d'] = np.mean(sentiments) if sentiments else 0
    features['sentiment_trend'] = features['avg_sentiment_7d'] - features['avg_sentiment_90d']
    
    # 3. Response Time Features
    response_times = [i.response_time_ms for i in interactions if i.direction == 'received']
    features['avg_response_time_ms'] = np.mean(response_times) if response_times else 0
    features['median_response_time_ms'] = np.median(response_times) if response_times else 0
    features['std_response_time_ms'] = np.std(response_times) if response_times else 0
    
    # 4. Reciprocity Features
    sent_count = len([i for i in interactions if i.direction == 'sent'])
    received_count = len([i for i in interactions if i.direction == 'received'])
    features['reciprocity_ratio'] = sent_count / max(received_count, 1)
    features['sent_count'] = sent_count
    features['received_count'] = received_count
    
    # 5. Recency Features
    last_interaction = max([i.timestamp for i in interactions]) if interactions else None
    features['days_since_last_interaction'] = (timestamp - last_interaction).days if last_interaction else 9999
    features['hours_since_last_interaction'] = (timestamp - last_interaction).total_seconds() / 3600 if last_interaction else 9999
    
    # 6. Channel Diversity Features
    channels = set([i.channel for i in interactions])
    features['channel_count'] = len(channels)
    features['uses_email'] = 'email' in channels
    features['uses_sms'] = 'sms' in channels
    features['uses_call'] = 'call' in channels
    features['uses_social'] = 'social' in channels
    
    # 7. Contact Metadata Features
    contact = get_contact(contact_id)
    features['relationship_age_days'] = (timestamp - contact.created_at).days
    features['relationship_type'] = contact.relationship_type
    features['health_score'] = contact.health_score
    
    # 8. Gift History Features
    gifts = get_gifts(user_id, contact_id)
    features['gift_received_count'] = len(gifts)
    features['avg_gift_value'] = np.mean([g.price for g in gifts]) if gifts else 0
    features['days_since_last_gift'] = (timestamp - max([g.date for g in gifts])).days if gifts else 9999
    
    # 9. Interest Features
    interests = get_interests(contact_id)
    features['interest_count'] = len(interests)
    features['avg_interest_confidence'] = np.mean([i.confidence for i in interests]) if interests else 0
    
    # 10. Occasion Features
    occasions = get_occasions(contact_id)
    features['occasion_count'] = len(occasions)
    features['days_until_next_occasion'] = min([(o.date - timestamp.date()).days for o in occasions if o.date > timestamp.date()]) if occasions else 9999
    
    # ... 490 more features
    
    return features
```

---

## 4. Model Serving

### 4.1 TorchServe Deployment

```yaml
# torchserve-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sentiment-analyzer
  namespace: ml-serving
spec:
  replicas: 10
  selector:
    matchLabels:
      app: sentiment-analyzer
  template:
    metadata:
      labels:
        app: sentiment-analyzer
    spec:
      containers:
      - name: torchserve
        image: pytorch/torchserve:0.9.0-gpu
        ports:
        - containerPort: 8080
          name: inference
        - containerPort: 8081
          name: management
        - containerPort: 8082
          name: metrics
        resources:
          requests:
            nvidia.com/gpu: 1
            memory: "8Gi"
            cpu: "4000m"
          limits:
            nvidia.com/gpu: 1
            memory: "16Gi"
            cpu: "8000m"
        volumeMounts:
        - name: model-store
          mountPath: /home/model-server/model-store
        env:
        - name: MODEL_NAME
          value: "sentiment_analyzer"
        - name: BATCH_SIZE
          value: "32"
        - name: MAX_WORKERS
          value: "4"
      volumes:
      - name: model-store
        persistentVolumeClaim:
          claimName: model-store-pvc
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: sentiment-analyzer-hpa
  namespace: ml-serving
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: sentiment-analyzer
  minReplicas: 5
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: nvidia.com/gpu
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: inference_requests_per_second
      target:
        type: AverageValue
        averageValue: "200"
```

### 4.2 Model Loading & Inference

```python
# torchserve_handler.py
import torch
from transformers import BertTokenizer, BertForSequenceClassification
from ts.torch_handler.base_handler import BaseHandler

class SentimentAnalyzerHandler(BaseHandler):
    def __init__(self):
        super().__init__()
        self.model = None
        self.tokenizer = None
        self.device = None
    
    def initialize(self, context):
        """Load model"""
        properties = context.system_properties
        model_dir = properties.get("model_dir")
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        # Load BERT model
        self.model = BertForSequenceClassification.from_pretrained(model_dir)
        self.model.to(self.device)
        self.model.eval()
        
        # Load tokenizer
        self.tokenizer = BertTokenizer.from_pretrained(model_dir)
    
    def preprocess(self, data):
        """Tokenize input text"""
        texts = [row.get("data") or row.get("body") for row in data]
        inputs = self.tokenizer(
            texts,
            padding=True,
            truncation=True,
            max_length=512,
            return_tensors="pt"
        )
        return inputs.to(self.device)
    
    def inference(self, inputs):
        """Run inference"""
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            probabilities = torch.softmax(logits, dim=1)
        return probabilities
    
    def postprocess(self, probabilities):
        """Convert to sentiment labels"""
        predictions = torch.argmax(probabilities, dim=1).cpu().numpy()
        labels = ['negative', 'neutral', 'positive']
        
        results = []
        for i, pred in enumerate(predictions):
            results.append({
                'label': labels[pred],
                'score': float(probabilities[i][pred]),
                'sentiment_value': float(pred - 1)  # -1 to 1
            })
        
        return results
```

### 4.3 Batch Inference

```python
# batch_inference.py
import torch
from torch.utils.data import DataLoader

def batch_inference(texts: list[str], batch_size: int = 32) -> list[dict]:
    """
    Process large batches efficiently
    """
    model = load_model('sentiment_analyzer_v2.1.0')
    tokenizer = load_tokenizer('sentiment_analyzer_v2.1.0')
    
    # Create DataLoader
    dataset = TextDataset(texts, tokenizer)
    dataloader = DataLoader(dataset, batch_size=batch_size, num_workers=4)
    
    results = []
    with torch.no_grad():
        for batch in dataloader:
            inputs = batch.to('cuda')
            outputs = model(**inputs)
            probabilities = torch.softmax(outputs.logits, dim=1)
            predictions = torch.argmax(probabilities, dim=1).cpu().numpy()
            
            for i, pred in enumerate(predictions):
                results.append({
                    'label': ['negative', 'neutral', 'positive'][pred],
                    'score': float(probabilities[i][pred]),
                    'sentiment_value': float(pred - 1)
                })
    
    return results

# Example: Process 10K texts
texts = get_texts_from_db(limit=10000)
results = batch_inference(texts, batch_size=128)
# Throughput: 500 texts/sec on single A100 GPU
```

### 4.4 Serving Performance

| Model | Throughput | Latency (p50) | Latency (p95) | GPU Memory |
|-------|-----------|---------------|---------------|------------|
| **BERT Sentiment** | 500 req/sec | 35ms | 48ms | 2.5 GB |
| **Gift Recommender** | 200 req/sec | 120ms | 185ms | 4.2 GB |
| **Churn Predictor** | 1000 req/sec | 80ms | 145ms | 1.8 GB |
| **Interest Extractor** | 400 req/sec | 55ms | 78ms | 3.1 GB |
| **Voice Tone Analyzer** | 50 req/sec | 350ms | 485ms | 6.5 GB |
| **Image Gift Recognizer** | 100 req/sec | 180ms | 295ms | 5.8 GB |

---

## 5. Monitoring & Retraining

### 5.1 Model Performance Monitoring

```python
# model_monitoring.py
from prometheus_client import Counter, Histogram

# Metrics
prediction_counter = Counter(
    'ml_predictions_total',
    'Total number of predictions',
    ['model', 'label']
)

prediction_latency = Histogram(
    'ml_prediction_latency_seconds',
    'Prediction latency',
    ['model']
)

prediction_confidence = Histogram(
    'ml_prediction_confidence',
    'Prediction confidence score',
    ['model']
)

def monitor_prediction(model_name: str, prediction: dict, latency: float):
    """Track model performance"""
    prediction_counter.labels(model=model_name, label=prediction['label']).inc()
    prediction_latency.labels(model=model_name).observe(latency)
    prediction_confidence.labels(model=model_name).observe(prediction['score'])
    
    # Check for drift
    if prediction['score'] < 0.6:
        # Low confidence prediction - possible model drift
        alert_on_drift(model_name, prediction)
```

### 5.2 Data Drift Detection

```python
# drift_detection.py
from scipy.stats import ks_2samp
import numpy as np

def detect_data_drift(
    reference_data: np.ndarray,
    current_data: np.ndarray,
    threshold: float = 0.05
) -> bool:
    """
    Detect data drift using Kolmogorov-Smirnov test
    """
    statistic, p_value = ks_2samp(reference_data, current_data)
    
    if p_value < threshold:
        # Significant drift detected
        return True
    return False

# Example: Check sentiment distribution drift
reference_sentiments = get_sentiments(start_date='2025-01-01', end_date='2025-01-31')
current_sentiments = get_sentiments(start_date='2025-11-01', end_date='2025-11-30')

if detect_data_drift(reference_sentiments, current_sentiments):
    print("Drift detected! Triggering model retraining...")
    trigger_retraining('sentiment_analyzer')
```

### 5.3 Automated Retraining

```python
# retraining_pipeline.py
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'ml-team',
    'depends_on_past': False,
    'email': ['ml-team@oto.ai'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'sentiment_model_retraining',
    default_args=default_args,
    description='Retrain sentiment analysis model',
    schedule_interval=timedelta(days=7),  # Weekly
    start_date=datetime(2025, 1, 1),
    catchup=False
)

def extract_training_data():
    """Fetch latest interaction data"""
    # Get last 7 days of data
    data = fetch_from_influxdb(days=7)
    save_to_gcs(data, 'gs://oto-ml-data/training/sentiment/latest.parquet')

def train_model():
    """Train BERT sentiment model"""
    train_bert_sentiment(
        data_path='gs://oto-ml-data/training/sentiment/latest.parquet',
        output_path='gs://oto-ml-models/sentiment_analyzer/',
        epochs=3,
        batch_size=32,
        learning_rate=2e-5
    )

def evaluate_model():
    """Evaluate on validation set"""
    metrics = evaluate_bert_sentiment(
        model_path='gs://oto-ml-models/sentiment_analyzer/latest',
        validation_data='gs://oto-ml-data/validation/sentiment.parquet'
    )
    
    # Check if new model is better
    current_accuracy = get_current_model_accuracy('sentiment_analyzer')
    if metrics['accuracy'] > current_accuracy:
        return 'deploy_model'
    else:
        return 'skip_deployment'

def deploy_model():
    """Deploy to TorchServe"""
    deploy_to_torchserve(
        model_path='gs://oto-ml-models/sentiment_analyzer/latest',
        model_name='sentiment_analyzer',
        version='v2.2.0'
    )

# DAG tasks
t1 = PythonOperator(task_id='extract_data', python_callable=extract_training_data, dag=dag)
t2 = PythonOperator(task_id='train_model', python_callable=train_model, dag=dag)
t3 = PythonOperator(task_id='evaluate_model', python_callable=evaluate_model, dag=dag)
t4 = PythonOperator(task_id='deploy_model', python_callable=deploy_model, dag=dag)

t1 >> t2 >> t3 >> t4
```

---

## 6. Federated Learning

### 6.1 Privacy-Preserving Training

```python
# federated_learning.py
import torch
from torch import nn

class FederatedSentimentModel:
    def __init__(self):
        self.global_model = BERTSentimentAnalyzer()
        self.global_model_version = "v2.1.0"
    
    def train_on_device(self, user_data: list[dict], user_id: str):
        """
        Train model locally on user's device
        Data never leaves device
        """
        # Download global model
        local_model = self.download_global_model()
        
        # Train on user's local data
        optimizer = torch.optim.Adam(local_model.parameters(), lr=1e-4)
        for epoch in range(3):
            for batch in user_data:
                inputs = tokenize(batch['text'])
                labels = batch['sentiment']
                
                outputs = local_model(inputs)
                loss = nn.CrossEntropyLoss()(outputs, labels)
                
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
        
        # Extract model updates (gradients)
        model_updates = extract_gradients(local_model)
        
        # Add differential privacy noise
        noisy_updates = add_differential_privacy_noise(
            model_updates,
            epsilon=1.0,  # Privacy budget
            delta=1e-5
        )
        
        return noisy_updates
    
    def aggregate_updates(self, updates: list[dict]):
        """
        Server-side: Aggregate model updates from all users
        """
        # Federated averaging
        aggregated_updates = {}
        for key in updates[0].keys():
            aggregated_updates[key] = sum(u[key] for u in updates) / len(updates)
        
        # Update global model
        self.global_model.apply_updates(aggregated_updates)
        
        # Save new version
        self.save_model(version="v2.2.0")
    
    def add_differential_privacy_noise(self, updates: dict, epsilon: float, delta: float):
        """
        Add Laplace noise for differential privacy
        """
        sensitivity = 0.01  # L2 sensitivity
        scale = sensitivity / epsilon
        
        noisy_updates = {}
        for key, value in updates.items():
            noise = np.random.laplace(0, scale, value.shape)
            noisy_updates[key] = value + noise
        
        return noisy_updates
```

---

## Conclusion

OTO's AI/ML pipeline trains **12 specialized models** on **20× NVIDIA A100 GPUs**, serving **10K inferences/second** with **<150ms latency**, achieving **94.2% sentiment accuracy** and **89.3% gift recommendation success**, while preserving user privacy through **federated learning** and **differential privacy**.

**Next:** [Developer Onboarding](./08-developer-onboarding.md)

---

**© 2025 OTO AI Inc. All rights reserved.**
