document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const strengthFill = document.getElementById("strength-fill");
    const strengthText = document.getElementById("strength-text");

    const reqLength = document.getElementById("req-length");
    const reqUpper = document.getElementById("req-upper");
    const reqLower = document.getElementById("req-lower");
    const reqDigit = document.getElementById("req-digit");
    const reqSymbol = document.getElementById("req-symbol");

    const levels = ["Çok Zayıf", "Zayıf", "Orta", "Güçlü", "Çok Güçlü"];
    const colors = ["#ff4d4d", "#ff944d", "#ffe44d", "#99e600", "#00b300"];

    function checkRequirements(password) {
        const lengthCheck = password.length >= 8;
        const upperCheck = /[A-Z]/.test(password);
        const lowerCheck = /[a-z]/.test(password);
        const digitCheck = /[0-9]/.test(password);
        const symbolCheck = /[^A-Za-z0-9]/.test(password);

        reqLength.textContent = (lengthCheck ? "✅" : "❌") + " En az 8 karakter";
        reqUpper.textContent = (upperCheck ? "✅" : "❌") + " En az 1 büyük harf (A-Z)";
        reqLower.textContent = (lowerCheck ? "✅" : "❌") + " En az 1 küçük harf (a-z)";
        reqDigit.textContent = (digitCheck ? "✅" : "❌") + " En az 1 rakam (0-9)";
        reqSymbol.textContent = (symbolCheck ? "✅" : "❌") + " En az 1 özel karakter (!@#$...)";

        return lengthCheck && upperCheck && lowerCheck && digitCheck && symbolCheck;
    }

    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value;
        const result = zxcvbn(value);
        let score = result.score;

        if (!checkRequirements(value) && score > 2) {
            score = 2;
        }

        strengthFill.style.width = ((score + 1) * 20) + "%";
        strengthFill.style.backgroundColor = colors[score];
        strengthText.textContent = "Şifre Gücü: " + levels[score];
    });
});
