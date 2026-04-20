# PRO'S Database Schema & Data Architecture
## Complete Data Model Specification

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Technical - Database Architecture  
**Database**: CockroachDB v23.2 (Distributed SQL)

---

## Executive Summary

PRO'S uses a **multi-database architecture** optimized for different data access patterns:

- **CockroachDB** (Primary): Transactional data, user accounts, designs, projects
- **Redis Stack**: Caching, session management, real-time collaboration state, vector search
- **MinIO**: Object storage for design files, renders, assets (S3-compatible)
- **TimescaleDB**: Time-series metrics, analytics, performance monitoring
- **Elasticsearch**: Full-text search, design discovery, template marketplace

**Total Data Volume** (November 2025):
- 2.8TB transactional data (CockroachDB)
- 450GB cache (Redis)
- 680TB object storage (MinIO)
- 120GB time-series (TimescaleDB)
- 85GB search indexes (Elasticsearch)

---

## Database Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Application Layer                           │
│  (React, Three.js, Unity SDK, Python SDK, Mobile Apps)          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API Gateway Layer                             │
│  (Rust Actix-web, Python FastAPI, Go gRPC, Elixir Phoenix)     │
└───┬─────────┬─────────┬──────────┬─────────┬────────────────────┘
    │         │         │          │         │
    ▼         ▼         ▼          ▼         ▼
┌────────┐ ┌─────┐ ┌───────┐ ┌─────────┐ ┌──────────┐
│CockroachDB│Redis│ │MinIO│ │Timescale│ │Elasticsearch│
│(Primary) │(Cache)│(Objects)│(Metrics)│ │  (Search)  │
└────────┘ └─────┘ └───────┘ └─────────┘ └──────────┘
    │                   │          │            │
    ▼                   ▼          ▼            ▼
┌─────────────────────────────────────────────────────┐
│         Replication & Backup Layer                  │
│  • CockroachDB: 3× replication (cross-AZ)          │
│  • Redis: AOF + RDB snapshots                       │
│  • MinIO: Erasure coding (EC:4)                     │
│  • TimescaleDB: Continuous aggregation              │
│  • Elasticsearch: 2× replica shards                 │
└─────────────────────────────────────────────────────┘
```

---

## CockroachDB Schema (Primary Database)

### Database Configuration

```sql
-- Database creation
CREATE DATABASE pros_production;

-- Multi-region setup (for global scale)
ALTER DATABASE pros_production SET PRIMARY REGION "us-east-1";
ALTER DATABASE pros_production ADD REGION "eu-west-1";
ALTER DATABASE pros_production ADD REGION "ap-southeast-1";

-- Survival goals
ALTER DATABASE pros_production SURVIVE ZONE FAILURE;

-- Performance tuning
SET CLUSTER SETTING sql.defaults.experimental_distsql_planning = 'always';
SET CLUSTER SETTING kv.range_merge.queue_enabled = true;
```

### Entity Relationship Diagram (ERD)

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    users     │◄───────┤   designs    │◄───────┤  versions    │
│              │ 1    ∞ │              │ 1    ∞ │              │
│ • id (PK)    │         │ • id (PK)    │         │ • id (PK)    │
│ • email      │         │ • user_id    │         │ • design_id  │
│ • name       │         │ • name       │         │ • version_num│
│ • role       │         │ • folder_id  │         │ • data_url   │
│ • created_at │         │ • visibility │         │ • created_at │
└──────────────┘         │ • created_at │         └──────────────┘
       │                 └──────────────┘
       │                        │
       │                        │
       │                        ▼
       │                 ┌──────────────┐
       │                 │  materials   │
       │                 │              │
       │                 │ • id (PK)    │
       │                 │ • design_id  │
       │                 │ • type       │
       │                 │ • properties │
       │                 └──────────────┘
       │
       ▼
┌──────────────┐         ┌──────────────┐
│organizations │◄───────┤   members    │
│              │ 1    ∞ │              │
│ • id (PK)    │         │ • id (PK)    │
│ • name       │         │ • org_id     │
│ • plan       │         │ • user_id    │
│ • seats      │         │ • role       │
│ • created_at │         │ • joined_at  │
└──────────────┘         └──────────────┘
       │
       │
       ▼
┌──────────────┐         ┌──────────────┐
│ subscriptions│         │   invoices   │
│              │         │              │
│ • id (PK)    │         │ • id (PK)    │
│ • org_id     │         │ • org_id     │
│ • plan_id    │         │ • amount     │
│ • status     │         │ • status     │
│ • renews_at  │         │ • paid_at    │
└──────────────┘         └──────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   sessions   │◄───────┤ participants │         │  messages    │
│              │ 1    ∞ │              │         │              │
│ • id (PK)    │         │ • id (PK)    │         │ • id (PK)    │
│ • design_id  │         │ • session_id │         │ • session_id │
│ • host_id    │         │ • user_id    │         │ • user_id    │
│ • started_at │         │ • joined_at  │         │ • content    │
│ • ended_at   │         │ • left_at    │         │ • sent_at    │
└──────────────┘         └──────────────┘         └──────────────┘

┌──────────────┐         ┌──────────────┐
│ render_jobs  │         │   assets     │
│              │         │              │
│ • id (PK)    │         │ • id (PK)    │
│ • design_id  │         │ • user_id    │
│ • user_id    │         │ • name       │
│ • status     │         │ • category   │
│ • settings   │         │ • file_url   │
│ • created_at │         │ • license    │
│ • completed_at│        │ • downloads  │
└──────────────┘         └──────────────┘
```

