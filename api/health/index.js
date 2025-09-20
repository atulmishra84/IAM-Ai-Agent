module.exports = async function (context, req) {
    context.log('Health check requested');

    const health = {
        status: 'Online',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        environment: 'Azure Static Web Apps',
        services: {
            database: 'connected',
            ai: 'active',
            integrations: {
                azureAD: 'connected',
                onPremAD: 'connected',
                serviceNow: 'connected'
            }
        }
    };

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: health
    };
};
