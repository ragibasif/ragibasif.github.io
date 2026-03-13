---
title: "Strip Metadata from Images"
date: 2026-03-05
tags: ["python", "script", "images", "privacy"]
---

Photos carry a large amount of personal information: GPS coordinates, camera model, exact date & time, and even the device’s serial number. To remove such EXIF metadata, I created a Python script that recursively cleans metadata from every valid image in the current directory and all subdirectories.

```python
#!/usr/bin/env python3
# Strip EXIF metadata from images recursively
# Requires: exiftool + pillow
# macOS install:  brew install exiftool
#                pip install pillow

import subprocess
from pathlib import Path
from PIL import Image

def is_image(path):
    """Quick check if file is a valid image (not just by extension)"""
    try:
        with Image.open(path) as img:
            img.verify()           # actually reads & validates file
        return True
    except (IOError, SyntaxError):
        return False

def get_dirs(wd, seen=set()):
    """Collect current dir + all non-hidden subdirectories recursively"""
    if wd in seen:
        return []
    seen.add(wd)
    dirs = [wd]
    for item in Path(wd).glob("*"):
        if item.is_dir() and not item.name.startswith("."):
            dirs.extend(get_dirs(item, seen))
    return dirs

def clean_images(dir_path):
    """Remove all EXIF/metadata from valid images in this folder"""
    for file in Path(dir_path).glob("*"):
        if not file.is_file() or file.name.startswith("."):
            continue
        if not is_image(file):
            continue

        cmd = ["exiftool", "-all=", "-overwrite_original", str(file)]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Cleaned → {file}")

def main():
    print("Starting metadata cleanup in current directory + subfolders…\n")
    folders = get_dirs(Path.cwd())
    for folder in folders:
        print(f"Scanning: {folder}")
        clean_images(folder)
    print("\nDone! All discoverable metadata removed from images.")

if __name__ == "__main__":
    main()
```

## How to use it

1. Save as `clean_image_metadata.py`
2. Make executable: `chmod +x clean_image_metadata.py`
3. Install dependencies (one-time)
   - macOS: `brew install exiftool`
   - `pip install pillow`
4. `cd` into the folder containing your photos
5. Run: `./clean_image_metadata.py`
6. Verify: `exiftool image.jpg`

The script:
- skips hidden files & folders (`.DS_Store`, `.git`, etc.)
- only touches real images (verified with Pillow)
- uses `exiftool`’s powerful `-all=` flag to wipe **everything**
- overwrites files in place (no duplicates created)

## Why `exiftool` instead of pure Python?

Pure-Python libraries (PIL, piexif, exif…) can only remove metadata from some formats and often leave “ghost” fields or break compatibility. `exiftool` is the gold standard.
