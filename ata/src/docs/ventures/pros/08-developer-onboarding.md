# PRO'S Developer Onboarding Guide
## Getting Started with PRO'S Platform Development

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Internal - Engineering Documentation  
**Target Audience**: New hires, contractors, partner developers

---

## Welcome to PRO'S Engineering! 🎉

This guide will help you set up your development environment and make your first contribution to the PRO'S platform. Expected time to first commit: **4 hours** ⏱️

---

## Day 1: Environment Setup

### Prerequisites

**Required Software**:
```bash
# macOS (recommended for development)
- macOS 13+ (Ventura or newer)
- 16GB RAM minimum (32GB recommended)
- 100GB free disk space

# Windows (with WSL2)
- Windows 11 Pro
- WSL2 with Ubuntu 22.04
- 16GB RAM minimum
- 100GB free disk space

# Linux
- Ubuntu 22.04 LTS or similar
- 16GB RAM minimum
```

### Install Development Tools

```bash
# 1. Install Homebrew (macOS/Linux)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install essential tools
brew install git gh kubectl helm terraform docker docker-compose \
  node@20 python@3.11 go rust awscli jq yq direnv

# 3. Install Node.js dependencies globally
npm install -g pnpm yarn typescript ts-node prettier eslint

# 4. Install Python tools
pip3 install pipenv poetry black flake8 mypy pytest

# 5. Install Rust tools
rustup component add clippy rustfmt
cargo install cargo-watch cargo-edit

# 6. Install Docker Desktop (GUI)
# Download from: https://www.docker.com/products/docker-desktop

# 7. Install VS Code
brew install --cask visual-studio-code

# 8. Install VS Code extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-python.python
code --install-extension rust-lang.rust-analyzer
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
```

### Clone Repositories

```bash
# Create workspace directory
mkdir ~/pros-workspace
cd ~/pros-workspace

# Clone main repositories
gh auth login  # Authenticate with GitHub
gh repo clone pros-platform/infrastructure
gh repo clone pros-platform/api-gateway
gh repo clone pros-platform/render-engine
gh repo clone pros-platform/collab-server
gh repo clone pros-platform/ai-service
gh repo clone pros-platform/web-app
gh repo clone pros-platform/mobile-app
gh repo clone pros-platform/unity-sdk

# Monorepo structure
infrastructure/
├── k8s/              # Kubernetes manifests
├── terraform/        # Infrastructure as Code
├── docker/           # Dockerfiles
├── scripts/          # Utility scripts
└── docs/             # Architecture docs

api-gateway/          # Rust (Actix-web)
render-engine/        # Python (FastAPI) + GPU code
collab-server/        # Go (gRPC)
ai-service/           # Python (PyTorch)
web-app/              # React 19 + Three.js
mobile-app/           # React Native
unity-sdk/            # C# for Unity integration
```

### Configure Git

```bash
# Set up Git config
git config --global user.name "Your Name"
git config --global user.email "you@pros.io"
git config --global init.defaultBranch main
git config --global pull.rebase true
git config --global core.editor "code --wait"

# Install Git hooks (pre-commit, pre-push)
cd ~/pros-workspace/api-gateway
pre-commit install
```

### Set Up Environment Variables

```bash
# Create .env file
cat > ~/.pros-env <<EOF
# AWS credentials (development account)
export AWS_PROFILE=pros-dev
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=123456789012

# Database (local development)
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pros_dev
export REDIS_URL=redis://localhost:6379/0
export MINIO_URL=http://localhost:9000

# API keys (get from 1Password)
export OPENAI_API_KEY=sk-...
export STRIPE_SECRET_KEY=sk_test_...
export SENTRY_DSN=https://...@sentry.io/...

# Feature flags
export ENABLE_AI_FEATURES=true
export ENABLE_HOLOGRAPHIC_API=true

# Debugging
export LOG_LEVEL=debug
export RUST_LOG=debug
export PYTHONPATH=\$PYTHONPATH:./src
EOF

# Load env vars automatically (add to ~/.zshrc or ~/.bashrc)
echo "source ~/.pros-env" >> ~/.zshrc

# Install direnv for per-directory env vars
brew install direnv
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
```

### Start Local Development Stack

```bash
# Start databases and services with Docker Compose
cd ~/pros-workspace/infrastructure/docker

docker-compose up -d

# Services started:
# - PostgreSQL (port 5432)
# - CockroachDB (port 26257)
# - Redis (port 6379)
# - MinIO (port 9000, 9001)
# - Elasticsearch (port 9200)
# - Prometheus (port 9090)
# - Grafana (port 3000)

# Verify all services are running
docker-compose ps

# Check logs
docker-compose logs -f postgres redis minio
```

---

## Day 1-2: Build & Run Services

