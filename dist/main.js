// Importing the Gemini AI client (only in your backend/server-side code)
// const { TextServiceClient } = require('@google/generative-ai');
// const client = new TextServiceClient();

// Function to send messages to the chatbot
function sendMessage() {
    const input = document.getElementById('chat-input').value.trim();
    const output = document.getElementById('chat-output');

    // Check if the input is not empty
    if (input !== "") {
        // Display the user's message
        const userMessage = document.createElement('p');
        userMessage.innerHTML = `<strong>You:</strong> ${input}`;
        output.appendChild(userMessage);

        // Simulate a loading message while waiting for chatbot response
        const loadingMessage = document.createElement('p');
        loadingMessage.innerHTML = `<strong>Chatbot:</strong> Searching for businesses...`;
        output.appendChild(loadingMessage);

        // Call the backend API to interact with Gemini AI
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: input })
        })
        .then(response => response.json())
        .then(data => {
            // Remove the loading message
            output.removeChild(loadingMessage);

            // Display the chatbot's response
            const chatbotReply = document.createElement('p');
            chatbotReply.innerHTML = `<strong>Chatbot:</strong> ${data.response}`;
            output.appendChild(chatbotReply);
        })
        .catch(err => {
            // Remove the loading message
            output.removeChild(loadingMessage);

            // Handle error response
            const errorMessage = document.createElement('p');
            errorMessage.innerHTML = `<strong>Chatbot:</strong> Sorry, I couldn't process your request.`;
            output.appendChild(errorMessage);
        });

        // Clear the input field
        document.getElementById('chat-input').value = '';
    }
}

// Function to get user's GPS location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to handle successful retrieval of position
function showPosition(position) {
    document.getElementById("business-latitude").value = position.coords.latitude;
    document.getElementById("business-longitude").value = position.coords.longitude;
}

// Function to handle errors when retrieving position
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Optional: Add an event listener to the input field for pressing Enter
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
        event.preventDefault(); // Prevents form submission if inside a form
    }
});