---

## Table Definitions

### 1. Users Table

```sql
CREATE TABLE users (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Authentication
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    
    -- Profile
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    company VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user', -- user, admin, superadmin
    
    -- Settings
    preferences JSONB DEFAULT '{}', -- UI preferences, notifications
    timezone VARCHAR(50) DEFAULT 'UTC',
    locale VARCHAR(10) DEFAULT 'en-US',
    
    -- Subscription
    plan VARCHAR(50) DEFAULT 'free', -- free, creator, studio, enterprise
    render_credits INT DEFAULT 100,
    storage_quota_gb INT DEFAULT 5,
    storage_used_gb DECIMAL(10,2) DEFAULT 0,
    
    -- OAuth providers
    oauth_providers JSONB DEFAULT '[]', -- [{"provider": "google", "id": "..."}]
    
    -- Security
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(255),
    last_login_at TIMESTAMP,
    last_login_ip INET,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP,
    
    -- Metadata
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP, -- soft delete
    
    -- Indexes
    INDEX idx_users_email (email) WHERE deleted_at IS NULL,
    INDEX idx_users_created_at (created_at DESC),
    INDEX idx_users_plan (plan) WHERE deleted_at IS NULL
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 2. Designs Table

```sql
CREATE TABLE designs (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
    
    -- Basic info
    name VARCHAR(500) NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- File references
    thumbnail_url TEXT,
    file_url TEXT NOT NULL, -- MinIO object key: designs/{id}/main.usd
    file_size_bytes BIGINT NOT NULL,
    file_format VARCHAR(20) DEFAULT 'usd', -- usd, fbx, obj, glb
    
    -- Design metadata
    polygon_count INT,
    material_count INT,
    texture_count INT,
    bounding_box JSONB, -- {"min": {"x": 0, "y": 0, "z": 0}, "max": {...}}
    units VARCHAR(20) DEFAULT 'mm', -- mm, cm, m, in, ft
    
    -- Visibility & permissions
    visibility VARCHAR(20) DEFAULT 'private', -- private, team, public, unlisted
    permissions JSONB DEFAULT '{}', -- {"users": {"uuid": "view"}, "teams": {...}}
    
    -- Collaboration
    collaboration_enabled BOOLEAN DEFAULT FALSE,
    current_session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    
    -- Version control
    current_version INT DEFAULT 1,
    total_versions INT DEFAULT 1,
    last_checkpoint_at TIMESTAMP,
    
    -- Analytics
    view_count INT DEFAULT 0,
    fork_count INT DEFAULT 0,
    download_count INT DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    
    -- Indexes
    INDEX idx_designs_user_id (user_id) WHERE deleted_at IS NULL,
    INDEX idx_designs_org_id (organization_id) WHERE deleted_at IS NULL,
    INDEX idx_designs_created_at (created_at DESC),
    INDEX idx_designs_updated_at (updated_at DESC),
    INDEX idx_designs_visibility (visibility) WHERE deleted_at IS NULL,
    INDEX idx_designs_tags (tags) USING GIN,
    INDEX idx_designs_name_trgm (name) USING GIN (name gin_trgm_ops) -- Full-text search
);

CREATE TRIGGER designs_updated_at
    BEFORE UPDATE ON designs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 3. Versions Table (Design Version History)

