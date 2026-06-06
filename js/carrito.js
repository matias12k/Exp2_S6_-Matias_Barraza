/**
 * GAMERZONE - Script del Carrito
 * Archivo: js/carrito.js
 */

let cartItems = [];
const cartContainer = document.getElementById('cartContainer');
const alertContainer = document.getElementById('alertContainer');

function loadCart() {
    const savedCart = getFromStorage('cart');
    if (savedCart) {
        cartItems = savedCart;
    }
}

function saveCart() {
    saveToStorage('cart', cartItems);
    renderCart();
}

function updateQuantity(productId, quantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeItem(productId);
        } else {
            item.quantity = quantity;
            saveCart();
        }
    }
}

function removeItem(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCart();
}

function calculateTotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTotalItems() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function renderCart() {
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div style="grid-column: 1 / -1;">
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <h3>Tu carrito está vacío</h3>
                    <p>Parece que no has agregado productos todavía</p>
                    <a href="index.html" class="btn-continue-shopping">Ir al catálogo</a>
                </div>
            </div>
        `;
        return;
    }

    const total = calculateTotal();
    const totalItems = calculateTotalItems();

    const cartHTML = `
        <div class="cart-items">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th style="text-align: center;">Cantidad</th>
                        <th style="text-align: right;">Precio</th>
                        <th style="text-align: right;">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${cartItems.map(item => `
                        <tr>
                            <td>
                                <div class="product-cell">
                                    ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; border-radius: 4px; object-fit: cover;">` : `<span class="product-emoji">${item.emoji}</span>`}
                                    <div class="product-info">
                                        <h6>${item.title}</h6>
                                        <p>${item.category.toUpperCase()}</p>
                                    </div>
                                </div>
                            </td>
                            <td style="text-align: center;">
                                <div class="quantity-control">
                                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                                    <input type="number" class="quantity-input" value="${item.quantity}" 
                                           onchange="updateQuantity(${item.id}, parseInt(this.value))" min="1">
                                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                            </td>
                            <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                            <td style="text-align: right; font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</td>
                            <td>
                                <button class="btn-remove" onclick="removeItem(${item.id})">Eliminar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="cart-summary">
            <div class="summary-title">Resumen</div>
            <div class="summary-row">
                <span>Subtotal (${totalItems} items):</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Impuesto (15%):</span>
                <span>$${(total * 0.15).toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Envío:</span>
                <span>$${total > 50 ? '0.00' : '9.99'}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span class="total-value">$${(total * 1.15 + (total > 50 ? 0 : 9.99)).toFixed(2)}</span>
            </div>
            <button class="btn-checkout" onclick="proceedToCheckout()">Proceder al pago</button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

function proceedToCheckout() {
    saveToStorage('cartForCheckout', {
        items: cartItems,
        subtotal: calculateTotal(),
        total: calculateTotal() * 1.15 + (calculateTotal() > 50 ? 0 : 9.99),
        timestamp: new Date().toISOString()
    });

    window.location.href = 'checkout.html';
}

window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.proceedToCheckout = proceedToCheckout;

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
    console.log('GamerZone Carrito - OK');
});
