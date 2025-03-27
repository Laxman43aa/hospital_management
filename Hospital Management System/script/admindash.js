$(document).ready(function() {
    // Initialize DataTables
    const patientsTable = $('#patients-table').DataTable();
    const appointmentsTable = $('#appointments-table').DataTable();
    const doctorsTable = $('#doctors-table').DataTable();
    const billingTable = $('#billing-table').DataTable();

    // Current section tracking
    let currentSection = 'dashboard';
    let currentEditingId = null;

    // Show the dashboard section by default
    showSection(currentSection);

    // Sidebar menu item click handler
    $('.menu-item').on('click', function() {
        if ($(this).attr('id') === 'logout-btn') return;
        
        $('.menu-item').removeClass('active');
        $(this).addClass('active');
        
        const section = $(this).data('section');
        showSection(section);
    });

    // Show the selected section
    function showSection(section) {
        currentSection = section;
        $('.content-section').hide();
        $(`#${section}-section`).show();
        $('#page-title').text($(`.menu-item[data-section="${section}"] span`).text());
        
        // Update DataTables when switching to their sections
        if (section === 'patients') {
            patientsTable.draw();
        } else if (section === 'appointments') {
            appointmentsTable.draw();
        } else if (section === 'doctors') {
            doctorsTable.draw();
        } else if (section === 'billing') {
            billingTable.draw();
        }
    }

    // Dashboard card click handlers
    $('#patients-card').on('click', function() {
        $('.menu-item[data-section="patients"]').click();
    });

    $('#appointments-card').on('click', function() {
        $('.menu-item[data-section="appointments"]').click();
    });

    $('#doctors-card').on('click', function() {
        $('.menu-item[data-section="doctors"]').click();
    });

    $('#revenue-card').on('click', function() {
        $('.menu-item[data-section="billing"]').click();
    });

    // Add buttons click handlers
    $('#add-patient-btn').on('click', function() {
        currentEditingId = null;
        $('#patient-form')[0].reset();
        $('#add-patient-modal .modal-header h3').text('Add New Patient');
        $('#save-patient-btn').text('Save Patient');
        $('#add-patient-modal').show();
    });

    $('#add-appointment-btn').on('click', function() {
        currentEditingId = null;
        $('#appointment-form')[0].reset();
        $('#add-appointment-modal .modal-header h3').text('Schedule New Appointment');
        $('#save-appointment-btn').text('Schedule Appointment');
        $('#add-appointment-modal').show();
    });
        // Add buttons click handlers for new sections
        $('#add-doctor-btn').on('click', function() {
            // Implementation for adding doctors
            alert('Add doctor functionality will be implemented here');
        });
    
        $('#add-billing-btn').on('click', function() {
            // Implementation for adding billing records
            alert('Add billing record functionality will be implemented here');
        });
    
        $('#save-settings-btn').on('click', function() {
            alert('Settings saved successfully');
            addActivity('System settings updated');
        });
    
        $('#reset-settings-btn').on('click', function() {
            if (confirm('Are you sure you want to reset all settings to default?')) {
                $('#system-settings-form')[0].reset();
                addActivity('System settings reset to default');
            }
        });

    // Modal close handlers
    $('.modal-close, .modal .btn:not(#save-patient-btn, #save-appointment-btn, #confirm-action-btn)').on('click', function() {
        $(this).closest('.modal').hide();
    });

    // View button handlers
    $(document).on('click', '.action-btn.view', function() {
        const row = $(this).closest('tr');
        const id = row.find('td:eq(0)').text();
        const title = row.find('td:eq(1)').text();
        
        $('#view-modal-title').text(`Details for ${title} (${id})`);
        
        // Simulate loading details
        $('#view-modal-body').html(`
            <div style="text-align: center; margin: 20px 0;">
                <i class="fas fa-spinner fa-spin fa-3x" style="color: var(--primary);"></i>
            </div>
        `);
        
        setTimeout(() => {
            $('#view-modal-body').html(`
                <div class="details-container">
                    <div class="detail-row">
                        <strong>ID:</strong> ${id}
                    </div>
                    <div class="detail-row">
                        <strong>Name:</strong> ${title}
                    </div>
                    ${currentSection === 'patients' ? `
                    <div class="detail-row">
                        <strong>Age:</strong> ${row.find('td:eq(3)').text()}
                    </div>
                    <div class="detail-row">
                        <strong>Gender:</strong> ${row.find('td:eq(2)').text()}
                    </div>
                    <div class="detail-row">
                        <strong>Phone:</strong> ${row.find('td:eq(4)').text()}
                    </div>
                    <div class="detail-row">
                        <strong>Last Visit:</strong> ${row.find('td:eq(5)').text()}
                    </div>
                    <div class="detail-row">
                        <strong>Status:</strong> ${row.find('td:eq(6)').html()}
                    </div>
                    ` : currentSection === 'appointments' ? `
                    <div class="detail-row">
                        <strong>Doctor:</strong> ${row.find('td:eq(2)').text()}
                    </div>
                    <div class="detail-row">
                        <strong>Date & Time:</strong> ${row.find('td:eq(3)').text()}
                    </div>
                    <div class="detail-row">
                        <strong>Purpose:</strong> ${row.find('td:eq(4)').text()}
                    </div>
                    <div class="detail-row">
                        <strong>Status:</strong> ${row.find('td:eq(5)').html()}
                    </div>
                    ` : ''}
                </div>
            `);
        }, 1000);
        
        $('#view-details-modal').show();
    });

    // Edit button handlers - Enhanced to load data into form
    $(document).on('click', '.action-btn.edit', function() {
        const row = $(this).closest('tr');
        const id = row.find('td:eq(0)').text();
        currentEditingId = id;
        
        if (currentSection === 'patients') {
            // Load patient data into form
            $('#patient-first-name').val(row.find('td:eq(1)').text().split(' ')[0]);
            $('#patient-last-name').val(row.find('td:eq(1)').text().split(' ')[1] || '');
            $('#patient-gender').val(row.find('td:eq(2)').text());
            // Calculate age to DOB (simplified)
            const age = parseInt(row.find('td:eq(3)').text());
            const birthYear = new Date().getFullYear() - age;
            $('#patient-dob').val(`${birthYear}-01-01`);
            $('#patient-phone').val(row.find('td:eq(4)').text());
            
            $('#add-patient-modal .modal-header h3').text('Edit Patient');
            $('#save-patient-btn').text('Update Patient');
            $('#add-patient-modal').show();
        } 
        else if (currentSection === 'appointments') {
            // Load appointment data into form
            const patientName = row.find('td:eq(1)').text();
            const patientOption = $(`#appointment-patient option:contains(${patientName})`).val();
            $('#appointment-patient').val(patientOption);
            
            const doctorName = row.find('td:eq(2)').text();
            const doctorOption = $(`#appointment-doctor option:contains(${doctorName})`).val();
            $('#appointment-doctor').val(doctorOption);
            
            const dateTime = row.find('td:eq(3)').text().split(' ');
            $('#appointment-date').val(dateTime[0]);
            $('#appointment-time').val(dateTime[1] + ' ' + dateTime[2]);
            
            $('#appointment-purpose').val(row.find('td:eq(4)').text());
            
            $('#add-appointment-modal .modal-header h3').text('Edit Appointment');
            $('#save-appointment-btn').text('Update Appointment');
            $('#add-appointment-modal').show();
        }
    });

    // Delete button handlers
    $(document).on('click', '.action-btn.delete', function() {
        const row = $(this).closest('tr');
        const id = row.find('td:eq(0)').text();
        const name = row.find('td:eq(1)').text();
        
        $('#confirm-title').text('Confirm Deletion');
        $('#confirm-message').html(`Are you sure you want to delete <strong>${name} (${id})</strong>? This action cannot be undone.`);
        $('#confirm-action-btn').text('Delete').removeClass('btn-primary').addClass('btn-danger');
        
        $('#confirm-modal').show();
        
        $('#confirm-action-btn').off('click').on('click', function() {
            if (currentSection === 'patients') {
                patientsTable.row(row).remove().draw();
            } else if (currentSection === 'appointments') {
                appointmentsTable.row(row).remove().draw();
            }
            addActivity(`Deleted ${currentSection.slice(0, -1)} ${name} (${id})`);
            $('#confirm-modal').hide();
        });
    });

    // Save patient handler
    $('#save-patient-btn').on('click', function() {
        // Basic validation
        if (!$('#patient-first-name').val() || !$('#patient-last-name').val()) {
            alert('Please fill in all required fields');
            return;
        }
        
        const patientData = {
            id: currentEditingId || `#${Math.floor(10000 + Math.random() * 90000)}`,
            firstName: $('#patient-first-name').val(),
            lastName: $('#patient-last-name').val(),
            gender: $('#patient-gender').val(),
            dob: $('#patient-dob').val(),
            age: calculateAge($('#patient-dob').val()),
            phone: $('#patient-phone').val(),
            email: $('#patient-email').val(),
            lastVisit: new Date().toISOString().split('T')[0],
            status: '<span class="badge badge-success">Active</span>'
        };
        
        if (currentEditingId) {
            // Update existing patient
            const row = patientsTable.row(`tr:contains(${currentEditingId})`);
            row.data([
                patientData.id,
                `${patientData.firstName} ${patientData.lastName}`,
                patientData.gender,
                patientData.age,
                patientData.phone,
                patientData.lastVisit,
                patientData.status,
                `<button class="action-btn view"><i class="fas fa-eye"></i></button>
                 <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                 <button class="action-btn delete"><i class="fas fa-trash"></i></button>`
            ]).draw();
            addActivity(`Updated patient ${patientData.firstName} ${patientData.lastName} (${patientData.id})`);
        } else {
            // Add new patient
            patientsTable.row.add([
                patientData.id,
                `${patientData.firstName} ${patientData.lastName}`,
                patientData.gender,
                patientData.age,
                patientData.phone,
                patientData.lastVisit,
                patientData.status,
                `<button class="action-btn view"><i class="fas fa-eye"></i></button>
                 <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                 <button class="action-btn delete"><i class="fas fa-trash"></i></button>`
            ]).draw();
            addActivity(`Added new patient ${patientData.firstName} ${patientData.lastName} (${patientData.id})`);
        }
        
        $('#add-patient-modal').hide();
    });

    // Save appointment handler
    $('#save-appointment-btn').on('click', function() {
        // Basic validation
        if (!$('#appointment-patient').val() || !$('#appointment-doctor').val()) {
            alert('Please fill in all required fields');
            return;
        }
        
        const patientText = $('#appointment-patient option:selected').text();
        const doctorText = $('#appointment-doctor option:selected').text();
        
        const appointmentData = {
            id: currentEditingId || `#A${Math.floor(1000 + Math.random() * 9000)}`,
            patient: patientText.split(' (')[0],
            doctor: doctorText,
            date: $('#appointment-date').val(),
            time: $('#appointment-time').val(),
            dateTime: `${$('#appointment-date').val()} ${$('#appointment-time').val()}`,
            purpose: $('#appointment-purpose').val(),
            status: '<span class="badge badge-success">Confirmed</span>'
        };
        
        if (currentEditingId) {
            // Update existing appointment
            const row = appointmentsTable.row(`tr:contains(${currentEditingId})`);
            row.data([
                appointmentData.id,
                appointmentData.patient,
                appointmentData.doctor,
                appointmentData.dateTime,
                appointmentData.purpose,
                appointmentData.status,
                `<button class="action-btn edit"><i class="fas fa-edit"></i></button>
                 <button class="action-btn delete"><i class="fas fa-trash"></i></button>`
            ]).draw();
            addActivity(`Updated appointment ${appointmentData.id} for ${appointmentData.patient}`);
        } else {
            // Add new appointment
            appointmentsTable.row.add([
                appointmentData.id,
                appointmentData.patient,
                appointmentData.doctor,
                appointmentData.dateTime,
                appointmentData.purpose,
                appointmentData.status,
                `<button class="action-btn edit"><i class="fas fa-edit"></i></button>
                 <button class="action-btn delete"><i class="fas fa-trash"></i></button>`
            ]).draw();
            addActivity(`Scheduled new appointment ${appointmentData.id} for ${appointmentData.patient}`);
        }
        
        $('#add-appointment-modal').hide();
    });

    // Helper function to calculate age from DOB
    function calculateAge(dob) {
        if (!dob) return '';
        const birthDate = new Date(dob);
        const diff = Date.now() - birthDate.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // Logout handler
    $('#logout-btn').on('click', function(e) {
        e.preventDefault();
        $('#confirm-title').text('Confirm Logout');
        $('#confirm-message').html('Are you sure you want to logout?');
        $('#confirm-action-btn').text('Logout').removeClass('btn-danger').addClass('btn-primary');
        
        $('#confirm-modal').show();
        
        $('#confirm-action-btn').off('click').on('click', function() {
            window.location.href = '/html/login.html';
        });
    });

    // Add activity to recent activity list
    function addActivity(message) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timeAgo = 'Just now';
        
        const icons = {
            'patient': 'fa-user-plus',
            'appointment': 'fa-calendar-plus',
            'doctor': 'fa-user-md',
            'bill': 'fa-file-invoice'
        };
        
        let icon = 'fa-bell';
        for (const [key, value] of Object.entries(icons)) {
            if (message.toLowerCase().includes(key)) {
                icon = value;
                break;
            }
        }
        
        $('#activity-list').prepend(`
            <li class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${message}</div>
                    <div class="activity-time">${timeAgo}</div>
                </div>
            </li>
        `);
        
        // Limit to 10 activities
        if ($('#activity-list li').length > 10) {
            $('#activity-list li:last').remove();
        }
    }

    // Simulate dynamic data updates
    function updateDashboardData() {
        setTimeout(() => {
            // Randomly update patient count
            const patientCount = Math.floor(Math.random() * 50) + 1200;
            $('.card-value').first().text(patientCount.toLocaleString());
            
            // Add a new activity
            const activities = [
                'New patient registered via online portal',
                'System backup completed successfully',
                'New doctor joined the hospital',
                'Monthly financial report generated',
                'Patient appointment reminder sent'
            ];
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            addActivity(randomActivity);
            
            // Schedule next update
            setTimeout(updateDashboardData, 10000);
        }, 5000);
    }

    // Initialize data updates
    updateDashboardData();
});