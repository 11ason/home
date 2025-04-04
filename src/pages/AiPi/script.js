document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('github-login');
    const captureButton = document.getElementById('capture');
    const uploadButton = document.getElementById('upload');
    const video = document.getElementById('video');
    const capturedImage = document.getElementById('captured-image');
    let imageData = null;

    // Start the camera
    function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err) {
                console.log("Error accessing camera: ", err);
            });
    }

    // Capture image
    captureButton.addEventListener('click', function () {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        imageData = canvas.toDataURL('image/png');
        capturedImage.src = imageData;
        document.getElementById('picture-result').style.display = 'block';
    });

    // Upload image to GitHub
    uploadButton.addEventListener('click', function () {
        if (!imageData) {
            alert('Please take a picture first');
            return;
        }
        fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        })
        .then(response => response.json())
        .then(data => {
            // Send the GitHub image URL to AI
            sendToAI(data.imageUrl);
        })
        .catch(error => console.error('Error uploading image:', error));
    });

    // Send image URL to AI
    function sendToAI(imageUrl) {
        fetch('/get-ai-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageUrl: imageUrl })
        })
        .then(response => response.json())
        .then(data => {
            alert("AI Response: " + data.response);
        })
        .catch(error => console.error('Error getting AI response:', error));
    }

    // Handle GitHub login
    loginButton.addEventListener('click', function () {
        window.location.href = '/login';
    });

    startCamera();
});
