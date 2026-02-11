# 🚀 Deployment Guide for GitHub Pages

This guide will help you deploy the Email Generator to GitHub Pages in just a few minutes.

## Quick Start - Easiest Method

### Option 1: Deploy Pre-built Files (Fastest)

1. **Create a GitHub repository**
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (name it something like `email-generator`)
   - Make it public
   - Don't add README, .gitignore, or license

2. **Upload the dist folder**
   - In your new repository, click "uploading an existing file"
   - Drag and drop the `index.html` file from the `dist` folder
   - Commit the changes

3. **Enable GitHub Pages**
   - Go to Settings → Pages (in the left sidebar)
   - Under "Source", select "Deploy from a branch"
   - Select your branch (main/master) and `/ (root)` folder
   - Click Save
   - Wait 1-2 minutes

4. **Done!** 🎉
   - Your site will be live at `https://yourusername.github.io/email-generator/`
   - The URL will appear at the top of the Pages settings

---

## Option 2: Deploy Full Source Code with Auto-Build

This method automatically rebuilds the site whenever you push changes.

1. **Create a GitHub repository**
   - Create a new repository on GitHub
   - Clone it to your computer or use GitHub Desktop

2. **Add all project files**
   ```bash
   # Copy all files from this project to your repository folder
   # Then commit and push:
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Enable GitHub Pages with Actions**
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow file (`.github/workflows/deploy.yml`) is already included!

4. **Trigger deployment**
   - Push any change or go to Actions tab and run workflow manually
   - Wait for the build to complete

5. **Done!** 🎉
   - Your site will be live at `https://yourusername.github.io/repository-name/`

---

## Option 3: Using GitHub Desktop (No Command Line)

1. **Install GitHub Desktop** (if you haven't)
   - Download from [desktop.github.com](https://desktop.github.com/)

2. **Create repository**
   - File → New Repository
   - Name: `email-generator`
   - Choose a location on your computer
   - Click "Create Repository"

3. **Add files**
   - Copy all project files into the repository folder
   - GitHub Desktop will show all the new files
   - Add a commit message: "Initial commit"
   - Click "Commit to main"

4. **Publish to GitHub**
   - Click "Publish repository"
   - Uncheck "Keep this code private" (GitHub Pages requires public repos for free)
   - Click "Publish Repository"

5. **Enable GitHub Pages**
   - Go to your repository on GitHub.com
   - Settings → Pages
   - Source: "GitHub Actions"
   - Done!

---

## 🔧 Customization

Before deploying, you might want to customize:

- Update `index.html` title (currently "Email Generator")
- Change the company domain in the default email format
- Modify colors in `src/App.tsx`

---

## 📝 What Gets Deployed

- The `dist/index.html` file contains the entire app (HTML, CSS, JavaScript)
- It's a single-file application - everything is bundled together
- No server required - works as a static site

---

## 🐛 Troubleshooting

**Site not loading?**
- Make sure your repository is public
- Check that GitHub Pages is enabled in Settings
- Wait a few minutes after enabling Pages

**Build failing?**
- Check the Actions tab for error messages
- Make sure all files were uploaded correctly
- Verify that package.json exists in the root

**404 error?**
- Check the correct URL format: `https://username.github.io/repository-name/`
- Make sure you selected the correct branch and folder in Pages settings

---

## 🎯 Next Steps

After deployment, you can:
- Share the URL with anyone
- Add a custom domain (Settings → Pages → Custom domain)
- Make changes and push to update the live site
- Monitor usage with GitHub's traffic stats

---

## 📦 Files Included

```
email-generator/
├── dist/
│   └── index.html          # Built app (ready to deploy)
├── src/
│   ├── App.tsx            # Main application
│   ├── main.tsx           # Entry point
│   └── index.css          # Styles
├── .github/
│   └── workflows/
│       └── deploy.yml     # Auto-deployment workflow
├── index.html             # Template
├── package.json           # Dependencies
├── README.md              # Project info
└── DEPLOYMENT.md          # This file
```

---

## 💡 Tips

- **Custom Domain**: You can use your own domain (e.g., emailgen.com) by adding a CNAME file
- **Analytics**: Add Google Analytics by editing the index.html
- **SEO**: The single-file build is SEO-friendly
- **Speed**: The site loads incredibly fast (no external dependencies)

Need help? Open an issue on GitHub or check the [GitHub Pages documentation](https://docs.github.com/en/pages).
