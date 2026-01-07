#!/bin/bash
# YardFlow Rebrand Script
# Replaces all instances of "Flow State" with "YardFlow by FreightRoll"

echo "🔄 Starting YardFlow rebrand..."

# Define the replacements
# Note: Order matters - do compound phrases first
declare -A replacements=(
    ["Flow State's"]="YardFlow's"
    ["Flow State"]="YardFlow by FreightRoll"
    ["FlowState"]="YardFlow"
    ["flow-state"]="yardflow"
    ["FLOW STATE"]="YARDFLOW"
    ["flowstate"]="yardflow"
)

# Files to process (exclude node_modules, .next, etc.)
FILES=$(find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.md" -o -name "*.json" \) \
    ! -path "*/node_modules/*" \
    ! -path "*/.next/*" \
    ! -path "*/test-results/*" \
    ! -path "*/dist/*" \
    ! -path "*/.git/*")

# Count files
TOTAL=$(echo "$FILES" | wc -l)
echo "📁 Found $TOTAL files to process"

# Process each replacement
for search in "${!replacements[@]}"; do
    replace="${replacements[$search]}"
    echo "🔍 Replacing '$search' → '$replace'"
    
    # Use sed for in-place replacement (macOS/Linux compatible)
    echo "$FILES" | while read -r file; do
        if [ -f "$file" ]; then
            # macOS uses 'sed -i ""', Linux uses 'sed -i'
            sed -i.bak "s/$search/$replace/g" "$file" 2>/dev/null || sed -i "s/$search/$replace/g" "$file"
            # Remove backup files
            rm -f "${file}.bak"
        fi
    done
done

echo "✅ Rebrand complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test build: npm run build"
echo "3. Commit: git add . && git commit -m 'Rebrand to YardFlow by FreightRoll'"
