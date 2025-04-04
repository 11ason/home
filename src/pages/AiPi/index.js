document.getElementById('login-button').addEventListener('click', () => {
    const clientId = 'your_github_client_id';
    const redirectUri = 'https://your-site.netlify.app/.netlify/functions/github-login';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
});

document.getElementById('image-input').addEventListener('change', (event) => {
    document.getElementById('upload-button').disabled = !event.target.files.length;
});

document.getElementById('upload-button').addEventListener('click', () => {
    const imageInput = document.getElementById('image-input');
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async function () {
        const imageData = reader.result;
        const githubToken = localStorage.getItem('githubToken');

        if (githubToken) {
            const response = await fetch('/.netlify/functions/upload-image', {
                method: 'POST',
                body: JSON.stringify({ imageData, githubToken })
            });

            const result = await response.json();
            if (result.imageUrl) {
                const aiResponse = await fetch('/.netlify/functions/get-ai-response', {
                    method: 'POST',
                    body: JSON.stringify({ imageUrl: result.imageUrl })
                });
                const aiData = await aiResponse.json();
                document.getElementById('ai-response').innerText = aiData.response;
            } else {
                document.getElementById('ai-response').innerText = 'Failed to upload image';
            }
        }
    };

    reader.readAsDataURL(file);
});