### API Gateway (Rust)

```bash
cd ~/pros-workspace/api-gateway

# Install dependencies
cargo build

# Run database migrations
diesel migration run

# Run tests
cargo test

# Start development server (with auto-reload)
cargo watch -x run

# Server running on: http://localhost:8080
# API docs (Swagger): http://localhost:8080/docs
```

**First Task**: Add a new health check endpoint

```rust
// src/routes/health.rs

use actix_web::{get, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    version: String,
    timestamp: i64,
}

#[get("/health")]
async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(HealthResponse {
        status: "healthy".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        timestamp: chrono::Utc::now().timestamp(),
    })
}

// Register route in src/main.rs:
// .service(health::health_check)
```

### Web App (React 19 + Three.js)

```bash
cd ~/pros-workspace/web-app

# Install dependencies
pnpm install

# Start development server
pnpm dev

# App running on: http://localhost:3000
# Storybook: pnpm storybook (http://localhost:6006)
```

**First Task**: Create a simple 3D component

```tsx
// src/components/Simple3DViewer.tsx

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

export function Simple3DViewer() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Box args={[2, 2, 2]}>
          <meshStandardMaterial color="hotpink" />
        </Box>
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}
```

### AI Service (Python + PyTorch)

```bash
cd ~/pros-workspace/ai-service

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download pre-trained models (one-time setup)
python scripts/download_models.py

# Run tests
pytest

# Start development server
uvicorn main:app --reload --port 8001

# API docs: http://localhost:8001/docs
```

---

## Day 2-3: Development Workflow

### Branching Strategy (Git Flow)

```bash
# Branches:
# - main: Production code (protected)
# - develop: Integration branch (protected)
# - feature/*: New features
# - bugfix/*: Bug fixes
# - hotfix/*: Emergency fixes

# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/add-design-export

# Make changes, commit often
git add .
git commit -m "feat: add USD export for designs"

# Push to remote
git push origin feature/add-design-export

# Create Pull Request (via GitHub CLI)
gh pr create \
  --base develop \
  --title "Add USD export for designs" \
  --body "Implements #123. Adds support for exporting designs to USD format."
```

### Code Review Process

**Before submitting PR**:
1. ✅ All tests pass (`cargo test`, `pnpm test`, `pytest`)
2. ✅ Linting passes (`cargo clippy`, `eslint`, `flake8`)
3. ✅ Formatting applied (`cargo fmt`, `prettier`, `black`)
4. ✅ No merge conflicts with `develop`
5. ✅ PR description includes:
   - What: Summary of changes
   - Why: Reason for changes
   - How: Implementation details
   - Testing: How to test manually

**PR Review Checklist**:
- [ ] Code follows style guide
- [ ] Tests added for new functionality
- [ ] Documentation updated
- [ ] No security vulnerabilities
- [ ] Performance considered
- [ ] Backward compatibility maintained

**Approval Requirements**:
- 2 approvals from team members
- 1 approval from tech lead (for architectural changes)
- All CI checks passing (see below)

### Continuous Integration (GitHub Actions)

**Automated Checks** (run on every PR):
```yaml
# .github/workflows/pr-checks.yml

name: PR Checks

on:
  pull_request:
    branches: [develop, main]

jobs:
  # Rust checks
  rust-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Rustfmt
        run: cargo fmt --check
      - name: Clippy
        run: cargo clippy -- -D warnings
      - name: Tests
        run: cargo test

  # TypeScript/React checks
  frontend-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - name: Install dependencies
        run: pnpm install
      - name: Lint
        run: pnpm lint
      - name: Type check
        run: pnpm tsc --noEmit
      - name: Tests
        run: pnpm test

  # Python checks
  python-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Flake8
        run: flake8 .
      - name: Black
        run: black --check .
      - name: Mypy
        run: mypy .
      - name: Pytest
        run: pytest

  # Security scans
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trivy scan
        uses: aquasecurity/trivy-action@master
      - name: Snyk scan
        uses: snyk/actions/node@master
```

---

## Day 3-4: Testing

### Unit Tests

**Rust (api-gateway)**:
```rust
// tests/health_test.rs

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{test, App};

    #[actix_web::test]
    async fn test_health_endpoint() {
        let app = test::init_service(
            App::new().service(health_check)
        ).await;

        let req = test::TestRequest::get()
            .uri("/health")
            .to_request();
        
        let resp = test::call_service(&app, req).await;
        
        assert!(resp.status().is_success());
        
        let body: HealthResponse = test::read_body_json(resp).await;
        assert_eq!(body.status, "healthy");
    }
}
```

