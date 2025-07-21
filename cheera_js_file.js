// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupFormHandling();
    setupHeaderScrollEffect();
    setupGalleryInteractions();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup scroll animations using Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation triggers
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Handle contact form submission
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        console.log("Form Submit is now handling the contact form");
        //contactForm.addEventListener('submit', handleFormSubmit);
    }
}

// function handleFormSubmit(event) {
//     event.preventDefault();
    
//     // Get form data
//     const formData = new FormData(event.target);
//     const formObject = {};
    
//     // Convert FormData to regular object
//     for (let [key, value] of formData.entries()) {
//         formObject[key] = value;
//     }
    
//     // Validate form data
//     if (validateFormData(formObject)) {
//         // Simulate form submission (replace with actual form submission logic)
//         submitForm(formObject);
        
//         // Show success message
//         showSuccessMessage();
        
//         // Reset form
//         event.target.reset();
//     } else {
//         showErrorMessage('Please fill in all required fields correctly.');
//     }
// }

function validateFormData(data) {
    // Check required fields
    if (!data.name || !data.email) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    return true;
}

function submitForm(data) {
    // This is where you would typically send data to a server
    console.log('Form submitted with data:', data);
    
    //Example: Send to server using fetch
    fetch('/submit-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showSuccessMessage() {
    alert('Thank you for your interest! We will contact you within 24 hours to discuss your stone construction project.');
}

function showErrorMessage(message) {
    alert(message);
}

// Add scroll effect to header
function setupHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(44, 62, 80, 0.95) 0%, rgba(52, 73, 94, 0.95) 100%)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        }
    });
}

// Additional utility functions

// Function to add active class to current nav item
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Function to handle mobile menu (if you want to add mobile navigation later)
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });
    }
}

// Function to add loading animation
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = 'Loading...';
    document.body.appendChild(spinner);
}

function hideLoadingSpinner() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Function to handle gallery item clicks (if you want to add lightbox functionality)
function setupGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add lightbox or modal functionality here
            console.log('Gallery item clicked:', this.textContent);
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavItem();
    setupGalleryInteractions();
});

// Handle window resize events
window.addEventListener('resize', function() {
    // Add any responsive adjustments here if needed
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
});

// Export functions for potential external use
window.CheeraStone = {
    showSuccessMessage,
    showErrorMessage,
    setupMobileMenu,
    showLoadingSpinner,
    hideLoadingSpinner
};