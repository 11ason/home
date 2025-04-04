const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { code } = event.queryStringParameters;

    if (!code) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing GitHub OAuth code" })
        };
    }

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: 'your_github_client_id',
                client_secret: 'your_github_client_secret',
                code: code
            })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ access_token: data.access_token })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error during OAuth", error })
        };
    }
};
