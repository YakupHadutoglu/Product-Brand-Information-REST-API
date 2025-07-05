//* Navigation Bar
let usersBtn = document.querySelector("#users-btn");
let apiBtn = document.querySelector("#api-btn"); // oneBtn yerine apiBtn
let twoBtn = document.querySelector("#two-btn");
let threeBtn = document.querySelector("#three-btn");
let fourBtn = document.querySelector("#four-btn");

let usersScreen = document.querySelector("#users-screen");
let apiScreen = document.querySelector("#api-screen"); // oneScreen yerine apiScreen
let twoScreen = document.querySelector("#two-screen");
let threeScreen = document.querySelector("#three-screen");
let fourScreen = document.querySelector("#four-screen");

let screens = document.querySelectorAll(".screen");
let navBarBtn = document.querySelectorAll(".nav-bar-btn");

const interactionSqS = [
    {
        target: usersBtn,
        trigger: usersScreen
    },
    {
        target: apiBtn,
        trigger: apiScreen
    },
    {
        target: twoBtn,
        trigger: twoScreen
    },
    {
        target: threeBtn,
        trigger: threeScreen
    },
    {
        target: fourBtn,
        trigger: fourScreen
    }
];

function initializeScreens() {
    screens.forEach(screen => (screen.style.display = "none"));
    usersScreen.style.display = "block";
    navBarBtn.forEach(btn => (btn.style.backgroundColor = "rgb(44, 46, 45)"));
    usersBtn.style.backgroundColor = "black";
}

function setupNavbarClicks() {
    interactionSqS.forEach(({ target, trigger }) => {
        target.addEventListener("click", () => {
            screens.forEach(screen => (screen.style.display = "none"));
            navBarBtn.forEach(btn => (btn.style.backgroundColor = "rgb(44, 46, 45)"));
            trigger.style.display = "block";
            target.style.backgroundColor = "black";
        });
        target.addEventListener("dragstart", e => e.preventDefault());
    });
}

initializeScreens();
setupNavbarClicks();

//* User Modal
document.addEventListener("DOMContentLoaded", function () {
    const userModal = document.getElementById("userModal");
    userModal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget;

        document.getElementById("modalUserName").textContent = button.getAttribute("data-name");
        document.getElementById("modalUserEmail").textContent = button.getAttribute("data-email");
        document.getElementById("modalUserID").textContent = button.getAttribute("data-id");
        document.getElementById("modalGoogleID").textContent = button.getAttribute("data-googleid");
        document.getElementById("modalAdminStatus").textContent = button.getAttribute("data-admin");
        document.getElementById("modalCreatedAt").textContent = button.getAttribute("data-created");
        document.getElementById("modalApprovedStatus").textContent = button.getAttribute("data-approved");
    });
});

   // JSON doğrulama fonksiyonu
    function validateJSON(fieldId) {
        const textarea = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);

        try {
            // Boş değeri kontrol et
            if (!textarea.value.trim()) {
                throw new Error('Bu alan boş bırakılamaz');
            }

            // JSON parse et
            JSON.parse(textarea.value);

            // Doğrulama başarılı
            textarea.classList.remove('is-invalid');
            textarea.classList.add('is-valid');
            errorElement.classList.add('d-none');
            errorElement.textContent = '';

            return true;
        } catch (error) {
            // Doğrulama başarısız
            textarea.classList.remove('is-valid');
            textarea.classList.add('is-invalid');
            errorElement.classList.remove('d-none');
            errorElement.textContent = `Geçersiz JSON formatı: ${error.message}`;

            return false;
        }
    }

    // Form gönderilmeden önce tüm JSON alanlarını doğrula
    document.querySelector('form').addEventListener('submit', function(e) {
        let isValid = true;

        // Tüm JSON alanlarını kontrol et
        const jsonFields = ['headers', 'paramMap'];
        jsonFields.forEach(field => {
            if (!validateJSON(field)) {
                isValid = false;
            }
        });

        // Doğrulama başarısızsa form gönderimini engelle
        if (!isValid) {
            e.preventDefault();
            alert('Lütfen tüm JSON alanlarını doğru formatta doldurun.');
        }
    });

    