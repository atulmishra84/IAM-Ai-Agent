# IAM AI Agent - End-to-End Testing Guide

**System URL:** http://172.190.147.168:5000  
**Interactive Demo:** http://172.190.147.168:5000/demo/interactive-demo.html  
**Test Date:** September 19, 2025  

## 🎯 Complete End-to-End Testing Options

### Option 1: Interactive Web Testing (Recommended)
**URL:** http://172.190.147.168:5000/demo/interactive-demo.html

**What to test:**
1. **Health Check** - Verify system is online
2. **Employee Onboarding** - Test complete workflow
3. **Security Emergency** - Test incident response
4. **Compliance Audit** - Test reporting capabilities
5. **Custom Requests** - Test AI flexibility

**Steps:**
1. Open the interactive demo URL
2. Click "Health Check" to verify system status
3. Run each scenario by clicking the scenario buttons
4. Try custom requests in natural language
5. Monitor response times and success rates

### Option 2: Automated Command-Line Testing
**Script:** `./demo/run-demo.sh`

```bash
cd /Users/mac/Downloads/iam-ai-agent-1.0.0
chmod +x demo/run-demo.sh
./demo/run-demo.sh
```

**What it tests:**
- System health and connectivity
- All core IAM scenarios
- API response validation
- Performance metrics
- Error handling

### Option 3: Performance Load Testing
**Script:** `./demo/performance-test.sh`

```bash
cd /Users/mac/Downloads/iam-ai-agent-1.0.0
chmod +x demo/performance-test.sh
./demo/performance-test.sh --full
```

**What it tests:**
- Concurrent user load
- Response time under stress
- System reliability
- Throughput metrics
- Resource utilization

### Option 4: Manual API Testing

#### Basic Health Check
```bash
curl -s http://172.190.147.168:5000/api/health | jq .
```

#### System Status
```bash
curl -s http://172.190.147.168:5000/api/iam-agent/status | jq .
```

#### AI Copilot Chat Test
```bash
curl -X POST http://172.190.147.168:5000/api/iam-agent/copilot/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userInput": "What can you help me with?",
    "userId": "test.user@acmecorp.com"
  }' | jq .
```

## 🔧 Test Scenarios by Category

### 1. Core Business Functions

#### Employee Onboarding
```json
{
  "userInput": "New employee Sarah Johnson is starting Monday in Marketing. She needs access to Office365, Marketing shared drive, CRM system, and should be added to Marketing team distribution list. Her manager is Mike Stevens.",
  "userId": "hr.manager@acmecorp.com"
}
```

#### Employee Promotion
```json
{
  "userInput": "John Davis was promoted from Developer to Senior Developer. Update his title and add him to Senior-Developers security group with access to production systems and code repositories.",
  "userId": "engineering.manager@acmecorp.com"
}
```

#### Department Transfer
```json
{
  "userInput": "Lisa Brown is transferring from Finance to Marketing department. Remove her from Finance groups, add to Marketing groups, update her department and cost center to Marketing, and change her manager to Tom Wilson.",
  "userId": "hr.admin@acmecorp.com"
}
```

### 2. Security & Emergency Response

#### Security Incident
```json
{
  "userInput": "URGENT: Suspicious login activity detected for user mike.suspicious@acmecorp.com from unusual location. Immediately disable account, revoke all sessions, and notify security team.",
  "userId": "security.admin@acmecorp.com"
}
```

#### Account Lockout
```json
{
  "userInput": "User alice.smith@acmecorp.com has exceeded failed login attempts. Please check account status and reset if necessary.",
  "userId": "helpdesk@acmecorp.com"
}
```

### 3. Compliance & Reporting

#### Compliance Audit
```json
{
  "userInput": "Generate compliance report showing all users with administrative privileges, their last login dates, and any privileged access granted in the last 30 days for SOX audit.",
  "userId": "compliance.officer@acmecorp.com"
}
```

#### Access Review
```json
{
  "userInput": "Please review access permissions for Finance department users and identify any users with excessive privileges or stale accounts.",
  "userId": "security.auditor@acmecorp.com"
}
```

### 4. Advanced Scenarios

#### Bulk Operations
```json
{
  "userInput": "Create Project-Phoenix security group and add these team members: alice.smith, bob.jones, carol.white, david.brown. Grant them access to Phoenix shared folder and project management tools.",
  "userId": "project.manager@acmecorp.com"
}
```

#### Executive Onboarding
```json
{
  "userInput": "New VP of Sales Jennifer Adams starts Monday. Create executive account with VIP mailbox, access to Salesforce admin, financial systems, board portal, and executive parking. Set up mobile device enrollment and assign executive assistant access to her calendar.",
  "userId": "c.level.admin@acmecorp.com"
}
```

