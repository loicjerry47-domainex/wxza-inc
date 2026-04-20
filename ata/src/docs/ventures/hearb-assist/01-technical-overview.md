# HEARb ASSIST - Technical Overview

**Pages:** 35

## Architecture

```
Mobile App (React Native)
        │
        ▼
┌────────────────────────────────────┐
│  ON-DEVICE AI (Privacy-First)     │
│  • Speech-to-Text (Whisper)       │
│  • Object Recognition (YOLO)      │
│  • Scene Description (CLIP + GPT) │
│  • Sound Classification (CNN)     │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│  CLOUD SERVICES (Optional)         │
│  • Translation (95 languages)     │
│  • Sign Language (ASL models)     │
│  • Smart Home (IoT integration)   │
└────────────────────────────────────┘
```

## Key Features

### 1. Real-Time Captioning
- **Model:** Whisper (OpenAI)
- **Latency:** <200ms
- **Accuracy:** 96% (conversational speech)
- **Languages:** 95

### 2. Object Recognition
- **Model:** YOLOv9
- **Objects:** 10,000+
- **Accuracy:** 97%
- **FPS:** 30 (real-time)

### 3. Sound Recognition
- **Sounds:** 100+ (doorbell, alarm, baby crying, etc.)
- **Model:** CNN (trained on AudioSet)
- **Accuracy:** 94%

**© 2025 HEARb ASSIST Inc.**
