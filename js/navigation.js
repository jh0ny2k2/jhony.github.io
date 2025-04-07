document.addEventListener('DOMContentLoaded', function() {
    // Get all sections and nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navContainer = document.querySelector('nav');
    
    // Mobile navigation elements
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('#mobile-nav a');
    
    // Open mobile navigation
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.remove('translate-x-full');
            mobileNav.classList.add('translate-x-0');
        });
    }

    // Close mobile navigation
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('translate-x-0');
            mobileNav.classList.add('translate-x-full');
        });
    }

    // Close mobile navigation when a link is clicked
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('translate-x-0');
                mobileNav.classList.add('translate-x-full');
            });
        });
    }
    
    // Function to handle responsive navigation
    function handleResponsiveNav() {
        if (window.innerWidth < 768) {
            // Hide the side navigation on mobile instead of moving it to bottom
            navContainer.style.display = 'none';
        } else {
            // Desktop layout with Tailwind classes
            navContainer.style.display = 'flex';
            navContainer.className = 'fixed left-0 top-1/2 -translate-y-1/2 h-auto flex flex-col items-center py-8 px-4 z-20';
            
            // Adjust nav links for desktop with Tailwind
            navLinks.forEach(link => {
                if (!link.className.includes('mb-6')) {
                    link.className = link.className.replace('mb-0', 'mb-6');
                }
                if (!link.className.includes('w-14')) {
                    link.className = link.className.replace('w-12 h-12', 'w-14 h-14');
                }
                
                // Update label classes for desktop
                const label = link.querySelector('.nav-label');
                if (label) {
                    label.className = 'nav-label absolute left-full top-1/2 -translate-y-1/2 bg-gray-200 text-black px-3 py-1 rounded-r-full whitespace-nowrap opacity-0 pointer-events-none transition-all duration-300 -ml-2';
                }
            });
        }
    }
    
    // Call responsive handler on load and resize
    handleResponsiveNav();
    window.addEventListener('resize', handleResponsiveNav);
    
    // Function to highlight active section in navbar
    function highlightNavigation() {
        let scrollPosition = window.scrollY + 200; // Offset to trigger earlier
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.classList.remove('bg-blue-600');
                    link.classList.add('bg-white');
                    link.classList.add('hover:bg-gray-300');
                    link.querySelector('svg').classList.remove('text-white');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.classList.remove('bg-white');
                    activeLink.classList.remove('hover:bg-gray-300');
                    activeLink.classList.add('bg-black');
                    activeLink.querySelector('svg').classList.add('text-white');
                }
            }
        });
    }
    
    // Add hover effect for nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const label = this.querySelector('.nav-label');
            if (label) {
                label.style.opacity = '1';
                if (window.innerWidth >= 768) {
                    label.style.marginLeft = '0';
                }
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const label = this.querySelector('.nav-label');
            if (label) {
                label.style.opacity = '0';
                if (window.innerWidth >= 768) {
                    label.style.marginLeft = '-5px';
                }
            }
        });
    });
    
    // Call highlight function on scroll
    window.addEventListener('scroll', highlightNavigation);
    
    // Initial call to highlight the current section
    highlightNavigation();
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});