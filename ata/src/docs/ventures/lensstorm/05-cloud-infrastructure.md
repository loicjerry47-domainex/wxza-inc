# LENSSTORM - Cloud Infrastructure
## AWS Multi-Region Architecture

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 45 minutes

---

## Infrastructure Overview

**Cloud Provider:** AWS (primary), GCP (ML workloads)  
**Regions:** us-east-1, us-west-2, eu-west-1, ap-northeast-1  
**CDN:** CloudFront (50+ edge locations)

### Kubernetes Clusters

```yaml
# EKS Cluster Configuration
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: lensstorm-production
  region: us-east-1
  version: "1.28"

nodeGroups:
  - name: general
    instanceType: m6i.2xlarge
    desiredCapacity: 20
    minSize: 10
    maxSize: 50
```

### Services

- **API Gateway** - Kong (handles 10M requests/day)
- **App Store** - Custom (5,000+ apps)
- **OTA Updates** - Delta updates (reduce bandwidth)
- **Cloud Sync** - Real-time device synchronization

---

**© 2025 LENSSTORM Inc. All rights reserved.**
