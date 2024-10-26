function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;

    if (password.length < minLength) {
        alert('Пароль должен быть не менее 8 символов.');
        return false;
    }
    if (!hasNumber.test(password)) {
        alert('Пароль должен содержать хотя бы одну цифру.');
        return false;
    }
    if (!hasUpperCase.test(password)) {
        alert('Пароль должен содержать хотя бы одну заглавную букву.');
        return false;
    }
    if (password !== confirmPassword) {
        alert('Пароли не совпадают.');
        return false;
    }
    return true;
}
function validateLoginForm() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Валидация логина или email
    if (login.includes('@')) {
        if (!validateEmail(login)) {
            alert('Почта введена некорректно.');
            return false;
        }
    } else {
        if (login.length < 3) {
            alert('Логин должен быть не менее 3 символов.');
            return false;
        }
    }

    // Валидация пароля
    if (password.length < minLength) {
        alert('Пароль должен быть не менее 8 символов.');
        return false;
    }
    if (!hasNumber.test(password)) {
        alert('Пароль должен содержать хотя бы одну цифру.');
        return false;
    }
    if (!hasUpperCase.test(password)) {
        alert('Пароль должен содержать хотя бы одну заглавную букву.');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
