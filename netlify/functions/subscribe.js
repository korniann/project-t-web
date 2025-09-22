exports.handler = async function(event, context) {
    console.log('Function invoked');
    console.log('Request method:', event.httpMethod);

    // We only care about POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        console.log('Request body:', event.body);
        const { email } = JSON.parse(event.body);

        // SECURELY get the API key and Group ID from environment variables
        const apiKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_GROUP_ID;

        if (!apiKey || !groupId) {
             console.error('API Key or Group ID is not configured.');
             throw new Error('API Key or Group ID is not configured.');
        }

        console.log('Found API Key and Group ID');

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
            console.error('MailerLite API error:', data);
            throw new Error(data.message || 'Failed to subscribe.');
        }

        console.log('Successfully subscribed to MailerLite');

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