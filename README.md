# My Single Page Website

This is a simple single page website designed to be hosted on GitHub Pages.

## Project Structure

- `index.html` - The main HTML file
- `css/styles.css` - Stylesheet
- `js/script.js` - JavaScript file

## Development

### Local Development Server

Use bun to serve the site locally:

```bash
bunx serve docs -p 8000
```

This will serve the site at http://localhost:8000

Alternative options:
- VS Code's Live Server extension
- Any other static file server

## Deployment

To deploy to GitHub Pages:

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select the main branch as the source
4. Your site will be published at `https://[username].github.io/[repository-name]`

# Github pages
Github pages requires that the index.html is server under root or ./docs/. We chose ./docs for this config.
# Agents

AI agents, please begin reading context in ./knowledge_base/

## Development Commands

- **Serve locally**: `bunx serve docs -p 8000` (serves at http://localhost:8000)
- **Content files**: All text content is in `docs/data/text-content.json` - DO NOT hardcode text in HTML
- **Structure**: Site files are in `docs/` directory for GitHub Pages compatibility
