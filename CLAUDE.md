# ClientSites — Claude Context

## What this repo is

Static HTML/CSS/JS client websites built and maintained by Get Digital Done (Ceers 2112 Ltd). Each client gets a subdirectory. All sites are deployed to Vercel and served via branded subdomains on `getdigitaldone.co.uk`.

---

## Repo structure

```
ClientSites/
  EverybodysBeautiful/    → everybodysbeautiful.getdigitaldone.co.uk
  IanRiceBuilding/        → ian-rice-building.getdigitaldone.co.uk
  JaxElectricalServices/  → jax-electrical-services.getdigitaldone.co.uk  (verify slug)
  JK/                     → jennies-kitchen.getdigitaldone.co.uk  (JK = Jennie's Kitchen)
  TMR/                    → tmr-electrical.getdigitaldone.co.uk
```

Each folder contains a self-contained static site: `index.html`, `css/style.css`, `js/`, `images/`, `favicon.svg`, `favicon.png`, `vercel.json`, `robots.txt`, `sitemap.xml`.

---

## Vercel setup

- **Account:** Simon Hibbard (`shibbard`) — team: `simons-projects-5313062d`
- **Auth token location:** `C:\Users\Simon\AppData\Roaming\com.vercel.cli\Data\auth.json`
- **Deployment:** Git-connected monorepo. Each subfolder is a separate Vercel project.
- **Domains:** Subdomains of `getdigitaldone.co.uk` — DNS is a wildcard CNAME `*.getdigitaldone.co.uk → cname.vercel-dns.com` (needs to be set at the registrar if not already done).

### Per-project Vercel settings
Each project has `rootDirectory` set to its folder name (e.g. `JK`) and an `ignoreCommand` in `vercel.json` that only deploys when that folder's files change:

```json
{
  "ignoreCommand": "if git diff HEAD~1 --name-only | grep -q '^FOLDERNAME/'; then exit 1; else exit 0; fi"
}
```

**Important:** `exit 1` = deploy, `exit 0` = skip. The old `grep -qv` pattern was wrong (inverted) and caused all deployments to cancel on multi-site commits — fixed April 2026.

### Vercel CLI commands
```bash
# List recent deployments
npx vercel ls

# Check a specific project
npx vercel ls jennies-kitchen

# Force deploy a project (run from ClientSites root, not the subfolder)
# The subfolder has rootDirectory set in Vercel cloud — deploying from the subfolder confuses the path resolution.
# Best approach: push a commit touching that folder's files and let git trigger it.
```

---

## GitHub

- **Repo:** `https://github.com/shibbard/client-sites`
- **Branch:** `main` (default, used for all production deployments)
- There is also a `master` branch with an older structure (JK, TMR, GetDigitalDone) — ignore it.

---

## Site conventions

- Dark/light themes per client — no shared design system
- Fonts loaded from Google Fonts
- No build step, no framework — pure static files
- Images stored in `images/` subdirectory; gallery images in `images/gallery/`
- Favicons: `favicon.svg` (initials on brand colour) + `favicon.png` (real logo if available)
- Contact forms: usually Formspree
- No external CDN image references — all images must be local

---

## Client notes

| Folder | Client | Domain | Notes |
|---|---|---|---|
| `JK` | Jennie's Kitchen | jennies-kitchen.getdigitaldone.co.uk | Café in Ashton Keynes. Gallery images in `images/gallery/`. Lightbox implemented April 2026. |
| `IanRiceBuilding` | Ian Rice Building Ltd | ian-rice-building.getdigitaldone.co.uk | Builder/contractor. Hero image rotation. Portfolio lightbox. |
| `EverybodysBeautiful` | Everybody's Beautiful | everybodysbeautiful.getdigitaldone.co.uk | Beauty salon. Multi-page site. |
| `JaxElectricalServices` | Jax Electrical Services | jax-electrical-services.getdigitaldone.co.uk | Electrician. |
| `TMR` | TMR Electrical | tmr-electrical.getdigitaldone.co.uk | Electrician. |

---

## GetDigitalDone main site

Separate repo: `https://github.com/shibbard/getdigitaldone`
Local path: `C:\Dev\WebsiteMaker\GetDigitalDone\`
Live: `https://www.getdigitaldone.co.uk`
Company: Ceers 2112 Ltd, Co. No. 16512807
Contact: hello@getdigitaldone.co.uk | 07405 470663 | WhatsApp: wa.me/447405470663
