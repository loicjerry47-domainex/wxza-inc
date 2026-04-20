# HEARb ASSIST - Developer Onboarding

**Pages:** 25

## Setup

```bash
npm install @hearb/sdk

# Initialize
import HEARb from '@hearb/sdk';
HEARb.init({ apiKey: 'hearb_live_abc123' });
```

## Quick Start

```javascript
// Real-time captioning
HEARb.captioning.start({
  language: 'en',
  onTranscript: (text) => console.log(text)
});

// Object recognition
HEARb.vision.recognizeObjects({
  onDetect: (objects) => console.log(objects)
});
```

**© 2025 HEARb ASSIST Inc.**
