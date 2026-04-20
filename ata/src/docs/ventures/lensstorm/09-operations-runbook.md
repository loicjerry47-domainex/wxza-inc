# LENSSTORM - Operations Runbook
## Device Management & Support

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 25 minutes

---

## Device Management

### Remote Diagnostics

```bash
# Check device health
lensstorm-admin device-status --serial SN12345

# Output:
# Battery: 85% (healthy)
# Firmware: 2.1.5 (up to date)
# Calibration: OK
# Last sync: 2 hours ago
# Issues: None
```

### OTA Updates

```bash
# Push firmware update
lensstorm-admin push-update \
  --version 2.2.0 \
  --rollout 10%  # Canary deployment

# Monitor rollout
lensstorm-admin monitor-update --version 2.2.0
# Success rate: 98.5%
# Rollback if <95%
```

## Common Issues

### 1. Display Flickering

**Cause:** Laser driver overheating  
**Fix:** Reduce brightness, update firmware

### 2. Poor Tracking

**Cause:** Dirty cameras  
**Fix:** Clean lens with microfiber cloth

### 3. Battery Drain

**Cause:** Background apps  
**Fix:** Close unused apps, enable battery saver

## Support Tiers

- **L1:** Chat support (response <2 min)
- **L2:** Phone support (response <15 min)
- **L3:** Device replacement (24h shipping)

---

**© 2025 LENSSTORM Inc. All rights reserved.**
