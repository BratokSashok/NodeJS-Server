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