---
title: "Dynamic Memory Debugger"
date: 2026-03-09
tags: ["c"]
link: "https://github.com/ragibasif/watchdog"
---

**Watchdog** is a lightweight, thread-safe C library that acts as a runtime memory debugger for heap allocations.

It wraps `malloc`, `calloc`, `realloc`, and `free` to detect and report common bugs with minimal overhead and zero external dependencies:

- Unfreed memory (leaks) at program exit
- Buffer overflows (via guard canaries)
- Double frees
- Invalid frees

Key highlights:

- POSIX threads support (mutex-protected)
- Optional verbose/color logging (console or file)
- Easy drop-in usage via macro-based interception
- Dockerized test suite + GitHub Actions CI
- Clean API with simple initialization: `w_init(verbose, log_to_file, color)`

Ideal for development and debug builds on Linux/macOS (POSIX systems). Not meant for production.

MIT licensed • Actively maintained
