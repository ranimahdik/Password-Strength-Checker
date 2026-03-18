document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');
    const requirements = document.querySelectorAll('.requirement');

    // Toggle Eye Icon Logic
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Strength Checker Logic
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        
        const checks = {
            length: val.length >= 8,
            uppercase: /[A-Z]/.test(val),
            number: /[0-9]/.test(val),
            special: /[!@#$%^&*]/.test(val)
        };

        let passed = 0;
        requirements.forEach(req => {
            const type = req.dataset.type;
            if (checks[type]) {
                req.classList.add('valid');                passed++;
            } else {
                req.classList.remove('valid');
            }
        });

        updateUI(passed, val.length);
    });

    function updateUI(passed, len) {
        let width = "0%";
        let color = "#222";
        let text = "Too Short";

        if (len > 0) {
            if (passed <= 1) {
                width = "25%"; color = "#ff4d4d"; text = "Weak";
            } else if (passed <= 3) {
                width = "60%"; color = "#ffd700"; text = "Medium";
            } else {
                width = "100%"; color = "#00ff88"; text = "Strong";
            }
        }

        strengthBar.style.width = width;
        strengthBar.style.backgroundColor = color;
        strengthLabel.textContent = text;
        strengthLabel.style.color = color;
    }
});