---
title: "Sanitize File Names"
date: 2026-03-30
tags: ["python","script","cli"]
---

Most developer tools aim to do more every release. [Snake](https://github.com/ragibasif/snake) is interesting for the opposite reason: it does one job, does it predictably, and stays out of the way.

At its core, Snake is a lightweight Python CLI for sanitizing file and directory names. It replaces non-alphanumeric characters with underscores, collapses repeated underscores, trims leading and trailing separators, and skips hidden files and directories. If a name would otherwise collapse into nothing, it falls back to a UTC timestamp so the rename still succeeds.

That sounds simple, but it solves a real and recurring problem. Files picked up from downloads, exports, design tools, messaging apps, and user uploads often arrive with spaces, punctuation, symbols, or non-ASCII characters that make shell usage awkward and automation brittle. Snake turns that mess into a consistent naming scheme without asking the user to rename everything by hand.

## Why this project works

What stands out about this project is its restraint.

The entire tool lives in a single Python file, uses only the standard library, and exposes a narrow command-line interface:

- Run it in the current directory
- Point it at a specific file
- Point it at a specific directory
- Optionally recurse into subdirectories
- Turn on verbose logging when needed

That is a good fit for a utility like this. A filename sanitizer should be easy to understand, easy to install, and easy to trust. Snake keeps the implementation small enough that you can read the whole thing in one sitting and know exactly what it will do to your files.

## The renaming model is intentionally strict

Snake applies a very literal transformation:

- Anything outside `a-z`, `A-Z`, and `0-9` becomes `_`
- Multiple underscores collapse into one
- Leading and trailing underscores are removed
- File extensions are preserved
- Hidden paths are ignored

This produces results that are ideal for scripts, terminals, and cross-platform workflows, even when the output is less human-friendly than the original filename.

For example:

| Before | After |
|---|---|
| `my file (1).txt` | `my_file_1.txt` |
| `résumé.pdf` | `r_sum.pdf` |
| `__Hello, World!__` | `Hello_World` |
| `!!!.log` | `20260330080357517199UTC.log` |

The `résumé.pdf` example is especially revealing. Snake is not trying to transliterate Unicode into ASCII approximations like `resume.pdf`. It is enforcing a simpler rule: if a character is not alphanumeric in the ASCII sense, replace it. That keeps the behavior obvious and deterministic.

## Good CLI design shows up in small details

Even though the project is compact, there are a few thoughtful choices in the interface.

The `-f/--file` and `-d/--directory` options are mutually exclusive, which prevents ambiguous behavior. Recursive mode is allowed for directories but explicitly rejected for single-file mode. Relative paths are resolved against the current working directory, and invalid targets fail with a clear log message instead of a traceback.

Logging is another small but solid touch. By default, Snake reports rename activity at `INFO` level, and `--verbose` raises that to `DEBUG`. That gives the tool a useful operational feel without introducing configuration overhead.

## Why a project like this matters

There is a tendency to treat tiny utilities as trivial, but they often show the clearest engineering judgment. Snake does not need a framework, a dependency tree, or a plugin system. It needs a stable rule set, safe defaults, and a fast path from problem to solution.

That makes it a good example of software that respects both the problem and the user:

- The scope is narrow
- The behavior is easy to explain
- The code is small enough to audit
- The output is practical for real shell workflows

In a larger codebase, those qualities are hard to maintain. In a focused tool like Snake, they become the whole product.

## Where this could go next

The current version is already useful, but it also leaves room for deliberate extensions:

- A dry-run mode to preview renames before applying them
- Collision handling beyond "skip if target exists"
- Optional transliteration for Unicode-heavy filenames
- Packaging as an installable console script instead of a renamed Python file

Those would be sensible improvements, but only if the project keeps its current discipline. The value of Snake is that you can predict it. Any future growth should preserve that property.

## Final take

Snake is the kind of project I like seeing in public repositories: small, readable, opinionated, and immediately usable.

It solves a narrow filesystem problem with a straightforward algorithm and a minimal CLI. More importantly, it demonstrates an underrated trait in software development: knowing when a tool is complete enough to be useful without becoming unnecessarily complicated.

If you care about practical command-line tooling, Snake is a good reminder that strong engineering is often less about adding capability and more about choosing a clean boundary, then implementing it well.
