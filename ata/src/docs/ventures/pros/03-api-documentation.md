# PRO'S API Documentation
## Comprehensive Platform API Reference

**Last Updated:** November 28, 2025  
**API Version:** v2.1.0  
**Base URL**: `https://api.pros.io/v2`  
**WebSocket URL**: `wss://ws.pros.io/v2`  
**Classification:** Technical - API Reference

---

## API Overview

PRO'S provides a comprehensive RESTful API, GraphQL endpoint, and WebSocket connections for real-time collaboration. All APIs use OAuth 2.0 + OpenID Connect for authentication and support both JSON and Protocol Buffers for data serialization.

### Quick Start

```bash
# Authentication
curl -X POST https://api.pros.io/v2/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "client_credentials",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'

# Response
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "design:read design:write collab:join"
}

# Use token in subsequent requests
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  https://api.pros.io/v2/designs
```

---

## Authentication

### OAuth 2.0 Flows

#### 1. Client Credentials Flow (Server-to-Server)
```http
POST /v2/auth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "scope": "design:read design:write"
}
```

**Response**:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "design:read design:write"
}
```

#### 2. Authorization Code Flow (User Auth)
```http
# Step 1: Redirect user to authorization URL
GET /v2/auth/authorize?
  response_type=code&
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://yourapp.com/callback&
  scope=design:read design:write collab:join&
  state=RANDOM_STATE

# Step 2: Exchange code for token
POST /v2/auth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE_FROM_STEP_1",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "https://yourapp.com/callback"
}
```

### Scopes

| Scope | Description |
|-------|-------------|
| `design:read` | Read designs, models, and metadata |
| `design:write` | Create, update, delete designs |
| `design:export` | Export designs in CAD formats (STEP, IGES, etc.) |
| `collab:join` | Join collaborative sessions |
| `collab:create` | Create and manage collaborative sessions |
| `render:submit` | Submit cloud rendering jobs |
| `render:read` | Query rendering job status |
| `ai:assist` | Access AI design assistant |
| `library:read` | Access asset library |
| `library:write` | Upload assets to library |
| `admin` | Full administrative access |

---

## REST API Endpoints

### Designs

#### List Designs
```http
GET /v2/designs
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Query Parameters**:
- `page` (integer, default: 1): Page number
- `limit` (integer, default: 20, max: 100): Results per page
- `sort` (string, default: "created_at"): Sort field (created_at, updated_at, name)
- `order` (string, default: "desc"): Sort order (asc, desc)
- `filter` (string): Filter by name (partial match)
- `folder_id` (string): Filter by folder

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "design_a1b2c3d4e5f6",
      "name": "Product Prototype v3",
      "description": "Latest iteration with improved ergonomics",
      "folder_id": "folder_xyz789",
      "created_at": "2025-11-15T10:30:00Z",
      "updated_at": "2025-11-28T14:22:00Z",
      "created_by": {
        "id": "user_12345",
        "name": "Jane Designer",
        "email": "jane@example.com"
      },
      "thumbnail_url": "https://cdn.pros.io/thumbs/design_a1b2c3d4e5f6.jpg",
      "file_size": 45678912,
      "polygon_count": 2450000,
      "tags": ["prototype", "product", "v3"],
      "visibility": "private",
      "collaboration": {
        "enabled": true,
        "active_users": 3,
        "last_activity": "2025-11-28T14:22:00Z"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_results": 147,
    "total_pages": 8
  }
}
```

#### Get Design by ID
```http
GET /v2/designs/{design_id}
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response** (200 OK):
```json
{
  "id": "design_a1b2c3d4e5f6",
  "name": "Product Prototype v3",
  "description": "Latest iteration with improved ergonomics",
  "folder_id": "folder_xyz789",
  "created_at": "2025-11-15T10:30:00Z",
  "updated_at": "2025-11-28T14:22:00Z",
  "created_by": { /* user object */ },
  "thumbnail_url": "https://cdn.pros.io/thumbs/design_a1b2c3d4e5f6.jpg",
  "file_size": 45678912,
  "polygon_count": 2450000,
  "bounding_box": {
    "min": {"x": -50.0, "y": -30.0, "z": 0.0},
    "max": {"x": 50.0, "y": 30.0, "z": 100.0},
    "units": "mm"
  },
  "materials": [
    {
      "id": "mat_abc123",
      "name": "Brushed Aluminum",
      "type": "pbr_metallic_roughness",
      "properties": {
        "base_color": "#C0C0C0",
        "metallic": 0.95,
        "roughness": 0.3
      }
    }
  ],
  "tags": ["prototype", "product", "v3"],
  "visibility": "private",
  "permissions": {
    "can_view": true,
    "can_edit": true,
    "can_delete": true,
    "can_share": true
  },
  "version_history": {
    "current_version": 12,
    "total_versions": 12,
    "last_checkpoint": "2025-11-28T14:22:00Z"
  },
  "collaboration": {
    "enabled": true,
    "session_id": "session_xyz789",
    "active_users": [
      {"id": "user_12345", "name": "Jane Designer", "cursor_position": {"x": 10.5, "y": 20.3, "z": 5.8}},
      {"id": "user_67890", "name": "John Engineer", "cursor_position": {"x": -15.2, "y": 8.7, "z": 12.1}}
    ]
  }
}
```

