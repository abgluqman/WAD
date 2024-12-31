document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && phone.match(/^\d{10,15}$/) && email && password.length >= 8) {
        alert('Profile updated successfully!');
    } else {
        alert('Please ensure all fields are filled out correctly.');
    }
});
