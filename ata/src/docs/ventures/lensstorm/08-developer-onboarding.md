# LENSSTORM - Developer Onboarding
## SDK Setup & App Development Guide

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 30 minutes

---

## Setup (5 minutes)

### 1. Install SDK

```bash
# Unity
npm install @lensstorm/unity-sdk

# Android Studio
implementation 'ai.lensstorm:sdk:2.1.0'

# Xcode
pod 'LensStormSDK', '~> 2.1.0'
```

### 2. Create API Key

```bash
# Get API key from developer portal
https://developers.lensstorm.ai/keys

# Add to project
LENSSTORM_API_KEY=ls_live_abc123...
```

### 3. Run Sample App

```bash
git clone https://github.com/lensstorm/hello-ar
cd hello-ar
npm install
npm run dev
```

## Build Your First AR App

```kotlin
// 1. Initialize
LensOS.initialize(apiKey = "ls_live_abc123...")

// 2. Detect planes
LensOS.spatial.detectPlanes { planes ->
    // 3. Place 3D model
    LensOS.ar.place3DModel(
        url = "models/chair.glb",
        targetPlane = planes[0]
    )
}
```

## Publish to LensStore

```bash
lensstorm publish --app my-ar-app
# Review time: 24-48 hours
# 30% revenue share to LENSSTORM
```

---

**© 2025 LENSSTORM Inc. All rights reserved.**
