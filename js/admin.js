/**
 * GAMERZONE - Script del Admin
 * Archivo: js/admin.js
 */

const productsTable = document.getElementById('productsTable');
const addProductBtn = document.getElementById('addProductBtn');
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const productForm = document.getElementById('productForm');
const saveProductBtn = document.getElementById('saveProductBtn');
const closeModal = document.getElementById('closeModal');

let products = [];
let editingId = null;

const emojis = ['⚔️', '🐉', '🗡️', '🚀', '✨', '👑', '⚽', '🎯', '👻', '🦆', '🎮', '🎲'];

function loadProducts() {
    const saved = getFromStorage('adminProducts');
    if (saved) {
        products = saved;
    } else {
        products = [
            { id: 1, title: 'Elden Ring', category: 'accion', platform: 'pc', price: 59.99, emoji: '⚔️', stock: 15, image: '' },
            { id: 2, title: 'Baldur\'s Gate 3', category: 'rpg', platform: 'pc', price: 59.99, emoji: '🐉', stock: 12, image: '' },
            { id: 3, title: 'The Legend of Zelda', category: 'aventura', platform: 'switch', price: 69.99, emoji: '🗡️', stock: 8, image: '' },
            { id: 4, title: 'Starfield', category: 'accion', platform: 'xbox', price: 69.99, emoji: '🚀', stock: 20, image: '' },
            { id: 5, title: 'Final Fantasy XVI', category: 'rpg', platform: 'ps5', price: 69.99, emoji: '✨', stock: 10, image: '' }
        ];
        saveProducts();
    }
    renderProducts();
}

function saveProducts() {
    saveToStorage('adminProducts', products);
    renderProducts();
}

function renderProducts() {
    if (products.length === 0) {
        productsTable.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    <div class="empty-state">
                        <div class="empty-state-icon">📦</div>
                        <h4>Sin productos</h4>
                        <p>Agrega tu primer producto</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    productsTable.innerHTML = products.map(product => `
        <tr>
            <td>${product.emoji}</td>
            <td>${product.title}</td>
            <td><span class="badge">${product.category.toUpperCase()}</span></td>
            <td><span class="badge platform">${product.platform.toUpperCase()}</span></td>
            <td>$${product.price.toFixed(2)}</td>
            <td><span class="stock-badge">${product.stock}</span></td>
            <td>
                <button class="btn-edit" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function openAddModal() {
    editingId = null;
    modalTitle.textContent = 'Agregar Producto';
    productForm.reset();
    productForm.classList.remove('was-validated');
    document.getElementById('productId').value = '';
    modal.style.display = 'flex';
}

function openEditModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingId = id;
    modalTitle.textContent = 'Editar Producto';
    productForm.classList.remove('was-validated');

    document.getElementById('productId').value = product.id;
    document.getElementById('title').value = product.title;
    document.getElementById('category').value = product.category;
    document.getElementById('platform').value = product.platform;
    document.getElementById('price').value = product.price;
    document.getElementById('emoji').value = product.emoji;
    document.getElementById('stock').value = product.stock;
    document.getElementById('productImage').value = product.image || '';

    modal.style.display = 'flex';
}

function closeModalWindow() {
    modal.style.display = 'none';
    editingId = null;
}

function saveProduct() {
    if (!productForm.checkValidity()) {
        productForm.classList.add('was-validated');
        return;
    }

    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const platform = document.getElementById('platform').value;
    const price = parseFloat(document.getElementById('price').value);
    const emoji = document.getElementById('emoji').value;
    const stock = parseInt(document.getElementById('stock').value);
    const image = document.getElementById('productImage').value.trim();

    if (!title || price <= 0 || stock < 0) {
        showAlert('Completa todos los campos correctamente', 'danger');
        return;
    }

    if (editingId) {
        const productIndex = products.findIndex(p => p.id === editingId);
        if (productIndex !== -1) {
            products[productIndex] = {
                id: editingId,
                title,
                category,
                platform,
                price,
                emoji,
                stock,
                image
            };
        }
    } else {
        const newProduct = {
            id: Math.max(...products.map(p => p.id), 0) + 1,
            title,
            category,
            platform,
            price,
            emoji: emoji || emojis[Math.floor(Math.random() * emojis.length)],
            stock,
            image
        };
        products.push(newProduct);
    }

    saveProducts();
    closeModalWindow();
    showAlert('✓ Producto guardado', 'success');
}

function editProduct(id) {
    openEditModal(id);
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        showAlert('✓ Producto eliminado', 'success');
    }
}

window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

addProductBtn.addEventListener('click', openAddModal);
closeModal.addEventListener('click', closeModalWindow);
saveProductBtn.addEventListener('click', saveProduct);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalWindow();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    console.log('GamerZone Admin - OK');
});
