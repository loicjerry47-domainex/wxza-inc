# LENSSTORM - API Documentation
## LensOS SDK & Developer APIs

**Last Updated:** November 30, 2025  
**Document Version:** 1.0  
**Reading Time:** 25 minutes

---

## Executive Summary

LENSSTORM's **LensOS SDK** provides comprehensive APIs for AR app development, including **spatial computing**, **object recognition**, **real-time translation**, and **gesture control**. Developers can build using **Unity**, **Unreal Engine**, or **native Kotlin/Swift**. SDK supports **5,000+ published apps** with **99.9% uptime** and **<50ms API response time**.

---

## Quick Start

### Installation

```bash
# Unity SDK
npm install @lensstorm/unity-sdk

# Native SDK (Android/Kotlin)
implementation 'ai.lensstorm:sdk:2.1.0'

# Native SDK (iOS/Swift)
pod 'LensStormSDK', '~> 2.1.0'
```

### Hello World AR

```kotlin
// Kotlin - Display "Hello AR" text in user's view
import ai.lensstorm.sdk.LensOS
import ai.lensstorm.sdk.ar.ARText

class HelloARApp : LensOSActivity() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize LensOS
        LensOS.initialize(this)
        
        // Create AR text overlay
        val helloText = ARText(
            text = "Hello AR!",
            position = Vector3(0f, 0f, -2f), // 2m in front of user
            fontSize = 48,
            color = Color.WHITE
        )
        
        // Add to AR scene
        LensOS.ar.addObject(helloText)
    }
}
```

---

## Core APIs

### 1. Spatial Computing API

```kotlin
// Track surfaces (planes, walls, tables)
LensOS.spatial.detectPlanes { planes ->
    planes.forEach { plane ->
        println("Found plane: ${plane.type}, size: ${plane.width}x${plane.height}")
    }
}

// Place AR object on detected plane
LensOS.spatial.placeObject(
    object = my3DModel,
    targetPlane = planes[0],
    onPlaced = { anchor ->
        println("Object placed at: ${anchor.position}")
    }
)
```

### 2. Object Recognition API

```kotlin
// Recognize objects in camera view
LensOS.vision.recognizeObjects { objects ->
    objects.forEach { obj ->
        println("Detected: ${obj.label} (${obj.confidence})")
        
        // Highlight object with AR overlay
        LensOS.ar.highlightObject(
            boundingBox = obj.boundingBox,
            label = obj.label,
            color = Color.GREEN
        )
    }
}
```

### 3. Translation API

```kotlin
// Real-time text translation
LensOS.translation.translateCamera(
    targetLanguage = "en",
    onTranslation = { result ->
        result.forEach { translation ->
            LensOS.ar.overlayText(
                originalText = translation.original,
                translatedText = translation.translated,
                position = translation.position
            )
        }
    }
)
```

### 4. Gesture Control API

```kotlin
// Detect hand gestures
LensOS.gesture.onGesture(GestureType.TAP) { gesture ->
    println("Tapped at: ${gesture.position}")
    // Trigger action
}

LensOS.gesture.onGesture(GestureType.SWIPE_LEFT) {
    // Navigate left
}
```

### 5. Voice Assistant API

```kotlin
// Voice commands
LensOS.voice.onCommand("navigate to") { destination ->
    LensOS.navigation.startNavigation(destination)
}

LensOS.voice.speak("Navigation started")
```

---

## Complete API Reference

**Documentation:** https://developers.lensstorm.ai/api  
**Sample Apps:** https://github.com/lensstorm/samples

---

**© 2025 LENSSTORM Inc. All rights reserved.**
