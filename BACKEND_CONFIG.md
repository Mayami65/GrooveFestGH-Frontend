# Backend URL Configuration

## Overview
The frontend application uses a centralized configuration system to manage the backend API URL. This makes it easy to update the backend URL for different environments (development, staging, production).

## How to Update the Backend URL

### Method 1: Environment Variable (Recommended)
1. Open the `.env` file in the frontend root directory
2. Update the `VITE_API_BASE_URL` value:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   ```
3. Restart the development server for changes to take effect

### Method 2: Direct Config File
If you need to change the fallback URL, edit `src/config.js`:
```javascript
apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://your-fallback-url.com',
```

## Configuration Files

- **`.env`** - Environment-specific configuration (not committed to git)
- **`.env.example`** - Template for environment variables (committed to git)
- **`src/config.js`** - Centralized configuration with API endpoints

## Important Notes

- The `.env` file is gitignored and should not be committed
- After changing the backend URL, restart the dev server: `npm run dev`
- For production builds, set the environment variable before building
- All API calls now use the `getApiUrl()` helper function from `src/config.js`

## Example URLs

Development:
```
VITE_API_BASE_URL=http://localhost:8000
```

Production:
```
VITE_API_BASE_URL=https://api.groovefestgh.com
```
