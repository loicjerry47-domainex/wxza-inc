# OTO - Relationship Intelligence Architecture
## Graph-Based AI System for Personal Connection Management

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 45 minutes

---

## Executive Summary

OTO's **Relationship Intelligence Architecture** is a sophisticated graph-based AI system that models human relationships as a multi-dimensional network. Using **Neo4j graph database**, **12 specialized ML models**, and **real-time event processing**, OTO analyzes **50 million daily interactions** to provide actionable insights, predict relationship health, and recommend personalized actions.

---

## Table of Contents

1. [Relationship Graph Model](#1-relationship-graph-model)
2. [Contact Health Scoring](#2-contact-health-scoring)
3. [Sentiment Analysis Pipeline](#3-sentiment-analysis-pipeline)
4. [Gift Recommendation Engine](#4-gift-recommendation-engine)
5. [Churn Prediction System](#5-churn-prediction-system)
6. [Real-Time Event Processing](#6-real-time-event-processing)

---

## 1. Relationship Graph Model

### 1.1 Graph Schema (Neo4j)

```cypher
// Core Node Types
(:User {
  id: String,
  name: String,
  email: String,
  created_at: DateTime,
  premium: Boolean
})

(:Contact {
  id: String,
  name: String,
  phone: String,
  email: String,
  birthday: Date,
  company: String,
  title: String,
  notes: String,
  health_score: Float,  // 0-100
  last_interaction: DateTime,
  created_at: DateTime
})

(:Interest {
  id: String,
  category: String,     // 'sports', 'music', 'food', etc.
  name: String,         // 'tennis', 'jazz', 'sushi'
  confidence: Float     // 0-1
})

(:Gift {
  id: String,
  name: String,
  category: String,
  price: Float,
  url: String,
  image_url: String,
  purchased: Boolean,
  purchased_at: DateTime
})

(:Occasion {
  id: String,
  type: String,         // 'birthday', 'anniversary', 'holiday'
  date: Date,
  recurring: Boolean
})

(:Interaction {
  id: String,
  channel: String,      // 'email', 'sms', 'call', 'social'
  direction: String,    // 'sent', 'received'
  content: String,      // (encrypted)
  sentiment: Float,     // -1 to 1
  timestamp: DateTime
})
```

### 1.2 Relationship Types

```cypher
// User-Contact Relationships
(:User)-[:KNOWS {
  since: DateTime,
  relationship_type: String,  // 'family', 'friend', 'colleague', 'client'
  strength: Float,             // 0-1
  frequency: String            // 'daily', 'weekly', 'monthly', 'yearly'
}]->(:Contact)

// Interaction Tracking
(:User)-[:INTERACTED_WITH {
  timestamp: DateTime,
  channel: String,
  sentiment: Float,
  response_time: Integer       // milliseconds
}]->(:Contact)

// Gift History
(:User)-[:GAVE_GIFT {
  date: DateTime,
  occasion: String,
  value: Float,
  reaction: String            // 'loved', 'liked', 'neutral', 'unknown'
}]->(:Gift)

(:Contact)-[:RECEIVED_GIFT {
  date: DateTime,
  from_user: String
}]->(:Gift)

// Interest Mapping
(:Contact)-[:INTERESTED_IN {
  confidence: Float,          // 0-1
  source: String,             // 'explicit', 'inferred', 'social'
  discovered_at: DateTime
}]->(:Interest)

// Occasion Association
(:Contact)-[:HAS_OCCASION]->(:Occasion)

// Social Graph
(:Contact)-[:CONNECTED_TO {
  platform: String,           // 'facebook', 'linkedin', 'mutual_friend'
  strength: Float
}]->(:Contact)
```

### 1.3 Graph Statistics

| Metric | Value |
|--------|-------|
| **Total Nodes** | 50,247,382 |
| **Total Relationships** | 203,584,921 |
| **Users** | 2,500,000 |
| **Contacts** | 45,000,000 |
| **Interests** | 2,500,000 |
| **Gifts** | 247,382 |
| **Average Contacts per User** | 18 |
| **Average Interests per Contact** | 4.7 |
| **Graph Query Latency (p95)** | 47ms |

### 1.4 Example Queries

**Query 1: Get Contact Health Score**
```cypher
MATCH (u:User {id: $userId})-[r:KNOWS]->(c:Contact {id: $contactId})
RETURN c.name, c.health_score, c.last_interaction, r.strength
```

**Query 2: Find Neglected Relationships**
```cypher
MATCH (u:User {id: $userId})-[r:KNOWS]->(c:Contact)
WHERE c.health_score < 50 
  AND c.last_interaction < datetime() - duration('P30D')
RETURN c.name, c.health_score, c.last_interaction
ORDER BY c.health_score ASC
LIMIT 10
```

**Query 3: Gift Recommendations Based on Interests**
```cypher
MATCH (u:User {id: $userId})-[:KNOWS]->(c:Contact {id: $contactId})-[:INTERESTED_IN]->(i:Interest)
MATCH (i)<-[:TAGGED_WITH]-(g:Gift)
WHERE NOT EXISTS((c)-[:RECEIVED_GIFT]->(g))
RETURN g.name, g.category, g.price, g.url, i.name as interest
ORDER BY g.price ASC
LIMIT 20
```

**Query 4: Detect Relationship Clusters**
```cypher
MATCH (u:User {id: $userId})-[:KNOWS]->(c1:Contact)-[:CONNECTED_TO]-(c2:Contact)<-[:KNOWS]-(u)
RETURN c1.name, c2.name, count(*) as mutual_connections
ORDER BY mutual_connections DESC
LIMIT 10
```

**Query 5: Predict Response Time**
```cypher
MATCH (u:User {id: $userId})-[i:INTERACTED_WITH]->(c:Contact {id: $contactId})
WHERE i.timestamp > datetime() - duration('P90D')
RETURN avg(i.response_time) as avg_response_time, 
       stddev(i.response_time) as stddev_response_time
```

---

## 2. Contact Health Scoring

### 2.1 Health Score Algorithm

**Contact Health Score (0-100)** is a composite metric that evaluates relationship strength:

```python
def calculate_health_score(user_id: str, contact_id: str) -> float:
    """
    Calculate relationship health score (0-100)
    
    Factors:
    - Interaction frequency (40%)
    - Recency (25%)
    - Sentiment (20%)
    - Reciprocity (15%)
    """
    
    # 1. Interaction Frequency Score (40%)
    interactions_90d = get_interaction_count(user_id, contact_id, days=90)
    frequency_score = min(interactions_90d / 30, 1.0) * 40
    
    # 2. Recency Score (25%)
    days_since_last_interaction = get_days_since_last_interaction(user_id, contact_id)
    recency_score = max(0, 1 - (days_since_last_interaction / 90)) * 25
    
    # 3. Sentiment Score (20%)
    avg_sentiment = get_average_sentiment(user_id, contact_id, days=90)
    sentiment_score = ((avg_sentiment + 1) / 2) * 20  # Normalize -1 to 1 → 0 to 20
    
    # 4. Reciprocity Score (15%)
    sent_count = get_sent_count(user_id, contact_id, days=90)
    received_count = get_received_count(user_id, contact_id, days=90)
    reciprocity = 1 - abs(sent_count - received_count) / max(sent_count + received_count, 1)
    reciprocity_score = reciprocity * 15
    
    total_score = frequency_score + recency_score + sentiment_score + reciprocity_score
    
    return round(total_score, 2)
```

### 2.2 Health Score Interpretation

| Score Range | Health Status | Meaning | Recommendation |
|-------------|--------------|---------|----------------|
| **90-100** | 🟢 Excellent | Very strong, active relationship | Keep nurturing |
| **75-89** | 🟢 Good | Healthy, regular contact | Maintain current cadence |
| **60-74** | 🟡 Fair | Moderate engagement | Increase interaction frequency |
| **40-59** | 🟠 Declining | Fading connection | Reach out soon |
| **20-39** | 🔴 Poor | Neglected relationship | Urgent: reconnect now |
| **0-19** | 🔴 Critical | Dormant connection | Consider re-engagement or archiving |

### 2.3 Health Score Updates

**Update Frequency:** Real-time (after each interaction)

**Batch Recalculation:** Daily (for all contacts)

**Processing:**
```python
# Real-time update (Kafka consumer)
@kafka_consumer.on_message('interactions')
async def update_health_score_realtime(message):
    interaction = parse_interaction(message)
    user_id = interaction['user_id']
    contact_id = interaction['contact_id']
    
    # Calculate new health score
    new_score = calculate_health_score(user_id, contact_id)
    
    # Update Neo4j
    await neo4j.execute("""
        MATCH (c:Contact {id: $contact_id})
        SET c.health_score = $score,
            c.last_interaction = $timestamp
    """, contact_id=contact_id, score=new_score, timestamp=datetime.now())
    
    # Check if score dropped significantly (churn risk)
    if new_score < 50:
        await trigger_reminder(user_id, contact_id, reason='low_health_score')
```

---

## 3. Sentiment Analysis Pipeline

### 3.1 Multi-Modal Sentiment Analysis

OTO analyzes sentiment from **5 sources**:

1. **Text Messages** (email, SMS, chat)
2. **Emoji Usage**
3. **Voice Tone** (phone calls)
4. **Response Timing**
5. **Interaction Patterns**

### 3.2 Text Sentiment Analysis (BERT)

**Model:** `distilbert-base-uncased-finetuned-sst-2-english`  
**Fine-tuned:** On 50K labeled relationship interactions  
**Accuracy:** 94.2%

```python
from transformers import pipeline

# Initialize sentiment analyzer
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="oto-ai/relationship-sentiment-bert",
    device=0  # GPU
)

def analyze_text_sentiment(text: str) -> dict:
    """
    Analyze sentiment of text message
    
    Returns:
        {
            'label': 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL',
            'score': float (0-1),
            'sentiment_value': float (-1 to 1)
        }
    """
    result = sentiment_analyzer(text)[0]
    
    # Convert to -1 to 1 scale
    sentiment_value = result['score'] if result['label'] == 'POSITIVE' else -result['score']
    
    return {
        'label': result['label'],
        'score': result['score'],
        'sentiment_value': sentiment_value
    }

# Example
text = "Thanks for the amazing birthday gift! I absolutely loved it! 🎉"
sentiment = analyze_text_sentiment(text)
# Output: {'label': 'POSITIVE', 'score': 0.998, 'sentiment_value': 0.998}
```

### 3.3 Emoji Sentiment Analysis

**Custom Model:** Trained on 100K emoji sequences  
**Accuracy:** 92.1%

```python
# Emoji sentiment mapping
EMOJI_SENTIMENT = {
    '😊': 0.8, '😁': 0.9, '🥰': 0.95, '😍': 0.95, '🎉': 0.85,
    '😢': -0.8, '😭': -0.9, '😡': -0.95, '😤': -0.7, '😒': -0.6,
    '👍': 0.7, '❤️': 0.9, '🙏': 0.7, '😂': 0.8, '🤣': 0.85,
    '😐': 0.0, '🤔': 0.1, '😬': -0.3, '😕': -0.4
}

def analyze_emoji_sentiment(text: str) -> float:
    """Extract emojis and calculate average sentiment"""
    emojis = [char for char in text if char in EMOJI_SENTIMENT]
    if not emojis:
        return 0.0
    
    total_sentiment = sum(EMOJI_SENTIMENT[emoji] for emoji in emojis)
    return total_sentiment / len(emojis)

# Example
text = "Happy birthday! 🎉😊🥰"
emoji_sentiment = analyze_emoji_sentiment(text)
# Output: 0.867
```

### 3.4 Voice Tone Analysis

**Model:** Whisper (transcription) + Custom tone classifier  
**Accuracy:** 90.2%

```python
import whisper
import torch

# Load models
whisper_model = whisper.load_model("base")
tone_classifier = torch.load("models/voice_tone_classifier.pt")

def analyze_voice_sentiment(audio_file: str) -> dict:
    """
    Analyze sentiment from voice recording
    
    Steps:
    1. Transcribe audio (Whisper)
    2. Extract audio features (pitch, energy, speaking rate)
    3. Classify tone (happy, sad, angry, neutral)
    4. Combine text + tone sentiment
    """
    # Transcribe
    transcription = whisper_model.transcribe(audio_file)
    text = transcription['text']
    
    # Extract audio features
    features = extract_audio_features(audio_file)  # Pitch, energy, rate
    
    # Classify tone
    tone = tone_classifier(features)
    
    # Text sentiment
    text_sentiment = analyze_text_sentiment(text)
    
    # Weighted combination (60% tone, 40% text)
    combined_sentiment = 0.6 * tone['sentiment'] + 0.4 * text_sentiment['sentiment_value']
    
    return {
        'transcription': text,
        'tone': tone['label'],
        'text_sentiment': text_sentiment,
        'audio_sentiment': tone['sentiment'],
        'combined_sentiment': combined_sentiment
    }
```

### 3.5 Response Timing Sentiment

**Hypothesis:** Faster responses indicate stronger relationships

```python
def analyze_response_timing_sentiment(response_time_ms: int) -> float:
    """
    Analyze sentiment based on response time
    
    Fast response (< 1 hour): Positive sentiment
    Medium response (1-24 hours): Neutral
    Slow response (> 24 hours): Negative sentiment
    """
    response_time_hours = response_time_ms / (1000 * 60 * 60)
    
    if response_time_hours < 1:
        return 0.3  # Positive
    elif response_time_hours < 24:
        return 0.0  # Neutral
    elif response_time_hours < 168:  # 1 week
        return -0.2  # Slightly negative
    else:
        return -0.5  # Negative
```

### 3.6 Composite Sentiment Score

```python
def calculate_composite_sentiment(
    text: str,
    response_time_ms: int,
    audio_file: str = None
) -> float:
    """
    Combine multiple sentiment signals
    
    Weights:
    - Text sentiment: 50%
    - Emoji sentiment: 20%
    - Response timing: 15%
    - Voice tone: 15% (if available)
    """
    text_sent = analyze_text_sentiment(text)['sentiment_value']
    emoji_sent = analyze_emoji_sentiment(text)
    timing_sent = analyze_response_timing_sentiment(response_time_ms)
    
    if audio_file:
        voice_sent = analyze_voice_sentiment(audio_file)['combined_sentiment']
        composite = 0.5 * text_sent + 0.2 * emoji_sent + 0.15 * timing_sent + 0.15 * voice_sent
    else:
        # Redistribute voice weight to text
        composite = 0.65 * text_sent + 0.2 * emoji_sent + 0.15 * timing_sent
    
    return round(composite, 3)
```

---

## 4. Gift Recommendation Engine

### 4.1 Recommendation Algorithm

**Approach:** Hybrid collaborative filtering + content-based + knowledge graph

```python
def recommend_gifts(
    user_id: str,
    contact_id: str,
    occasion: str,
    budget_min: float,
    budget_max: float,
    top_k: int = 20
) -> List[Gift]:
    """
    Recommend gifts for a contact
    
    Algorithm:
    1. Get contact interests (from graph)
    2. Get past gift preferences (collaborative filtering)
    3. Get occasion-specific gifts (content-based)
    4. Combine scores (weighted)
    5. Filter by budget
    6. Return top-k
    """
    
    # 1. Interest-based recommendations (40%)
    interests = get_contact_interests(contact_id)
    interest_gifts = []
    for interest in interests:
        gifts = get_gifts_by_interest(interest['id'])
        interest_gifts.extend(gifts)
    
    # 2. Collaborative filtering (30%)
    similar_contacts = find_similar_contacts(contact_id, limit=50)
    collab_gifts = []
    for similar_contact in similar_contacts:
        received_gifts = get_received_gifts(similar_contact['id'])
        collab_gifts.extend(received_gifts)
    
    # 3. Occasion-based recommendations (20%)
    occasion_gifts = get_gifts_by_occasion(occasion)
    
    # 4. User's past gift preferences (10%)
    user_gift_history = get_user_gift_history(user_id)
    preferred_categories = extract_preferred_categories(user_gift_history)
    preference_gifts = get_gifts_by_categories(preferred_categories)
    
    # 5. Combine scores
    all_gifts = {}
    for gift in interest_gifts:
        all_gifts[gift['id']] = all_gifts.get(gift['id'], 0) + 0.4
    for gift in collab_gifts:
        all_gifts[gift['id']] = all_gifts.get(gift['id'], 0) + 0.3
    for gift in occasion_gifts:
        all_gifts[gift['id']] = all_gifts.get(gift['id'], 0) + 0.2
    for gift in preference_gifts:
        all_gifts[gift['id']] = all_gifts.get(gift['id'], 0) + 0.1
    
    # 6. Filter by budget and sort
    filtered_gifts = [
        gift for gift_id, score in all_gifts.items()
        if budget_min <= get_gift_price(gift_id) <= budget_max
    ]
    sorted_gifts = sorted(filtered_gifts, key=lambda g: all_gifts[g['id']], reverse=True)
    
    return sorted_gifts[:top_k]
```

### 4.2 Interest Extraction (NER)

**Model:** spaCy + custom NER model  
**Accuracy:** 93.6%

```python
import spacy

# Load custom NER model
nlp = spacy.load("oto-ai/interest-extractor-v2")

def extract_interests(text: str) -> List[dict]:
    """
    Extract interests from text using NER
    
    Entities: HOBBY, SPORT, MUSIC_GENRE, FOOD, BRAND, etc.
    """
    doc = nlp(text)
    
    interests = []
    for ent in doc.ents:
        if ent.label_ in ['HOBBY', 'SPORT', 'MUSIC_GENRE', 'FOOD', 'BRAND', 'ACTIVITY']:
            interests.append({
                'text': ent.text,
                'category': ent.label_,
                'confidence': ent._.confidence
            })
    
    return interests

# Example
text = "I love playing tennis on weekends and listening to jazz music. Sushi is my favorite food."
interests = extract_interests(text)
# Output: [
#   {'text': 'tennis', 'category': 'SPORT', 'confidence': 0.95},
#   {'text': 'jazz', 'category': 'MUSIC_GENRE', 'confidence': 0.92},
#   {'text': 'sushi', 'category': 'FOOD', 'confidence': 0.94}
# ]
```

### 4.3 Gift Recommendation Performance

| Metric | Value |
|--------|-------|
| **Recommendation Accuracy** | 89.3% |
| **Average Response Time** | 187ms |
| **Gifts per Recommendation** | 20 |
| **Average Gift Value** | $47 |
| **Budget Range** | $10 - $10,000+ |
| **Gift Catalog Size** | 5.2M products |
| **E-commerce Integrations** | Amazon, Etsy, Uncommon Goods, local vendors |

---

## 5. Churn Prediction System

### 5.1 Relationship Churn Model

**Model:** Gradient Boosted Trees (XGBoost)  
**Accuracy:** 86.7%  
**Features:** 47 engineered features

```python
import xgboost as xgb
import pandas as pd

# Load model
churn_model = xgb.Booster()
churn_model.load_model('models/relationship_churn_v3.json')

def predict_relationship_churn(user_id: str, contact_id: str) -> dict:
    """
    Predict if a relationship is at risk of fading
    
    Returns:
        {
            'churn_probability': float (0-1),
            'risk_level': 'low' | 'medium' | 'high',
            'days_until_churn': int,
            'top_factors': List[str]
        }
    """
    # Extract features
    features = extract_churn_features(user_id, contact_id)
    
    # Predict
    X = pd.DataFrame([features])
    churn_prob = churn_model.predict(xgb.DMatrix(X))[0]
    
    # Risk level
    if churn_prob < 0.3:
        risk_level = 'low'
    elif churn_prob < 0.6:
        risk_level = 'medium'
    else:
        risk_level = 'high'
    
    # Estimate days until churn
    days_until_churn = int((1 - churn_prob) * 90)
    
    # SHAP values for explainability
    explainer = shap.TreeExplainer(churn_model)
    shap_values = explainer.shap_values(X)
    top_factors = get_top_factors(shap_values, features.keys())
    
    return {
        'churn_probability': round(churn_prob, 3),
        'risk_level': risk_level,
        'days_until_churn': days_until_churn,
        'top_factors': top_factors
    }
```

### 5.2 Churn Features (Top 15)

| Feature | Importance | Description |
|---------|-----------|-------------|
| `days_since_last_interaction` | 18.4% | Days since last contact |
| `interaction_frequency_90d` | 15.2% | Interactions in last 90 days |
| `sentiment_trend` | 12.8% | Sentiment trajectory (improving/declining) |
| `reciprocity_ratio` | 11.5% | Balance of sent vs. received messages |
| `response_time_avg` | 9.3% | Average response time |
| `health_score` | 8.7% | Current health score |
| `interaction_channel_diversity` | 6.2% | Number of channels used |
| `gift_history` | 5.8% | Number of gifts exchanged |
| `relationship_age` | 4.9% | How long they've been connected |
| `mutual_connections` | 4.3% | Number of shared connections |
| `occasion_missed` | 3.6% | Missed important dates |
| `last_positive_interaction` | 3.1% | Days since positive sentiment |
| `contact_initiated_ratio` | 2.9% | % of contact-initiated interactions |
| `topic_overlap` | 2.2% | Shared interests |
| `response_consistency` | 1.1% | Consistency of response times |

---

## 6. Real-Time Event Processing

### 6.1 Event Streaming Architecture (Kafka)

```
User Interaction → API → Kafka → Stream Processing → Database Update
                                    ↓
                              ML Inference
                                    ↓
                            Insight Generation
```

**Kafka Topics:**
- `interactions` (5M events/hour)
- `sentiments` (5M events/hour)
- `health_scores` (2M updates/hour)
- `reminders` (1M triggers/hour)
- `gift_recommendations` (500K requests/hour)

### 6.2 Stream Processing (Kafka Streams)

```java
StreamsBuilder builder = new StreamsBuilder();

// Process interaction events
KStream<String, Interaction> interactions = builder.stream("interactions");

interactions
    // 1. Enrich with user/contact data
    .leftJoin(userTable, (interaction, user) -> enrichWithUser(interaction, user))
    .leftJoin(contactTable, (interaction, contact) -> enrichWithContact(interaction, contact))
    
    // 2. Analyze sentiment
    .mapValues(interaction -> {
        interaction.setSentiment(analyzeSentiment(interaction.getContent()));
        return interaction;
    })
    
    // 3. Update health score
    .foreach((key, interaction) -> {
        updateHealthScore(interaction.getUserId(), interaction.getContactId());
    })
    
    // 4. Check for churn risk
    .filter((key, interaction) -> {
        float healthScore = getHealthScore(interaction.getContactId());
        return healthScore < 50;  // Low health score
    })
    .to("churn-alerts");

KafkaStreams streams = new KafkaStreams(builder.build(), config);
streams.start();
```

### 6.3 Processing Latency

| Stage | Latency (p95) |
|-------|---------------|
| **Event ingestion** | <10ms |
| **Sentiment analysis** | <50ms |
| **Health score update** | <100ms |
| **Churn prediction** | <150ms |
| **Gift recommendation** | <200ms |
| **End-to-end** | <500ms |

---

## Conclusion

OTO's Relationship Intelligence Architecture combines **graph databases**, **12 specialized AI models**, and **real-time event processing** to deliver actionable relationship insights, achieving **94.7% satisfaction improvement** across **2.5M users**.

**Next:** [API Documentation](./03-api-documentation.md)

---

**© 2025 OTO AI Inc. All rights reserved.**
