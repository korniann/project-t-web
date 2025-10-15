// In netlify/functions/subscribe.js

exports.handler = async function(event, context) {
    console.log('Function invoked');
    console.log('Request method:', event.httpMethod);

    // This handles the browser's preflight check
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://mindstax.com', // Be specific
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { email } = JSON.parse(event.body);
        const apiKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_GROUP_ID;

        if (!apiKey || !groupId) {
             throw new Error('API Key or Group ID is not configured.');
        }

        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                email: email,
                groups: [groupId],
                status: 'unconfirmed',
            }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            console.error('MailerLite API error:', data);
            throw new Error(data.message || 'Failed to subscribe.');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully subscribed!' })
        };
    } catch (error) {
        console.error('Function crashed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};