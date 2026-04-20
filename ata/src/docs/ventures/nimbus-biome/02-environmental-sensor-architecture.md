# NIMBUS BIOME - Environmental Sensor Architecture
## IoT Mesh Network, Telemetry Systems & Edge Computing

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Technical Architecture  
**Reading Time:** 45 minutes

---

## Executive Summary

NIMBUS BIOME's **Environmental Sensor Architecture** is the foundation of our climate-responsive platform, deploying **50,000+ wireless sensors per building** across 12 environmental categories. This dense IoT mesh network captures **100 million+ data points per hour** with **1-second sampling frequency** in critical zones, enabling unprecedented insights into building performance and occupant comfort.

### Architecture Highlights

| Specification | Value |
|---------------|-------|
| **Sensors per Building** | 50,000+ (enterprise deployment) |
| **Sensor Categories** | 12 (air quality, energy, occupancy, weather, etc.) |
| **Sampling Frequency** | 1 second (critical), 1 minute (general) |
| **Network Protocol** | LoRaWAN (primary), 2.4GHz mesh (secondary) |
| **Edge Computing** | AWS IoT Greengrass (2,500 edge nodes deployed) |
| **Data Throughput** | 100M+ data points/hour |
| **Uptime** | 99.97% (sensor network availability) |
| **Battery Life** | 5 years (wireless sensors) |
| **Latency** | <100ms (sensor → cloud) |

---

## Table of Contents

