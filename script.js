// ===== MAMA AL - JAVASCRIPT =====

// Menu Data
const menuData = [

    // ===== MAKANAN =====
    {
        id: 1,
        name: 'Seblak',
        desc: 'Seblak pedas khas dengan kerupuk dan telur',
        price: 15000,
        emoji: "🤣",
        category: 'makanan', 
        image: 'assets/seblak.jpg',
        bestseller: true
    },
    {
        id: 2,
        name: 'Takoyaki',
        desc: 'Bola takoyaki lembut dengan saus spesial',
        price: 10000,
        category: 'makanan',
        image: 'assets/takoyaki.jpg',
        bestseller: true
    },
    {
        id: 3,
        name: 'Mie Nyemek',
        desc: 'Mie kuah kental dengan telur',
        price: 15000,
        category: 'makanan',
        image: 'assets/mie nyemek.jpeg',
        bestseller: false
    },
    {
        id: 4,
        name: 'Mie Ayam',
        desc: 'Mie ayam klasik dengan topping ayam',
        price: 10000,
        category: 'makanan',
        image: 'assets/mie ayam.jpg',
        bestseller: false
    },
    {
        id: 5,
        name: 'Cilok Gaul',
        desc: 'Cilok kenyal dengan saus kacang pedas',
        price: 10000,
        category: 'makanan',
        image: 'assets/cilok gaul.jpg',
        bestseller: false
    },
    {
        id: 6,
        name: 'Papeda',
        desc: 'Sagu lembut dengan kuah kuning',
        price: 15000,
        category: 'makanan',
        image: 'assets/papeda.jpg',
        bestseller: false
    },
    {
        id: 7,
        name: 'Mie Sakura',
        desc: 'Mie instan dengan rasa unik dan topping spesial',
        price: 15000,
        category: 'makanan',
        image: 'assets/mie ssakura.jpg',
        bestseller: false
    },
    {
        id: 8,
        name: 'Mie Goreng Telur',
        desc: 'Mie goreng dengan telur ceplok',
        price: 12000,
        category: 'makanan',
        image: 'assets/mie goreng.jpg',
        bestseller: true
    },
    {
        id: 9,
        name: 'Mie Rebus',
        desc: 'Mie rebus hangat dengan kuah gurih',
        price: 10000,
        category: 'makanan',
        image: 'assets/mie rebus.jpg',
        bestseller: false
    },

    // ===== MINUMAN =====
    {
        id: 10,
        name: 'Es Teh / Tejus / Jasjus',
        desc: 'Minuman segar pilihan',
        price: 2000,
        category: 'minuman',
        image: 'assets/es teh/tejus/jasjus.jpg',
        bestseller: false
    },
    {
        id: 11,
        name: 'Pop Ice',
        desc: 'Minuman es berbagai rasa favorit',
        price: 5000,
        category: 'minuman',
        image: 'assets/pop ice.jpg',
        bestseller: true
    },
    {
        id: 12,
        name: 'Kopi Panas',
        desc: 'Kopi hitam hangat',
        price: 5000,
        category: 'minuman',
        image: 'assets/kopi panas.jpg',
        bestseller: false
    },
    {
        id: 13,
        name: 'Kopi Dingin',
        desc: 'Es kopi segar',
        price: 5000,
        category: 'minuman',
        image: 'assets/Kopi dingin.jpg',
        bestseller: false
    },
    {
        id: 14,
        name: 'Le Minerale',
        desc: 'Air mineral botol',
        price: 5000,
        category: 'minuman',
        image: 'assets/lemineral.jpg',
        bestseller: false
    }

];

// Cart State
let cart = JSON.parse(localStorage.getItem('mamaAlCart')) || [];    
let selectedPaymentMethod = '';

// WhatsApp Number
const waNumber = '6281316864708';

