const express = require('express');
const { findAllTags, createTags, updateTags, deleteTags } = require('./tags.controller');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await findAllTags();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const nama = req.body.nama;
        const result = await createTags(nama);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nama = req.body.nama;
        const result = await updateTags(id, nama);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:id', async (req,res) =>{
    try {
        const id = req.params.id;
        const result = await deleteTags(id);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;