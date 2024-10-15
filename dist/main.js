// Function to send messages to the chatbot
function sendMessage() {
    const input = document.getElementById('chat-input').value;
    const output = document.getElementById('chat-output');

    // Check if input is not empty
    if (input.trim() !== "") {
        // Display user's message
        output.innerHTML += `<p><strong>You:</strong> ${input}</p>`;

        // Simulate a delay for chatbot response
        output.innerHTML += `<p><strong>Chatbot:</strong> Searching for businesses...</p>`;

        // Call Gemini AI to process the input (Replace with your API integration)
        client.generateText({
            model: 'models/chat-bison-001',
            prompt: input,
        })
        .then(response => {
            const chatbotReply = response.text;
            output.innerHTML += `<p><strong>Chatbot:</strong> ${chatbotReply}</p>`;
        })
        .catch(err => {
            output.innerHTML += `<p><strong>Chatbot:</strong> Sorry, I couldn't process your request.</p>`;
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

// Importing the Gemini AI client
const { TextServiceClient } = require('@google/generative-ai');
const client = new TextServiceClient();

