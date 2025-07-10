document.addEventListener("DOMContentLoaded", function () {
    // Tab switching
    document.getElementById("search-tab").addEventListener("click", function () {
        document.getElementById("search-screen").classList.add("show", "active");
        document.getElementById("brands-screen").classList.remove("show", "active");
    });

    document.getElementById("brands-tab").addEventListener("click", function () {
        document.getElementById("brands-screen").classList.add("show", "active");
        document.getElementById("search-screen").classList.remove("show", "active");
    });

    // Loading overlay
    const loadingOverlay = document.getElementById("loading-overlay");

    // Form submission
    document.getElementById("api-form").addEventListener("submit", function (e) {
        loadingOverlay.classList.add("active");

        // Simulate API request
        setTimeout(function () {
            loadingOverlay.classList.remove("active");
        }, 1500);
    });

    // Clear button
    document.getElementById("btn-clear").addEventListener("click", function () {
        document.querySelector('input[name="keyword"]').value = "";
        document.getElementById("result-info").innerHTML =
            '<i class="bi bi-info-circle me-2"></i>Lütfen arama yapın';
        document.getElementById("product-results").innerHTML = `
            <div class="col-12">
                <div class="no-results-container">
                    <i class="bi bi-search no-results-icon"></i>
                    <h4 class="mb-3">Arama yapın</h4>
                    <p class="text-muted">Üstteki arama kutusuna ürün adı yazarak arama yapabilirsiniz.</p>
                </div>
            </div>
        `;
    });

    // Favorite button functionality
    document.querySelectorAll(".favorite-btn").forEach((button) => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            if (this.classList.contains("active")) {
                this.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Favori';
            } else {
                this.innerHTML = '<i class="bi bi-heart me-1"></i>Favori';
            }
        });
    });

    // Brand selection
    document.querySelectorAll(".brand-btn").forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            document.querySelectorAll(".brand-btn").forEach((btn) => {
                btn.classList.remove("active");
            });

            // Add active class to clicked button
            this.classList.add("active");

            // Show loading
            loadingOverlay.classList.add("active");

            // Simulate loading brand products
            setTimeout(function () {
                loadingOverlay.classList.remove("active");

                // Generate brand products
                const brandProducts = document.getElementById("brand-products");
                brandProducts.innerHTML = "";

                for (let i = 0; i < 8; i++) {
                    brandProducts.innerHTML += `
                <div class="col">
                    <div class="card h-100">
                        <div class="card-img-container">
                            <img src="https://via.placeholder.com/300" class="card-img-top" alt="Ürün ${i + 1}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Marka Ürünü ${i + 1}</h5>
                            <p class="card-description">Bu markaya özel ürün açıklaması. Ürünün temel özellikleri ve kısa tanımı.</p>
                            <div class="price-container">
                            <span class="current-price">${Math.floor(Math.random() * 900) + 100} TL</span>
                        </div>
                        <div class="rating-container">
                            <div class="rating-stars">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-half"></i>
                                <i class="bi bi-star"></i>
                            </div>
                            <div class="rating-value">3.5</div>
                        </div>
                        <div class="action-buttons">
                            <a href="#" target="_blank" class="btn btn-primary btn-action">
                                <i class="bi bi-box-arrow-up-right me-1"></i>Ürüne Git
                            </a>
                            <button class="btn btn-favorite btn-action favorite-btn">
                                <i class="bi bi-heart me-1"></i>Favori
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
              `;
                }

                // Add event listeners to new favorite buttons
                document.querySelectorAll(".favorite-btn").forEach((btn) => {
                    btn.addEventListener("click", function () {
                        this.classList.toggle("active");
                        if (this.classList.contains("active")) {
                            this.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Favori';
                        } else {
                            this.innerHTML = '<i class="bi bi-heart me-1"></i>Favori';
                        }
                    });
                });
            }, 1000);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Prevent modal opening when clicking on carousel controls
    document.addEventListener('click', function (e) {
        if (e.target.closest('.carousel-control-prev') || e.target.closest('.carousel-control-next')) {
            e.stopPropagation();
        }
    });

    // Add click event to product cards
    const productCards = document.querySelectorAll('.product-card');
    const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));

    productCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Block action if carousel controls or action buttons are clicked
            if (e.target.closest('.carousel-control-prev') ||
                e.target.closest('.carousel-control-next') ||
                e.target.closest('.favorite-btn') ||
                e.target.closest('.btn-action') ||
                e.target.closest('.show-product-details')) { // "Daha fazla..." linkini de engelle
                return;
            }

            const productData = {
                id: card.dataset.productId,
                name: card.dataset.productName,
                description: card.dataset.productDescription,
                price: card.dataset.productPrice,
                currency: card.dataset.productCurrency,
                // images artık doğrudan data-product-images'tan alınacak
                images: card.dataset.productImages ? JSON.parse(card.dataset.productImages) : [card.dataset.productImage],
                url: card.dataset.productUrl,
                rating: parseFloat(card.dataset.productRating) || 0,
                reviewCount: parseInt(card.dataset.productReviewCount) || 0,
                attributes: card.dataset.productAttributes ? JSON.parse(card.dataset.productAttributes) : {},
                originalPrice: card.dataset.productOriginalPrice || ''
            };

            // FILL THE MODEL
            document.getElementById('modalProductTitle').textContent = productData.name; // Başlık güncellendi
            document.getElementById('modalProductDescription').textContent =
                productData.description || 'Bu ürün için açıklama bulunmamaktadır.';

            // prıce information
            const priceElement = document.getElementById('modalProductPrice');
            priceElement.textContent = `${productData.price} ${productData.currency}`;

            // original price (if there is)
            const originalPriceElement = document.getElementById('modalProductOriginalPrice');
            if (productData.originalPrice && productData.originalPrice !== 'N/A') {
                originalPriceElement.textContent = productData.originalPrice;
                originalPriceElement.style.display = 'inline';
            } else {
                originalPriceElement.style.display = 'none';
            }

            // Rating
            const ratingElement = document.getElementById('modalProductRating');
            ratingElement.innerHTML = '';
            if (productData.rating > 0) {
                let starsHtml = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= Math.floor(productData.rating)) {
                        starsHtml += '<i class="bi bi-star-fill"></i>';
                    } else if (i === Math.ceil(productData.rating) && productData.rating % 1 >= 0.5) {
                        starsHtml += '<i class="bi bi-star-half"></i>';
                    } else {
                        starsHtml += '<i class="bi bi-star"></i>';
                    }
                }
                ratingElement.innerHTML = `<div class="me-2">${starsHtml}</div>`;
                ratingElement.innerHTML += `<span>${productData.rating.toFixed(1)}</span>`;
            } else {
                ratingElement.innerHTML = '<span class="text-muted">Değerlendirme bulunmuyor</span>';
            }

            // Yorum sayısı
            const reviewElement = document.getElementById('modalProductReviewCount');
            if (productData.reviewCount > 0) {
                reviewElement.textContent = `${productData.reviewCount} yorum`;
            } else {
                reviewElement.textContent = 'Henüz yorum yok';
            }

            // Ürün ID
            document.querySelector('#modalProductId span').textContent = productData.id;

            // Ürün linki
            document.getElementById('modalProductLink').href = productData.url;

            // Resimleri yükle
            const carouselInner = document.getElementById('modalCarouselInner');
            carouselInner.innerHTML = '';

            // Eğer images dizisi boşsa veya geçersizse bir placeholder ekle
            if (!productData.images || productData.images.length === 0 || (productData.images.length === 1 && (productData.images[0] === '' || productData.images[0] === '/images/no-image.jpg'))) {
                carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <img src="/images/no-image.jpg" class="d-block w-100" alt="Görsel Yok" style="max-height: 400px; object-fit: contain;">
                </div>
            `;
            } else {
                productData.images.forEach((img, index) => {
                    carouselInner.innerHTML += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100" alt="${productData.name} - Görsel ${index + 1}" style="max-height: 400px; object-fit: contain;" onerror="this.src='/images/no-image.jpg'">
                </div>
            `;
                });
            }

            // Özellikler
            const attributesElement = document.getElementById('modalProductAttributes');
            attributesElement.innerHTML = '';

            if (Object.keys(productData.attributes).length > 0) {
                attributesElement.innerHTML = `
                <table class="attributes-table">
                    <tbody>
                        ${Object.entries(productData.attributes).map(([key, value]) => `
                            <tr>
                                <td class="attribute-name">${key}</td>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            } else {
                attributesElement.innerHTML = '<p class="text-muted">Bu ürün için ek özellik bilgisi bulunmamaktadır.</p>';
            }

            // show the modal
            productDetailModal.show();
        });
    });

    // Clicking on the "More..." link event
    document.querySelectorAll('.show-product-details').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Disable default link behavior
            e.stopPropagation(); // Prevent card click triggering

            const productId = this.dataset.productId;
            const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);

            const productData = {
                id: card.dataset.productId,
                name: card.dataset.productName,
                description: card.dataset.productDescription,
                price: card.dataset.productPrice,
                currency: card.dataset.productCurrency,
                images: card.dataset.productImages ? JSON.parse(card.dataset.productImages) : [card.dataset.productImage],
                url: card.dataset.productUrl,
                rating: parseFloat(card.dataset.productRating) || 0,
                reviewCount: parseInt(card.dataset.productReviewCount) || 0,
                attributes: card.dataset.productAttributes ? JSON.parse(card.dataset.productAttributes) : {},
                originalPrice: card.dataset.productOriginalPrice || ''
            };

            // Modal the fıll
            document.getElementById('modalProductTitle').textContent = productData.name;
            document.getElementById('modalProductDescription').textContent =
                productData.description || 'Bu ürün için açıklama bulunmamaktadır.';

            const priceElement = document.getElementById('modalProductPrice');
            priceElement.textContent = `${productData.price} ${productData.currency}`;

            const originalPriceElement = document.getElementById('modalProductOriginalPrice');
            if (productData.originalPrice && productData.originalPrice !== 'N/A') {
                originalPriceElement.textContent = productData.originalPrice;
                originalPriceElement.style.display = 'inline';
            } else {
                originalPriceElement.style.display = 'none';
            }

            const ratingElement = document.getElementById('modalProductRating');
            ratingElement.innerHTML = '';
            if (productData.rating > 0) {
                let starsHtml = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= Math.floor(productData.rating)) {
                        starsHtml += '<i class="bi bi-star-fill"></i>';
                    } else if (i === Math.ceil(productData.rating) && productData.rating % 1 >= 0.5) {
                        starsHtml += '<i class="bi bi-star-half"></i>';
                    } else {
                        starsHtml += '<i class="bi bi-star"></i>';
                    }
                }
                ratingElement.innerHTML = `<div class="me-2">${starsHtml}</div>`;
                ratingElement.innerHTML += `<span>${productData.rating.toFixed(1)}</span>`;
            } else {
                ratingElement.innerHTML = '<span class="text-muted">Değerlendirme bulunmuyor</span>';
            }

            const reviewElement = document.getElementById('modalProductReviewCount');
            if (productData.reviewCount > 0) {
                reviewElement.textContent = `${productData.reviewCount} yorum`;
            } else {
                reviewElement.textContent = 'Henüz yorum yok';
            }

            document.querySelector('#modalProductId span').textContent = productData.id;
            document.getElementById('modalProductLink').href = productData.url;

            const carouselInner = document.getElementById('modalCarouselInner');
            carouselInner.innerHTML = '';

            if (!productData.images || productData.images.length === 0 || (productData.images.length === 1 && (productData.images[0] === '' || productData.images[0] === '/images/no-image.jpg'))) {
                carouselInner.innerHTML = `
                    <div class="carousel-item active">
                        <img src="/images/no-image.jpg" class="d-block w-100" alt="Görsel Yok" style="max-height: 400px; object-fit: contain;">
                    </div>
                `;
            } else {
                productData.images.forEach((img, index) => {
                    carouselInner.innerHTML += `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img src="${img}" class="d-block w-100"
                                alt="${productData.name} - Görsel ${index + 1}"
                                style="max-height: 400px; object-fit: contain;"
                                onerror="this.src='/images/no-image.jpg'">
                        </div>
                    `;
                });
            }

            const attributesElement = document.getElementById('modalProductAttributes');
            attributesElement.innerHTML = '';
            if (Object.keys(productData.attributes).length > 0) {
                attributesElement.innerHTML = `
                    <table class="attributes-table">
                        <tbody>
                            ${Object.entries(productData.attributes).map(([key, value]) => `
                                <tr>
                                    <td class="attribute-name">${key}</td>
                                    <td>${value}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            } else {
                attributesElement.innerHTML = '<p class="text-muted">Bu ürün için ek özellik bilgisi bulunmamaktadır.</p>';
            }
            productDetailModal.show();
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get active tab from URL
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get("activeTab");

    if (activeTab) {
        const tabTrigger = document.querySelector(`button[data-bs-target="#${activeTab}"]`);
        if (tabTrigger) {
            new bootstrap.Tab(tabTrigger).show();
        }
    }

    // Write the active tab information to the input before sending the form
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", () => {
            const activeTabButton = document.querySelector(".nav-tabs .nav-link.active");
            const tabId = activeTabButton.getAttribute("data-bs-target").replace("#", "");
            const input = form.querySelector("#activeTabInput");
            if (input) input.value = tabId;
        });
    });
});