#### Create Design
```http
POST /v2/designs
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "name": "New Product Concept",
  "description": "Initial concept for Q1 2026 product",
  "folder_id": "folder_xyz789",
  "tags": ["concept", "q1-2026"],
  "visibility": "private",
  "initial_geometry": {
    "type": "primitive",
    "shape": "sphere",
    "dimensions": {"radius": 50.0},
    "units": "mm"
  }
}
```

**Response** (201 Created):
```json
{
  "id": "design_newid123",
  "name": "New Product Concept",
  "created_at": "2025-11-28T15:00:00Z",
  "edit_url": "https://app.pros.io/designs/design_newid123",
  "holographic_session": {
    "session_id": "session_abc456",
    "join_url": "pros://session/session_abc456"
  }
}
```

#### Update Design
```http
PATCH /v2/designs/{design_id}
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "name": "Updated Product Concept",
  "description": "Refined based on feedback",
  "tags": ["concept", "q1-2026", "revised"]
}
```

**Response** (200 OK):
```json
{
  "id": "design_a1b2c3d4e5f6",
  "name": "Updated Product Concept",
  "updated_at": "2025-11-28T15:05:00Z"
}
```

#### Delete Design
```http
DELETE /v2/designs/{design_id}
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response** (204 No Content)

---

### Holographic Rendering

#### Submit Rendering Job
```http
POST /v2/render/jobs
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "design_id": "design_a1b2c3d4e5f6",
  "render_settings": {
    "resolution": "4k",
    "quality": "photorealistic",
    "ray_tracing": {
      "enabled": true,
      "samples": 512,
      "bounces": 8
    },
    "camera": {
      "position": {"x": 200.0, "y": 150.0, "z": 100.0},
      "target": {"x": 0.0, "y": 0.0, "z": 50.0},
      "fov": 45.0
    },
    "lighting": {
      "environment": "studio_lighting",
      "hdri_url": "https://cdn.pros.io/hdri/studio_001.hdr",
      "intensity": 1.0
    },
    "output_format": "png"
  },
  "priority": "normal",
  "callback_url": "https://yourapp.com/webhooks/render-complete"
}
```

**Response** (202 Accepted):
```json
{
  "job_id": "render_job_xyz123",
  "status": "queued",
  "estimated_time": 18,
  "created_at": "2025-11-28T15:10:00Z",
  "queue_position": 3,
  "cost_estimate": {
    "amount": 0.25,
    "currency": "USD",
    "render_credits": 5
  }
}
```

#### Get Rendering Job Status
```http
GET /v2/render/jobs/{job_id}
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response** (200 OK):
```json
{
  "job_id": "render_job_xyz123",
  "status": "rendering",
  "progress": 45.2,
  "elapsed_time": 8,
  "estimated_time_remaining": 10,
  "started_at": "2025-11-28T15:12:00Z",
  "gpu_nodes": [
    {"id": "node_01", "region": "us-west-2", "gpu": "NVIDIA H100"},
    {"id": "node_02", "region": "us-west-2", "gpu": "NVIDIA H100"}
  ],
  "samples_completed": 231,
  "samples_total": 512
}
```

