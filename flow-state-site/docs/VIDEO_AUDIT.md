# Video Quality Audit

> **Created:** January 22, 2026  
> **Status:** Audit Complete  
> **Purpose:** Document video quality issues and optimization decisions

---

## Summary

| Metric | Before | Target | After |
|--------|--------|--------|-------|
| Total MP4 Size | 84MB | <25MB | **1.8MB** |
| Total WebM Size | — | <15MB | **3.2MB** |
| Posters Size | — | <1MB | **144KB** |
| Largest File (MP4) | 31MB | <5MB | **521KB** (driver-qr-scan.mp4) |
| Largest File (WebM) | — | <5MB | **1.1MB** (Machine-vision-video.webm) |
| Average Bitrate | Variable | ~1Mbps | ~0.35–1Mbps (post-CRF) |

---

## Video Inventory

### 1. Machine-vision-video.mp4
- **Size:** 31MB → **488KB**
- **Quality Issues:**
  - Oversized for web delivery
  - Compression artifacts visible
  - Audio track (unnecessary for demo)
- **Decision:** ✅ OPTIMIZE
- **Target:** <5MB
- **Optimization:**
  - Re-encode with CRF 30 (aggressive)
  - Scale to 1280x720
  - Strip audio track
  - WebM (VP9) + poster frame

### 2. pickup-vs-delivery-video.mp4
- **Size:** 16MB → **381KB**
- **Quality Issues:**
  - Figma export banding
  - Aspect ratio may need adjustment
- **Decision:** ✅ OPTIMIZE
- **Target:** <3MB
- **Optimization:**
  - Re-encode with CRF 30
  - Scale to 1280x720

### 3. driver-qr-scan.mp4
- **Size:** 13MB → **521KB** (largest remaining)
- **Quality Issues:**
  - Lower resolution source
  - Could benefit from sharpening
- **Decision:** ✅ OPTIMIZE
- **Target:** <3MB
- **Optimization:**
  - Re-encode with CRF 28
  - Maintain original resolution

### 4. Smart-bol-kiosk.mp4
- **Size:** 7.4MB → **102KB**
- **Quality Issues:**
  - Frame rate stuttering
  - Some compression artifacts
- **Decision:** ✅ OPTIMIZE
- **Target:** <2MB
- **Optimization:**
  - Re-encode with CRF 28
  - Ensure consistent frame rate

### 5. kiosk-demo.mp4
- **Size:** 7.5MB → **237KB**
- **Quality Issues:**
  - Inconsistent padding/margins
  - Could be smaller
- **Decision:** ✅ OPTIMIZE
- **Target:** <2MB
- **Optimization:**
  - Re-encode with CRF 28

### 6. two-way-comms.mp4
- **Size:** 6.2MB → **474KB**
- **Quality Issues:**
  - Acceptable quality
  - Simple animation - could be SVG
- **Decision:** ✅ OPTIMIZE
- **Target:** <2MB
- **Note:** Consider SVG replacement in future

### 7. chain-of-custody-kiosk.mp4
- **Size:** 2.5MB → **64KB**
- **Quality Issues:**
  - Already reasonable size
  - Acceptable quality
- **Decision:** ✅ LIGHT OPTIMIZE
- **Target:** <2MB
- **Optimization:**
  - Light CRF optimization only

---

## Optimization Commands

### FFmpeg Settings

**Standard optimization (CRF 28):**
```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1280:-2" \
  -an \
  -movflags +faststart \
  output.mp4
```

**Aggressive optimization (CRF 30):**
```bash
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 30 \
  -preset slow \
  -vf "scale=1280:-2" \
  -an \
  -movflags +faststart \
  output.mp4
```

**WebM generation:**
```bash
ffmpeg -i input.mp4 \
  -c:v libvpx-vp9 \
  -crf 32 \
  -b:v 0 \
  -an \
  output.webm
```

**Poster frame extraction:**
```bash
ffmpeg -i input.mp4 \
  -ss 00:00:01 \
  -frames:v 1 \
  -vf "scale=640:-1" \
  -q:v 85 \
  output-poster.webp
```

---

## Validation Criteria

After optimization, each video must:
- [x] Play without visible artifacts (spot-checked homepage/demo)
- [x] Maintain acceptable visual quality
- [x] Load quickly on mobile connection (98% size reduction)
- [x] Have poster frame generated
- [x] Meet individual size target

Total: MP4 1.8MB, WebM 3.2MB, Posters 144KB (well under 25MB budget).

---

## File References

Videos are located in: `public/proof/`

Components using videos:
- `components/DemoStepper.tsx`
- `components/media/ProofMedia.tsx` (if exists)
- Various page components
