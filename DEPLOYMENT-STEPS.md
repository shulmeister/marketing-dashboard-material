# Deployment Instructions for Material Dashboard

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `marketing-dashboard-material`
3. Description: "Material Dashboard React with Marketing API Integration"
4. Make it Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

Run these commands in the terminal:

```bash
# Add GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/marketing-dashboard-material.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your `marketing-dashboard-material` repository
3. Set these environment variables:
   - `REACT_APP_USE_MOCK_DATA` = `false`
   - `REACT_APP_API_BASE_URL` = `https://marketing-dashboard-eta-three.vercel.app`
4. Deploy

## Step 4: Verify

1. Visit your deployed Material Dashboard
2. Check that it loads the Marketing Dashboard by default
3. Look for status indicators showing "Real Data" vs "Fallback Data"
4. Open browser console to see API requests and data

## Troubleshooting

- If you see "Fallback Data", check that your Next.js API backend is running
- Verify environment variables are set correctly
- Check browser network tab for failed API requests
- Make sure CORS is enabled on your Next.js backend for the new domain

## Next.js Backend (API)

Make sure your Next.js backend (original project) is deployed and accessible at:
https://marketing-dashboard-eta-three.vercel.app

The Material Dashboard will make requests to:

- /api/facebook
- /api/mailchimp
