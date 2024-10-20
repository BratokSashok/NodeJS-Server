const express = require('express');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, 'controllers', 'public', 'styles')));
app.use(express.static(path.join(__dirname, 'controllers', 'public', 'scripts')));

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'controllers', 'public', 'html', 'homePage.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