#### Download Rendered Image
```http
GET /v2/render/jobs/{job_id}/download
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response** (200 OK):
```json
{
  "job_id": "render_job_xyz123",
  "status": "completed",
  "completed_at": "2025-11-28T15:28:00Z",
  "output_files": [
    {
      "type": "image",
      "format": "png",
      "resolution": "3840x2160",
      "size_bytes": 12456789,
      "url": "https://cdn.pros.io/renders/render_job_xyz123.png",
      "expires_at": "2025-12-05T15:28:00Z"
    },
    {
      "type": "depth_map",
      "format": "exr",
      "resolution": "3840x2160",
      "size_bytes": 8923456,
      "url": "https://cdn.pros.io/renders/render_job_xyz123_depth.exr",
      "expires_at": "2025-12-05T15:28:00Z"
    }
  ],
  "render_stats": {
    "total_time": 18.3,
    "samples_rendered": 512,
    "rays_traced": 4234567890,
    "gpu_hours": 0.61
  }
}
```

---

### AI Design Assistant

#### Generate Design from Description
```http
POST /v2/ai/generate
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "prompt": "Design a modern ergonomic office chair with mesh back, adjustable lumbar support, and aluminum base",
  "style": "photorealistic",
  "constraints": {
    "dimensions": {"width": 600, "depth": 650, "height": 1200, "units": "mm"},
    "materials": ["mesh", "aluminum", "foam"],
    "budget": "mid-range"
  },
  "reference_images": [
    "https://yourapp.com/references/chair_ref_1.jpg",
    "https://yourapp.com/references/chair_ref_2.jpg"
  ]
}
```

**Response** (200 OK):
```json
{
  "design_id": "design_ai_generated_abc",
  "preview_url": "https://cdn.pros.io/previews/design_ai_generated_abc.jpg",
  "confidence": 0.87,
  "generated_at": "2025-11-28T15:35:00Z",
  "ai_model": "pros-design-assistant-v2.1",
  "alternatives": [
    {
      "variation_id": "var_01",
      "preview_url": "https://cdn.pros.io/previews/design_ai_generated_abc_var1.jpg",
      "confidence": 0.82,
      "description": "Similar design with higher backrest"
    },
    {
      "variation_id": "var_02",
      "preview_url": "https://cdn.pros.io/previews/design_ai_generated_abc_var2.jpg",
      "confidence": 0.79,
      "description": "Alternative with wooden armrests"
    }
  ],
  "processing_time": 6.2,
  "tokens_used": 2456
}
```

#### Refine Design with Voice/Text
```http
POST /v2/ai/refine
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "design_id": "design_a1b2c3d4e5f6",
  "instruction": "Make the seat wider by 50mm and add cushioning to the armrests",
  "apply_immediately": false
}
```

**Response** (200 OK):
```json
{
  "design_id": "design_a1b2c3d4e5f6",
  "refined_version_id": "design_a1b2c3d4e5f6_v13",
  "changes_preview": {
    "seat_width": {"before": 500, "after": 550, "units": "mm"},
    "armrest_material": {"before": "hard_plastic", "after": "cushioned_polymer"}
  },
  "preview_url": "https://cdn.pros.io/previews/design_a1b2c3d4e5f6_v13.jpg",
  "estimated_impact": {
    "cost_change": "+$2.50",
    "weight_change": "+0.3kg",
    "manufacturing_complexity": "no change"
  },
  "processing_time": 3.8
}
```

---

### Collaboration

#### Create Collaboration Session
```http
POST /v2/collab/sessions
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "design_id": "design_a1b2c3d4e5f6",
  "session_name": "Design Review - Product Team",
  "max_participants": 20,
  "session_settings": {
    "voice_enabled": true,
    "spatial_audio": true,
    "cursor_visibility": "all",
    "edit_permissions": "host_approval"
  },
  "scheduled_start": "2025-11-29T10:00:00Z",
  "duration_minutes": 60
}
```

**Response** (201 Created):
```json
{
  "session_id": "session_collab_xyz",
  "join_url": "pros://session/session_collab_xyz",
  "web_join_url": "https://app.pros.io/session/session_collab_xyz",
  "host_key": "HOST_KEY_abc123",
  "participant_key": "PARTICIPANT_KEY_def456",
  "created_at": "2025-11-28T16:00:00Z",
  "expires_at": "2025-11-29T11:00:00Z"
}
```

#### Join Collaboration Session (WebSocket)
```javascript
const ws = new WebSocket('wss://ws.pros.io/v2/collab/session_collab_xyz');

