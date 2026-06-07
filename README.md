# Youngji International School Website

Static website for Youngji International School, deployed to GitHub Pages at
`myyoungji.com`.

## Project Structure

- `index.html` - Home page.
- `partials/` - Shared header and footer loaded by `assets/js/main.js`.
- `assets/css/site.css` - Main custom styling.
- `assets/css/tailwind.css` - Generated utility CSS used by the static pages.
- `assets/js/main.js` - Shared navigation, translation control, carousel, sidebar, and footer behavior.
- `images/` - Site image assets.
- `file/` - Downloadable public files such as school calendars.
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow.

## Local Preview

Because the header and footer are loaded dynamically, preview the site through a
local web server instead of opening files directly.

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Checks

Run the static audit before pushing site changes:

```powershell
python scripts/audit_static_site.py
```

This checks local links and common broken-text markers across HTML files.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow that publishes the static
site to GitHub Pages. The workflow requires Pages deployment permissions:
`contents: read`, `pages: write`, and `id-token: write`.

## Maintenance Notes

- Keep shared layout changes in `partials/header.html`, `partials/footer.html`,
  `assets/css/site.css`, and `assets/js/main.js`.
- If CSS or JavaScript changes are not visible after deployment, bump the query
  string versions in HTML references.
- Keep public assets inside `images/` or `file/`; avoid duplicate files in the
  repository root.
