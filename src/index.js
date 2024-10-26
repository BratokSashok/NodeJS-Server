const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const hbs = require('hbs');
const path = require('path');
const { title } = require('process');
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', handlebars.engine({
    layoutsDir: 'views/layouts',
    defaultLayout: 'layout',
    extname: '.hbs'
}));

// Настройка шаблонизатора
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

app.use("/contact.test", function(request, response) {
    response.render("contact", {
        title: "my contacts",
        email: "gavgag@mycorp.com",
        phone: "+12341231"
    });
});

app.use("/", function(request, response) {
    response.render("home", { title: 'Home Page' });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