// Authentication
ws.send(JSON.stringify({
  type: 'auth',
  token: 'YOUR_ACCESS_TOKEN',
  participant_key: 'PARTICIPANT_KEY_def456'
}));

// Listen for events
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  switch (message.type) {
    case 'auth_success':
      console.log('Authenticated:', message.user);
      break;
    
    case 'participant_joined':
      console.log('User joined:', message.participant);
      break;
    
    case 'cursor_update':
      // Update other users' cursor positions
      updateCursor(message.user_id, message.position);
      break;
    
    case 'geometry_update':
      // Apply geometry changes from other users
      applyGeometryChange(message.changes);
      break;
    
    case 'voice_stream':
      // Handle spatial audio stream
      playSpatialAudio(message.user_id, message.audio_data, message.position);
      break;
  }
};

// Send cursor position updates
function sendCursorUpdate(position) {
  ws.send(JSON.stringify({
    type: 'cursor_update',
    position: {x: position.x, y: position.y, z: position.z},
    timestamp: Date.now()
  }));
}

// Send geometry changes
function sendGeometryChange(changes) {
  ws.send(JSON.stringify({
    type: 'geometry_update',
    changes: changes,
    timestamp: Date.now()
  }));
}
```

---

### Asset Library

#### Search Assets
```http
GET /v2/library/assets
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Query Parameters**:
- `q` (string): Search query
- `category` (string): Asset category (model, material, texture, hdri)
- `tags` (string): Comma-separated tags
- `license` (string): License type (free, commercial, editorial)
- `page` (integer): Page number
- `limit` (integer): Results per page

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "asset_chair_modern_01",
      "name": "Modern Office Chair",
      "description": "Ergonomic office chair with mesh back",
      "category": "model",
      "file_format": "usd",
      "file_size": 12456789,
      "polygon_count": 45678,
      "preview_url": "https://cdn.pros.io/library/asset_chair_modern_01.jpg",
      "download_url": "https://cdn.pros.io/library/asset_chair_modern_01.usd",
      "license": {
        "type": "commercial",
        "attribution_required": false,
        "modifications_allowed": true
      },
      "tags": ["furniture", "office", "chair", "modern"],
      "created_at": "2025-10-15T08:30:00Z",
      "created_by": {
        "id": "user_creator_123",
        "name": "3D Asset Co",
        "verified": true
      },
      "downloads": 2456,
      "rating": 4.8
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_results": 8472,
    "total_pages": 424
  }
}
```

#### Upload Asset
```http
POST /v2/library/assets
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

{
  "file": <binary_data>,
  "name": "Custom Material - Brushed Steel",
  "description": "Realistic brushed steel material with configurable roughness",
  "category": "material",
  "tags": ["metal", "steel", "brushed", "pbr"],
  "license": {
    "type": "commercial",
    "attribution_required": true,
    "modifications_allowed": true
  },
  "visibility": "public"
}
```

**Response** (201 Created):
```json
{
  "id": "asset_custom_mat_xyz",
  "name": "Custom Material - Brushed Steel",
  "upload_status": "processing",
  "preview_generation": {
    "status": "queued",
    "estimated_time": 30
  },
  "created_at": "2025-11-28T16:30:00Z"
}
```

---

## GraphQL API

### Endpoint
```
POST https://api.pros.io/v2/graphql
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

