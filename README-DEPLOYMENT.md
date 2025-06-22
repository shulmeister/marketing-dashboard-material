# Marketing Dashboard - Material Design

A beautiful Material Dashboard React application with real marketing data from Facebook Ads and Mailchimp.

## Features

- 🎨 Beautiful Material Design UI
- 📊 Real Facebook Ads data integration
- 📧 Real Mailchimp email marketing data
- 📈 Interactive charts and metrics
- 📱 Responsive design
- 🔄 Real-time data refresh

## Environment Setup

### Development
1. Copy `.env.example` to `.env.local`
2. Set `REACT_APP_USE_MOCK_DATA=false` to use real data
3. Set `REACT_APP_API_BASE_URL=http://localhost:3000` (your Next.js API server)

### Production
1. Set environment variables in your deployment platform:
   - `REACT_APP_USE_MOCK_DATA=false`
   - `REACT_APP_API_BASE_URL=https://your-nextjs-api-domain.com`

## API Backend

This React app connects to a Next.js API backend that provides:
- `/api/facebook` - Facebook Ads insights
- `/api/mailchimp` - Mailchimp email marketing data

Make sure your Next.js backend is deployed and accessible.

## Deployment

### Vercel (Recommended)
1. Connect this repository to Vercel
2. Set environment variables:
   - `REACT_APP_USE_MOCK_DATA=false`
   - `REACT_APP_API_BASE_URL=https://your-nextjs-api.vercel.app`
3. Deploy

### Other Platforms
1. Build: `npm run build`
2. Deploy the `build/` folder
3. Set environment variables as needed

## Development

```bash
npm install
npm start
```

## Data Sources

- **Real Data**: Connects to your Next.js API backend
- **Fallback Data**: Uses mock data when APIs are unavailable
- **Status Indicators**: Clear indicators show when using real vs mock data

## Key Components

- `src/layouts/marketing-dashboard/` - Main dashboard layout
- `src/hooks/useMarketingData.js` - Data fetching hook
- `src/api/` - API service files
- `.env.production` - Production environment config
