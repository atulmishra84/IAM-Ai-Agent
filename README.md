# IAM AI Agent - Production Ready

🚀 **Enterprise Identity Management Platform** deployed on Azure Static Web Apps

## 🌐 Live Application

- **Production URL**: https://wonderful-sky-0e74f0d1e.2.azurestaticapps.net/
- **Admin Dashboard**: https://wonderful-sky-0e74f0d1e.2.azurestaticapps.net/admin/
- **API Health**: https://wonderful-sky-0e74f0d1e.2.azurestaticapps.net/api/health

## 🔧 Core Features

### Identity Management
- **Azure AD Integration** - Single Sign-On and user provisioning
- **On-Premises AD** - Hybrid identity synchronization
- **ServiceNow Integration** - Automated ticket management
- **AI Copilot** - Intelligent identity recommendations

### Administration
- **User Management** - Provision, modify, and deactivate users
- **Role-Based Access Control** - Granular permission management
- **Audit Logging** - Comprehensive activity tracking
- **Real-time Analytics** - Identity health monitoring

### Security & Compliance
- **Multi-Factor Authentication** - Enhanced security controls
- **Compliance Reporting** - SOX, GDPR, HIPAA compliance
- **Risk Assessment** - AI-powered threat detection
- **Policy Enforcement** - Automated governance

## 📋 Production Architecture

```
Azure Static Web Apps
├── Frontend (HTML/CSS/JavaScript)
├── Admin Dashboard (/admin/)
├── Azure Functions API (/api/)
├── Static Assets (/static/)
└── GitHub Actions CI/CD
```

## 🔒 Environment Configuration

Production environment variables managed through Azure Static Web Apps:

- `AZURE_CLIENT_ID` - Azure AD application ID
- `AZURE_CLIENT_SECRET` - Azure AD application secret
- `SERVICENOW_INSTANCE` - ServiceNow instance URL
- `SERVICENOW_USERNAME` - ServiceNow service account
- `COPILOT_API_KEY` - AI Copilot integration key

## 🚀 Deployment Status

- ✅ **GitHub Repository**: Connected and automated
- ✅ **Azure Static Web Apps**: Production deployment
- ✅ **Custom Domain**: Ready for configuration
- ✅ **SSL Certificate**: Auto-managed by Azure
- ✅ **CI/CD Pipeline**: GitHub Actions integration

## 📞 Support

For production support and configuration assistance:
- **Repository**: https://github.com/atulmishra84/IAM-Ai-Agent
- **Documentation**: Available in admin dashboard
- **Health Monitoring**: Built-in API endpoints
