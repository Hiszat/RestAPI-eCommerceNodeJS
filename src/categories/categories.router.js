const express = require('express');
const { findAllCategories, createCategories, updateCategories, deleteCategories } = require('./categories.controller');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await findAllCategories();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const nama = req.body.nama;
        const result = await createCategories(nama);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nama = req.body.nama;
        const result = await updateCategories(id, nama);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const result = await deleteCategories(id);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;