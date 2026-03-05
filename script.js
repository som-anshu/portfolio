document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

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
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
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
    });

    // Skill bars animation on scroll
    const skillBars = document.querySelectorAll('.progress-fill');

    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight - 10;

            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }

    window.addEventListener('scroll', animateSkills);
    // Trigger once on load in case skills are visible immediately
    setTimeout(animateSkills, 100);

    // Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
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

            // Update button states
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === totalCards - 1;
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
                if (diff > 0 && currentIndex < totalCards - 1) {
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--;
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

        e.preventDefault();

        if (isScrolling) return;

        let currentIdx = -1;
        let minDistance = Infinity;

        // Find the section currently in view
        scrollableSections.forEach((sec, idx) => {
            const rect = sec.getBoundingClientRect();
            // Consider the section active if its top is closest to the navbar (80px)
            const distance = Math.abs(rect.top - 80);
            if (distance < minDistance) {
                minDistance = distance;
                currentIdx = idx;
            }
        });

        let nextIdx = currentIdx;

        if (e.deltaY > 0) {
            // Scroll down
            nextIdx = Math.min(currentIdx + 1, scrollableSections.length - 1);
        } else if (e.deltaY < 0) {
            // Scroll up
            nextIdx = Math.max(currentIdx - 1, 0);
        }

        if (nextIdx !== currentIdx) {
            isScrolling = true;
            scrollableSections[nextIdx].scrollIntoView({ behavior: 'smooth' });

            // Adjust this timeout to match the scrolling animation duration
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }, { passive: false });
});
