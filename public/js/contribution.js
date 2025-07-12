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


// JSON validate function
function validateJSON(fieldId) {
    const textarea = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);

    try {
        if (!textarea.value.trim()) {
            throw new Error('This field cannot be left blank');
        }

        // JSON parse
        JSON.parse(textarea.value);

        // Doğrulama success
        textarea.classList.remove('is-invalid');
        textarea.classList.add('is-valid');
        errorElement.classList.add('d-none');
        errorElement.textContent = '';

        return true;
    } catch (error) {
        // vertification unsuccessful
        textarea.classList.remove('is-valid');
        textarea.classList.add('is-invalid');
        errorElement.classList.remove('d-none');
        errorElement.textContent = `Geçersiz JSON formatı: ${error.message}`;

        return false;
    }
}

// Validate all JSON fields before form submission
document.querySelector('form').addEventListener('submit', function (e) {
    let isValid = true;

    const jsonFields = ['headers', 'paramMap'];
    jsonFields.forEach(field => {
        if (!validateJSON(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        e.preventDefault();
        alert('Please fill in all JSON fields in the correct format.');
    }
});

function validatePathStart(input) {
    const errorDiv = document.getElementById('path-error');
    if (!input.value.startsWith('/')) {
        errorDiv.classList.remove('d-none');
    } else {
        errorDiv.classList.add('d-none');
    }
}

function showToast(type, title, message) {
    console.log(`${type}: ${title} - ${message}`);
}


