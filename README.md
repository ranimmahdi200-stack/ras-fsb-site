# IEEE RAS FSB SB — Website

Premium, dark, glassmorphism website for IEEE Robotics & Automation
Society — Faculty of Sciences of Bizerte Student Branch.

## Structure

```
index.html
css/
  style.css        base styles, tokens, components
  responsive.css    media queries / breakpoints
js/
  animations.js     custom cursor + scroll-reveal
  main.js           navbar behavior + data-driven sections
  game.js           "Signal Catch" hero mini-game
  chatbot.js        chat widget UI (calls /api/chat)
assets/
  images/ logos/ videos/   drop your media here
server/
  server.js         Express backend, proxies to Gemini
  package.json
  .env.example       copy to .env and add GEMINI_API_KEY
```

## Run it

**Static-only preview** (chatbot runs in offline demo mode):
just open `index.html` in a browser, or serve the folder with any
static file server.

**Full site with the live Gemini chatbot:**
```bash
cd server
npm install
cp .env.example .env   # then add your real GEMINI_API_KEY
npm start
```
Then open http://localhost:3000 — the server serves the static site
and the `/api/chat` endpoint.

## To customize

- Team members: edit the `team` array in `js/main.js`
- Activities: edit the `activities` array in `js/main.js`
- Projects: edit the `projects` array in `js/main.js`
- Social links: update the `href="#"` placeholders in `index.html`
  (Platforms and Contact sections) and the `platforms` array in `js/main.js`
- Video: replace the `alert()` in the play-button handler in `js/main.js`
  with your real video embed/source
- Colors: CSS custom properties at the top of `css/style.css`
