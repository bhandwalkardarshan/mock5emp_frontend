let baseUrl = `https://mock5empbackend-production.up.railway.app`

const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')
const toggleRegisterForm = document.getElementById('toggleRegisterForm')
const toggleLoginForm = document.getElementById('toggleLoginForm')

toggleRegisterForm.addEventListener('click',() => {
    loginForm.style.display = 'none'
    registerForm.style.display = 'block'
    // toggleLoginForm.style.backgroundColor = 'red'
    // toggleRegisterForm.style.backgroundColor = '#007bff'
}) 

toggleLoginForm.addEventListener('click',() => {
    loginForm.style.display = 'block'
    registerForm.style.display = 'none'
    // toggleLoginForm.style.backgroundColor = '#007bff'
    // toggleRegisterForm.style.backgroundColor = 'red'
}) 

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = './html/dashboard.html'
    });
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email_reg').value;
    const password = document.getElementById('password_reg').value;
    const confirmPassword = document.getElementById('confirm_password_reg').value;
    
    fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            confirmPassword
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        alert('Registration successful');
    });
});