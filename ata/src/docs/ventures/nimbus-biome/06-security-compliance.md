# NIMBUS BIOME - Security & Compliance
## ISO 14001, Data Privacy, Cybersecurity & Environmental Certifications

**Last Updated:** November 28, 2025  
**Document Version:** 1.0  
**Classification:** Security & Compliance Documentation  
**Reading Time:** 40 minutes

---

## Executive Summary

NIMBUS BIOME maintains **institutional-grade security** and **comprehensive compliance** with global environmental and data protection standards. Our platform is **ISO 14001 certified**, **GDPR compliant**, and integrates with **LEED**, **WELL**, and **ENERGY STAR** certification processes.

### Certifications & Standards

| Certification | Status | Audit Date | Next Audit | Auditor |
|---------------|--------|------------|------------|---------|
| **ISO 14001:2015** | ✅ Certified | Aug 2025 | Aug 2026 | BSI Group |
| **SOC 2 Type II** | ✅ Certified | June 2025 | June 2026 | Deloitte |
| **GDPR** | ✅ Compliant | Ongoing | Ongoing | Legal + DPO |
| **CCPA** | ✅ Compliant | Ongoing | Ongoing | Legal |
| **ISO 27001:2022** | 🔄 In Progress | Q2 2026 | N/A | BSI Group |
| **LEED Automation** | ✅ Supported | N/A | N/A | USGBC |
| **WELL Building** | ✅ Supported | N/A | N/A | IWBI |
| **ENERGY STAR** | ✅ Integrated | N/A | N/A | EPA |

### Security Posture

| Metric | Status | Target |
|--------|--------|--------|
| **Security Incidents (12mo)** | 0 critical | <5/year |
| **Vulnerability Patching** | 99.8% within 7 days | >95% |
| **Penetration Testing** | Quarterly | Quarterly |
| **Bug Bounty Program** | Active ($50K+ paid) | Ongoing |
| **MFA Adoption** | 100% (enforced) | 100% |
| **Encryption Coverage** | 100% (at rest + in transit) | 100% |

---

## Table of Contents

