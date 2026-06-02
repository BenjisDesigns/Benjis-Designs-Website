# Replacing placeholders — Benji's Designs site

## Quick start

1. Open `index.html` in your browser (double-click the file).
2. Replace all text in **[square brackets]** with your own copy.
3. Add images to the `images/` folder and uncomment the `<img>` lines in `index.html`.

## Image files (suggested names)

| File | Where it goes |
|------|----------------|
| `images/logo.png` | Header logo |
| `images/hero.jpg` | Hero section (large banner) |
| `images/about.jpg` | About section portrait |
| `images/project-1.jpg` … `project-6.jpg` | Portfolio gallery |

**Tip:** Use `.png` for logos (transparent background) and `.jpg` or `.webp` for photos.

## How to swap a placeholder for a real image

**Logo** — In `index.html`, find the header logo block. Comment out the placeholder `div` and uncomment:

```html
<img src="images/logo.png" alt="Your Brand Name" class="logo-img" />
```

**Hero / About / Projects** — Inside each `image-placeholder` div, add:

```html
<img src="images/your-file.jpg" alt="Describe the image for accessibility" />
```

The dashed box hides automatically when an `<img>` is present (modern browsers).

## Text placeholders

Search for `[` in `index.html` to find every placeholder string. Also update:

- `<title>` and `<meta name="description">` in the `<head>`
- Footer copyright line
- Contact email, phone, and location

## Contact form

The form sends messages to your inbox via [FormSubmit](https://formsubmit.co/).

1. Open **`js/contact-config.js`**
2. Replace `your@email.com` with your real email address
3. Optionally change the `subject` line

**First-time setup:** After your first test message, FormSubmit will email you a confirmation link — click it so future submissions are delivered.

**Testing locally:** Double-clicking `index.html` uses a `file://` URL and the form cannot send from that. Use a simple local server instead, for example in PowerShell from the site folder:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Colors

Edit `css/style.css` at the top (`:root` variables) to tweak purple shades or background white.

## Going live

Upload the entire folder to any static host (Netlify, Vercel, GitHub Pages, or your web host). No build step required.
