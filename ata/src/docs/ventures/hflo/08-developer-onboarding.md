# HFLO - Developer Onboarding
## Custom Flower Creation SDK

**Last Updated:** November 30, 2025  
**Pages:** 25

---

## Create Custom Flowers

### 1. Install SDK

```bash
npm install @hflo/flower-sdk
```

### 2. Define Flower Species

```javascript
import { FlowerSpecies } from '@hflo/flower-sdk';

const myCustomFlower = new FlowerSpecies({
  name: 'Cyberpunk Rose',
  petalCount: 24,
  petalShape: 'pointed',
  colorGradient: ['#ff00ff', '#00ffff'],  // Magenta to cyan
  growthRate: 1.2,
  bloomCycle: 12,  // hours
  windResponse: 0.8
});
```

### 3. Test Locally

```bash
hflo-sim --flower my-custom-flower.js
# Opens 3D preview in browser
```

### 4. Publish to HFLO Store

```bash
hflo publish --flower my-custom-flower.js
# Review time: 24-48 hours
# Revenue share: 70% creator, 30% HFLO
```

**© 2025 HFLO Inc. All rights reserved.**
