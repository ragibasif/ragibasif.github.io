#!/bin/bash
# Quick script to create a new blog post

if [ -z "$1" ]; then
    echo "Usage: ./new-post.sh post-title"
    echo "Example: ./new-post.sh my-first-post"
    exit 1
fi

hugo new "blog/$1.md"
echo "Created new blog post: content/blog/$1.md"
echo "Edit the file and run 'hugo server -D' to preview"
