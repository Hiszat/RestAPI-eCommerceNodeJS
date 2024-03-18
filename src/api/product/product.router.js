const express = require('express');
const multer  = require('multer');
const os = require('os');
const upload = multer({ dest: os.tmpdir() })
const { findProduct, inputProduct, updateProduct, deleteProduct } = require('./product.controller');

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
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', upload.single('product'), async (req, res) => {
    try {
        const payload = req.body;
        const gambar = req.file;
        const product = await inputProduct(payload, gambar);
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/:id',  upload.single('product'), async (req, res) => {
    try {
        const id = req.params.id;
        const {nama, price, stock, status} = req.body;
        const pict = req.file;
        const product = await updateProduct({id, nama, price, stock, status, pict});
        res.send({
            msg: "Data berhasil di input",
            data: product
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})



router.delete('/:id',  async (req, res) => {
    try {
        const id = req.params.id;
        const product = await deleteProduct(id);
        res.send({
            msg: "Data berhasil di hapus",
            data: product
        });
    } catch (error) {
        if(error.path == '_id'){
            res.status(400).send("Gagal menghapus product (Product ID tidak ditemukan)");
        }else{
            res.status(400).send(error.message);
        }
        
    }
})


module.exports = router;