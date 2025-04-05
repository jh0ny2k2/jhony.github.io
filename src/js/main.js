// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});

// Cursor personalizado
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // El punto central sigue al cursor sin retraso
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        // Efecto al pasar sobre enlaces y botones
        const links = document.querySelectorAll('a, button, .cursor-pointer');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-grow');
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-grow');
            });
        });
        
        // Ocultar cuando el cursor sale de la ventana
        document.addEventListener('mouseout', function(e) {
            if (e.relatedTarget === null) {
                cursor.style.display = 'none';
                cursorDot.style.display = 'none';
            }
        });
        
        document.addEventListener('mouseover', function() {
            cursor.style.display = 'block';
            cursorDot.style.display = 'block';
        });
        
        // Efecto al hacer clic
        document.addEventListener('mousedown', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.9)';
        });
        
        document.addEventListener('mouseup', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
});