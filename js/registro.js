/**
 * GAMERZONE - Script del Registro
 * Archivo: js/registro.js
 */

const registerForm = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');
const alertContainer = document.getElementById('alertContainer');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const passwordRules = {
    length: { regex: /.{8,}/, id: 'lengthValidator' },
    number: { regex: /\d/, id: 'numberValidator' },
    uppercase: { regex: /[A-Z]/, id: 'uppercaseValidator' },
    lowercase: { regex: /[a-z]/, id: 'lowercaseValidator' },
    special: { regex: /[!@#$%^&*\-_.+()[\]{}|;:'",.<>/?\\`~]/, id: 'specialValidator' }
};

function updatePasswordValidator(password) {
    const validation = validatePassword(password);

    Object.keys(passwordRules).forEach(rule => {
        const element = document.getElementById(passwordRules[rule].id);
        if (validation[rule]) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    });
}

function getFormData() {
    return {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        username: document.getElementById('username').value.trim(),
        termsCheck: document.getElementById('termsCheck').checked,
        newsletter: document.getElementById('newsletter').checked
    };
}

function validateForm() {
    clearAlerts();
    let isValid = true;
    const formData = getFormData();

    const fullNameInput = document.getElementById('fullName');
    if (!formData.fullName) {
        fullNameInput.classList.add('is-invalid');
        fullNameInput.classList.remove('is-valid');
        isValid = false;
    } else if (formData.fullName.length < 3) {
        fullNameInput.classList.add('is-invalid');
        fullNameInput.classList.remove('is-valid');
        showAlert('Mínimo 3 caracteres', 'danger');
        isValid = false;
    } else {
        fullNameInput.classList.remove('is-invalid');
        fullNameInput.classList.add('is-valid');
    }

    const emailInput = document.getElementById('email');
    if (!formData.email || !isValidEmail(formData.email)) {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        showAlert('Email válido requerido', 'danger');
        isValid = false;
    } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    }

    if (!formData.password || !isPasswordValid(formData.password)) {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
        showAlert('Contraseña no cumple requisitos', 'danger');
        isValid = false;
    } else {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
    }

    if (formData.password !== formData.confirmPassword) {
        confirmPasswordInput.classList.add('is-invalid');
        confirmPasswordInput.classList.remove('is-valid');
        showAlert('Las contraseñas no coinciden', 'danger');
        isValid = false;
    } else if (formData.password && formData.confirmPassword) {
        confirmPasswordInput.classList.remove('is-invalid');
        confirmPasswordInput.classList.add('is-valid');
    }

    const usernameInput = document.getElementById('username');
    if (!formData.username || formData.username.length < 3) {
        usernameInput.classList.add('is-invalid');
        usernameInput.classList.remove('is-valid');
        showAlert('Usuario: mínimo 3 caracteres', 'danger');
        isValid = false;
    } else {
        usernameInput.classList.remove('is-invalid');
        usernameInput.classList.add('is-valid');
    }

    if (!formData.termsCheck) {
        showAlert('Debes aceptar los términos', 'danger');
        isValid = false;
    }

    return isValid;
}

function handleRegister(event) {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = getFormData();
    setButtonLoadingState(registerBtn, true, 'Creando cuenta...', 'Crear cuenta');

    setTimeout(() => {
        saveToStorage('newUser', {
            fullName: formData.fullName,
            email: formData.email,
            username: formData.username,
            newsletter: formData.newsletter,
            registeredAt: new Date().toISOString()
        });

        showAlert('✓ ¡Cuenta creada! Redirigiendo...', 'success');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

        setButtonLoadingState(registerBtn, false, 'Creando cuenta...', 'Crear cuenta');
    }, 2000);
}

function setupInputListeners() {
    passwordInput.addEventListener('input', (e) => {
        updatePasswordValidator(e.target.value);
        passwordInput.classList.remove('is-invalid');
        if (e.target.value) {
            passwordInput.classList.add('is-valid');
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        confirmPasswordInput.classList.remove('is-invalid');
    });

    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('is-invalid');
        });
        input.addEventListener('focus', clearAlerts);
    });
}

registerForm.addEventListener('submit', handleRegister);

document.addEventListener('DOMContentLoaded', () => {
    setupInputListeners();
    console.log('GamerZone Registro - OK');
});
