console.log("signup.js loaded!");

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('user').value.trim();
    const password = document.getElementById('pass').value.trim();
    const firstname = document.getElementById('fname').value.trim();
    const secondname = document.getElementById('sname').value.trim();

    if(username === '' || password === '' || firstname === '' || secondname === '') {
        alert("Please fill out the field!");
    } else {
        signupForm.submit();
    }
});