const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const hbs = require('hbs');
const path = require('path');
const { title } = require('process');

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.engine('hbs', handlebars.engine({
    layoutsDir: 'src/views/layouts',
    defaultLayout: 'layout',
    extname: '.hbs'
}));


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

app.use(express.static(path.join(__dirname, 'src', 'public')));
 
// < КОД КНОПКИ //

// Настройка шаблонизатора
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));


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
