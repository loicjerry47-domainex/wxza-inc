# INECT - Operations Runbook

**Pages:** 30

## Monitoring

```bash
# Check stream health
inect-admin stream-status --event event123

# Output:
Stream: LIVE
Viewers: 45,230
Bitrate: 4.5 Mbps avg
Latency: 6.2 seconds
Buffering: 2% (good)
CDN Health: 100%

# Real-time analytics
inect-admin analytics --event event123 --realtime

# Output:
Concurrent Viewers: 45,230 (↑ 5% from 5 min ago)
Chat Activity: 450 msg/min
Reactions: 1,200/min
Avg Watch Time: 58 min
Churn Rate: 3%/hour (excellent)
```

## Common Issues

### 1. Stream Buffering (>5%)
**Cause:** Insufficient bandwidth at origin  
**Fix:** Increase encoder bitrate, scale up Media Live

### 2. High Latency (>15 seconds)
**Cause:** HLS segment duration too long  
**Fix:** Reduce segment duration (10s → 2s), use WebRTC

### 3. CDN Overload
**Cause:** Traffic spike beyond capacity  
**Fix:** Auto-scale CloudFlare zones, add origin servers

## Incident Response

### Stream Outage

```bash
# 1. Check stream status
inect-admin stream-status --event event123

# 2. Restart encoder
inect-admin encoder-restart --event event123

# 3. Fallback to backup stream
inect-admin failover --event event123 --backup backup_stream_url

# 4. Notify viewers
inect-admin notify --event event123 --message "Technical difficulties, restoring shortly"
```

## Scaling Guidelines

| Concurrent Viewers | Infrastructure |
|-------------------|----------------|
| < 10K | 10 API servers, 1 Media Live channel |
| 10K - 100K | 50 API servers, 2 Media Live channels |
| 100K - 1M | 200 API servers, 5 Media Live channels |

**© 2025 INECT Inc.**
