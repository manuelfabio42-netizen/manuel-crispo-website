# Manuel Crispo — Author Website

English-language author website, hosted on Netlify.

## Weekly Stories — publishing without editing code

1. Visit https://app.pagescms.org/ and sign in using GitHub.
2. Grant Pages CMS access to the GitHub repository `manuelfabio42-netizen/manuel-crispo-website`.
3. Select the repository and open **Weekly Stories**.
4. Add a new item and fill in **Story title**, **Publication date**, **Short introduction**, and **Full story**.
5. Save or publish the change to the `main` branch.

The latest story is displayed first on the home page and all stories appear in the archive. Stories are stored in `weekly/stories.json`. The site reads the file at runtime.

**Important:** GitHub must first be linked as the continuous deployment source of the **existing** Netlify site (`manuelcrispowriter.netlify.app`). In the existing site dashboard, go to **Project configuration > Build & deploy > Continuous deployment** and connect this repository, using the default branch `main` and publish directory `.`. Do not create a new Netlify site if you want to preserve its current address.

### Files
- `index.html` — full author site, with images embedded to preserve the original assets.
- `.pages.yml` — Pages CMS editor configuration.
- `weekly/stories.json` — story list (initially empty).
- `netlify.toml` — Netlify static-site publishing settings.
- `robots.txt` — crawler rules.

No fictitious stories have been added.
