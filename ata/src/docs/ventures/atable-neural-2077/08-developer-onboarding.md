# ATABLE NEURAL 2077 - Developer Onboarding
## Development Environment & Contribution Guide

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Classification:** Developer Documentation  
**Reading Time:** 30 minutes

---

## Executive Summary

This guide helps developers set up a local development environment for ATABLE NEURAL 2077, understand the codebase architecture, and contribute effectively to the platform.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Local Development Setup](#2-local-development-setup)
3. [Codebase Architecture](#3-codebase-architecture)
4. [Development Workflow](#4-development-workflow)
5. [Testing](#5-testing)
6. [Contributing Guidelines](#6-contributing-guidelines)

---

## 1. Prerequisites

### 1.1 Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| **Docker** | 24.0+ | Container runtime |
| **Kubernetes** | 1.28+ | Orchestration (kind/minikube for local) |
| **Python** | 3.11+ | Backend services, ML models |
| **Rust** | 1.75+ | Core detection engine |
| **Go** | 1.21+ | Data ingestion layer |
| **Node.js** | 20 LTS | Frontend dashboard |
| **Git** | 2.40+ | Version control |
| **AWS CLI** | 2.15+ | Cloud resource access |

### 1.2 Hardware Recommendations

**Minimum:**
- CPU: 8 cores
- RAM: 32GB
- Storage: 500GB SSD
- GPU: Optional (NVIDIA GPU for ML development)

**Recommended:**
- CPU: 16+ cores (Intel i9 / AMD Ryzen 9)
- RAM: 64GB
- Storage: 1TB NVMe SSD
- GPU: NVIDIA RTX 4090 (24GB VRAM)

---

## 2. Local Development Setup

### 2.1 Clone Repository

```bash
# Clone main repository
git clone https://github.com/atable-neural/atable-neural-2077.git
cd atable-neural-2077

# Install Git LFS (for ML models)
git lfs install
git lfs pull
```

### 2.2 Setup Development Environment

```bash
# Install dev tools
./scripts/setup-dev-env.sh

# This script installs:
# - Docker + Docker Compose
# - Kubernetes (kind)
# - Python virtualenv
# - Rust toolchain
# - Go toolchain
# - Node.js + npm
# - Pre-commit hooks
```

### 2.3 Start Local Services

```bash
# Start local Kubernetes cluster (kind)
kind create cluster --config=./k8s/local/kind-config.yaml

# Deploy local dependencies (PostgreSQL, ClickHouse, Redis, Kafka)
kubectl apply -k ./k8s/local/dependencies/

# Wait for dependencies to be ready
kubectl wait --for=condition=ready pod -l app=postgresql --timeout=300s
kubectl wait --for=condition=ready pod -l app=clickhouse --timeout=300s
kubectl wait --for=condition=ready pod -l app=redis --timeout=300s
kubectl wait --for=condition=ready pod -l app=kafka --timeout=300s

# Load sample data
./scripts/load-sample-data.sh

# Start development services
docker-compose -f docker-compose.dev.yml up -d
```

### 2.4 Verify Installation

```bash
# Check services
docker ps

# Expected services:
# - threat-detection-engine (Rust)
# - data-ingestion (Go)
# - api-server (Python/FastAPI)
# - ml-inference (Python/PyTorch)
# - dashboard (React)

# Test API
curl http://localhost:8080/health
# Expected: {"status": "healthy", "version": "3.2.5"}

# Access dashboard
open http://localhost:3000
```

---

## 3. Codebase Architecture

### 3.1 Repository Structure

```
atable-neural-2077/
├── services/
│   ├── threat-detection/          # Core detection engine (Rust)
│   │   ├── src/
│   │   │   ├── main.rs
│   │   │   ├── models/            # AI/ML model inference
│   │   │   ├── detectors/         # Detection algorithms
│   │   │   └── correlators/       # Threat correlation
│   │   ├── Cargo.toml
│   │   └── Dockerfile
│   │
│   ├── data-ingestion/            # Event ingestion (Go)
│   │   ├── cmd/
│   │   │   └── main.go
│   │   ├── internal/
│   │   │   ├── kafka/
│   │   │   ├── parsers/           # Event parsers
│   │   │   └── normalizers/       # Data normalization
│   │   ├── go.mod
│   │   └── Dockerfile
│   │
│   ├── api/                       # REST/GraphQL API (Python/FastAPI)
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── routes/            # API endpoints
│   │   │   ├── models/            # Pydantic models
│   │   │   └── services/          # Business logic
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   ├── ml-inference/              # ML model serving (Python/PyTorch)
│   │   ├── app/
│   │   │   ├── server.py
│   │   │   ├── models/            # Model loaders
│   │   │   └── preprocessors/     # Feature engineering
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   └── dashboard/                 # Frontend (React/TypeScript)
│       ├── src/
│       │   ├── App.tsx
│       │   ├── components/
│       │   ├── pages/
│       │   └── api/               # API client
│       ├── package.json
│       └── Dockerfile
│
├── ml/                            # Machine learning
│   ├── training/                  # Training scripts
│   │   ├── train_anomaly.py
│   │   ├── train_behavioral.py
│   │   └── train_correlator.py
│   ├── models/                    # Model architectures
│   │   ├── anomaly_detector.py
│   │   ├── lstm_behavior.py
│   │   └── xgboost_correlator.py
│   ├── notebooks/                 # Jupyter notebooks
│   └── data/                      # Sample datasets
│
├── k8s/                           # Kubernetes manifests
│   ├── base/                      # Base configurations
│   ├── overlays/                  # Environment-specific
│   │   ├── dev/
│   │   ├── staging/
│   │   └── production/
│   └── helm/                      # Helm charts
│
├── scripts/                       # Utility scripts
│   ├── setup-dev-env.sh
│   ├── load-sample-data.sh
│   ├── run-tests.sh
│   └── deploy.sh
│
├── docs/                          # Documentation
├── tests/                         # Integration tests
├── docker-compose.dev.yml         # Local development
└── README.md
```

### 3.2 Service Communication

```
┌─────────────┐
│  Dashboard  │  (React - Port 3000)
│  (Frontend) │
└──────┬──────┘
       │ HTTP/GraphQL
       ▼
┌─────────────┐
│  API Server │  (FastAPI - Port 8080)
│   (Python)  │
└──────┬──────┘
       │
       ├─────────────► PostgreSQL (user data, incidents)
       ├─────────────► ClickHouse (security events)
       ├─────────────► Redis (cache)
       │
       ▼
┌──────────────────┐
│ ML Inference     │  (PyTorch - Port 8081)
│ (Python)         │
└──────────────────┘
       ▲
       │
┌──────┴────────┐
│ Threat        │  (Rust - Port 8082)
│ Detection     │
└──────┬────────┘
       ▲
       │
┌──────┴────────┐
│ Data          │  (Go - Port 8083)
│ Ingestion     │
└──────┬────────┘
       ▲
       │
┌──────┴────────┐
│  Kafka        │  (Port 9092)
│  (Events)     │
└───────────────┘
```

---

## 4. Development Workflow

### 4.1 Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/add-new-detector

# 2. Make changes (example: add new threat detector)
# Edit: services/threat-detection/src/detectors/my_detector.rs

# 3. Run tests locally
./scripts/run-tests.sh

# 4. Lint code
cargo fmt --all  # Rust
go fmt ./...     # Go
black .          # Python
npm run lint     # JavaScript/TypeScript

# 5. Commit changes
git add .
git commit -m "feat: add new ransomware detector"
# Pre-commit hooks will run automatically

# 6. Push branch
git push origin feature/add-new-detector

# 7. Create pull request
gh pr create --title "Add new ransomware detector" --body "Closes #123"
```

### 4.2 Running Services Locally

**Option 1: Docker Compose (recommended)**
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose logs -f threat-detection

# Restart single service
docker-compose restart api
```

**Option 2: Native (faster iteration)**
```bash
# Terminal 1: Threat Detection Engine (Rust)
cd services/threat-detection
cargo run

# Terminal 2: API Server (Python)
cd services/api
python -m uvicorn app.main:app --reload --port 8080

# Terminal 3: Dashboard (React)
cd services/dashboard
npm run dev
```

### 4.3 Debugging

**Python (API/ML services):**
```python
# Use debugpy for remote debugging

import debugpy
debugpy.listen(("0.0.0.0", 5678))
print("Waiting for debugger attach...")
debugpy.wait_for_client()

# Attach VS Code debugger on port 5678
```

**Rust (Threat Detection):**
```bash
# Build with debug symbols
cargo build

# Run with GDB
gdb ./target/debug/threat-detection

# Or use rust-lldb
rust-lldb ./target/debug/threat-detection
```

---

## 5. Testing

### 5.1 Unit Tests

**Rust:**
```bash
cd services/threat-detection
cargo test

# Run specific test
cargo test test_anomaly_detector

# With coverage
cargo tarpaulin --out Html
open tarpaulin-report.html
```

**Python:**
```bash
cd services/api
pytest tests/ -v --cov=app --cov-report=html

# Run specific test
pytest tests/test_threats.py::test_list_threats
```

**Go:**
```bash
cd services/data-ingestion
go test ./... -v -cover

# With coverage report
go test ./... -coverprofile=coverage.out
go tool cover -html=coverage.out
```

### 5.2 Integration Tests

```bash
# Run full integration test suite
./scripts/run-integration-tests.sh

# This script:
# 1. Starts local Kubernetes cluster
# 2. Deploys all services
# 3. Runs end-to-end tests
# 4. Tears down cluster
```

**Example Integration Test:**
```python
# tests/integration/test_threat_detection_e2e.py

import pytest
from atable_client import AtableClient

def test_threat_detection_end_to_end():
    """
    Test full threat detection pipeline
    """
    client = AtableClient(api_url="http://localhost:8080")
    
    # 1. Ingest malicious event
    event = {
        "src_ip": "203.0.113.42",  # Known malicious IP
        "dst_ip": "10.0.0.100",
        "protocol": "TCP",
        "dst_port": 445,  # SMB
        "bytes_out": 1000000000  # 1GB exfiltration
    }
    client.ingest_event(event)
    
    # 2. Wait for detection (< 30 seconds SLA)
    import time
    time.sleep(35)
    
    # 3. Check threat was detected
    threats = client.threats.list(status="active")
    assert len(threats) > 0, "Threat not detected"
    
    detected_threat = threats[0]
    assert detected_threat.severity == "critical"
    assert detected_threat.threat_score > 90
    assert "data_exfiltration" in detected_threat.threat_type
    
    # 4. Verify automated response was triggered
    assert detected_threat.automated_response == True
    assert detected_threat.playbook_executed is not None
```

### 5.3 Performance Tests

```bash
# Load testing (using k6)
k6 run tests/performance/api_load_test.js

# Example test: 10,000 req/sec for 5 minutes
k6 run --vus 1000 --duration 5m tests/performance/api_load_test.js
```

---

## 6. Contributing Guidelines

### 6.1 Code Style

**Rust:**
```bash
# Format code
cargo fmt --all

# Lint
cargo clippy -- -D warnings

# Style guide: https://doc.rust-lang.org/1.0.0/style/
```

**Python:**
```bash
# Format code
black .
isort .

# Lint
ruff check .

# Type checking
mypy app/

# Style guide: PEP 8 + Google Python Style Guide
```

**Go:**
```bash
# Format code
gofmt -w .

# Lint
golangci-lint run

# Style guide: Effective Go
```

### 6.2 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build/tooling changes

**Example:**
```
feat(threat-detection): add zero-day exploit detector

Implemented heuristic-based zero-day detector using:
- Memory analysis
- Code emulation
- Behavioral patterns

Closes #456
```

### 6.3 Pull Request Process

1. **Create PR** from feature branch
2. **Automated checks** run (CI/CD):
   - Unit tests (all services)
   - Integration tests
   - Code coverage (min 80%)
   - Linting
   - Security scan (Snyk)
3. **Code review** (2 approvals required)
4. **Manual QA** testing (for major features)
5. **Merge** to `main` branch
6. **Automated deployment** to staging
7. **Production deployment** (after staging validation)

### 6.4 Code Review Checklist

**Reviewer Checklist:**
- ☐ Code follows style guide
- ☐ Tests added/updated
- ☐ Documentation updated
- ☐ No security vulnerabilities
- ☐ Performance impact considered
- ☐ Error handling implemented
- ☐ Logging added (appropriate level)
- ☐ No hardcoded secrets
- ☐ Backward compatibility maintained

---

## Quick Start (TL;DR)

```bash
# 1. Clone repo
git clone https://github.com/atable-neural/atable-neural-2077.git
cd atable-neural-2077

# 2. Setup environment
./scripts/setup-dev-env.sh

# 3. Start services
docker-compose -f docker-compose.dev.yml up -d

# 4. Run tests
./scripts/run-tests.sh

# 5. Access dashboard
open http://localhost:3000

# 6. Happy coding! 🚀
```

---

## Conclusion

Follow this guide to set up your development environment and contribute effectively to ATABLE NEURAL 2077.

**Next:** [Operations Runbook](./09-operations-runbook.md)

---

**© 2025 ATABLE NEURAL AI Inc. All rights reserved.**
