//* Generate realistic API key within service form

AOS.init({ duration: 800, once: true });
document.querySelectorAll('.contrib-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.contrib-tabs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.querySelectorAll('.contrib-form').forEach(f => f.classList.remove('active'));
        const current = document.getElementById('form-' + tab);
        current.classList.add('active');
        gsap.fromTo(current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    });
});

//* Confetti for donation
document.getElementById('form-donation').addEventListener('submit', e => {
    e.preventDefault();
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.style.position = 'absolute'; div.style.width = '6px'; div.style.height = '6px';
        div.style.background = `hsl(${Math.random() * 360},100%,50%)`;
        document.querySelector('.confetti').appendChild(div);
        gsap.to(div, { x: Math.random() * window.innerWidth - 100, y: window.innerHeight, rotation: Math.random() * 360, duration: 2 + Math.random(), ease: 'power2.out', onComplete: () => div.remove() });
    }
});

