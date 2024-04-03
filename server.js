const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')
const helpers = require('./utils/helpers')

const { user, thought, reaction } = require('./models');

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const hbs = create({ helpers })

app.use(routes)
// app.use(express.static('public'))


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});