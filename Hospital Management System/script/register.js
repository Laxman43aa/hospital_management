   // Enhanced Tab Switching Functionality
   document.addEventListener('DOMContentLoaded', function() {
    const roleTabs = document.querySelectorAll('.role-tab');
    const formSections = document.querySelectorAll('.form-section');
    
    // Show patient form by default
    document.getElementById('patientForm').classList.add('active');
    
    roleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and forms
            roleTabs.forEach(t => t.classList.remove('active'));
            formSections.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            const tabId = this.getAttribute('data-tab');
            const formToShow = document.getElementById(`${tabId}Form`);
            if(formToShow) {
                formToShow.classList.add('active');
            } else {
                console.error(`Form with ID ${tabId}Form not found`);
            }
        });
    });

    // Form Submission
    document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateForm('p')) {
            alert('Patient registration submitted!');
            // Add your form submission logic here
        }
    });
    
    document.getElementById('doctorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateForm('d')) {
            alert('Doctor registration submitted!');
            // Add your form submission logic here
        }
    });
    
    document.getElementById('adminForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateForm('a')) {
            alert('Admin registration submitted!');
            // Add your form submission logic here
        }
    });
    
    function validateForm(prefix) {
        const password = document.getElementById(`${prefix}Password`).value;
        const confirmPassword = document.getElementById(`${prefix}ConfirmPassword`).value;
        const terms = document.getElementById(`${prefix}Terms`).checked;
        
        if(password !== confirmPassword) {
            alert('Passwords do not match!');
            return false;
        }
        
        if(!terms) {
            alert('You must accept the terms and conditions');
            return false;
        }
        
        return true;
    }
});