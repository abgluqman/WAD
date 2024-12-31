document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    // Simulate login validation logic
    const email = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
    
    if (email && password) { // Simple validation
        alert('Login successful!');
        window.location.href = 'adminDashboard.html'//redirect to index.html
    } else {
        alert('Please enter valid credentials!');
    }
});
  