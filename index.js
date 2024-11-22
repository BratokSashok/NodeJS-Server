const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const hbs = require('hbs');
const path = require('path');
const passport = require('./src/middleware/passport'); // Подключаем файл с конфигурацией passport
const session = require('express-session');
const flash = require('connect-flash'); // Подключаем connect-flash
const sequelize = require('./src/config/database.config');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Подключаем dotenv
const bodyParser = require('body-parser');
const { adminAuth, generateNewPassword } = require(path.join(__dirname, 'src', 'middleware', 'adminAuth'));
const loginAndRegistrationRoutes = require('./src/middleware/LoginAndRegistration'); // Подключаем новый файл маршрутов
const { setupButtonRoutes } = require('./src/middleware/buttonHandler'); // Подключаем обработчик кнопки
const userRoutes = require('./src/routes/userRoutes'); // Подключаем маршруты для аутентификации
const adminRoutes = require('./src/routes/adminRoutes'); // Подключаем маршруты для администратора

const hostname = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT || '3000';

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.engine('hbs', handlebars.engine({
    layoutsDir: 'src/views/layouts',
    defaultLayout: 'layout',
    extname: '.hbs'
}));

sequelize.sync() 
  .then(() => { 
    console.log('Database & tables created!'); 
  }) 
  .catch((err) => { 
    console.error('Error creating database:', err); 
  });
// Настройка парсинга тела запроса
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Настройка сессий
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); // Подключаем connect-flash

// Инициализация passport
app.use(passport.initialize());
app.use(passport.session());

// Подключение маршрутов для логина и регистрации
app.use('/', loginAndRegistrationRoutes);
// Настройка маршрутов для кнопки
setupButtonRoutes(app); 
// Подключение маршрутов для аутентификации
app.use('/', userRoutes);
// Подключение маршрутов для администратора
app.use('/', adminRoutes);
// Настройка шаблонизатора


app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });