// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    initializeNavigation();
    initializeTimelineAnimations();
    initializeSmoothScrolling();
    initializeInteractiveEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['hero', 'timeline', 'techstack', 'projects', 'blog', 'contact'];

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            scrollToSection(targetSection);
        });
    });

    // Handle hero button click
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            scrollToSection(targetSection);
        });
    }

    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100; // optional offset for fixed navbar

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && scrollPosition >= section.offsetTop) {
                updateActiveNavigation(sections[i]);
                break;
            }
        }
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navbarOffset = 0; // adjust if you have a fixed navbar
        window.scrollTo({
            top: element.offsetTop - navbarOffset,
            behavior: 'smooth'
        });
    }
}

// Update active navigation
function updateActiveNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        link.classList.toggle('active', section === activeSection);
    });
}

// Timeline animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = { threshold: 0.3, rootMargin: '0px' };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => observer.observe(item));
}

// Smooth scrolling for all internal links
function initializeSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Interactive effects (cards, buttons, etc.)
function initializeInteractiveEffects() {
    // Hover effects on cards
    const cards = document.querySelectorAll('.timeline-card, .blog-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.02)');
        card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
    });

    // Click handlers for media links and buttons
    const mediaLinks = document.querySelectorAll('.media-link, .blog-read-more');
    mediaLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            console.log('Link clicked:', link.textContent);
        });
    });

    // Blog view all button
    const blogViewAll = document.querySelector('.blog-view-all');
    if (blogViewAll) {
        blogViewAll.addEventListener('click', () => console.log('View all posts clicked'));
    }
}

// Utility: debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// On window load: loading animations & staggered timeline
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => item.style.animationDelay = `${index * 200}ms`, 100);
    });
});
