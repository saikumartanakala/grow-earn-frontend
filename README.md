# Grow Earn Frontend

Frontend application built with React, TypeScript, and Vite.

## Server Setup & Dependencies

### System requirements
- Node.js >= 18 (LTS) — Node 20 recommended
- npm (bundled with Node) or `corepack` if preferred

### Project runtime dependencies
- axios ^1.13.2
- jwt-decode ^4.0.0
- react ^19.2.0
- react-dom ^19.2.0
- react-router-dom ^7.11.0

### Dev / build dependencies
- @eslint/js ^9.39.1
- @types/node ^24.10.1
- @types/react ^19.2.5
- @types/react-dom ^19.2.3
- @vitejs/plugin-react ^5.1.1
- autoprefixer ^10.4.23
- eslint ^9.39.1
- eslint-plugin-react-hooks ^7.0.1
- eslint-plugin-react-refresh ^0.4.24
- globals ^16.5.0
- postcss ^8.5.6
- tailwindcss ^3.4.17
- typescript ~5.9.3
- typescript-eslint ^8.46.4
- vite ^7.2.4

### Step-by-step installation (example)

1. Clone the repo and change directory (replace the URL):

```bash
git clone <your-repo-url>
cd grow-earn-frontend
```

2. Install Node.js on the server (example for Ubuntu/Debian using NodeSource):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

On Windows, download and install Node.js from: https://nodejs.org/

3. Install project dependencies (use `npm ci` on CI / clean installs):

```bash
npm ci
# or for a local developer install
npm install
```

4. Build the production assets:

```bash
npm run build
```

5. Serve production files
- Quick local preview (not for production):

```bash
npm run preview
```

- Serve `dist` with a static server (recommended for production):

```bash
# install a static server globally (optional)
npm install -g serve
serve -s dist -l 3000
```

Alternatively, configure an HTTP server (Nginx, Apache) to serve the files in the `dist` folder.

### Environment variables
- If the app expects runtime variables, create a `.env` file at the project root with any `VITE_` prefixed variables (for example `VITE_API_BASE_URL=https://api.example.com`).

### Notes
- The `devDependencies` are required to build the project on the server. For CI or build servers, ensure you install dependencies and run `npm run build` before deploying the `dist` folder to a static host.
- For production, prefer building on CI and deploying only the `dist` output to the server that will host static files.

### Deploy scripts
- A pair of convenience scripts are included in the `scripts/` folder:
	- `scripts/deploy.sh` — simple Linux/macOS deploy using `rsync` over SSH
	- `scripts/deploy.ps1` — simple Windows/PowerShell deploy using `scp`

Usage examples:

```bash
# Linux/macOS (example)
REMOTE_USER=user REMOTE_HOST=example.com REMOTE_DIR=/var/www/grow-earn-frontend ./scripts/deploy.sh

# Windows PowerShell (example)
.\n+\scripts\deploy.ps1 -RemoteUser user -RemoteHost example.com -RemoteDir /var/www/grow-earn-frontend
```




check 1