**TypeScript (web-app)**:
```typescript
// src/components/__tests__/Simple3DViewer.test.tsx

import { render } from '@testing-library/react';
import { Simple3DViewer } from '../Simple3DViewer';

describe('Simple3DViewer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Simple3DViewer />);
    expect(container).toBeInTheDocument();
  });

  it('creates a canvas element', () => {
    const { container } = render(<Simple3DViewer />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
```

**Python (ai-service)**:
```python
# tests/test_gesture_recognition.py

import pytest
import torch
from models.gesture_transformer import GestureTransformer

@pytest.fixture
def model():
    return GestureTransformer(num_gestures=10)

@pytest.fixture
def sample_input():
    # Batch of 2, 12 cameras, 8 frames, 1408×1048 resolution
    return torch.randn(2, 12, 8, 1408, 1048)

def test_forward_pass(model, sample_input):
    """Test model forward pass produces correct output shape"""
    keypoints, gestures = model(sample_input)
    
    assert keypoints.shape == (2, 8, 21, 3)  # batch, time, keypoints, xyz
    assert gestures.shape == (2, 10)  # batch, num_classes

def test_gesture_prediction(model, sample_input):
    """Test gesture prediction returns valid class"""
    _, gestures = model(sample_input)
    predictions = torch.argmax(gestures, dim=1)
    
    assert all(0 <= pred < 10 for pred in predictions)
```

### Integration Tests

```python
# tests/integration/test_design_workflow.py

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_complete_design_workflow():
    """Test end-to-end design creation workflow"""
    
    # 1. Create design
    response = client.post("/v2/designs", json={
        "name": "Test Chair",
        "description": "Integration test design"
    })
    assert response.status_code == 201
    design_id = response.json()["id"]
    
    # 2. Upload 3D file
    with open("tests/fixtures/chair.usd", "rb") as f:
        response = client.put(
            f"/v2/designs/{design_id}/upload",
            files={"file": f}
        )
    assert response.status_code == 200
    
    # 3. Generate thumbnail
    response = client.post(f"/v2/designs/{design_id}/thumbnail")
    assert response.status_code == 202  # Async job
    
    # 4. Retrieve design
    response = client.get(f"/v2/designs/{design_id}")
    assert response.status_code == 200
    design = response.json()
    assert design["name"] == "Test Chair"
    
    # 5. Delete design
    response = client.delete(f"/v2/designs/{design_id}")
    assert response.status_code == 204
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/design-creation.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Design Creation Flow', () => {
  test('user can create a design from voice input', async ({ page }) => {
    // Login
    await page.goto('https://app.pros.io');
    await page.fill('input[name=email]', 'test@example.com');
    await page.fill('input[name=password]', 'password123');
    await page.click('button[type=submit]');
    
    // Navigate to design creation
    await page.click('text=New Design');
    
    // Simulate voice input (using mock)
    await page.click('[data-testid=voice-input-button]');
    await page.evaluate(() => {
      // Mock voice recognition result
      window.dispatchEvent(new CustomEvent('voiceResult', {
        detail: { text: 'Create an ergonomic office chair' }
      }));
    });
    
    // Wait for AI processing
    await expect(page.locator('[data-testid=ai-processing]')).toBeVisible();
    
    // Verify design created
    await expect(page.locator('[data-testid=design-preview]')).toBeVisible({ timeout: 15000 });
    
    // Check design appears in list
    await page.goto('/designs');
    await expect(page.locator('text=ergonomic office chair')).toBeVisible();
  });
});
```

---

## Day 4-5: Debugging & Troubleshooting

### Debugging Tools

**VS Code Launch Configurations**:
```json
// .vscode/launch.json

{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Rust API",
      "type": "lldb",
      "request": "launch",
      "program": "${workspaceFolder}/target/debug/api-gateway",
      "args": [],
      "cwd": "${workspaceFolder}"
    },
    {
      "name": "Debug React App",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src"
    },
    {
      "name": "Debug Python Service",
      "type": "python",
      "request": "launch",
      "module": "uvicorn",
      "args": ["main:app", "--reload"],
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

**Debugging Checklist**:

1. **Check Logs**:
```bash
# API Gateway logs
docker-compose logs -f api-gateway

# Kubernetes pods
kubectl logs -f deployment/api-gateway -n pros-production

# Application logs (structured JSON)
tail -f /var/log/pros/api-gateway.log | jq .
```

2. **Check Database Connection**:
```bash
# PostgreSQL
psql $DATABASE_URL -c "SELECT 1"

# CockroachDB
cockroach sql --url $DATABASE_URL --execute "SELECT version()"

# Redis
redis-cli -u $REDIS_URL ping
```

3. **Check Service Health**:
```bash
# Health checks
curl http://localhost:8080/health
curl http://localhost:3000/health
curl http://localhost:8001/health

