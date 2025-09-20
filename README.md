# IAM AI Agent - Azure Static Web App

This is the production-ready static web application for IAM AI Agent, optimized for deployment on Azure Static Web Apps.

## Deployment Instructions

### 1. Azure Static Web Apps Deployment

1. **Create Azure Static Web App:**
   ```bash
   az staticwebapp create \
     --name iam-ai-agent \
     --resource-group your-resource-group \
     --source https://github.com/your-username/iam-ai-agent \
     --location "Central US" \
     --branch main \
     --app-location "/" \
     --api-location "api" \
     --output-location ""
   ```

2. **Configure Environment Variables:**
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `AZURE_CLIENT_ID`: Azure AD application client ID
   - `AZURE_CLIENT_SECRET`: Azure AD application secret
   - `AZURE_TENANT_ID`: Azure AD tenant ID

3. **Custom Domain (Optional):**
   ```bash
   az staticwebapp hostname set \
     --name iam-ai-agent \
     --resource-group your-resource-group \
     --hostname your-domain.com
   ```

### 2. Manual Deployment

1. **Upload to Azure Storage:**
   ```bash
   az storage blob upload-batch \
     --destination '$web' \
     --source . \
     --account-name yourstorageaccount
   ```

2. **Configure CDN (Optional):**
   - Set up Azure CDN for global distribution
   - Configure SSL certificate
   - Set up custom domain

### 3. GitHub Actions Deployment

The included workflow file automatically deploys to Azure Static Web Apps when you push to the main branch.

## File Structure

```
├── index.html              # Main landing page
├── admin/                  # Administration dashboard
│   ├── index.html          # Admin interface
│   ├── app.js             # Admin functionality
│   ├── styles.css         # Admin styling
│   └── config.js          # Environment configuration
├── demo/                   # Interactive demo
│   └── interactive-demo.html
├── api/                    # Azure Functions API
│   ├── health/            # Health check endpoint
│   └── admin-health/      # Admin health endpoint
├── staticwebapp.config.json # Azure Static Web Apps config
└── package.json           # Project configuration
```

## Environment Configuration

The application automatically detects the deployment environment:

- **Development**: `localhost:5000`
- **Production**: Current domain
- **Azure**: `*.azurestaticapps.net`

## Security Features

- Content Security Policy headers
- X-Frame-Options protection
- Authentication routing
- CORS configuration
- HTTPS enforcement

## Monitoring

- Application Insights integration
- Custom health check endpoints
- Performance monitoring
- Error tracking