```sql
CREATE TABLE versions (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationship
    design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Version info
    version_number INT NOT NULL,
    parent_version_id UUID REFERENCES versions(id) ON DELETE SET NULL, -- for branching
    
    -- File data
    data_url TEXT NOT NULL, -- MinIO: designs/{design_id}/versions/{version_number}.usd
    file_size_bytes BIGINT NOT NULL,
    
    -- Changes
    commit_message TEXT,
    changes_summary JSONB, -- {"added": 10, "modified": 5, "deleted": 2, "materials": 1}
    diff_url TEXT, -- MinIO: designs/{design_id}/diffs/{version_number}.json
    
    -- Metadata
    is_checkpoint BOOLEAN DEFAULT FALSE, -- major version
    is_branch BOOLEAN DEFAULT FALSE,
    branch_name VARCHAR(100),
    
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    -- Constraints
    UNIQUE (design_id, version_number),
    
    -- Indexes
    INDEX idx_versions_design_id (design_id, version_number DESC),
    INDEX idx_versions_created_at (created_at DESC)
);
```

### 4. Materials Table

```sql
CREATE TABLE materials (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationship
    design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    
    -- Material info
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- pbr_metallic_roughness, pbr_specular_glossiness, unlit
    
    -- PBR properties (JSONB for flexibility)
    properties JSONB NOT NULL DEFAULT '{}',
    /* Example properties structure:
    {
        "base_color": "#FFFFFF",
        "base_color_texture": "textures/base_color.png",
        "metallic": 0.0,
        "roughness": 0.5,
        "normal_map": "textures/normal.png",
        "emissive": [0, 0, 0],
        "opacity": 1.0,
        "double_sided": false
    }
    */
    
    -- Texture references
    texture_urls TEXT[] DEFAULT ARRAY[]::TEXT[], -- Array of MinIO object keys
    
    -- Material source
    source VARCHAR(50) DEFAULT 'custom', -- custom, library, ai_generated
    library_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
    
    -- Metadata
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_materials_design_id (design_id),
    INDEX idx_materials_type (type)
);
```

### 5. Organizations Table

```sql
CREATE TABLE organizations (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic info
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE, -- for URLs: pros.io/org/acme-corp
    logo_url TEXT,
    website VARCHAR(500),
    
    -- Plan & billing
    plan VARCHAR(50) DEFAULT 'team', -- team, business, enterprise
    seats_total INT NOT NULL DEFAULT 5,
    seats_used INT DEFAULT 0,
    billing_email VARCHAR(255) NOT NULL,
    
    -- Storage & limits
    storage_quota_gb INT DEFAULT 100,
    storage_used_gb DECIMAL(10,2) DEFAULT 0,
    render_credits_monthly INT DEFAULT 1000,
    render_credits_used INT DEFAULT 0,
    
    -- Settings
    settings JSONB DEFAULT '{}',
    /* Example settings:
    {
        "sso_enabled": true,
        "sso_provider": "okta",
        "require_mfa": true,
        "ip_whitelist": ["192.168.1.0/24"],
        "allowed_domains": ["acme.com"],
        "data_residency": "us-east-1"
    }
    */
    
    -- Metadata
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    
    -- Indexes
    INDEX idx_orgs_slug (slug) WHERE deleted_at IS NULL,
    INDEX idx_orgs_created_at (created_at DESC)
);
```

### 6. Members Table (Organization Members)

```sql
CREATE TABLE members (
    -- Composite primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationships
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Role & permissions
    role VARCHAR(50) DEFAULT 'member', -- owner, admin, member, viewer
    permissions JSONB DEFAULT '{}',
    /* Example permissions:
    {
        "designs": {"create": true, "read": true, "update": true, "delete": false},
        "members": {"invite": true, "manage": false},
        "billing": {"view": false, "manage": false}
    }
    */
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- active, suspended, pending_invite
    invited_by UUID REFERENCES users(id) ON DELETE SET NULL,
    invitation_token VARCHAR(255) UNIQUE,
    invitation_expires_at TIMESTAMP,
    
    -- Metadata
    joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMP,
    
    -- Constraints
    UNIQUE (organization_id, user_id),
    
    -- Indexes
    INDEX idx_members_org_id (organization_id),
    INDEX idx_members_user_id (user_id),
    INDEX idx_members_role (role)
);
```

### 7. Sessions Table (Collaboration Sessions)

