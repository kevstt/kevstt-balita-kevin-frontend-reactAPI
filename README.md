# LavaLust Product Frontend

Standalone React frontend for the LavaLust API backend. The browser sends requests only to the API; it never connects directly to MySQL. The standalone Render build is configured to use `https://balita-kevin-lavalust-migration-api-1.onrender.com/api` by default.

## Run locally

1. Copy `.env.example` to `.env`. The default API URL expects the LavaLust API at `http://127.0.0.1:3000/api`.
2. Run `npm install` and `npm run dev` from this directory.
3. Start LavaLust with `php lava serve` from the API repository.

The app supports registration, sign-in, and product create/read/update/delete. Access and refresh tokens are stored in browser local storage; the frontend refreshes expired access tokens and revokes the refresh token on sign-out.

## Build and deploy as a separate frontend

Deploy this repository as a Render **Static Site** with these settings:

- Build command: `npm ci && npm run build -- --mode standalone`
- Publish directory: `dist`
- Build environment variable `VITE_API_BASE_URL`: the public LavaLust API URL ending in `/api` (the checked-in `.env.standalone` supplies the current API URL; a Render environment value overrides it)

The API Render service must set `CORS_ALLOWED_ORIGIN` to the exact public origin Render assigns to this Static Site, without a trailing slash. The browser needs this permission to call the API from the frontend domain. Keep API secrets and all database credentials in the API host's environment; never put them in this frontend project.

To build against a different API, override `VITE_API_BASE_URL` in the frontend host's build environment. For local development, `.env.example` points to `http://127.0.0.1:3000/api` and the API's `CORS_ALLOWED_ORIGIN` should allow the local Vite origin.

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

The `.gitignore` excludes `.env`, dependencies, and build output. `.env.standalone` contains only the public API URL used by the standalone build.
