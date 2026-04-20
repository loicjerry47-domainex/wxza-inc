# INECT - Developer Onboarding

**Pages:** 25

## Setup (10 minutes)

```bash
# Clone repository
git clone https://github.com/inect/platform
cd platform

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add: INECT_API_KEY=inect_live_abc123...

# Start development server
npm run dev
# Open: http://localhost:3000
```

## Stream Your First Event

```javascript
import INECT from '@inect/sdk';

// Initialize
const client = new INECT({ apiKey: 'inect_live_abc123' });

// Create event
const event = await client.events.create({
  title: 'My First Concert',
  start_time: '2025-12-01T19:00:00Z',
  ticket_price: 10.00
});

// Start stream (RTMP push)
const stream = await client.streams.start({
  event_id: event.id,
  rtmp_url: 'rtmp://ingest.inect.live/live/stream123'
});

// Get viewer URL
console.log(`Watch at: https://inect.live/events/${event.id}`);
```

## Embed Player

```html
<!-- Embed INECT player on your website -->
<iframe 
  src="https://player.inect.live/event123"
  width="1280" 
  height="720"
  frameborder="0"
  allowfullscreen>
</iframe>
```

**© 2025 INECT Inc.**
