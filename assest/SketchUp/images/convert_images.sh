#!/bin/bash
cd /Users/ghulamabbaszafari/Downloads/Movahedi_web_Portfolio/assest/SketchUp/images

echo "Converting .webp files to .jpg..."

for file in *.webp; do
    if [ -f "$file" ]; then
        # Remove spaces from filename and change extension
        newname=$(echo "$file" | tr ' ' '_' | sed 's/\.webp$/\.jpg/')
        echo "Converting: $file → $newname"
        convert "$file" "$newname"
    fi
done

echo "Done! Created files:"
ls -la *.jpg
