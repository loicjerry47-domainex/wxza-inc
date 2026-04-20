# OTO - Developer Onboarding
## Local Development Setup & Contribution Guide

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 30 minutes

---

## Executive Summary

This guide helps developers set up OTO's local development environment, understand the codebase architecture, and contribute effectively. Complete setup takes **~30 minutes**, covering **Docker Compose**, **Kubernetes (kind)**, **Neo4j**, **InfluxDB**, **PostgreSQL**, and **Redis**.

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

```bash
# macOS (recommended)
brew install node@20
brew install python@3.11
brew install docker
brew install kubectl
brew install kind  # Kubernetes in Docker

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y python3.11 python3-pip
sudo apt-get install -y docker.io
sudo snap install kubectl --classic
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

**Required Versions:**
- Node.js: 20.x
- Python: 3.11+
- Docker: 24.x+
- kubectl: 1.28+
- kind: 0.20+

### 1.2 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **CPU** | 4 cores | 8+ cores |
| **RAM** | 16 GB | 32 GB |
| **Disk** | 50 GB free | 100 GB free |
| **OS** | macOS 12+, Ubuntu 22.04+ | macOS 14+, Ubuntu 24.04+ |

---

## 2. Local Development Setup

### 2.1 Clone Repository

```bash
# SSH (recommended)
git clone git@github.com:oto-ai/platform.git
cd platform

# HTTPS
git clone https://github.com/oto-ai/platform.git
cd platform
```

### 2.2 Install Dependencies

```bash
# Backend (Node.js services)
cd services/contact-service
npm install
cd ../..

cd services/interaction-service
npm install
cd ../..

# Backend (Python services)
cd services/sentiment-analysis
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ../..

cd services/gift-recommender
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../..

# Frontend
cd web
npm install
cd ..

cd mobile
npm install
cd ..
```

### 2.3 Setup Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your local values
# NEO4J_URI=bolt://localhost:7687
# NEO4J_USER=neo4j
# NEO4J_PASSWORD=password
# POSTGRES_HOST=localhost
# POSTGRES_PORT=5432
# POSTGRES_DB=oto_dev
# POSTGRES_USER=oto
# POSTGRES_PASSWORD=password
# REDIS_URL=redis://localhost:6379
# INFLUXDB_URL=http://localhost:8086
# INFLUXDB_TOKEN=your-token-here
# ELASTICSEARCH_URL=http://localhost:9200
# KAFKA_BROKERS=localhost:9092
```

### 2.4 Start Local Infrastructure (Docker Compose)