# Metrics (Prometheus format)
curl http://localhost:8080/metrics
```

4. **Interactive Debugging**:
```bash
# Rust (using lldb)
rust-lldb target/debug/api-gateway
(lldb) breakpoint set --name main
(lldb) run

# Python (using pdb)
python -m pdb main.py
(Pdb) break main.py:42
(Pdb) continue

# Node.js (using Chrome DevTools)
node --inspect-brk server.js
# Open chrome://inspect in Chrome
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Port already in use** | `lsof -ti:8080 | xargs kill -9` |
| **Docker out of disk space** | `docker system prune -a --volumes` |
| **Node modules corrupted** | `rm -rf node_modules pnpm-lock.yaml && pnpm install` |
| **Rust build fails** | `cargo clean && cargo build` |
| **Python import errors** | `pip install -e .` (install package in editable mode) |
| **Database migration fails** | `diesel migration redo` (rollback + reapply) |
| **GPU out of memory** | Reduce batch size, enable gradient checkpointing |

---

## Week 2: Advanced Topics

### Performance Profiling

**Rust (Flamegraph)**:
```bash
# Install cargo-flamegraph
cargo install flamegraph

# Generate flamegraph
sudo cargo flamegraph --bin api-gateway

# Opens flamegraph.svg in browser
```

**Python (cProfile)**:
```bash
# Profile script
python -m cProfile -o profile.stats main.py

# Visualize with snakeviz
pip install snakeviz
snakeviz profile.stats
```

**Frontend (React DevTools Profiler)**:
```tsx
import { Profiler } from 'react';

function onRenderCallback(
  id, phase, actualDuration, baseDuration, startTime, commitTime
) {
  console.log(`${id} took ${actualDuration}ms to render`);
}

<Profiler id="DesignViewer" onRender={onRenderCallback}>
  <DesignViewer />
</Profiler>
```

### Security Best Practices

1. **Never commit secrets**:
```bash
# Use git-secrets to prevent
brew install git-secrets
git secrets --install
git secrets --register-aws
```

2. **Use 1Password CLI for secrets**:
```bash
# Install 1Password CLI
brew install --cask 1password-cli

# Retrieve secret
op read "op://Engineering/OpenAI API Key/credential"

# Use in scripts
export OPENAI_API_KEY=$(op read "op://Engineering/OpenAI API Key/credential")
```

3. **Scan for vulnerabilities**:
```bash
# Rust
cargo audit

# Node.js
pnpm audit

# Python
pip-audit
```

---

## Resources & Support

### Documentation

- **Internal Wiki**: https://wiki.pros.io
- **API Docs**: https://developers.pros.io
- **Architecture Diagrams**: https://miro.com/pros-architecture
- **Runbooks**: https://github.com/pros-platform/infrastructure/tree/main/runbooks

### Communication Channels

- **Slack**:
  - #engineering - General engineering discussion
  - #backend - Backend team
  - #frontend - Frontend team
  - #ml - ML/AI team
  - #infra - Infrastructure team
  - #incidents - Production incidents
  - #deploys - Deployment notifications

- **GitHub Discussions**: For async conversations

- **Office Hours**:
  - Monday 10am PT: Frontend office hours
  - Tuesday 2pm PT: Backend office hours
  - Thursday 11am PT: ML office hours
  - Friday 3pm PT: Infrastructure office hours

### Learning Resources

**Recommended Reading**:
- "Designing Data-Intensive Applications" by Martin Kleppmann
- "The Rust Programming Language" (The Book)
- "You Don't Know JS" series
- "Hands-On Machine Learning" by Aurélien Géron

**Internal Training**:
- PRO'S Architecture Deep Dive (4-hour workshop)
- Holographic Display Development (2-day training)
- ML Model Deployment (1-day workshop)
- Security Best Practices (monthly)

---

## Your First Month Goals

**Week 1**: Environment setup, complete first PR
**Week 2**: Understand codebase, fix 3 bugs
**Week 3**: Implement small feature end-to-end
**Week 4**: Participate in on-call rotation (shadowing)

**Success Criteria**:
- ✅ 5+ merged PRs
- ✅ 80%+ test coverage on new code
- ✅ 0 critical bugs introduced
- ✅ Positive code review feedback

---

## Feedback & Questions

**Your Onboarding Buddy**: Assigned on Day 1 (check email)
**Engineering Manager**: Schedule 1:1 in first week
**Feedback Form**: https://forms.pros.io/onboarding-feedback

**Questions?** Ask in #engineering on Slack! 🎉

---

**Document Classification**: Internal - Engineering  
**Last Updated**: November 28, 2025  
**Owner**: Engineering Ops Team  
**Maintained By**: Developer Experience (DevX) Team

© 2025 PRO'S Inc. All rights reserved.
