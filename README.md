# MEGTScale - Middle East Geologic Time Scale

An interactive web application for exploring stratigraphic sections and radiometric data from the Ediacaran Period in the Middle East.

**URL**: https://lovable.dev/projects/10cd6de9-e228-43c9-aacb-e9a2eda13747

## 🚀 Deploy to GitHub Pages

### Quick Setup (3 Steps)

#### 1. Connect to GitHub (in Lovable)
- Click **GitHub** → **Connect to GitHub**
- Authorize Lovable GitHub App
- Click **Create Repository**

#### 2. Enable GitHub Pages
- Go to your GitHub repository
- **Settings** → **Pages**
- Under **Source**, select **GitHub Actions**
- Save

#### 3. Deploy!
Push code to main branch (happens automatically in Lovable) and your site goes live at:
```
https://[your-username].github.io/ediacara-timescape-me/
```

**Check Status**: Go to the **Actions** tab in GitHub to watch deployment

---

## 📦 Features

- **Interactive Map**: Explore GPS-located stratigraphic sections with filtering
- **Time Scale**: Browse geological events and timeline
- **Data Portal**: Search and visualize radiometric data
- **Dataset Updates**: Detailed sections with photos, DOIs, and radiometric data

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Adding Data

### Stratigraphic Sections (`public/data/stratigraphic_sections.csv`)
- `id`, `name`, `period`, `ageMinMa`, `ageMaxMa`
- `terrane`, `rockType`, `lat`, `lng`
- `description`, `photoUrl`, `dataSourceDoi`

### Radiometric Data (`public/data/radiometric_data.csv`)
- `id`, `sectionId` (links to section)
- `isotopeSystem`, `mineral`, `ageMa`, `errorMa`
- `labMethod`, `reference`, `doi`, `notes`

## 🔗 Custom Domain

1. Add `CNAME` file to `public/` with your domain
2. GitHub: **Settings** → **Pages** → **Custom domain**
3. Update DNS records

## 📖 Documentation

- [Full Deployment Guide](DEPLOYMENT.md)
- [Lovable Docs](https://docs.lovable.dev)

## 🏗️ Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Leaflet for maps
- Recharts for visualizations
