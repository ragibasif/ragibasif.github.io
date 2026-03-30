---
title: "Building a Memory Tracker"
date: 2026-02-03
tags: ["c","debug"]
---

C gives you direct access to memory, which is both the language's strength and
its most common source of pain. When a project starts crashing because of a bad
`free()`, a silent leak, or a buffer overwrite that corrupts heap state long
before the actual fault, debugging gets expensive fast.

`[watchdog](https://github.com/ragibasif/watchdog)` was built to make those failures visible earlier. Instead of waiting
for a segfault or using a heavyweight external tool every time, the project
wraps the standard heap APIs and records enough metadata to explain what
happened and where it happened.

The goal is narrow and practical:

- keep integration simple
- avoid external dependencies
- surface common heap misuse patterns
- stay usable in normal debug builds

That constraint set shaped the entire design.

## The core idea

Watchdog intercepts four allocation APIs:

- `malloc`
- `calloc`
- `realloc`
- `free`

It does that with preprocessor macros in `watchdog.h`. When
`WATCHDOG_ENABLE` is defined, calls such as:

```c
int *buffer = malloc(sizeof *buffer * 16);
```

become calls to:

```c
w_malloc(size, __FILE__, __LINE__, __func__)
```

That one decision buys a lot:

- source location for every allocation
- no manual instrumentation at each call site
- an opt-in debug mode controlled at compile time

The implementation file defines `WATCHDOG_INTERNAL` before including the
header, so Watchdog's own internal allocations still use the real allocator
instead of recursively instrumenting itself.

## How allocation tracking works

Every allocation gets a metadata record containing:

- the original heap pointer
- the allocation size
- the source file
- the source line
- the function name
- whether the block has already been freed

Those records live in a simple dynamic array inside `watchdog.c`. It is not a
hash table or a balanced tree. That is a deliberate tradeoff. For a debugging
tool meant to stay small and understandable, a linear scan is acceptable at
this stage, especially because the implementation benefits from being obvious.

The tracker also maintains aggregate stats:

- total allocations
- total frees
- current memory usage
- peak memory usage
- time spent inside the tool

That makes the final report more useful than a raw leak dump.

## Why the canary approach matters

The most interesting part of Watchdog is how it detects overflow. When the tool
allocates memory, it actually asks the system allocator for:

```text
requested bytes + leading canary + trailing canary
```

The user receives a pointer shifted past the leading canary. On `free()` and
`realloc()`, Watchdog checks both canary regions for corruption.

If the leading or trailing guard bytes changed, the library logs an
out-of-bounds access warning before it releases the memory.

This does not replace AddressSanitizer or Valgrind. It is more limited. But it
does give a lightweight signal for a class of bugs that otherwise stays hidden
until much later in the program.

## What `realloc()` made harder

`realloc()` is where memory tools stop being trivial.

It has awkward semantics:

- `realloc(NULL, size)` should behave like `malloc(size)`
- `realloc(ptr, 0)` typically frees the block and returns `NULL`
- on failure for a nonzero size, the original block must remain valid

That means a naive wrapper can easily do the wrong thing. In Watchdog, the
wrapper has to:

1. validate that the input pointer is actually tracked
2. reject pointers that were already freed
3. allocate a new guarded region
4. copy the smaller of the old and new sizes
5. update metadata without losing ownership information

One subtle issue in this kind of design is address reuse. Allocators can hand
out the same address again after a block is freed, so metadata lookup cannot
blindly accept the first matching record it sees. The current implementation
searches from the most recent record backward so it prefers the live allocation
over an older freed entry at the same address.

That sounds small, but it is exactly the kind of detail that decides whether a
debugging tool is trustworthy.

## Thread safety without getting fancy

Watchdog uses a global `pthread_mutex_t` to protect its internal state. That
includes:

- initialization
- metadata updates
- statistics updates
- logging

This is not the highest-throughput design possible, but it is the right one
for a compact debugging library. The real requirement is correctness under
concurrency, not allocator-grade scalability.

There is also a pragmatic initialization detail here: the tracker state has to
be fully set up before any thread sees the library as initialized. Otherwise,
one thread can start logging or pushing metadata into an array that another
thread has not actually finished creating yet.

That kind of race is particularly damaging in debugging infrastructure, because
it makes the tool itself a new source of nondeterminism.

## Reporting philosophy

Watchdog is opinionated about output. It does not just store metadata and exit.
It logs operations as they happen and prints a summary report on shutdown.

The runtime logging includes:

- allocation type
- pointer
- size
- source file
- line number
- function name

The shutdown report includes:

- total allocations
- total frees
- peak memory usage
- accumulated tool latency

This gives the project two modes of value:

- immediate signal while the program runs
- aggregate signal when the program exits

For small native projects, that is often enough to catch issues before a full
external memory-analysis pass is necessary.

## What the tests show

The test program in `tests/test.c` intentionally performs bad operations to
exercise the tool:

- normal `malloc` and `calloc`
- repeated `realloc`
- double free
- leak at program exit
- overflow via `strcpy`
- invalid free

That structure is useful because it turns the tool into its own demo. The test
binary is not just checking correctness. It is also documenting the intended
behavior of the library.

There is still room to tighten the tests further. Some of the misuse examples
would be stronger if they avoided undefined behavior entirely in the test code
itself and instead expressed the invalid operations in more controlled ways.
But the direction is correct: a runtime debugging tool should be validated by
deliberately triggering runtime failures.

## What I like about this design

Three things stand out:

### 1. The integration cost is low

Including `watchdog.h`, compiling `watchdog.c`, and enabling a macro is a much
smaller adoption barrier than introducing a full external toolchain dependency
for every local debugging session.

### 2. The implementation is readable

The project chooses straightforward data structures and explicit logic. That is
a good fit for a utility whose credibility depends on being inspectable.

### 3. The project teaches by exposing tradeoffs

This is not just a library. It is also a useful exercise in systems thinking:

- where to store metadata
- how to protect shared state
- how to preserve allocator semantics
- where lightweight instrumentation stops being enough

That is exactly why small systems projects like this are worth building.

## Where Watchdog could go next

If the project keeps evolving, these would be the next improvements I would
look at:

- replace linear metadata scans with a pointer-keyed lookup structure
- tighten the tests so invalid-use cases do not rely on undefined local state
- add optional backtrace capture for allocations on supported platforms
- make reports easier to filter or summarize in CI
- separate logging policy from tracking logic

None of those are necessary to justify the project today. They are just the
natural next steps once the current model proves useful.

## Final take

Watchdog is a good example of what makes small C infrastructure projects
interesting. It takes a common pain point, keeps the scope disciplined, and
implements just enough machinery to be useful:

- macro-based API interception
- metadata tracking
- canary-based overflow detection
- thread-safe logging and reporting

It does not try to become a full memory analysis platform. It tries to be a
small, understandable, practical debugging layer for heap mistakes. That is a
reasonable goal, and in many projects, that is exactly the right amount of
tooling.
