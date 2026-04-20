# HFLO - Database Schema
## User, Device & Animation Data

**Last Updated:** November 30, 2025  
**Pages:** 40

---

## PostgreSQL Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Devices
CREATE TABLE devices (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  serial_number VARCHAR(50) UNIQUE,
  model VARCHAR(50),
  firmware_version VARCHAR(20),
  battery_health INTEGER,
  calibration_data JSONB
);

-- Flower Animations (MongoDB)
{
  _id: ObjectId("..."),
  device_id: "HFLO-2025-12345",
  species: "rose",
  color_theme: "red_gradient",
  animation_params: {
    petal_count: 32,
    growth_rate: 1.0,
    wind_sway: 0.3
  }
}
```

**© 2025 HFLO Inc. All rights reserved.**
