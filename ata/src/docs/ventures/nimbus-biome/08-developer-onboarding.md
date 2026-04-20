# NIMBUS BIOME - Developer Onboarding
## Development Environment Setup, Workflow & Best Practices

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Developer Documentation  
**Reading Time:** 30 minutes

---

## Executive Summary

This guide provides **complete onboarding** for engineers joining NIMBUS BIOME. You'll learn to **set up your development environment**, **understand our tech stack**, **follow our workflows**, and **ship code to production** within your first week.

### Quick Stats

| Metric | Value |
|--------|-------|
| **Tech Stack** | Rust, Python, Go, TypeScript, React |
| **Deployment Frequency** | 50+ deploys/day |
| **Time to First Deploy** | 2 days (average) |
| **Code Review SLA** | <4 hours |
| **Test Coverage** | >85% (enforced) |
| **CI/CD Pipeline** | GitHub Actions → ArgoCD |

---

## Table of Contents

1. [Prerequisites & Setup](#1-prerequisites--setup)
2. [Local Development Environment](#2-local-development-environment)
3. [Architecture Overview](#3-architecture-overview)
4. [Development Workflow](#4-development-workflow)
5. [Code Standards & Style Guide](#5-code-standards--style-guide)
6. [Testing](#6-testing)
7. [CI/CD Pipeline](#7-cicd-pipeline)
8. [Deployment](#8-deployment)
9. [Monitoring & Debugging](#9-monitoring--debugging)
10. [Getting Help](#10-getting-help)

---

## 1. Prerequisites & Setup

### 1.1 Hardware Requirements

**Minimum**:
- **CPU**: Intel i5 / AMD Ryzen 5 (4 cores)
- **RAM**: 16GB
- **Storage**: 256GB SSD
- **OS**: macOS 13+, Ubuntu 22.04+, Windows 11 (with WSL2)

**Recommended**:
- **CPU**: Intel i7 / AMD Ryzen 7 / Apple M1/M2 (8+ cores)
- **RAM**: 32GB
- **Storage**: 512GB NVMe SSD

### 1.2 Access Requests

**Day 1 Checklist** (Submit to IT):
- [ ] **Email**: your.name@nimbusbiome.io
- [ ] **GitHub**: Add to `nimbusbiome` organization
- [ ] **AWS Console**: SSO access (Okta)
- [ ] **Kubernetes**: kubectl access (via Okta OIDC)
- [ ] **Slack**: #engineering, #deployments, #incidents channels
- [ ] **1Password**: Team vault access
- [ ] **PagerDuty**: On-call rotation (after 2 weeks)
- [ ] **Jira**: Engineering board access

### 1.3 Laptop Setup Script

```bash
#!/bin/bash
# Run this script on day 1 to install all required tools

set -e  # Exit on error

echo "🚀 NIMBUS BIOME Developer Setup"
echo "================================"

# 1. Install Homebrew (macOS) or apt packages (Linux)
if [[ "$OSTYPE" == "darwin"* ]]; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew update
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo apt update
    sudo apt install -y build-essential curl git
fi

# 2. Install development tools
brew install --cask docker  # Docker Desktop
brew install kubectl kubectx stern  # Kubernetes tools
brew install awscli  # AWS CLI
brew install terraform  # Infrastructure as Code
brew install jq yq  # JSON/YAML processors
brew install postgresql@16  # PostgreSQL client

# 3. Install programming languages
## Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustup component add clippy rustfmt

## Python (via pyenv)
brew install pyenv
pyenv install 3.11.7
pyenv global 3.11.7

## Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

## Go
brew install go@1.21

# 4. Install IDE (VS Code)
brew install --cask visual-studio-code

# 5. Install VS Code extensions
code --install-extension rust-lang.rust-analyzer
code --install-extension ms-python.python
code --install-extension golang.go
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools

# 6. Clone repositories
mkdir -p ~/nimbus
cd ~/nimbus
gh auth login  # GitHub CLI authentication
gh repo clone nimbusbiome/platform
gh repo clone nimbusbiome/infrastructure
gh repo clone nimbusbiome/ml-models

echo "✅ Setup complete! Next steps:"
echo "1. cd ~/nimbus/platform"
echo "2. cp .env.example .env  # Configure local environment"
echo "3. make dev  # Start local development environment"
```

---

## 2. Local Development Environment

### 2.1 Docker Compose Stack

**Start all services locally**:

```yaml
# docker-compose.yml
version: '3.9'

services:
  # PostgreSQL (metadata, users, configs)
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: nimbus_dev
      POSTGRES_USER: nimbus
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis (cache)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # InfluxDB (time-series)
  influxdb:
    image: influxdb:2.7
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_USERNAME: admin
      DOCKER_INFLUXDB_INIT_PASSWORD: dev_password
      DOCKER_INFLUXDB_INIT_ORG: nimbus-dev
      DOCKER_INFLUXDB_INIT_BUCKET: nimbus_biome
    ports:
      - "8086:8086"
    volumes:
      - influxdb_data:/var/lib/influxdb2

  # Kafka (event streaming)
  kafka:
    image: confluentinc/cp-kafka:7.5.0
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"

  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  # API Gateway (Rust)
  api-gateway:
    build:
      context: ./services/api-gateway
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://nimbus:dev_password@postgres/nimbus_dev
      REDIS_URL: redis://redis:6379
      INFLUXDB_URL: http://influxdb:8086
      RUST_LOG: info
    volumes:
      - ./services/api-gateway:/app
    command: cargo watch -x run

  # Web App (React)
  web-app:
    build:
      context: ./apps/web
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./apps/web:/app
      - /app/node_modules
    command: npm run dev

volumes:
  postgres_data:
  influxdb_data:
```

**Start development environment**:
```bash
docker-compose up -d
```

### 2.2 Environment Variables

```bash
# .env (local development)
## Database
DATABASE_URL=postgresql://nimbus:dev_password@localhost:5432/nimbus_dev
INFLUXDB_URL=http://localhost:8086
INFLUXDB_TOKEN=dev_token
INFLUXDB_ORG=nimbus-dev
REDIS_URL=redis://localhost:6379

## AWS (LocalStack for local development)
AWS_REGION=us-east-1
AWS_ENDPOINT_URL=http://localhost:4566  # LocalStack
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test

## Authentication
JWT_SECRET=dev_jwt_secret_change_in_production
OKTA_DOMAIN=dev-12345678.okta.com
OKTA_CLIENT_ID=0oa123456789
OKTA_CLIENT_SECRET=secret

## Feature Flags
FEATURE_HVAC_CONTROL=true
FEATURE_ML_PREDICTIONS=false  # Disabled in dev (expensive)
```

### 2.3 Running Individual Services

**API Gateway** (Rust):
```bash
cd services/api-gateway
cargo run --bin api-gateway

# Or with hot reload:
cargo watch -x run
```

**Data Ingestion** (Go):
```bash
cd services/data-ingestion
go run main.go

# Or with hot reload:
air  # Uses .air.toml config
```

**ML Inference** (Python):
```bash
cd services/ml-inference
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m app.main
```

**Web App** (React):
```bash
cd apps/web
npm install
npm run dev  # Starts on http://localhost:3000
```

---

## 3. Architecture Overview

### 3.1 Repository Structure

```
nimbusbiome/platform/
├── apps/
│   ├── web/                 # React web application
│   ├── mobile/              # React Native mobile app
│   └── admin/               # Admin dashboard
├── services/
│   ├── api-gateway/         # Rust (Actix-web)
│   ├── data-ingestion/      # Go
│   ├── ml-inference/        # Python (FastAPI)
│   ├── hvac-control/        # Rust
│   └── websocket-server/    # Node.js (Socket.io)
├── packages/
│   ├── shared-types/        # TypeScript types (shared across services)
│   └── sdk/                 # Client SDKs (JS, Python)
├── infrastructure/
│   ├── kubernetes/          # K8s manifests
│   ├── terraform/           # AWS infrastructure
│   └── helm/                # Helm charts
├── scripts/
│   ├── setup.sh             # Developer setup
│   └── deploy.sh            # Deployment script
├── docs/                    # Technical documentation
├── Makefile                 # Common commands
└── docker-compose.yml       # Local development
```

### 3.2 Tech Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **API Gateway** | Rust (Actix-web) | High-performance REST API |
| **Data Ingestion** | Go | IoT data pipeline (high throughput) |
| **ML Inference** | Python (FastAPI) | Machine learning predictions |
| **HVAC Control** | Rust | Real-time building automation |
| **WebSocket Server** | Node.js (Socket.io) | Real-time dashboards |
| **Web App** | React 19 + TypeScript | User interface |
| **Mobile App** | React Native | iOS/Android apps |
| **Databases** | PostgreSQL, InfluxDB, Redis | Data storage |
| **Orchestration** | Kubernetes (EKS) | Container management |
| **CI/CD** | GitHub Actions + ArgoCD | Automated deployment |

---

## 4. Development Workflow

### 4.1 Git Workflow (Trunk-Based Development)

**Branching Strategy**:
```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/hvac-optimization

# 2. Make changes, commit frequently
git add .
git commit -m "feat: implement adaptive HVAC setpoint control"

# 3. Push to remote
git push origin feature/hvac-optimization

# 4. Open Pull Request on GitHub
gh pr create --title "feat: Adaptive HVAC setpoint control" \
  --body "Implements ML-based HVAC optimization algorithm. Closes #1234"

# 5. After approval, squash and merge
gh pr merge --squash --delete-branch
```

**Commit Message Convention** (Conventional Commits):
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `chore`: Build process, tooling

**Example**:
```
feat(hvac): implement adaptive setpoint control

Implements reinforcement learning-based HVAC optimization
that reduces energy consumption by 35% while maintaining
thermal comfort (ASHRAE 55 compliance).

Closes #1234
```

### 4.2 Pull Request Process

**PR Checklist**:
- [ ] **Tests pass**: All unit & integration tests green
- [ ] **Code coverage**: >85% (enforced by CI)
- [ ] **Linting**: No warnings from Clippy (Rust), ESLint (TS), Black (Python)
- [ ] **Documentation**: Public APIs documented
- [ ] **Changelog**: Entry added to CHANGELOG.md
- [ ] **Breaking changes**: Clearly documented if any

**Review Requirements**:
- **1 approval** for minor changes (<100 lines)
- **2 approvals** for major changes (>100 lines, breaking changes)
- **Architecture review** for new services, database schema changes

**Review SLA**: <4 hours during business hours

### 4.3 Code Review Guidelines

**As a Reviewer**:
- ✅ Check for correctness, edge cases
- ✅ Suggest improvements, don't just criticize
- ✅ Approve if you'd be comfortable deploying it
- ❌ Don't nitpick style (linters enforce this)

**As an Author**:
- ✅ Respond to all comments
- ✅ Make requested changes or explain why not
- ✅ Re-request review after changes
- ❌ Don't merge without approval

---

## 5. Code Standards & Style Guide

### 5.1 Rust

**Style**: Follow Rust standard style (enforced by `rustfmt`)

```rust
// Good: Idiomatic Rust
pub async fn get_building_metrics(
    building_id: Uuid,
    start_time: DateTime<Utc>,
    end_time: DateTime<Utc>,
) -> Result<BuildingMetrics, ApiError> {
    let metrics = database::query_metrics(building_id, start_time, end_time)
        .await
        .map_err(|e| ApiError::DatabaseError(e.to_string()))?;
    
    Ok(metrics)
}

// Bad: Not using Result for error handling
pub async fn get_building_metrics(building_id: Uuid) -> BuildingMetrics {
    database::query_metrics(building_id).await.unwrap()  // ❌ Don't panic!
}
```

**Error Handling**:
```rust
// Use thiserror for custom error types
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Database error: {0}")]
    DatabaseError(String),
    
    #[error("Not found: {0}")]
    NotFound(String),
    
    #[error("Unauthorized")]
    Unauthorized,
}
```

### 5.2 Python

**Style**: PEP 8 (enforced by `black` + `flake8`)

```python
# Good: Type hints, docstrings
def predict_occupancy(
    building_id: str,
    timestamp: datetime,
    historical_data: pd.DataFrame
) -> OccupancyPrediction:
    """
    Predict building occupancy for next 24 hours.
    
    Args:
        building_id: Unique building identifier
        timestamp: Prediction start time
        historical_data: Past occupancy data (7 days)
    
    Returns:
        OccupancyPrediction object with hourly forecasts
    
    Raises:
        ValueError: If historical_data is insufficient
    """
    if len(historical_data) < 168:  # 7 days × 24 hours
        raise ValueError("Insufficient historical data (need 7 days)")
    
    # ML inference logic...
    return OccupancyPrediction(...)

# Bad: No type hints, no docstring
def predict_occupancy(building_id, timestamp, historical_data):
    return model.predict(historical_data)  # What does this return?
```

### 5.3 TypeScript

**Style**: Airbnb style guide (enforced by ESLint + Prettier)

```typescript
// Good: Explicit types, clear function signatures
interface BuildingMetrics {
  buildingId: string;
  energy: {
    currentKw: number;
    todayKwh: number;
  };
  occupancy: {
    current: number;
    capacity: number;
  };
}

async function fetchBuildingMetrics(
  buildingId: string
): Promise<BuildingMetrics> {
  const response = await fetch(`/api/buildings/${buildingId}/metrics`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch metrics: ${response.statusText}`);
  }
  
  return response.json();
}

// Bad: No types, implicit any
async function fetchBuildingMetrics(buildingId) {
  return await fetch(`/api/buildings/${buildingId}/metrics`).then(r => r.json());
}
```

---

## 6. Testing

### 6.1 Test Pyramid

```
         /\
        /  \  E2E Tests (10%)
       /────\
      /      \  Integration Tests (20%)
     /────────\
    /          \  Unit Tests (70%)
   /────────────\
```

**Coverage Requirements**:
- **Unit tests**: >85% code coverage
- **Integration tests**: All API endpoints
- **E2E tests**: Critical user flows

### 6.2 Running Tests

**Rust**:
```bash
# Run all tests
cargo test

# Run specific test
cargo test test_hvac_optimization

# Run with coverage
cargo install cargo-tarpaulin
cargo tarpaulin --out Html --output-dir coverage
```

**Python**:
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_ml_inference.py
```

**TypeScript** (React):
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- BuildingDashboard.test.tsx
```

### 6.3 Writing Good Tests

**Unit Test Example** (Rust):
```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[tokio::test]
    async fn test_calculate_energy_savings() {
        // Arrange
        let baseline_kwh = 10000.0;
        let actual_kwh = 6500.0;
        
        // Act
        let savings = calculate_energy_savings(baseline_kwh, actual_kwh);
        
        // Assert
        assert_eq!(savings.percentage, 35.0);
        assert_eq!(savings.kwh_saved, 3500.0);
    }
    
    #[tokio::test]
    async fn test_hvac_control_validates_setpoint() {
        // Test edge case: setpoint out of range
        let result = set_hvac_setpoint(50.0);  // 50°F is too cold
        
        assert!(result.is_err());
        assert_eq!(
            result.unwrap_err().to_string(),
            "Setpoint out of range (must be 65-80°F)"
        );
    }
}
```

---

## 7. CI/CD Pipeline

### 7.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-rust:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - name: Run tests
        run: cargo test --all-features
      - name: Run Clippy
        run: cargo clippy -- -D warnings
      - name: Check formatting
        run: cargo fmt -- --check

  test-python:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest --cov=app --cov-report=xml
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build-docker:
    runs-on: ubuntu-latest
    needs: [test-rust, test-python]
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t nimbusbiome/api-gateway:${{ github.sha }} .
      - name: Push to ECR
        run: |
          aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
          docker push nimbusbiome/api-gateway:${{ github.sha }}
```

### 7.2 Deployment Pipeline (ArgoCD)

**Kubernetes Manifest**:
```yaml
# kubernetes/api-gateway/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  namespace: nimbus-prod
spec:
  replicas: 100
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
        version: v2.1.0
    spec:
      containers:
      - name: api-gateway
        image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/nimbusbiome/api-gateway:abc123  # ← Updated by ArgoCD
        ports:
        - containerPort: 8080
```

**ArgoCD Auto-Sync**:
- Monitors Git repository for changes
- Automatically deploys when main branch updates
- Rollback on failure (health checks)

---

## 8. Deployment

### 8.1 Deployment Process

**Automatic** (Merge to main):
```bash
# 1. Merge PR to main
gh pr merge --squash

# 2. CI builds Docker image, pushes to ECR
# 3. ArgoCD detects new image, deploys to production
# 4. Health checks pass → rollout complete
# 5. Slack notification: "✅ api-gateway v2.1.0 deployed"
```

**Manual** (Hotfix):
```bash
# 1. Tag release
git tag v2.1.1
git push origin v2.1.1

# 2. Trigger manual deploy
kubectl set image deployment/api-gateway \
  api-gateway=nimbusbiome/api-gateway:v2.1.1 \
  --namespace nimbus-prod

# 3. Monitor rollout
kubectl rollout status deployment/api-gateway -n nimbus-prod
```

### 8.2 Rollback

```bash
# Rollback to previous version
kubectl rollout undo deployment/api-gateway -n nimbus-prod

# Rollback to specific version
kubectl rollout undo deployment/api-gateway --to-revision=42
```

---

## 9. Monitoring & Debugging

### 9.1 Logs

**Kubernetes Logs**:
```bash
# Tail logs for specific pod
kubectl logs -f pod/api-gateway-abc123 -n nimbus-prod

# Tail logs for all pods in deployment
stern api-gateway -n nimbus-prod

# Search logs (last 1 hour)
stern api-gateway -n nimbus-prod --since 1h | grep ERROR
```

**Centralized Logging** (Elasticsearch):
- Access: https://logs.nimbusbiome.io
- Query: `service:api-gateway AND level:ERROR`

### 9.2 Metrics (Grafana)

**Dashboards**:
- **Platform Overview**: https://grafana.nimbusbiome.io/d/platform
- **API Gateway**: https://grafana.nimbusbiome.io/d/api-gateway
- **Database Performance**: https://grafana.nimbusbiome.io/d/database

**Key Metrics**:
- API latency (p50, p95, p99)
- Error rate (5xx responses)
- Request throughput (req/sec)
- Database query time

### 9.3 Debugging in Production

**Connect to Pod** (for emergency debugging):
```bash
# Get shell in running pod
kubectl exec -it pod/api-gateway-abc123 -n nimbus-prod -- /bin/sh

# Port-forward for local debugging
kubectl port-forward svc/api-gateway 8080:8080 -n nimbus-prod
```

**Distributed Tracing** (Jaeger):
- Access: https://jaeger.nimbusbiome.io
- Search by trace ID, service, operation

---

## 10. Getting Help

### 10.1 Resources

**Documentation**:
- **Internal Wiki**: https://wiki.nimbusbiome.io
- **API Docs**: https://api.nimbusbiome.io/docs
- **Runbooks**: `/docs/runbooks/`

**Slack Channels**:
- **#engineering**: General engineering discussion
- **#deployments**: Deployment notifications
- **#incidents**: Production incidents (PagerDuty alerts)
- **#ask-devops**: Infrastructure questions

### 10.2 Onboarding Buddy

**Assigned on Day 1**:
- Senior engineer mentor
- 1:1 meetings (daily first week, weekly thereafter)
- Code review buddy
- On-call shadowing (week 3-4)

### 10.3 Common Issues

**"Docker won't start"**:
```bash
# macOS: Increase Docker resources
# Docker Desktop → Settings → Resources → Memory: 8GB+
```

**"kubectl: command not found"**:
```bash
brew install kubectl
```

**"Database connection refused"**:
```bash
# Ensure Docker Compose is running
docker-compose ps
docker-compose up -d postgres
```

---

## Conclusion

You're now ready to start contributing to NIMBUS BIOME! Follow this guide, ask questions in Slack, and ship your first code within 2 days. Welcome to the team! 🚀

---

**Document Classification**: Developer Documentation  
**Last Updated**: November 28, 2025  
**Maintained By**: Engineering Team  

© 2025 NIMBUS BIOME Inc. All rights reserved.
