# LENSSTORM - Database Schema
## User Data & Device Management

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 50 minutes

---

## Database Architecture

**PostgreSQL** - User accounts, devices, subscriptions  
**MongoDB** - AR content, spatial anchors, user preferences  
**Redis** - Session management, real-time sync  
**InfluxDB** - Telemetry, usage analytics

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  subscription_tier VARCHAR(50) DEFAULT 'base'
);
```

### Devices Table

```sql
CREATE TABLE devices (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  serial_number VARCHAR(50) UNIQUE,
  model VARCHAR(50),
  firmware_version VARCHAR(20),
  last_sync TIMESTAMP,
  battery_health INTEGER,
  calibration_data JSONB
);
```

### AR Content (MongoDB)

```javascript
{
  _id: ObjectId("..."),
  user_id: "uuid",
  anchor_id: "anchor_123",
  type: "3d_model",
  position: { x: 0, y: 1.5, z: -2 },
  rotation: { x: 0, y: 90, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  asset_url: "https://cdn.lensstorm.ai/models/chair.glb",
  created_at: ISODate("2025-11-30T10:00:00Z")
}
```

---

**© 2025 LENSSTORM Inc. All rights reserved.**
