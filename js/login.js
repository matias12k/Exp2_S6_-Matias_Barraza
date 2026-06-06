/**
 * GAMERZONE - Script del Login
 * Archivo: js/login.js
 */

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const alertContainer = document.getElementById('alertContainer');
const roleInputs = document.querySelectorAll('input[name="userRole"]');

function getFormData() {
    const role = document.querySelector('input[name="userRole"]:checked');
    return {
        role: role ? role.value : '',
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        rememberMe: document.getElementById('rememberMe').checked
    };
}

function validateForm() {
    clearAlerts();
    let isValid = true;

    const formData = getFormData();

    if (!formData.role) {
        document.getElementById('roleError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('roleError').style.display = 'none';
    }

    const emailInput = document.getElementById('email');
    if (!formData.email) {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        isValid = false;
    } else if (!isValidEmail(formData.email)) {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        showAlert('Por favor, ingresa un correo válido', 'danger');
        isValid = false;
    } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    }

    const passwordInput = document.getElementById('password');
    if (!formData.password) {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
        isValid = false;
    } else if (formData.password.length < 6) {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
        showAlert('Mínimo 6 caracteres', 'danger');
        isValid = false;
    } else {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
    }

    return isValid;
}

function handleLogin(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = getFormData();
    setButtonLoadingState(loginBtn, true, 'Iniciando sesión...', 'Iniciar sesión');

    setTimeout(() => {
        const credentials = {
            cliente: { email: 'cliente@gamerzone.com', password: 'cliente123' },
            admin: { email: 'admin@gamerzone.com', password: 'admin123' }
        };

        const expectedCredentials = credentials[formData.role];

        if (expectedCredentials && 
            formData.email === expectedCredentials.email && 
            formData.password === expectedCredentials.password) {
            
            showAlert('✓ ¡Sesión iniciada!', 'success');
            
            saveToStorage('userRole', formData.role);
            saveToStorage('userEmail', formData.email);
            
            if (formData.rememberMe) {
                saveToStorage('rememberMe', true);
                saveToStorage('savedEmail', formData.email);
            }

            setTimeout(() => {
                window.location.href = formData.role === 'admin' ? 'admin-productos.html' : 'index.html';
            }, 1500);

        } else {
            showAlert('❌ Credenciales incorrectas', 'danger');
        }

        setButtonLoadingState(loginBtn, false, 'Iniciando sesión...', 'Iniciar sesión');
    }, 2000);
}

function handleForgotPassword(event) {
    event.preventDefault();
    showAlert('Contacta al soporte', 'info');
}

function loadRememberedEmail() {
    if (getFromStorage('rememberMe')) {
        const savedEmail = getFromStorage('savedEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
}

function setupInputListeners() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('is-invalid', 'is-valid');
        clearAlerts();
    });

    passwordInput.addEventListener('input', () => {
        passwordInput.classList.remove('is-invalid', 'is-valid');
        clearAlerts();
    });

    roleInputs.forEach(input => {
        input.addEventListener('change', () => {
            document.getElementById('roleError').style.display = 'none';
        });
    });
}

loginForm.addEventListener('submit', handleLogin);

document.addEventListener('DOMContentLoaded', () => {
    loadRememberedEmail();
    setupInputListeners();
    console.log('GamerZone Login - OK');
});

window.handleForgotPassword = handleForgotPassword;
