# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

## Setup Instructions

### 1. Connect to GitHub (if not already connected)

1. In Lovable, click the **GitHub** button in the top-right
2. Click **Connect to GitHub**
3. Authorize the Lovable GitHub App
4. Click **Create Repository** to create your GitHub repo

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** > **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 3. Deploy

The deployment happens automatically! Every time you:
- Push code to the `main` branch in Lovable
- Push commits to the `main` branch via Git
- Click "Run workflow" manually in GitHub Actions

The site will be automatically built and deployed to:
```
https://[your-username].github.io/ediacara-timescape-me/
```

### 4. Check Deployment Status

1. Go to your GitHub repository
2. Click the **Actions** tab
3. You'll see the deployment workflow running
4. Once complete (green checkmark), your site is live!

## Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Updating the Site

Simply make changes in Lovable or push to GitHub - the site updates automatically!

## Custom Domain (Optional)

To use a custom domain:

1. In your GitHub repo, go to **Settings** > **Pages**
2. Under **Custom domain**, enter your domain name
3. Add a `CNAME` file to the `public/` folder with your domain
4. Configure your DNS provider to point to GitHub Pages

## Troubleshooting

### Site not loading after deployment?
- Check the Actions tab for build errors
- Verify GitHub Pages is enabled in Settings
- Wait a few minutes for DNS propagation

### 404 errors on page refresh?
- GitHub Pages doesn't support client-side routing by default
- The deployment is configured to handle this with a 404.html fallback

### Images or assets not loading?
- Make sure all asset paths are relative (e.g., `/images/photo.jpg`)
- Assets in the `public/` folder will be copied to the root of your deployment

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Static Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Lovable GitHub Integration](https://docs.lovable.dev)
