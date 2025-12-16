# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Usage Guidelines

**Primary Use Cases:**
- Site administration and configuration
- Layout modifications and template updates
- General site architecture improvements
- Theme customization and styling
- Deployment and build process optimization
- Process improvements and workflow suggestions
- Site architecture enhancement recommendations

**Content Boundaries:**
- **DO NOT** modify blog post content in `content/posts/`
- **DO NOT** alter personal information in `content/pages/about.md`
- **AVOID** making changes to written content unless specifically requested
- **FOCUS** on technical infrastructure, layouts, and site functionality
- **WELCOME** suggestions for better processes, workflows, and architectural improvements

## Development Commands

**Creating New Content:**
```bash
# Create new blog post
hugo new posts/my-post-name.md

# Create new project (uses archetypes/projects.md template)
hugo new projects/my-project/index.md

# Create new photo gallery (uses archetypes/photos.md template)
hugo new photos/my-gallery/index.md

# Create new page
hugo new pages/my-page.md
```

**Local Development Server:**
```bash
# Start local development server using Docker
docker run --rm -it \
  -v $(pwd):/src \
  -p 1313:1313 \
  hugomods/hugo:latest \
  server
```

**Build for Production:**
```bash
# Build static site using Docker
docker run --rm -it \
  -v $(pwd):/src \
  hugomods/hugo:latest

# Built files are generated in the `public/` directory
```

**Theme Development (if working on Congo theme):**
```bash
# Navigate to theme directory first
cd themes/congo

# Install dependencies
npm install

# Development mode (watch for changes)
npm run dev

# Build production assets
npm run build
```

## Site Architecture

This is a Hugo static site using the Congo theme with the following structure:

**Content Organization:**
- `content/pages/` - Static pages (About, Now, Recommendations)
- `content/posts/` - Blog posts and articles
- `content/photos/` - Photo galleries
- `content/projects/` - Project showcases
- `config/_default/` - Hugo configuration files
- `layouts/` - Custom template overrides
- `static/` - Static assets (images, fonts, custom CSS)

**Key Features:**
- **Personal Branding**: Professional site for Spenser Pothier (Site Reliability Engineer)
- **Recommendation System**: Custom shortcode `rec-card` for displaying tech professional recommendations
- **Photo Galleries**: Responsive gallery system with lightbox functionality
- **Project Showcase**: Portfolio system for displaying projects with screenshots and metadata
- **Font Awesome Integration**: Icons throughout the site using Font Awesome v6
- **AWS Deployment**: Configured for S3 + CloudFront deployment
- **Responsive Design**: Mobile-first design using Tailwind CSS via Congo theme

**Custom Components:**
- `layouts/shortcodes/rec-card.html` - Displays person cards with social links
- `layouts/_default/recommendation.html` - Custom layout for recommendations page
- `layouts/shortcodes/fa.html` - Font Awesome icon shortcode
- `layouts/photos/list.html` - Gallery index page with thumbnail grid
- `layouts/photos/single.html` - Individual gallery page with lightbox functionality
- `layouts/projects/list.html` - Project index page with project cards
- `layouts/projects/single.html` - Individual project page with screenshots and details

**Content Types:**
- Blog posts support standard Hugo frontmatter
- Recommendation cards use custom shortcode with parameters: name, title, avatar, site, github, twitter, linkedin, keybase, facebook
- Photo galleries use page bundles in `content/photos/` with automatic image processing and lightbox functionality
- Project showcases use page bundles in `content/projects/` with support for tags, links, and screenshot galleries
- Pages can disable author info, pagination, reading time, word count, date, and sharing links

**Deployment:**
- Hugo builds to `public/` directory
- AWS S3 bucket: `s3://spenser.io`
- CloudFront distribution for CDN
- Gzip compression for HTML, XML, JSON, JS, CSS, SVG, TTF files
- Cache control headers for static assets (30 days)

**Content Management:**
- Use Hugo's content management system with archetypes for templated content creation
- Archetypes available: `default.md`, `projects.md`, `photos.md`
- Custom shortcodes for enhanced functionality
- Font Awesome icons available via `{{< fa fa-icon-name >}}` shortcode

## Photo Gallery System

**Gallery Creation:**
- Create page bundle directories in `content/photos/gallery-name/`
- Add `index.md` with gallery metadata and optional description
- Place image files in the same directory
- Hugo automatically generates thumbnails and optimized versions
- Optional: Add `thumbnail.*` file for custom gallery preview image

**Gallery Features:**
- Masonry layout preserving image aspect ratios (1-4 columns based on screen size)
- Minimal JavaScript lightbox with keyboard navigation
- Automatic image optimization with quality control (q85)
- Touch/click navigation controls
- Inline gallery shortcode for embedding images within content
- No external dependencies - pure CSS and vanilla JS

**Gallery Shortcode Usage:**
- `{{< gallery images="img1.jpg,img2.jpg" size="small" >}}` - Embed specific images
- Sizes: `small` (150px), `medium` (240px), `large` (300px)
- Columns: `cols="1"`, `cols="2"`, `cols="3"`, or `cols="auto"`

## Project Showcase System

**Project Creation:**
- Create page bundle directories in `content/projects/project-name/`
- Add `index.md` with project metadata, description, and details
- Place screenshot/image files in the same directory
- Hugo automatically generates thumbnails and optimized versions
- Optional: Add `thumbnail.*` file for custom project preview image

**Project Features:**
- Responsive card grid layout for project index page
- Individual project pages with full details and screenshot galleries
- Support for tags, technology stacks, and metadata
- External links to GitHub, live demos, and websites
- Automatic screenshot gallery with lightbox functionality
- Gallery shortcode support for inline images within project descriptions

**Project Frontmatter:**
- `title` - Project name (required)
- `date` - Project date (required)
- `description` - Brief project summary (required)
- `tags` - Technology tags as array (optional, e.g., `["Go", "React", "AWS"]`)
- `github` - GitHub repository URL (optional)
- `demo` - Live demo URL (optional)
- `website` - Project website URL (optional)
- `draft` - Set to `true` to hide project (optional)