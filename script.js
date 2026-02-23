document.addEventListener('DOMContentLoaded', () => {

    // --- Dark/Light Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Scroll Events (Header, Progress Bar, Back to Top) ---
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${scrollPx / winHeightPx * 100}%`;
        scrollProgress.style.width = scrolled;

        // Back to Top Button
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }

        // Active Nav Link Update
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.progress');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Special Observer for Skill Progress Bars ---
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                skillsObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    // --- Typing Animation (using TypewriterJS) ---
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement && typeof Typewriter !== 'undefined') {
        new Typewriter(typedTextElement, {
            strings: [
                'Business Analytics',
                'Data Science',
                'Business Intelligence'
            ],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
            cursor: '' // using custom css cursor
        });
    }

    // --- Form Submission Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                submitBtn.style.background = '#22c55e'; // Success green
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // --- Project Modals ---
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalContent = document.getElementById('modal-content');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');

    const projectDetails = {
        'bcg': {
            title: 'BCG Strategy Consulting Simulation',
            desc: 'A comprehensive profitability analysis for a telecom client. This simulation involved breaking down revenue streams, identifying cost-saving opportunities, and presenting strategic recommendations to improve the bottom line in a highly competitive market.',
            tags: ['Profitability Analysis', 'Telecom Strategy', 'Excel', 'Consulting Frameworks']
        },
        'powerbi': {
            title: 'Power BI Text Analysis',
            desc: 'An advanced emotional analytics dashboard developed using Power BI. Extracted insights from large datasets of text to visualize sentiment, track emotional trends, and interpret user feedback for data-driven product improvements.',
            tags: ['Sentiment Visualization', 'Emotional Analytics', 'Power BI', 'DAX']
        },
        'tata': {
            title: 'TATA Data Visualization Simulation',
            desc: 'Built interactive executive dashboards and established a client questioning framework. Modeled business scenarios to provide clarity to stakeholders and facilitate high-level strategic decision-making.',
            tags: ['Executive Dashboards', 'Framework Design', 'Tableau', 'Data Storytelling']
        }
    };

    if (viewProjectBtns && projectModal) {
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const project = projectDetails[projectId];

                if (project) {
                    const tagsHtml = project.tags.map(tag => `<span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: var(--bg-main); color: var(--accent); border-radius: 4px; font-weight: 500;">${tag}</span>`).join('');
                    modalContent.innerHTML = `
                        <div class="modal-content-inner">
                            <h3>${project.title}</h3>
                            <div class="project-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem;">
                                ${tagsHtml}
                            </div>
                            <p>${project.desc}</p>
                            <button class="btn btn-outline" onclick="document.getElementById('project-modal').classList.remove('active')">Close</button>
                        </div>
                    `;
                    projectModal.classList.add('active');
                }
            });
        });

        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
            }
        });
    }
});
