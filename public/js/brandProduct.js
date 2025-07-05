 // Ekranlar
                const searchScreen = document.getElementById('search-screen');
                const brandsScreen = document.getElementById('brands-screen');

                // Butonlar
                const btnSearch = document.getElementById('btn-search');
                const btnBrands = document.getElementById('btn-brands');

                btnSearch.onclick = () => {
                    searchScreen.style.display = 'block';
                    brandsScreen.style.display = 'none';

                    btnSearch.classList.add('btn-primary');
                    btnSearch.classList.remove('btn-outline-primary');
                    btnBrands.classList.add('btn-outline-primary');
                    btnBrands.classList.remove('btn-primary');
                };

                btnBrands.onclick = () => {
                    searchScreen.style.display = 'none';
                    brandsScreen.style.display = 'block';

                    btnBrands.classList.add('btn-primary');
                    btnBrands.classList.remove('btn-outline-primary');
                    btnSearch.classList.add('btn-outline-primary');
                    btnSearch.classList.remove('btn-primary');
                };

                // İlk açılışta sorgu ekranı açık olsun
                btnSearch.click();

                // -------- Sorgu formu ---------
                const form = document.getElementById('api-form');
                const resultInfo = document.getElementById('result-info');
                const productResults = document.getElementById('product-results');

                form.addEventListener('submit', async e => {
                    // e.preventDefault();

                    const formData = new FormData(form);
                    const brandFilter = formData.get('brand').toLowerCase();
                    const keywordFilter = formData.get('keyword').toLowerCase();
                    const minPrice = parseFloat(formData.get('minPrice'));
                    const maxPrice = parseFloat(formData.get('maxPrice'));

                    // API'yi backend'e çağıracağız (örnek: /api/products?brand=...&keyword=... vb.)
                    const params = new URLSearchParams({
                        brand: brandFilter,
                        keyword: keywordFilter,
                        minPrice: !isNaN(minPrice) ? minPrice : '',
                        maxPrice: !isNaN(maxPrice) ? maxPrice : ''
                    });

                    try {
                        const res = await fetch('/api/products?' + params.toString());
                        const products = await res.json();

                        resultInfo.textContent = `${products.length} ürün bulundu.`;

                        productResults.innerHTML = products.length
                            ? products.map(p => `
            <div class="col">
              <div class="card h-100 shadow-sm">
                <img src="${p.imageUrl || 'https://via.placeholder.com/250'}" alt="${p.name}" class="card-img-top" />
                <div class="card-body p-2">
                  <h6 class="card-title mb-1">${p.name}</h6>
                  <small class="text-muted">${p.brand}</small><br />
                  <strong>${p.price} ${p.currency}</strong><br />
                  <small class="text-secondary">Kaynak: ${p.source}</small>
                </div>
              </div>
            </div>
          `).join('')
                            : `<div class="col-12 text-center text-muted">Ürün bulunamadı.</div>`;

                    } catch (error) {
                        resultInfo.textContent = 'Ürünler getirilirken hata oluştu.';
                        productResults.innerHTML = '';
                        console.error(error);
                    }
                });

                // -------- Marka butonları ile ürün listeleme (Çoklu seçim) ---------
                const brandButtons = document.querySelectorAll('.brand-btn');
                const brandProducts = document.getElementById('brand-products');

                // Tüm ürünler (örnek mock veri)
                const allProducts = [
                    { name: 'Sahte Telefon 1', brand: 'Marka X', price: 2000, currency: 'TL', source: 'mock', imageUrl: 'https://via.placeholder.com/250?text=Telefon+1' },
                    { name: 'Sahte Telefon 2', brand: 'Marka Y', price: 3500, currency: 'TL', source: 'mock', imageUrl: 'https://via.placeholder.com/250?text=Telefon+2' },
                    { name: 'Sahte Telefon 3', brand: 'Marka Z', price: 1500, currency: 'TL', source: 'mock', imageUrl: 'https://via.placeholder.com/250?text=Telefon+3' },
                    { name: 'Sahte Kulaklık 1', brand: 'Marka X', price: 500, currency: 'TL', source: 'mock', imageUrl: 'https://via.placeholder.com/250?text=Kulaklık+1' },
                    { name: 'Sahte Tablet 1', brand: 'Marka Y', price: 2500, currency: 'TL', source: 'mock', imageUrl: 'https://via.placeholder.com/250?text=Tablet+1' }
                ];

                const selectedBrands = new Set();

                brandButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const brand = btn.dataset.brand.toLowerCase();

                        if (selectedBrands.has(brand)) {
                            selectedBrands.delete(brand);
                            btn.classList.remove('btn-primary');
                            btn.classList.add('btn-outline-secondary');
                        } else {
                            selectedBrands.add(brand);
                            btn.classList.add('b tn-primary');
                            btn.classList.remove('btn-outline-secondary');
                        }

                        let filtered;
                        if (selectedBrands.size === 0) {
                            filtered = allProducts;
                        } else {
                            filtered = allProducts.filter(p => selectedBrands.has(p.brand.toLowerCase()));
                        }

                        brandProducts.innerHTML = filtered.length
                            ? filtered.map(p => `
            <div class="col">
              <div class="card h-100 shadow-sm">
                <img src="${p.imageUrl}" alt="${p.name}" class="card-img-top" />
                <div class="card-body p-2">
                  <h6 class="card-title mb-1">${p.name}</h6>
                  <small class="text-muted">${p.brand}</small><br />
                  <strong>${p.price} ${p.currency}</strong><br />
                  <small class="text-secondary">Kaynak: ${p.source}</small>
                </div>
              </div>
            </div>
          `).join('')
                            : `<div class="col-12 text-center text-muted">Seçilen markalara ait ürün bulunamadı.</div>`;
                    });
                });
