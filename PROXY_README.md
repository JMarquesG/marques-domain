# Vercel Proxy Configuration

This project uses a proxy configuration to serve multiple Vercel microservices under a single domain.

## How It Works

The root `vercel.json` file contains rewrite rules that route incoming requests to different microservices based on the URL path:

- `/docs/*` routes to the docs app
- All other paths route to the home app

## Deployment Instructions

1. Deploy each app individually to Vercel:
   ```
   cd apps/docs
   vercel deploy
   ```
   ```
   cd apps/home
   vercel deploy
   ```

2. Note the *.vercel.app URLs for each deployed app

3. Update the `vercel.json` file at the root with the correct destination URLs

4. Deploy the proxy configuration:
   ```
   vercel deploy
   ```

5. Assign your custom domain to the proxy project

## Adding New Services

To add a new service under a new path:

1. Deploy the new service to Vercel
2. Update the `vercel.json` file to include new rewrite rules for the service
3. Make sure to add the rules in the correct order (more specific paths first)
4. Redeploy the proxy configuration

## Notes

- Each app should use the appropriate `basePath` configuration if needed
- Make sure URL paths don't overlap between different apps
- The first matching rewrite rule will be used, so order matters 