```bash
# Start all infrastructure services
docker-compose up -d

# Verify all services are running
docker-compose ps

# Expected output:
# NAME                    STATUS
# oto-neo4j               Up (healthy)
# oto-postgres            Up (healthy)
# oto-redis               Up (healthy)
# oto-influxdb            Up (healthy)
# oto-elasticsearch       Up (healthy)
# oto-kafka               Up (healthy)
# oto-zookeeper           Up (healthy)
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  neo4j:
    image: neo4j:5.13
    container_name: oto-neo4j
    ports:
      - "7474:7474"  # HTTP
      - "7687:7687"  # Bolt
    environment:
      NEO4J_AUTH: neo4j/password
      NEO4J_dbms_memory_pagecache_size: 2G
      NEO4J_dbms_memory_heap_max__size: 4G
    volumes:
      - neo4j-data:/data
    healthcheck:
      test: ["CMD", "cypher-shell", "-u", "neo4j", "-p", "password", "RETURN 1"]
      interval: 10s
      timeout: 5s
      retries: 5

  postgres:
    image: postgres:16
    container_name: oto-postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: oto_dev
      POSTGRES_USER: oto
      POSTGRES_PASSWORD: password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U oto"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: oto-redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  influxdb:
    image: influxdb:2.7
    container_name: oto-influxdb
    ports:
      - "8086:8086"
    environment:
      DOCKER_INFLUXDB_INIT_MODE: setup
      DOCKER_INFLUXDB_INIT_USERNAME: admin
      DOCKER_INFLUXDB_INIT_PASSWORD: password123
      DOCKER_INFLUXDB_INIT_ORG: oto
      DOCKER_INFLUXDB_INIT_BUCKET: interactions
      DOCKER_INFLUXDB_INIT_ADMIN_TOKEN: dev-token-12345
    volumes:
      - influxdb-data:/var/lib/influxdb2
    healthcheck:
      test: ["CMD", "influx", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: oto-elasticsearch
    ports:
      - "9200:9200"
    environment:
      discovery.type: single-node
      xpack.security.enabled: false
      ES_JAVA_OPTS: "-Xms2g -Xmx2g"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:9200/_cluster/health || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5

  zookeeper:
    image: confluentinc/cp-zookeeper:7.5.0
    container_name: oto-zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    volumes:
      - zookeeper-data:/var/lib/zookeeper/data

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    container_name: oto-kafka
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    volumes:
      - kafka-data:/var/lib/kafka/data
    healthcheck:
      test: ["CMD-SHELL", "kafka-broker-api-versions --bootstrap-server localhost:9092"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  neo4j-data:
  postgres-data:
  redis-data:
  influxdb-data:
  elasticsearch-data:
  zookeeper-data:
  kafka-data:
```

### 2.5 Database Migrations

```bash
# Run PostgreSQL migrations
cd services/contact-service
npm run migrate

# Seed Neo4j with sample data
cd services/relationship-graph
npm run seed

# Create InfluxDB buckets
influx bucket create -n interactions -o oto -t dev-token-12345
influx bucket create -n health_scores -o oto -t dev-token-12345
```

### 2.6 Start Development Servers

```bash
# Terminal 1: Contact Service (Node.js)
cd services/contact-service
npm run dev
# Listening on http://localhost:3001

# Terminal 2: Interaction Service (Python)
cd services/interaction-service
source venv/bin/activate
uvicorn main:app --reload --port 3002
# Listening on http://localhost:3002

# Terminal 3: Sentiment Analysis (Python)
cd services/sentiment-analysis
source venv/bin/activate
uvicorn main:app --reload --port 3003
# Listening on http://localhost:3003

# Terminal 4: Gift Recommender (Python)
cd services/gift-recommender
source venv/bin/activate
uvicorn main:app --reload --port 3004
# Listening on http://localhost:3004

# Terminal 5: Web Frontend (React)
cd web
npm run dev
# Listening on http://localhost:3000

# Terminal 6: Mobile (React Native)
cd mobile
npm run ios  # or npm run android
```

### 2.7 Verify Setup

```bash
# Check API health endpoints
curl http://localhost:3001/health  # Contact Service
curl http://localhost:3002/health  # Interaction Service
curl http://localhost:3003/health  # Sentiment Analysis
curl http://localhost:3004/health  # Gift Recommender

# All should return: {"status":"ok"}

# Access web app
open http://localhost:3000
```

---

## 3. Codebase Architecture

### 3.1 Repository Structure

```
oto-platform/
├── services/
│   ├── contact-service/           # Node.js - Contact CRUD
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── interaction-service/       # Python - Log interactions
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   ├── tests/
│   │   ├── requirements.txt
│   │   └── main.py
│   ├── sentiment-analysis/        # Python - NLP sentiment
│   │   ├── app/
│   │   ├── models/
│   │   ├── tests/
│   │   └── requirements.txt
│   ├── gift-recommender/          # Python - ML gift suggestions
│   │   ├── app/
│   │   ├── models/
│   │   ├── tests/
│   │   └── requirements.txt
│   ├── relationship-graph/        # Node.js - Neo4j graph ops
│   ├── reminder-service/          # Node.js - Reminder scheduling
│   └── api-gateway/               # Kong - API routing
├── web/                           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── mobile/                        # React Native
│   ├── src/
│   ├── ios/
│   ├── android/
│   └── package.json
├── infrastructure/                # Kubernetes manifests
│   ├── k8s/
│   │   ├── base/
│   │   └── overlays/
│   └── terraform/
├── ml/                            # ML models & training
│   ├── sentiment-analysis/
│   ├── gift-recommender/
│   ├── churn-predictor/
│   └── training-pipelines/
├── scripts/                       # Utility scripts
├── docs/                          # Documentation
├── docker-compose.yml
├── Makefile
└── README.md
```