1. [Environmental Certifications](#1-environmental-certifications)
2. [Data Privacy & GDPR](#2-data-privacy--gdpr)
3. [Information Security (ISO 27001)](#3-information-security-iso-27001)
4. [SOC 2 Compliance](#4-soc-2-compliance)
5. [Cybersecurity Framework](#5-cybersecurity-framework)
6. [Access Control & Authentication](#6-access-control--authentication)
7. [Data Encryption](#7-data-encryption)
8. [Incident Response](#8-incident-response)
9. [Audit & Logging](#9-audit--logging)
10. [Third-Party Risk Management](#10-third-party-risk-management)

---

## 1. Environmental Certifications

### 1.1 ISO 14001:2015 (Environmental Management)

**Certification Details**:
- **Standard**: ISO 14001:2015 (Environmental Management Systems)
- **Scope**: NIMBUS BIOME cloud platform and sensor network
- **Certificate Number**: ISO-14001-2025-NIMBUS-001
- **Valid**: August 2025 - August 2026
- **Auditor**: BSI Group (British Standards Institution)

**Environmental Policy Statement**:
```
NIMBUS BIOME is committed to:
1. Reducing global building sector carbon emissions by 8 GT CO₂/year through 
   AI-powered optimization
2. Maintaining 99.97% sensor network uptime to ensure continuous environmental 
   monitoring
3. Achieving carbon neutrality in our own operations by 2026
4. Minimizing electronic waste through 5-year sensor battery life and hardware 
   recycling programs
5. Continuous improvement in environmental performance through data-driven 
   decision making
```

**Environmental Aspects & Impacts**:

| Aspect | Impact | Significance | Mitigation |
|--------|--------|--------------|------------|
| **Sensor Manufacturing** | E-waste, resource use | Medium | 5-year lifespan, recycling program |
| **Cloud Computing** | Energy consumption, carbon | High | 100% renewable energy (AWS goal 2025) |
| **Data Centers** | Water usage (cooling) | Medium | Efficient cooling, PUE <1.2 |
| **Customer Buildings** | Energy savings, carbon reduction | **Very High** | 35% avg energy savings, 120 tons CO₂/building/year |

**Environmental Objectives (2026)**:
1. Deploy to 10,000 buildings (4× current)
2. Achieve 1.2M tons CO₂ reduction (customer buildings)
3. Carbon-neutral operations (Scope 1+2)
4. 90% sensor recycling rate (end-of-life)
5. Zero hazardous waste to landfill

**Audit Findings (Aug 2025)**:
- ✅ 0 non-conformities
- ✅ 3 opportunities for improvement (minor)
  - Enhance supplier environmental assessment
  - Expand employee environmental training
  - Improve carbon accounting for Scope 3 emissions

### 1.2 LEED Automation (Leadership in Energy and Environmental Design)

**Integration with USGBC LEED Certification**:

NIMBUS BIOME automates data collection for **LEED v4.1** credits:

**Energy & Atmosphere (EA)**:
- ✅ **EA Credit: Optimize Energy Performance** (up to 18 points)
  - Automated energy metering (1-minute granularity)
  - Baseline vs. actual energy use comparison
  - Real-time energy dashboards

- ✅ **EA Credit: Advanced Energy Metering** (1 point)
  - Sub-metering for all end-uses (HVAC, lighting, plug loads)
  - Data accessible via API for LEED documentation

- ✅ **EA Credit: Demand Response** (2 points)
  - Automated demand response participation
  - Load shifting during peak periods

**Indoor Environmental Quality (EQ)**:
- ✅ **EQ Credit: Indoor Air Quality Assessment** (2 points)
  - Continuous IAQ monitoring (CO₂, PM2.5, VOCs, temp, humidity)
  - ASHRAE 62.1 compliance verification
  - Real-time alerts for threshold exceedances

- ✅ **EQ Credit: Thermal Comfort** (1 point)
  - Zone-level thermal comfort monitoring
  - ASHRAE 55 compliance tracking
  - Occupant feedback integration

**LEED Reporting API**:
```python
# Automated LEED documentation export
def generate_leed_report(building_id, start_date, end_date):
    """
    Generate LEED-compliant energy and IAQ report
    Output format: LEED Online submission-ready
    """
    
    # Energy performance (EA Credit)
    energy_data = {
        'baseline_eui': 85.0,  # kBtu/sqft/year (ASHRAE 90.1-2016)
        'actual_eui': 55.3,    # kBtu/sqft/year (35% savings)
        'percent_improvement': 35.0,
        'leed_points_earned': 18,  # Maximum points
        'measurement_period': f'{start_date} to {end_date}',
        'verification': 'Continuous automated metering via NIMBUS BIOME'
    }
    
    # Indoor air quality (EQ Credit)
    iaq_data = {
        'co2_compliance': {
            'target': '< 1000 ppm (ASHRAE 62.1)',
            'actual_avg': 620,
            'compliance_rate': 99.8,  # % of time in compliance
            'exceedances': 12  # Total hours exceeded in reporting period
        },
        'pm25_compliance': {
            'target': '< 12 μg/m³ (WHO guideline)',
            'actual_avg': 8.2,
            'compliance_rate': 100.0
        },
        'thermal_comfort': {
            'ashrae_55_compliance': 95.0,  # % of occupied hours
            'occupant_satisfaction': 92.0  # % satisfied (survey)
        }
    }
    
    return {
        'leed_version': 'v4.1 BD+C',
        'energy_performance': energy_data,
        'indoor_air_quality': iaq_data,
        'total_estimated_points': 23,  # EA (18) + EQ (5)
        'report_generated': datetime.utcnow().isoformat()
    }
```

### 1.3 WELL Building Standard

**WELL v2 Certification Support**:

**Air (A)**:
- ✅ **A01: Air Quality Standards** (Precondition)
  - PM2.5, PM10, O₃, CO, NO₂ monitoring
  - Threshold compliance verification

- ✅ **A03: Ventilation Effectiveness** (Optimization)
  - CO₂ monitoring (proxy for ventilation rate)
  - Automated ventilation rate adjustments

**Thermal Comfort (T)**:
- ✅ **T01: Thermal Performance** (Precondition)
  - ASHRAE 55 compliance monitoring
  - Zone-level temperature and humidity control

**Water (W)**:
- ✅ **W01: Water Quality Promotion** (via partner integrations)

**WELL Scorecard API**:
```json
{
  "well_version": "WELL v2",
  "building_id": "bld_2L8F9mKpN4Qr",
  "reporting_period": "2025-01-01 to 2025-12-31",
  "features": {
    "air": {
      "A01_air_quality": {
        "status": "achieved",
        "pm25_annual_avg": 8.2,
        "threshold": 12.0,
        "compliance": true
      },
      "A03_ventilation": {
        "status": "achieved",
        "co2_zones_compliant": 100.0,
        "threshold": "> 95%"
      }
    },
    "thermal_comfort": {
      "T01_thermal_performance": {
        "status": "achieved",
        "ashrae_55_compliance": 95.2,
        "threshold": "> 90%"
      }
    }
  },
  "total_points": 12,
  "certification_level": "Silver"
}
```

### 1.4 ENERGY STAR Integration

**EPA Portfolio Manager API Integration**:
```python
import requests

def sync_to_energy_star(building_id, api_key):
    """
    Automatically sync energy data to EPA ENERGY STAR Portfolio Manager
    """
    
    # Get monthly energy consumption from NIMBUS BIOME
    energy_data = get_monthly_energy(building_id)
    
    # Transform to Portfolio Manager format
    pm_data = {
        'propertyId': get_portfolio_manager_id(building_id),
        'meterData': [
            {
                'meterType': 'Electric',
                'unitOfMeasure': 'kWh',
                'usage': energy_data['electricity_kwh'],
                'cost': energy_data['electricity_cost_usd'],
                'startDate': energy_data['start_date'],
                'endDate': energy_data['end_date']
            },
            {
                'meterType': 'Natural Gas',
                'unitOfMeasure': 'therms',
                'usage': energy_data['natural_gas_therms'],
                'cost': energy_data['gas_cost_usd'],
                'startDate': energy_data['start_date'],
                'endDate': energy_data['end_date']
            }
        ]
    }
    
    # POST to Portfolio Manager API
    response = requests.post(
        'https://portfoliomanager.energystar.gov/ws/meter/consumption',
        headers={'X-API-Key': api_key},
        json=pm_data
    )
    
    return response.json()
```

**ENERGY STAR Score Prediction**:
```python
def predict_energy_star_score(building_data):
    """
    Predict ENERGY STAR score (1-100) based on building performance
    Uses EPA's source energy calculation methodology
    """
    
    # Calculate source energy (accounts for generation losses)
    source_energy = (
        building_data['electricity_kwh'] * 3.14 +  # Site-to-source: 3.14
        building_data['natural_gas_therms'] * 1.05  # Site-to-source: 1.05
    )
    
    # Source EUI (energy use intensity)
    source_eui = source_energy / building_data['area_sqft']
    
    # Compare to national median (from EPA database)
    national_median_eui = 95.0  # kBtu/sqft/year (office buildings)
    
    # ENERGY STAR score formula (simplified)
    # Score of 50 = median, score of 75 = top quartile
    if source_eui <= national_median_eui:
        score = 50 + (50 * (national_median_eui - source_eui) / national_median_eui)
    else:
        score = 50 * (national_median_eui / source_eui)
    
    return {
        'predicted_score': min(100, max(1, int(score))),
        'source_eui': source_eui,
        'national_median_eui': national_median_eui,
        'percentile': score,
        'eligible_for_certification': score >= 75  # Requires 75+ for ENERGY STAR label
    }
```

---

## 2. Data Privacy & GDPR

### 2.1 GDPR Compliance Framework

**Data Protection Officer (DPO)**:
- **Name**: Dr. Emily Chen
- **Email**: dpo@nimbusbiome.io
- **Role**: Independent oversight of GDPR compliance

**Legal Basis for Processing** (Article 6):
1. **Consent**: Users consent to account creation and data processing
2. **Contract**: Processing necessary for service delivery
3. **Legitimate Interest**: Building performance optimization

**Data Subject Rights** (Articles 15-22):

| Right | Implementation | Response Time |
|-------|----------------|---------------|
| **Right to Access** | Self-service data export (JSON/CSV) | Immediate |
| **Right to Rectification** | Account settings page | Immediate |
| **Right to Erasure** | Account deletion + 30-day retention | 30 days |
| **Right to Data Portability** | API export in machine-readable format | Immediate |
| **Right to Object** | Opt-out of marketing, analytics | Immediate |
| **Right to Restriction** | Temporary processing suspension | 24 hours |

**Data Processing Activities** (Article 30 - ROPA):

```yaml
# Record of Processing Activities (ROPA)
processing_activities:
  - name: Building Performance Monitoring
    purpose: Optimize HVAC, lighting, and energy systems
    legal_basis: Contract + Legitimate Interest
    data_categories:
      - Sensor telemetry (temperature, CO₂, occupancy counts)
      - Energy consumption metrics
      - Building metadata (address, area, floors)
    data_subjects:
      - Building occupants (anonymized occupancy counts)
      - Building managers (account data)
    retention:
      - Raw sensor data: 1 year
      - Aggregated data: 7 years (compliance)
    recipients:
      - NIMBUS BIOME employees (access-controlled)
      - AWS (data processor, DPA signed)
    transfers:
      - Within EU: Yes (eu-west-1 region)
      - Outside EU: Yes (US, via Standard Contractual Clauses)
    security_measures:
      - Encryption at rest (AES-256)
      - Encryption in transit (TLS 1.3)
      - Access controls (RBAC)
      - Audit logging (all data access logged)
```

### 2.2 Privacy-Preserving Technologies

**Anonymization Techniques**:

**1. Occupancy Data** (No PII):
```python
def anonymize_occupancy(raw_sensor_data):
    """
    Convert individual sensor detections to zone-level aggregates
    No individual tracking or identification possible
    """
    
    # Input: Individual sensor readings (thermal imaging, ultrasonic)
    # Output: Zone-level occupancy count only
    
    zones = {}
    for sensor in raw_sensor_data:
        zone_id = sensor['zone_id']
        if zone_id not in zones:
            zones[zone_id] = 0
        zones[zone_id] += sensor['detected_count']
    
    # Discard individual sensor IDs, timestamps, locations
    # Retain only: zone_id, count, time_bucket (1-hour)
    
    return {
        'timestamp': round_to_hour(datetime.utcnow()),
        'zones': zones
        # Note: No way to reverse-engineer individual movements
    }
```

**2. Differential Privacy** (Statistical Noise):
```python
import numpy as np

def add_differential_privacy(count, epsilon=0.1):
    """
    Add Laplace noise for differential privacy
    Epsilon: Privacy budget (lower = more private)
    """
    
    # Laplace mechanism
    sensitivity = 1  # Max change from one individual
    noise = np.random.laplace(0, sensitivity / epsilon)
    
    return max(0, count + noise)

# Example: Report 42 people in zone, but add noise
reported_count = add_differential_privacy(42, epsilon=0.1)
# Output: ~41 or ~43 (slight noise, preserves privacy)
```

**3. Data Minimization**:
```python
# Only collect data necessary for stated purpose
SENSOR_DATA_SCHEMA = {
    'required': ['timestamp', 'value', 'unit'],
    'optional': ['quality_score'],
    'forbidden': [
        'ip_address',  # No network data
        'mac_address',  # No device identifiers (unless sensor itself)
        'geolocation',  # No GPS coordinates
        'user_id',  # No personal identifiers
        'biometric'  # No facial recognition, fingerprints, etc.
    ]
}
```

### 2.3 Data Processor Agreements (DPA)

**AWS Data Processing Addendum**:
- **Signed**: January 2024
- **Standard Contractual Clauses**: Module 2 (Controller to Processor)
- **Scope**: All AWS services (EC2, RDS, S3, IoT Core)
- **Sub-processors**: Approved list published by AWS
- **Security measures**: ISO 27001, SOC 2, physical security

**InfluxDB Data Processing Agreement**:
- **Signed**: March 2024
- **Scope**: Time-series database (sensor metrics)
- **Data location**: US (with EU option available)
- **Security**: SOC 2, encryption, access controls

### 2.4 Privacy Impact Assessment (PIA)

**High-Risk Processing Activities**:

1. **Large-scale monitoring of public spaces**
   - Mitigation: No cameras in private areas (restrooms, private offices)
   - Mitigation: Thermal imaging only (no facial recognition)
   - Result: Low residual risk

2. **Cross-border data transfers (US ↔ EU)**
   - Mitigation: Standard Contractual Clauses (SCCs)
   - Mitigation: Encryption in transit (TLS 1.3)
   - Result: Low residual risk

3. **Automated decision-making (HVAC control)**
   - Mitigation: Human oversight (facility managers can override)
   - Mitigation: Transparency (explain AI decisions)
   - Result: Low residual risk

---

## 3. Information Security (ISO 27001)

### 3.1 ISO 27001:2022 Roadmap

**Current Status**: In progress (target certification: Q2 2026)

**ISMS Scope**:
- Cloud infrastructure (AWS)
- Application code (APIs, web app, mobile app)
- Data storage (databases, object storage)
- DevOps pipelines (CI/CD)
- Employee access (VPN, SSO)

**Controls Implemented** (93/93 Annex A controls):

**A.5 Organizational Controls**: ✅ 37/37
- Information security policies
- Roles and responsibilities
- Segregation of duties
- Management responsibilities
- Contact with authorities

**A.6 People Controls**: ✅ 8/8
- Screening of employees
- Terms and conditions of employment
- Information security awareness training
- Disciplinary process

**A.7 Physical Controls**: ✅ 14/14
- Physical security perimeters (AWS data centers)
- Physical entry controls
- Securing offices, rooms, facilities
- Equipment security

**A.8 Technological Controls**: ✅ 34/34
- User endpoint devices
- Privileged access rights
- Information access restriction
- Access to source code
- Secure authentication
- Capacity management
- Protection against malware
- Technical vulnerability management
- Configuration management
- Secure coding
- Security testing in development
- Logging and monitoring

**Risk Assessment** (ISO 27001 Clause 6.1.2):

| Asset | Threat | Vulnerability | Likelihood | Impact | Risk Level | Treatment |
|-------|--------|---------------|------------|--------|------------|-----------|
| **Customer Data** | Data breach | Weak access controls | Low | High | **Medium** | MFA, RBAC, encryption |
| **API Infrastructure** | DDoS attack | Public endpoint | Medium | Medium | **Medium** | WAF, rate limiting, CDN |
| **Database** | Unauthorized access | Misconfiguration | Low | High | **Medium** | Network isolation, encryption |
| **Source Code** | Theft/tampering | Insider threat | Low | High | **Medium** | Code reviews, GitHub audit logs |

---

## 4. SOC 2 Compliance

### 4.1 SOC 2 Type II Certification

**Report Details**:
- **Type**: SOC 2 Type II (6-month audit period)
- **Trust Service Criteria**: Security, Availability, Confidentiality
- **Audit Period**: December 2024 - May 2025
- **Report Date**: June 30, 2025
- **Auditor**: Deloitte & Touche LLP
- **Opinion**: Unqualified (no exceptions)

**Control Objectives Tested**:

**CC6: Logical and Physical Access Controls** (14 controls)

| Control ID | Description | Test Results |
|------------|-------------|--------------|
| **CC6.1** | Restrict logical access | ✅ No exceptions (tested 50 samples) |
| **CC6.2** | Passwords managed securely | ✅ No exceptions (bcrypt, min 12 chars) |
| **CC6.3** | Multi-factor authentication | ✅ 100% enforcement (tested all users) |
| **CC6.6** | Access removed upon termination | ✅ No exceptions (automated via Okta) |
| **CC6.7** | Audit logs reviewed | ✅ Weekly reviews (tested 25 weeks) |

**CC7: System Operations** (8 controls)

| Control ID | Description | Test Results |
|------------|-------------|--------------|
| **CC7.2** | System monitoring for anomalies | ✅ No exceptions (Prometheus + PagerDuty) |
| **CC7.3** | Evaluate and respond to events | ✅ No exceptions (incident response SLA met) |
| **CC7.4** | Respond to incidents | ✅ No exceptions (3 incidents, all resolved <4hr) |

**A1: Availability** (4 controls)

| Control ID | Description | Test Results |
|------------|-------------|--------------|
| **A1.1** | Availability commitments met | ✅ 99.97% uptime (SLA: 99.95%) |
| **A1.2** | System monitoring | ✅ No exceptions (24/7 monitoring) |
| **A1.3** | Incident response | ✅ No exceptions (MTTR: 18 minutes avg) |

**Audit Findings**:
- ✅ **0 control deficiencies**
- ✅ **0 significant deficiencies**
- ✅ **0 material weaknesses**
- 💡 **3 observations** (best practices, not deficiencies):
  1. Consider implementing automated security policy enforcement (OPA)
  2. Expand security awareness training to include phishing simulations
  3. Document disaster recovery testing more frequently (quarterly vs. semi-annual)

### 4.2 SOC 2 Control Environment

**Evidence Collection** (Automated):

```python
# Automated SOC 2 evidence collection
def collect_soc2_evidence(control_id, audit_period):
    """
    Automatically collect evidence for SOC 2 auditor
    """
    
    evidence = {}
    
    if control_id == 'CC6.1':  # Logical access controls
        # Export all user access changes during audit period
        evidence['user_access_changes'] = database.query("""
            SELECT user_id, action, performed_by, timestamp
            FROM audit_log
            WHERE action IN ('user_created', 'role_changed', 'access_granted', 'access_revoked')
              AND timestamp BETWEEN %s AND %s
            ORDER BY timestamp
        """, audit_period['start'], audit_period['end'])
        
        # Export IAM policies (AWS)
        evidence['iam_policies'] = aws.iam.list_policies()
        
        # Export Kubernetes RBAC
        evidence['k8s_rbac'] = kubectl.get('clusterroles,roles,rolebindings')
    
    elif control_id == 'CC6.7':  # Audit log review
        # Export weekly security review sign-offs
        evidence['security_reviews'] = s3.get_object(
            Bucket='nimbus-compliance',
            Key=f'security-reviews/{audit_period["year"]}/weekly-signoffs.pdf'
        )
    
    elif control_id == 'A1.1':  # Availability monitoring
        # Export uptime metrics from Prometheus
        evidence['uptime_metrics'] = prometheus.query_range(
            'up{job="api-gateway"}',
            start=audit_period['start'],
            end=audit_period['end']
        )
        
        # Calculate uptime percentage
        uptime_pct = calculate_uptime(evidence['uptime_metrics'])
        evidence['uptime_summary'] = {
            'percentage': uptime_pct,
            'sla': 99.95,
            'met_sla': uptime_pct >= 99.95
        }
    
    return evidence
```

---

## 5. Cybersecurity Framework

### 5.1 Defense in Depth

**7 Layers of Security**:

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 7: User Education & Awareness                             │
│  • Security awareness training (quarterly)                       │
│  • Phishing simulations (monthly)                                │
│  • Secure coding training (developers)                           │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│ Layer 6: Application Security                                   │
│  • OWASP Top 10 mitigation                                       │
│  • Static analysis (SonarQube)                                   │
│  • Dependency scanning (Snyk)                                    │
│  • Penetration testing (quarterly)                               │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│ Layer 5: Endpoint Security                                      │
│  • Laptop encryption (FileVault, BitLocker)                      │
│  • EDR (CrowdStrike Falcon)                                      │
│  • Mobile device management (Jamf, Intune)                       │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│ Layer 4: Network Security                                       │
│  • AWS VPC (isolated networks)                                   │
│  • Security groups (firewall rules)                              │
│  • Network ACLs                                                  │
│  • VPN (Tailscale) for remote access                             │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│ Layer 3: Access Control                                         │
│  • SSO (Okta) with MFA                                           │
│  • RBAC (role-based access control)                              │
│  • Least privilege principle                                     │
│  • JIT (just-in-time) access for production                      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│ Layer 2: Data Encryption                                        │
│  • At rest: AES-256 (AWS KMS)                                    │
│  • In transit: TLS 1.3                                           │
│  • Application-level: Field-level encryption (PII)               │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│ Layer 1: Physical Security                                      │
│  • AWS data centers (SOC 1/2/3, ISO 27001)                      │
│  • Biometric access controls                                     │
│  • 24/7 security personnel                                       │
│  • Video surveillance                                            │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Vulnerability Management

**Scanning Frequency**:
- **Code**: On every commit (GitHub Advanced Security)
- **Dependencies**: Daily (Snyk, Dependabot)
- **Infrastructure**: Weekly (AWS Inspector, Prowler)
- **Penetration Testing**: Quarterly (external firm)

**Patching SLAs**:

| Severity | Target | Actual (2025) |
|----------|--------|---------------|
| **Critical** | 24 hours | 4 hours avg |
| **High** | 7 days | 2 days avg |
| **Medium** | 30 days | 12 days avg |
| **Low** | 90 days | 45 days avg |

**Vulnerability Disclosure Policy**:

```markdown
# Responsible Disclosure

If you discover a security vulnerability, please report it to:
**security@nimbusbiome.io**

We commit to:
1. Acknowledge your report within 24 hours
2. Provide a severity assessment within 72 hours
3. Patch critical vulnerabilities within 7 days
4. Credit you in our security acknowledgments (if desired)

Bug Bounty Program:
- Critical: $5,000 - $25,000
- High: $1,000 - $5,000
- Medium: $250 - $1,000
- Low: $50 - $250

Scope: All NIMBUS BIOME infrastructure and applications
Out of scope: Social engineering, physical attacks, DDoS
```

---

## 6. Access Control & Authentication

### 6.1 Identity Provider (Okta)

**SSO Configuration**:
```yaml
okta:
  domain: nimbusbiome.okta.com
  
  applications:
    - name: NIMBUS BIOME Dashboard
      protocol: SAML 2.0
      mfa_required: true
      
    - name: AWS Console
      protocol: SAML 2.0
      mfa_required: true
      session_lifetime: 4 hours
      
    - name: GitHub Enterprise
      protocol: OAuth 2.0 + OIDC
      mfa_required: true
      
    - name: Kubernetes (kubectl)
      protocol: OIDC
      mfa_required: true

  mfa_policies:
    - name: Global MFA Enforcement
      priority: 1
      conditions:
        - all_users: true
      actions:
        - require_mfa: [okta_verify, google_auth, yubikey]
        - session_lifetime: 8 hours
        - re_auth_required: true (for sensitive actions)
```

**User Provisioning** (Automated):
```python
# Okta SCIM API integration
def provision_new_employee(employee_data):
    """
    Automatically provision access on employee hire date
    Deprovision access on termination
    """
    
    # Create Okta user
    okta_user = okta.users.create({
        'profile': {
            'firstName': employee_data['first_name'],
            'lastName': employee_data['last_name'],
            'email': employee_data['email'],
            'login': employee_data['email']
        },
        'groupIds': [
            'eng' if employee_data['department'] == 'Engineering' else 'general'
        ]
    })
    
    # Assign applications based on role
    if employee_data['role'] == 'engineer':
        okta.users.assign_application(okta_user.id, 'aws-console')
        okta.users.assign_application(okta_user.id, 'github')
        okta.users.assign_application(okta_user.id, 'kubernetes')
    
    # Send welcome email with MFA setup instructions
    send_onboarding_email(employee_data['email'])
    
    return okta_user

def deprovision_terminated_employee(employee_email):
    """
    Immediately revoke all access upon termination
    """
    
    # Deactivate Okta user
    okta_user = okta.users.get_by_email(employee_email)
    okta.users.deactivate(okta_user.id)
    
    # Rotate all API keys associated with user
    api_keys = database.query(
        "SELECT id FROM api_keys WHERE user_id = %s",
        okta_user.id
    )
    for key in api_keys:
        revoke_api_key(key['id'])
    
    # Alert security team
    slack.send_message(
        channel='#security',
        text=f'Access revoked for {employee_email} (termination)'
    )
```

### 6.2 Role-Based Access Control (RBAC)

**Role Hierarchy**:

```yaml
roles:
  - name: viewer
    description: Read-only access to building data
    permissions:
      - buildings:read
      - sensors:read
      - metrics:read
    
  - name: operator
    description: Manage HVAC and building systems
    permissions:
      - buildings:read
      - sensors:read
      - metrics:read
      - hvac:control
      - alerts:acknowledge
    
  - name: manager
    description: Building portfolio management
    permissions:
      - buildings:*
      - sensors:*
      - metrics:*
      - hvac:*
      - alerts:*
      - users:read
    
  - name: admin
    description: Organization administrator
    permissions:
      - *:*  # All permissions
```

**Permission Enforcement** (API Gateway):
```rust
// Rust API Gateway middleware
use actix_web::{web, HttpRequest, HttpResponse};

async fn check_permission(
    req: HttpRequest,
    required_permission: &str
) -> Result<(), HttpResponse> {
    // Extract JWT from Authorization header
    let token = extract_jwt(&req)?;
    
    // Verify JWT signature
    let claims = verify_jwt(token)?;
    
    // Check if user has required permission
    let user_permissions = get_user_permissions(claims.user_id).await?;
    
    if !user_permissions.contains(required_permission) {
        return Err(HttpResponse::Forbidden().json({
            "error": "insufficient_permissions",
            "required": required_permission,
            "user_role": claims.role
        }));
    }
    
    Ok(())
}

// Example protected route
#[actix_web::get("/buildings/{id}/hvac")]
async fn update_hvac_setpoint(
    req: HttpRequest,
    id: web::Path<String>
) -> Result<HttpResponse> {
    // Require hvac:control permission
    check_permission(req, "hvac:control").await?;
    
    // ... proceed with HVAC control
}
```

---

## 7. Data Encryption

### 7.1 Encryption at Rest

**AWS KMS (Key Management Service)**:
```yaml
kms_keys:
  - alias: nimbus-database-key
    description: Encrypts PostgreSQL RDS database
    key_spec: SYMMETRIC_DEFAULT (AES-256)
    key_usage: ENCRYPT_DECRYPT
    origin: AWS_KMS
    rotation: Automatic (365 days)
    
  - alias: nimbus-s3-key
    description: Encrypts S3 bucket objects
    key_spec: SYMMETRIC_DEFAULT (AES-256)
    
  - alias: nimbus-ebs-key
    description: Encrypts EBS volumes (Kubernetes)
    key_spec: SYMMETRIC_DEFAULT (AES-256)
```

**Encryption Coverage**:
- ✅ **RDS (PostgreSQL)**: AES-256, encrypted snapshots
- ✅ **InfluxDB**: AES-256 (managed by InfluxDB Cloud)
- ✅ **Redis (ElastiCache)**: AES-256, encrypted backups
- ✅ **S3**: SSE-KMS (all buckets)
- ✅ **EBS Volumes**: Encrypted by default (all Kubernetes nodes)
- ✅ **Secrets Manager**: Encrypted with KMS

### 7.2 Encryption in Transit

**TLS Configuration**:
```nginx
# NGINX SSL/TLS configuration (API Gateway)
ssl_protocols TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256';

ssl_certificate /etc/nginx/certs/nimbusbiome.io.crt;
ssl_certificate_key /etc/nginx/certs/nimbusbiome.io.key;

# HSTS (HTTP Strict Transport Security)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/nginx/certs/ca-bundle.crt;
```

**Certificate Management** (AWS Certificate Manager):
- Automatic renewal (60 days before expiration)
- Wildcard certificate (*.nimbusbiome.io)
- SANs (Subject Alternative Names): api.nimbusbiome.io, app.nimbusbiome.io

---

## 8. Incident Response

### 8.1 Incident Response Plan

**Severity Levels**:

| Severity | Definition | Response Time | Escalation |
|----------|------------|---------------|------------|
| **P0 (Critical)** | Data breach, complete outage | Immediate (page on-call) | CEO, CTO, Board |
| **P1 (High)** | Partial outage, security incident | 15 minutes | CTO, VP Eng |
| **P2 (Medium)** | Performance degradation | 1 hour | Engineering Manager |
| **P3 (Low)** | Minor bug, cosmetic issue | Next business day | Team Lead |

**Incident Response Team (IRT)**:
- **Incident Commander**: Senior Engineer (on-call rotation)
- **Technical Lead**: Subject matter expert (depends on incident type)
- **Communications Lead**: VP Marketing (for external comms)
- **Legal Counsel**: General Counsel (for data breaches)

**Response Procedure**:

1. **Detection** (automated alerts or user report)
2. **Triage** (assess severity, assign incident commander)
3. **Investigation** (root cause analysis)
4. **Containment** (stop the bleeding)
5. **Eradication** (remove threat, patch vulnerability)
6. **Recovery** (restore service to normal)
7. **Post-Incident Review** (blameless postmortem)

**Example: Data Breach Response** (P0):

```python
def handle_data_breach(breach_details):
    """
    Automated data breach response workflow
    Complies with GDPR Article 33 (72-hour notification)
    """
    
    # Step 1: Immediate containment
    if breach_details['source'] == 'api_vulnerability':
        # Disable vulnerable API endpoint
        disable_api_endpoint(breach_details['endpoint'])
        
        # Rotate all API keys (invalidate compromised keys)
        rotate_all_api_keys()
    
    # Step 2: Assess impact
    affected_users = identify_affected_users(breach_details)
    pii_exposed = check_pii_exposure(breach_details)
    
    # Step 3: Notify authorities (GDPR requires 72 hours)
    if pii_exposed:
        # Notify Data Protection Authority
        notify_dpa(
            authority='ICO (UK)',  # Or relevant DPA
            breach_type=breach_details['type'],
            affected_count=len(affected_users),
            mitigation=breach_details['mitigation']
        )
        
        # Notify affected users
        for user in affected_users:
            send_breach_notification(user, breach_details)
    
    # Step 4: Create incident ticket
    jira.create_issue(
        project='SEC',
        issue_type='Security Incident',
        summary=f'Data Breach: {breach_details["type"]}',
        priority='P0',
        assignee='security-team'
    )
    
    # Step 5: Alert stakeholders
    slack.send_message(
        channel='#incidents',
        text=f'🚨 P0 SECURITY INCIDENT: Data breach detected\n'
             f'Type: {breach_details["type"]}\n'
             f'Affected users: {len(affected_users)}\n'
             f'Incident Commander: @{get_on_call_engineer()}'
    )
    
    return {
        'incident_id': incident_id,
        'severity': 'P0',
        'status': 'contained',
        'next_steps': 'Root cause analysis in progress'
    }
```

### 8.2 Disaster Recovery

**RTO/RPO Targets**:

| System | RTO (Recovery Time) | RPO (Recovery Point) | Strategy |
|--------|---------------------|----------------------|----------|
| **API Gateway** | 30 minutes | 0 (real-time replication) | Multi-region active-active |
| **Databases** | 1 hour | 5 minutes | Multi-AZ + cross-region replicas |
| **InfluxDB** | 2 hours | 15 minutes | Automated backups + replicas |
| **S3 Data** | 4 hours | 0 (replication) | Cross-region replication |

**DR Testing** (semi-annual):
```bash
#!/bin/bash
# Disaster recovery drill (simulates complete region failure)

# Scenario: us-east-1 region failure
# Failover to: us-west-2

# 1. Update DNS (Route 53) to point to DR region
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch file://failover-to-us-west-2.json

# 2. Promote read replica to primary (PostgreSQL)
aws rds promote-read-replica \
  --db-instance-identifier nimbus-prod-us-west-2-replica

# 3. Update application configuration
kubectl set env deployment/api-gateway \
  DATABASE_URL="postgresql://nimbus-prod-us-west-2.rds.amazonaws.com/nimbus_biome"

# 4. Scale up Kubernetes cluster in DR region
eksctl scale nodegroup \
  --cluster nimbus-prod-us-west-2 \
  --nodes 100 \
  --name general-purpose

# 5. Verify services are healthy
kubectl get pods -n nimbus-prod | grep -c "Running"
# Expected: 5000+ pods running

# Total failover time: ~25 minutes
```

---

## 9. Audit & Logging

### 9.1 Security Event Logging

**Log Sources**:
- ✅ **Application logs**: API requests, authentication events, errors
- ✅ **AWS CloudTrail**: All API calls to AWS services
- ✅ **Kubernetes audit logs**: All kubectl commands, pod events
- ✅ **Database query logs**: All queries (PostgreSQL, InfluxDB)
- ✅ **Network flow logs**: VPC traffic (AWS Flow Logs)

**Log Retention**:
```yaml
log_retention:
  application_logs:
    hot_tier: 30 days (ElasticSearch)
    warm_tier: 1 year (S3 Standard)
    cold_tier: 7 years (S3 Glacier) # Compliance
    
  audit_logs:
    retention: 7 years (immutable, WORM storage)
    
  database_query_logs:
    retention: 90 days
```

**SIEM Integration** (Splunk):
```python
# Forward logs to Splunk for security analysis
import splunk_http_event_collector as splunk

def log_security_event(event_type, details):
    """
    Log security event to Splunk SIEM
    """
    
    event = {
        'sourcetype': 'nimbus:security',
        'event': {
            'timestamp': datetime.utcnow().isoformat(),
            'event_type': event_type,
            'severity': details.get('severity', 'info'),
            'user_id': details.get('user_id'),
            'ip_address': details.get('ip_address'),
            'action': details.get('action'),
            'resource': details.get('resource'),
            'result': details.get('result')  # 'success' or 'failure'
        }
    }
    
    splunk_hec = splunk.http_event_collector(
        token='YOUR_SPLUNK_HEC_TOKEN',
        host='splunk.nimbusbiome.io'
    )
    
    splunk_hec.sendEvent(event)

# Example: Log authentication event
log_security_event('authentication', {
    'severity': 'info',
    'user_id': 'usr_9Xa2Bc3De4Fg',
    'ip_address': '203.0.113.42',
    'action': 'login',
    'result': 'success',
    'mfa_method': 'okta_verify'
})
```

### 9.2 Audit Trail (Immutable)

**Blockchain-Based Audit Log** (optional, for high-assurance use cases):
```python
import hashlib
import json

class AuditChain:
    """
    Immutable audit log using blockchain-like structure
    Ensures tamper-proof audit trail
    """
    
    def __init__(self):
        self.chain = []
        self.add_block('Genesis Block', previous_hash='0')
    
    def add_block(self, event, previous_hash):
        """Add audit event to chain"""
        block = {
            'index': len(self.chain),
            'timestamp': datetime.utcnow().isoformat(),
            'event': event,
            'previous_hash': previous_hash,
            'hash': None
        }
        
        block['hash'] = self.calculate_hash(block)
        self.chain.append(block)
        
        return block
    
    def calculate_hash(self, block):
        """Calculate SHA-256 hash of block"""
        block_string = json.dumps(block, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()
    
    def verify_integrity(self):
        """Verify entire chain hasn't been tampered with"""
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]
            
            # Verify current block's hash
            if current['hash'] != self.calculate_hash(current):
                return False, f'Block {i} hash mismatch'
            
            # Verify link to previous block
            if current['previous_hash'] != previous['hash']:
                return False, f'Block {i} chain broken'
        
        return True, 'Audit chain intact'

# Usage
audit = AuditChain()
audit.add_block({
    'action': 'user_login',
    'user_id': 'usr_9Xa2Bc3De4Fg',
    'ip': '203.0.113.42',
    'result': 'success'
}, previous_hash=audit.chain[-1]['hash'])

# Verify integrity (e.g., daily automated check)
is_valid, message = audit.verify_integrity()
print(f'Audit trail integrity: {message}')
```

---

## 10. Third-Party Risk Management

### 10.1 Vendor Security Assessment

**Vendor Onboarding Checklist**:

| Criterion | Requirement | Assessment Method |
|-----------|-------------|-------------------|
| **SOC 2 Report** | Must have SOC 2 Type II | Request report, verify with auditor |
| **ISO 27001** | Preferred | Request certificate |
| **Data Location** | US or EU | Contractual guarantee |
| **Data Processing Agreement** | Required | Legal review + signature |
| **Insurance** | $10M+ cyber liability | Certificate of insurance |
| **Penetration Testing** | Annual | Request report summary |
| **Incident Response** | <24hr notification SLA | Contractual guarantee |

**Current Vendors** (Security Reviewed):

| Vendor | Service | SOC 2 | ISO 27001 | DPA Signed | Risk Level |
|--------|---------|-------|-----------|------------|------------|
| **AWS** | Cloud infrastructure | ✅ | ✅ | ✅ | Low |
| **InfluxDB** | Time-series database | ✅ | ❌ | ✅ | Low |
| **Okta** | Identity provider | ✅ | ✅ | ✅ | Low |
| **Twilio** | SMS/notifications | ✅ | ❌ | ✅ | Medium |
| **Stripe** | Payment processing | ✅ | ✅ | ✅ | Medium (PCI DSS) |

### 10.2 Supply Chain Security

**Software Supply Chain**:
```yaml
# Dependency verification (npm, pip, cargo)
dependencies:
  policy: all_must_be_signed
  
  verification:
    - checksum_verification: SHA-256
    - signature_verification: GPG
    - sbom_generation: SPDX 2.3 (Software Bill of Materials)
    
  vulnerability_scanning:
    - tool: Snyk
    - frequency: on_every_commit
    - action: block_build_if_critical
    
  license_compliance:
    - allowed: [MIT, Apache-2.0, BSD-3-Clause]
    - forbidden: [GPL, AGPL] # Copyleft licenses
```

---

## Conclusion

NIMBUS BIOME's security and compliance program represents **institutional-grade practices** with **zero critical incidents** in the past 12 months, **100% MFA enforcement**, **99.8% vulnerability patching within 7 days**, and **comprehensive certifications** (ISO 14001, SOC 2, GDPR, LEED, WELL). Our **defense-in-depth** approach, **automated compliance evidence collection**, and **24/7 security monitoring** ensure the **protection of 2,500 buildings, 125M sensors, and 100M+ data points per hour**.

---

**Document Classification**: Security & Compliance  
**Last Updated**: November 28, 2025  
**Next Review**: February 28, 2026  
**Owner**: Security & Compliance Team  
**Classification**: Confidential  

© 2025 NIMBUS BIOME Inc. All rights reserved.
