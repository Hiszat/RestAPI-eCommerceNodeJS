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

const prodRouter = require("./product/product.router");
app.use("/product", prodRouter);




app.listen(PORT, () => {
    console.log("App sudah berjalan di PORT: " + PORT);
})
