# HFLO - Holographic Display System
## Pepper's Ghost Optical Architecture

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 45 minutes

---

## Pepper's Ghost Illusion

### Optical Principle

The Pepper's Ghost effect uses a **45° angled semi-transparent glass** to reflect LED light toward the viewer while allowing the background to show through, creating a convincing 3D hologram illusion.

```
Side View - Light Path:

LED Strip (WS2812B, 144 LEDs)
        │
        │ Upward light emission
        ▼
    ┌───────────────┐
    │   45° Glass   │  ← Reflects 50% of light
    │      /        │
    │     /         │
    │    /          │
    │   /           │
    │  /            │
    │ ◄─────────────┼─── Viewer sees reflection
    │               │     as floating 3D object
    │  Black        │
    │  Background   │  ← Absorbs remaining light
    └───────────────┘

Physics:
- Incident angle: 45°
- Reflection coefficient: 50%
- Transmission: 50% (allows background visibility)
- Result: Convincing 3D floating image
```

### Glass Specifications

| Parameter | Specification |
|-----------|--------------|
| **Material** | Low-iron ultra-clear glass |
| **Thickness** | 3mm |
| **Size (Bloom model)** | 300mm × 300mm |
| **Angle** | 45° ± 0.5° |
| **Transmission** | 92% (clear glass) |
| **Reflection** | 8% (surface reflection) |
| **Coating** | Anti-reflective (back surface) |
| **Edge Finishing** | Polished (safety) |

**Why Low-Iron Glass?**
- Regular glass has green tint (iron oxide impurities)
- Low-iron glass: 92% transmission (vs. 85% regular)
- Better color accuracy for holographic flowers

---

## LED Strip System

### WS2812B Addressable RGB LEDs

**Specifications:**
- **LED Count:** 144 LEDs/meter × 1 meter = 144 LEDs
- **Chip:** WS2812B (integrated controller + RGB LED)
- **Protocol:** Single-wire data (800kHz)
- **Voltage:** 5V DC
- **Current:** 60mA per LED (max), 20mA (typical)
- **Power:** 0.3W per LED (max), 0.1W (typical)
- **Color Depth:** 8-bit per channel (16.7M colors)
- **Brightness:** 1,200 lumens (full white, all LEDs)
- **Viewing Angle:** 120°

### LED Positioning

```
Top View - LED Strip Layout:

    ┌─────────────────────────────────────┐
    │                                     │
    │  ┌─────────────────────────────┐   │
    │  │  144 LEDs in U-shape        │   │
    │  │                             │   │
    │  │  ◄──────────────────────┐   │   │
    │  │                         │   │   │
    │  │  LED[0]                 │   │   │
    │  │   ↓                     │   │   │
    │  │  LED[1]                 │   │   │
    │  │   ↓                     │   │   │
    │  │  LED[71] ───────────► LED[72] │ │
    │  │                         ↓     │ │
    │  │                      LED[143] │ │
    │  └─────────────────────────────┘   │
    │                                     │
    │      45° Glass (reflects LEDs)     │
    └─────────────────────────────────────┘

Total Length: 1 meter (3 sides: 30cm + 40cm + 30cm)
```

---

## Procedural Flower Animation

### Generative Botanical Graphics

HFLO uses **procedural generation** to create unique, realistic flower animations.

**Flower Species Library:**
- 1,000+ species (roses, tulips, orchids, sunflowers, etc.)
- Each species has unique parameters:
  - Petal count, shape, color gradient
  - Growth rate, bloom cycle
  - Motion patterns (wind sway, phototropism)

### Animation Pipeline

