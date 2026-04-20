# OTO - API Documentation
## RESTful, GraphQL, and WebSocket APIs

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**API Version:** v1  
**Reading Time:** 25 minutes

---

## Executive Summary

OTO provides **150+ REST endpoints**, **GraphQL API**, and **WebSocket real-time events** for comprehensive relationship management. All APIs use **OAuth 2.0 authentication**, **rate limiting** (1,000 requests/minute), and **99.9% uptime SLA**.

**Base URL:** `https://api.oto.ai/v1`

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [REST API Endpoints](#2-rest-api-endpoints)
3. [GraphQL API](#3-graphql-api)
4. [WebSocket Events](#4-websocket-events)
5. [Rate Limiting & Quotas](#5-rate-limiting--quotas)
6. [SDKs & Client Libraries](#6-sdks--client-libraries)

---

## 1. Authentication

### 1.1 OAuth 2.0 Flow

```bash
# Step 1: Get authorization code
GET https://auth.oto.ai/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=contacts:read contacts:write insights:read

# Step 2: Exchange code for access token
POST https://auth.oto.ai/oauth/token
Content-Type: application/json

{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "code": "AUTHORIZATION_CODE",
  "grant_type": "authorization_code"
}

# Response
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def502003efc..."
}
```

### 1.2 API Key Authentication

```bash
# Simple API key for server-to-server
curl https://api.oto.ai/v1/contacts \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 1.3 Scopes

| Scope | Description |
|-------|-------------|
| `contacts:read` | Read contact information |
| `contacts:write` | Create, update, delete contacts |
| `interactions:read` | Read interaction history |
| `interactions:write` | Log interactions |
| `insights:read` | Access AI insights, health scores |
| `gifts:read` | View gift recommendations |
| `gifts:write` | Mark gifts as purchased |
| `reminders:read` | View reminders |
| `reminders:write` | Create, update reminders |
| `admin` | Full access (enterprise only) |

---

## 2. REST API Endpoints

### 2.1 Contacts

#### GET /contacts
**List all contacts**

```bash
GET /contacts?limit=50&offset=0&sort=name&order=asc
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "cnt_7xk2p9mz",
      "name": "Sarah Johnson",
      "email": "sarah.j@example.com",
      "phone": "+1-555-0123",
      "company": "Acme Corp",
      "title": "VP of Engineering",
      "health_score": 87.5,
      "last_interaction": "2025-11-28T14:32:00Z",
      "relationship_type": "colleague",
      "created_at": "2024-03-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 247,
    "limit": 50,
    "offset": 0,
    "has_more": true
  }
}
```

#### POST /contacts
**Create a new contact**

```bash
POST /contacts
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-9876",
  "birthday": "1985-07-20",
  "company": "TechCo",
  "title": "CTO",
  "relationship_type": "friend",
  "notes": "Met at tech conference 2024"
}
```

**Response (201 Created):**
```json
{
  "id": "cnt_9am4k2nx",
  "name": "John Doe",
  "email": "john@example.com",
  "health_score": 50.0,
  "created_at": "2025-11-30T16:45:00Z"
}
```

#### GET /contacts/:id
**Get contact details**

```bash
GET /contacts/cnt_7xk2p9mz
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "id": "cnt_7xk2p9mz",
  "name": "Sarah Johnson",
  "email": "sarah.j@example.com",
  "phone": "+1-555-0123",
  "birthday": "1990-05-15",
  "company": "Acme Corp",
  "title": "VP of Engineering",
  "health_score": 87.5,
  "last_interaction": "2025-11-28T14:32:00Z",
  "relationship_type": "colleague",
  "relationship_strength": 0.85,
  "interests": [
    {"id": "int_tennis", "name": "Tennis", "confidence": 0.92},
    {"id": "int_jazz", "name": "Jazz Music", "confidence": 0.88}
  ],
  "upcoming_occasions": [
    {"type": "birthday", "date": "2026-05-15"}
  ],
  "created_at": "2024-03-15T10:00:00Z",
  "updated_at": "2025-11-28T14:32:00Z"
}
```

#### PATCH /contacts/:id
**Update contact**

```bash
PATCH /contacts/cnt_7xk2p9mz
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "SVP of Engineering",
  "notes": "Promoted to SVP in Q4 2025"
}
```

#### DELETE /contacts/:id
**Delete contact**

```bash
DELETE /contacts/cnt_7xk2p9mz
Authorization: Bearer YOUR_TOKEN
```

**Response (204 No Content)**

---

### 2.2 Interactions

#### POST /interactions
**Log an interaction**

```bash
POST /interactions
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "contact_id": "cnt_7xk2p9mz",
  "type": "email",
  "direction": "sent",
  "content": "Thanks for the coffee chat! Let's follow up next week.",
  "timestamp": "2025-11-30T10:30:00Z"
}
```

**Response (201 Created):**
```json
{
  "id": "int_k9j2m4px",
  "contact_id": "cnt_7xk2p9mz",
  "type": "email",
  "sentiment": 0.85,
  "sentiment_label": "positive",
  "health_score_updated": 88.2,
  "created_at": "2025-11-30T10:30:05Z"
}
```

#### GET /interactions
**Get interaction history**

```bash
GET /interactions?contact_id=cnt_7xk2p9mz&limit=20
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "int_k9j2m4px",
      "contact_id": "cnt_7xk2p9mz",
      "type": "email",
      "direction": "sent",
      "sentiment": 0.85,
      "timestamp": "2025-11-30T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 156,
    "limit": 20,
    "offset": 0
  }
}
```

---

### 2.3 Insights

#### GET /insights/health-score/:contact_id
**Get relationship health score**

```bash
GET /insights/health-score/cnt_7xk2p9mz
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "contact_id": "cnt_7xk2p9mz",
  "health_score": 87.5,
  "health_status": "good",
  "factors": {
    "interaction_frequency": 38.5,
    "recency": 23.2,
    "sentiment": 18.8,
    "reciprocity": 14.5
  },
  "trend": "improving",
  "last_updated": "2025-11-30T10:30:05Z"
}
```

#### GET /insights/churn-risk/:contact_id
**Get churn risk prediction**

```bash
GET /insights/churn-risk/cnt_7xk2p9mz
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "contact_id": "cnt_7xk2p9mz",
  "churn_probability": 0.18,
  "risk_level": "low",
  "days_until_churn": 74,
  "top_factors": [
    "interaction_frequency_90d",
    "sentiment_trend",
    "reciprocity_ratio"
  ],
  "recommendation": "Relationship is healthy. Continue current engagement pattern."
}
```

#### GET /insights/neglected
**Get neglected contacts**

```bash
GET /insights/neglected?threshold=50&limit=10
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "contact_id": "cnt_3k8m2z4p",
      "name": "Mike Chen",
      "health_score": 42.5,
      "days_since_last_interaction": 45,
      "recommendation": "Reach out soon. Send a quick check-in message."
    }
  ],
  "total": 8
}
```

---

### 2.4 Gifts

#### GET /gifts/recommend/:contact_id
**Get gift recommendations**

```bash
GET /gifts/recommend/cnt_7xk2p9mz
  ?occasion=birthday
  &budget_min=30
  &budget_max=100
  &limit=20
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "contact_id": "cnt_7xk2p9mz",
  "occasion": "birthday",
  "recommendations": [
    {
      "id": "gift_j8k2m9x",
      "name": "Professional Tennis Racket",
      "category": "Sports Equipment",
      "price": 89.99,
      "url": "https://amazon.com/...",
      "image_url": "https://cdn.oto.ai/gifts/...",
      "match_score": 0.94,
      "match_reasons": ["Tennis interest (92% confidence)", "Active lifestyle"]
    },
    {
      "id": "gift_m3k8j2z",
      "name": "Jazz Music Vinyl Collection",
      "category": "Music",
      "price": 74.99,
      "url": "https://etsy.com/...",
      "match_score": 0.89,
      "match_reasons": ["Jazz music interest (88% confidence)"]
    }
  ]
}
```

#### POST /gifts/purchase
**Mark gift as purchased**

```bash
POST /gifts/purchase
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "contact_id": "cnt_7xk2p9mz",
  "gift_id": "gift_j8k2m9x",
  "occasion": "birthday",
  "date": "2025-11-30",
  "price": 89.99
}
```

**Response (201 Created):**
```json
{
  "id": "purchase_k9j2m4px",
  "contact_id": "cnt_7xk2p9mz",
  "gift_id": "gift_j8k2m9x",
  "status": "purchased",
  "created_at": "2025-11-30T16:45:00Z"
}
```

---

### 2.5 Reminders

#### GET /reminders
**List reminders**

```bash
GET /reminders?status=pending&limit=20
Authorization: Bearer YOUR_TOKEN
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "rem_k9j2m4px",
      "contact_id": "cnt_7xk2p9mz",
      "type": "birthday",
      "title": "Sarah's Birthday",
      "date": "2026-05-15",
      "time": "09:00:00",
      "status": "pending",
      "notification_channels": ["push", "email"],
      "created_at": "2025-11-30T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 20
  }
}
```

#### POST /reminders
**Create reminder**

```bash
POST /reminders
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "contact_id": "cnt_7xk2p9mz",
  "type": "custom",
  "title": "Follow up on project proposal",
  "date": "2025-12-15",
  "time": "14:00:00",
  "notification_channels": ["push", "email"],
  "recurring": false
}
```

**Response (201 Created):**
```json
{
  "id": "rem_m3k8j2z",
  "contact_id": "cnt_7xk2p9mz",
  "status": "pending",
  "created_at": "2025-11-30T16:50:00Z"
}
```

---

## 3. GraphQL API

### 3.1 Endpoint

```
POST https://api.oto.ai/graphql
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