```sql
CREATE TABLE sessions (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationship
    design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Session info
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Configuration
    max_participants INT DEFAULT 20,
    settings JSONB DEFAULT '{}',
    /* Example settings:
    {
        "voice_enabled": true,
        "spatial_audio": true,
        "cursor_visibility": "all",
        "edit_permissions": "host_approval",
        "recording_enabled": false
    }
    */
    
    -- Schedule
    scheduled_start TIMESTAMP,
    scheduled_end TIMESTAMP,
    
    -- Status
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, active, ended, cancelled
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    
    -- Access control
    access_type VARCHAR(20) DEFAULT 'private', -- private, team, public
    host_key VARCHAR(255) NOT NULL UNIQUE,
    participant_key VARCHAR(255) NOT NULL UNIQUE,
    
    -- Recording (if enabled)
    recording_url TEXT,
    recording_size_bytes BIGINT,
    
    -- Metadata
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_sessions_design_id (design_id),
    INDEX idx_sessions_host_id (host_id),
    INDEX idx_sessions_status (status),
    INDEX idx_sessions_scheduled (scheduled_start) WHERE status = 'scheduled'
);
```

### 8. Participants Table

```sql
CREATE TABLE participants (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationships
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL for anonymous guests
    
    -- Participant info
    display_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'participant', -- host, co-host, participant, viewer
    
    -- Connection info
    connection_id VARCHAR(255), -- WebSocket connection ID
    device_type VARCHAR(50), -- pros_studio, pros_creator, web, mobile
    device_id VARCHAR(255),
    
    -- Status
    status VARCHAR(20) DEFAULT 'active', -- active, idle, disconnected, kicked
    is_speaking BOOLEAN DEFAULT FALSE,
    is_muted BOOLEAN DEFAULT FALSE,
    
    -- Position in 3D space (for spatial audio)
    cursor_position JSONB, -- {"x": 10.5, "y": 20.3, "z": 5.8}
    camera_position JSONB,
    
    -- Timestamps
    joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
    left_at TIMESTAMP,
    last_activity_at TIMESTAMP DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_participants_session_id (session_id),
    INDEX idx_participants_user_id (user_id),
    INDEX idx_participants_status (status)
);
```

### 9. Render Jobs Table

```sql
CREATE TABLE render_jobs (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationships
    design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Job configuration
    settings JSONB NOT NULL,
    /* Example settings:
    {
        "resolution": "4k",
        "quality": "photorealistic",
        "ray_tracing": {
            "enabled": true,
            "samples": 512,
            "bounces": 8
        },
        "camera": {"position": {...}, "target": {...}, "fov": 45},
        "lighting": {"environment": "studio_lighting", "hdri_url": "..."},
        "output_format": "png"
    }
    */
    
    -- Priority & resources
    priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
    gpu_nodes_allocated INT,
    gpu_hours_consumed DECIMAL(10,4),
    
    -- Status
    status VARCHAR(20) DEFAULT 'queued', -- queued, rendering, completed, failed, cancelled
    progress DECIMAL(5,2) DEFAULT 0.00, -- 0.00 to 100.00
    queue_position INT,
    
    -- Timing
    estimated_time_seconds INT,
    elapsed_time_seconds INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Output
    output_files JSONB, -- Array of {type, format, url, size_bytes}
    error_message TEXT,
    
    -- Rendering stats
    render_stats JSONB,
    /* Example stats:
    {
        "samples_rendered": 512,
        "rays_traced": 4234567890,
        "total_time": 18.3,
        "gpu_hours": 0.61
    }
    */
    
    -- Billing
    cost_usd DECIMAL(10,4),
    render_credits_used INT,
    
    -- Callback
    callback_url TEXT,
    callback_status VARCHAR(20), -- pending, success, failed
    
    -- Indexes
    INDEX idx_render_jobs_user_id (user_id),
    INDEX idx_render_jobs_status (status),
    INDEX idx_render_jobs_created_at (created_at DESC),
    INDEX idx_render_jobs_queue (status, priority, created_at) WHERE status = 'queued'
);
```

### 10. Assets Table (Library & Marketplace)

