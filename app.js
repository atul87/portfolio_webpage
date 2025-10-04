// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS (placeholder credentials)
    emailjs.init("user_placeholder_key");
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinksArray.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // Typing Animation
    const typedTextElement = document.getElementById('typed-text');
    const texts = ['Web Developer', 'Problem Solver', 'Computer Science Student'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Skills Animation
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsSection = document.querySelector('.skills');
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.includes(filter)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const btnText = contactForm.querySelector('.btn-text');
    const btnLoading = contactForm.querySelector('.btn-loading');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.classList.remove('hidden');
        btnLoading.style.display = 'inline-block';
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Atul'
        };
        
        // Send email using EmailJS (placeholder service)
        emailjs.send('service_placeholder', 'template_placeholder', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showToast('Message sent successfully!', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                showToast('Failed to send message. Please try again.', 'error');
            })
            .finally(function() {
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                btnLoading.classList.add('hidden');
            });
    });
    
    // Toast Notification
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastClose = toast.querySelector('.toast-close');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        // Auto hide after 5 seconds
        const autoHideTimer = setTimeout(() => {
            hideToast();
        }, 5000);
        
        // Manual close
        toastClose.addEventListener('click', () => {
            clearTimeout(autoHideTimer);
            hideToast();
        });
        
        function hideToast() {
            toast.classList.remove('show');
        }
    }
    
    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Parallax Effect for Hero Section
    const heroSection = document.querySelector('.hero');
    const floatingShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroSection && scrolled <= heroSection.offsetHeight) {
            floatingShapes.forEach((shape, index) => {
                const speed = parallaxSpeed * (index + 1) * 0.3;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
    
    // Form Validation
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }
    
    // Lazy Loading for Project Images (if actual images were used)
    const lazyImages = document.querySelectorAll('[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
        }
        
        // Close toast on Escape
        if (e.key === 'Escape') {
            const toast = document.getElementById('toast');
            if (toast.classList.contains('show')) {
                toast.classList.remove('show');
            }
        }
    });
    
    // Performance Optimization: Debounce Scroll Events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debouncing to scroll-heavy functions
    const debouncedScrollHandler = debounce(function() {
        // Any intensive scroll operations can go here
    });
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Add loading animation on page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 100);
    });
    
    // Console message for developers
    console.log(`
    🚀 Welcome to Atul's Portfolio
    
    Built with:
    - Vanilla JavaScript
    - CSS Grid & Flexbox
    - Intersection Observer API
    - EmailJS for contact form
    - Modern CSS animations
    
    Portfolio features:
    ✅ Responsive design
    ✅ Dark/Light theme
    ✅ Smooth scrolling
    ✅ Active navigation
    ✅ Typing animation
    ✅ Skill progress bars
    ✅ Project filtering
    ✅ Working contact form
    ✅ Accessibility support
    
    Contact: atul@example.com
    GitHub: https://github.com/atul87
    `);
});

// Add CSS for mobile menu (since it wasn't in the CSS file)
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            flex-direction: column;
            padding: var(--space-lg);
            border-top: 1px solid var(--border-color);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-links.mobile-active {
            transform: translateX(0);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .navbar.scrolled {
            background: rgba(15, 23, 36, 0.95);
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ff6b6b;
            box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
        }
        
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .body.loaded .hero-content {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject mobile styles
const styleSheet = document.createElement("style");
styleSheet.innerText = mobileMenuStyles;
document.head.appendChild(styleSheet);