```python
# Procedural flower generation
class FlowerGenerator:
    def __init__(self, species='rose'):
        self.species = species
        self.params = self.load_species_params(species)
    
    def generate_frame(self, time_seconds):
        """
        Generate LED color pattern for current time
        
        Args:
            time_seconds: Animation time (0 = bud, 86400 = full bloom)
        
        Returns:
            led_colors: Array of 144 RGB tuples
        """
        # 1. Calculate growth stage (0.0 = bud, 1.0 = full bloom)
        growth = self.calculate_growth(time_seconds)
        
        # 2. Generate petal positions (parametric curves)
        petals = self.generate_petals(growth)
        
        # 3. Calculate lighting (simulate sunlight)
        lighting = self.calculate_lighting(time_seconds)
        
        # 4. Render to LED strip (3D → 2D projection)
        led_colors = self.render_to_leds(petals, lighting)
        
        return led_colors
    
    def generate_petals(self, growth):
        """Generate petal geometry using parametric equations"""
        petals = []
        petal_count = self.params['petal_count']
        
        for i in range(petal_count):
            angle = (360 / petal_count) * i
            
            # Rose petal shape (parametric curve)
            # x = a * cos(t) * (1 + 0.5 * cos(n*t))
            # y = a * sin(t) * (1 + 0.5 * cos(n*t))
            petal = {
                'angle': angle,
                'radius': self.params['petal_size'] * growth,
                'curl': self.params['curl_factor'] * (1 - growth),
                'color': self.interpolate_color(
                    self.params['bud_color'],
                    self.params['bloom_color'],
                    growth
                )
            }
            petals.append(petal)
        
        return petals
    
    def calculate_lighting(self, time_seconds):
        """Simulate natural sunlight cycle"""
        hour = (time_seconds % 86400) / 3600  # 0-24 hours
        
        # Brightness follows sine curve (sunrise to sunset)
        brightness = max(0, math.sin((hour - 6) * math.pi / 12))
        
        # Color temperature (cool morning, warm afternoon)
        if hour < 12:
            color_temp = 6500 + (hour / 12) * 1500  # 6500K → 8000K
        else:
            color_temp = 8000 - ((hour - 12) / 12) * 2500  # 8000K → 5500K
        
        return {
            'brightness': brightness,
            'color_temp': color_temp
        }
```

### Real-Time Rendering

```cpp
// ESP32-S3 firmware - 60 FPS rendering
void render_flower() {
    unsigned long current_time = millis();
    float growth = calculate_growth_stage(current_time);
    
    // Generate 144 LED colors
    for (int i = 0; i < 144; i++) {
        // Map LED index to 3D space
        Vector3 led_position = led_positions[i];
        
        // Calculate petal coverage at this LED
        float petal_intensity = 0.0;
        Color petal_color = {0, 0, 0};
        
        for (int p = 0; p < petal_count; p++) {
            Petal petal = generate_petal(p, growth);
            
            // Distance from LED to petal center
            float distance = led_position.distance_to(petal.position);
            
            // Gaussian falloff
            float influence = exp(-distance * distance / petal.radius);
            
            if (influence > petal_intensity) {
                petal_intensity = influence;
                petal_color = petal.color;
            }
        }
        
        // Apply lighting
        petal_color = apply_lighting(petal_color, ambient_light);
        
        // Set LED color
        leds[i] = petal_color;
    }
    
    // Update LED strip (WS2812B protocol)
    FastLED.show();
}
```

---

## Touch Interaction

### Capacitive Touch Sensors

**Configuration:** 12 touch pads around enclosure perimeter

```
Top View - Touch Sensor Layout:

    ┌─────────────────────────────────────┐
    │  [T0]  [T1]  [T2]  [T3]  [T4]      │
    │   │                           │     │
    │ [T11]                       [T5]    │
    │   │                           │     │
    │ [T10]      HFLO Display     [T6]    │
    │   │                           │     │
    │  [T9]  [T8]  [T7]            │     │
    └─────────────────────────────────────┘

Each sensor: 20mm × 20mm copper pad
Sensitivity: Detects touch through 5mm bamboo enclosure
```

### Touch Response Animations

