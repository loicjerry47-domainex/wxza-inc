# LENSSTORM - Holographic Display System
## Nano-Diffractive Waveguide Architecture

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 50 minutes

---

## Executive Summary

LENSSTORM's **holographic waveguide display** uses **nano-diffractive gratings** (sub-wavelength precision) to achieve **1.8mm lens thickness**, **60° field of view**, and **1920×1080 resolution per eye**. This document details the optical physics, waveguide design, RGB laser projection, rendering pipeline, and manufacturing process for the world's thinnest AR display.

---

## Table of Contents

1. [Waveguide Physics](#1-waveguide-physics)
2. [Nano-Diffractive Gratings](#2-nano-diffractive-gratings)
3. [RGB Laser Projection](#3-rgb-laser-projection)
4. [Display Rendering Pipeline](#4-display-rendering-pipeline)
5. [Optical Calibration](#5-optical-calibration)
6. [Manufacturing Process](#6-manufacturing-process)

---

## 1. Waveguide Physics

### 1.1 Total Internal Reflection (TIR)

**Principle:** Light trapped inside high-refractive-index glass by TIR

```
Critical Angle Calculation:
θc = arcsin(n₂/n₁)

where:
n₁ = 1.8 (high-index glass)
n₂ = 1.0 (air)
θc = arcsin(1.0/1.8) = 33.7°

Any light incident at >33.7° reflects internally
```

**Light Path:**
```
                Diffraction Grating (Input Coupler)
                         │
    RGB Laser ─────────▶ │ ◀─ Light enters at 45°
                         │
        ┌────────────────┼────────────────┐
        │                                  │
        │     Waveguide (n=1.8)           │
        │                                  │
        │    ◀─────── TIR ───────▶        │  ← Multiple reflections
        │                                  │
        │             │                    │
        │             ▼                    │
        │     Exit Pupil Expander         │
        └──────────────┬──────────────────┘
                       │
                   User's Eye

Real World Light ──────▶ Passes through (85% transmission) ──▶ User's Eye
```

### 1.2 Waveguide Layers (RGB Separation)

**3-Layer Stack:**
```
Top Layer (Red - 638nm)
    ┌───────────────────────────────┐
    │  Diffractive grating for 638nm│  ← 0.6mm
    └───────────────────────────────┘

Middle Layer (Green - 520nm)
    ┌───────────────────────────────┐
    │  Diffractive grating for 520nm│  ← 0.6mm
    └───────────────────────────────┘

Bottom Layer (Blue - 450nm)
    ┌───────────────────────────────┐
    │  Diffractive grating for 450nm│  ← 0.6mm
    └───────────────────────────────┘

Total Thickness: 1.8mm (vs. 3-5mm competitors)
```

**Why 3 Layers?**
- Each wavelength requires different grating period
- Red: 354nm grating period
- Green: 289nm grating period
- Blue: 250nm grating period
- Stacking allows independent optimization per color

### 1.3 Field of View (FOV) Expansion

**Exit Pupil Expansion:**
```
Input Coupler        Exit Pupil Expander
     │                    │
     ▼                    ▼
     ┃                 ┃┃┃┃┃┃┃┃  ← Multiple exit points
   Single           Replicated beams
   beam              (8mm × 8mm eye box)

Without expander: 2mm eye box (hard to align)
With expander: 8mm eye box (comfortable viewing)
```

**FOV Calculation:**
```
FOV = 2 × arctan(d / (2 × f))

where:
d = display size (projected image)
f = focal distance

For 60° diagonal FOV:
Horizontal: 50° (covers 45mm lens width)
Vertical: 35° (covers 40mm lens height)
```

---

## 2. Nano-Diffractive Gratings

### 2.1 Grating Design

**Diffraction Equation:**
```
n₁ sin(θ₁) - n₂ sin(θ₂) = m × λ / Λ

where:
n₁ = refractive index (input medium)
n₂ = refractive index (output medium)
θ₁ = incident angle
θ₂ = diffracted angle
m = diffraction order (±1, ±2, ...)
λ = wavelength (red: 638nm, green: 520nm, blue: 450nm)
Λ = grating period

For Red (638nm):
Λ = λ / (n₁ sin(θ₁) - n₂ sin(θ₂))
Λ = 638nm / (1.8 × sin(45°) - 1.0 × sin(0°))
Λ = 638nm / 1.27
Λ = 502nm
```

**Grating Geometry:**
```
Cross-Section View:

     ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲   ← Sawtooth profile (blazed grating)
    ╱│╱│╱│╱│╱│╱│╱│╱│
   ╱ │╱ │╱ │╱ │╱ │╱ │╱ │
  ╱__│╱__│╱__│╱__│╱__│╱__│╱__│
  ───┴───┴───┴───┴───┴───┴───  ← Substrate

Period (Λ): 250-354nm (sub-wavelength)
Depth: 180-250nm
Blaze Angle: 42°
Duty Cycle: 50% (equal ridge/groove width)
```

### 2.2 Efficiency Optimization

**Diffraction Efficiency:**
```
η = (sin(π × Δn × d / λ) / (π × Δn × d / λ))²

where:
Δn = refractive index modulation (0.15)
d = grating depth (200nm)
λ = wavelength (638nm, 520nm, 450nm)

For Red (638nm):
η = (sin(π × 0.15 × 200 / 638) / (π × 0.15 × 200 / 638))²
η = 0.82 (82% efficiency)

For Green (520nm):
η = 0.78 (78% efficiency)

For Blue (450nm):
η = 0.72 (72% efficiency)

Average Efficiency: 77%
```

**Multi-Layer Efficiency:**
```
Total Efficiency = η_red × η_green × η_blue × T_substrate

where:
η_red = 0.82
η_green = 0.78
η_blue = 0.72
T_substrate = 0.95 (substrate transmission)

Total = 0.82 × 0.78 × 0.72 × 0.95
Total = 0.42 (42% laser light reaches eye)
```

### 2.3 Grating Fabrication

**Nano-Imprint Lithography (NIL):**

**Step 1: Master Grating Creation (E-Beam Lithography)**
```
1. Spin-coat photoresist (100nm) on silicon wafer
2. E-beam exposure (pattern 250-354nm gratings)
3. Develop photoresist (remove exposed areas)
4. Reactive ion etching (transfer pattern to silicon)
5. Result: Master grating template
```

**Step 2: NIL Replication**
```
1. Apply UV-curable polymer to glass substrate
2. Press master grating template into polymer
3. UV exposure (cure polymer)
4. Demold template
5. Result: Replicated grating on glass substrate

Throughput: 100 wafers/hour (vs. 1 wafer/hour for e-beam)
Cost: $5/wafer (vs. $500/wafer for direct e-beam)
```

---

## 3. RGB Laser Projection

### 3.1 Laser Diode Specifications

| Parameter | Red | Green | Blue |
|-----------|-----|-------|------|
| **Wavelength** | 638nm | 520nm | 450nm |
| **Power** | 15mW | 25mW | 10mW |
| **Beam Divergence** | 0.8° | 1.0° | 1.2° |
| **Modulation Bandwidth** | 500 MHz | 400 MHz | 300 MHz |
| **Lifetime** | 100,000h | 80,000h | 60,000h |
| **Temperature Stability** | ±0.2nm/°C | ±0.3nm/°C | ±0.4nm/°C |

**Beam Combining:**
```
Red Laser ──────┐
                │
Green Laser ────┼───▶ Dichroic Mirrors ───▶ Combined RGB Beam
                │
Blue Laser ─────┘

Dichroic Mirror Properties:
- Red: Reflects 638nm, transmits 520nm/450nm
- Green: Reflects 520nm, transmits 450nm
- Alignment precision: <5 arc-seconds
```

### 3.2 MEMS Scanner

**Micro-Electromechanical Systems (MEMS) Mirror:**

**Specifications:**
- **Mirror Size:** 1.5mm × 1.5mm
- **Material:** Silicon with aluminum coating
- **Actuation:** Electrostatic (comb-drive)
- **Scan Angle:** ±15° (horizontal), ±10° (vertical)
- **Scan Frequency:** 90 Hz (vertical), 1920 Hz (horizontal)
- **Response Time:** <50 μs
- **Flatness:** λ/10 (63.8nm for red laser)

**Scan Pattern (Raster):**
```
Horizontal Scan (1920 Hz):
├──────────────────────────▶  Line 1
◀──────────────────────────┤  Line 2 (bidirectional)
├──────────────────────────▶  Line 3
◀──────────────────────────┤  Line 4
...
├──────────────────────────▶  Line 1080

Vertical Scan (90 Hz):
Entire frame repeats 90 times/second

Total Scan Time per Frame: 11.1ms (90 Hz)
```

### 3.3 Laser Modulation

**Pixel-by-Pixel Intensity Control:**
```python
# Laser modulation algorithm
def modulate_laser(pixel_value, color_channel):
    """
    Convert pixel value (0-255) to laser power (0-100%)
    
    Args:
        pixel_value: 8-bit RGB value (0-255)
        color_channel: 'red', 'green', or 'blue'
    
    Returns:
        laser_power: Percentage (0-100%)
    """
    
    # Gamma correction (2.2)
    gamma = 2.2
    normalized = pixel_value / 255.0
    gamma_corrected = normalized ** gamma
    
    # Color calibration (compensate for waveguide efficiency)
    efficiency = {
        'red': 0.82,
        'green': 0.78,
        'blue': 0.72
    }
    calibrated = gamma_corrected / efficiency[color_channel]
    
    # Clamp to 0-100%
    laser_power = min(calibrated * 100, 100)
    
    return laser_power

# Example: Display white pixel (255, 255, 255)
red_power = modulate_laser(255, 'red')      # 100%
green_power = modulate_laser(255, 'green')  # 100%
blue_power = modulate_laser(255, 'blue')    # 100%
```

**Modulation Speed:**
```
Pixel Rate = 1920 × 1080 × 90 Hz
           = 186,624,000 pixels/second
           = 186.6 Megapixels/second

Modulation Period = 1 / 186.6 MHz
                  = 5.36 nanoseconds/pixel

Laser Bandwidth Required: >300 MHz (achieved ✅)
```

---

## 4. Display Rendering Pipeline

### 4.1 Rendering Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                             │
│  Unity/Unreal Engine → Scene Graph → 3D Objects                 │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SPATIAL COMPUTING LAYER                        │
│  • Head Tracking (IMU + SLAM)                                   │
│  • Spatial Anchors (persist AR objects in real-world coords)    │
│  • Plane Detection (walls, floors, tables)                      │
│  • Occlusion (AR objects hidden behind real objects)            │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GRAPHICS RENDERING                            │
│  • GPU Rendering (Vulkan 1.3)                                   │
│  • Stereoscopic (separate left/right eye images)                │
│  • Timewarp (compensate for head motion during rendering)       │
│  • Chromatic Aberration Correction                              │
│  • Distortion Correction (waveguide optical distortion)         │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  DISPLAY INTERFACE                               │
│  • Frame Buffer (1920×1080 per eye, 90 Hz)                     │
│  • Color Calibration (per-device calibration)                   │
│  • Brightness Adjustment (adaptive 100-3000 nits)               │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    LASER DRIVER                                  │
│  • RGB Laser Modulation (pixel-by-pixel)                        │
│  • MEMS Scanner Control (raster scan pattern)                   │
│  • Synchronization (laser timing + scanner position)            │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  WAVEGUIDE OPTICS                                │
│  • Input Coupler (laser → waveguide)                            │
│  • TIR Propagation (light trapped in waveguide)                 │
│  • Exit Pupil Expander (8mm × 8mm eye box)                      │
│  • Output Coupler (waveguide → user's eye)                      │
└──────────────────────────────────────────────────────────────────┘
```

### 4.2 Motion-to-Photon Latency

**Target:** <15ms (industry-leading for comfort)

**Latency Breakdown:**
| Stage | Time | Optimization |
|-------|------|-------------|
| **IMU Sampling** | 1ms | 1000 Hz polling |
| **Head Pose Estimation** | 2ms | Hardware-accelerated |
| **Application Rendering** | 5ms | GPU optimization |
| **Timewarp** | 1ms | Last-millisecond rotation correction |
| **Display Interface** | 2ms | Direct memory access (DMA) |
| **Laser Modulation** | 1ms | Hardware PWM |
| **MEMS Scanner** | 3ms | Inertial lag compensation |
| **Total** | **15ms** | ✅ Target achieved |

**Timewarp Algorithm:**
```python
def timewarp(rendered_frame, old_pose, new_pose):
    """
    Re-project rendered frame using updated head pose
    Compensates for head motion during rendering
    
    Args:
        rendered_frame: GPU texture (1920×1080)
        old_pose: Head pose at render start
        new_pose: Head pose at display time
    
    Returns:
        timewarped_frame: Re-projected texture
    """
    
    # Calculate rotation delta
    rotation_delta = new_pose.rotation - old_pose.rotation
    
    # Generate rotation matrix
    rotation_matrix = quaternion_to_matrix(rotation_delta)
    
    # Re-project each pixel (GPU shader)
    timewarped_frame = gpu_reproject(
        rendered_frame,
        rotation_matrix,
        fov=60  # degrees
    )
    
    return timewarped_frame

# Reduces latency by ~3ms (compensates for render time)
```

### 4.3 Chromatic Aberration Correction

**Problem:** Different wavelengths refract differently in waveguide

**Solution:** Pre-distort image (GPU shader)

```glsl
// Fragment shader for chromatic aberration correction
#version 450

layout(binding = 0) uniform sampler2D inputTexture;
layout(location = 0) in vec2 texCoord;
layout(location = 0) out vec4 fragColor;

// Waveguide chromatic aberration coefficients (measured)
const vec2 redOffset = vec2(0.002, 0.001);    // 638nm
const vec2 greenOffset = vec2(0.0, 0.0);      // 520nm (reference)
const vec2 blueOffset = vec2(-0.003, -0.002); // 450nm

void main() {
    // Sample each color channel with offset
    float r = texture(inputTexture, texCoord + redOffset).r;
    float g = texture(inputTexture, texCoord + greenOffset).g;
    float b = texture(inputTexture, texCoord + blueOffset).b;
    
    fragColor = vec4(r, g, b, 1.0);
}
```

---

## 5. Optical Calibration

### 5.1 Per-Device Calibration

**Factory Calibration (Automated):**

**Step 1: Color Calibration**
```python
# Measure color output vs. input
def calibrate_color(device_id):
    """
    Calibrate RGB laser output to match sRGB standard
    """
    # Display color patches (red, green, blue, white, black)
    test_colors = [(255,0,0), (0,255,0), (0,0,255), (255,255,255), (0,0,0)]
    
    # Measure output with spectrophotometer
    measured_colors = []
    for color in test_colors:
        display_color(color)
        measured = spectrophotometer.measure()
        measured_colors.append(measured)
    
    # Compute calibration matrix (3×3)
    calibration_matrix = compute_matrix(test_colors, measured_colors)
    
    # Store in device EEPROM
    device.write_calibration(calibration_matrix)
    
    return calibration_matrix

# Example calibration matrix:
# [[1.02, -0.01, 0.00],   ← Red adjustment
#  [0.01,  0.98, -0.02],  ← Green adjustment
#  [-0.01, 0.03, 1.05]]   ← Blue adjustment
```

**Step 2: Geometric Calibration**
```python
# Correct optical distortion
def calibrate_geometry(device_id):
    """
    Measure and correct waveguide optical distortion
    """
    # Display grid pattern (10×10 dots)
    display_grid(rows=10, cols=10)
    
    # Capture with calibration camera
    captured_image = calibration_camera.capture()
    
    # Detect grid points
    detected_points = detect_grid_points(captured_image)
    
    # Expected vs. actual positions
    expected_points = generate_ideal_grid(rows=10, cols=10)
    distortion_map = compute_distortion(expected_points, detected_points)
    
    # Generate correction LUT (lookup table)
    correction_lut = invert_distortion(distortion_map)
    
    # Store in device EEPROM
    device.write_distortion_lut(correction_lut)
    
    return correction_lut
```

**Step 3: Brightness Uniformity**
```python
# Correct brightness non-uniformity
def calibrate_brightness(device_id):
    """
    Ensure uniform brightness across FOV
    """
    # Display white screen (255, 255, 255)
    display_white()
    
    # Measure brightness at 100 points across FOV
    brightness_map = []
    for x in range(10):
        for y in range(10):
            position = (x * 192, y * 108)  # 10×10 grid
            brightness = luminance_meter.measure(position)
            brightness_map.append(brightness)
    
    # Normalize to average
    avg_brightness = np.mean(brightness_map)
    correction_factors = avg_brightness / np.array(brightness_map)
    
    # Generate correction LUT
    brightness_lut = generate_2d_lut(correction_factors)
    
    # Store in device EEPROM
    device.write_brightness_lut(brightness_lut)
    
    return brightness_lut
```

### 5.2 User Calibration (IPD Adjustment)

**Inter-Pupillary Distance (IPD):**
```python
# Adjust display for user's IPD (58-72mm range)
def adjust_ipd(user_ipd_mm):
    """
    Adjust display separation for user's eye spacing
    
    Args:
        user_ipd_mm: User's IPD in millimeters (58-72mm)
    """
    # Default IPD: 63mm (average adult)
    default_ipd = 63.0
    
    # Calculate optical center shift
    shift_mm = (user_ipd_mm - default_ipd) / 2
    
    # Convert to pixel offset
    # FOV: 50° horizontal, Display: 1920 pixels
    # 1° = 1920 / 50 = 38.4 pixels/degree
    # 1mm IPD shift ≈ 0.5° FOV shift ≈ 19.2 pixels
    pixel_shift = shift_mm * 19.2
    
    # Update display offset (left eye: -shift, right eye: +shift)
    left_eye_offset = -pixel_shift
    right_eye_offset = +pixel_shift
    
    # Apply to rendering pipeline
    renderer.set_eye_offsets(left_eye_offset, right_eye_offset)
    
    return (left_eye_offset, right_eye_offset)

# Example: User IPD = 68mm
# shift = (68 - 63) / 2 = 2.5mm
# pixel_shift = 2.5 * 19.2 = 48 pixels
# Left eye: -48 pixels, Right eye: +48 pixels
```

---

## 6. Manufacturing Process

### 6.1 Waveguide Production (DigiLens)

**Step 1: Substrate Preparation**
```
Input: 300mm glass wafer (high-refractive-index, n=1.8)

Process:
1. Wafer cleaning (RCA clean: NH₄OH + H₂O₂, then HCl + H₂O₂)
2. Surface inspection (particles <0.1μm)
3. Metrology (thickness variation <50nm across wafer)

Output: Clean, uniform glass substrate
```

**Step 2: Nano-Imprint Lithography (NIL)**
```
Input: Clean wafer + Master grating template

Process:
1. Spin-coat UV-curable polymer (100nm thick)
2. Align master template (±50nm accuracy)
3. Press template into polymer (500 psi, 30 seconds)
4. UV exposure (365nm wavelength, 10 seconds)
5. Demold template

Output: Grating pattern replicated on wafer

Throughput: 100 wafers/hour
Yield: 92% (8% defect rate due to particles, alignment)
```

**Step 3: Layer Stacking**
```
Input: 3 patterned wafers (Red, Green, Blue gratings)

Process:
1. Apply optical adhesive (UV-curable, n=1.52)
2. Align layers (±0.5μm accuracy)
3. Bond layers under vacuum (no bubbles)
4. UV cure adhesive (365nm, 60 seconds)

Output: 3-layer waveguide stack (1.8mm total thickness)

Alignment Precision: 0.5μm (critical for color alignment)
```

**Step 4: Precision Cutting**
```
Input: 300mm bonded wafer

Process:
1. Diamond scribe (cut lines every 50mm × 40mm)
2. Controlled cleaving (mechanical stress)
3. Edge polishing (sub-nm roughness)

Output: Individual waveguide lenses (50mm × 40mm)

Yield: 80% (20% loss due to edge defects, cleaving cracks)
```

**Step 5: Anti-Reflective Coating**
```
Input: Cut waveguide lenses

Process:
1. Vacuum deposition (multi-layer coating)
   - Layer 1: SiO₂ (80nm)
   - Layer 2: TiO₂ (45nm)
   - Layer 3: SiO₂ (90nm)
   - Layer 4: TiO₂ (50nm)
2. Annealing (300°C, 2 hours)

Output: AR-coated waveguide (transmission >95%)

Coating Uniformity: ±2nm across lens
```

**Step 6: Quality Control**
```
Tests:
1. Optical transmission (>85% for real-world view)
2. Diffraction efficiency (>75% for laser light)
3. FOV uniformity (brightness variation <10%)
4. Color accuracy (ΔE <3)
5. Defect inspection (particles, scratches, bubbles)

Pass Rate: 85% (15% rejected for optical defects)

Final Yield: 0.92 × 0.80 × 0.85 = 63%
(NIL × Cutting × QC)

Output: Production-ready waveguide lenses
```

### 6.2 Production Capacity

| Facility | Location | Capacity (Pairs/Year) | Status |
|----------|----------|---------------------|--------|
| **DigiLens Fab 1** | San Jose, CA | 2M | Operating |
| **DigiLens Fab 2** | Sunnyvale, CA | 5M | Operating |
| **DigiLens Fab 3** | Austin, TX | 8M | Planned (2026 Q3) |
| **Total** | - | **15M** | - |

**2026 Production Forecast:**
- Q1: 300K pairs (soft launch)
- Q2: 600K pairs (public launch)
- Q3: 900K pairs (ramp-up)
- Q4: 1.2M pairs (holiday season)
- **Total:** 3M pairs (supports 1.25M units with 40% yield buffer)

---

## Conclusion

LENSSTORM's holographic waveguide display achieves **1.8mm thickness**, **60° FOV**, **1920×1080 resolution**, and **42% optical efficiency** through **nano-diffractive gratings** (250-354nm period), **RGB laser projection** (638nm/520nm/450nm), and **precision manufacturing** (63% yield), delivering the world's thinnest, most advanced AR eyewear display.

**Next:** [API Documentation](./03-api-documentation.md)

---

**© 2025 LENSSTORM Inc. All rights reserved.**
