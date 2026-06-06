/**
 * GAMERZONE - Script de Pago Exitoso
 * Archivo: js/pago-exitoso.js
 */

function loadOrderDetails() {
    const lastOrder = getFromStorage('lastOrder');
    
    if (!lastOrder) {
        window.location.href = 'index.html';
        return;
    }

    const orderDetailsContainer = document.getElementById('orderDetails');
    const orderItemsContainer = document.getElementById('orderItems');

    document.getElementById('orderId').textContent = `#${lastOrder.id}`;
    document.getElementById('orderDate').textContent = new Date(lastOrder.timestamp).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    orderItemsContainer.innerHTML = lastOrder.items.map(item => `
        <div class="order-item-row">
            <div class="item-info">
                ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; border-radius: 4px; object-fit: cover;">` : `<span class="item-emoji">${item.emoji}</span>`}
                <div>
                    <h6>${item.title}</h6>
                    <small>${item.category.toUpperCase()} • ${item.platform.toUpperCase()}</small>
                </div>
            </div>
            <div class="item-quantity">x${item.quantity}</div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const tax = (lastOrder.total * 0.15 / 1.15).toFixed(2);
    const subtotal = (lastOrder.total / 1.15).toFixed(2);
    const shipping = subtotal > 50 ? '0.00' : '9.99';

    document.getElementById('orderSubtotal').textContent = `$${subtotal}`;
    document.getElementById('orderTax').textContent = `$${tax}`;
    document.getElementById('orderShipping').textContent = `$${shipping}`;
    document.getElementById('orderTotal').textContent = `$${lastOrder.total.toFixed(2)}`;

    addToOrderHistory(lastOrder);
}

function addToOrderHistory(order) {
    let history = getFromStorage('orderHistory') || [];
    history.push(order);
    saveToStorage('orderHistory', history);
}

function continueShoppingClick() {
    removeFromStorage('lastOrder');
    removeFromStorage('cartForCheckout');
    window.location.href = 'index.html';
}

function goToProfileClick() {
    window.location.href = 'perfil.html';
}

window.continueShopping = continueShoppingClick;
window.goToProfile = goToProfileClick;

document.addEventListener('DOMContentLoaded', () => {
    loadOrderDetails();
    console.log('GamerZone Pago Exitoso - OK');
});
