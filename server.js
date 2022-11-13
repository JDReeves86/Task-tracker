const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3030;
const routes = require('./routes');
const db = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App listening @ ${PORT}`);
  });
});