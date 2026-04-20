# NIMBUS BIOME - AI/ML Pipeline
## Climate Prediction, HVAC Optimization & Carbon Tracking Algorithms

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Technical Architecture - AI/ML  
**Reading Time:** 40 minutes

---

## Executive Summary

NIMBUS BIOME's **AI/ML pipeline** delivers **97.8% accurate climate predictions**, **35% energy savings** through reinforcement learning-based HVAC optimization, and **real-time carbon tracking** (±2% accuracy). Our models process **100M+ sensor readings per hour** and generate **1M+ predictions per hour** across **2,500 buildings**.

### AI/ML Models Deployed

| Model | Purpose | Accuracy | Inference Time | Training Frequency |
|-------|---------|----------|----------------|-------------------|
| **Climate Predictor** | 24-hour weather forecast | 97.8% | <500ms | Weekly |
| **HVAC Optimizer** | Adaptive setpoint control | 35% savings | <100ms | Continuous (online RL) |
| **Occupancy Forecaster** | Space utilization prediction | 94.2% | <200ms | Daily |
| **Anomaly Detector** | Sensor fault detection | 96.5% | <50ms | Real-time |
| **Carbon Tracker** | Emissions calculation | ±2% error | Real-time | N/A (rule-based) |

### Infrastructure

| Component | Specification |
|-----------|--------------|
| **ML Platform** | AWS SageMaker + Kubernetes |
| **Training Compute** | 20× g5.2xlarge (NVIDIA A10G GPUs) |
| **Inference Compute** | 50× c6i.4xlarge (CPU-optimized) |
| **Model Registry** | MLflow (versioning, lineage) |
| **Feature Store** | AWS Feature Store (real-time + batch) |
| **Experiment Tracking** | Weights & Biases |

---

## Table of Contents