```sql
CREATE TABLE assets (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Ownership
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Asset info
    name VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL, -- model, material, texture, hdri, script
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- File info
    file_url TEXT NOT NULL, -- MinIO object key
    file_format VARCHAR(20) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    preview_url TEXT,
    thumbnail_url TEXT,
    
    -- Asset metadata
    metadata JSONB DEFAULT '{}',
    /* Example metadata (varies by category):
    {
        "polygon_count": 50000,
        "rigged": true,
        "animated": false,
        "pbr_ready": true,
        "resolution": "4K"
    }
    */
    
    -- Licensing
    license JSONB NOT NULL,
    /* Example license:
    {
        "type": "commercial", // free, commercial, editorial
        "attribution_required": false,
        "modifications_allowed": true,
        "redistribution_allowed": false,
        "price_usd": 0.00
    }
    */
    
    -- Visibility
    visibility VARCHAR(20) DEFAULT 'private', -- private, team, public
    
    -- Marketplace stats
    downloads INT DEFAULT 0,
    views INT DEFAULT 0,
    rating_average DECIMAL(3,2), -- 0.00 to 5.00
    rating_count INT DEFAULT 0,
    revenue_usd DECIMAL(10,2) DEFAULT 0.00,
    
    -- Verification (for marketplace)
    verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    
    -- Metadata
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    
    -- Indexes
    INDEX idx_assets_user_id (user_id) WHERE deleted_at IS NULL,
    INDEX idx_assets_category (category) WHERE deleted_at IS NULL,
    INDEX idx_assets_visibility (visibility) WHERE deleted_at IS NULL,
    INDEX idx_assets_tags (tags) USING GIN,
    INDEX idx_assets_rating (rating_average DESC) WHERE visibility = 'public' AND deleted_at IS NULL,
    INDEX idx_assets_downloads (downloads DESC) WHERE visibility = 'public' AND deleted_at IS NULL
);
```

---

## Redis Cache Schema

### Cache Key Patterns

```redis
# User sessions
user:session:{user_id}:{session_token}
TTL: 7 days
Value: {user_id, role, permissions, expires_at}

# Design cache (frequently accessed)
design:{design_id}
TTL: 1 hour
Value: Serialized design object (MessagePack)

# Collaboration state (real-time)
collab:session:{session_id}:participants
TTL: Session duration + 1 hour
Value: Set of participant IDs

collab:session:{session_id}:cursors
TTL: Session duration + 1 hour
Value: Hash {user_id: {x, y, z, timestamp}}

collab:session:{session_id}:edits
TTL: Session duration + 1 hour
Value: Sorted Set (score=timestamp, member=edit_event_json)

# Render queue
render:queue:{priority}
Value: Sorted Set (score=created_timestamp, member=job_id)

render:job:{job_id}:status
TTL: 7 days
Value: {status, progress, eta, gpu_nodes}

# API rate limiting
ratelimit:{api_key}:{endpoint}:{window}
TTL: 1 minute (rolling window)
Value: Request count

# Search cache
search:designs:{query_hash}
TTL: 15 minutes
Value: Array of design IDs

# Vector embeddings (Redis Stack)
design:embedding:{design_id}
TTL: Permanent
Value: 768-dim float vector (for similarity search)
```

### Redis Stack - Vector Search Index

```redis
FT.CREATE idx:design_embeddings
  ON HASH
  PREFIX 1 design:embedding:
  SCHEMA
    design_id TAG
    user_id TAG
    category TAG
    embedding VECTOR FLAT 6 TYPE FLOAT32 DIM 768 DISTANCE_METRIC COSINE
```

---

## MinIO Object Storage Schema

### Bucket Structure

```
pros-production/
├── designs/
│   ├── {design_id}/
│   │   ├── main.usd                    # Current version
│   │   ├── thumbnail.jpg               # Auto-generated thumbnail
│   │   ├── preview_360.mp4             # 360° preview video
│   │   ├── versions/
│   │   │   ├── v1.usd
│   │   │   ├── v2.usd
│   │   │   └── v{n}.usd
│   │   ├── diffs/
│   │   │   ├── 1-2.json               # Diff between v1 and v2
│   │   │   └── {n-1}-{n}.json
│   │   ├── textures/
│   │   │   ├── base_color.png
│   │   │   ├── normal.png
│   │   │   └── roughness.png
│   │   └── cache/
│   │       └── optimized.glb          # Optimized for WebGL
│   └── ...
│
├── renders/
│   ├── {job_id}.png                   # Rendered image
│   ├── {job_id}_depth.exr             # Depth map
│   ├── {job_id}_preview.jpg           # Low-res preview
│   └── ...
│
├── assets/
│   ├── models/
│   │   └── {asset_id}.usd
│   ├── materials/
│   │   └── {asset_id}.json
│   ├── textures/
│   │   └── {asset_id}.png
│   ├── hdri/
│   │   └── {asset_id}.hdr
│   └── previews/
│       └── {asset_id}_thumb.jpg
│
├── users/
│   └── avatars/
│       └── {user_id}.jpg
│
├── organizations/
│   └── logos/
│       └── {org_id}.png
│
└── recordings/
    └── {session_id}.webm              # Session recording
```

### Object Metadata (S3-compatible headers)

