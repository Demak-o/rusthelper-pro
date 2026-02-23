# RustHelper Pro

RustHelper Pro is a focused website toolkit for the game **Rust**, built to help players quickly plan and optimize:

- Raid costs (rockets, C4, explo ammo, satchels + sulfur budget)
- Crafting requirements for key items/deployables
- Tool cupboard upkeep estimates
- Recycler return totals
- Furnace ore/fuel/time planning
- Monument quick intel

## Run locally

This is a static website.

1. Open the project folder in VS Code.
2. Run a local static server (example with Python):
   ```bash
   python3 -m http.server 5500
   ```
3. Open [http://localhost:5500](http://localhost:5500)

## GitHub + VS Code flow

### 1) Create the GitHub repo

Option A (web):
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `rusthelper-pro` (or your preferred name)
3. Create repository (no README needed since this project already has one)

Option B (GitHub CLI):
```bash
gh repo create rusthelper-pro --public --source . --remote origin --push
```

### 2) Push this local project (if you used web UI)

```bash
git add .
git commit -m "Initial RustHelper Pro site"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/rusthelper-pro.git
git push -u origin main
```

### 3) Link/open with VS Code

From terminal in this folder:

```bash
code .
```

If VS Code asks to trust the workspace, approve it.

## Project structure

- `index.html` - App layout and tool sections
- `styles.css` - Visual design, responsive layout, theme
- `app.js` - Data models and calculator logic

## Notes

Game values can be adjusted as Rust patches evolve or if your server uses custom rates.
