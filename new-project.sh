#!/bin/bash
# Quick script to create a new portfolio project

if [ -z "$1" ]; then
    echo "Usage: ./new-project.sh project-name"
    echo "Example: ./new-project.sh my-awesome-project"
    exit 1
fi

hugo new "portfolio/$1.md"
echo "Created new portfolio project: content/portfolio/$1.md"
echo "Edit the file and run 'hugo server -D' to preview"