### Example Query: Get Design with Nested Data
```graphql
query GetDesignDetails($designId: ID!) {
  design(id: $designId) {
    id
    name
    description
    createdAt
    updatedAt
    
    createdBy {
      id
      name
      email
      avatar
    }
    
    folder {
      id
      name
      path
    }
    
    materials {
      id
      name
      type
      properties {
        baseColor
        metallic
        roughness
        normalMap
      }
    }
    
    versionHistory {
      currentVersion
      totalVersions
      versions {
        version
        timestamp
        author {
          name
        }
        changesSummary
      }
    }
    
    collaboration {
      enabled
      sessionId
      activeUsers {
        id
        name
        cursorPosition {
          x
          y
          z
        }
        lastActivity
      }
    }
    
    tags
    polygonCount
    fileSize
  }
}
```

**Variables**:
```json
{
  "designId": "design_a1b2c3d4e5f6"
}
```

### Example Mutation: Create Design with Assets
```graphql
mutation CreateDesignWithAssets($input: CreateDesignInput!) {
  createDesign(input: $input) {
    id
    name
    editUrl
    holographicSession {
      sessionId
      joinUrl
    }
  }
}
```

**Variables**:
```json
{
  "input": {
    "name": "Product Prototype v4",
    "description": "Incorporating user feedback",
    "folderId": "folder_xyz789",
    "tags": ["prototype", "v4"],
    "visibility": "PRIVATE",
    "initialAssets": [
      {
        "assetId": "asset_chair_base_01",
        "position": {"x": 0, "y": 0, "z": 0},
        "scale": {"x": 1.2, "y": 1.2, "z": 1.2}
      }
    ]
  }
}
```

---

## WebSocket Events

### Connection
```javascript
const ws = new WebSocket('wss://ws.pros.io/v2/stream');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'YOUR_ACCESS_TOKEN'
  }));
};
```

### Event Types

#### 1. Design Updates (Real-Time Sync)
```json
{
  "type": "design_update",
  "design_id": "design_a1b2c3d4e5f6",
  "changes": {
    "geometry": {
      "added": [/* new vertices/faces */],
      "modified": [/* changed vertices */],
      "deleted": [/* removed faces */]
    },
    "materials": {
      "updated": {
        "material_id": "mat_abc123",
        "properties": {"roughness": 0.4}
      }
    },
    "timestamp": "2025-11-28T17:00:00.123Z",
    "user_id": "user_67890"
  }
}
```

#### 2. Collaboration Events
```json
{
  "type": "participant_joined",
  "session_id": "session_collab_xyz",
  "participant": {
    "id": "user_54321",
    "name": "Alice Designer",
    "avatar": "https://cdn.pros.io/avatars/user_54321.jpg",
    "role": "editor",
    "device": "pros_studio"
  },
  "timestamp": "2025-11-28T17:05:00Z"
}
```

#### 3. Rendering Progress
```json
{
  "type": "render_progress",
  "job_id": "render_job_xyz123",
  "progress": 67.5,
  "samples_completed": 345,
  "samples_total": 512,
  "estimated_time_remaining": 6,
  "preview_url": "https://cdn.pros.io/previews/render_job_xyz123_progress.jpg"
}
```

---

## Rate Limiting

### Limits

| Tier | Requests/Minute | Requests/Day | WebSocket Connections |
|------|-----------------|--------------|----------------------|
| **Free** | 60 | 5,000 | 2 concurrent |
| **Creator** | 300 | 50,000 | 10 concurrent |
| **Studio** | 1,200 | 250,000 | 50 concurrent |
| **Enterprise** | Unlimited | Unlimited | Unlimited |