1. [ML Platform Architecture](#1-ml-platform-architecture)
2. [Climate Prediction Model](#2-climate-prediction-model)
3. [HVAC Optimization (Reinforcement Learning)](#3-hvac-optimization-reinforcement-learning)
4. [Occupancy Forecasting](#4-occupancy-forecasting)
5. [Anomaly Detection](#5-anomaly-detection)
6. [Carbon Footprint Tracking](#6-carbon-footprint-tracking)
7. [Model Training Pipeline](#7-model-training-pipeline)
8. [Model Deployment & Serving](#8-model-deployment--serving)
9. [Model Monitoring & Retraining](#9-model-monitoring--retraining)
10. [Ethical AI & Bias Mitigation](#10-ethical-ai--bias-mitigation)

---

## 1. ML Platform Architecture

### 1.1 End-to-End ML Pipeline

```
┌───────────────────────────────────────────────────────────────────┐
│                    DATA COLLECTION LAYER                          │
│  • 100M+ sensor readings/hour (IoT devices)                       │
│  • Weather data (NOAA API)                                        │
│  • Building metadata (PostgreSQL)                                 │
│  • Historical energy consumption (InfluxDB)                       │
└────────────────────────┬──────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                    FEATURE ENGINEERING                            │
│  • AWS Glue (ETL jobs)                                            │
│  • Feature Store (AWS Feature Store)                              │
│  • Feature transformations (time-series, spatial, categorical)    │
└────────────────────────┬──────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                    MODEL TRAINING                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Climate  │  │ HVAC     │  │Occupancy │  │ Anomaly  │         │
│  │ Predictor│  │Optimizer │  │Forecaster│  │ Detector │         │
│  │          │  │          │  │          │  │          │         │
│  │PyTorch   │  │Ray RLlib │  │PyTorch   │  │Sklearn   │         │
│  │A10G GPU  │  │A10G GPU  │  │CPU       │  │CPU       │         │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘         │
└────────────────────────┬──────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                    MODEL REGISTRY (MLflow)                        │
│  • Model versioning                                               │
│  • Experiment tracking                                            │
│  • Model lineage (data → features → model → metrics)             │
│  • A/B testing configuration                                      │
└────────────────────────┬──────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                    MODEL SERVING                                  │
│  • Kubernetes (KServe / Seldon Core)                              │
│  • REST API + gRPC endpoints                                      │
│  • Auto-scaling (HPA based on request rate)                       │
│  • Latency: <500ms (p95)                                          │
└────────────────────────┬──────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                    MODEL MONITORING                               │
│  • Prometheus (inference latency, throughput)                     │
│  • Evidently AI (data drift, model drift)                         │
│  • Alerting (PagerDuty)                                           │
│  • Automatic retraining triggers                                  │
└───────────────────────────────────────────────────────────────────┘
```

### 1.2 MLOps Toolchain

```yaml
mlops_stack:
  version_control:
    code: GitHub Enterprise
    data: DVC (Data Version Control)
    models: MLflow Model Registry
    
  experimentation:
    tracking: Weights & Biases
    hyperparameter_tuning: Optuna
    distributed_training: Ray Train
    
  feature_store:
    platform: AWS Feature Store
    latency: <10ms (online features)
    storage: S3 (offline features)
    
  model_serving:
    framework: KServe (Kubernetes)
    scaling: Kubernetes HPA
    canary_deployments: Flagger
    
  monitoring:
    metrics: Prometheus + Grafana
    drift_detection: Evidently AI
    explainability: SHAP
```

---

## 2. Climate Prediction Model

### 2.1 Model Architecture

**Transformer-Based Time-Series Model**:

```python
import torch
import torch.nn as nn

class ClimatePredictor(nn.Module):
    """
    Transformer model for 24-hour hyperlocal weather prediction
    
    Inputs:
      - Historical weather (7 days, 15-min resolution)
      - Building thermal mass characteristics
      - Occupancy forecast
      - Solar irradiance forecast
    
    Output:
      - 24-hour temperature & humidity forecast (15-min resolution)
    """
    
    def __init__(
        self,
        input_dim=512,
        d_model=512,
        nhead=8,
        num_encoder_layers=6,
        num_decoder_layers=6,
        dim_feedforward=2048,
        dropout=0.1
    ):
        super().__init__()
        
        # Input embedding
        self.input_embedding = nn.Linear(input_dim, d_model)
        
        # Positional encoding (time-aware)
        self.positional_encoding = PositionalEncoding(d_model, dropout)
        
        # Transformer encoder (process historical context)
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=nhead,
            dim_feedforward=dim_feedforward,
            dropout=dropout,
            batch_first=True
        )
        self.encoder = nn.TransformerEncoder(
            encoder_layer,
            num_layers=num_encoder_layers
        )
        
        # Transformer decoder (generate future predictions)
        decoder_layer = nn.TransformerDecoderLayer(
            d_model=d_model,
            nhead=nhead,
            dim_feedforward=dim_feedforward,
            dropout=dropout,
            batch_first=True
        )
        self.decoder = nn.TransformerDecoder(
            decoder_layer,
            num_layers=num_decoder_layers
        )
        
        # Output projection (temperature & humidity)
        self.output_layer = nn.Linear(d_model, 2)  # 2 values: temp, humidity
    
    def forward(self, historical_features, building_context, target_timestamps):
        """
        Args:
            historical_features: (batch, 672, input_dim)  # 7 days × 96 (15-min intervals)
            building_context: (batch, context_dim)
            target_timestamps: (batch, 96)  # Next 24 hours
        
        Returns:
            predictions: (batch, 96, 2)  # Temperature & humidity for next 24 hours
        """
        
        # Embed inputs
        src = self.input_embedding(historical_features)
        src = self.positional_encoding(src)
        
        # Encode historical context
        memory = self.encoder(src)
        
        # Decode future predictions
        tgt = self.positional_encoding(target_timestamps)
        output = self.decoder(tgt, memory)
        
        # Project to temperature & humidity
        predictions = self.output_layer(output)
        
        return predictions

class PositionalEncoding(nn.Module):
    """Sinusoidal positional encoding for time-series data"""
    
    def __init__(self, d_model, dropout=0.1, max_len=5000):
        super().__init__()
        self.dropout = nn.Dropout(p=dropout)
        
        position = torch.arange(max_len).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2) * -(math.log(10000.0) / d_model))
        
        pe = torch.zeros(max_len, 1, d_model)
        pe[:, 0, 0::2] = torch.sin(position * div_term)
        pe[:, 0, 1::2] = torch.cos(position * div_term)
        
        self.register_buffer('pe', pe)
    
    def forward(self, x):
        x = x + self.pe[:x.size(0)]
        return self.dropout(x)
```

### 2.2 Training Data

**Dataset**:
- **Size**: 5 years × 2,500 buildings × 96 (15-min intervals/day) = 4.4 billion data points
- **Features**: 512 dimensions
  - Historical weather (temperature, humidity, pressure, wind, solar)
  - Building thermal mass (materials, insulation, orientation)
  - Occupancy patterns (historical + forecast)
  - Time features (hour, day of week, season)

**Feature Engineering**:
```python
def engineer_climate_features(raw_data, building_metadata):
    """
    Transform raw sensor data into ML-ready features
    """
    
    features = {}
    
    # 1. Time-based features
    features['hour_sin'] = np.sin(2 * np.pi * raw_data['hour'] / 24)
    features['hour_cos'] = np.cos(2 * np.pi * raw_data['hour'] / 24)
    features['day_of_week_sin'] = np.sin(2 * np.pi * raw_data['day_of_week'] / 7)
    features['day_of_week_cos'] = np.cos(2 * np.pi * raw_data['day_of_week'] / 7)
    features['day_of_year_sin'] = np.sin(2 * np.pi * raw_data['day_of_year'] / 365)
    features['day_of_year_cos'] = np.cos(2 * np.pi * raw_data['day_of_year'] / 365)
    
    # 2. Weather features (lagged)
    for lag in [1, 3, 6, 12, 24]:  # 15-min, 45-min, 90-min, 3-hr, 6-hr lags
        features[f'temp_lag_{lag}'] = raw_data['temperature'].shift(lag)
        features[f'humidity_lag_{lag}'] = raw_data['humidity'].shift(lag)
    
    # 3. Rolling statistics (trends)
    for window in [6, 24, 96]:  # 90-min, 6-hr, 24-hr windows
        features[f'temp_rolling_mean_{window}'] = raw_data['temperature'].rolling(window).mean()
        features[f'temp_rolling_std_{window}'] = raw_data['temperature'].rolling(window).std()
    
    # 4. Building thermal characteristics
    features['thermal_mass'] = building_metadata['thermal_mass']  # J/K (joules per kelvin)
    features['insulation_r_value'] = building_metadata['insulation_r_value']
    features['window_to_wall_ratio'] = building_metadata['window_to_wall_ratio']
    features['building_orientation'] = building_metadata['orientation']  # degrees from north
    
    # 5. External data (NOAA weather forecast)
    features['noaa_temp_forecast'] = fetch_noaa_forecast(raw_data['timestamp'], raw_data['location'])
    features['solar_irradiance_forecast'] = fetch_solar_forecast(raw_data['timestamp'], raw_data['location'])
    
    return pd.DataFrame(features)
```

### 2.3 Model Performance

**Evaluation Metrics**:

| Metric | Temperature | Humidity |
|--------|-------------|----------|
| **MAE (Mean Absolute Error)** | 0.5°F | 3% RH |
| **RMSE (Root Mean Squared Error)** | 0.8°F | 4.5% RH |
| **R² Score** | 0.978 | 0.962 |
| **Prediction Horizon** | 24 hours | 24 hours |

**Benchmark Comparison**:

| Model | Temperature MAE | Humidity MAE |
|-------|-----------------|--------------|
| **NIMBUS (Transformer)** | 0.5°F | 3% RH |
| NOAA Global Forecast | 2.1°F | 8% RH |
| Persistence Model (naive) | 3.5°F | 12% RH |

**Performance Impact**:
- **HVAC Optimization**: 15% additional energy savings (vs. NOAA forecast)
- **Pre-Cooling**: Start cooling 2 hours earlier on hot days (reduce peak load)
- **Demand Response**: Participate in grid programs (shift load based on price signals)

---

## 3. HVAC Optimization (Reinforcement Learning)

### 3.1 Problem Formulation

**Markov Decision Process (MDP)**:

```python
class HVACOptimizationEnv(gym.Env):
    """
    OpenAI Gym environment for HVAC optimization
    Uses Soft Actor-Critic (SAC) algorithm
    """
    
    def __init__(self, building_id):
        super().__init__()
        self.building_id = building_id
        
        # State space (72 dimensions)
        self.observation_space = gym.spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(72,),
            dtype=np.float32
        )
        
        # Action space (48 continuous actions)
        # 12 zones × 2 (heating/cooling setpoint) × 2 (AHU speed)
        self.action_space = gym.spaces.Box(
            low=np.array([65] * 12 + [60] * 12 + [0] * 12 + [0] * 12),  # Min setpoints & speeds
            high=np.array([75] * 12 + [80] * 12 + [100] * 12 + [100] * 12),  # Max setpoints & speeds
            dtype=np.float32
        )
    
    def reset(self):
        """Reset environment to initial state"""
        self.state = self._get_current_state()
        return self.state
    
    def step(self, action):
        """
        Execute action (HVAC control) and observe next state
        
        Args:
            action: (48,) array of setpoints and speeds
        
        Returns:
            observation: (72,) state vector
            reward: float (negative cost = energy + discomfort)
            done: bool
            info: dict
        """
        
        # Apply action to building HVAC system
        self._apply_hvac_control(action)
        
        # Wait 15 minutes (control interval)
        time.sleep(900)
        
        # Observe new state
        next_state = self._get_current_state()
        
        # Calculate reward
        reward = self._calculate_reward(self.state, action, next_state)
        
        # Episode terminates after 24 hours
        done = (self.current_step >= 96)
        
        self.state = next_state
        self.current_step += 1
        
        return next_state, reward, done, {}
    
    def _get_current_state(self):
        """
        Construct state vector (72 dimensions)
        """
        
        # Indoor conditions (12 zones × 3 metrics = 36 dims)
        indoor_temps = [get_zone_temperature(z) for z in range(12)]
        indoor_humidity = [get_zone_humidity(z) for z in range(12)]
        indoor_co2 = [get_zone_co2(z) for z in range(12)]
        
        # Outdoor weather (6 dims)
        outdoor_temp = get_outdoor_temperature()
        outdoor_humidity = get_outdoor_humidity()
        solar_irradiance = get_solar_irradiance()
        wind_speed = get_wind_speed()
        weather_forecast = get_climate_prediction()  # From model above
        
        # Occupancy (12 zones)
        occupancy = [get_zone_occupancy(z) for z in range(12)]
        
        # Time features (6 dims)
        hour = datetime.now().hour
        day_of_week = datetime.now().weekday()
        is_weekend = 1 if day_of_week >= 5 else 0
        
        # Energy pricing (2 dims)
        current_price = get_electricity_price()
        peak_period = 1 if is_peak_pricing_period() else 0
        
        # Concatenate into state vector
        state = np.concatenate([
            indoor_temps,
            indoor_humidity,
            indoor_co2,
            [outdoor_temp, outdoor_humidity, solar_irradiance, wind_speed, weather_forecast],
            occupancy,
            [hour, day_of_week, is_weekend],
            [current_price, peak_period]
        ])
        
        return state.astype(np.float32)
    
    def _calculate_reward(self, state, action, next_state):
        """
        Reward function balances energy cost + comfort
        """
        
        # 1. Energy cost (negative reward)
        energy_kwh = calculate_energy_consumption(action)
        electricity_price = get_electricity_price()
        energy_cost = energy_kwh * electricity_price
        
        # 2. Thermal comfort penalty
        comfort_penalty = 0
        for zone in range(12):
            temp = next_state[zone]
            target_temp = 72.0  # Ideal
            
            # Penalty increases quadratically with deviation
            deviation = abs(temp - target_temp)
            if deviation > 2.0:  # Outside comfort band
                comfort_penalty += deviation ** 2
        
        # 3. Equipment wear penalty (penalize rapid changes)
        control_change_penalty = 0
        if hasattr(self, 'previous_action'):
            control_change = np.linalg.norm(action - self.previous_action)
            control_change_penalty = 0.1 * control_change
        
        self.previous_action = action
        
        # Total reward (weighted sum)
        reward = -(
            0.5 * energy_cost +
            0.4 * comfort_penalty +
            0.1 * control_change_penalty
        )
        
        return reward
```

### 3.2 Training Algorithm (Soft Actor-Critic)

```python
import ray
from ray import tune
from ray.rllib.algorithms.sac import SACConfig

# Initialize Ray for distributed training
ray.init()

# SAC configuration
config = (
    SACConfig()
    .environment(HVACOptimizationEnv, env_config={'building_id': 'bld_2L8F9mKpN4Qr'})
    .framework('torch')
    .training(
        # Hyperparameters (tuned via Optuna)
        gamma=0.99,
        lr=3e-4,
        train_batch_size=2048,
        target_entropy='auto',
        tau=0.005,
        n_step=3,
        num_steps_sampled_before_learning_starts=10000,
        replay_buffer_config={
            'capacity': 1000000,
            'prioritized_replay': True
        }
    )
    .resources(
        num_gpus=1,  # Train on NVIDIA A10G
        num_cpus_per_worker=2
    )
    .rollouts(
        num_rollout_workers=20,  # Parallel environments
        num_envs_per_worker=1,
        rollout_fragment_length=200
    )
    .evaluation(
        evaluation_interval=10,
        evaluation_duration=10,
        evaluation_num_workers=5
    )
)

# Train model
tuner = tune.Tuner(
    'SAC',
    param_space=config.to_dict(),
    run_config=ray.air.RunConfig(
        stop={'training_iteration': 1000},
        checkpoint_config=ray.air.CheckpointConfig(
            checkpoint_frequency=10,
            checkpoint_at_end=True
        )
    )
)

results = tuner.fit()
best_checkpoint = results.get_best_result().checkpoint
```

### 3.3 Deployment & Online Learning

**Model Serving**:
```python
from ray.rllib.algorithms.sac import SAC

# Load trained model
model = SAC.from_checkpoint(best_checkpoint)

# Real-time inference (every 15 minutes)
def optimize_hvac():
    """
    Real-time HVAC optimization (production)
    """
    
    # Get current building state
    state = get_current_state()
    
    # Predict optimal action
    action = model.compute_single_action(state, explore=False)
    
    # Apply to HVAC system
    apply_hvac_control(action)
    
    # Log for monitoring
    log_ml_inference({
        'model': 'hvac_optimizer',
        'building_id': 'bld_2L8F9mKpN4Qr',
        'state': state.tolist(),
        'action': action.tolist(),
        'timestamp': datetime.utcnow().isoformat()
    })

# Schedule every 15 minutes
schedule.every(15).minutes.do(optimize_hvac)
```

**Online Learning** (Continuous Improvement):
```python
# Update model with new experience (daily)
def online_learning_update():
    """
    Retrain model with yesterday's data
    Implements continuous learning (model improves over time)
    """
    
    # Collect yesterday's experience
    experience = fetch_experience_replay(
        start=datetime.now() - timedelta(days=1),
        end=datetime.now()
    )
    
    # Update model (incremental training)
    model.train(experience)
    
    # Evaluate new model
    eval_metrics = evaluate_model(model)
    
    # Deploy if improved
    if eval_metrics['reward'] > current_model_reward:
        deploy_model(model, version='hvac_optimizer_v{}'.format(datetime.now().strftime('%Y%m%d')))
        
        log_info(f'Model updated: new reward = {eval_metrics["reward"]:.2f}')

# Run daily at 2 AM
schedule.every().day.at('02:00').do(online_learning_update)
```

### 3.4 Results

**Energy Savings**:
- **Average**: 35% reduction vs. baseline (traditional HVAC control)
- **Range**: 25-45% (varies by building type, climate)
- **ROI**: Payback in 14 months (typical office building)

**Comfort Metrics**:
- **ASHRAE 55 Compliance**: 95% of occupied hours
- **Occupant Satisfaction**: 92% (survey results)
- **Temperature Stability**: ±1°F (vs. ±3°F baseline)

---

## 4. Occupancy Forecasting

### 4.1 Model Architecture (LSTM)

```python
import torch.nn as nn

class OccupancyForecaster(nn.Module):
    """
    LSTM model for occupancy prediction (next 24 hours)
    """
    
    def __init__(self, input_dim=32, hidden_dim=128, num_layers=3, dropout=0.2):
        super().__init__()
        
        self.lstm = nn.LSTM(
            input_size=input_dim,
            hidden_size=hidden_dim,
            num_layers=num_layers,
            dropout=dropout,
            batch_first=True,
            bidirectional=False
        )
        
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim, 64),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(64, 1)  # Output: occupancy count
        )
    
    def forward(self, x):
        """
        Args:
            x: (batch, seq_len, input_dim)  # Historical occupancy + features
        
        Returns:
            predictions: (batch, forecast_horizon)  # Next 24 hours
        """
        
        # LSTM forward pass
        lstm_out, (h_n, c_n) = self.lstm(x)
        
        # Use final hidden state for prediction
        predictions = self.fc(lstm_out[:, -1, :])
        
        return predictions
```

**Training Data**:
- 2 years × 2,500 buildings × 96 (15-min intervals/day)
- Features: historical occupancy, time of day, day of week, holidays, events

**Performance**:
- **MAE**: ±8 people (for 100-person capacity)
- **MAPE**: 8.5%
- **R² Score**: 0.942

**Use Cases**:
- **HVAC Pre-Conditioning**: Start cooling 1 hour before occupants arrive
- **Hot-Desking**: Optimize desk assignment based on predicted availability
- **Space Planning**: Identify underutilized zones

---

## 5. Anomaly Detection

### 5.1 Isolation Forest Model

```python
from sklearn.ensemble import IsolationForest

def train_anomaly_detector(historical_sensor_data):
    """
    Train anomaly detection model (unsupervised)
    Detects sensor faults, unusual patterns
    """
    
    # Extract features
    features = engineer_anomaly_features(historical_sensor_data)
    
    # Train Isolation Forest
    model = IsolationForest(
        n_estimators=100,
        contamination=0.01,  # Expect 1% anomalies
        random_state=42
    )
    
    model.fit(features)
    
    return model

def detect_anomalies(sensor_reading, model):
    """
    Real-time anomaly detection
    """
    
    features = engineer_anomaly_features([sensor_reading])
    prediction = model.predict(features)  # -1 = anomaly, 1 = normal
    
    if prediction == -1:
        # Calculate anomaly score
        score = model.decision_function(features)[0]
        
        return {
            'is_anomaly': True,
            'severity': 'high' if score < -0.5 else 'medium',
            'score': float(score),
            'explanation': generate_anomaly_explanation(sensor_reading, model)
        }
    
    return {'is_anomaly': False}
```

**Anomalies Detected**:
- **Sensor Faults**: Stuck readings, out-of-range values, sudden spikes
- **System Failures**: HVAC malfunction, unexpected energy surge
- **Unusual Patterns**: Occupancy during closed hours, abnormal CO₂ levels

**Performance**:
- **Precision**: 96.5% (few false positives)
- **Recall**: 92.3% (catches most anomalies)
- **Latency**: <50ms (real-time detection)

---

## 6. Carbon Footprint Tracking

### 6.1 Calculation Methodology

**Scope 1 + 2 + 3 Emissions**:

```python
def calculate_carbon_footprint(building_id, timestamp):
    """
    Real-time carbon footprint calculation (kg CO₂e)
    Based on EPA GHG Protocol
    """
    
    # Scope 1: Direct emissions (on-site combustion)
    natural_gas_therms = get_natural_gas_consumption(building_id, timestamp)
    diesel_gallons = get_diesel_generator_usage(building_id, timestamp)
    
    scope1 = (
        natural_gas_therms * 5.3 +  # kg CO₂e per therm
        diesel_gallons * 10.21  # kg CO₂e per gallon
    )
    
    # Scope 2: Indirect emissions (purchased electricity)
    electricity_kwh = get_electricity_consumption(building_id, timestamp)
    grid_carbon_intensity = get_grid_carbon_intensity(
        location=get_building_location(building_id),
        timestamp=timestamp
    )
    
    scope2 = electricity_kwh * (grid_carbon_intensity / 1000)  # g/kWh → kg/kWh
    
    # Scope 3: Other indirect (water, waste, business travel)
    water_gallons = get_water_consumption(building_id, timestamp)
    waste_tons = get_waste_generated(building_id, timestamp)
    
    scope3 = (
        water_gallons * 0.00034 +  # kg CO₂e per gallon (treatment + distribution)
        waste_tons * 500  # kg CO₂e per ton (landfill methane)
    )
    
    # Total carbon footprint
    total_emissions = scope1 + scope2 + scope3
    
    return {
        'timestamp': timestamp,
        'building_id': building_id,
        'scope1_kg_co2e': scope1,
        'scope2_kg_co2e': scope2,
        'scope3_kg_co2e': scope3,
        'total_kg_co2e': total_emissions,
        'intensity_kg_per_sqft': total_emissions / get_building_area(building_id)
    }
```

**Grid Carbon Intensity** (Real-Time):
```python
def get_grid_carbon_intensity(location, timestamp):
    """
    Fetch real-time grid carbon intensity
    Data source: ElectricityMap API, EPA eGRID
    """
    
    # Map building location to grid region
    grid_region = map_location_to_grid_region(location)
    
    # Fetch real-time carbon intensity (g CO₂/kWh)
    # Example: NYISO (New York) = 250-400 g/kWh (varies by time of day)
    response = requests.get(
        f'https://api.electricitymap.org/v3/carbon-intensity/latest',
        params={'zone': grid_region},
        headers={'auth-token': ELECTRICITYMAP_API_KEY}
    )
    
    data = response.json()
    
    return data['carbonIntensity']  # g CO₂/kWh
```

**Accuracy**: ±2% (validated against utility bills + EPA data)

---

## 7. Model Training Pipeline

### 7.1 Automated Retraining

**Schedule**:
- **Climate Predictor**: Weekly (incorporate new weather data)
- **HVAC Optimizer**: Daily (online learning)
- **Occupancy Forecaster**: Daily (new occupancy patterns)
- **Anomaly Detector**: Monthly (retrain on clean data)

**Pipeline** (Apache Airflow DAG):
```python
from airflow import DAG
from airflow.operators.python import PythonOperator

dag = DAG(
    'nimbus_ml_training',
    schedule_interval='@daily',
    start_date=datetime(2025, 1, 1),
    catchup=False
)

def fetch_training_data():
    """Pull data from InfluxDB, S3"""
    ...

def train_climate_model():
    """Train climate predictor"""
    ...

def train_hvac_model():
    """Train HVAC optimizer (online RL)"""
    ...

def evaluate_models():
    """Compute metrics on validation set"""
    ...

def deploy_models():
    """Push to production if metrics improve"""
    ...

# Define task dependencies
fetch_data = PythonOperator(task_id='fetch_data', python_callable=fetch_training_data)
train_climate = PythonOperator(task_id='train_climate', python_callable=train_climate_model)
train_hvac = PythonOperator(task_id='train_hvac', python_callable=train_hvac_model)
evaluate = PythonOperator(task_id='evaluate', python_callable=evaluate_models)
deploy = PythonOperator(task_id='deploy', python_callable=deploy_models)

fetch_data >> [train_climate, train_hvac] >> evaluate >> deploy
```

---

## 8. Model Deployment & Serving

### 8.1 KServe Deployment

```yaml
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: climate-predictor
  namespace: ml-models
spec:
  predictor:
    pytorch:
      storageUri: s3://nimbus-ml-models/climate-predictor/v1.2.0
      resources:
        requests:
          cpu: "2"
          memory: 4Gi
        limits:
          cpu: "4"
          memory: 8Gi
    scaleTarget: 10  # Auto-scale based on concurrency
    scaleMetric: concurrency
    minReplicas: 5
    maxReplicas: 50
```

**Inference API**:
```python
import requests

def predict_climate(building_id, forecast_hours=24):
    """
    Call climate prediction API
    """
    
    response = requests.post(
        'https://ml.nimbusbiome.io/v1/models/climate-predictor:predict',
        json={
            'building_id': building_id,
            'forecast_hours': forecast_hours
        },
        headers={'Authorization': f'Bearer {API_KEY}'}
    )
    
    return response.json()['predictions']
```

---

## 9. Model Monitoring & Retraining

### 9.1 Drift Detection

```python
from evidently.metrics import DataDriftMetric
from evidently.report import Report

def detect_data_drift():
    """
    Monitor for data distribution shifts (concept drift)
    """
    
    # Reference data (training set)
    reference_data = fetch_training_data(days=365)
    
    # Production data (last 7 days)
    production_data = fetch_production_data(days=7)
    
    # Compute drift
    report = Report(metrics=[DataDriftMetric()])
    report.run(reference_data=reference_data, current_data=production_data)
    
    drift_detected = report.as_dict()['metrics'][0]['result']['dataset_drift']
    
    if drift_detected:
        alert_team('Data drift detected - model retraining recommended')
        trigger_retraining()
    
    return drift_detected
```

---

## 10. Ethical AI & Bias Mitigation

### 10.1 Fairness Considerations

**No Discriminatory Features**:
- ✅ No race, gender, age, religion, etc.
- ✅ Models trained on building data only (no PII)
- ✅ Occupancy counts only (no individual tracking)

**Explainability** (SHAP):
```python
import shap

explainer = shap.TreeExplainer(hvac_optimizer_model)
shap_values = explainer.shap_values(input_features)

shap.summary_plot(shap_values, input_features)
# Shows which features drive HVAC decisions (transparency)
```

---

## Conclusion

NIMBUS BIOME's AI/ML pipeline delivers **state-of-the-art performance** (**97.8% climate prediction accuracy**, **35% HVAC energy savings**) through **transformer-based forecasting**, **reinforcement learning optimization**, and **real-time anomaly detection**. Our models process **100M+ sensor readings per hour** and continuously improve through **online learning** and **automated retraining**, ensuring **maximum energy efficiency** and **occupant comfort** across **2,500 buildings globally**.

---

**Document Classification**: Technical Architecture - AI/ML  
**Last Updated**: November 28, 2025  
**Next Review**: February 28, 2026  
**Owner**: Machine Learning Team  

© 2025 NIMBUS BIOME Inc. All rights reserved.
