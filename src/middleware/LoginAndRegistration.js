const express = require('express');
const router = express.Router();
const passport = require('./passport'); // Путь к конфигурации passport
const users = require('./users'); // Путь к файлу с пользователями

// Маршруты для логина и регистрации
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/register', (req, res) => {
    try {
        const { username, password, firstName, lastName, email } = req.body;
        // Добавляем нового пользователя в массив users
        users.push({ id: users.length + 1, username, password, firstName, lastName, email });
        res.render('registerSuccess', { title: 'Registration Successful', message: 'Registration completed successfully! Redirecting to home page...' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка на сервере');
    }
});

module.exports = router;
