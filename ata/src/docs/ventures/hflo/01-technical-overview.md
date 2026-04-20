# HFLO - Technical Overview
## Solar-Powered Holographic Display Architecture

**Last Updated:** November 30, 2025  
**Reading Time:** 35 minutes

---

## System Architecture

**Holographic Display:** Pepper's Ghost illusion (45° angled glass + LED strip)  
**Power:** Quantum dot solar cells (8W peak, 2.4W average)  
**Battery:** LiFePO4 (100Wh, 7-day autonomy)  
**Controller:** ESP32-S3 (dual-core, Wi-Fi/BLE)  
**Sensors:** Capacitive touch (12 channels), ambient light, temperature  
**Animations:** 1,000+ procedurally generated flower species

### BOM (Bloom Model)

| Component | Cost |
|-----------|------|
| Quantum dot solar panel (20W) | $45 |
| LiFePO4 battery (100Wh) | $28 |
| ESP32-S3 controller | $8 |
| LED strip (WS2812B, 144 LEDs/m, 1m) | $12 |
| Holographic glass (30cm × 30cm × 3mm) | $18 |
| Capacitive touch sensors (12ch) | $6 |
| Enclosure (bamboo/aluminum) | $22 |
| Assembly & QC | $15 |
| **Total COGS** | **$154** |

**Retail:** $299 (48% gross margin)

---

## Holographic Display

### Pepper's Ghost Illusion

```
Top View:
                LED Strip
                    │
                    ▼
    ┌───────────────────────────┐
    │                           │
    │    45° Angled Glass       │  ← Reflects LED light
    │         /                 │
    │        /                  │
    │       /                   │
    │      /                    │
    │     /                     │
    │    ◄ Viewer sees          │
    │      hologram here        │
    └───────────────────────────┘

Light Path:
LED → Glass (45° reflection) → Viewer's eye
Background (black) creates illusion of floating 3D object
```

### LED Specifications

- **Type:** WS2812B (addressable RGB)
- **Count:** 144 LEDs/meter × 1 meter = 144 LEDs
- **Power:** 0.3W per LED × 144 = 43W (max), 12W (typical)
- **Brightness:** 1,200 lumens (bright enough for daylight viewing)
- **Color Depth:** 24-bit RGB (16.7M colors)
- **Refresh Rate:** 400 Hz

---

## Solar Power System

### Quantum Dot Solar Cells

**Efficiency:** 30% (vs. 20% standard silicon)  
**Size:** 30cm × 40cm  
**Peak Power:** 8W (in direct sunlight)  
**Average Power:** 2.4W (indoor ambient light)

**Energy Balance:**
```
Daily Energy Production (indoor):
2.4W × 8 hours = 19.2 Wh/day

Daily Energy Consumption:
- LED display (4h): 12W × 4h = 48 Wh
- Controller (24h): 0.5W × 24h = 12 Wh
- Total: 60 Wh/day

Battery (100 Wh):
Autonomy = 100 Wh / (60 - 19.2) Wh/day = 2.5 days (indoor)
Autonomy = 7 days (with solar recharge in daylight)
```

---

**© 2025 HFLO Inc. All rights reserved.**
