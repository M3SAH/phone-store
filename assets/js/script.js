// =========================================================
//  PRODUCT DATA — Edit to customize your inventory
// =========================================================

const products = [
    { id: 1, name: "iPhone 13 (Refurbished)", category: "phones", brand: "Apple", price: 9500, image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80", specs: "128GB Storage, 88% Battery Health, FaceID Working", description: "US Grade A refurbished iPhone 13. Looks brand new. Comes with generic cable.", featured: true },
    { id: 2, name: "Samsung Galaxy A15", category: "phones", brand: "Samsung", price: 3800, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80", specs: "4GB RAM, 128GB Storage, 5000mAh Battery", description: "Brand new sealed in box. Great budget phone with amazing screen.", featured: true },
    { id: 3, name: "Tecno Spark 20", category: "phones", brand: "Tecno", price: 2950, image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80", specs: "8GB RAM, 256GB Storage, 32MP Selfie", description: "The latest Spark series. Dual stereo speakers and gaming processor.", featured: true },
    { id: 4, name: "Infinix Hot 40", category: "phones", brand: "Infinix", price: 3200, image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=800&q=80", specs: "8GB RAM, 256GB, 90Hz Display", description: "Fast charging and big screen for gaming.", featured: false },
    { id: 5, name: "Redmi Note 13", category: "phones", brand: "Xiaomi", price: 5500, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", specs: "108MP Camera, AMOLED Screen, 33W Charging", description: "Best mid-range camera phone available now.", featured: false },
    { id: 6, name: "AirPods Pro (Copy)", category: "accessories", brand: "Oraimo", price: 450, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80", specs: "Noise Cancellation, Pop-up Window, 4h Battery", description: "High quality super copy. Good bass.", featured: true },
    { id: 7, name: "20W Fast Charger (Type-C)", category: "accessories", brand: "Apple", price: 250, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80", specs: "20W Output, PD Fast Charge", description: "Original adapter for iPhones and Samsung.", featured: false },
    { id: 8, name: "Samsung S23 Ultra Case", category: "accessories", brand: "Samsung", price: 150, image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80", specs: "Silicone, Shockproof", description: "Protective case available in Black, Green, Cream.", featured: false },
    { id: 9, name: "10,000mAh Power Bank", category: "accessories", brand: "Oraimo", price: 350, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80", specs: "Dual USB, Slim Design", description: "Never run out of battery. Pocket size.", featured: false },
    { id: 10, name: "iPhone 11 (Used)", category: "phones", brand: "Apple", price: 5500, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80", specs: "64GB, 85% Battery, Black", description: "UK used, clean condition. No scratches.", featured: false },
    { id: 11, name: "Tempered Glass Protector", category: "accessories", brand: "Other", price: 50, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80", specs: "9H Hardness, Anti-scratch", description: "Available for all iPhone and Samsung models.", featured: false },
    { id: 12, name: "Tecno Pop 8", category: "phones", brand: "Tecno", price: 2100, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80", specs: "3GB RAM, 64GB Storage", description: "Best entry level smartphone for students.", featured: false },
];

// =========================================================
//  APP LOGIC
// =========================================================

const shopGrid = document.getElementById('shop-grid');
const featuredGrid = document.getElementById('featured-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const brandFilter = document.getElementById('brand-filter');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const noResults = document.getElementById('no-results');

const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalImg = document.getElementById('modal-img');
const modalBrand = document.getElementById('modal-brand');
const modalSpecs = document.getElementById('modal-specs');
const modalDesc = document.getElementById('modal-desc');
const modalWaBtn = document.getElementById('modal-whatsapp-btn');

const SHOP_WHATSAPP_NUMBER = "260970000000";

const formatPrice = (price) => new Intl.NumberFormat('en-ZM', {
    style: 'currency', currency: 'ZMW', minimumFractionDigits: 0
}).format(price);

const createCard = (product) => `
    <div class="product-card" onclick="openModal(${product.id})">
        <div class="card-img-wrapper">
            <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'">
        </div>
        <div class="card-body">
            <span class="card-brand">${product.brand}</span>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-price">${formatPrice(product.price)}</p>
        </div>
        <div class="view-btn">View Details →</div>
    </div>
`;

function renderApp() {
    const featuredItems = products.filter(p => p.featured).slice(0, 4);
    featuredGrid.innerHTML = featuredItems.length > 0
        ? featuredItems.map(createCard).join('')
        : '<p class="loading">No hot deals right now.</p>';
    filterProducts();
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const brand = brandFilter.value;
    const maxPrice = parseInt(priceRange.value);

    priceValue.textContent = formatPrice(maxPrice);

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) &&
        (category === 'all' || p.category === category) &&
        (brand === 'all' || p.brand === brand) &&
        p.price <= maxPrice
    );

    if (filtered.length === 0) {
        shopGrid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        shopGrid.innerHTML = filtered.map(createCard).join('');
    }
}

window.openModal = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    modalTitle.textContent = product.name;
    modalPrice.textContent = formatPrice(product.price);
    modalBrand.textContent = product.brand;
    modalImg.src = product.image;
    modalDesc.textContent = product.description;
    modalSpecs.innerHTML = `<strong>Specs:</strong> ${product.specs}`;
    const message = `Hi, I'm interested in the ${product.name} for ${formatPrice(product.price)}. Is it available?`;
    modalWaBtn.href = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
};

const closeModalFn = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
};
closeModal.onclick = closeModalFn;
window.onclick = (e) => { if (e.target === modal) closeModalFn(); };
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModalFn(); });

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
brandFilter.addEventListener('change', filterProducts);
priceRange.addEventListener('input', filterProducts);

document.getElementById('clear-filters').addEventListener('click', () => {
    searchInput.value = '';
    categoryFilter.value = 'all';
    brandFilter.value = 'all';
    priceRange.value = 25000;
    filterProducts();
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const msg = document.getElementById('contact-message').value;
    const waMsg = `Hi, my name is ${name} (${phone}). ${msg}`;
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
    e.target.reset();
});

document.getElementById('mobile-menu').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
    document.getElementById('mobile-menu').classList.toggle('active');
});

renderApp();