### 3.2 Schema Overview

```graphql
type Query {
  me: User
  contact(id: ID!): Contact
  contacts(limit: Int, offset: Int, filter: ContactFilter): ContactConnection
  interactions(contactId: ID, limit: Int): [Interaction]
  insights(contactId: ID!): Insights
  giftRecommendations(contactId: ID!, occasion: String, budget: BudgetInput): [Gift]
  reminders(status: ReminderStatus, limit: Int): [Reminder]
}

type Mutation {
  createContact(input: CreateContactInput!): Contact
  updateContact(id: ID!, input: UpdateContactInput!): Contact
  deleteContact(id: ID!): Boolean
  logInteraction(input: LogInteractionInput!): Interaction
  createReminder(input: CreateReminderInput!): Reminder
}

type Subscription {
  healthScoreUpdated(contactId: ID!): HealthScoreUpdate
  newReminder: Reminder
  churnAlert: ChurnAlert
}
```

### 3.3 Example Query

```graphql
query GetContactWithInsights {
  contact(id: "cnt_7xk2p9mz") {
    id
    name
    email
    healthScore
    lastInteraction
    interests {
      name
      confidence
    }
    insights {
      healthScore
      healthStatus
      churnProbability
      riskLevel
    }
    upcomingOccasions {
      type
      date
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "contact": {
      "id": "cnt_7xk2p9mz",
      "name": "Sarah Johnson",
      "email": "sarah.j@example.com",
      "healthScore": 87.5,
      "lastInteraction": "2025-11-28T14:32:00Z",
      "interests": [
        {"name": "Tennis", "confidence": 0.92},
        {"name": "Jazz Music", "confidence": 0.88}
      ],
      "insights": {
        "healthScore": 87.5,
        "healthStatus": "GOOD",
        "churnProbability": 0.18,
        "riskLevel": "LOW"
      },
      "upcomingOccasions": [
        {"type": "BIRTHDAY", "date": "2026-05-15"}
      ]
    }
  }
}
```