// Payment Accounts - GANTI DENGAN DATA ASLI
const paymentAccounts = {
    qris: {
        name: 'QRIS Mama AL',
        number: '0813-1686-4708',
        image: null // Bisa diisi path gambar QRIS: 'assets/qris.png'
    },
    dana: {
        name: 'Dana',
        number: '0813-1686-4708'
    },
    gopay: {
        name: 'GoPay',
        number: '0813-1686-4708'
    }
};

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuGrid = document.getElementById('menu-grid');
const categoryTabs = document.querySelectorAll('.category-tab');
const cartBtnNav = document.getElementById('cart-btn-nav');
const floatingCartBtn = document.getElementById('floating-cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const emptyCart = document.getElementById('empty-cart');
const cartFooter = document.getElementById('cart-footer');
const cartCountNav = document.getElementById('cart-count-nav');
const floatingCartCount = document.getElementById('floating-cart-count');
const cartTotalItems = document.getElementById('cart-total-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const checkoutBtn = document.getElementById('checkout-btn');
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toast-icon');
const toastMessage = document.getElementById('toast-message');

// Payment Modal Elements
const paymentOverlay = document.getElementById('payment-overlay');
const paymentModal = document.getElementById('payment-modal');
const closePaymentBtn = document.getElementById('close-payment');
const paymentTotal = document.getElementById('payment-total');
const paymentOptions = document.querySelectorAll('.payment-option');
const paymentDetailModal = document.getElementById('payment-detail-modal');
const closePaymentDetailBtn = document.getElementById('close-payment-detail');
const paymentDetailTitle = document.getElementById('payment-detail-title');
const paymentDetailAmount = document.getElementById('payment-detail-amount');
const paymentDetailContent = document.getElementById('payment-detail-content');
const confirmPaymentBtn = document.getElementById('confirm-payment-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
    }, 1500);

    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });

    renderMenu('all');
    updateCartUI();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    window.addEventListener('scroll', handleScroll);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenu(tab.dataset.category);
        });
    });

    cartBtnNav.addEventListener('click', openCart);
    const mobileCartBtn = document.getElementById('mobile-cart-btn');
    if (mobileCartBtn) mobileCartBtn.addEventListener('click', () => { mobileMenu.classList.add('hidden'); openCart(); });
    floatingCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', openPaymentModal);

    // Payment modal events
    closePaymentBtn.addEventListener('click', closePaymentModal);
    paymentOverlay.addEventListener('click', closePaymentModal);

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedPaymentMethod = option.dataset.method;
            showPaymentDetail(selectedPaymentMethod);
        });
    });

    closePaymentDetailBtn.addEventListener('click', closePaymentDetailModal);
    confirmPaymentBtn.addEventListener('click', handleConfirmPayment);

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

// Handle Scroll
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Render Menu
function renderMenu(category) {
    const filtered = category === 'all' ? menuData : menuData.filter(item => item.category === category);

    menuGrid.innerHTML = filtered.map((item, index) => `
        <div class="menu-card" data-aos="fade-up" data-aos-delay="${index * 50}">
            ${item.bestseller ? '<div class="badge-bestseller"><i class="fas fa-fire"></i> Best Seller</div>' : ''}
            <div class="menu-card-image">
            <img src="${item.image}" alt="image"></div>
            <div class="menu-card-body">
                <span class="menu-card-category">${item.category === 'makanan' ? '🍽️ Makanan' : '🥤 Minuman'}</span>
                <h3 class="menu-card-title">${item.name}</h3>
                <p class="menu-card-desc">${item.desc}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${item.id})"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
    `).join('');

    AOS.refresh();
}

// Add to Cart
function addToCart(id) {
    const item = menuData.find(m => m.id === id);
    const existingItem = cart.find(c => c.id === id);

    if (existingItem) { existingItem.qty++; }
    else { cart.push({ ...item, qty: 1 }); }

    saveCart();
    updateCartUI();
    showToast('✅', `${item.name} ditambahkan ke keranjang!`);

    floatingCartBtn.classList.add('cart-pulse');
    setTimeout(() => floatingCartBtn.classList.remove('cart-pulse'), 500);
}

