# HEARb ASSIST - Database Schema

**Pages:** 40

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  disability_type VARCHAR(50),
  subscription_tier VARCHAR(20),
  created_at TIMESTAMP
);

CREATE TABLE transcripts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  audio_duration INTEGER,
  transcript TEXT,
  language VARCHAR(10),
  accuracy DECIMAL(3,2),
  created_at TIMESTAMP
);

CREATE TABLE sound_alerts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  sound_type VARCHAR(50),
  detected_at TIMESTAMP,
  location GEOGRAPHY(POINT)
);
```

**© 2025 HEARb ASSIST Inc.**