### 3.4 Example Mutation

```graphql
mutation CreateContactWithInteraction {
  createContact(input: {
    name: "Alex Morgan"
    email: "alex@example.com"
    relationshipType: FRIEND
  }) {
    id
    name
    healthScore
  }
  
  logInteraction(input: {
    contactId: $contactId
    type: EMAIL
    direction: SENT
    content: "Great meeting you at the conference!"
  }) {
    id
    sentiment
  }
}
```

---

## 4. WebSocket Events

### 4.1 Connection

```javascript
const ws = new WebSocket('wss://realtime.oto.ai/v1/events');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'YOUR_ACCESS_TOKEN'
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Event:', message);
};
```

### 4.2 Event Types

#### health_score_updated
```json
{
  "type": "health_score_updated",
  "data": {
    "contact_id": "cnt_7xk2p9mz",
    "previous_score": 85.2,
    "new_score": 87.5,
    "change": 2.3,
    "timestamp": "2025-11-30T10:30:05Z"
  }
}
```

#### churn_alert
```json
{
  "type": "churn_alert",
  "data": {
    "contact_id": "cnt_3k8m2z4p",
    "name": "Mike Chen",
    "health_score": 42.5,
    "risk_level": "high",
    "recommendation": "Reach out within 7 days"
  }
}
```

