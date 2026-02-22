# Ragib Asif

## Quick Start

### Prerequisites

1. Install Hugo (extended version recommended):
   - **macOS**: `brew install hugo`
   - **Windows**: `choco install hugo-extended`
   - **Linux**: Download from [Hugo releases](https://github.com/gohugoio/hugo/releases)

2. Verify installation:
   ```bash
   hugo version
   ```

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/ragibasif/ragibasif.github.io.git
   cd ragibasif.github.io
   ```

2. Start the Hugo development server:
   ```bash
   hugo server -D
   ```

3. Open your browser to `http://localhost:1313`

The site will automatically reload when you make changes.

## Creating Content

### Creating a New Blog Post

Run this command:

```bash
hugo new blog/my-post-title.md
```

This creates a new file at `content/blog/my-post-title.md` with front matter:

```yaml
---
title: "My Post Title"
date: 2025-03-15
tags: ["tag1", "tag2"]
---

Write your content here using Markdown.
```

**Key fields:**
- `title`: Post title (required)
- `date`: Publication date (required)
- `tags`: Array of tags (optional)

### Creating a New Portfolio Project

Run this command:

```bash
hugo new portfolio/project-name.md
```

This creates a new file at `content/portfolio/project-name.md`:

```yaml
---
title: "Project Name"
date: 2025-03-15
tags: ["technology1", "technology2"]
link: "https://project-url.com"
github: "https://github.com/user/repo"
---

Describe your project here.
```

**Key fields:**
- `title`: Project title (required)
- `date`: Project date (required)
- `tags`: Technologies used (optional)
- `link`: Live project URL (optional)
- `github`: GitHub repository URL (optional)

## Configuration

Edit `hugo.toml` to customize your site:

```toml
baseURL = "https://ragibasif.github.io/"  # Your GitHub Pages URL
title = "Ragib Asif"                      # Site title

[params]
  author = "Ragib Asif"
  description = "A minimal blog and portfolio"
  github = "https://github.com/ragibasif"
  email = "ragibasif@tuta.io"
```

## Support

For Hugo documentation, visit: https://gohugo.io/documentation/

For GitHub Pages help, visit: https://docs.github.com/pages
