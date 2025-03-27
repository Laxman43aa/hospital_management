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

// Form submission
document.querySelector('.booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    
    if(doctor && date && time) {
        const doctorName = document.getElementById('doctor').options[document.getElementById('doctor').selectedIndex].text;
        const formattedDate = new Date(date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        alert(`Appointment booked with ${doctorName} on ${formattedDate} at ${time}`);
        this.reset();
    } else {
        alert('Please fill in all required fields');
    }
});

// Initialize date picker with minimum date as tomorrow
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const yyyy = tomorrow.getFullYear();
    
    document.getElementById('appointment-date').min = `${yyyy}-${mm}-${dd}`;
});