# Fieldnote Product Inventory

Standalone React frontend for the LavaLust product API. The browser sends requests only to the API; it never connects directly to MySQL.

## Run locally

1. Copy `.env.example` to `.env`. The default API URL expects the LavaLust API at `http://127.0.0.1:3000/api`.
2. Run `npm install` and `npm run dev` from this directory.
3. Start LavaLust with `php lava serve` from the API repository.

The app supports registration, sign-in, and product create/read/update/delete. Access and refresh tokens are stored in browser local storage; the frontend refreshes expired access tokens and revokes the refresh token on sign-out.

## Build and deploy as a separate frontend

Use the standalone Vite mode when hosting this project separately from the LavaLust API:

```sh
npm run build -- --mode standalone
```

The build output is `dist/`. For a static host such as Render, use `npm ci && npm run build -- --mode standalone` as the build command and `dist` as the publish directory. Set `VITE_API_BASE_URL` in the host's build-time environment to the public LavaLust API URL ending in `/api`, for example `https://your-api.example.com/api`.

Also set `CORS_ALLOWED_ORIGIN` in the API's environment to the exact public frontend origin, such as `https://your-frontend.onrender.com`. These settings contain URLs, not database credentials. Keep API secrets and all database credentials in the API host's environment; never put them in this frontend project.

## Publish this directory as its own GitHub repository

Create an empty GitHub repository, then run these commands from this directory (replace the URL with your new repository URL):

```sh
git init
git add .
git commit -m "Prepare standalone product inventory frontend"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-FRONTEND-REPOSITORY.git
git push -u origin main
```

The `.gitignore` excludes `.env`, dependencies, and build output.