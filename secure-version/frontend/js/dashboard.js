async function checkSession() {
    try {
        const res = await fetch('/Web-Application/secure-version/backend/api/auth/session.php', {
            credentials: 'include'
        });
        const data = await res.json();
        if(!data.logged_in) {
            window.location.href = 'login.html';
            return;
        }
        document.getElementById('username').textContent = data.username;
    } catch(err) {
        console.log('Error:', err);
        window.location.href = 'login.html';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const res = await fetch('/Web-Application/secure-version/backend/api/auth/logout.php', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
            window.location.href = 'login.html';
        } else {
            alert('Logout failed.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong.');
    }
});

checkSession();