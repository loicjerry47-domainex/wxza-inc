# INECT - Cloud Infrastructure

**Pages:** 45

## AWS Media Services

### AWS Media Live
- **Input:** 6× 4K camera feeds (RTMP)
- **Output:** ABR ladder (6 renditions)
- **Cost:** $2.40/hour (1080p60 channel)

### AWS Media Package
- **Function:** Package live streams (HLS, DASH)
- **Latency:** 6-10 seconds
- **DRM:** Widevine, FairPlay, PlayReady

### CloudFlare Stream
- **CDN:** 200+ edge locations
- **Bandwidth:** Unlimited
- **Pricing:** $1 per 1,000 minutes

## Auto-Scaling

```yaml
# EKS Auto-Scaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: inect-api
spec:
  minReplicas: 20
  maxReplicas: 200
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Cost Estimate (1M concurrent viewers)

| Service | Cost |
|---------|------|
| **AWS Media Live** | $2.40/hour |
| **CloudFlare Stream** | $16,667/hour (1M viewers × 1 hour) |
| **EC2 (API servers)** | $500/hour (200 instances) |
| **Database** | $50/hour |
| **Total** | **$17,219/hour** |

**Revenue (1M viewers × $10 ticket):** $10M  
**Gross Margin:** 99.8%

**© 2025 INECT Inc.**
