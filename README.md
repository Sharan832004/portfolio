# Sharan — Portfolio

A dark, terminal-themed portfolio built with React + Vite.

## Run locally
npm install
npm run dev

## Build for production
npm run build
# outputs static files to ./dist

## Deploy
- Vercel: import this repo at vercel.com/new, framework preset "Vite", deploy.
- Netlify: drag the dist/ folder into app.netlify.com/drop, or connect the repo (build command: npm run build, publish dir: dist).
- GitHub Pages: push this repo to GitHub, then run `npm install gh-pages --save-dev`
  and add a `deploy` script, or use GitHub Actions with the official
  actions/deploy-pages workflow.
