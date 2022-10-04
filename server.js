const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlebars = expressHandlebars.create({});
const app = express();

const routes = require('./controller/routes');

const path = require('path');

const PORT = process.env.PORT || 3001;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes)

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})