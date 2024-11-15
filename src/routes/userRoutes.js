const express = require('express');
const router = express.Router();

// Главная страница
router.get('/', (req, res) => {
    res.render('main', { title: 'HomePage' });
});

// Страница логина
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page', message: req.flash('error') });
});

// Страница регистрации
router.get('/registration', (req, res) => {
    res.render('registration', { title: 'Registration Page' });
});

module.exports = router;
