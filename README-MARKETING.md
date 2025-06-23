# Marketing Analytics Dashboard

A beautiful, production-ready marketing analytics dashboard built with Material Dashboard React, featuring real-time integration with Facebook Ads and Mailchimp.

## Features

- 📊 **Real-time Analytics**: Live data from Facebook Ads and Mailchimp
- 🎨 **Beautiful UI**: Modern Material Design interface
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🔄 **Auto-refresh**: Real-time data updates
- 🎯 **Key Metrics**: Track subscribers, campaigns, ad spend, and performance

## Quick Start

### 1. Install Dependencies

```bash
cd material-dashboard
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and configure your settings:

```env
# For development, use mock data
REACT_APP_USE_MOCK_DATA=true

# For production, set your backend API URL
REACT_APP_API_BASE_URL=http://localhost:3000

# Optional: Direct API credentials (not recommended for production)
# REACT_APP_MAILCHIMP_API_KEY=your_api_key_here
# REACT_APP_FACEBOOK_ACCESS_TOKEN=your_token_here
```

### 3. Start Development Server

```bash
npm start
```

The dashboard will open at `http://localhost:3000` (or next available port).

## Data Sources

### Option 1: Mock Data (Default)

Set `REACT_APP_USE_MOCK_DATA=true` to use sample data for development and demos.

### Option 2: API Backend

Point `REACT_APP_API_BASE_URL` to your backend API (like the Next.js app in the parent directory).

### Option 3: Direct API Integration

Set your API credentials directly in environment variables (not recommended for production).

## Dashboard Features

### Marketing Metrics Cards

- **Email Subscribers**: Total Mailchimp subscribers with growth percentage
- **Email Campaigns**: Campaign count with average open rate
- **Facebook Impressions**: Total ad impressions with CTR
- **Ad Spend**: Total spend with average CPM

### Interactive Charts

- **Mailchimp Overview**: Bar chart showing subscribers, campaigns, and lists
- **Facebook Ads Performance**: Visual representation of impressions, clicks, and spend
- **Campaign Performance**: Recent email campaign metrics

### Real-time Updates

- Refresh button to update all data
- Automatic error handling with fallback to mock data
- Loading states and error messages

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify (Recommended)

1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

## Environment Variables

| Variable                          | Description                        | Required                     |
| --------------------------------- | ---------------------------------- | ---------------------------- |
| `REACT_APP_USE_MOCK_DATA`         | Use mock data instead of real APIs | No                           |
| `REACT_APP_API_BASE_URL`          | Backend API URL                    | Yes (if not using mock data) |
| `REACT_APP_MAILCHIMP_API_KEY`     | Mailchimp API key                  | No                           |
| `REACT_APP_FACEBOOK_ACCESS_TOKEN` | Facebook access token              | No                           |

## API Integration

The dashboard expects your backend API to have these endpoints:

- `GET /api/mailchimp?type=overview` - Mailchimp overview data
- `GET /api/mailchimp?type=campaigns` - Campaign data
- `GET /api/facebook?date_range=yesterday` - Facebook insights

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port with `PORT=3001 npm start`
2. **API errors**: Enable mock data with `REACT_APP_USE_MOCK_DATA=true`
3. **Build errors**: Check all environment variables are set correctly

## Customization

### Adding New Metrics

1. Update the API services in `src/api/`
2. Modify the `useMarketingData` hook
3. Add new cards or charts to `MarketingDashboard`

### Styling

The dashboard uses Material-UI components. Customize the theme in `src/assets/theme/`.

## Support

This dashboard integrates with:

- ✅ Mailchimp (Email marketing)
- ✅ Facebook Ads (Social media advertising)
- 🔲 Google Analytics (Website analytics) - Coming soon
- 🔲 Google Ads (Search advertising) - Coming soon

## License

Based on Material Dashboard React by Creative Tim.
