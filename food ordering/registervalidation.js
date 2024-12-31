document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission for validation

    // Clear previous errors
    document.getElementById("emailError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("passwordError").innerText = "";

    let isValid = true;

    // Validate email
    const email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email 
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email format";
        isValid = false;
    }

    // Validate phone number
    const phone = document.getElementById("phoneNumber").value;
    const phonePattern = /^\+?[0-9]{10,15}$/; // Validates phone number with optional "+" and 10-15 digits
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "Invalid phone number format";
        isValid = false;
    }

    // Validate passwords
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        document.getElementById("passwordError").innerText = "Passwords do not match";
        isValid = false;
    }

    // If all validations pass, submit the form 
    if (isValid) {
        alert("Registration successful!");
        this.submit();
    }
});
