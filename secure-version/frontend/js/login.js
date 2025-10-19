document.getElementById('login-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    let valid = true;
    if(!username) {
        document.getElementById('usernameError').textContent = 'Username is required';
        valid = false;
    }
    if(!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        valid = false;
    }
    if(!valid) return;

    try {
        const csrfRes = await fetch('/Web-Application/secure-version/backend/api/csrf.php', {
            credentials: 'include'
        });
        const csrfData = await csrfRes.json();
        const csrfToken = csrfData.csrf_token;

        const res = await fetch('/Web-Application/secure-version/backend/api/auth/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password, csrf_token: csrfToken })
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            document.getElementById('loginError').textContent = data.error || 'Login failed';
            return;
        }
        window.location.href = 'dashboard.html';
    } catch (err) {
        console.error('Error:', err);
    }
});
