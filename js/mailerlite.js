const handleFormSubmit = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const formButton = form.querySelector('button');
    const messageDiv = form.nextElementSibling;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = form.querySelector('input[type="email"]').value;

        formButton.textContent = 'Submitting...';
        formButton.disabled = true;
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';

        try {
            // --- THIS IS THE KEY CHANGE ---
            // We now send the data to OUR function, not MailerLite
            const response = await fetch('/.netlify/functions/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });
            // -----------------------------

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong.');
            }

            // Success! Replace the form with the success message
            const formParent = form.parentElement;
            formParent.innerHTML = `
                <div class="form-success-message">
                    <h3>You're almost there!</h3>
                    <p>Please check your inbox for a confirmation email and click the link inside to activate your subscription.</p>
                </div>
            `;

        } catch (error) {
            messageDiv.textContent = `Error: ${error.message}`;
            messageDiv.classList.add('error');
            
            formButton.textContent = 'Join the Free Waitlist';
            formButton.disabled = false;
        }
    });
};

handleFormSubmit('hero-form');
handleFormSubmit('cta-form');