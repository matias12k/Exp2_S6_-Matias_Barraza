/**
 * GAMERZONE - Script del Catálogo
 * Archivo: js/catalogo.js
 */

const productsGrid = document.getElementById('productsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const platformFilter = document.getElementById('platformFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');

const products = [
    { id: 1, title: 'Elden Ring', category: 'accion', platform: 'pc', price: 59.99, emoji: '⚔️', description: 'Aventura de rol en mundo abierto', image: '' },
    { id: 2, title: 'Baldur\'s Gate 3', category: 'rpg', platform: 'pc', price: 59.99, emoji: '🐉', description: 'RPG táctico con elecciones épicas', image: '' },
    { id: 3, title: 'The Legend of Zelda', category: 'aventura', platform: 'switch', price: 69.99, emoji: '🗡️', description: 'Aventura épica en Hyrule', image: '' },
    { id: 4, title: 'Starfield', category: 'accion', platform: 'xbox', price: 69.99, emoji: '🚀', description: 'Exploración espacial sin límites', image: '' },
    { id: 5, title: 'Final Fantasy XVI', category: 'rpg', platform: 'ps5', price: 69.99, emoji: '✨', description: 'RPG de acción épico', image: '' },
    { id: 6, title: 'Civilization VI', category: 'estrategia', platform: 'pc', price: 49.99, emoji: '👑', description: 'Estrategia por turnos clásica', image: '' },
    { id: 7, title: 'FIFA 24', category: 'deporte', platform: 'ps5', price: 49.99, emoji: '⚽', description: 'Simulador de fútbol profesional', image: '' },
    { id: 8, title: 'Halo Infinite', category: 'accion', platform: 'xbox', price: 59.99, emoji: '🎯', description: 'Shooter épico de ciencia ficción', image: '' },
    { id: 9, title: 'Ghost of Tsushima', category: 'accion', platform: 'ps5', price: 49.99, emoji: '👻', description: 'Aventura samurái en Japón', image: '' },
    { id: 10, title: 'Palworld', category: 'aventura', platform: 'pc', price: 29.99, emoji: '🦆', description: 'Juego de criaturas con acción', image: '' }
];

let cartItems = [];

function loadCart() {
    const savedCart = getFromStorage('cart');
    if (savedCart) {
        cartItems = savedCart;
    }
    updateCartBadge();
}

function updateCartBadge() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function saveCart() {
    saveToStorage('cart', cartItems);
    updateCartBadge();
}

function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    saveCart();
    showNotification(`${product.title} agregado al carrito`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function filterProducts() {
    let filtered = [...products];

    if (categoryFilter.value) {
        filtered = filtered.filter(p => p.category === categoryFilter.value);
    }

    if (platformFilter.value) {
        filtered = filtered.filter(p => p.platform === platformFilter.value);
    }

    if (priceFilter.value) {
        filtered = filtered.filter(p => {
            if (priceFilter.value === '0-30') return p.price <= 30;
            if (priceFilter.value === '30-60') return p.price > 30 && p.price <= 60;
            if (priceFilter.value === '60-100') return p.price > 60 && p.price <= 100;
            if (priceFilter.value === '100+') return p.price > 100;
            return true;
        });
    }

    const sort = sortFilter.value;
    if (sort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
}

function renderProducts() {
    const filtered = filterProducts();

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1;">
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h4>No hay productos</h4>
                    <p>Intenta cambiar los filtros</p>
                </div>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image" style="${product.image ? `background-image: url('${product.image}'); background-size: cover; background-position: center;` : 'font-size: 3rem; display: flex; align-items: center; justify-content: center;'}">${!product.image ? product.emoji : ''}</div>
            <div class="product-body">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h5 class="product-title">${product.title}</h5>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <button class="btn-add-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        + Carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

categoryFilter.addEventListener('change', renderProducts);
platformFilter.addEventListener('change', renderProducts);
priceFilter.addEventListener('change', renderProducts);
sortFilter.addEventListener('change', renderProducts);

window.addToCart = addToCart;

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    renderProducts();
    console.log('GamerZone Catálogo - OK');
});
