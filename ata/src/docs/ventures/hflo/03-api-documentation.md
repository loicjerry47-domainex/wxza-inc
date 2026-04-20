# HFLO - API Documentation
## Mobile App & Cloud APIs

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 20 minutes

---

## REST API

**Base URL:** `https://api.hflo.art/v1`

### Authentication

```bash
# Get API key from mobile app
curl -X POST https://api.hflo.art/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "***"}'

# Response
{
  "access_token": "hflo_ak_abc123...",
  "refresh_token": "hflo_rk_xyz789...",
  "expires_in": 3600
}
```

### Device Management

```bash
# Register new HFLO device
curl -X POST https://api.hflo.art/v1/devices \
  -H "Authorization: Bearer hflo_ak_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "serial_number": "HFLO-2025-12345",
    "model": "Bloom",
    "wifi_ssid": "MyHomeWiFi",
    "wifi_password": "***"
  }'

# Get device status
curl https://api.hflo.art/v1/devices/HFLO-2025-12345 \
  -H "Authorization: Bearer hflo_ak_abc123..."

# Response
{
  "device_id": "HFLO-2025-12345",
  "model": "Bloom",
  "battery_level": 85,
  "solar_power": 2.4,
  "current_flower": "rose",
  "animation_speed": 1.0,
  "brightness": 0.8,
  "last_seen": "2025-11-30T10:30:00Z"
}
```

### Flower Control

```bash
# Change flower species
curl -X PUT https://api.hflo.art/v1/devices/HFLO-2025-12345/flower \
  -H "Authorization: Bearer hflo_ak_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "species": "orchid",
    "color_theme": "purple_gradient",
    "animation_speed": 1.5
  }'

# Get available flower library
curl https://api.hflo.art/v1/flowers \
  -H "Authorization: Bearer hflo_ak_abc123..."

# Response
{
  "flowers": [
    {"id": "rose", "name": "Rose", "petal_count": 32, "colors": ["red", "pink", "white"]},
    {"id": "tulip", "name": "Tulip", "petal_count": 6, "colors": ["red", "yellow", "purple"]},
    {"id": "orchid", "name": "Orchid", "petal_count": 5, "colors": ["purple", "white", "pink"]},
    ...
  ]
}
```

---

## WebSocket API

**Real-Time Updates**

```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.hflo.art/v1/ws');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'hflo_ak_abc123...'
  }));
  
  // Subscribe to device updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    device_id: 'HFLO-2025-12345'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'battery_update') {
    console.log(`Battery: ${data.level}%`);
  }
  
  if (data.type === 'touch_event') {
    console.log(`Touch sensor ${data.sensor_id} triggered`);
  }
};
```

---

## Mobile SDK

### iOS (Swift)

```swift
import HFLOKit

// Initialize SDK
HFLO.configure(apiKey: "hflo_ak_abc123...")

// Connect to device
let device = try await HFLO.Device.connect(serialNumber: "HFLO-2025-12345")

// Change flower
try await device.setFlower(species: "rose", colorTheme: "red_gradient")

// Listen for touch events
device.onTouch { sensor in
    print("Sensor \(sensor) touched")
}
```

### Android (Kotlin)

```kotlin
import art.hflo.sdk.HFLO

// Initialize
HFLO.init(apiKey = "hflo_ak_abc123...")

// Connect
val device = HFLO.Device.connect("HFLO-2025-12345")

// Change flower
device.setFlower(
    species = "orchid",
    colorTheme = "purple_gradient",
    animationSpeed = 1.5f
)
```

---

**© 2025 HFLO Inc. All rights reserved.**
