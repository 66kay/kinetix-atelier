/**
 * KINETIX ATELIER // CLIENT APPLICATION ENGINE
 * Arquitectura limpia, gestión de cesta de compra, filtros instantáneos y modales de producto.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO DE LA APLICACIÓN ---
    const STATE = {
        bag: JSON.parse(localStorage.getItem('kinetix_bag') || '[]'),
        wishlist: new Set(JSON.parse(localStorage.getItem('kinetix_wishlist') || '[]')),
        activeCategory: 'all',
        searchQuery: '',
        sortBy: 'default',
        activeDiscount: 0,
        appliedPromoCode: null,
        heroCurrentIndex: 0
    };

    // --- ELEMENTOS DEL DOM ---
    const productsGrid = document.getElementById('productsContainer');
    const bagDrawer = document.getElementById('bagDrawer');
    const bagBackdrop = document.getElementById('bagBackdrop');
    const bagCountBadge = document.getElementById('bagCountBadge');
    const wishlistCountBadge = document.getElementById('wishlistCountBadge');
    const bagItemsList = document.getElementById('bagItemsList');
    const bagSubtotalEl = document.getElementById('bagSubtotal');
    const bagDiscountEl = document.getElementById('bagDiscount');
    const bagTotalEl = document.getElementById('bagTotal');
    const shipProgressFill = document.getElementById('shipProgressFill');
    const shipStatusMsg = document.getElementById('shipStatusMsg');
    const quickViewModal = document.getElementById('quickViewModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const toastContainer = document.getElementById('toastContainer');

    // Formateador de moneda en pesos chilenos (CLP)
    function formatCLP(val) {
        return '$' + Math.round(val).toLocaleString('es-CL');
    }

    // ==========================================================================
    // 1. SISTEMA DE NOTIFICACIONES TOAST (DISCRETO Y ELEGANTE)
    // ==========================================================================
    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast-pill';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(8px)';
            toast.style.transition = 'all 0.25s ease';
            setTimeout(() => toast.remove(), 250);
        }, 3000);
    }

    // ==========================================================================
    // 2. HERO SHOWCASE SWITCHER (MODELOS REALES EN CLP)
    // ==========================================================================
    const heroModels = [
        {
            name: "Apex Carbon Veloce",
            tag: "Zapatilla de competición en asfalto",
            price: "$179.990",
            img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=85",
            colorDot: "#dc2626"
        },
        {
            name: "Monolith Technical Low",
            tag: "Silueta técnica urbana impermeable",
            price: "$189.990",
            img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=85",
            colorDot: "#1e293b"
        },
        {
            name: "Strata Court High",
            tag: "Bota clásica en piel de flor natural",
            price: "$199.990",
            img: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=900&auto=format&fit=crop&q=85",
            colorDot: "#f8fafc"
        }
    ];

    const heroShoeImg = document.getElementById('heroShoeImg');
    const heroModelName = document.getElementById('heroModelName');
    const heroModelPrice = document.getElementById('heroModelPrice');
    const heroDots = document.querySelectorAll('.model-dot');

    function switchHeroModel(index) {
        STATE.heroCurrentIndex = index;
        const model = heroModels[index];

        if (heroDots) {
            heroDots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        if (heroShoeImg) {
            heroShoeImg.style.opacity = '0';
            heroShoeImg.style.transform = 'scale(0.96)';

            setTimeout(() => {
                heroShoeImg.src = model.img;
                heroShoeImg.alt = model.name;
                heroShoeImg.style.opacity = '1';
                heroShoeImg.style.transform = 'scale(1)';
            }, 180);
        }

        if (heroModelName) heroModelName.textContent = model.name;
        if (heroModelPrice) heroModelPrice.textContent = `${model.tag} • ${model.price}`;
    }

    if (heroDots) {
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => switchHeroModel(index));
        });
    }

    // ==========================================================================
    // 3. RENDERIZADO DEL CATÁLOGO DE PRODUCTOS (CON DUAL HOVER)
    // ==========================================================================
    function renderProducts() {
        if (!productsGrid) return;

        // Filtrado por categoría
        let list = PRODUCTS.filter(item => {
            if (STATE.activeCategory !== 'all' && item.category !== STATE.activeCategory) {
                return false;
            }
            if (STATE.searchQuery.trim() !== '') {
                const q = STATE.searchQuery.toLowerCase();
                return item.name.toLowerCase().includes(q) ||
                       item.subtitle.toLowerCase().includes(q) ||
                       item.colorName.toLowerCase().includes(q) ||
                       item.categoryName.toLowerCase().includes(q);
            }
            return true;
        });

        // Ordenamiento
        if (STATE.sortBy === 'price-low') {
            list.sort((a, b) => a.price - b.price);
        } else if (STATE.sortBy === 'price-high') {
            list.sort((a, b) => b.price - a.price);
        } else if (STATE.sortBy === 'rating') {
            list.sort((a, b) => b.rating - a.rating);
        }

        if (list.length === 0) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                    <p style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--text-primary);">No se encontraron modelos para "${STATE.searchQuery}"</p>
                    <p style="font-size: 0.88rem;">Intenta con otro término o selecciona otra categoría.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = list.map(item => {
            const isFav = STATE.wishlist.has(item.id);
            return `
                <article class="product-card" data-id="${item.id}">
                    <div class="card-media" data-action="quickview" data-id="${item.id}">
                        <div class="card-top-badges">
                            <span class="badge-tag ${item.badgeType}">${item.badge}</span>
                            <button class="wishlist-toggle ${isFav ? 'active' : ''}" data-id="${item.id}" aria-label="Favorito">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                        </div>

                        <img src="${item.images[0]}" alt="${item.name}" class="card-img-primary" loading="lazy">
                        <img src="${item.images[1] || item.images[0]}" alt="${item.name} perspectiva" class="card-img-secondary" loading="lazy">

                        <button class="quickview-btn" data-action="quickview" data-id="${item.id}">Vista Rápida</button>
                    </div>

                    <div class="card-body">
                        <span class="card-meta">${item.categoryName}</span>
                        <h3 class="card-name" data-action="quickview" data-id="${item.id}">${item.name}</h3>
                        
                        <div class="card-color-indicator">
                            <span class="color-dot-indicator" style="background-color: ${item.colorHex};"></span>
                            ${item.colorName}
                        </div>

                        <div class="card-bottom-row">
                            <div class="card-price-box">
                                <span class="price-now">${formatCLP(item.price)}</span>
                                ${item.originalPrice ? `<span class="price-was">${formatCLP(item.originalPrice)}</span>` : ''}
                            </div>
                            <button class="add-bag-btn" data-id="${item.id}" title="Añadir a la bolsa" aria-label="Añadir a la bolsa">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        attachProductEvents();
    }

    function attachProductEvents() {
        // Clics en Wishlist
        document.querySelectorAll('.wishlist-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                toggleWishlist(id, btn);
            });
        });

        // Clics en Añadir rápido a la bolsa
        document.querySelectorAll('.add-bag-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const product = PRODUCTS.find(p => p.id === id);
                if (product) {
                    addToBag(product, 42);
                }
            });
        });

        // Clics en Vista Rápida
        document.querySelectorAll('[data-action="quickview"]').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                const product = PRODUCTS.find(p => p.id === id);
                if (product) {
                    openQuickView(product);
                }
            });
        });
    }

    // ==========================================================================
    // 4. FILTRADO, BÚSQUEDA Y ORDENACIÓN
    // ==========================================================================
    const categoryBtns = document.querySelectorAll('.cat-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.activeCategory = btn.dataset.category;
            renderProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            STATE.searchQuery = e.target.value;
            renderProducts();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            STATE.sortBy = e.target.value;
            renderProducts();
        });
    }

    // ==========================================================================
    // 5. LISTA DE DESEOS (WISHLIST)
    // ==========================================================================
    function toggleWishlist(id, btn) {
        if (STATE.wishlist.has(id)) {
            STATE.wishlist.delete(id);
            btn.classList.remove('active');
            showToast("Eliminado de favoritos");
        } else {
            STATE.wishlist.add(id);
            btn.classList.add('active');
            showToast("Añadido a tu lista de favoritos");
        }
        localStorage.setItem('kinetix_wishlist', JSON.stringify(Array.from(STATE.wishlist)));
        updateWishlistBadge();
    }

    function updateWishlistBadge() {
        if (wishlistCountBadge) {
            wishlistCountBadge.textContent = STATE.wishlist.size;
        }
    }
    updateWishlistBadge();

    const wishlistHeaderBtn = document.getElementById('wishlistHeaderBtn');
    if (wishlistHeaderBtn) {
        wishlistHeaderBtn.addEventListener('click', () => {
            if (STATE.wishlist.size === 0) {
                showToast("Aún no tienes favoritos. Haz clic en el corazón de cualquier modelo.");
            } else {
                showToast(`Tienes ${STATE.wishlist.size} modelo(s) en tu lista de favoritos.`);
            }
            const catalog = document.getElementById('catalog');
            if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 6. CESTA DE COMPRA (SHOPPING BAG)
    // ==========================================================================
    function addToBag(product, size = 42) {
        const existing = STATE.bag.find(item => item.id === product.id && item.size === size);

        if (existing) {
            existing.qty += 1;
        } else {
            STATE.bag.push({
                id: product.id,
                name: product.name,
                price: product.price,
                size: size,
                color: product.colorName,
                img: product.images[0],
                qty: 1
            });
        }

        saveBag();
        updateBagUI();
        openBagDrawer();
        showToast(`"${product.name}" añadido a la bolsa`);
    }

    function saveBag() {
        localStorage.setItem('kinetix_bag', JSON.stringify(STATE.bag));
    }

    function updateBagUI() {
        const totalItems = STATE.bag.reduce((sum, item) => sum + item.qty, 0);
        if (bagCountBadge) {
            bagCountBadge.textContent = totalItems;
        }

        if (!bagItemsList) return;

        if (STATE.bag.length === 0) {
            bagItemsList.innerHTML = `
                <div class="bag-empty-state">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <h4>Tu bolsa está vacía</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">Explora nuestra colección y añade tu silueta preferida.</p>
                </div>
            `;
            if (bagSubtotalEl) bagSubtotalEl.textContent = "$0";
            if (bagDiscountEl) bagDiscountEl.textContent = "-$0";
            if (bagTotalEl) bagTotalEl.textContent = "$0";
            if (shipProgressFill) shipProgressFill.style.width = '0%';
            if (shipStatusMsg) shipStatusMsg.innerHTML = "Envío gratis a todo Chile a partir de <b>$90.000</b>";
            return;
        }

        bagItemsList.innerHTML = STATE.bag.map((item, index) => `
            <div class="bag-item-card">
                <img src="${item.img}" alt="${item.name}" class="bag-item-img">
                <div class="bag-item-info">
                    <div class="bag-item-name">${item.name}</div>
                    <div class="bag-item-meta">Talla: EU ${item.size} • ${item.color}</div>
                    <div class="bag-item-price">${formatCLP(item.price * item.qty)}</div>
                    <div class="bag-item-actions">
                        <button class="qty-control-btn" onclick="window.modifyBagQty(${index}, -1)">−</button>
                        <span style="font-size: 0.85rem; min-width: 18px; text-align: center;">${item.qty}</span>
                        <button class="qty-control-btn" onclick="window.modifyBagQty(${index}, 1)">+</button>
                        <button style="background: none; border: none; color: var(--text-muted); font-size: 0.75rem; margin-left: auto; cursor: pointer; text-decoration: underline;" onclick="window.removeBagItem(${index})">Eliminar</button>
                    </div>
                </div>
            </div>
        `).join('');

        const subtotal = STATE.bag.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const discountAmount = subtotal * STATE.activeDiscount;
        const total = Math.max(0, subtotal - discountAmount);

        if (bagSubtotalEl) bagSubtotalEl.textContent = formatCLP(subtotal);
        if (bagDiscountEl) bagDiscountEl.textContent = `-${formatCLP(discountAmount)}`;
        if (bagTotalEl) bagTotalEl.textContent = formatCLP(total);

        // Barra de Envío Gratuito ($90.000 CLP a todo Chile)
        const freeShipThreshold = 90000;
        const percentage = Math.min(100, (subtotal / freeShipThreshold) * 100);
        if (shipProgressFill) shipProgressFill.style.width = `${percentage}%`;

        if (shipStatusMsg) {
            if (subtotal >= freeShipThreshold) {
                shipStatusMsg.innerHTML = "✓ <b>¡Enhorabuena! Calificas para Envío Express Gratis a todo Chile</b>";
            } else {
                const diff = freeShipThreshold - subtotal;
                shipStatusMsg.innerHTML = `Añade <b>${formatCLP(diff)}</b> más para obtener <b>Envío Express Gratis</b>`;
            }
        }
    }

    window.modifyBagQty = function(index, delta) {
        STATE.bag[index].qty += delta;
        if (STATE.bag[index].qty <= 0) {
            STATE.bag.splice(index, 1);
        }
        saveBag();
        updateBagUI();
    };

    window.removeBagItem = function(index) {
        STATE.bag.splice(index, 1);
        saveBag();
        updateBagUI();
        showToast("Producto retirado de la bolsa");
    };

    function openBagDrawer() {
        if (bagDrawer && bagBackdrop) {
            bagDrawer.classList.add('active');
            bagBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeBagDrawer() {
        if (bagDrawer && bagBackdrop) {
            bagDrawer.classList.remove('active');
            bagBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    const openBagBtn = document.getElementById('openBagBtn');
    const closeBagBtn = document.getElementById('closeBagBtn');
    if (openBagBtn) openBagBtn.addEventListener('click', openBagDrawer);
    if (closeBagBtn) closeBagBtn.addEventListener('click', closeBagDrawer);
    if (bagBackdrop) bagBackdrop.addEventListener('click', closeBagDrawer);

    // Cupones de descuento
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponInput = document.getElementById('couponInput');
    if (applyCouponBtn && couponInput) {
        applyCouponBtn.addEventListener('click', () => {
            const code = couponInput.value.trim().toUpperCase();
            if (PROMO_CODES[code]) {
                STATE.activeDiscount = PROMO_CODES[code].discount;
                STATE.appliedPromoCode = code;
                showToast(`Cupón aplicado: ${PROMO_CODES[code].label}`);
                updateBagUI();
            } else {
                showToast("Código no válido. Prueba con: BIENVENIDA10 o ATELIER15");
            }
        });
    }

    // ==========================================================================
    // 7. VISTA RÁPIDA (QUICK VIEW)
    // ==========================================================================
    let activeShoe = null;
    let selectedSize = 42;

    function openQuickView(product) {
        activeShoe = product;
        selectedSize = product.sizes[2] || 42;

        const mainPhoto = document.getElementById('modalMainPhoto');
        const titleEl = document.getElementById('modalShoeTitle');
        const subtitleEl = document.getElementById('modalShoeSubtitle');
        const priceEl = document.getElementById('modalShoePrice');
        const descEl = document.getElementById('modalShoeDesc');
        const thumbsBox = document.getElementById('modalThumbsBox');
        const sizesBox = document.getElementById('modalSizesBox');
        const specsBox = document.getElementById('modalSpecsBox');

        if (mainPhoto) mainPhoto.src = product.images[0];
        if (titleEl) titleEl.textContent = product.name;
        if (subtitleEl) subtitleEl.textContent = `${product.categoryName} • ${product.colorName}`;
        if (priceEl) priceEl.textContent = formatCLP(product.price);
        if (descEl) descEl.textContent = product.description;

        if (thumbsBox) {
            thumbsBox.innerHTML = product.images.map((img, i) => `
                <img src="${img}" alt="Vista ${i+1}" class="modal-thumb-img ${i === 0 ? 'active' : ''}" onclick="window.setModalPhoto(this, '${img}')">
            `).join('');
        }

        if (sizesBox) {
            sizesBox.innerHTML = product.sizes.map(size => `
                <button class="size-pill ${size === selectedSize ? 'active' : ''}" onclick="window.pickSize(this, ${size})">
                    EU ${size}
                </button>
            `).join('');
        }

        if (specsBox) {
            specsBox.innerHTML = product.specs.map(s => `
                <div style="display:flex; justify-content:space-between; padding:0.4rem 0; border-bottom:1px solid var(--border-subtle); font-size:0.85rem;">
                    <span style="color:var(--text-muted);">${s.label}</span>
                    <span style="color:var(--text-primary); font-weight:600;">${s.value}</span>
                </div>
            `).join('');
        }

        if (quickViewModal) {
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    window.setModalPhoto = function(el, src) {
        document.querySelectorAll('.modal-thumb-img').forEach(t => t.classList.remove('active'));
        el.classList.add('active');
        const main = document.getElementById('modalMainPhoto');
        if (main) main.src = src;
    };

    window.pickSize = function(el, size) {
        document.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
        selectedSize = size;
    };

    const modalAddBagBtn = document.getElementById('modalAddBagBtn');
    if (modalAddBagBtn) {
        modalAddBagBtn.addEventListener('click', () => {
            if (activeShoe) {
                addToBag(activeShoe, selectedSize);
                closeModals();
            }
        });
    }

    // ==========================================================================
    // 8. CHECKOUT Y CIERRE DE MODALES
    // ==========================================================================
    const checkoutStartBtn = document.getElementById('checkoutStartBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutSuccess = document.getElementById('checkoutSuccess');

    if (checkoutStartBtn) {
        checkoutStartBtn.addEventListener('click', () => {
            if (STATE.bag.length === 0) {
                showToast("Tu bolsa está vacía.");
                return;
            }
            closeBagDrawer();
            if (checkoutModal) {
                checkoutModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            checkoutForm.style.display = 'none';
            if (checkoutSuccess) {
                const orderNum = 'KTX-' + Math.floor(100000 + Math.random() * 900000);
                document.getElementById('checkoutOrderNum').textContent = orderNum;
                checkoutSuccess.style.display = 'block';
            }
            STATE.bag = [];
            saveBag();
            updateBagUI();
        });
    }

    function closeModals() {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.modal-close-trigger').forEach(b => b.addEventListener('click', closeModals));
    document.querySelectorAll('.modal-backdrop').forEach(m => {
        m.addEventListener('click', (e) => {
            if (e.target === m) closeModals();
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
            closeBagDrawer();
        }
    });

    // ==========================================================================
    // 9. FAQ ACCORDION REAL
    // ==========================================================================
    document.querySelectorAll('.faq-card').forEach(card => {
        const trigger = card.querySelector('.faq-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isOpen = card.classList.contains('open');
                document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));
                if (!isOpen) card.classList.add('open');
            });
        }
    });

    // ==========================================================================
    // 10. SCROLL HEADER
    // ==========================================================================
    const siteHeader = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });

    // Inicializar
    renderProducts();
    updateBagUI();
});