#### reminder_triggered
```json
{
  "type": "reminder_triggered",
  "data": {
    "reminder_id": "rem_k9j2m4px",
    "contact_id": "cnt_7xk2p9mz",
    "title": "Sarah's Birthday",
    "date": "2026-05-15",
    "type": "birthday"
  }
}
```

---

## 5. Rate Limiting & Quotas

### 5.1 Rate Limits

| Plan | Requests per Minute | Requests per Day |
|------|-------------------|------------------|
| **Free** | 60 | 5,000 |
| **Premium** | 1,000 | 100,000 |
| **Enterprise** | 5,000 | 1,000,000 |

### 5.2 Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1701360000
```

### 5.3 Rate Limit Exceeded (429)

```json
{
  "error": "rate_limit_exceeded",
  "message": "You have exceeded your rate limit of 1000 requests per minute",
  "retry_after": 42
}
```

---

## 6. SDKs & Client Libraries

### 6.1 JavaScript/TypeScript SDK

```bash
npm install @oto-ai/sdk
```

```typescript
import { OtoClient } from '@oto-ai/sdk';

const oto = new OtoClient({
  apiKey: 'YOUR_API_KEY'
});

// Get contacts
const contacts = await oto.contacts.list({ limit: 50 });

// Create contact
const newContact = await oto.contacts.create({
  name: 'John Doe',
  email: 'john@example.com'
});

// Get insights
const insights = await oto.insights.getHealthScore('cnt_7xk2p9mz');

// Gift recommendations
const gifts = await oto.gifts.recommend('cnt_7xk2p9mz', {
  occasion: 'birthday',
  budgetMin: 30,
  budgetMax: 100
});
```

### 6.2 Python SDK

```bash
pip install oto-ai
```

```python
from oto import OtoClient

oto = OtoClient(api_key='YOUR_API_KEY')

# Get contacts
contacts = oto.contacts.list(limit=50)

# Create contact
new_contact = oto.contacts.create(
    name='John Doe',
    email='john@example.com'
)

# Get insights
insights = oto.insights.get_health_score('cnt_7xk2p9mz')

# Gift recommendations
gifts = oto.gifts.recommend(
    contact_id='cnt_7xk2p9mz',
    occasion='birthday',
    budget_min=30,
    budget_max=100
)
```

### 6.3 Mobile SDKs

**iOS (Swift):**
```bash
pod 'OtoSDK'
```

**Android (Kotlin):**
```gradle
implementation 'ai.oto:sdk:1.0.0'
```

---

## Conclusion

OTO's API provides comprehensive access to relationship intelligence features through **REST**, **GraphQL**, and **WebSocket** interfaces, with **99.9% uptime SLA** and **enterprise-grade security**.

**Next:** [Database Schema](./04-database-schema.md)

---

**© 2025 OTO AI Inc. All rights reserved.**
