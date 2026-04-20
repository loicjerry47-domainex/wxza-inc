# INECT - Database Schema

**Pages:** 45

```sql
-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY,
  organizer_id UUID REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  ticket_price DECIMAL(10,2),
  max_viewers INTEGER,
  status VARCHAR(20)
);

-- Streams
CREATE TABLE streams (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  stream_url TEXT,
  protocol VARCHAR(20),
  started_at TIMESTAMP,
  ended_at TIMESTAMP
);

-- Tickets
CREATE TABLE tickets (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES users(id),
  price DECIMAL(10,2),
  purchased_at TIMESTAMP
);

-- Analytics (DynamoDB)
{
  event_id: "evt_abc123",
  timestamp: 1732967400,
  concurrent_viewers: 45230,
  avg_bitrate: 4500000,
  chat_messages: 12450
}
```

**© 2025 INECT Inc.**
