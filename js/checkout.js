/**
 * GAMERZONE - Script del Checkout
 * Archivo: js/checkout.js
 */

let cartData = null;
const checkoutForm = document.getElementById('checkoutForm');
const paymentForm = document.getElementById('paymentForm');
const payBtn = document.getElementById('payBtn');

function loadCheckoutData() {
    const savedData = getFromStorage('cartForCheckout');
    if (savedData) {
        cartData = savedData;
        renderSummary();
    } else {
        window.location.href = 'carrito.html';
    }
}

function renderSummary() {
    if (!cartData) return;

    const summaryHTML = cartData.items.map(item => `
        <div class="summary-item">
            <div>${item.title}</div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const tax = (cartData.subtotal * 0.15).toFixed(2);
    const shipping = cartData.subtotal > 50 ? '0.00' : '9.99';

    document.getElementById('summaryContent').innerHTML = `
        ${summaryHTML}
        <div class="summary-item">
            <span style="color: var(--text-muted);">Impuesto (15%)</span>
            <span>$${tax}</span>
        </div>
        <div class="summary-item">
            <span style="color: var(--text-muted);">Envío</span>
            <span>$${shipping}</span>
        </div>
        <div class="summary-total">
            <span>Total</span>
            <span class="total-value">$${cartData.total.toFixed(2)}</span>
        </div>
    `;
}

function formatCardNumberInput(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
    }
    input.value = formatted;

    const displayValue = formatted || '•••• •••• •••• ••••';
    document.getElementById('cardNumber').textContent = displayValue;
}

function formatExpiryInput(input) {
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;

    document.getElementById('cardExpiry').textContent = value || 'MM/AA';
}

function updateCardHolder(name) {
    document.getElementById('cardHolder').textContent = name || 'Tu Nombre';
}

function processPayment() {
    if (!checkoutForm.checkValidity()) {
        checkoutForm.classList.add('was-validated');
        return;
    }

    if (!paymentForm.checkValidity()) {
        paymentForm.classList.add('was-validated');
        return;
    }

    const cardNumber = document.getElementById('cardNumberInput').value;
    const expiry = document.getElementById('expiry').value;

    if (!validateCardNumber(cardNumber)) {
        showAlert('Número de tarjeta no válido', 'danger');
        return;
    }

    if (!validateExpiry(expiry)) {
        showAlert('Tarjeta expirada o fecha no válida', 'danger');
        return;
    }

    setButtonLoadingState(payBtn, true, 'Procesando...', 'Pagar ahora');

    setTimeout(() => {
        const order = {
            id: Math.floor(Math.random() * 1000000),
            items: cartData.items,
            total: cartData.total,
            timestamp: new Date().toISOString(),
            status: 'completada'
        };

        saveToStorage('lastOrder', order);
        removeFromStorage('cart');
        removeFromStorage('cartForCheckout');

        window.location.href = 'pago-exitoso.html';

        setButtonLoadingState(payBtn, false, 'Procesando...', 'Pagar ahora');
    }, 2000);
}

window.formatCardNumberInput = formatCardNumberInput;
window.formatExpiryInput = formatExpiryInput;
window.updateCardHolder = updateCardHolder;
window.processPayment = processPayment;

document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutData();
    console.log('GamerZone Checkout - OK');
});
