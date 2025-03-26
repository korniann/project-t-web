document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlist-form');
    const thankYouMessage = document.getElementById('thank-you');
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', () => {
        document.getElementById('waitlist').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const formData = new FormData(waitlistForm);
        console.log('Form submitted:', Object.fromEntries(formData));

        // Show thank you message
        waitlistForm.style.display = 'none';
        thankYouMessage.classList.remove('hidden');

        // Animate thank you message
        thankYouMessage.style.animation = 'fadeIn 0.5s ease-in';
    });

    // Add intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Observe feature and audience cards
    document.querySelectorAll('.feature-card, .audience-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
