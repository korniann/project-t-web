// This is the serverless function
// It receives the email from your frontend and sends it to MailerLite

exports.handler = async function(event, context) {
    // We only care about POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { email } = JSON.parse(event.body);

        // SECURELY get the API key and Group ID from environment variables
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
                status: 'unconfirmed', // <-- ADD THIS LINE
            }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            // Forward MailerLite's error message
            throw new Error(data.message || 'Failed to subscribe.');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully subscribed!' })
        };

    // At the bottom of netlify/functions/subscribe.js

        } catch (error) {
            // THIS IS THE NEW LINE - IT FORCES THE ERROR TO BE PRINTED
            console.error('Function crashed:', error); 

            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message })
            };
        }
};