```json
{
  "x-amz-meta-user-id": "uuid",
  "x-amz-meta-design-id": "uuid",
  "x-amz-meta-version": "12",
  "x-amz-meta-polygon-count": "2450000",
  "x-amz-meta-file-hash": "sha256:abc123...",
  "Content-Type": "model/vnd.usd+zip",
  "Content-Disposition": "inline; filename=\"product_prototype.usd\"",
  "Cache-Control": "public, max-age=31536000, immutable"
}
```

---

## TimescaleDB Metrics Schema

### Hypertable for Performance Metrics

```sql
-- Create metrics table
CREATE TABLE performance_metrics (
    time TIMESTAMPTZ NOT NULL,
    
    -- Metric identification
    metric_name VARCHAR(100) NOT NULL,
    metric_type VARCHAR(50) NOT NULL, -- counter, gauge, histogram, summary
    
    -- Dimensions (tags)
    service VARCHAR(50),
    endpoint VARCHAR(255),
    user_id UUID,
    organization_id UUID,
    region VARCHAR(50),
    
    -- Values
    value DOUBLE PRECISION,
    count BIGINT,
    sum DOUBLE PRECISION,
    min DOUBLE PRECISION,
    max DOUBLE PRECISION,
    
    -- Additional metadata
    labels JSONB DEFAULT '{}'
);

-- Convert to hypertable
SELECT create_hypertable('performance_metrics', 'time', chunk_time_interval => INTERVAL '1 day');

-- Create indexes
CREATE INDEX idx_perf_metrics_name_time ON performance_metrics (metric_name, time DESC);
CREATE INDEX idx_perf_metrics_service_time ON performance_metrics (service, time DESC);
CREATE INDEX idx_perf_metrics_user_time ON performance_metrics (user_id, time DESC);

-- Retention policy (keep 90 days)
SELECT add_retention_policy('performance_metrics', INTERVAL '90 days');

-- Continuous aggregates for common queries
CREATE MATERIALIZED VIEW metrics_hourly
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time) AS hour,
    metric_name,
    service,
    region,
    AVG(value) AS avg_value,
    MAX(value) AS max_value,
    MIN(value) AS min_value,
    COUNT(*) AS sample_count
FROM performance_metrics
GROUP BY hour, metric_name, service, region
WITH NO DATA;

-- Refresh policy
SELECT add_continuous_aggregate_policy('metrics_hourly',
    start_offset => INTERVAL '2 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour');
```

### Example Metrics Stored

```sql
-- API latency
INSERT INTO performance_metrics (time, metric_name, metric_type, service, endpoint, value, labels)
VALUES (NOW(), 'api_latency_ms', 'histogram', 'api_gateway', '/v2/designs', 42.5, '{"method": "GET"}');

-- Rendering throughput
INSERT INTO performance_metrics (time, metric_name, metric_type, service, value, labels)
VALUES (NOW(), 'render_jobs_completed', 'counter', 'render_engine', 1, '{"gpu_type": "H100"}');

-- User activity
INSERT INTO performance_metrics (time, metric_name, metric_type, user_id, value)
VALUES (NOW(), 'designs_created', 'counter', 'uuid-123', 1);
```

---

## Elasticsearch Search Index

### Index Mapping

```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "name": {
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "keyword": { "type": "keyword" },
          "autocomplete": {
            "type": "text",
            "analyzer": "autocomplete",
            "search_analyzer": "standard"
          }
        }
      },
      "description": {
        "type": "text",
        "analyzer": "standard"
      },
      "tags": { "type": "keyword" },
      "user_id": { "type": "keyword" },
      "user_name": { "type": "text" },
      "organization_id": { "type": "keyword" },
      "category": { "type": "keyword" },
      "visibility": { "type": "keyword" },
      "polygon_count": { "type": "integer" },
      "created_at": { "type": "date" },
      "updated_at": { "type": "date" },
      "view_count": { "type": "integer" },
      "download_count": { "type": "integer" },
      "rating": { "type": "float" }
    }
  },
  "settings": {
    "analysis": {
      "analyzer": {
        "autocomplete": {
          "tokenizer": "autocomplete",
          "filter": ["lowercase"]
        }
      },
      "tokenizer": {
        "autocomplete": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 10,
          "token_chars": ["letter", "digit"]
        }
      }
    }
  }
}
```

### Example Search Queries