// Update Cart Quantity
function updateQty(id, change) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) { cart = cart.filter(c => c.id !== id); }
    }
    saveCart();
    updateCartUI();
}

// Remove from Cart
function removeFromCart(id) {
    const item = cart.find(c => c.id === id);
    cart = cart.filter(c => c.id !== id);
    saveCart();
    updateCartUI();
    if (item) showToast('🗑️', `${item.name} dihapus dari keranjang`);
}

// Save Cart
function saveCart() {
    localStorage.setItem('mamaAlCart', JSON.stringify(cart));
}

// Update Cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    [cartCountNav, floatingCartCount].forEach(el => {
        if (totalItems > 0) { el.textContent = totalItems; el.classList.remove('hidden'); }
        else { el.classList.add('hidden'); }
    });

    cartTotalItems.textContent = `${totalItems} item`;
    cartSubtotal.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;

    if (cart.length === 0) {
        cartItems.classList.add('hidden');
        emptyCart.classList.remove('hidden');
        cartFooter.classList.add('hidden');
    } else {
        cartItems.classList.remove('hidden');
        emptyCart.classList.add('hidden');
        cartFooter.classList.remove('hidden');

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                <img src="${item.image}" alt="image"></div>
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                        <button class="qty-btn delete" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Open Cart
function openCart() {
    cartOverlay.classList.remove('hidden');
    setTimeout(() => cartOverlay.style.opacity = '1', 10);
    cartSidebar.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
}

// Close Cart
function closeCart() {
    cartOverlay.style.opacity = '0';
    cartSidebar.style.transform = 'translateX(100%)';
    setTimeout(() => cartOverlay.classList.add('hidden'), 300);
    document.body.style.overflow = '';
}

// Open Payment Modal
function openPaymentModal() {
    if (cart.length === 0) return;

    closeCart();

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    paymentTotal.textContent = `Total: Rp ${totalPrice.toLocaleString('id-ID')}`;

    paymentOverlay.classList.remove('hidden');
    paymentModal.classList.remove('hidden');

    setTimeout(() => {
        paymentOverlay.style.opacity = '1';
        paymentModal.classList.remove('scale-95', 'opacity-0');
        paymentModal.classList.add('scale-100', 'opacity-100');
    }, 10);

    document.body.style.overflow = 'hidden';
}

// Close Payment Modal
function closePaymentModal() {
    paymentOverlay.style.opacity = '0';
    paymentModal.classList.remove('scale-100', 'opacity-100');
    paymentModal.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        paymentOverlay.classList.add('hidden');
        paymentModal.classList.add('hidden');
    }, 300);

    document.body.style.overflow = '';
}

