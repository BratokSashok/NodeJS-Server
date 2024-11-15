const express = require('express');
const router = express.Router();
const { adminAuth, generateNewPassword } = require('../middleware/adminAuth');
const users = require('../middleware/users'); // Подключаем файл с пользователями

// Маршрут для административного входа
router.post('/admin-login', adminAuth, (req, res) => {
    generateNewPassword(); // Генерация нового пароля после входа
    res.redirect('/admin-profile'); // Перенаправление на страницу профиля администратора
});

// Маршрут для профиля администратора
router.get('/admin-profile', (req, res) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    res.render('adminProfile', { title: 'Admin Profile', adminPassword });
});

// Маршрут для списка пользователей
router.get('/users', (req, res) => {
    res.render('users', { title: 'User List', users });
});

router.get('/secret', (req, res) => { 
    res.render('secret', { title: 'SECRETS' }); 
});

module.exports = router;
