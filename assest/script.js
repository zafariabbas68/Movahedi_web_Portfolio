// DOM Ready
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Add active class to current section in view
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` ||
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // PORTFOLIO FILTERING
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    item.style.opacity = '0.5';
                    item.style.transform = 'scale(0.95)';

                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        }, 300);
                    } else {
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // PORTFOLIO MODAL
    // ============================================
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const viewProjectLinks = document.querySelectorAll('.view-project');
    const modalBody = document.querySelector('.modal-body');

    // Project data
    const projects = {
        'project1': {
            title: 'Urban Elegance Apartment',
            location: 'Milan, Italy',
            type: 'Residential',
            year: '2022',
            size: '120 m²',
            description: 'This contemporary apartment in the heart of Milan blends minimalist design with warm textures to create a harmonious living space. The project focused on maximizing natural light while maintaining privacy in an urban setting.',
            features: ['Open-plan living area', 'Custom-designed furniture', 'Smart home integration', 'Sustainable materials', 'Maximized natural light'],
            challenge: 'The main challenge was creating a sense of spaciousness in a compact urban apartment while incorporating ample storage solutions without compromising the aesthetic.',
            solution: 'We implemented floor-to-ceiling built-in storage, used mirrors strategically to enhance the sense of space, and selected a monochromatic color palette with textured accents to add depth and interest.'
        },
        'project2': {
            title: 'Luxury Boutique Design',
            location: 'Paris, France',
            type: 'Commercial',
            year: '2021',
            size: '85 m²',
            description: 'A high-end retail space designed to showcase premium products while providing an immersive shopping experience. The design balances brand identity with architectural integrity.',
            features: ['Custom display fixtures', 'Dynamic lighting system', 'VIP consultation area', 'Sustainable materials', 'Flexible layout'],
            challenge: 'Creating a distinctive brand experience that would stand out in a competitive luxury retail district while complying with strict heritage building regulations.',
            solution: 'We developed a modular display system that can be reconfigured for different collections, used lighting to create dramatic focal points, and preserved original architectural elements while introducing contemporary touches.'
        },
        'project3': {
            title: 'Lakeside Villa Restoration',
            location: 'Lake Como, Italy',
            type: 'Renovation',
            year: '2020',
            size: '350 m²',
            description: 'Historic villa renovation preserving original architecture while introducing modern comforts and energy-efficient solutions. The project honored the building\'s heritage while making it suitable for contemporary living.',
            features: ['Original features restored', 'Underfloor heating', 'Energy-efficient windows', 'Modern kitchen and bathrooms', 'Seamless indoor-outdoor flow'],
            challenge: 'Balancing the preservation of historic elements with the integration of modern amenities and improving the building\'s energy efficiency without compromising its character.',
            solution: 'We carefully restored original features like mosaic floors and frescoes, discreetly integrated modern systems, and used traditional materials with improved performance characteristics to maintain authenticity.'
        }
    };

    // Open modal with project details
    if (viewProjectLinks.length > 0) {
        viewProjectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = link.getAttribute('href').replace('#', '');
                const project = projects[projectId] || projects['project1'];

                modalBody.innerHTML = `
                    <div class="modal-project">
                        <h2>${project.title}</h2>
                        <div class="project-meta" style="display: flex; gap: 2rem; margin: 1.5rem 0; color: var(--gray); font-size: 0.9rem;">
                            <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                            <span><i class="fas fa-tag"></i> ${project.type}</span>
                            <span><i class="fas fa-calendar"></i> ${project.year}</span>
                            <span><i class="fas fa-ruler-combined"></i> ${project.size}</span>
                        </div>

                        <div class="project-image-large" style="margin: 2rem 0;">
                            <div class="sample-image" style="height: 400px; border-radius: var(--radius);">
                                <i class="fas fa-${project.type === 'Residential' ? 'home' : project.type === 'Commercial' ? 'building' : 'water'}" style="font-size: 5rem;"></i>
                                <p style="font-size: 1.5rem; margin-top: 1rem;">${project.title}</p>
                            </div>
                        </div>

                        <div class="project-details">
                            <h3>Project Overview</h3>
                            <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 2rem;">${project.description}</p>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                                <div style="background: var(--light); padding: 2rem; border-radius: var(--radius);">
                                    <h4 style="color: var(--primary); margin-bottom: 1rem;">
                                        <i class="fas fa-star"></i> Key Features
                                    </h4>
                                    <ul style="list-style: none; padding: 0;">
                                        ${project.features.map(feature => `
                                            <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                                                <i class="fas fa-check" style="color: var(--accent); margin-right: 0.5rem;"></i>
                                                ${feature}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>

                                <div style="display: flex; flex-direction: column; gap: 2rem;">
                                    <div style="background: var(--light); padding: 2rem; border-radius: var(--radius);">
                                        <h4 style="color: var(--primary); margin-bottom: 1rem;">
                                            <i class="fas fa-exclamation-triangle"></i> Design Challenge
                                        </h4>
                                        <p>${project.challenge}</p>
                                    </div>

                                    <div style="background: var(--light); padding: 2rem; border-radius: var(--radius);">
                                        <h4 style="color: var(--primary); margin-bottom: 1rem;">
                                            <i class="fas fa-lightbulb"></i> Creative Solution
                                        </h4>
                                        <p>${project.solution}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const projectType = document.getElementById('project-type').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !projectType || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                showFormMessage('Thank you for your message! I will get back to you within 24-48 hours.', 'success');

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }

    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#' || href === '#!') return;

            // Don't prevent default for modal links
            if (href.includes('project')) return;

            e.preventDefault();

            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // LAZY LOAD IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // ============================================
    // ANIMATION ON SCROLL
    // ============================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.animationPlayState = 'running';
            }
        });
    };

    // Initially hide animated elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.animationPlayState = 'paused';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // ============================================
    // FORM INPUT ANIMATIONS
    // ============================================
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check initial value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // ============================================
    // INITIALIZE TOOLTIPS (if needed)
    // ============================================
    // This can be expanded with a proper tooltip library if needed

});

// Add Font Awesome for icons
const faScript = document.createElement('script');
faScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
faScript.integrity = 'sha512-fD9DI5bZwQxOi7MhYWnnNPlvXdp/2Pj3XSTRrFs5FQa4mizyGLnJcN6tuvUS6LbmgN1ut+XGSABKvjN0H6Aoow==';
faScript.crossOrigin = 'anonymous';
faScript.referrerPolicy = 'no-referrer';
document.head.appendChild(faScript);