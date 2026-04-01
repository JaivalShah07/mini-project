document.addEventListener('DOMContentLoaded', function() {

    const colorButton = document.getElementById('colorButton');
    const themes = [
        { bg: '#f8f9fa', primary: '#667eea', secondary: '#764ba2' },
        { bg: '#e3f2fd', primary: '#2196f3', secondary: '#21cbf3' },
        { bg: '#f3e5f5', primary: '#9c27b0', secondary: '#ba68c8' },
        { bg: '#fff3e0', primary: '#ff9800', secondary: '#ffb74d' },
        { bg: '#e8f5e8', primary: '#4caf50', secondary: '#81c784' }
    ];
    let currentThemeIndex = 0;

    function changeTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const theme = themes[currentThemeIndex];
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.secondary);
        document.documentElement.style.setProperty('--bg-color', theme.bg);
        document.body.style.backgroundColor = theme.bg;
    }

    if (colorButton) {
        colorButton.addEventListener('click', changeTheme);
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    let isDarkMode = false;

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        if (isDarkMode) {
            document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
            document.documentElement.style.setProperty('--text-color', '#e0e0e0');
            document.documentElement.style.setProperty('--card-bg', '#2a2a2a');
        } else {
            document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--card-bg', 'white');
        }
        localStorage.setItem('darkMode', isDarkMode);
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
        document.documentElement.style.setProperty('--text-color', '#e0e0e0');
        document.documentElement.style.setProperty('--card-bg', '#2a2a2a');
    }



    // Form validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.9rem'; 
            errorElement.style.marginTop = '0.25rem';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        input.style.borderColor = 'red';
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '#ddd';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm(e) {
        e.preventDefault();
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            alert('Message sent successfully!');
            contactForm.reset();
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});