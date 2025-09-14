# Urban Bees Website

A fast, accessible, responsive multi-page website for Urban Bees, built with vanilla HTML, CSS, and JS.

## Features
- Multi-page site: Home, Bees, Bee Forage, Partnerships, Links, Videos, Books, About Us, Contact, Blog, 404
- Consistent nav bar and footer on every page
- Mobile-first, accessible design (WCAG 2.2 AA)
- Lazy-loaded images, minified CSS/JS for production
- SEO: unique titles/descriptions, Open Graph/Twitter tags
- Contact form (Formspree) with client-side validation
- Blog post listing
- Basic PWA support

## Folder Structure
```
project/
├── index.html
├── bees.html
├── bee-forage.html
├── partnerships.html
├── links.html
├── videos.html
├── books.html
├── about-us.html
├── contact.html
├── blog.html
├── 404.html
├── favicon.ico
├── robots.txt
├── site.webmanifest
├── css/
│   ├── styles.css
│   └── styles.min.css
├── js/
│   ├── main.js
│   └── main.min.js
└── images/
    ├── logo.png
    ├── icons/
    └── content/
```

## Setup & Development
1. Clone or download the repository.
2. Add your images to the `images/` folders.
3. Update `contact.html` with your Formspree form ID.
4. Edit page content as needed.

## Build (Minify CSS/JS)
You can use [npm](https://nodejs.org/) and [clean-css-cli](https://www.npmjs.com/package/clean-css-cli) / [uglify-js](https://www.npmjs.com/package/uglify-js) for minification:

```
npm install -g clean-css-cli uglify-js
cleancss -o css/styles.min.css css/styles.css
uglifyjs js/main.js -o js/main.min.js -c -m
```

## Deployment
- Host on GitHub Pages, Netlify, Vercel, or any static host.
- Ensure `404.html` is configured for not found pages.
- Update `robots.txt` and `site.webmanifest` as needed.

## Accessibility & Performance
- Designed for Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90 (mobile)
- Semantic HTML, ARIA, keyboard navigation, skip link, focus outlines

## Customization
- Update colors, fonts, and images in `css/styles.css` and `images/`
- Add blog posts as cards in `blog.html` or create detail pages in `/blog/`

## License
MIT
