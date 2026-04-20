# HFLO - Cloud Infrastructure
## AWS IoT Core Architecture

**Last Updated:** November 30, 2025  
**Pages:** 40

---

## Infrastructure

**Cloud:** AWS  
**IoT:** AWS IoT Core (MQTT broker)  
**Database:** RDS PostgreSQL + DocumentDB  
**CDN:** CloudFront (flower animation assets)

### Device Communication

```yaml
# AWS IoT Core - MQTT Topics
devices/HFLO-2025-12345/status    # Device telemetry
devices/HFLO-2025-12345/commands  # Remote control
devices/HFLO-2025-12345/events    # Touch events
```

### Lambda Functions

- **device-registration** - Provision new devices
- **firmware-update** - OTA updates (delta patches)
- **analytics-processor** - Usage analytics

**© 2025 HFLO Inc. All rights reserved.**
