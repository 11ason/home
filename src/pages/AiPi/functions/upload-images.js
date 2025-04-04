const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { imageData, githubToken } = JSON.parse(event.body);

    if (!imageData || !githubToken) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing image data or GitHub token' })
        };
    }

    const imageBuffer = Buffer.from(imageData.split(',')[1], 'base64');
    const encodedImage = imageBuffer.toString('base64');

    const githubRepo = 'your-username/your-repo';
    const uploadUrl = `https://api.github.com/repos/${githubRepo}/contents/images/uploaded-image.png`;

    try {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Upload image',
                content: encodedImage
            })
        });

        const data = await response.json();

        if (response.status === 201) {
            return {
                statusCode: 200,
                body: JSON.stringify({ imageUrl: data.content.download_url })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to upload image', details: data })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error uploading image', details: error.message })
        };
    }
};
