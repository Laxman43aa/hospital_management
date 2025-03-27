  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Info section reveal animation
    const infoSection = document.getElementById('hospitalInfo');
    const sectionPosition = infoSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        infoSection.classList.add('visible');
    }
});

// Smooth scroll to info section
document.getElementById('scrollDown').addEventListener('click', function() {
    document.getElementById('hospitalInfo').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const remember = document.getElementById('remember').checked;
    
    // Simple validation
    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    // Simulate authentication
    authenticateUser(username, password, role);
});

function authenticateUser(username, password, role) {
    // Hide any previous error
    document.getElementById('errorMessage').style.display = 'none';
    
    // Simulate API call
    setTimeout(() => {
        // Demo validation - in real app, verify with backend
        if (username && password) {
            // Redirect based on role
            const dashboards = {
                patient: 'patient-dashboard.html',
                doctor: 'doctor-dashboard.html',
                admin: 'admin-dashboard.html'
            };
            window.location.href = dashboards[role];
        } else {
            showError('Invalid credentials. Please try again.');
        }
    }, 800);
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorElement.style.display = 'block';
}

// Highlight current page in navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});