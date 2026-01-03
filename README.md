# 🏎️ Viraaj's Racing World

My Personal Space - An F1-themed personal website!

## 🏁 Project Structure

```
├── index_template.html   # 📝 EDIT THIS (source template with placeholders)
├── index.html            # 🤖 GENERATED (don't edit - will be overwritten)
├── build-flags.js        # Build script
├── flags/                # MS Paint flag creations
│   ├── india.png
│   ├── japan.png
│   └── ...
└── books/                # Book covers
    └── dogman-14/
        └── cover.jpg
```

## 🔧 Build Process

The template file (`index_template.html`) contains placeholders that get replaced when you run the build script:

| Placeholder | Replaced With |
|-------------|---------------|
| `{{FLAGS_PLACEHOLDER}}` | Generated flag gallery HTML |
| `{{FLAG_COUNT}}` | Total number of flags |

### Running the Build

```bash
node build-flags.js
```

**Output:**
```
🏁 Building Flag Gallery...

📄 Template: index_template.html (read-only)
📄 Output:   index.html (generated)

📁 Found 19 flags in /flags folder...

✅ Successfully generated index.html with 19 flags!

📝 Template (index_template.html) was NOT modified.
```

## 📝 Development Workflow

### ⚠️ Important Rules:
1. **Edit `index_template.html`** - This is your source file
2. **Never edit `index.html`** - It gets overwritten by the build
3. **Template is never modified** by the build script

### Adding New Flags

1. Create your flag in MS Paint
2. Save PNG/JPG to `/flags` folder (name = country, e.g., `france.png`)
3. Run: `node build-flags.js`
4. Commit both files

### Making Other Changes

1. Edit `index_template.html`
2. Run `node build-flags.js` 
3. Test by opening `index.html` in browser
4. Commit both files

### File Roles

| File | Edit? | Commit? | Notes |
|------|-------|---------|-------|
| `index_template.html` | ✅ Yes | ✅ Yes | Source template |
| `index.html` | ❌ No | ✅ Yes | Generated for GitHub Pages |
| `build-flags.js` | ✅ Yes | ✅ Yes | Build script |

## 🎨 Features

- **F1 Racing Theme** - Dark mode with racing colors
- **Day/Night Toggle** - Switch between light and dark themes  
- **Flag Gallery Carousel** - MS Paint flags with ◀ ▶ navigation
- **Book of the Month** - Currently reading showcase
- **Video Gallery** - Educational videos
- **Responsive Design** - Desktop, tablet, and mobile

## 🚀 Quick Commands

```bash
# Build the site
node build-flags.js

# Preview locally
open index.html

# Deploy
git add index_template.html index.html
git commit -m "Update site"
git push
```

---

Made with ❤️ by Viraaj 🏁
