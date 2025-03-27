 // Tab functionality for sidebar
 document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Here you would load the appropriate content for each section
        const sectionName = this.querySelector('span').textContent;
        console.log(`Loading ${sectionName} section...`);
    });
});

// Appointment actions
document.querySelectorAll('.action-btn.view').forEach(btn => {
    btn.addEventListener('click', function() {
        const patientName = this.closest('tr').querySelector('.patient-info div:first-child').textContent;
        alert(`Viewing details for ${patientName}`);
    });
});

document.querySelectorAll('.action-btn.edit').forEach(btn => {
    btn.addEventListener('click', function() {
        if(!this.disabled) {
            const patientName = this.closest('tr').querySelector('.patient-info div:first-child').textContent;
            alert(`Editing appointment for ${patientName}`);
        }
    });
});

document.querySelectorAll('.action-btn.cancel').forEach(btn => {
    btn.addEventListener('click', function() {
        if(!this.disabled) {
            const patientName = this.closest('tr').querySelector('.patient-info div:first-child').textContent;
            if(confirm(`Are you sure you want to cancel the appointment with ${patientName}?`)) {
                alert(`Appointment with ${patientName} cancelled`);
            }
        }
    });
});

// Simulate dynamic data updates
function updateDashboardData() {
    setTimeout(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Add a new notification
        console.log(`Dashboard updated at ${timeString}`);
        
        // In a real app, this would fetch new data from your backend
    }, 10000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardData();
});