```cpp
// Touch event handler
void on_touch(int sensor_id) {
    // Flower reacts to touch location
    float touch_angle = (sensor_id / 12.0) * 360.0;
    
    // Petals near touch point "shy away"
    for (int i = 0; i < petal_count; i++) {
        Petal& petal = petals[i];
        
        // Calculate angular distance from touch
        float angle_diff = abs(petal.angle - touch_angle);
        if (angle_diff > 180) angle_diff = 360 - angle_diff;
        
        // Apply repulsion force (inverse distance)
        if (angle_diff < 60) {
            float force = (60 - angle_diff) / 60.0;
            petal.curl += force * 0.3;  // Curl away
            petal.brightness *= (1 - force * 0.5);  // Dim
        }
    }
    
    // Play haptic feedback (vibration motor)
    vibrate(50);  // 50ms pulse
}
```

---

## Power Management

### Energy Budget

**Daily Energy Balance (Indoor):**

```
Energy Production (Quantum Dot Solar):
- Panel size: 30cm × 40cm = 0.12 m²
- Efficiency: 30%
- Indoor light intensity: 500 lux ≈ 15 W/m²
- Power output: 0.12 m² × 15 W/m² × 0.30 = 0.54W
- Daily production (8h): 0.54W × 8h = 4.3 Wh/day

Energy Consumption:
- LED display (4h/day): 12W × 4h = 48 Wh
- ESP32-S3 (24h/day): 0.5W × 24h = 12 Wh
- Touch sensors (24h): 0.1W × 24h = 2.4 Wh
- Total consumption: 62.4 Wh/day

Battery (LiFePO4 100Wh):
- Net deficit (indoor): 62.4 - 4.3 = 58.1 Wh/day
- Autonomy: 100 Wh / 58.1 Wh/day = 1.7 days

WITH OUTDOOR SUNLIGHT (2h/day):
- Outdoor intensity: 1000 W/m² (direct sun)
- Power output: 0.12 m² × 1000 W/m² × 0.30 = 36W
- Daily production: (0.54W × 6h) + (36W × 2h) = 75.2 Wh
- Net surplus: 75.2 - 62.4 = 12.8 Wh/day
- Result: Self-sustaining ✅
```

### Adaptive Power Management

```cpp
// Battery-aware power optimization
void manage_power() {
    float battery_percent = read_battery_level();
    
    if (battery_percent < 20) {
        // Low power mode
        set_led_brightness(0.3);  // 30% brightness
        set_frame_rate(15);       // 15 FPS (vs. 60 FPS)
        disable_touch_sensors();
        set_animation_speed(0.5); // Slow motion
    }
    else if (battery_percent < 50) {
        // Balanced mode
        set_led_brightness(0.6);
        set_frame_rate(30);
        enable_touch_sensors();
    }
    else {
        // Performance mode
        set_led_brightness(1.0);  // 100% brightness
        set_frame_rate(60);       // Smooth 60 FPS
        enable_all_features();
    }
}
```

---

## Manufacturing

### Assembly Process (Foxconn)

**Step 1: Enclosure Preparation**
- CNC machining (bamboo or aluminum)
- Touch sensor copper pads bonded to interior
- Solar panel mounted to top surface

**Step 2: Electronics Assembly**
- ESP32-S3 controller board (SMT assembly)
- LiFePO4 battery installation
- LED strip mounting (adhesive backing)
- Wiring harness (all connections)

**Step 3: Optical Assembly**
- 45° glass mounting (precision angle jig)
- Anti-reflective coating inspection
- LED alignment test (hologram quality check)

**Step 4: Calibration**
- Touch sensor sensitivity tuning
- LED color calibration (spectrophotometer)
- Solar panel output verification
- Battery charge test (3 cycles)

**Step 5: Quality Control**
- Hologram quality inspection (human visual test)
- Touch responsiveness test (all 12 sensors)
- Battery autonomy test (7-day simulation)
- Drop test (30cm drop, 5 times)
- Final QC (cosmetic inspection)

**Assembly Time:** 12 minutes/unit  
**Yield:** 94% (6% defect rate)

---

## Conclusion

HFLO's holographic display combines **Pepper's Ghost optics**, **addressable RGB LEDs**, **procedural flower generation**, and **solar power** to create a **self-sustaining living art piece** with **15+ year lifespan** and **zero maintenance**.

**Next:** [API Documentation](./03-api-documentation.md)

---

**© 2025 HFLO Inc. All rights reserved.**
