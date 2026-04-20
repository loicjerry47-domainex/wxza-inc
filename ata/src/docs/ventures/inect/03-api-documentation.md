# INECT - API Documentation

**Pages:** 25

## Base URL
`https://api.inect.live/v1`

## Authentication
```bash
curl -X POST https://api.inect.live/v1/auth/login \
  -d '{"email": "user@example.com", "password": "***"}'
```

## Endpoints

### Create Event
```bash
POST /events
{
  "title": "Summer Music Festival 2025",
  "start_time": "2025-08-15T18:00:00Z",
  "ticket_price": 25.00,
  "max_viewers": 100000
}
```

### Start Stream
```bash
POST /events/{event_id}/stream/start
{
  "cameras": [
    {"id": "cam1", "name": "Main Stage", "resolution": "4K"},
    {"id": "cam2", "name": "Close-Up", "resolution": "4K"}
  ]
}
```

### Get Stream URL
```bash
GET /events/{event_id}/stream/url
# Returns HLS manifest: https://stream.inect.live/event123/master.m3u8
```

### WebSocket (Chat)
```javascript
const ws = new WebSocket('wss://chat.inect.live/event123');
ws.send(JSON.stringify({ type: 'chat', text: 'Hello!' }));
```

**© 2025 INECT Inc.**