### 3.2 Service Communication

```
Web/Mobile App
      │
      ▼
 API Gateway (Kong)
      │
      ├─────────┬─────────┬─────────┬─────────┐
      │         │         │         │         │
      ▼         ▼         ▼         ▼         ▼
  Contact  Interaction Sentiment  Gift   Reminder
  Service   Service    Analysis  Recomm  Service
      │         │         │         │         │
      └─────────┴─────────┴─────────┴─────────┘
                       │
                       ▼
              Kafka (Event Bus)
                       │
      ┌────────────────┼────────────────┐
      │                │                │
      ▼                ▼                ▼
   Neo4j          InfluxDB         PostgreSQL
  (Graph)      (Time-Series)        (RDBMS)
```

---

## 4. Development Workflow

### 4.1 Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/add-gift-filtering

# 2. Make changes
# Edit code...

# 3. Run linter
npm run lint  # Node.js services
black .       # Python services
flake8 .      # Python linter

# 4. Run tests
npm run test              # Node.js
pytest                    # Python
npm run test:integration  # Integration tests

# 5. Commit changes
git add .
git commit -m "feat: add gift filtering by price range"

# 6. Push to GitHub
git push origin feature/add-gift-filtering

# 7. Create Pull Request
# Open GitHub, create PR, request reviews

# 8. Address review comments
# Make changes, push updates

# 9. Merge to main (after approval + CI passing)
```

### 4.2 Code Review Checklist

**Before Requesting Review:**
- [ ] Code follows style guide (ESLint, Black)
- [ ] All tests pass (unit + integration)
- [ ] New tests added for new features
- [ ] Documentation updated (README, API docs)
- [ ] No console.log or debugging code
- [ ] No hardcoded secrets or API keys

**Reviewers Check:**
- [ ] Code is readable and maintainable
- [ ] Logic is correct and handles edge cases
- [ ] Performance is acceptable (no N+1 queries)
- [ ] Security vulnerabilities addressed
- [ ] Error handling is robust
- [ ] API changes are backward compatible

---

## 5. Testing

### 5.1 Unit Tests (Node.js)

```typescript
// services/contact-service/tests/controllers/contact.test.ts
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';
import { Neo4jService } from '../../src/services/neo4j';

describe('ContactController', () => {
  beforeEach(async () => {
    // Setup: Clear test database
    await Neo4jService.clearTestData();
  });

  afterEach(async () => {
    // Teardown: Clean up
    await Neo4jService.clearTestData();
  });

  describe('POST /contacts', () => {
    it('should create a new contact', async () => {
      const response = await request(app)
        .post('/contacts')
        .set('Authorization', 'Bearer test-token')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1-555-0123'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('John Doe');
      expect(response.body.email).toBe('john@example.com');
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/contacts')
        .set('Authorization', 'Bearer test-token')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          phone: '+1-555-0123'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid email');
    });
  });
});
```

### 5.2 Unit Tests (Python)

```python
# services/sentiment-analysis/tests/test_sentiment.py
import pytest
from app.services.sentiment import SentimentAnalyzer

@pytest.fixture
def analyzer():
    return SentimentAnalyzer()

