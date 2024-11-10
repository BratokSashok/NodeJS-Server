const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const hbs = require('hbs');
const path = require('path');
const passport = require('./src/middleware/passport'); // Подключаем файл с конфигурацией passport
const session = require('express-session');
const flash = require('connect-flash'); // Подключаем connect-flash

const bodyParser = require('body-parser');
const { adminAuth, generateNewPassword } = require(path.join(__dirname, 'src', 'middleware', 'adminAuth'));
const loginAndRegistrationRoutes = require('./src/middleware/LoginAndRegistration'); // Подключаем новый файл маршрутов

const hostname = '127.0.0.1';
const port = 3000;

const users = require('./src/middleware/users'); // Подключаем файл с пользователями

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.engine('hbs', handlebars.engine({
    layoutsDir: 'src/views/layouts',
    defaultLayout: 'layout',
    extname: '.hbs'
}));

// Настройка парсинга тела запроса
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Настройка сессий
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(flash()); // Подключаем connect-flash

// Инициализация passport
app.use(passport.initialize());
app.use(passport.session());

// Подключение маршрутов для логина и регистрации
app.use('/', loginAndRegistrationRoutes);

// КОД КНОПКИ > //

let useCatFolder = true;

function setRandomBackgroundImage() {
    const folderPath = useCatFolder ? 'src/public/cats/' : 'src/public/memes/';
    const maxImages = useCatFolder ? 29 : 26;
    const randomNumber = Math.floor(Math.random() * maxImages) + 1;
    const selectedImage = useCatFolder ? `Cat${randomNumber}.jpg` : `Meme${randomNumber}.jpg`;
    return path.join(folderPath, selectedImage);
}

function toggleFolder() {
    useCatFolder = !useCatFolder;
    const backgroundImage = setRandomBackgroundImage();
    return { useCatFolder, backgroundImage };
}

app.get('/toggle-folder', (req, res) => {
    const result = toggleFolder();
    res.json(result);
});

app.get('/random-background', (req, res) => {
    const backgroundImage = setRandomBackgroundImage();
    res.sendFile(path.join(__dirname, backgroundImage));
});

app.use(express.static(path.join(__dirname, 'src/public')));

// < КОД КНОПКИ //

// Настройка шаблонизатора
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

// Маршрут для административного входа
app.post('/admin-login', adminAuth, (req, res) => {
    generateNewPassword(); // Генерация нового пароля после входа
    res.redirect('/admin-profile'); // Перенаправление на страницу профиля администратора
});

// Маршрут для профиля администратора
app.get('/admin-profile', (req, res) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    res.render('adminProfile', { title: 'Admin Profile', adminPassword });
});

// Маршрут для списка пользователей
app.get('/users', (req, res) => {
    res.render('users', { title: 'User List', users });
});

// Главная страница
app.get('/', (req, res) => {
    res.render('main', { title: 'HomePage' });
});

// Страница логина
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page', message: req.flash('error') });
});

// Страница регистрации
app.get('/registration', (req, res) => {
    res.render('registration', { title: 'Registration Page' });
});

// Секретная страница
app.get('/secret', (req, res) => {
    res.render('secret', { title: 'SECRETS' });
});

// Маршрут для неизвестных запросов (должен быть последним маршрутом)
app.use((req, res, next) => {
    res.status(404).render('page404', { title: 'Page Not Found' });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
