# INECT - Technical Overview

**Pages:** 40

## Architecture

```
Event Venue
     │
     ▼
┌─────────────────────────────────┐
│  PRODUCTION (6× 4K Cameras)    │
│  • Camera switching (manual/AI)│
│  • Graphics overlay             │
│  • Audio mixing                 │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  ENCODING (AWS Media Live)      │
│  • 4K → 1080p → 720p → 360p    │
│  • H.265 codec (50% bandwidth) │
│  • ABR (adaptive bitrate)      │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  CDN (CloudFlare Stream)        │
│  • 200+ edge locations          │
│  • Sub-second latency          │
│  • 1M concurrent viewers       │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  VIEWERS (Web + Mobile Apps)    │
│  • WebRTC (low latency)         │
│  • HLS (compatibility)          │
│  • Dolby Atmos spatial audio    │
└─────────────────────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Next.js, React Native |
| **Streaming** | WebRTC, HLS, DASH |
| **Encoding** | AWS Media Live, FFmpeg |
| **CDN** | CloudFlare Stream |
| **Database** | PostgreSQL, Redis, DynamoDB |
| **Infrastructure** | AWS Media Services |

**© 2025 INECT Inc.**
