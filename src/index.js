require("./db/index")
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path = require('path');

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'public')));

const apiV1Router = require('./api');
app.use('/api', apiV1Router);

app.listen(PORT, () => {
    console.log("App sudah berjalan di PORT: " + PORT);
})
