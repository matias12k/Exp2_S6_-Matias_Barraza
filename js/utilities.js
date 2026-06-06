/**
 * GAMERZONE - Funciones Compartidas
 * Archivo: js/utilities.js
 * Descripción: Utilidades y funciones reutilizables en toda la aplicación
 */

// ==================== GESTIÓN DE ALERTAS ====================

/**
 * Muestra una alerta en la interfaz
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo ('success', 'danger', 'info')
 * @param {string} containerId - ID del contenedor
 */
function showAlert(message, type = 'danger', containerId = 'alertContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const alertClass = type === 'success' ? 'alert-success-custom' : `alert-${type}-custom`;
    const alertHtml = `
        <div class="alert-custom ${alertClass} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    container.innerHTML = alertHtml;
}

/**
 * Limpia alertas
 */
function clearAlerts(containerId = 'alertContainer') {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '';
}

// ==================== VALIDACIONES ====================

/**
 * Valida email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida contraseña
 */
function validatePassword(password) {
    return {
        length: password.length >= 8,
        number: /\d/.test(password),
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        special: /[!@#$%^&*\-_.+()[\]{}|;:'",.<>/?\\`~]/.test(password)
    };
}

/**
 * Verifica si contraseña es válida
 */
function isPasswordValid(password) {
    const validation = validatePassword(password);
    return Object.values(validation).every(rule => rule === true);
}

/**
 * Valida número de tarjeta (Luhn)
 */
function validateCardNumber(cardNumber) {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length !== 16) return false;

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = parseInt(digits[i]);
        if (i % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

/**
 * Valida fecha de vencimiento
 */
function validateExpiry(expiry) {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;

    const m = parseInt(month);
    const y = parseInt('20' + year);

    if (m < 1 || m > 12) return false;

    const now = new Date();
    const expiryDate = new Date(y, m - 1);

    return expiryDate > now;
}

// ==================== LOCALSTORAGE ====================

/**
 * Guarda en localStorage
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}

/**
 * Obtiene de localStorage
 */
function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error al leer:', error);
        return defaultValue;
    }
}

/**
 * Elimina de localStorage
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error al eliminar:', error);
    }
}

// ==================== FORMATEO ====================

/**
 * Formatea moneda
 */
function formatCurrency(value, currency = '$') {
    return `${currency}${parseFloat(value).toFixed(2)}`;
}

/**
 * Formatea fecha
 */
function formatDate(date, locale = 'es-ES') {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

/**
 * Formatea número de tarjeta
 */
function formatCardNumber(cardNumber) {
    const value = cardNumber.replace(/\s/g, '').replace(/[^0-9]/g, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
    }
    return formatted;
}

/**
 * Formatea fecha de vencimiento
 */
function formatExpiry(expiry) {
    let value = expiry.replace(/[^0-9]/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    return value;
}

// ==================== BOTONES ====================

/**
 * Controla estado de carga en botón
 */
function setButtonLoadingState(button, isLoading, loadingText = 'Cargando...', originalText = 'Guardar') {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = `<span class="spinner-loading"></span>${loadingText}`;
    } else {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

// ==================== CÁLCULOS ====================

/**
 * Calcula total
 */
function calculateTotal(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calcula cantidad total
 */
function calculateTotalItems(items) {
    return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Genera ID único
 */
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// ==================== INICIALIZACIÓN ====================

function initializeCommonListeners() {
    document.querySelectorAll('.form-control, .form-select').forEach(input => {
        input.addEventListener('focus', () => clearAlerts());
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommonListeners);
} else {
    initializeCommonListeners();
}
