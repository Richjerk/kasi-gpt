// public/form-validation.js
document.getElementById('business-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const businessName = document.getElementById('business-name').value;
    const businessDescription = document.getElementById('business-description').value;
    const businessEmail = document.getElementById('business-email').value;
    const businessPhone = document.getElementById('business-phone').value;
    const businessAddress = document.getElementById('business-address').value;

    // Simple validation
    if (!businessName || !businessDescription || !businessEmail || !businessPhone || !businessAddress) {
        alert('Please fill in all fields.');
        return;
    }

    const formData = new FormData(this); // Get form data

    // API call to submit the form data
    fetch('/api/businesses', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Business listed successfully!');
        this.reset(); // Reset the form
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error listing your business.');
    });
});
