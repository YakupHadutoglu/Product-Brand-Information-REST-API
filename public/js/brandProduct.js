const container = document.getElementById('main-container');
let filterOpen = false, searchOpen = false;
document.getElementById('toggle-filter').onclick = () => {
    filterOpen = !filterOpen;
    gsap.to(container, { duration: 0.8, ease: 'power2.out', css: { '--filter-width': filterOpen ? '280px' : '0px', '--filter-padding': filterOpen ? '1rem' : '0rem' } });
};
document.getElementById('toggle-search').onclick = () => {
    searchOpen = !searchOpen;
    gsap.to(container, { duration: 0.8, ease: 'power2.out', css: { '--search-width': searchOpen ? '280px' : '0px', '--search-padding': searchOpen ? '1rem' : '0rem' } });
};

// Inline Search behavior
const inlineSearch = document.getElementById('inline-search');
const inlineBtn = document.getElementById('inline-search-btn');
inlineBtn.onclick = () => {
    inlineSearch.classList.toggle('expanded');
};

// Data and panel logic remain unchanged
const brandProducts = { A: [{ name: 'Ürün A1', img: 'https://via.placeholder.com/300x200' }], B: [{ name: 'Ürün B1', img: 'https://via.placeholder.com/300x200' }], C: [{ name: 'Ürün C1', img: 'https://via.placeholder.com/300x200' }] };
document.querySelectorAll('.category-checkbox').forEach(cb => cb.onchange = () => {
    const sel = Array.from(document.querySelectorAll('.category-checkbox')).filter(c => c.checked).map(c => c.value);
    document.querySelectorAll('.brand-item').forEach(b => b.style.display = sel.includes(b.dataset.brand) ? 'inline-block' : 'none');
    document.getElementById('product-list').innerHTML = '<p class="text-center">Bir marka seçmek için logoya tıklayın.</p>';
});
document.querySelectorAll('.brand-item').forEach((item, i) => item.onclick = () => {
    const prods = brandProducts[item.dataset.brand] || [];
    const header = document.getElementById('product-header'); const grid = document.getElementById('product-list');
    header.textContent = item.querySelector('img').alt + ' Ürünleri'; grid.innerHTML = '';
    prods.forEach((p, idx) => {
        const card = document.createElement('div'); card.className = 'product-card';
        card.innerHTML = `<img src="${p.img}" alt="" /><div class="product-card-body"><h5>${p.name}</h5></div>`;
        grid.appendChild(card);
        gsap.fromTo(card, { opacity: 0, y: 50, rotation: -10 }, { opacity: 1, y: 0, rotation: 0, delay: idx * 0.1, duration: 1, ease: 'back.out(1.7)' });
    });
});
document.getElementById('search-button').onclick = () => {
    const q = document.getElementById('search-input').value.toLowerCase();
    const all = [].concat(...Object.values(brandProducts)); const res = all.filter(x => x.name.toLowerCase().includes(q));
    const header = document.getElementById('product-header'); const grid = document.getElementById('product-list');
    header.textContent = 'Arama Sonuçları'; grid.innerHTML = '';
    res.forEach((p, i) => {
        const card = document.createElement('div'); card.className = 'product-card';
        card.innerHTML = `<img src="${p.img}" alt="" /><div class="product-card-body"><h5>${p.name}</h5></div>`;
        grid.appendChild(card);
        gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, delay: i * 0.1, duration: 0.8 });
    });
};
