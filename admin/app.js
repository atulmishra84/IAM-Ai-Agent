// IAM AI Agent - Admin Dashboard JavaScript

class AdminDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.apiBaseUrl = window.APP_CONFIG?.API_BASE_URL || '/api';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.startRealTimeUpdates();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('open');
            });
        }

        // User menu dropdown
        const userButton = document.querySelector('.user-button');
        const userDropdown = document.querySelector('.user-dropdown');
        if (userButton && userDropdown) {
            userButton.addEventListener('click', () => {
                userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userButton.contains(e.target)) {
                    userDropdown.style.display = 'none';
                }
            });
        }

        // Integration card actions
        this.setupIntegrationActions();
    }

    navigateToSection(section) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).parentElement.classList.add('active');

        // Update page title
        const titles = {
            'dashboard': 'Dashboard',
            'integrations': 'Integration Management',
            'azure-ad': 'Azure Active Directory',
            'onprem-ad': 'On-Premise Active Directory',
            'servicenow': 'ServiceNow Integration',
            'copilot': 'AI Copilot Configuration',
            'third-party': 'Third Party Applications',
            'users': 'User Management',
            'security': 'Security Settings',
            'logs': 'Audit Logs',
            'settings': 'System Settings'
        };
        document.querySelector('.page-title').textContent = titles[section] || 'Dashboard';

        // Show/hide sections
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        this.currentSection = section;
        this.loadSectionData(section);
    }

    async loadSectionData(section) {
        try {
            switch (section) {
                case 'dashboard':
                    await this.loadDashboardData();
                    break;
                case 'integrations':
                    await this.loadIntegrationsData();
                    break;
                case 'azure-ad':
                    await this.loadAzureADConfig();
                    break;
                case 'onprem-ad':
                    await this.loadOnPremADConfig();
                    break;
                case 'servicenow':
                    await this.loadServiceNowConfig();
                    break;
                case 'copilot':
                    await this.loadCopilotConfig();
                    break;
                case 'third-party':
                    await this.loadThirdPartyApps();
                    break;
                case 'users':
                    await this.loadUserManagement();
                    break;
                case 'security':
                    await this.loadSecuritySettings();
                    break;
                case 'logs':
                    await this.loadAuditLogs();
                    break;
                case 'settings':
                    await this.loadSystemSettings();
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${section} data:`, error);
            this.showToast('Error loading data', 'error');
        }
    }

    async loadInitialData() {
        await this.loadDashboardData();
    }

    async loadDashboardData() {
        try {
            // Simulate API calls - replace with actual API endpoints
            const [healthData, statsData, activityData] = await Promise.all([
                this.fetchHealthStatus(),
                this.fetchSystemStats(),
                this.fetchRecentActivity()
            ]);

            this.updateHealthMetrics(healthData);
            this.updateStats(statsData);
            this.updateRecentActivity(activityData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    async fetchHealthStatus() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/health`);
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            return { status: 'error', message: 'Health check failed' };
        }
    }

    async fetchSystemStats() {
        // Simulate API response - replace with actual API
        return {
            azureUsers: 1247,
            onPremUsers: 892,
            serviceNowTickets: 156,
            aiRequests: 2341,
            cpuUsage: 45,
            memoryUsage: 62,
            responseTime: 247
        };
    }

    async fetchRecentActivity() {
        // Simulate API response - replace with actual API
        return [
            {
                icon: 'fas fa-user-plus',
                type: 'success',
                message: 'New user provisioned in Azure AD',
                timestamp: '2 minutes ago'
            },
            {
                icon: 'fas fa-sync',
                type: 'info',
                message: 'AD synchronization completed',
                timestamp: '15 minutes ago'
            },
            {
                icon: 'fas fa-ticket-alt',
                type: 'warning',
                message: 'ServiceNow ticket created',
                timestamp: '1 hour ago'
            }
        ];
    }

    updateHealthMetrics(healthData) {
        const statusIndicator = document.querySelector('.system-status .status-indicator');
        const statusText = document.querySelector('.system-status span');
        
        if (healthData.status === 'Online' || healthData.status === 'ok') {
            statusIndicator.className = 'status-indicator online';
            statusText.textContent = 'System Online';
        } else {
            statusIndicator.className = 'status-indicator offline';
            statusText.textContent = 'System Offline';
        }
    }

    updateStats(stats) {
        document.getElementById('azure-users').textContent = stats.azureUsers.toLocaleString();
        document.getElementById('onprem-users').textContent = stats.onPremUsers.toLocaleString();
        document.getElementById('servicenow-tickets').textContent = stats.serviceNowTickets.toLocaleString();
        document.getElementById('ai-requests').textContent = stats.aiRequests.toLocaleString();

        // Update progress bars
        const progressBars = document.querySelectorAll('.progress');
        if (progressBars[0]) progressBars[0].style.width = `${stats.cpuUsage}%`;
        if (progressBars[1]) progressBars[1].style.width = `${stats.memoryUsage}%`;
        if (progressBars[2]) progressBars[2].style.width = `${Math.min(stats.responseTime / 10, 100)}%`;

        // Update metric values
        const metricSpans = document.querySelectorAll('.metric span');
        if (metricSpans[0]) metricSpans[0].textContent = `${stats.cpuUsage}%`;
        if (metricSpans[1]) metricSpans[1].textContent = `${stats.memoryUsage}%`;
        if (metricSpans[2]) metricSpans[2].textContent = `${stats.responseTime}ms`;
    }

    updateRecentActivity(activities) {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <i class="${activity.icon} text-${activity.type}"></i>
                <div class="activity-content">
                    <p>${activity.message}</p>
                    <span class="timestamp">${activity.timestamp}</span>
                </div>
            </div>
        `).join('');
    }

    setupIntegrationActions() {
        // Add event listeners for integration configuration buttons
        document.addEventListener('click', async (e) => {
            if (e.target.matches('.btn[onclick*="configure"]') || e.target.closest('.btn')?.textContent.includes('Configure')) {
                e.preventDefault();
                const integrationCard = e.target.closest('.integration-card');
                const integrationName = integrationCard.querySelector('h3').textContent;
                await this.openIntegrationConfig(integrationName);
            }

            if (e.target.matches('.btn[onclick*="test"]') || e.target.closest('.btn')?.textContent.includes('Test')) {
                e.preventDefault();
                const integrationCard = e.target.closest('.integration-card');
                const integrationName = integrationCard.querySelector('h3').textContent;
                await this.testIntegration(integrationName);
            }
        });
    }

    async openIntegrationConfig(integrationName) {
        this.showLoadingOverlay();
        
        try {
            // Simulate opening configuration modal
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            switch (integrationName) {
                case 'Microsoft Azure AD':
                    this.navigateToSection('azure-ad');
                    break;
                case 'On-Premise Active Directory':
                    this.navigateToSection('onprem-ad');
                    break;
                case 'ServiceNow':
                    this.navigateToSection('servicenow');
                    break;
                case 'AI Copilot':
                    this.navigateToSection('copilot');
                    break;
                default:
                    this.showToast(`Opening ${integrationName} configuration...`, 'info');
            }
        } catch (error) {
            this.showToast('Error opening configuration', 'error');
        } finally {
            this.hideLoadingOverlay();
        }
    }

    async testIntegration(integrationName) {
        this.showLoadingOverlay();
        
        try {
            // Simulate API test call
            const testResult = await this.performIntegrationTest(integrationName);
            
            if (testResult.success) {
                this.showToast(`${integrationName} test successful`, 'success');
            } else {
                this.showToast(`${integrationName} test failed: ${testResult.error}`, 'error');
            }
        } catch (error) {
            this.showToast('Test failed: ' + error.message, 'error');
        } finally {
            this.hideLoadingOverlay();
        }
    }

    async performIntegrationTest(integrationName) {
        // Simulate API test - replace with actual test endpoints
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo
        const success = Math.random() > 0.2; // 80% success rate
        
        return {
            success,
            error: success ? null : 'Connection timeout or authentication failed'
        };
    }

    async loadIntegrationsData() {
        // This would load real integration status data
        console.log('Loading integrations data...');
    }

    async loadAzureADConfig() {
        const section = document.getElementById('azure-ad-section');
        section.innerHTML = this.createAzureADConfigHTML();
    }

    async loadOnPremADConfig() {
        const section = document.getElementById('onprem-ad-section');
        section.innerHTML = this.createOnPremADConfigHTML();
    }

    async loadServiceNowConfig() {
        const section = document.getElementById('servicenow-section');
        section.innerHTML = this.createServiceNowConfigHTML();
    }

    async loadCopilotConfig() {
        const section = document.getElementById('copilot-section');
        section.innerHTML = this.createCopilotConfigHTML();
    }

    async loadThirdPartyApps() {
        const section = document.getElementById('third-party-section');
        section.innerHTML = this.createThirdPartyAppsHTML();
    }

    async loadUserManagement() {
        const section = document.getElementById('users-section');
        section.innerHTML = this.createUserManagementHTML();
    }

    async loadSecuritySettings() {
        const section = document.getElementById('security-section');
        section.innerHTML = this.createSecuritySettingsHTML();
    }

    async loadAuditLogs() {
        const section = document.getElementById('logs-section');
        section.innerHTML = this.createAuditLogsHTML();
    }

    async loadSystemSettings() {
        const section = document.getElementById('settings-section');
        section.innerHTML = this.createSystemSettingsHTML();
    }

    createAzureADConfigHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>Azure Active Directory Configuration</h2>
                    <div class="config-status">
                        <span class="status-indicator connected"></span>
                        <span>Connected</span>
                    </div>
                </div>
                
                <div class="config-grid">
                    <div class="config-card">
                        <h3>Connection Settings</h3>
                        <form class="config-form">
                            <div class="form-group">
                                <label for="azure-tenant-id">Tenant ID</label>
                                <input type="text" id="azure-tenant-id" value="12345678-1234-1234-1234-123456789012" readonly>
                            </div>
                            <div class="form-group">
                                <label for="azure-client-id">Client ID</label>
                                <input type="text" id="azure-client-id" value="87654321-4321-4321-4321-210987654321">
                            </div>
                            <div class="form-group">
                                <label for="azure-client-secret">Client Secret</label>
                                <input type="password" id="azure-client-secret" value="••••••••••••••••">
                            </div>
                            <div class="form-group">
                                <label for="azure-domain">Domain</label>
                                <input type="text" id="azure-domain" value="acmecorp.onmicrosoft.com">
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-outline">Test Connection</button>
                                <button type="submit" class="btn btn-primary">Save Configuration</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="config-card">
                        <h3>Synchronization Settings</h3>
                        <div class="sync-options">
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Sync user profiles</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Sync group memberships</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Sync security groups</span>
                                </label>
                            </div>
                            <div class="sync-frequency">
                                <label for="sync-interval">Sync Interval</label>
                                <select id="sync-interval">
                                    <option value="15">Every 15 minutes</option>
                                    <option value="30" selected>Every 30 minutes</option>
                                    <option value="60">Every hour</option>
                                    <option value="240">Every 4 hours</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="stats-section">
                    <h3>Synchronization Statistics</h3>
                    <div class="stats-cards">
                        <div class="stat-item">
                            <span class="stat-number">1,247</span>
                            <span class="stat-label">Total Users</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">89</span>
                            <span class="stat-label">Security Groups</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">156</span>
                            <span class="stat-label">Distribution Lists</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">2 min</span>
                            <span class="stat-label">Last Sync</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createOnPremADConfigHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>On-Premise Active Directory Configuration</h2>
                    <div class="config-status">
                        <span class="status-indicator connected"></span>
                        <span>Connected</span>
                    </div>
                </div>
                
                <div class="config-grid">
                    <div class="config-card">
                        <h3>Connection Settings</h3>
                        <form class="config-form">
                            <div class="form-group">
                                <label for="ad-server">Domain Controller</label>
                                <input type="text" id="ad-server" value="dc01.corp.acme.local">
                            </div>
                            <div class="form-group">
                                <label for="ad-port">Port</label>
                                <input type="number" id="ad-port" value="389">
                            </div>
                            <div class="form-group">
                                <label for="ad-domain">Domain</label>
                                <input type="text" id="ad-domain" value="corp.acme.local">
                            </div>
                            <div class="form-group">
                                <label for="ad-username">Service Account</label>
                                <input type="text" id="ad-username" value="svc-iam-sync">
                            </div>
                            <div class="form-group">
                                <label for="ad-password">Password</label>
                                <input type="password" id="ad-password" value="••••••••••••••••">
                            </div>
                            <div class="form-group">
                                <label for="ad-base-dn">Base DN</label>
                                <input type="text" id="ad-base-dn" value="DC=corp,DC=acme,DC=local">
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-outline">Test Connection</button>
                                <button type="submit" class="btn btn-primary">Save Configuration</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="config-card">
                        <h3>Sync Configuration</h3>
                        <div class="sync-options">
                            <div class="option-group">
                                <label for="user-ou">Users OU</label>
                                <input type="text" id="user-ou" value="OU=Users,DC=corp,DC=acme,DC=local">
                            </div>
                            <div class="option-group">
                                <label for="group-ou">Groups OU</label>
                                <input type="text" id="group-ou" value="OU=Groups,DC=corp,DC=acme,DC=local">
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Enable SSL/TLS</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Sync disabled accounts</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createServiceNowConfigHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>ServiceNow Integration Configuration</h2>
                    <div class="config-status">
                        <span class="status-indicator connected"></span>
                        <span>Connected</span>
                    </div>
                </div>
                
                <div class="config-grid">
                    <div class="config-card">
                        <h3>Instance Settings</h3>
                        <form class="config-form">
                            <div class="form-group">
                                <label for="snow-instance">Instance URL</label>
                                <input type="url" id="snow-instance" value="https://acmecorp.service-now.com">
                            </div>
                            <div class="form-group">
                                <label for="snow-username">Username</label>
                                <input type="text" id="snow-username" value="iam-integration">
                            </div>
                            <div class="form-group">
                                <label for="snow-password">Password</label>
                                <input type="password" id="snow-password" value="••••••••••••••••">
                            </div>
                            <div class="form-group">
                                <label for="snow-table">Default Table</label>
                                <select id="snow-table">
                                    <option value="incident">Incident</option>
                                    <option value="sc_request" selected>Service Request</option>
                                    <option value="change_request">Change Request</option>
                                </select>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-outline">Test Connection</button>
                                <button type="submit" class="btn btn-primary">Save Configuration</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="config-card">
                        <h3>Workflow Settings</h3>
                        <div class="workflow-options">
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Auto-create tickets for user requests</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Auto-approve low-risk requests</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Create incidents for failed operations</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label for="approval-group">Default Approval Group</label>
                                <input type="text" id="approval-group" value="IAM Administrators">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createCopilotConfigHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>AI Copilot Configuration</h2>
                    <div class="config-status">
                        <span class="status-indicator connected"></span>
                        <span>Active</span>
                    </div>
                </div>
                
                <div class="config-grid">
                    <div class="config-card">
                        <h3>OpenAI Settings</h3>
                        <form class="config-form">
                            <div class="form-group">
                                <label for="openai-api-key">API Key</label>
                                <input type="password" id="openai-api-key" value="sk-••••••••••••••••••••••••••••••••••••••••••••••••">
                            </div>
                            <div class="form-group">
                                <label for="openai-model">Model</label>
                                <select id="openai-model">
                                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                    <option value="gpt-4" selected>GPT-4</option>
                                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="max-tokens">Max Tokens</label>
                                <input type="number" id="max-tokens" value="1000" min="100" max="4000">
                            </div>
                            <div class="form-group">
                                <label for="temperature">Temperature</label>
                                <input type="range" id="temperature" min="0" max="1" step="0.1" value="0.3">
                                <span class="range-value">0.3</span>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-outline">Test API Connection</button>
                                <button type="submit" class="btn btn-primary">Save Configuration</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="config-card">
                        <h3>Copilot Features</h3>
                        <div class="feature-options">
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Natural Language Processing</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Auto-suggestions</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Smart workflows</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Learning mode (beta)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="usage-stats">
                    <h3>Usage Statistics</h3>
                    <div class="stats-cards">
                        <div class="stat-item">
                            <span class="stat-number">2,341</span>
                            <span class="stat-label">Requests Today</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">98.7%</span>
                            <span class="stat-label">Success Rate</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">247ms</span>
                            <span class="stat-label">Avg Response Time</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">$24.50</span>
                            <span class="stat-label">Cost Today</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createThirdPartyAppsHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>Third Party Applications</h2>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        Add Application
                    </button>
                </div>
                
                <div class="apps-grid">
                    <div class="app-card">
                        <div class="app-icon">
                            <i class="fab fa-salesforce"></i>
                        </div>
                        <div class="app-info">
                            <h3>Salesforce</h3>
                            <p>CRM and Sales Platform</p>
                            <span class="status connected">Connected</span>
                        </div>
                        <div class="app-actions">
                            <button class="btn btn-sm btn-outline">Configure</button>
                            <button class="btn btn-sm btn-outline">Test</button>
                            <button class="btn btn-sm btn-outline">Disconnect</button>
                        </div>
                    </div>
                    
                    <div class="app-card">
                        <div class="app-icon">
                            <i class="fab fa-slack"></i>
                        </div>
                        <div class="app-info">
                            <h3>Slack</h3>
                            <p>Team Communication</p>
                            <span class="status connected">Connected</span>
                        </div>
                        <div class="app-actions">
                            <button class="btn btn-sm btn-outline">Configure</button>
                            <button class="btn btn-sm btn-outline">Test</button>
                            <button class="btn btn-sm btn-outline">Disconnect</button>
                        </div>
                    </div>
                    
                    <div class="app-card">
                        <div class="app-icon">
                            <i class="fas fa-database"></i>
                        </div>
                        <div class="app-info">
                            <h3>Oracle Database</h3>
                            <p>Enterprise Database</p>
                            <span class="status disconnected">Disconnected</span>
                        </div>
                        <div class="app-actions">
                            <button class="btn btn-sm btn-primary">Connect</button>
                            <button class="btn btn-sm btn-outline">Configure</button>
                        </div>
                    </div>
                    
                    <div class="app-card">
                        <div class="app-icon">
                            <i class="fab fa-aws"></i>
                        </div>
                        <div class="app-info">
                            <h3>AWS IAM</h3>
                            <p>Cloud Identity Management</p>
                            <span class="status connected">Connected</span>
                        </div>
                        <div class="app-actions">
                            <button class="btn btn-sm btn-outline">Configure</button>
                            <button class="btn btn-sm btn-outline">Test</button>
                            <button class="btn btn-sm btn-outline">Disconnect</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createUserManagementHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>User Management</h2>
                    <div class="search-controls">
                        <input type="search" placeholder="Search users..." class="search-input">
                        <button class="btn btn-primary">
                            <i class="fas fa-user-plus"></i>
                            Add User
                        </button>
                    </div>
                </div>
                
                <div class="users-table-container">
                    <table class="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Last Login</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="user-info">
                                        <div class="user-avatar">JS</div>
                                        <span>John Smith</span>
                                    </div>
                                </td>
                                <td>john.smith@acmecorp.com</td>
                                <td>Engineering</td>
                                <td><span class="status-badge active">Active</span></td>
                                <td>2 hours ago</td>
                                <td>
                                    <button class="btn btn-sm btn-outline">Edit</button>
                                    <button class="btn btn-sm btn-outline">Disable</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="user-info">
                                        <div class="user-avatar">SJ</div>
                                        <span>Sarah Johnson</span>
                                    </div>
                                </td>
                                <td>sarah.johnson@acmecorp.com</td>
                                <td>Marketing</td>
                                <td><span class="status-badge active">Active</span></td>
                                <td>1 day ago</td>
                                <td>
                                    <button class="btn btn-sm btn-outline">Edit</button>
                                    <button class="btn btn-sm btn-outline">Disable</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="user-info">
                                        <div class="user-avatar">MD</div>
                                        <span>Mike Davis</span>
                                    </div>
                                </td>
                                <td>mike.davis@acmecorp.com</td>
                                <td>Finance</td>
                                <td><span class="status-badge inactive">Inactive</span></td>
                                <td>1 week ago</td>
                                <td>
                                    <button class="btn btn-sm btn-outline">Edit</button>
                                    <button class="btn btn-sm btn-primary">Enable</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    createSecuritySettingsHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>Security Settings</h2>
                </div>
                
                <div class="security-sections">
                    <div class="security-card">
                        <h3>Authentication Settings</h3>
                        <div class="security-options">
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Require Multi-Factor Authentication</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Enable Single Sign-On (SSO)</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label for="session-timeout">Session Timeout (minutes)</label>
                                <input type="number" id="session-timeout" value="60" min="15" max="480">
                            </div>
                            <div class="option-group">
                                <label for="password-policy">Password Policy</label>
                                <select id="password-policy">
                                    <option value="standard">Standard</option>
                                    <option value="strong" selected>Strong</option>
                                    <option value="enterprise">Enterprise</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="security-card">
                        <h3>API Security</h3>
                        <div class="security-options">
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>API Rate Limiting</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label for="api-rate-limit">Requests per minute</label>
                                <input type="number" id="api-rate-limit" value="100" min="10" max="1000">
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>IP Whitelisting</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label for="allowed-ips">Allowed IP Ranges</label>
                                <textarea id="allowed-ips" rows="3" placeholder="192.168.1.0/24&#10;10.0.0.0/8"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div class="security-card">
                        <h3>Audit & Compliance</h3>
                        <div class="security-options">
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Log all user actions</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Log administrative changes</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label for="log-retention">Log Retention (days)</label>
                                <input type="number" id="log-retention" value="365" min="30" max="2555">
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Export logs to SIEM</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="security-actions">
                    <button class="btn btn-primary">Save Security Settings</button>
                    <button class="btn btn-outline">Export Security Report</button>
                </div>
            </div>
        `;
    }

    createAuditLogsHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>Audit Logs</h2>
                    <div class="log-controls">
                        <select class="log-filter">
                            <option value="all">All Events</option>
                            <option value="login">Login Events</option>
                            <option value="user">User Changes</option>
                            <option value="config">Configuration Changes</option>
                            <option value="error">Errors</option>
                        </select>
                        <input type="date" class="date-filter" value="${new Date().toISOString().split('T')[0]}">
                        <button class="btn btn-outline">Export Logs</button>
                    </div>
                </div>
                
                <div class="logs-table-container">
                    <table class="logs-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Event Type</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>IP Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2024-09-20 14:32:15</td>
                                <td><span class="event-type user">User</span></td>
                                <td>john.smith@acmecorp.com</td>
                                <td>User profile updated</td>
                                <td>192.168.1.100</td>
                                <td><span class="status-badge success">Success</span></td>
                            </tr>
                            <tr>
                                <td>2024-09-20 14:28:42</td>
                                <td><span class="event-type login">Login</span></td>
                                <td>sarah.johnson@acmecorp.com</td>
                                <td>User login</td>
                                <td>10.0.0.15</td>
                                <td><span class="status-badge success">Success</span></td>
                            </tr>
                            <tr>
                                <td>2024-09-20 14:25:18</td>
                                <td><span class="event-type config">Config</span></td>
                                <td>admin@acmecorp.com</td>
                                <td>Azure AD configuration updated</td>
                                <td>172.16.0.10</td>
                                <td><span class="status-badge success">Success</span></td>
                            </tr>
                            <tr>
                                <td>2024-09-20 14:20:33</td>
                                <td><span class="event-type error">Error</span></td>
                                <td>mike.davis@acmecorp.com</td>
                                <td>Failed login attempt</td>
                                <td>203.0.113.10</td>
                                <td><span class="status-badge error">Failed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    createSystemSettingsHTML() {
        return `
            <div class="config-container">
                <div class="config-header">
                    <h2>System Settings</h2>
                </div>
                
                <div class="settings-sections">
                    <div class="settings-card">
                        <h3>General Settings</h3>
                        <form class="settings-form">
                            <div class="form-group">
                                <label for="system-name">System Name</label>
                                <input type="text" id="system-name" value="IAM AI Agent">
                            </div>
                            <div class="form-group">
                                <label for="admin-email">Administrator Email</label>
                                <input type="email" id="admin-email" value="admin@acmecorp.com">
                            </div>
                            <div class="form-group">
                                <label for="timezone">Timezone</label>
                                <select id="timezone">
                                    <option value="UTC">UTC</option>
                                    <option value="America/New_York" selected>Eastern Time</option>
                                    <option value="America/Chicago">Central Time</option>
                                    <option value="America/Denver">Mountain Time</option>
                                    <option value="America/Los_Angeles">Pacific Time</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="language">Default Language</label>
                                <select id="language">
                                    <option value="en" selected>English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    
                    <div class="settings-card">
                        <h3>Email Notifications</h3>
                        <div class="notification-options">
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Send user provisioning notifications</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" checked>
                                    <span>Send security alerts</span>
                                </label>
                            </div>
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox">
                                    <span>Send daily summary reports</span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="smtp-server">SMTP Server</label>
                                <input type="text" id="smtp-server" value="smtp.office365.com">
                            </div>
                            <div class="form-group">
                                <label for="smtp-port">SMTP Port</label>
                                <input type="number" id="smtp-port" value="587">
                            </div>
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>System Maintenance</h3>
                        <div class="maintenance-options">
                            <div class="option-group">
                                <label for="backup-frequency">Backup Frequency</label>
                                <select id="backup-frequency">
                                    <option value="daily" selected>Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div class="option-group">
                                <label for="backup-retention">Backup Retention (days)</label>
                                <input type="number" id="backup-retention" value="30" min="7" max="365">
                            </div>
                            <div class="maintenance-actions">
                                <button class="btn btn-outline">Backup Now</button>
                                <button class="btn btn-outline">Check System Health</button>
                                <button class="btn btn-warning">Restart Services</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="settings-actions">
                    <button class="btn btn-primary">Save All Settings</button>
                    <button class="btn btn-outline">Reset to Defaults</button>
                    <button class="btn btn-outline">Export Configuration</button>
                </div>
            </div>
        `;
    }

    startRealTimeUpdates() {
        // Update dashboard metrics every 30 seconds
        setInterval(() => {
            if (this.currentSection === 'dashboard') {
                this.loadDashboardData();
            }
        }, 30000);

        // Update timestamp every second
        setInterval(() => {
            const timestampElements = document.querySelectorAll('.timestamp');
            // Update relative timestamps here if needed
        }, 1000);
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        const container = document.getElementById('toast-container');
        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    showLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'flex';
    }

    hideLoadingOverlay() {
        document.getElementById('loading-overlay').style.display = 'none';
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});

// Add slideOut animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
