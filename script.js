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

    // --- Navigation Logic ---
    const nav = document.querySelector('.main-nav');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Nav Shadow on Scroll
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add shadow after scrolling down 50px
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Mobile Nav Toggle
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');

            // Change icon based on state (optional, requires Font Awesome)
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times'); // Assumes you have fa-times icon available
            }
        });

        // Close mobile nav when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    const icon = mobileNavToggle.querySelector('i');
                     if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // --- Smooth Scroll Logic ---
    // Smooth scroll for the main CTA button
    const ctaButton = document.querySelector('.cta-button');
    const waitlistSection = document.getElementById('waitlist-form');

    if (ctaButton && waitlistSection) {
        ctaButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            waitlistSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Intersection Observer for Animations ---
    const featureItems = document.querySelectorAll('.feature-item');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const featureObserver = new IntersectionObserver(observerCallback, observerOptions);

    featureItems.forEach(item => {
        featureObserver.observe(item);
    });

    // --- tsParticles Initialization ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 50, // Increased number
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#9c9a9a", "#ffc107"] // Even darker grey and accent yellow
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.6,
                        opacity_min: 0.2,
                        sync: false
                    }
                },
                size: {
                    value: 3.5, // Increased size again
                    random: true,
                    anim: {
                        enable: false,
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 0.5, // Slightly faster movement
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false, // Disable hover effects
                    },
                    onclick: {
                        enable: false, // Disable click effects
                    },
                    resize: true
                },
            },
            retina_detect: true,
            background: {
                color: "transparent" // Ensure background is transparent
            }
        });
    } else {
        console.error("tsParticles library not loaded.");
    }

});
