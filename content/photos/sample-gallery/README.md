# Photo Gallery Usage Instructions

## How to Create a New Gallery

1. **Create a new directory** in `content/photos/` with your gallery name:
   ```bash
   mkdir content/photos/your-gallery-name
   ```

2. **Add an `index.md` file** with gallery metadata:
   ```yaml
   ---
   title: "Your Gallery Title"
   date: 2024-01-15
   description: "Description of your gallery"
   ---
   
   Optional content describing your gallery goes here.
   ```

3. **Add your images** to the same directory:
   - Supported formats: JPG, PNG, WebP
   - Hugo will automatically generate optimized thumbnails
   - Images maintain aspect ratios in masonry layout
   - Optional: Add a `thumbnail.jpg` file for custom gallery preview

## Gallery Features

- **Masonry Layout**: Images flow naturally maintaining aspect ratios
- **Responsive Design**: 1-4 columns based on screen size  
- **Lightbox View**: Click any image to view in full size
- **Keyboard Navigation**: Arrow keys and Escape in lightbox
- **Automatic Optimization**: Multiple sizes generated automatically
- **Smooth Interactions**: Hover effects and smooth transitions

## Inline Gallery Shortcode

Embed specific images within your writing:

```markdown
{{< gallery images="image1.jpg,image2.jpg" size="small" >}}
{{< gallery images="hero.jpg" size="large" cols="1" >}}
```

**Parameters:**
- `images`: Comma-separated list of image filenames
- `size`: `small` (150px), `medium` (240px), `large` (300px)
- `cols`: `auto`, `1`, `2`, `3` for specific layouts

## Example Gallery Structure
```
content/photos/vacation-2024/
├── index.md
├── thumbnail.jpg (optional - custom preview)
├── mountain-view.jpg
├── sunset-beach.jpg
└── hiking-trail.jpg
```

The gallery will automatically appear in the Photos section and be accessible via the main navigation.