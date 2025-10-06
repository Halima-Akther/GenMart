// products.js - Product management functionality for GenMart

// Product data structure
const products = [
    {
        id: 1,
        name: "Premium Smartphone",
        category: "electronics",
        price: 599.99,
        originalPrice: 699.99,
        rating: 4.5,
        reviewCount: 124,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "Latest smartphone with advanced features and high-resolution camera.",
        features: ["6.7-inch Display", "128GB Storage", "Triple Camera", "5G Ready"],
        inStock: true,
        tags: ["sale", "featured", "new"]
    },
    {
        id: 2,
        name: "Sports Running Shoes",
        category: "sports",
        price: 89.99,
        originalPrice: 109.99,
        rating: 4.0,
        reviewCount: 89,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "Comfortable running shoes with excellent cushioning and support.",
        features: ["Lightweight", "Breathable", "Shock Absorption", "Durable"],
        inStock: true,
        tags: ["bestseller"]
    },
    {
        id: 3,
        name: "Wireless Headphones",
        category: "electronics",
        price: 129.99,
        originalPrice: 159.99,
        rating: 5.0,
        reviewCount: 203,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "High-quality wireless headphones with noise cancellation.",
        features: ["Noise Cancelling", "30hr Battery", "Fast Charge", "Bluetooth 5.0"],
        inStock: true,
        tags: ["new", "featured"]
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "electronics",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.5,
        reviewCount: 156,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1099&q=80",
        description: "Feature-rich smartwatch with health monitoring and notifications.",
        features: ["Heart Rate Monitor", "GPS", "Water Resistant", "Sleep Tracking"],
        inStock: true,
        tags: ["sale", "featured"]
    },
    {
        id: 5,
        name: "Laptop Backpack",
        category: "fashion",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.2,
        reviewCount: 67,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        description: "Durable laptop backpack with multiple compartments.",
        features: ["Laptop Sleeve", "Water Resistant", "Multiple Pockets", "Comfortable Straps"],
        inStock: true,
        tags: ["sale"]
    },
    {
        id: 6,
        name: "Coffee Maker",
        category: "home",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.3,
        reviewCount: 142,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "Automatic coffee maker with programmable features.",
        features: ["Programmable", "12-cup Capacity", "Auto Shut-off", "Brew Pause"],
        inStock: true,
        tags: ["bestseller"]
    },
    {
        id: 7,
        name: "Yoga Mat",
        category: "sports",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.7,
        reviewCount: 98,
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        description: "Non-slip yoga mat with excellent cushioning.",
        features: ["Non-slip Surface", "Eco-friendly", "6mm Thickness", "Carry Strap"],
        inStock: true,
        tags: ["new"]
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.1,
        reviewCount: 87,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1331&q=80",
        description: "Portable Bluetooth speaker with rich sound quality.",
        features: ["12hr Battery", "Water Resistant", "Bluetooth 5.0", "Built-in Mic"],
        inStock: false,
        tags: ["sale"]
    }
];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('genmart-cart')) || [];

// DOM Elements
let productsGrid = document.getElementById('products-grid');
let categoryFilter = document.getElementById('category-filter');
let priceFilter = document.getElementById('price-filter');
let sortSelect = document.getElementById('sort-select');
let searchInput = document.getElementById('search-input');
let cartCount = document.getElementById('cart-count');
let cartItems = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');
let cartSubtotal = document.getElementById('cart-subtotal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    initializeCart();
    setupEventListeners();
});

// Initialize products display
function initializeProducts() {
    if (productsGrid) {
        displayProducts(products);
    }
}

// Display products in grid
function displayProducts(productsToDisplay) {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600">No products found</h3>
                <p class="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
    card.innerHTML = `
        <div class="relative">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            ${product.tags.includes('sale') ? '<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">Sale</span>' : ''}
            ${product.tags.includes('new') ? '<span class="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">New</span>' : ''}
            ${!product.inStock ? '<span class="absolute top-2 left-2 bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded">Out of Stock</span>' : ''}
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-lg mb-1">${product.name}</h3>
            <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                    ${generateStarRating(product.rating)}
                </div>
                <span class="text-gray-600 text-sm ml-2">(${product.rating})</span>
            </div>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-lg font-bold text-gray-900">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="text-sm text-gray-500 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}" 
                        data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;
    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Filter products
function filterProducts() {
    let filteredProducts = [...products];

    // Category filter
    if (categoryFilter && categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === categoryFilter.value
        );
    }

    // Price filter
    if (priceFilter && priceFilter.value !== 'all') {
        switch (priceFilter.value) {
            case 'under25':
                filteredProducts = filteredProducts.filter(product => product.price < 25);
                break;
            case '25to50':
                filteredProducts = filteredProducts.filter(product => product.price >= 25 && product.price <= 50);
                break;
            case '50to100':
                filteredProducts = filteredProducts.filter(product => product.price >= 50 && product.price <= 100);
                break;
            case 'over100':
                filteredProducts = filteredProducts.filter(product => product.price > 100);
                break;
        }
    }

    // Search filter
    if (searchInput && searchInput.value.trim() !== '') {
        const searchTerm = searchInput.value.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Sort products
    if (sortSelect) {
        switch (sortSelect.value) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }

    displayProducts(filteredProducts);
}

// Cart functionality
function initializeCart() {
    updateCartCount();
    if (cartItems) {
        displayCartItems();
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }

    if (!product.inStock) {
        showNotification('Product is out of stock!', 'error');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    
    if (cartItems) {
        displayCartItems();
    }
    
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    
    if (cartItems) {
        displayCartItems();
    }
    
    showNotification('Item removed from cart!', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        saveCart();
        updateCartCount();
        
        if (cartItems) {
            displayCartItems();
        }
    }
}

function displayCartItems() {
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600">Your cart is empty</h3>
                <p class="text-gray-500 mt-2">Add some products to get started!</p>
                <a href="products.html" class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Continue Shopping
                </a>
            </div>
        `;
        cartSubtotal.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }

    let subtotal = 0;
    
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item flex items-center border-b border-gray-200 py-4">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-grow ml-4">
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600 text-sm">$${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="quantity-btn bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus text-sm"></i>
                    </button>
                    <span class="quantity w-8 text-center font-semibold">${item.quantity}</span>
                    <button class="quantity-btn bg-gray-200 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus text-sm"></i>
                    </button>
                </div>
                <div class="ml-6 text-right">
                    <p class="font-semibold">$${itemTotal.toFixed(2)}</p>
                    <button class="remove-btn text-red-500 hover:text-red-700 text-sm mt-1" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');

    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart count in all pages
        const allCartCounts = document.querySelectorAll('.cart-count');
        allCartCounts.forEach(element => {
            element.textContent = totalItems;
        });
    }
}

function saveCart() {
    localStorage.setItem('genmart-cart', JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    
    if (cartItems) {
        displayCartItems();
    }
    
    showNotification('Cart cleared!', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `custom-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('translate-x-0');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Event listeners
function setupEventListeners() {
    // Product filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', filterProducts);
    }
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterProducts, 300));
    }

    // Add to cart buttons (delegated)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const productId = parseInt(e.target.closest('.add-to-cart').dataset.productId);
            addToCart(productId);
        }
    });

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            showNotification('Proceeding to checkout...', 'info');
            // In a real application, this would redirect to checkout page
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.filterProducts = filterProducts;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProducts);
} else {
    initializeProducts();
}