```json
// Full-text search with filters
{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "office chair ergonomic",
            "fields": ["name^3", "description", "tags^2"],
            "type": "best_fields",
            "fuzziness": "AUTO"
          }
        }
      ],
      "filter": [
        { "term": { "visibility": "public" } },
        { "range": { "polygon_count": { "lte": 1000000 } } },
        { "terms": { "tags": ["furniture", "office"] } }
      ]
    }
  },
  "sort": [
    { "rating": { "order": "desc" } },
    { "_score": { "order": "desc" } }
  ],
  "aggs": {
    "categories": {
      "terms": { "field": "category" }
    },
    "avg_rating": {
      "avg": { "field": "rating" }
    }
  }
}
```

---

## Database Migration Strategy

### Migration Tool: golang-migrate

```bash
# Install
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Create migration
migrate create -ext sql -dir db/migrations -seq add_designs_table

# Run migrations
migrate -path db/migrations -database "postgres://user:pass@localhost:5432/pros?sslmode=disable" up

# Rollback
migrate -path db/migrations -database "..." down 1
```

### Example Migration Files

**001_create_users_table.up.sql**:
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    -- ... (full schema above)
);
```

**001_create_users_table.down.sql**:
```sql
DROP TABLE IF EXISTS users CASCADE;
```

---

## Backup & Disaster Recovery

### CockroachDB Backup

```sql
-- Full backup (daily)
BACKUP DATABASE pros_production
TO 's3://pros-backups/cockroach/full?AWS_ACCESS_KEY_ID={key}&AWS_SECRET_ACCESS_KEY={secret}'
WITH revision_history;

-- Incremental backup (hourly)
BACKUP DATABASE pros_production
TO LATEST IN 's3://pros-backups/cockroach/full?...'
WITH revision_history;

-- Point-in-time restore
RESTORE DATABASE pros_production
FROM '2025-11-28T14:30:00' IN 's3://pros-backups/cockroach/full?...';
```

### Redis Persistence

```conf
# AOF (Append-Only File) for durability
appendonly yes
appendfsync everysec
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

# RDB snapshots
save 900 1      # After 900 sec (15 min) if at least 1 key changed
save 300 10     # After 300 sec (5 min) if at least 10 keys changed
save 60 10000   # After 60 sec if at least 10000 keys changed
```

### MinIO Replication

```bash
# Configure site replication (cross-region)
mc admin replicate add pros-primary pros-dr-replica

# Bucket versioning (for point-in-time recovery)
mc version enable pros-production/designs

# Object lifecycle (transition to Glacier after 90 days)
mc ilm add pros-production --transition-days 90 --storage-class "GLACIER"
```

---

## Query Optimization Examples

### Complex Join Query (Design with User, Materials, Version)

```sql
-- Optimized query with proper indexes
SELECT
    d.id,
    d.name,
    d.thumbnail_url,
    d.created_at,
    u.name AS user_name,
    u.avatar_url AS user_avatar,
    COUNT(DISTINCT m.id) AS material_count,
    COUNT(DISTINCT v.id) AS version_count,
    d.polygon_count,
    d.view_count
FROM designs d
INNER JOIN users u ON d.user_id = u.id
LEFT JOIN materials m ON d.id = m.design_id
LEFT JOIN versions v ON d.id = v.design_id
WHERE d.visibility = 'public'
  AND d.deleted_at IS NULL
  AND u.deleted_at IS NULL
GROUP BY d.id, u.name, u.avatar_url
ORDER BY d.created_at DESC
LIMIT 20 OFFSET 0;

-- Execution plan (EXPLAIN ANALYZE)
-- Index Scan on idx_designs_visibility (cost=0.15..450.23 rows=20)
-- Nested Loop (cost=0.30..890.45)
-- GroupAggregate (cost=1200.50..1500.75)
-- Total execution time: 12.3ms
```

### Render Queue Priority Query

```sql
-- Get next render job from priority queue
WITH next_job AS (
    SELECT id
    FROM render_jobs
    WHERE status = 'queued'
      AND (scheduled_start IS NULL OR scheduled_start <= NOW())
    ORDER BY
        CASE priority
            WHEN 'urgent' THEN 1
            WHEN 'high' THEN 2
            WHEN 'normal' THEN 3
            WHEN 'low' THEN 4
        END,
        created_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
)
UPDATE render_jobs
SET
    status = 'rendering',
    started_at = NOW(),
    queue_position = NULL