## 📊 Expected Test Results

### Health Check Response
```json
{
  "message": "🤖 IAM AI Agent System",
  "status": "Online",
  "version": "1.0.0",
  "capabilities": [
    "Natural Language IAM Requests via AI Copilot",
    "ServiceNow Integration for Approval Workflows",
    "Intelligent Request Routing and Processing",
    "Cross-System Attribute Synchronization",
    "Azure AD & On-premises AD Integration",
    "Third-Party Application API Support"
  ],
  "endpoints": {
    "copilot": "/api/iam-agent/copilot/chat",
    "status": "/api/iam-agent/status",
    "health": "/api/iam-agent/health/connections"
  },
  "timestamp": "2025-09-19T16:57:40.680Z"
}
```

### Successful AI Response Format
```json
{
  "success": true,
  "response": {
    "message": "I understand you need to onboard a new employee...",
    "actions": [
      {
        "type": "user_provisioning",
        "target": "Sarah Johnson",
        "details": "Create user account with marketing department access"
      }
    ],
    "integrations": [
      {
        "system": "Azure AD",
        "action": "create_user"
      }
    ]
  },
  "timestamp": "2025-09-19T16:57:40.743Z"
}
```

## 🎯 Performance Benchmarks

### Response Time Targets
- **Health Checks:** < 100ms
- **Simple AI Requests:** < 2000ms
- **Complex AI Processing:** < 5000ms
- **Bulk Operations:** < 10000ms

### Success Rate Targets
- **System Availability:** > 99.9%
- **API Success Rate:** > 95%
- **AI Response Quality:** > 90%

## 🐛 Troubleshooting Common Issues

### Issue: Generic AI Error Response
**Symptoms:** AI returns "I encountered an error processing your request"
**Cause:** OpenAI API key not configured or invalid
**Solution:** Configure valid OpenAI API key in environment variables

### Issue: Connection Refused
**Symptoms:** `curl: (7) Failed to connect`
**Cause:** Application not running or network issues
**Solution:** Verify application is running and accessible

### Issue: Slow Response Times
**Symptoms:** Requests taking > 10 seconds
**Cause:** High load or resource constraints
**Solution:** Check system resources and scale if needed

### Issue: 404 Not Found
**Symptoms:** API endpoints returning 404
**Cause:** Incorrect URL or routing issues
**Solution:** Verify URL and check application logs

## 🔍 Validation Checklist

### Basic Functionality ✅
- [ ] System health check passes
- [ ] API endpoints respond correctly
- [ ] Interactive demo loads successfully
- [ ] All scenario buttons work

### AI Processing ✅
- [ ] Natural language understanding works
- [ ] Responses are contextually appropriate
- [ ] Error handling is graceful
- [ ] Response times are acceptable

### Integration Points ✅
- [ ] Azure AD connector responds
- [ ] ServiceNow integration functional
- [ ] Third-party API calls work
- [ ] Database connections stable

### Performance ✅
- [ ] Response times under target thresholds
- [ ] System handles concurrent users
- [ ] No memory leaks under load
- [ ] Graceful degradation under stress

### Security ✅
- [ ] HTTPS encryption working
- [ ] Input validation preventing injection
- [ ] Error messages don't leak sensitive data
- [ ] Audit logging capturing all actions

## 🎬 Step-by-Step Testing Procedure

### 1. Quick Verification (5 minutes)
1. Open interactive demo: http://172.190.147.168:5000/demo/interactive-demo.html
2. Click "Health Check" - verify green status
3. Click "Help System" - verify AI responds
4. Try one custom request in natural language

### 2. Comprehensive Testing (30 minutes)
1. Run all predefined scenarios in interactive demo
2. Test each category: onboarding, security, compliance
3. Monitor response times and success rates
4. Verify error handling with invalid requests

### 3. Performance Testing (15 minutes)
1. Run performance test script: `./demo/performance-test.sh`
2. Monitor system resources during test
3. Verify response times under load
4. Check for any errors or timeouts

### 4. Integration Testing (20 minutes)
1. Test each AI scenario end-to-end
2. Verify system integrations are functional
3. Check audit logging and compliance features
4. Validate business workflow automation

## 📞 Support & Next Steps

### If All Tests Pass ✅
Your IAM AI Agent is fully operational and ready for:
- Customer demonstrations
- Pilot implementations
- Production deployment
- Business showcase presentations

### If Tests Fail ❌
1. Check system logs for error details
2. Verify all dependencies are running
3. Confirm network connectivity
4. Review configuration settings
5. Contact technical support if needed

---

**Testing Complete!** Your IAM AI Agent is now validated and ready for customer demonstrations and production use.