### Headers
```http
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1701187200
```

### Error Response (429 Too Many Requests)
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please retry after 30 seconds.",
    "retry_after": 30
  }
}
```

---

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "DESIGN_NOT_FOUND",
    "message": "The requested design does not exist or you don't have permission to access it.",
    "details": {
      "design_id": "design_invalid123"
    },
    "request_id": "req_abc123xyz",
    "timestamp": "2025-11-28T17:15:00Z"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or expired access token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `DESIGN_NOT_FOUND` | 404 | Design does not exist |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `RENDERING_FAILED` | 500 | Cloud rendering job failed |
| `INSUFFICIENT_CREDITS` | 402 | Not enough render credits |
| `SESSION_FULL` | 409 | Collaboration session at capacity |

---

## SDKs & Libraries

### Official SDKs

#### JavaScript/TypeScript
```bash
npm install @pros/sdk
```

```typescript
import { ProsClient } from '@pros/sdk';

const client = new ProsClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET'
});

// List designs
const designs = await client.designs.list({
  page: 1,
  limit: 20
});

// Create design
const newDesign = await client.designs.create({
  name: 'New Product',
  folderId: 'folder_xyz789'
});

// Join collaboration session (WebSocket)
const session = await client.collab.join('session_abc123');
session.on('cursor_update', (data) => {
  console.log('Cursor update:', data);
});
```

#### Python
```bash
pip install pros-sdk
```

```python
from pros_sdk import ProsClient

client = ProsClient(
    client_id='YOUR_CLIENT_ID',
    client_secret='YOUR_CLIENT_SECRET'
)

# List designs
designs = client.designs.list(page=1, limit=20)

# Create design
new_design = client.designs.create(
    name='New Product',
    folder_id='folder_xyz789'
)

# Submit rendering job
job = client.render.submit(
    design_id='design_abc123',
    settings={
        'resolution': '4k',
        'quality': 'photorealistic'
    }
)

print(f'Job ID: {job.id}, Status: {job.status}')
```

#### Unity Plugin
```bash
# Unity Package Manager
https://github.com/pros-platform/unity-plugin.git
```

```csharp
using Pros.SDK;

var client = new ProsClient("YOUR_CLIENT_ID", "YOUR_CLIENT_SECRET");

// Import design into Unity scene
var design = await client.Designs.GetAsync("design_abc123");
var gameObject = await design.ImportToUnityAsync();

// Real-time collaboration
var session = await client.Collab.JoinAsync("session_xyz");
session.OnCursorUpdate += (user, position) => {
    UpdateUserCursor(user, position);
};
```

---

## Webhooks

### Configure Webhook
```http
POST /v2/webhooks
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "url": "https://yourapp.com/webhooks/pros",
  "events": ["render.completed", "design.updated", "collab.ended"],
  "secret": "YOUR_WEBHOOK_SECRET"
}
```

### Webhook Payload Example
```json
{
  "event": "render.completed",
  "timestamp": "2025-11-28T17:30:00Z",
  "data": {
    "job_id": "render_job_xyz123",
    "design_id": "design_a1b2c3d4e5f6",
    "status": "completed",
    "output_url": "https://cdn.pros.io/renders/render_job_xyz123.png",
    "render_time": 18.3
  },
  "signature": "sha256=abc123..."
}
```

### Verify Webhook Signature
```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(f'sha256={expected}', signature)
```

---

## Support & Resources

- **API Documentation**: https://developers.pros.io/api
- **Interactive API Explorer**: https://developers.pros.io/explorer
- **SDK Repository**: https://github.com/pros-platform
- **Developer Forum**: https://community.pros.io/developers
- **Status Page**: https://status.pros.io
- **Support Email**: api-support@pros.io

---

**Document Classification**: Technical - API Reference  
**Last Updated**: November 28, 2025  
**API Version**: v2.1.0  
**Next Review**: January 15, 2026  
**Owner**: Lisa Zhang (Head of Platform Engineering)

© 2025 PRO'S Inc. All rights reserved.