FROM next_job
WHERE render_jobs.id = next_job.id
RETURNING render_jobs.*;
```

---

## Data Retention & Archival

### Retention Policies

| Data Type | Hot Storage | Warm Storage | Cold Storage | Deletion |
|-----------|-------------|--------------|--------------|----------|
| **Designs (active)** | Forever | N/A | N/A | User-initiated |
| **Designs (deleted)** | 30 days | N/A | N/A | Auto-delete after 30d |
| **Versions** | Latest 10 | 11-100 | 100+ | After 1 year (cold) |
| **Renders** | 7 days | 8-90 days | 91-365 days | After 1 year |
| **Session recordings** | 30 days | 31-90 days | N/A | After 90 days |
| **API logs** | 7 days | 8-30 days | 31-90 days | After 90 days |
| **Metrics** | 30 days | 31-90 days (aggregated) | N/A | After 90 days |
| **Audit logs** | 90 days | 91-365 days | 366+ days (7 years) | After 7 years |

---

## Database Performance Tuning

### CockroachDB Settings

```sql
-- Increase statement timeout for large queries
SET CLUSTER SETTING sql.defaults.statement_timeout = '5min';

-- Enable automatic statistics collection
SET CLUSTER SETTING sql.stats.automatic_collection.enabled = true;

-- Adjust memory limits
SET CLUSTER SETTING sql.distsql.temp_storage.workmem = '256MiB';

-- Connection pooling
SET CLUSTER SETTING server.max_connections = 1000;
```

### Connection Pooling (PgBouncer)

```ini
[databases]
pros_production = host=cockroach-lb.prod port=26257 dbname=pros_production

[pgbouncer]
pool_mode = transaction
max_client_conn = 2000
default_pool_size = 50
reserve_pool_size = 10
reserve_pool_timeout = 3
```

---

## Security & Access Control

### Row-Level Security (RLS)

```sql
-- Enable RLS on designs table
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own private designs
CREATE POLICY designs_user_private ON designs
    FOR SELECT
    USING (
        visibility = 'private' AND user_id = current_setting('app.user_id')::UUID
    );

-- Policy: Users can see team designs if they're in the organization
CREATE POLICY designs_team_visible ON designs
    FOR SELECT
    USING (
        visibility = 'team' AND
        organization_id IN (
            SELECT organization_id
            FROM members
            WHERE user_id = current_setting('app.user_id')::UUID
        )
    );

-- Policy: Everyone can see public designs
CREATE POLICY designs_public_visible ON designs
    FOR SELECT
    USING (visibility = 'public');
```

### Encryption at Rest

```sql
-- CockroachDB encryption (configured at cluster level)
-- Uses AES-256-GCM for data at rest
-- Keys stored in AWS KMS (customer-managed keys)

-- Application-level encryption for sensitive fields
CREATE TABLE user_secrets (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    secret_data BYTEA NOT NULL, -- Encrypted with user's key
    nonce BYTEA NOT NULL,
    created_at TIMESTAMP NOT NULL
);
```

---

## Monitoring & Alerting

### Key Metrics to Monitor

```sql
-- Database size growth
SELECT
    table_name,
    pg_size_pretty(pg_total_relation_size(quote_ident(table_name))) AS size,
    pg_total_relation_size(quote_ident(table_name)) AS size_bytes
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY size_bytes DESC;

-- Slow query log (queries > 1 second)
SELECT
    query,
    mean_exec_time,
    calls,
    total_exec_time
FROM pg_stat_statements
WHERE mean_exec_time > 1000
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Active connections
SELECT
    application_name,
    COUNT(*) AS connection_count,
    state
FROM pg_stat_activity
GROUP BY application_name, state;

-- Cache hit ratio (should be > 99%)
SELECT
    SUM(heap_blks_hit) / NULLIF(SUM(heap_blks_hit) + SUM(heap_blks_read), 0) * 100 AS cache_hit_ratio
FROM pg_statio_user_tables;
```

---

## Conclusion

This database schema supports:

✅ **25,000+ active users** (current scale)  
✅ **100,000+ users** (projected 2027)  
✅ **Multi-region deployment** (US, EU, APAC)  
✅ **99.97% uptime SLA**  
✅ **Sub-100ms query latency** (p95)  
✅ **Automatic horizontal scaling** (CockroachDB)  
✅ **Point-in-time recovery** (15-minute RPO)  
✅ **GDPR/CCPA compliance** (data residency, right to deletion)  
✅ **Real-time collaboration** (Redis Streams + WebSocket)  
✅ **Full-text search** (Elasticsearch)  
✅ **Vector similarity search** (Redis Stack)  

---

**Document Classification**: Technical - Database Architecture  
**Last Updated**: November 28, 2025  
**Next Review**: February 28, 2026  
**Owner**: Database Engineering Team  
**Approved By**: Marcus Chen (CTO)

© 2025 PRO'S Inc. All rights reserved. Confidential and proprietary.
