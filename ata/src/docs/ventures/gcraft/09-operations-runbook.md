# Gcraft - Operations Runbook

**Pages:** 30

## Monitoring

```bash
# Check fraud model performance
gcraft-admin fraud-stats --period 24h
# Output: 99.7% accuracy, 0.3% false positives

# Monitor transaction volume
gcraft-admin metrics --metric transactions
# Output: 15,000 transactions/day (peak)
```

## Common Issues

### 1. High Fraud Rate
**Cause:** New fraud pattern  
**Fix:** Retrain ML model with recent data

### 2. Balance Verification Timeout
**Cause:** Retailer API down  
**Fix:** Fallback to screen scraping

### 3. Payment Failures
**Cause:** Stripe outage  
**Fix:** Queue transactions, retry when restored

**© 2025 Gcraft Inc.**
