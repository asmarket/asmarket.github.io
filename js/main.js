import { initPreloader } from './modules/preloader.js';

class AsMarketApp {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "iPhone 14 Pro Max",
                price: 899.99,
                category: "electronics",
                image: "images/products/iphone.jpg",
                description: "Perfecto estado, garantía completa",
                status: "Disponible"
            },
            {
                id: 2,
                name: "Rolex Datejust 41",
                price: 8999.99,
                category: "accessories",
                image: "images/products/rolex.jpg",
                description: "Set completo, autenticidad verificada",
                status: "Limitado"
            },
            {
                id: 3,
                name: "MacBook Pro M2",
                price: 1599.99,
                category: "electronics",
                image: "images/products/macbook.jpg",
                description: "Nuevo, precintado",
                status: "Disponible"
            }
            // Añade más productos según necesites
        ];

        this.init();
    }

    init() {
        // Iniciar preloader
        initPreloader();

        // Esperar a que el preloader termine
        document.addEventListener('preloaderComplete', () => {
            this.initializeApp();
        });
    }

    initializeApp() {
        this.initializeProducts();
        this.initializeEventListeners();
        this.startTimeUpdate();
        this.initializeAnimations();
    }

    initializeProducts() {
        const productsGrid = document.querySelector('.products-grid');
        
        this.products.forEach(product => {
            const productElement = this.createProductElement(product);
            productsGrid.appendChild(productElement);
        });
    }

    createProductElement(product) {
        const article = document.createElement('article');
        article.className = 'product-card fade-in';
        
        article.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">€${product.price.toLocaleString('es-ES')}</div>
                <div class="product-status">${product.status}</div>
            </div>
        `;
        
        return article;
    }

    initializeEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCategoryChange(e.target);
            });
        });

        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.handleSort(e.target.value);
            });
        }
    }

    handleCategoryChange(button) {
        const category = button.dataset.category;
        
        // Update active state
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter products
        this.filterProducts(category);
    }

    filterProducts(category) {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';

        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === category);

        filteredProducts.forEach(product => {
            const productElement = this.createProductElement(product);
            productsGrid.appendChild(productElement);
        });

        this.initializeAnimations();
    }

    handleSort(sortValue) {
        const sortedProducts = [...this.products];

        switch(sortValue) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
        }

        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';

        sortedProducts.forEach(product => {
            const productElement = this.createProductElement(product);
            productsGrid.appendChild(productElement);
        });

        this.initializeAnimations();
    }

    startTimeUpdate() {
        const updateTime = () => {
            const now = new Date();
            const utcString = now.toISOString().replace('T', ' ').slice(0, 19);
            document.getElementById('utcTime').textContent = utcString;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    initializeAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AsMarketApp();
});