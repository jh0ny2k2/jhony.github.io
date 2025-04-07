// Typing animation for roles
document.addEventListener('DOMContentLoaded', function() {
    const roles = [
        "Full Stack Developer",
        "Diseñador Gráfico",
        "Web Developer",
        "Unity Developer"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        const typingElement = document.getElementById('typing-role');
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If we've completed typing the current role
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause before starting to delete
        } 
        // If we've deleted the entire role
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Move to next role
            typingSpeed = 500; // Pause before typing next role
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    // Start the typing animation after a short delay
    setTimeout(typeRole, 1000);
});