// Configuration for different environments
const CONFIG = {
    development: {
        API_BASE_URL: 'http://localhost:5000/api',
        ADMIN_API_URL: 'http://localhost:5000/admin/api'
    },
    production: {
        API_BASE_URL: '/api',
        ADMIN_API_URL: '/admin/api'
    },
    azure: {
        API_BASE_URL: 'https://victorious-island-00c16371e.1.azurestaticapps.net/api',
        ADMIN_API_URL: 'https://victorious-island-00c16371e.1.azurestaticapps.net/admin/api'
    }
};

// Auto-detect environment
function getEnvironment() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'development';
    } else if (hostname.includes('azurestaticapps.net')) {
        return 'azure';
    }
    return 'production';
}

// Export configuration
window.APP_CONFIG = CONFIG[getEnvironment()];
