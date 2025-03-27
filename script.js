document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Basic validation (HTML5 'required' and 'email' type handles most)
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');

            if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
                // Although 'required' handles this, adding a JS check is good practice
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate submission: Hide form, show thank you message
            form.style.display = 'none';
            if (thankYouMessage) {
                thankYouMessage.style.display = 'block';
                // Optional: Scroll to the thank you message if needed
                // thankYouMessage.scrollIntoView({ behavior: 'smooth' });
            }

            // In a real application, you would send the form data to a server here
            // using fetch() or XMLHttpRequest.
            console.log('Form submitted (simulated)');
            console.log('Name:', nameInput.value);
            console.log('Email:', emailInput.value);
            console.log('Use Case:', document.getElementById('use-case').value);

            // Optional: Clear the form fields after submission
            // form.reset();
        });
    }

    // Smooth scroll for the "Join the Waitlist" button
    const ctaButton = document.querySelector('.cta-button');
    const waitlistSection = document.getElementById('waitlist-form');

    if (ctaButton && waitlistSection) {
        ctaButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            waitlistSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
