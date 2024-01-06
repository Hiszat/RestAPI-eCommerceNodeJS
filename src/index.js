require("./db/index")
const express = require('express');
const dotenv = require('dotenv');
const app = express();


dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

const prodController = require("./product/product.controller")
app.use("/product", prodController);



app.listen(PORT, () => {
    console.log("App sudah berjalan di PORT: " + PORT);
})
