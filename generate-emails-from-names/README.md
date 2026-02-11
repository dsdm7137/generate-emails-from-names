# Email Generator

A simple and elegant web application that generates email addresses from a comma-separated list of names using customizable email formats.

## Features

- 📝 Input comma-separated names
- ✉️ Customize email format with placeholders
- 🚀 Real-time email generation
- 📋 Copy individual or all emails at once
- 🎨 Clean, modern UI with Tailwind CSS
- 📱 Fully responsive design

## How to Use

1. Enter names separated by commas (e.g., "John Doe, Jane Smith, Robert Johnson")
2. Customize the email format using placeholders:
   - `firstname` - Full first name
   - `lastname` - Full last name
   - `f` - First initial
   - `l` - Last initial
3. Click "Generate Emails"
4. Copy individual emails or all at once

## Example Formats

- `firstname.lastname@company.com` → john.doe@company.com
- `f.lastname@company.com` → j.doe@company.com
- `firstnamel@company.com` → johnd@company.com
- `firstname_lastname@company.com` → john_doe@company.com

## Deploy to GitHub Pages

### Method 1: Using the built files directly

1. Create a new repository on GitHub
2. Upload the contents of the `dist` folder to your repository
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select the branch with your files (usually `main` or `master`) and the root folder
6. Click Save
7. Your site will be live at `https://yourusername.github.io/repository-name/`

### Method 2: Deploy from source with GitHub Actions

1. Create a new repository on GitHub
2. Upload all files from this project (including package.json, src, etc.)
3. Create a file `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```

4. Go to repository Settings → Pages
5. Under "Source", select "GitHub Actions"
6. Push your code - the site will automatically build and deploy

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS

## License

MIT License - feel free to use this project for any purpose.
