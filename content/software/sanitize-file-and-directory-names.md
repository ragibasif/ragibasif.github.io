---
title: "Sanitize File and Directory Names"
date: 2026-03-09
tags: ["python", "script", "cli"]
link: "https://github.com/ragibasif/snake"
---

**Snake** 🐍

A clean, lightweight CLI tool that sanitizes file and directory names. It turns messy, unsafe names into clean, alphanumeric ones.

## What it does

- Replaces **every non-alphanumeric character** with `_`
- Collapses consecutive underscores
- Strips leading/trailing underscores
- Skips hidden files & folders (starting with `.`)
- Falls back to a UTC timestamp when the name would otherwise become empty

## Before → After

```
my file (1).txt        →  my_file_1.txt
__Hello, World!__      →  Hello_World
résumé.pdf             →  r_sum.pdf
!!!.log                →  20260224153000000000UTC.log
2024-01-15_notes       →  2024_01_15_notes
```

## Quick install (macOS/Linux)

```bash
chmod +x snake.py
sudo mv snake.py /usr/local/bin/snake
```

## Usage examples

```bash
snake                     # current dir (non-recursive)
snake -r                  # current dir + subfolders
snake -r -v               # recursive + verbose logging
snake -f "my file!.pdf"   # single file
snake -d photos -r        # specific folder, recursive
```

Perfect for cleaning up downloads, media libraries, backups, or any folder full of files coming from Windows, web, cameras, etc.

MIT licensed • Python 3.13+ • https://github.com/ragibasif/snake