def test_positive_sentiment(analyzer):
    text = "I absolutely love this! Amazing experience!"
    result = analyzer.analyze(text)
    
    assert result['label'] == 'positive'
    assert result['score'] > 0.9
    assert result['sentiment_value'] > 0.5

def test_negative_sentiment(analyzer):
    text = "This is terrible. I'm very disappointed."
    result = analyzer.analyze(text)
    
    assert result['label'] == 'negative'
    assert result['score'] > 0.9
    assert result['sentiment_value'] < -0.5

def test_neutral_sentiment(analyzer):
    text = "The weather is okay today."
    result = analyzer.analyze(text)
    
    assert result['label'] == 'neutral'
    assert -0.3 < result['sentiment_value'] < 0.3

def test_empty_text(analyzer):
    with pytest.raises(ValueError):
        analyzer.analyze("")
```

### 5.3 Integration Tests

```typescript
// services/contact-service/tests/integration/contact-interaction.test.ts
import { describe, it, expect } from '@jest/globals';
import { ContactService } from '../../src/services/contact';
import { InteractionService } from '../../src/services/interaction';
import { HealthScoreService } from '../../src/services/health-score';

describe('Contact-Interaction Integration', () => {
  it('should update health score after interaction', async () => {
    // 1. Create contact
    const contact = await ContactService.create({
      userId: 'usr_test',
      name: 'Jane Doe',
      email: 'jane@example.com'
    });

    // Initial health score should be 50
    expect(contact.healthScore).toBe(50);

    // 2. Log interaction
    await InteractionService.log({
      userId: 'usr_test',
      contactId: contact.id,
      type: 'email',
      direction: 'sent',
      content: 'Hey Jane! Great catching up with you!',
      sentiment: 0.85
    });

    // 3. Wait for async processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 4. Check updated health score
    const updatedContact = await ContactService.getById(contact.id);
    expect(updatedContact.healthScore).toBeGreaterThan(50);
  });
});
```

### 5.4 E2E Tests (Playwright)

```typescript
// web/e2e/contact-creation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Creation Flow', () => {
  test('should create a new contact', async ({ page }) => {
    // 1. Login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to contacts page
    await page.waitForURL('http://localhost:3000/dashboard');
    await page.click('a[href="/contacts"]');

    // 3. Click "Add Contact" button
    await page.click('button:has-text("Add Contact")');

    // 4. Fill form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '+1-555-0123');

    // 5. Submit
    await page.click('button:has-text("Save")');

    // 6. Verify contact appears in list
    await expect(page.locator('text=John Doe')).toBeVisible();
  });
});
```

### 5.5 Running Tests

```bash
# Unit tests (Node.js)
cd services/contact-service
npm run test
npm run test:watch  # Watch mode
npm run test:coverage  # With coverage

# Unit tests (Python)
cd services/sentiment-analysis
pytest
pytest --cov=app  # With coverage

# Integration tests
npm run test:integration

# E2E tests
cd web
npm run test:e2e
npm run test:e2e:ui  # With Playwright UI

# All tests
npm run test:all
```

---

## 6. Contributing Guidelines

### 6.1 Commit Message Format

**Format:** `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(contacts): add filtering by relationship type
fix(sentiment): handle empty text input
docs(api): update authentication section
refactor(health-score): simplify calculation logic
perf(database): add index on contact.user_id
test(gifts): add unit tests for recommendation engine
chore(deps): upgrade React to v19
```

### 6.2 Pull Request Template

```markdown
## Description
<!-- Brief description of changes -->

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
- [ ] Dependent changes merged

## Screenshots (if applicable)
<!-- Add screenshots for UI changes -->
```

---

## Conclusion

Complete OTO local setup in **~30 minutes** with **Docker Compose**, **Kubernetes**, and **7 microservices**. Follow development workflow, write comprehensive tests, and contribute with clear commit messages and PRs.

**Next:** [Operations Runbook](./09-operations-runbook.md)

---

**© 2025 OTO AI Inc. All rights reserved.**
