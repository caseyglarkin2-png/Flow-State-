#!/bin/bash
# Video Optimization Script for YardFlow
# Reduces video sizes while maintaining visual quality

set -e

PROOF_DIR="public/proof"
BACKUP_DIR="public/proof/originals"

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "🎬 YardFlow Video Optimization Script"
echo "====================================="
echo ""

# Function to optimize a video
optimize_video() {
    local input="$1"
    local crf="$2"
    local target_width="${3:-1280}"
    
    local filename=$(basename "$input")
    local backup="$BACKUP_DIR/$filename"
    local temp="${input%.mp4}-temp.mp4"
    
    echo "📹 Processing: $filename"
    echo "   CRF: $crf, Target width: ${target_width}px"
    
    # Backup original if not already backed up
    if [ ! -f "$backup" ]; then
        cp "$input" "$backup"
        echo "   ✓ Backed up original"
    fi
    
    # Optimize video
    ffmpeg -i "$input" \
        -vcodec libx264 \
        -crf "$crf" \
        -preset slow \
        -vf "scale=${target_width}:-2" \
        -an \
        -movflags +faststart \
        -y \
        "$temp" 2>/dev/null
    
    # Replace original with optimized
    mv "$temp" "$input"
    
    # Get sizes
    local orig_size=$(du -h "$backup" | cut -f1)
    local new_size=$(du -h "$input" | cut -f1)
    
    echo "   ✓ Optimized: $orig_size → $new_size"
    echo ""
}

# Function to generate poster frame
generate_poster() {
    local input="$1"
    local output="${input%.mp4}-poster.webp"
    
    ffmpeg -i "$input" \
        -ss 00:00:01 \
        -frames:v 1 \
        -vf "scale=640:-1" \
        -q:v 85 \
        -y \
        "$output" 2>/dev/null
    
    echo "   ✓ Poster: $(basename "$output") ($(du -h "$output" | cut -f1))"
}

# Function to generate WebM version
generate_webm() {
    local input="$1"
    local output="${input%.mp4}.webm"
    
    ffmpeg -i "$input" \
        -c:v libvpx-vp9 \
        -crf 32 \
        -b:v 0 \
        -an \
        -y \
        "$output" 2>/dev/null
    
    echo "   ✓ WebM: $(basename "$output") ($(du -h "$output" | cut -f1))"
}

echo "Phase 1: Optimizing MP4 files..."
echo "---------------------------------"

# Machine-vision-video.mp4 - 31MB → target <5MB (aggressive)
optimize_video "$PROOF_DIR/Machine-vision-video.mp4" 30 1280

# pickup-vs-delivery-video.mp4 - 16MB → target <3MB (aggressive)
optimize_video "$PROOF_DIR/pickup-vs-delivery-video.mp4" 32 1280

# driver-qr-scan.mp4 - 13MB → target <3MB
optimize_video "$PROOF_DIR/driver-qr-scan.mp4" 28 1280

# Smart-bol-kiosk.mp4 - 7.4MB → target <2MB
optimize_video "$PROOF_DIR/Smart-bol-kiosk.mp4" 28 1280

# kiosk-demo.mp4 - 7.5MB → target <2MB
optimize_video "$PROOF_DIR/kiosk-demo.mp4" 28 1280

# two-way-comms.mp4 - 6.2MB → target <2MB
optimize_video "$PROOF_DIR/two-way-comms.mp4" 28 1280

# chain-of-custody-kiosk.mp4 - 2.5MB → target <2MB (light)
optimize_video "$PROOF_DIR/chain-of-custody-kiosk.mp4" 26 1280

echo ""
echo "Phase 2: Generating poster frames..."
echo "-------------------------------------"

for video in "$PROOF_DIR"/*.mp4; do
    generate_poster "$video"
done

echo ""
echo "Phase 3: Generating WebM alternatives..."
echo "-----------------------------------------"

for video in "$PROOF_DIR"/*.mp4; do
    generate_webm "$video"
done

echo ""
echo "====================================="
echo "📊 Final Size Report"
echo "====================================="
echo ""
echo "MP4 files:"
du -h "$PROOF_DIR"/*.mp4 | sort -h
echo ""
echo "WebM files:"
du -h "$PROOF_DIR"/*.webm 2>/dev/null | sort -h || echo "No WebM files"
echo ""
echo "Poster frames:"
du -h "$PROOF_DIR"/*-poster.webp 2>/dev/null | sort -h || echo "No poster files"
echo ""
echo "Total MP4: $(du -ch "$PROOF_DIR"/*.mp4 | tail -1 | cut -f1)"
echo "Total WebM: $(du -ch "$PROOF_DIR"/*.webm 2>/dev/null | tail -1 | cut -f1 || echo 'N/A')"
echo ""
echo "Original backups in: $BACKUP_DIR"
echo "✅ Optimization complete!"
