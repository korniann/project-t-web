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

    // --- Dynamic Background Canvas Animation ---
    const canvas = document.getElementById('dynamic-background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Shape settings
        const numShapes = 18; // Number of concentric shapes
        const pointsPerShape = 120; // Smoothness of the shape
        const baseRadiusMultiplier = 0.45; // 0.3 is nice, as well. Increased base radius relative to min canvas dimension
        const radiusStep = 20; // Increased radius step for larger spread
        const amplitude = 100; // Slightly increased max radial distortion
        const frequency = 4; // How many waves around the circle
        const speed = 0.003; // How fast the waves move/evolve
        const rotationSpeed = 0.00015; // Slow rotation of the whole pattern
        const lineColor = 'rgb(158, 155, 155)'; 

        let time = 0;

        function resizeCanvas() {
            // Use scrollWidth/scrollHeight to cover the entire page content area
            canvas.width = document.documentElement.scrollWidth; 
            canvas.height = document.documentElement.scrollHeight; 
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 1; // Increment time for animation evolution

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 4;
            const minDimension = Math.min(canvas.width, canvas.height);

            for (let j = 0; j < numShapes; j++) {
                const baseRadius = minDimension * baseRadiusMultiplier + j * radiusStep;

                // Removed color variation per line for simplicity and max contrast
                ctx.strokeStyle = lineColor; 
                ctx.lineWidth = 1.5; // Keep lines relatively thick
                ctx.beginPath();

                for (let i = 0; i <= pointsPerShape; i++) { // Loop to pointsPerShape to close path
                    const pointAngle = (Math.PI * 2 / pointsPerShape) * i;
                    const currentAngle = pointAngle + time * rotationSpeed; // Add overall rotation

                    // Calculate distortion based on angle, time, and shape index
                    // Combine multiple sine waves for more organic movement
                    const distortion1 = Math.sin(currentAngle * frequency + time * speed + j * 0.15) * amplitude;
                    const distortion2 = Math.sin(currentAngle * (frequency/2) - time * speed * 0.7 + j * 0.1) * amplitude * 0.5;
                    const distortedRadius = baseRadius + distortion1 + distortion2;


                    const x = centerX + distortedRadius * Math.cos(currentAngle);
                    const y = centerY + distortedRadius * Math.sin(currentAngle);

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                // ctx.closePath(); // Connects last point to first - uncomment if needed, but looping i <= pointsPerShape often suffices
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(draw);
        }

        // Initial setup
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Start animation
        // Cancel any previous frame to avoid duplicates if script reloads/hotswaps
        if (typeof animationFrameId !== 'undefined' && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        draw();
    } else {
        console.error("Canvas element #dynamic-background-canvas not found.");
    }

});
