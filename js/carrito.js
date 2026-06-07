/**
 * GAMERZONE - Script del Carrito
 * Archivo: js/carrito.js
 */

let cartItems = [];

// selectores del HTML estilo Eneba
const cartItemsContainer = document.getElementById('cartItemsContainer');

function loadCart() {
    // Intenta usar tu función global 'getFromStorage', si no existe usa localStorage nativo
    if (typeof getFromStorage === 'function') {
        const savedCart = getFromStorage('cart');
        if (savedCart) cartItems = savedCart;
    } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) cartItems = JSON.parse(savedCart);
    }
}

function saveCart() {
    if (typeof saveToStorage === 'function') {
        saveToStorage('cart', cartItems);
    } else {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    renderCart(); // Vuelve a pintar todo tras guardar
}

// Control interactivo de las flechas + y - 
function changeQuantity(productId, amount) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + amount;
        if (newQuantity <= 0) {
            removeItem(productId);
        } else {
            item.quantity = newQuantity;
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

// RENDERIZADO DEFINITIVO EN TARJETAS HORIZONTALES (ESTILO ENEBA)
function renderCart() {
    if (!cartItemsContainer) return;

    // Estado vacío: Si no hay elementos agregados
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="p-5 text-center rounded my-3" style="background-color: #161726 !important; border: 1px solid rgba(255,255,255,0.05);">
                <div class="fs-1 mb-2">🛒</div>
                <h5 class="text-white">Tu carrito está vacío</h5>
                <p class="text-muted small">Parece que no has agregado productos todavía.</p>
                <a href="index.html" class="btn btn-sm btn-danger mt-2 px-4">Ir al catálogo</a>
            </div>
        `;
        updateSummary(0, 0);
        return;
    }

    // Estado activo: Mapea el arreglo y construye las tarjetas horizontales
    cartItemsContainer.innerHTML = cartItems.map(item => {
        const itemSubtotal = (item.price * item.quantity).toFixed(2);
        
        // Verificación por si la imagen viene vacía para que no tire error
        const itemImage = item.image ? item.image : 'assets/starfield.jpg';

        return `
            <div class="cart-item-horizontal p-3 mb-3 d-flex align-items-center gap-3">
                <div class="cart-item-thumb" style="background-image: url('${itemImage}');"></div>
                
                <div class="flex-grow-1 text-start">
                    <small class="text-uppercase fw-bold" style="font-size: 0.7rem; color: #e94560;">Producto Digital</small>
                    <h6 class="text-white fw-bold mb-1 mt-1">${item.title}</h6>
                    <small class="text-white-50 text-uppercase d-block" style="font-size: 0.75rem;">Plataforma: ${item.platform ? item.platform : 'PC'}</small>
                </div>

                <div class="quantity-control-box">
                    <button class="btn-qty" onclick="changeQuantity(${item.id}, -1)">−</button>
                    <div class="qty-number text-white">${item.quantity}</div>
                    <button class="btn-qty" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>

                <div class="text-end px-2" style="min-width: 100px;">
                    <span class="text-white fw-bold fs-6">$${itemSubtotal}</span>
                </div>

                <button class="btn-trash-item px-1" onclick="removeItem(${item.id})">🗑️</button>
            </div>
        `;
    }).join('');

    // Calcular valores matemáticos globales y actualizar la barra lateral derecha
    const total = calculateTotal();
    const totalItems = calculateTotalItems();
    updateSummary(totalItems, total);
}

// Sincronizar los textos de la columna flotante de Resumen (Derecha)
function updateSummary(count, total) {
    const summaryCountEl = document.getElementById('summaryItemsCount');
    const summarySubtotalEl = document.getElementById('summarySubtotal');
    const totalAmountEl = document.getElementById('cartTotalAmount');

    if (summaryCountEl) summaryCountEl.textContent = `${count} ${count === 1 ? 'producto' : 'productos'}`;
    if (summarySubtotalEl) summarySubtotalEl.textContent = `$${total.toFixed(2)}`;
    if (totalAmountEl) totalAmountEl.textContent = `$${total.toFixed(2)}`;
}

// Acción del gran botón amarillo de Eneba "Continuar con la compra"
function proceedToPayment() {
    if (cartItems.length === 0) return;
    
    // Guardamos un respaldo por si tu checkout.html lo necesita
    if (typeof saveToStorage === 'function') {
        saveToStorage('cartForCheckout', {
            items: cartItems,
            subtotal: calculateTotal(),
            total: calculateTotal(),
            timestamp: new Date().toISOString()
        });
    }

    alert('Conectando de forma segura con la pasarela de pago...');
    window.location.href = 'pago-exitoso.html'; 
}

// Declaraciones globales para que el HTML pueda llamar a las funciones desde el onclick
window.changeQuantity = changeQuantity;
window.removeItem = removeItem;
window.proceedToPayment = proceedToPayment;

// Evento de inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderCart();
    console.log('GamerZone Carrito - OK');
});