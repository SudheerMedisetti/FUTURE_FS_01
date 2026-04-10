/**
 * SUDHEER PORTFOLIO - MAIN SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 7, 10, 0.95)';
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(5, 7, 10, 0.8)';
            navbar.style.padding = '0';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksList = document.getElementById('nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Simple CSS override for mobile menu visibility
        if (navLinksList.classList.contains('active')) {
            navLinksList.style.display = 'flex';
            navLinksList.style.flexDirection = 'column';
            navLinksList.style.position = 'absolute';
            navLinksList.style.top = 'var(--nav-height)';
            navLinksList.style.left = '0';
            navLinksList.style.width = '100%';
            navLinksList.style.background = 'var(--bg-dark)';
            navLinksList.style.padding = '2rem';
            navLinksList.style.borderBottom = '1px solid var(--glass-border)';
            navLinksList.style.gap = '1.5rem';
        } else {
            navLinksList.style.display = 'none';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                navLinksList.classList.remove('active');
                navLinksList.style.display = 'none';
            }
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // --- Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Form Validation & Submission ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic Validation
        if (!name || !email || !message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate submission
        showStatus('Sending...', 'info');
        
        setTimeout(() => {
            showStatus('Message sent successfully! Thank you, Sudheer will contact you soon.', 'success');
            contactForm.reset();
        }, 1500);
    });

    function showStatus(text, type) {
        formStatus.textContent = text;
        formStatus.style.color = type === 'error' ? '#ff4b2b' : (type === 'success' ? 'var(--accent-cyan)' : '#fff');
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