// Show Payment Detail
function showPaymentDetail(method) {
    closePaymentModal();

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    paymentDetailAmount.textContent = `Total: Rp ${totalPrice.toLocaleString('id-ID')}`;

    let content = '';
    let title = '';

    switch (method) {
        case 'qris':
            title = 'Pembayaran QRIS';
            content = `
                <div class="mb-6">
                    <div class="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                        ${paymentAccounts.qris.image
                    ? `<img src="${paymentAccounts.qris.image}" alt="QRIS" class="w-full h-full object-contain rounded-2xl">`
                    : `<div class="text-center"><i class="fas fa-qrcode text-6xl text-gray-400 mb-2"></i><p class="text-sm text-gray-500">QR Code QRIS</p></div>`
                }
                    </div>
                    <p class="text-gray-600 text-sm">Scan QR Code di atas menggunakan aplikasi e-wallet atau mobile banking Anda</p>
                </div>
                <div class="bg-tosca-50 rounded-2xl p-4">
                    <p class="text-sm text-gray-500 mb-1">Nama / Nomor Merchant</p>
                    <p class="font-semibold text-gray-900">${paymentAccounts.qris.name}</p>
                    <p class="font-bold text-lg text-tosca-600 mt-1">${paymentAccounts.qris.number}</p>
                    <button onclick="copyNumber('${paymentAccounts.qris.number}')" class="mt-2 text-sm text-tosca-600 hover:text-tosca-800"><i class="fas fa-copy mr-1"></i>Salin Nomor</button>
                </div>
            `;
            break;

        case 'dana':
            title = 'Transfer Dana';
            content = `
                <div class="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                    <span class="text-white font-bold text-2xl">Dana</span>
                </div>
                <div class="bg-blue-50 rounded-2xl p-4 mb-4">
                    <p class="text-sm text-gray-500 mb-1">Nomor Dana</p>
                    <p class="font-bold text-2xl text-blue-600" id="dana-number">${paymentAccounts.dana.number}</p>
                    <button onclick="copyNumber('${paymentAccounts.dana.number}')" class="mt-2 text-sm text-blue-500 hover:text-blue-700"><i class="fas fa-copy mr-1"></i>Salin Nomor</button>
                </div>
                <p class="text-gray-600 text-sm">Transfer ke nomor Dana di atas sesuai total pesanan</p>
            `;
            break;

        case 'gopay':
            title = 'Transfer GoPay';
            content = `
                <div class="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                    <span class="text-white font-bold text-xl">GoPay</span>
                </div>
                <div class="bg-green-50 rounded-2xl p-4 mb-4">
                    <p class="text-sm text-gray-500 mb-1">Nomor GoPay</p>
                    <p class="font-bold text-2xl text-green-600">${paymentAccounts.gopay.number}</p>
                    <button onclick="copyNumber('${paymentAccounts.gopay.number}')" class="mt-2 text-sm text-green-500 hover:text-green-700"><i class="fas fa-copy mr-1"></i>Salin Nomor</button>
                </div>
                <p class="text-gray-600 text-sm">Transfer ke nomor GoPay di atas sesuai total pesanan</p>
            `;
            break;


    }

    paymentDetailTitle.textContent = title;
    paymentDetailContent.innerHTML = content;

    paymentDetailModal.classList.remove('hidden');

    setTimeout(() => {
        paymentDetailModal.classList.remove('scale-95', 'opacity-0');
        paymentDetailModal.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// Close Payment Detail Modal
function closePaymentDetailModal() {
    paymentDetailModal.classList.remove('scale-100', 'opacity-100');
    paymentDetailModal.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        paymentDetailModal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Copy Number
function copyNumber(number) {
    navigator.clipboard.writeText(number).then(() => {
        showToast('📋', 'Nomor berhasil disalin!');
    });
}

// Handle Confirm Payment
function handleConfirmPayment() {
    if (cart.length === 0) return;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    let message = `🍜 *PESANAN BARU - MAMA AL*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    cart.forEach(item => {
        message += `• ${item.name} x${item.qty}\n`;
        message += `  Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: Rp ${totalPrice.toLocaleString('id-ID')}*\n\n`;

    // Payment method info
    const methodNames = { qris: 'QRIS', dana: 'Dana', gopay: 'GoPay' };
    message += `💳 *Metode Bayar:* ${methodNames[selectedPaymentMethod]}\n\n`;

    if (selectedPaymentMethod !== 'cash') {
        message += `📸 *[Lampirkan bukti transfer]*\n\n`;
    }

    message += `📍 Alamat/Nama: \n`;
    message += `📝 Catatan: \n\n`;
    message += `Terima kasih telah memesan di Mama AL! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');

    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    closePaymentDetailModal();
    showToast('🎉', 'Pesanan dikirim ke WhatsApp!');
}

// Show Toast
function showToast(icon, message) {
    toastIcon.textContent = icon;
    toastMessage.textContent = message;
    toast.classList.add('toast-show');
    setTimeout(() => { toast.classList.remove('toast-show'); }, 3000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const position = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    });
});