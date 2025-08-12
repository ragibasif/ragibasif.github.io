---
title: "I Built A Memory Debugger"
description: "An explanation of why I built Watchdog."
pubDate: "August 11 2025"
updatedDate: "August 11 2025"
tags: ["C", "Debugging", "Project"]
featured: true
---

**"The first time C crashed on me, I had no idea what I’d done wrong.
The second time, I _still_ had no idea.
By the tenth time, I decided I needed a better way to see what was going on under the hood."**

## What Is It?

[**Watchdog**](https://github.com/ragibasif/watchdog) is a dynamic memory debugger for C. It tracks memory allocations and deallocations in heap memory. Specifically, tracks all calls to `malloc`, `realloc`, `calloc`, and `free`.

## But Why?

When I first started learning C and low-level programming, I barely understood pointers, let alone used them with confidence. Coming from a Python background, the whole process felt intimidating. But I was determined.

At the time, I had just finished a Computer Architecture course and was wrapping up an Operating Systems class. I enjoyed these classes far more than anything I had done in Python or web development. Seeing "how the sausage is made" didn't put me off; it made me hungry for more. Computer Architecture introduced me to assembly, but that felt _too_ low-level for my taste. I wanted to build something useful in a reasonable amount of time.

Yes, we have all heard the horror stories about C's "footguns" and lack of safety. Rather than scare me off, they made me curious. C's simplicity and its explicit control over memory made learning it super fun.

For a while, I rode the high of learning a new language. I churned out countless "Hello, World!" programs in my minimal but efficient NeoVim setup. I use NeoVim by the way. Then I tried writing a real program and I found myself in a pit full of segmentation faults, buffer overflows, invalid memory accesses, leaks, and a blizzard of compiler errors and warnings.

I knew about tools like AddressSanitizer and Valgrind, and I did try them. But as a beginner, I found their output overwhelming. I wanted something cleaner, friendlier, and more approachable. I couldn't find something that of that kind, so I built my own.

These days, I do use Valgrind and AddressSanitizer. But I'm glad I took the time to create Watchdog. The project taught me a lot about C, memory management, and computer architecture.

## Try It Yourself

If you're learning C and want a friendlier way to see what's happening in your heap, give [Watchdog](https://github.com/ragibasif/watchdog) a try.
