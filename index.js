const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const hbs = require('hbs');
const path = require('path');
const { title } = require('process');
const passport = require('./src/middleware/passport'); // Подключаем файл с конфигурацией passport
const session = require('express-session');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Настройка сессий
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Инициализация passport
app.use(passport.initialize());
app.use(passport.session());

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

// Маршруты для логина и регистрации
app.post('/login', passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/register', (req, res) => {
    try {
        const { username, password, firstName, lastName, email } = req.body;
        // Добавляем нового пользователя в массив users
        users.push({ id: users.length + 1, username, password, firstName, lastName, email });
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка на сервере');
    }
});


app.get('/', (req, res) => {
    res.render('main', { title: 'HomePage' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

app.get('/registration', (req, res) => {
    res.render('registration', { title: 'Registration Page' });
});

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