1. [Sensor Network Overview](#sensor-network-overview)
2. [Sensor Types & Specifications](#sensor-types--specifications)
3. [Network Topology & Protocols](#network-topology--protocols)
4. [Edge Computing Architecture](#edge-computing-architecture)
5. [Data Pipeline & Processing](#data-pipeline--processing)
6. [Power Management](#power-management)
7. [Deployment & Installation](#deployment--installation)
8. [Maintenance & Calibration](#maintenance--calibration)
9. [Security & Privacy](#security--privacy)
10. [Performance Metrics](#performance-metrics)

---

## 1. Sensor Network Overview

### 1.1 Design Philosophy

**Density over Precision**: Deploy 10× more sensors at lower cost rather than fewer high-precision sensors.

**Key Principles**:
- ✅ **Redundancy**: Multiple sensors per zone (fault tolerance)
- ✅ **Heterogeneity**: Mix sensor types for cross-validation
- ✅ **Adaptivity**: Dynamic sampling rates based on activity
- ✅ **Scalability**: Mesh network auto-expands with building growth
- ✅ **Privacy**: No cameras in private spaces, thermal imaging only

### 1.2 Deployment Density

**Sensor Placement Strategy**:

```
┌─────────────────────────────────────────────────────────────────┐
│  TYPICAL OFFICE FLOOR (20,000 sq ft)                            │
│                                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │ Zone 1 │  │ Zone 2 │  │ Zone 3 │  │ Zone 4 │  │ Zone 5 │   │
│  │ 40 sens│  │ 40 sens│  │ 40 sens│  │ 40 sens│  │ 40 sens│   │
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘   │
│                                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │ Zone 6 │  │ Zone 7 │  │ Zone 8 │  │ Zone 9 │  │ Zone 10│   │
│  │ 40 sens│  │ 40 sens│  │ 40 sens│  │ 40 sens│  │ 40 sens│   │
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘   │
│                                                                  │
│  Total: 400 sensors per floor × 50 floors = 20,000 sensors     │
│  + Common areas (5,000) + HVAC equipment (2,000) = 27,000      │
│  + Exterior (weather stations, facade sensors) = 3,000         │
│  ────────────────────────────────────────────────────────────  │
│  Grand Total: ~30,000 sensors (typical 50-story office tower)  │
└─────────────────────────────────────────────────────────────────┘
```

**Per-Zone Sensor Mix** (40 sensors per 2,000 sq ft zone):
- 8× Air quality sensors (CO₂, VOC, PM2.5, temp, humidity)
- 12× Occupancy sensors (thermal, ultrasonic, CO₂-based)
- 8× Light level sensors (desk-level, window-adjacent)
- 4× Energy meters (zone-level consumption)
- 4× Acoustic sensors (noise level, speech privacy)
- 2× Vibration sensors (structural health monitoring)
- 2× Gateway nodes (LoRaWAN aggregation)

---

## 2. Sensor Types & Specifications

### 2.1 Air Quality Sensors

#### **Particulate Matter (PM2.5, PM10)**

**Technology**: Laser scattering  
**Model**: Plantower PMS5003  
**Cost**: $12/unit  

**Specifications**:
- Range: 0-500 μg/m³
- Resolution: 1 μg/m³
- Accuracy: ±10% @ 25°C
- Response time: <10 seconds
- Sampling: 1 minute intervals

**Deployment**:
- 1 sensor per 500 sq ft (indoor)
- Near HVAC returns
- Avoid direct airflow

**Thresholds**:
```python
PM25_THRESHOLDS = {
    'good': 0-12,      # μg/m³ (AQI 0-50)
    'moderate': 12-35, # μg/m³ (AQI 51-100)
    'unhealthy_sensitive': 35-55, # (AQI 101-150)
    'unhealthy': 55-150, # (AQI 151-200)
    'very_unhealthy': 150-250, # (AQI 201-300)
    'hazardous': 250+ # (AQI 301+)
}
```

#### **CO₂ Concentration**

**Technology**: NDIR (Non-Dispersive Infrared)  
**Model**: Sensirion SCD41  
**Cost**: $45/unit  

**Specifications**:
- Range: 400-5,000 ppm
- Accuracy: ±(40 ppm + 5% of reading)
- Resolution: 1 ppm
- Response time: 60 seconds
- Self-calibration: 7-day automatic baseline
- Sampling: 1 second (critical zones), 1 minute (general)

**Deployment**:
- 1 sensor per 250 sq ft (breathing zone height: 4-6 ft)
- Conference rooms: 2× density
- Near occupancy sensors (data fusion)

**Occupancy Correlation**:
```python
def estimate_occupancy_from_co2(co2_ppm, baseline_ppm=420):
    """
    Estimate room occupancy from CO₂ levels
    Based on CO₂ generation rate: ~0.3 L/min per person
    """
    if co2_ppm <= baseline_ppm + 50:
        return 0  # Likely unoccupied
    
    # Simplified model (actual uses room volume, ventilation rate)
    co2_delta = co2_ppm - baseline_ppm
    estimated_people = co2_delta / 100  # ~100 ppm per person (rough)
    
    return max(0, estimated_people)
```

**Thresholds**:
- **Good**: <600 ppm (cognitive performance optimal)
- **Acceptable**: 600-800 ppm (ASHRAE standard)
- **Moderate**: 800-1000 ppm (drowsiness risk)
- **Poor**: 1000-1500 ppm (increase ventilation)
- **Critical**: >1500 ppm (immediate action)

#### **Volatile Organic Compounds (VOCs)**

**Technology**: Metal oxide semiconductor  
**Model**: Bosch BME680  
**Cost**: $18/unit  

**Specifications**:
- Range: 0-500 ppb (equivalent)
- Output: IAQ index (0-500)
- Accuracy: Qualitative (not quantitative)
- Response time: 30 seconds
- Sampling: 1 minute intervals

**Common VOC Sources**:
- Cleaning products
- Paints, adhesives
- Furniture off-gassing
- Printers, copiers
- Human bioeffluents

#### **Temperature & Humidity**

**Technology**: Capacitive humidity sensor + thermistor  
**Model**: Sensirion SHT31  
**Cost**: $8/unit  

**Specifications**:
| Parameter | Specification |
|-----------|--------------|
| **Temperature** | |
| Range | -40°C to +125°C |
| Accuracy | ±0.2°C (0-65°C) |
| Resolution | 0.01°C |
| **Humidity** | |
| Range | 0-100% RH |
| Accuracy | ±2% RH (20-80% RH) |
| Resolution | 0.01% RH |
| **Response Time** | <8 seconds |

**Comfort Zones** (ASHRAE 55):
```python
COMFORT_ZONES = {
    'winter': {
        'temp_range': (68, 76),  # °F
        'humidity_range': (30, 60)  # % RH
    },
    'summer': {
        'temp_range': (73, 79),  # °F
        'humidity_range': (30, 60)  # % RH
    }
}
```

---

### 2.2 Energy Monitoring Sensors

#### **Smart Electricity Meters**

**Technology**: Non-invasive current transformer (CT clamp)  
**Model**: IoTaWatt (open-source)  
**Cost**: $150/unit (14-channel)  

**Specifications**:
- Channels: 14× independent circuits
- Accuracy: ±2% (calibrated)
- Sampling: 2× per AC cycle (120 Hz)
- Data: kWh, kW, power factor, voltage, frequency
- Communication: WiFi (MQTT)

**Deployment**:
- Main panel: 1 meter per floor
- Sub-panels: Zone-level metering
- Major equipment: Dedicated CT clamps

**Metrics Calculated**:
```python
class EnergyMetrics:
    def __init__(self, voltage, current, power_factor):
        self.voltage = voltage  # Volts (RMS)
        self.current = current  # Amps (RMS)
        self.power_factor = power_factor  # 0-1
    
    @property
    def apparent_power(self):
        """VA (Volt-Amperes)"""
        return self.voltage * self.current
    
    @property
    def real_power(self):
        """Watts (useful power)"""
        return self.apparent_power * self.power_factor
    
    @property
    def reactive_power(self):
        """VAR (Volt-Ampere Reactive)"""
        return self.apparent_power * math.sqrt(1 - self.power_factor**2)
```

#### **Plug-Level Monitors**

**Technology**: Smart plugs with power metering  
**Model**: Shelly Plug S  
**Cost**: $15/unit  

**Use Cases**:
- Individual workstations
- Shared equipment (printers, coffee machines)
- Phantom load detection

---

### 2.3 Occupancy Detection Sensors

#### **Thermal Imaging (Privacy-Preserving)**

**Technology**: 8×8 thermopile array  
**Model**: Panasonic Grid-EYE (AMG8833)  
**Cost**: $35/unit  

**Specifications**:
- Resolution: 8×8 pixels (64 zones)
- Temperature range: 0°C to 80°C (humans: ~33-35°C)
- Field of view: 60° × 60°
- Accuracy: ±2.5°C
- Frame rate: 10 Hz
- Privacy: Cannot identify individuals (too low resolution)

**Occupancy Detection Algorithm**:
```python
import numpy as np

def detect_occupancy_thermal(thermal_grid, threshold_temp=28):
    """
    Detect human presence from 8×8 thermal grid
    Returns: (occupancy_count, heat_map)
    """
    # Thermal grid is 8×8 array of temperatures (°C)
    thermal_array = np.array(thermal_grid).reshape(8, 8)
    
    # Identify "hot spots" above threshold (likely humans)
    hot_spots = thermal_array > threshold_temp
    
    # Connected component analysis (group adjacent hot pixels)
    from scipy.ndimage import label
    labeled_array, num_features = label(hot_spots)
    
    # Filter out small blobs (noise)
    occupancy_count = 0
    for i in range(1, num_features + 1):
        blob_size = np.sum(labeled_array == i)
        if blob_size >= 2:  # Minimum 2 pixels = 1 person
            occupancy_count += 1
    
    return occupancy_count, thermal_array
```

**Deployment**:
- Ceiling-mounted (8-10 ft height)
- 1 sensor per 400 sq ft
- Overlapping coverage for accuracy

#### **Ultrasonic Sensors (Desk-Level)**

**Technology**: Ultrasonic range finder  
**Model**: Maxbotix MB1240  
**Cost**: $30/unit  

**Specifications**:
- Range: 20-765 cm
- Resolution: 1 cm
- Beam width: 10° cone
- Update rate: 10 Hz

**Use Cases**:
- Desk occupancy (person seated)
- Conference room seating
- Hot-desking management

**Detection Logic**:
```python
def is_desk_occupied(distance_cm, baseline_distance=200):
    """
    Detect if desk is occupied based on ultrasonic distance
    baseline_distance: Empty desk distance (cm)
    """
    OCCUPANCY_THRESHOLD = 50  # cm closer than empty desk
    
    if distance_cm < (baseline_distance - OCCUPANCY_THRESHOLD):
        return True  # Person present
    else:
        return False  # Desk empty
```

#### **Camera-Based (Anonymized)**

**Technology**: Edge AI camera with on-device processing  
**Model**: Google Coral Dev Board  
**Cost**: $150/unit  

**Specifications**:
- Resolution: 1080p
- Processing: On-device (Edge TPU)
- Output: Count only (no video stored)
- Privacy: GDPR-compliant (no PII)

**Computer Vision Pipeline**:
```python
import cv2
import tflite_runtime.interpreter as tflite

class OccupancyCounter:
    def __init__(self, model_path):
        # Load pre-trained person detection model (MobileNet SSD)
        self.interpreter = tflite.Interpreter(model_path)
        self.interpreter.allocate_tensors()
    
    def count_people(self, frame):
        """
        Count people in camera frame
        Returns: Integer count (no identities)
        """
        # Preprocess frame
        input_data = self.preprocess(frame)
        
        # Run inference
        self.interpreter.set_tensor(input_details[0]['index'], input_data)
        self.interpreter.invoke()
        
        # Get detections
        boxes = self.interpreter.get_tensor(output_details[0]['index'])
        classes = self.interpreter.get_tensor(output_details[1]['index'])
        scores = self.interpreter.get_tensor(output_details[2]['index'])
        
        # Count persons (class_id = 1) with confidence > 0.5
        person_count = np.sum(
            (classes == 1) & (scores > 0.5)
        )
        
        return int(person_count)
    
    # Note: Original frame discarded, only count retained
```

---

### 2.4 Weather Monitoring Sensors

#### **Roof-Mounted Weather Station**

**Model**: Davis Vantage Pro2  
**Cost**: $800/unit  

**Sensors Included**:
- Temperature (outdoor)
- Humidity
- Barometric pressure
- Wind speed & direction
- Rainfall
- Solar radiation
- UV index

**Deployment**:
- 1 station per building (roof-top)
- Unobstructed location (360° view)
- Maintenance: Quarterly cleaning

**Hyperlocal Forecasting**:
```python
def predict_local_weather(weather_history, building_thermal_mass):
    """
    Predict building-specific weather impact
    Combines global forecast + local microclimate + thermal lag
    """
    # Fetch global forecast (NOAA, Weather.gov API)
    global_forecast = fetch_noaa_forecast(lat, lon)
    
    # Adjust for local microclimate
    # (e.g., urban heat island, building orientation)
    microclimate_adjustment = calculate_microclimate_effect(
        building_location,
        nearby_buildings,
        surface_albedo
    )
    
    # Account for thermal mass (building takes time to respond)
    thermal_lag = calculate_thermal_response(
        building_thermal_mass,
        current_indoor_temp,
        predicted_outdoor_temp
    )
    
    # Combined prediction
    local_forecast = {
        'temperature': global_forecast['temp'] + microclimate_adjustment,
        'thermal_lag_hours': thermal_lag,
        'hvac_load_prediction': predict_hvac_load(...)
    }
    
    return local_forecast
```

---

## 3. Network Topology & Protocols

### 3.1 LoRaWAN Mesh Network (Primary)

**Why LoRaWAN?**
- ✅ Long range (2-5 km urban, 15 km rural)
- ✅ Low power (5-year battery life)
- ✅ License-free spectrum (868 MHz EU, 915 MHz US)
- ✅ Massive scalability (10,000+ devices per gateway)
- ✅ Standardized (LoRa Alliance)

**Network Architecture**:

```
┌─────────────────────────────────────────────────────────────────┐
│  BUILDING SENSORS (50,000 devices)                              │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │Sensor│  │Sensor│  │Sensor│  │Sensor│  │Sensor│  ...         │
│  └───┬──┘  └───┬──┘  └───┬──┘  └───┬──┘  └───┬──┘             │
│      │ LoRaWAN │        │         │         │                   │
│      └─────┬───┴────────┴─────────┴─────────┘                  │
│            │                                                     │
│  ┌─────────▼────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Gateway (Floor 1)│  │Gateway (Fl25)│  │Gateway (Fl50)│     │
│  │  500 sensors     │  │ 500 sensors  │  │ 500 sensors  │     │
│  └─────────┬────────┘  └──────┬───────┘  └──────┬───────┘     │
│            │ Ethernet/WiFi    │                  │              │
│            └──────────────────┴──────────────────┘              │
│                               │                                 │
│                    ┌──────────▼──────────┐                      │
│                    │  Network Server     │                      │
│                    │  (On-Premises)      │                      │
│                    └──────────┬──────────┘                      │
│                               │ HTTPS/MQTT                      │
└───────────────────────────────┼─────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   AWS IoT Core        │
                    │   (Cloud Platform)    │
                    └───────────────────────┘
```

**LoRaWAN Configuration**:

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Region** | US915 / EU868 | Regulatory compliance |
| **Class** | Class A (default) | Low power, uplink-only |
| **Data Rate** | SF7-SF12 (adaptive) | Range vs. throughput trade-off |
| **Payload Size** | 51-242 bytes | Depends on data rate |
| **Transmission Power** | 14 dBm (25 mW) | Battery preservation |
| **Duty Cycle** | <1% (EU), no limit (US) | Regulatory |
| **Security** | AES-128 (end-to-end) | Industry standard |

**Data Transmission Pattern**:
```python
class LoRaWANSensor:
    def __init__(self, device_eui, app_key):
        self.device_eui = device_eui
        self.app_key = app_key
        self.frame_counter = 0
    
    def transmit_measurement(self, sensor_data):
        """
        Transmit sensor data over LoRaWAN
        Payload optimization (minimize bytes = save battery)
        """
        # Compress data (example: 16-bit integers)
        payload = struct.pack(
            '>HHHBB',  # Format: 3× uint16, 2× uint8
            int(sensor_data['co2'] - 400),  # Offset to fit in 16-bit
            int(sensor_data['temp'] * 10),  # 1 decimal precision
            int(sensor_data['humidity'] * 10),
            sensor_data['battery_level'],  # 0-100%
            sensor_data['signal_quality']  # RSSI
        )
        
        # Encrypt with AES-128
        encrypted_payload = self.encrypt(payload, self.app_key)
        
        # Transmit (LoRaWAN stack handles retries)
        self.lora.send(encrypted_payload)
        
        self.frame_counter += 1
        
        # Adaptive data rate (ADR)
        self.optimize_data_rate()
```

---

### 3.2 2.4 GHz Mesh Network (Secondary)

**Technology**: Zigbee / Thread  
**Use Case**: High-frequency sensors (occupancy, lighting control)

**Advantages over LoRaWAN**:
- Higher data rates (250 kbps vs. 50 kbps)
- Lower latency (<100 ms vs. seconds)
- Mesh routing (self-healing network)

**Disadvantages**:
- Shorter range (10-100m vs. 2-5 km)
- More power consumption (1-2 year battery vs. 5 years)
- More gateways needed

**Deployment**:
- Occupancy sensors (frequent updates)
- Lighting controllers (real-time)
- Gateway: 1 per 2,000 sq ft

---

### 3.3 Wired Sensors (Critical Systems)

**BACnet/Modbus Integration**:

For existing building automation systems (BAS):
- HVAC equipment (chillers, AHUs, VAVs)
- Energy meters (main panels)
- Fire/life safety (integration only, not control)

**Protocol Translation Gateway**:
```python
class BACnetToMQTTBridge:
    """
    Translate BACnet to MQTT for cloud ingestion
    """
    def __init__(self, bacnet_device_id, mqtt_broker):
        self.bacnet = BAC0.connect()  # BACnet/IP
        self.mqtt = mqtt.Client()
        self.mqtt.connect(mqtt_broker)
    
    def poll_bacnet_points(self, device_address, point_list):
        """
        Read BACnet points and publish to MQTT
        """
        for point in point_list:
            # Read BACnet (e.g., analogInput:1 = supply air temp)
            value = self.bacnet.read(
                f'{device_address} analogInput {point["id"]} presentValue'
            )
            
            # Publish to MQTT
            topic = f'building/hvac/{device_address}/{point["name"]}'
            self.mqtt.publish(topic, json.dumps({
                'value': value,
                'units': point['units'],
                'timestamp': datetime.utcnow().isoformat()
            }))
```

---

## 4. Edge Computing Architecture

### 4.1 AWS IoT Greengrass Deployment

**Edge Nodes**: Raspberry Pi 4 (8GB RAM) or Intel NUC

**Specifications**:
- CPU: Quad-core ARM Cortex-A72 @ 1.5 GHz
- RAM: 8GB
- Storage: 128GB SSD
- Network: Gigabit Ethernet + WiFi 6
- Cost: $150/unit

**Deployment**:
- 1 edge node per floor (or per 50 sensors)
- Redundant nodes for critical floors

**Capabilities**:
1. **Local Data Aggregation**: Collect from 500+ sensors
2. **Edge ML Inference**: Anomaly detection, occupancy prediction
3. **Data Buffering**: Store up to 7 days offline
4. **Protocol Translation**: LoRaWAN → MQTT, BACnet → MQTT
5. **Local Control**: Emergency HVAC override

**Software Stack**:
```yaml
# Greengrass configuration
system:
  certificateFilePath: "/greengrass/certs/certificate.pem"
  privateKeyPath: "/greengrass/certs/private.key"
  rootCaPath: "/greengrass/certs/root.ca.pem"
  thingName: "nimbus-edge-floor-25"

runtime:
  cgroup:
    useSystemd: "yes"

services:
  aws.greengrass.Nucleus:
    version: "2.9.0"
    configuration:
      mqtt:
        port: 8883
      
  aws.greengrass.StreamManager:
    version: "2.1.0"
    configuration:
      STREAM_MANAGER_STORE_ROOT_DIR: "/data/streams"
      STREAM_MANAGER_SERVER_PORT: 8088
      
  custom.SensorAggregator:
    version: "1.0.0"
    configuration:
      samplingIntervalSeconds: 60
      batchSize: 1000
      
  custom.AnomalyDetector:
    version: "1.0.0"
    configuration:
      model: "/ml/models/isolation-forest.pkl"
      threshold: 0.95
```

**Edge ML Models**:
```python
# Deployed to Greengrass for local inference
class EdgeAnomalyDetector:
    def __init__(self, model_path):
        # Load pre-trained Isolation Forest model
        with open(model_path, 'rb') as f:
            self.model = pickle.load(f)
    
    def detect_anomalies(self, sensor_batch):
        """
        Detect anomalous sensor readings (local inference)
        Returns: List of anomaly flags
        """
        # Feature engineering
        features = self.extract_features(sensor_batch)
        
        # Predict anomalies (-1 = anomaly, 1 = normal)
        predictions = self.model.predict(features)
        
        # Flag anomalies for immediate alerting
        anomalies = []
        for i, pred in enumerate(predictions):
            if pred == -1:
                anomalies.append({
                    'sensor_id': sensor_batch[i]['id'],
                    'value': sensor_batch[i]['value'],
                    'expected_range': self.model.decision_function([features[i]])[0],
                    'severity': 'high' if abs(features[i]) > 3 else 'medium'
                })
        
        return anomalies
```

---

## 5. Data Pipeline & Processing

### 5.1 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  SENSORS (50,000)                                                │
│  • 1-second sampling (critical zones)                            │
│  • 1-minute sampling (general)                                   │
│  • Compressed payloads (50-200 bytes)                            │
└────────────────────┬────────────────────────────────────────────┘
                     │ LoRaWAN / Zigbee
┌────────────────────▼────────────────────────────────────────────┐
│  EDGE NODES (100 per building)                                   │
│  • Local aggregation (1-minute batches)                          │
│  • Edge ML inference (anomaly detection)                         │
│  • Data buffering (7-day capacity)                               │
│  • Compression (gzip, 10:1 ratio)                                │
└────────────────────┬────────────────────────────────────────────┘
                     │ HTTPS / MQTT (TLS 1.3)
┌────────────────────▼────────────────────────────────────────────┐
│  AWS IOT CORE                                                    │
│  • Device authentication (X.509 certificates)                    │
│  • Message routing (IoT Rules Engine)                            │
│  • Throughput: 500K messages/sec                                 │
└────────────────────┬────────────────────────────────────────────┘
                     │
       ┌─────────────┴─────────────┬──────────────┬───────────────┐
       │                           │              │               │
┌──────▼──────┐           ┌────────▼────────┐   ┌▼──────────┐   ┌▼──────────┐
│ Kinesis     │           │ Lambda          │   │ S3        │   │ DynamoDB  │
│ Firehose    │           │ (Real-time)     │   │ (Archive) │   │ (Metadata)│
│ (Streaming) │           │ • Validation    │   │ 7-year    │   │ Devices   │
└──────┬──────┘           │ • Enrichment    │   │ retention │   │ State     │
       │                  └─────────────────┘   └───────────┘   └───────────┘
┌──────▼──────────────────────────────────────────────────────────┐
│  INFLUXDB (Time-Series Database)                                 │
│  • 100M+ data points/hour                                        │
│  • 1-year retention (1-second granularity)                       │
│  • Downsampling: 1-min (1 year), 1-hour (5 years)               │
└────────────────────┬─────────────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────────────┐
│  ANALYTICS & ML PIPELINE                                         │
│  • Climate prediction                                            │
│  • HVAC optimization                                             │
│  • Carbon tracking                                               │
│  • Anomaly detection                                             │
└──────────────────────────────────────────────────────────────────┘
```

### 5.2 Data Validation & Quality

**Multi-Level Validation**:

**Level 1: Sensor (Embedded)**
```c
// Firmware validation before transmission
bool validate_sensor_reading(float value, sensor_type_t type) {
    switch (type) {
        case SENSOR_CO2:
            return (value >= 300 && value <= 5000);  // ppm
        case SENSOR_TEMP:
            return (value >= -40 && value <= 85);    // °C
        case SENSOR_HUMIDITY:
            return (value >= 0 && value <= 100);     // % RH
        default:
            return false;
    }
}
```

**Level 2: Edge (Greengrass)**
```python
def validate_sensor_batch(batch):
    """Validate batch of sensor readings"""
    validated = []
    for reading in batch:
        # Range check
        if not is_in_valid_range(reading):
            log_warning(f"Out of range: {reading}")
            continue
        
        # Rate of change check (prevent spikes)
        if has_unrealistic_change(reading, previous_reading):
            log_warning(f"Unrealistic change: {reading}")
            continue
        
        # Cross-sensor validation (e.g., CO₂ vs. occupancy)
        if not cross_sensor_consistency(reading, related_sensors):
            log_warning(f"Inconsistent with other sensors: {reading}")
            continue
        
        validated.append(reading)
    
    return validated
```

**Level 3: Cloud (Lambda)**
```python
def validate_ingestion(event):
    """Final validation before database insertion"""
    # Schema validation
    schema = {
        'sensor_id': str,
        'timestamp': datetime,
        'value': float,
        'unit': str,
        'quality_score': float  # 0-1 (sensor health)
    }
    
    if not matches_schema(event['data'], schema):
        raise ValidationError("Invalid schema")
    
    # Duplicate detection (replay attack prevention)
    if is_duplicate(event['data']['sensor_id'], event['data']['timestamp']):
        raise DuplicateDataError()
    
    # Statistical outlier detection
    if is_statistical_outlier(event['data']['value'], historical_data):
        event['data']['anomaly_flag'] = True
    
    return event['data']
```

---

## 6. Power Management

### 6.1 Battery-Powered Sensors

**Target Battery Life**: 5 years (no maintenance)

**Power Budget** (CR2477 coin cell, 1000 mAh @ 3V):
```
Total Energy: 1000 mAh × 3V × 3600 s/h = 10.8 kJ
Target Lifespan: 5 years = 157,680,000 seconds

Average Power Budget: 10.8 kJ / 157,680,000 s = 68 μW
```

**Power Consumption Optimization**:

| State | Duration | Current | Energy/Day |
|-------|----------|---------|------------|
| **Deep Sleep** | 99% | 5 μA | 3.6 mJ |
| **Sensor Sampling** | 0.5% (10s/1min) | 50 mA | 129.6 mJ |
| **LoRa TX** | 0.1% (2s/1min) | 120 mA | 103.7 mJ |
| **MCU Processing** | 0.4% (8s/1min) | 10 mA | 27.7 mJ |
| **Total** | 100% | **Avg: 72 μW** | **264.6 mJ/day** |

**Battery Life Calculation**:
```
10,800 J / 0.2646 J/day = 40,816 days = 5.6 years ✅
```

**Firmware Power Optimization**:
```c
void loop() {
    // Wake up every 60 seconds
    if (timer_expired()) {
        // 1. Quick sensor sampling (10ms per sensor)
        float co2 = read_co2_sensor();      // 8ms
        float temp = read_temp_sensor();    // 2ms
        float humidity = read_humidity();   // 2ms
        
        // 2. Process data (5ms)
        sensor_data_t data = {
            .co2 = co2,
            .temp = temp,
            .humidity = humidity,
            .battery_mv = read_battery_voltage()
        };
        
        // 3. Transmit via LoRaWAN (2 seconds)
        lora_transmit(&data, sizeof(data));
        
        // 4. Back to deep sleep
        enter_deep_sleep(60);  // Sleep for 60 seconds
    }
}
```

### 6.2 Energy Harvesting (Future)

**Solar-Powered Sensors** (outdoor, high-traffic areas):
- Photovoltaic cell: 0.5W @ peak sun
- Rechargeable battery: LiPo 3.7V, 2000 mAh
- Infinite lifespan (no battery replacement)

---

## 7. Deployment & Installation

### 7.1 Installation Workflow

**Phase 1: Site Survey** (1 day per floor)
1. Walk-through with facility manager
2. Identify sensor placement locations
3. Mark ceiling/wall mounting points
4. Document existing BAS infrastructure

**Phase 2: Gateway Installation** (2 days per building)
1. Install edge nodes (Raspberry Pi + power)
2. Configure network connectivity
3. Test LoRaWAN coverage
4. Verify internet connectivity

**Phase 3: Sensor Deployment** (5 days per floor, 20 techs)
1. Mount sensors (adhesive backing, no drilling)
2. Power on and verify transmission
3. Commission in IoT platform (auto-discovery)
4. Label with QR codes (asset tracking)

**Phase 4: Calibration & Testing** (2 days per floor)
1. Baseline measurements (empty building)
2. Occupied testing (normal business day)
3. Cross-sensor validation
4. HVAC integration testing

**Total Timeline**: 50-story building = ~12 weeks (3 months)

### 7.2 Sensor Placement Guidelines

**Air Quality Sensors**:
- ✅ Breathing zone height (4-6 ft)
- ✅ Away from windows/doors (avoid drafts)
- ✅ Not near HVAC vents (turbulent flow)
- ✅ Accessible for maintenance

**Occupancy Sensors**:
- ✅ Ceiling-mounted (thermal imaging)
- ✅ Desk-mounted (ultrasonic)
- ✅ Overlapping coverage (no blind spots)
- ✅ Privacy-preserving (no cameras in restrooms)

**Energy Meters**:
- ✅ Main electrical panel (licensed electrician)
- ✅ Non-invasive CT clamps (no downtime)
- ✅ WiFi coverage for data transmission

---

## 8. Maintenance & Calibration

### 8.1 Preventive Maintenance Schedule

| Component | Frequency | Task |
|-----------|-----------|------|
| **Air Quality Sensors** | Quarterly | Visual inspection, dust removal |
| **CO₂ Sensors** | Annually | Outdoor baseline calibration (420 ppm) |
| **Occupancy Sensors** | Quarterly | Lens cleaning (thermal/camera) |
| **Energy Meters** | Annually | Accuracy verification (clamp meter) |
| **Weather Station** | Quarterly | Clean rain gauge, check anemometer |
| **Edge Nodes** | Monthly | Software updates, disk space check |
| **Gateways** | Quarterly | Antenna inspection, signal strength test |

### 8.2 Automated Calibration

**CO₂ Sensor Self-Calibration**:
```python
def auto_calibrate_co2_sensor(sensor_id, readings_7days):
    """
    Automatic baseline correction (ABC algorithm)
    Assumes sensor sees outdoor air (420 ppm) at least once per week
    """
    # Find minimum reading in 7-day window (likely outdoor air)
    min_reading = min(readings_7days)
    
    # If minimum is significantly above 420 ppm, sensor has drifted
    OUTDOOR_CO2 = 420  # ppm (global average)
    drift = min_reading - OUTDOOR_CO2
    
    if abs(drift) > 50:  # Threshold: 50 ppm
        # Apply calibration offset
        calibration_offset = -drift
        update_sensor_calibration(sensor_id, calibration_offset)
        
        log_info(f"Sensor {sensor_id} calibrated: offset={calibration_offset} ppm")
```

---

## 9. Security & Privacy

### 9.1 Data Encryption

**End-to-End Encryption**:
- ✅ AES-128 (sensor → gateway)
- ✅ TLS 1.3 (gateway → cloud)
- ✅ At-rest encryption (S3, InfluxDB)

**Key Management**:
```python
# Per-sensor unique encryption keys
class SensorSecurityManager:
    def provision_sensor(self, sensor_id):
        """
        Provision sensor with unique keys during manufacturing
        """
        # Generate device-specific keys
        device_key = os.urandom(16)  # AES-128 key
        root_ca_cert = load_root_ca()
        
        # Create X.509 certificate (for TLS)
        sensor_cert = create_certificate(
            common_name=sensor_id,
            signing_key=root_ca_key,
            validity_years=10
        )
        
        # Flash to sensor secure element
        flash_secure_element(sensor_id, {
            'aes_key': device_key,
            'certificate': sensor_cert,
            'private_key': sensor_private_key
        })
```

### 9.2 Privacy Protection

**GDPR Compliance**:
- ✅ No PII collected (thermal imaging only, no faces)
- ✅ Occupancy counts only (no identities)
- ✅ Data minimization (aggregated data after 30 days)
- ✅ Right to erasure (tenant data deleted on move-out)

**Anonymization**:
```python
def anonymize_occupancy_data(raw_data):
    """
    Aggregate occupancy data (privacy-preserving)
    """
    # Input: Individual sensor detections
    # Output: Zone-level counts only
    
    zones = {}
    for sensor_reading in raw_data:
        zone_id = sensor_reading['zone']
        if zone_id not in zones:
            zones[zone_id] = 0
        zones[zone_id] += sensor_reading['count']
    
    # Return aggregated data (no individual tracking)
    return {
        'timestamp': datetime.utcnow(),
        'zones': zones,
        # Note: Individual sensor IDs discarded
    }
```

---

## 10. Performance Metrics

### 10.1 Network Performance

| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| **Sensor Uptime** | >99.5% | 99.97% | ✅ Excellent |
| **Data Delivery** | >99.9% | 99.95% | ✅ Excellent |
| **Latency (sensor→cloud)** | <500ms | 87ms (p95) | ✅ Excellent |
| **Gateway Uptime** | >99.9% | 99.98% | ✅ Excellent |
| **Battery Life** | >5 years | 5.6 years (projected) | ✅ Exceeds |

### 10.2 Data Quality Metrics

**Measurement Accuracy** (vs. reference instruments):
- CO₂: ±40 ppm (±5%)
- Temperature: ±0.2°C
- Humidity: ±2% RH
- PM2.5: ±10 μg/m³ (±10%)
- Occupancy: ±1 person (90% accuracy)

---

## Conclusion

NIMBUS BIOME's **Environmental Sensor Architecture** represents the densest, most comprehensive building monitoring system ever deployed. With **50,000+ sensors per building** capturing **100 million+ data points per hour**, we create an unprecedented digital twin of the built environment, enabling **35% energy savings**, **120 tons CO₂ reduction per building per year**, and radically healthier indoor spaces.

---

**Document Classification**: Technical Architecture  
**Last Updated**: November 28, 2025  
**Next Review**: February 28, 2026  
**Owner**: IoT Engineering Team  

© 2025 NIMBUS BIOME Inc. All rights reserved.
