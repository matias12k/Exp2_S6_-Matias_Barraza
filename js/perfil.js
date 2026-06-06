/**
 * GAMERZONE - Script del Perfil
 * Archivo: js/perfil.js
 */

const profileTabs = document.querySelectorAll('[data-tab]');
const tabContents = document.querySelectorAll('.tab-content');
const editProfileBtn = document.getElementById('editProfileBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const profileForm = document.getElementById('profileForm');
const passwordForm = document.getElementById('passwordForm');
const changePasswordBtn = document.getElementById('changePasswordBtn');
let userData = null;

function loadUserData() {
    const saved = getFromStorage('newUser');
    if (saved) {
        userData = saved;
        renderProfile();
    }
}

function renderProfile() {
    if (!userData) return;

    document.getElementById('displayName').textContent = userData.fullName || 'Sin nombre';
    document.getElementById('displayEmail').textContent = userData.email || 'No registrado';
    document.getElementById('displayUsername').textContent = userData.username || 'usuario';

    document.getElementById('fullNameInput').value = userData.fullName || '';
    document.getElementById('emailInput').value = userData.email || '';
    document.getElementById('usernameInput').value = userData.username || '';
}

function setupTabs() {
    profileTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            profileTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            const tabName = tab.dataset.tab;
            document.getElementById(tabName).classList.add('active');
        });
    });
}

function editProfile() {
    document.getElementById('profileDisplay').style.display = 'none';
    document.getElementById('profileEdit').style.display = 'block';
    editProfileBtn.style.display = 'none';
}

function cancelEdit() {
    document.getElementById('profileDisplay').style.display = 'block';
    document.getElementById('profileEdit').style.display = 'none';
    editProfileBtn.style.display = 'inline-block';
    renderProfile();
}

function saveProfile() {
    if (!profileForm.checkValidity()) {
        profileForm.classList.add('was-validated');
        return;
    }

    const fullName = document.getElementById('fullNameInput').value;
    const email = document.getElementById('emailInput').value;
    const username = document.getElementById('usernameInput').value;

    if (!isValidEmail(email)) {
        showAlert('Email no válido', 'danger');
        return;
    }

    userData = {
        ...userData,
        fullName,
        email,
        username,
        updatedAt: new Date().toISOString()
    };

    saveToStorage('newUser', userData);
    showAlert('✓ Perfil actualizado', 'success');

    cancelEdit();
}

function changePassword() {
    if (!passwordForm.checkValidity()) {
        passwordForm.classList.add('was-validated');
        return;
    }

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    if (!isPasswordValid(newPassword)) {
        showAlert('Nueva contraseña no cumple requisitos', 'danger');
        return;
    }

    if (newPassword !== confirmPassword) {
        showAlert('Las contraseñas no coinciden', 'danger');
        return;
    }

    setButtonLoadingState(changePasswordBtn, true, 'Cambiando...', 'Cambiar contraseña');

    setTimeout(() => {
        saveToStorage('userPassword', newPassword);
        showAlert('✓ Contraseña cambiada exitosamente', 'success');
        passwordForm.reset();
        setButtonLoadingState(changePasswordBtn, false, 'Cambiando...', 'Cambiar contraseña');
    }, 1500);
}

function renderOrderHistory() {
    const orders = getFromStorage('orderHistory') || [];
    const historyContainer = document.getElementById('orderHistoryContent');

    if (orders.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <h4>Sin pedidos</h4>
                <p>Aún no has realizado compras</p>
            </div>
        `;
        return;
    }

    historyContainer.innerHTML = orders.reverse().map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">#${order.id}</span>
                <span class="order-date">${new Date(order.timestamp).toLocaleDateString('es-ES')}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 30px; height: 30px; border-radius: 3px; object-fit: cover; vertical-align: middle; margin-right: 0.5rem;">` : item.emoji} ${item.title}</span>
                        <span>x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">Total: <strong>$${order.total.toFixed(2)}</strong></div>
        </div>
    `).join('');
}

window.editProfile = editProfile;
window.cancelEdit = cancelEdit;
window.saveProfile = saveProfile;
window.changePassword = changePassword;

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    setupTabs();
    renderOrderHistory();
    editProfileBtn.addEventListener('click', editProfile);
    saveProfileBtn.addEventListener('click', saveProfile);
    cancelEditBtn.addEventListener('click', cancelEdit);
    changePasswordBtn.addEventListener('click', changePassword);
    console.log('GamerZone Perfil - OK');
});
