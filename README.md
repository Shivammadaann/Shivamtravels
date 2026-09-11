# Shivam Tour and Travels

A single-page taxi service website for New Delhi and All India travel, with vehicle selection, click-to-call links and WhatsApp booking enquiries.

## GitHub Pages

Website: https://shivammadaann.github.io/Shivamtravels/

The `.github/workflows/pages.yml` workflow publishes the contents of `dist/` directly to GitHub Pages. No package installation, build tool, backend or custom secrets are required.

In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Changes to `dist/` or the Pages workflow on `main` deploy automatically. To publish manually, open **Actions → Deploy to GitHub Pages → Run workflow**.

`dist/index.html` becomes the published site's entry point. Asset URLs are relative, so the same files work at `/Shivamtravels/`, at a domain root and on the existing Sites host. The `.nojekyll` file also supports hosting these files without Jekyll processing. Do not select the repository root as a branch-based Pages source: the website files are inside `dist/`.

## Local preview

With Node.js installed, run:

```sh
node preview.cjs
```

Open http://127.0.0.1:4173/.

## Editing the website

- `dist/index.html`: content, fleet, contact links and enquiry fields.
- `dist/styles.css`: desktop and mobile layouts.
- `dist/app.js`: trip selection, form validation and WhatsApp message creation.
- `dist/ladakh-road.jpg`: hero image; attribution is in `dist/assets-credit.txt`.

Enquiries open WhatsApp addressed to **+91 79828 50497**. The visitor must press **Send** in WhatsApp to submit the message. The website does not store enquiries or require a server-side form handler.

The `.openai/hosting.json` file belongs to the existing Sites deployment and is not included in the GitHub Pages artifact. `preview.cjs` is a local development tool and is not needed by GitHub Pages.
