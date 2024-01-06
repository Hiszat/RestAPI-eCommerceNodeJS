const express = require('express');
const { inputProduct, findProduct, updateProduct, } = require('./product.service');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await findProduct();
        res.send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await findProduct(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { nama, price, stock, status } = req.body;
        const product = await inputProduct(nama, price, stock, status);
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {nama, price, stock, status} = req.body;
        const product = await updateProduct(id, {nama, price, stock, status});
        res.send({
            msg: "Data berhasil di input",
            data: product
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports = router;