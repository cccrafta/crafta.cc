# crafta.cc

A web application with a Next.js frontend and WordPress backend.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, TypeScript
- **Backend:** WordPress (PHP)
- **Database:** MySQL
- **Deployment:** Cloudflare Pages (via OpenNext)

## Prerequisites

- PHP
- MySQL
- Node.js
- npm

Install on macOS with Homebrew:

```bash
brew install php mysql node
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd crafta-cc
   ```

2. Run the setup script (downloads WordPress, creates the database, installs dependencies):

   ```bash
   ./setup.sh
   ```

3. Start the development servers:

   ```bash
   ./start.sh
   ```

- WordPress: http://localhost:8080
- Next.js: http://localhost:3000
