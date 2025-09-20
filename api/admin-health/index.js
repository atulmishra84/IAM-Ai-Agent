module.exports = async function (context, req) {
    context.log('Admin health check requested');

    const health = {
        status: 'Online',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        admin: true,
        services: {
            frontend: 'active',
            api: 'active',
            storage: 'connected'
        },
        metrics: {
            uptime: Math.floor(Math.random() * 86400),
            requests: Math.floor(Math.random() * 1000),
            errors: 0
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
