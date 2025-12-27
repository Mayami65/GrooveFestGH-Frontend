# GrooveFest Frontend Deployment Guide

## Netlify Deployment

### Prerequisites
- GitHub account with the frontend repository
- Netlify account (free tier works fine)
- Backend deployed and running on Render

### Deployment Steps

#### 1. Prepare Your Repository

Make sure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

#### 2. Deploy to Netlify

**Option A: Using Netlify Dashboard (Recommended)**

1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Select your **frontend repository**
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Branch to deploy:** `main`

6. Click **"Show advanced"** and add environment variables:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://groovefestgh-backend.onrender.com`

7. Click **"Deploy site"**

**Option B: Using Netlify CLI**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts to connect your repository
```

#### 3. Configure Environment Variables

After deployment, go to:
1. **Site settings** → **Environment variables**
2. Add the following variable:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://groovefestgh-backend.onrender.com`

3. Click **"Save"**
4. Trigger a new deployment to apply changes

#### 4. Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your DNS

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://groovefestgh-backend.onrender.com` |

### Continuous Deployment

Netlify automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Netlify will automatically:
1. Detect the push
2. Run `npm run build`
3. Deploy the new version
4. Provide a preview URL

### Troubleshooting

#### Build Fails

1. Check build logs in Netlify dashboard
2. Ensure `package.json` has correct build script
3. Verify all dependencies are in `package.json`

#### API Calls Fail

1. Check `VITE_API_BASE_URL` is set correctly
2. Verify backend is running on Render
3. Check browser console for CORS errors
4. Ensure backend has correct CORS configuration

#### 404 on Refresh

This should be handled by `netlify.toml` redirects. If you still see 404s:
1. Verify `netlify.toml` is in the root directory
2. Check the `_redirects` file is being copied to `dist`

### Production Checklist

- [ ] Environment variables set in Netlify
- [ ] Backend URL points to production Render URL
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Netlify)
- [ ] Build succeeds without errors
- [ ] All routes work after page refresh
- [ ] API calls connect to backend successfully

### Useful Commands

```bash
# Test build locally
npm run build
npm run preview

# Check for build errors
npm run lint

# Deploy manually (if using CLI)
netlify deploy --prod
```

### Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router with Netlify](https://ui.dev/react-router-cannot-get-url-refresh)
