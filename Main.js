const express = require('express');
const app = express();
app.use(express.json());

const birdsSection = require('./Pets/birds');
app.use('/birds', birdsSection);

const catSection = require('./Pets/cats');
app.use('/cats', catSection);

app.get('/', (req, res) => {
    res.send("Welcome to our online pet store");
}
);

app.listen(8080);