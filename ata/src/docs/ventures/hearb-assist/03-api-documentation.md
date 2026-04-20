# HEARb ASSIST - API Documentation

**Pages:** 20

## Mobile SDK

```javascript
import HEARb from '@hearb/sdk';

// Real-time captioning
HEARb.captioning.start({
  language: 'en',
  onTranscript: (text) => {
    console.log('Transcript:', text);
  }
});

// Object recognition
HEARb.vision.recognizeObjects({
  onDetect: (objects) => {
    objects.forEach(obj => {
      console.log(`${obj.label}: ${obj.confidence}`);
    });
  }
});

// Sound recognition
HEARb.audio.listenForSounds({
  sounds: ['doorbell', 'alarm', 'baby_crying'],
  onDetect: (sound) => {
    HEARb.notify(`Sound detected: ${sound.label}`);
  }
});
```

**© 2025 HEARb ASSIST Inc.**
