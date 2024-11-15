// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users');

passport.use(new LocalStrategy(
    function(username, password, done) {
        // Поиск пользователя в массиве users
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Неправильное имя пользователя или пароль' });
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const user = users.find(user => user.id === id);
    done(null, user);
});

module.exports = passport;
