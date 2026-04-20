# HEARb ASSIST - Speech Recognition System

**Pages:** 50

## Whisper Model

**Architecture:** Transformer (encoder-decoder)  
**Size:** 244M parameters (medium variant)  
**Training Data:** 680K hours (multilingual)

### Performance

| Metric | Value |
|--------|-------|
| **Word Error Rate (WER)** | 4.2% (clean speech) |
| **Latency** | 180ms (p50), 220ms (p95) |
| **Languages** | 95 |
| **Accuracy (noisy)** | 89% |

### On-Device Optimization

```python
# Quantize model (FP32 → INT8)
import torch
from torch.quantization import quantize_dynamic

model = whisper.load_model("medium")
quantized_model = quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)
# 4× smaller, 3× faster, minimal accuracy loss
```

**© 2025 HEARb ASSIST Inc.**
