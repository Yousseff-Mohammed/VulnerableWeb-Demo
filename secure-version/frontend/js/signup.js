function isValidEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('signup-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const fullname = document.getElementById('fullname').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let valid = true;

    if(!fullname) {
        document.getElementById('fullNameError').textContent = 'Full Name is required';
        valid = false;
    }
    if(!username) {
        document.getElementById('usernameError').textContent = 'Username is required';
        valid = false;
    }
    if(!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        valid = false;
    }
    if(!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        valid = false;
    }
    if(email && !isValidEmail(email)) {
        document.getElementById('emailError').textContent = "Invalid email format";
        valid = false;
    }
    if(!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
        valid = false;
    }
    if(password && confirmPassword && password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match!";
        valid = false;
    }
    if(!valid) return;

    try {
        const csrfRes = await fetch('/Web-Application/secure-version/backend/api/csrf.php', {
            credentials: 'include'
        });
        const csrfData = await csrfRes.json();
        const csrfToken = csrfData.csrf_token;

        const res = await fetch('/Web-Application/secure-version/backend/api/auth/signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ fullname, username, email, password, confirmPassword, csrf_token: csrfToken })
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            document.getElementById('signupError').textContent = data.error || 'Signup failed';
            return;
        }
        window.location.href = 'login.html';
    } catch(err) {
        console.error('Error:', err);
        document.getElementById('signupError').textContent = 'Something went wrong while signing up.';
    }
});
