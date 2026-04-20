# INECT - Video Streaming Architecture

**Pages:** 50

## Multi-Camera System

### Production Setup

**6 Camera Configuration:**
1. **Main Stage** (4K, 60fps) - Wide shot
2. **Close-Up** (4K, 60fps) - Artist focus
3. **Crowd** (4K, 30fps) - Audience energy
4. **Overhead** (4K, 30fps) - Bird's eye view
5. **Backstage** (1080p, 30fps) - Behind-the-scenes
6. **Mobile** (1080p, 60fps) - Roaming camera

### Camera Switching

**Manual Mode:** Director switches via control panel  
**AI Mode:** ML model auto-switches based on:
- Audio levels (switch to performer when singing)
- Motion detection (crowd goes wild → crowd cam)
- Beat detection (switch on beat for music events)

```python
# AI Camera Switching
class CameraSwitcher:
    def __init__(self):
        self.audio_model = AudioLevelDetector()
        self.motion_model = MotionDetector()
        self.beat_model = BeatDetector()
    
    def select_camera(self, cameras, audio, video):
        """
        Select optimal camera based on AI analysis
        
        Returns: camera_index (0-5)
        """
        # Analyze audio (who's speaking/singing?)
        audio_levels = self.audio_model.detect(audio)
        
        # Analyze motion (crowd energy)
        crowd_energy = self.motion_model.detect(video['crowd_cam'])
        
        # Detect beats (music timing)
        beat_detected = self.beat_model.detect(audio)
        
        # Decision logic
        if crowd_energy > 0.8:
            return 2  # Crowd cam
        elif beat_detected and random() < 0.3:
            return 0  # Main stage (on beat)
        elif audio_levels['performer'] > 0.5:
            return 1  # Close-up
        else:
            return 0  # Default: Main stage
```

---

## Encoding Pipeline

### AWS Media Live

**Input:** 6× 4K camera feeds  
**Output:** Adaptive bitrate ladder (6 renditions)

| Resolution | Bitrate | FPS | Codec |
|-----------|---------|-----|-------|
| 2160p (4K) | 25 Mbps | 60 | H.265 |
| 1080p (FHD) | 8 Mbps | 60 | H.265 |
| 720p (HD) | 4 Mbps | 30 | H.265 |
| 540p | 2 Mbps | 30 | H.264 |
| 360p | 1 Mbps | 30 | H.264 |
| 240p | 0.5 Mbps | 30 | H.264 |

### H.265 vs H.264

**H.265 (HEVC):**
- 50% better compression (same quality, half bandwidth)
- Higher CPU cost (encoding)
- Supported on iOS 11+, Android 5.0+

```bash
# FFmpeg encoding command
ffmpeg -i input.mp4 \
  -c:v libx265 \
  -preset medium \
  -crf 23 \
  -b:v 8M \
  -maxrate 10M \
  -bufsize 20M \
  -c:a aac \
  -b:a 192k \
  output.m3u8
```

---

## Streaming Protocols

### WebRTC (Low Latency)

**Latency:** <500ms (sub-second)  
**Use Case:** Interactive events (Q&A, live voting)  
**Limitation:** Max 10K concurrent viewers per edge server

```javascript
// WebRTC Player
const pc = new RTCPeerConnection();

// Get video stream from server
const offer = await fetch('/api/webrtc/offer');
await pc.setRemoteDescription(offer);

// Display stream
const stream = new MediaStream(pc.getReceivers().map(r => r.track));
videoElement.srcObject = stream;
```

### HLS (Compatibility)

**Latency:** 6-10 seconds  
**Use Case:** Large-scale broadcasts (>10K viewers)  
**Advantage:** Works everywhere (iOS, Android, web)

```javascript
// HLS Player (using hls.js)
const hls = new Hls();
hls.loadSource('https://stream.inect.live/event123/master.m3u8');
hls.attachMedia(videoElement);
```

---

## Spatial Audio

### Dolby Atmos

**Configuration:** 7.1.4 (7 channels + 1 sub + 4 overhead)

```
Speaker Layout:

    FL ─────── FC ─────── FR
     │                     │
     │     [STAGE]         │
     │                     │
    SL                    SR
     │                     │
     │    [CROWD]          │
     │                     │
    BL ─────── BC ─────── BR
    
    + 4 overhead speakers (TFL, TFR, TBL, TBR)
    + 1 subwoofer (LFE)
```

**Audio Mixing:**
```python
# Spatial audio mix (Dolby Atmos)
def mix_spatial_audio(stage_mics, crowd_mics, overhead_mics):
    """
    Create immersive 3D audio experience
    
    Returns: Dolby Atmos 7.1.4 mix
    """
    mix = DolbyAtmosMixer()
    
    # Stage audio (front channels)
    mix.add_source(stage_mics, position='front_center', elevation=0)
    
    # Crowd audio (surround channels)
    mix.add_source(crowd_mics, position='surround', elevation=0)
    
    # Overhead audio (height channels)
    mix.add_source(overhead_mics, position='top', elevation=90)
    
    # Bass (subwoofer)
    mix.add_lfe(stage_mics, cutoff_frequency=120)  # <120 Hz
    
    return mix.render()
```

---

## CDN Distribution

### CloudFlare Stream

**Edge Locations:** 200+ cities globally  
**Bandwidth:** 100+ Tbps aggregate  
**Pricing:** $1 per 1,000 minutes streamed

**Traffic Routing:**
```
User in Tokyo → Tokyo edge server (5ms RTT)
User in NYC → NYC edge server (8ms RTT)
User in London → London edge server (12ms RTT)

Origin (AWS us-east-1) → CloudFlare → Edge Servers → Users
```

**Auto-Scaling:**
```yaml
# CloudFlare Stream config
stream:
  max_concurrent_viewers: 1000000
  auto_scale: true
  failover: true
  geo_blocking: false
  drm: widevine
```

---

## Viewer Experience

### Adaptive Bitrate (ABR)

**Algorithm:** Estimate bandwidth → select optimal quality

```javascript
// ABR Logic
class AdaptiveBitrateController {
    selectQuality(availableBandwidth, currentBufferLevel) {
        // Available qualities (bitrates)
        const qualities = [
            { resolution: '4K', bitrate: 25000000 },
            { resolution: '1080p', bitrate: 8000000 },
            { resolution: '720p', bitrate: 4000000 },
            { resolution: '360p', bitrate: 1000000 }
        ];
        
        // Select quality with 80% headroom
        const targetBitrate = availableBandwidth * 0.8;
        
        for (const quality of qualities) {
            if (quality.bitrate <= targetBitrate) {
                return quality;
            }
        }
        
        return qualities[qualities.length - 1];  // Lowest quality
    }
}
```

---

## Interactive Features

### Live Chat

**WebSocket:** Real-time messaging (sub-100ms)  
**Scale:** 1M concurrent users per event  
**Rate Limiting:** 10 messages/minute per user

```javascript
// WebSocket chat
const ws = new WebSocket('wss://chat.inect.live/event123');

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    displayChatMessage(message);
};

// Send message
ws.send(JSON.stringify({
    type: 'chat',
    text: 'Amazing show! 🔥'
}));
```

### Live Reactions

**Emojis:** ❤️ 🔥 👏 😂 😮 (float up screen)  
**Implementation:** WebSocket broadcast to all viewers

```javascript
// Send reaction
function sendReaction(emoji) {
    ws.send(JSON.stringify({
        type: 'reaction',
        emoji: emoji
    }));
}

// Receive and display
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'reaction') {
        animateEmoji(data.emoji);  // Float up screen
    }
};
```

---

**© 2025 INECT Inc. All rights reserved.**
