# Gcraft - Technical Overview
## Gift Card Marketplace Platform Architecture

**Last Updated:** November 30, 2025  
**Pages:** 35

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER LAYER (Web + Mobile)                     │
│  React SPA (web) + React Native (iOS/Android)                   │
└──────────────┬──────────────────────────────────────────────────┘
               │
       ┌───────┴───────┬───────────┬───────────┬─────────┐
       │               │           │           │         │
       ▼               ▼           ▼           ▼         ▼
┌──────────┐  ┌────────────┐  ┌────────┐  ┌────────┐  ┌──────────┐
│ LISTING  │  │   FRAUD    │  │PAYMENT │  │BALANCE │  │  SEARCH  │
│ SERVICE  │  │  DETECTION │  │SERVICE │  │  API   │  │  ENGINE  │
└──────────┘  └────────────┘  └────────┘  └────────┘  └──────────┘
     │              │             │           │           │
     └──────────────┴─────────────┴───────────┴───────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │    DATABASE LAYER            │
              │  PostgreSQL + Redis + ES     │
              └──────────────────────────────┘
```

---

## Core Services

### 1. Listing Service
- Create/edit gift card listings
- Upload card images (OCR to extract code)
- Auto-pricing based on market demand

### 2. Fraud Detection
- **ML Model:** XGBoost (50K features)
- **Accuracy:** 99.7% (0.3% false positive rate)
- **Features:** Card velocity, IP reputation, image analysis

### 3. Balance Verification
- **API Integrations:** 500+ retailers (Amazon, Walmart, Target, etc.)
- **Methods:** Screen scraping (Selenium), official APIs
- **Latency:** <5 seconds avg.

### 4. Payment Service
- **Stripe Connect:** Instant payouts to sellers
- **Escrow:** Hold funds until buyer confirms balance
- **Fee Structure:** 14% take rate (split: 7% buyer, 7% seller)

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, Next.js, React Native |
| **API Gateway** | Kong (rate limiting, auth) |
| **Services** | Node.js (Express), Python (FastAPI) |
| **Database** | PostgreSQL (transactions), Redis (cache) |
| **Search** | Elasticsearch (card search) |
| **ML** | Python (scikit-learn, XGBoost) |
| **Payments** | Stripe Connect |
| **Infrastructure** | AWS EKS (Kubernetes) |
| **Monitoring** | Datadog, Sentry |

---

## User Flow (Buyer)

```
1. User searches "Starbucks gift card"
   ↓
2. Results sorted by discount % (Elasticsearch)
   ↓
3. User selects $50 card for $42 (16% off)
   ↓
4. Add to cart, checkout (Stripe)
   ↓
5. Fraud check (ML model: 99.7% accuracy)
   ↓
6. Balance verification (Starbucks API)
   ↓
7. Card code delivered (email + app notification)
   ↓
8. Funds released to seller (Stripe Connect)
```

---

## User Flow (Seller)

```
1. User uploads photo of gift card
   ↓
2. OCR extracts card code + brand
   ↓
3. Balance verification (check current value)
   ↓
4. Auto-pricing suggests $42 for $50 card (84% payout)
   ↓
5. User confirms listing
   ↓
6. Card listed on marketplace
   ↓
7. Buyer purchases (Stripe escrow)
   ↓
8. Seller receives $42 (instant payout to bank)
```

---

**© 2025 Gcraft Inc. All rights reserved.**
