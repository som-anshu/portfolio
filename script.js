document.addEventListener('DOMContentLoaded', () => {
    // Theme Initialization (Immediate)
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    applyTheme(savedTheme);

    // Sync theme across tabs/windows
    window.addEventListener('storage', (event) => {
        if (event.key === 'portfolio-theme') {
            applyTheme(event.newValue);
        }
    });

    // Navbar elements
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('theme-toggle');

    // Theme Toggle Click Handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 250)) { // Slightly larger offset for better transition
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Win 10 Reveal Glow for Nav Links
        link.addEventListener('mousemove', e => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            link.style.setProperty('--mouse-x', `${x}px`);
            link.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Skill bars animation on scroll
    const skillBars = document.querySelectorAll('.progress-fill');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight + 50; // Increased threshold to ensure the last item triggers

            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }

    window.addEventListener('scroll', animateSkills);
    // Trigger immediately on load as skills might be visible
    animateSkills();

    // Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Dynamic Content Modal functionality
    const modal = document.getElementById("contentModal");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalMeta = document.getElementById("modalMeta");
    const modalDesc = document.getElementById("modalDescription");
    const modalBody = document.querySelector(".modal-body");
    const closeBtn = document.querySelector(".modal-close");

    // Project Cards click logic
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Check if they clicked the Github link, don't open modal if so
            if (e.target.closest('a') || e.target.closest('.project-link')) {
                return;
            }

            // If clicked on the image, enlarge the image only
            if (e.target.classList.contains('project-image')) {
                modalBody.classList.remove("details-only");
                modalBody.classList.add("image-only");
                modalImg.src = e.target.src;
                modalImg.style.display = 'block';
                modalTitle.innerHTML = "";
                modalMeta.innerHTML = "";
                modalDesc.innerHTML = "";

                modal.style.display = "flex";
                setTimeout(() => {
                    modal.classList.add("show");
                }, 10);
                return;
            }

            // Get content from the card for details view
            const img = card.querySelector('.project-image') ? card.querySelector('.project-image').src : '';
            const title = card.querySelector('.project-title') ? card.querySelector('.project-title').innerHTML : '';
            const meta = card.querySelector('.project-meta') ? card.querySelector('.project-meta').outerHTML : '';
            const desc = card.querySelector('.project-description') ? card.querySelector('.project-description').innerHTML : '';

            // Populate Modal with normal layout showing both image and details
            modalBody.classList.remove("image-only");
            modalBody.classList.remove("details-only");
            modalImg.src = img;
            modalImg.style.display = img ? 'block' : 'none';
            modalTitle.innerHTML = title;
            modalMeta.innerHTML = meta;
            modalDesc.innerHTML = desc;

            // Show Modal
            modal.style.display = "flex"; // Use flex to center modal dialog
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        });
    });

    // Simple profile/cert images click logic
    const simpleImages = document.querySelectorAll(".profile-image, .cert-image");

    simpleImages.forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent trigger if inside a card
            modalBody.classList.remove("details-only");
            modalBody.classList.add("image-only");
            modalImg.src = this.src;
            modalImg.style.display = 'block';
            modalTitle.innerHTML = "";
            modalMeta.innerHTML = "";
            modalDesc.innerHTML = "";

            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        });
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove("show");
        // Wait for animation to finish before hiding element
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal dialog
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }
    });

    // Windows 10 Sophisticated Animations (Glow & Tilt)
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update Glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Update Tilt (Subtle)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5 degrees
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
    // Slider Controller Logic
    function initSlider(sliderId) {
        const viewport = document.getElementById(sliderId);
        if (!viewport) return;

        const track = viewport.querySelector('.projects-timeline');
        const cards = track.querySelectorAll('.project-card');
        const prevBtn = viewport.querySelector('.slider-btn.prev');
        const nextBtn = viewport.querySelector('.slider-btn.next');

        let currentIndex = 0;
        const totalCards = cards.length;
        let autoPlayTimer;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Note: Removed disabling of buttons to allow infinite looping as requested
        }

        function nextSlide() {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateSlider();
        }

        function startAutoPlay() {
            stopAutoPlay(); // Clear any existing
            autoPlayTimer = setInterval(nextSlide, 5000); // 5 seconds
        }

        function stopAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoPlay();
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = totalCards - 1; // Loop to end
                }
                updateSlider();
                startAutoPlay();
            });
        }

        // Pause on hover
        viewport.addEventListener('mouseenter', stopAutoPlay);
        viewport.addEventListener('mouseleave', startAutoPlay);

        // Initialize state
        updateSlider();
        startAutoPlay();

        // Touch support
        let startX = 0;
        viewport.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left -> Next
                    currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
                } else if (diff < 0) {
                    // Swipe right -> Prev
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
                }
                updateSlider();
            }
        }, { passive: true });
    }

    // Initialize all sliders
    initSlider('projects-slider');
    initSlider('internships-slider');
    initSlider('patents-slider');

    // Smooth Animation for Jump to Next Section on Single Scroll
    const scrollableSections = Array.from(document.querySelectorAll('.section:not(.work-section):not(#skills), .skills-division, .work-category, .footer'));
    let isScrolling = false;

    window.addEventListener('wheel', (e) => {
        // Don't interfere if modal is open
        if (modal.classList.contains("show")) return;

        // Threshold for scroll intent
        if (Math.abs(e.deltaY) < 30) return;

        if (isScrolling) {
            e.preventDefault();
            return;
        }

        let currentIdx = -1;
        let minDistance = Infinity;

        // Find the section currently in view (closest to top)
        scrollableSections.forEach((sec, idx) => {
            const rect = sec.getBoundingClientRect();
            const distance = Math.abs(rect.top - 80);
            if (distance < minDistance) {
                minDistance = distance;
                currentIdx = idx;
            }
        });

        const currentSection = scrollableSections[currentIdx];
        const rect = currentSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const navbarHeight = 80;

        // Logic for jumping vs. normal scrolling
        if (e.deltaY > 0) {
            // SCROLLING DOWN
            // If the current section bottom is significantly below the viewport bottom,
            // allow native scroll to see the rest of the content.
            if (rect.bottom > viewportHeight + 5) {
                return; // Normal scrolling
            }
            
            // Otherwise, if we are at the end of the section, jump to next
            const nextIdx = Math.min(currentIdx + 1, scrollableSections.length - 1);
            if (nextIdx !== currentIdx) {
                e.preventDefault();
                isScrolling = true;
                scrollableSections[nextIdx].scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { isScrolling = false; }, 800);
            }
        } else {
            // SCROLLING UP
            // If the current section top is significantly above the navbar,
            // allow native scroll to see the top content.
            if (rect.top < navbarHeight - 5) {
                return; // Normal scrolling
            }

            // Otherwise, jump to previous
            const prevIdx = Math.max(currentIdx - 1, 0);
            if (prevIdx !== currentIdx) {
                e.preventDefault();
                isScrolling = true;
                scrollableSections[prevIdx].scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { isScrolling = false; }, 800);
            }
        }
    }, { passive: false });

    // Coder Vibe: Typewriter Effect
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.innerText;
        subtitle.innerText = '';
        subtitle.style.fontFamily = 'var(--font-mono)';
        subtitle.style.display = 'inline-block';
        subtitle.style.borderRight = '3px solid var(--primary-color)';
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                subtitle.innerText += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                // Keep flickering effect for cursor
                subtitle.classList.add('blinking-cursor');
            }
        };
        type();
    }

});

// Preloader Removal (Top Level for Reliability)
const removePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        document.body.classList.remove('loading');
    }
};

window.addEventListener('load', removePreloader);

// Failsafe: Remove preloader after 5 seconds even if load event fails
setTimeout(removePreloader, 5000);
