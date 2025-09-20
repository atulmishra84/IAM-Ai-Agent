#!/bin/bash

# 🧪 Test Deployment Status
echo "🧪 Testing Azure Static Web App Deployment"
echo "==========================================="
echo ""

BASE_URL="https://victorious-island-00c16371e.1.azurestaticapps.net"

test_url() {
    local url=$1
    local name=$2
    echo -n "Testing $name... "
    
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status_code" = "200" ]; then
        echo "✅ Working ($status_code)"
    elif [ "$status_code" = "404" ]; then
        echo "❌ 404 Error"
    else
        echo "⚠️ Status: $status_code"
    fi
}

echo "🔍 Testing deployment status..."
echo ""

test_url "$BASE_URL/" "Main Site"
test_url "$BASE_URL/admin/" "Admin Dashboard"
test_url "$BASE_URL/admin/index.html" "Admin Direct"
test_url "$BASE_URL/demo/" "Demo Interface"
test_url "$BASE_URL/api/health" "API Health"

echo ""
echo "🌐 URLs to test manually:"
echo "• Main: $BASE_URL/"
echo "• Admin: $BASE_URL/admin/"
echo "• Demo: $BASE_URL/demo/"
echo ""

if curl -s "$BASE_URL/admin/" | grep -q "IAM AI Agent"; then
    echo "✅ Admin Dashboard content detected!"
    echo "🎯 Deployment appears successful!"
else
    echo "⏳ Admin Dashboard still deploying or has issues"
    echo "💡 Wait 2-3 more minutes and test again"
fi
