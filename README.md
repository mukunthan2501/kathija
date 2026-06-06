# ♡ For Kathija — A Luxury Romantic Website

A personal, handcrafted website built with love.

---

## Folder Structure

```
kathija-website/
├── index.html                  ← Main page (open this in a browser)
├── README.md
└── assets/
    ├── css/
    │   └── style.css           ← All styles
    ├── js/
    │   └── main.js             ← Countdown, player, interactions
    ├── audio/
    │   └── perfect.mp3         ← ⬅ Add your song file here
    └── images/
        └── favicon.svg         ← Tab icon
```

---

## How to Add the Song

1. Get an MP3 of **Perfect by Ed Sheeran**
2. Rename it to `perfect.mp3`
3. Drop it into `assets/audio/`
4. The player will automatically detect and use it — no code changes needed

---

## Deploy to GitHub Pages (Free Hosting)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — For Kathija ♡"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kathija-website.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save**

### Step 3 — Your site is live!
After ~60 seconds your site will be live at:
```
https://YOUR_USERNAME.github.io/kathija-website/
```

---

## Customise

| What | Where |
|------|-------|
| Name, dates, letter text | `index.html` |
| Colors, fonts, spacing | `assets/css/style.css` |
| Countdown target date | `assets/js/main.js` — line with `new Date('2026-06-08...')` |
| Password | `assets/js/main.js` — change `'kathija'` to anything |
| Bucket list items | `index.html` — the `<ul class="bl-items">` blocks |

---

*Made with love. 8 June 2026.*
