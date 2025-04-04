exports.handler = async function(event, context) {
    const { imageUrl } = JSON.parse(event.body);

    if (!imageUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No image URL provided' })
        };
    }

    // Call your AI service (this is a placeholder)
    const aiResponse = `This is the AI's response based on the image at ${imageUrl}.`;

    return {
        statusCode: 200,
        body: JSON.stringify({ response: aiResponse })
    };
};
