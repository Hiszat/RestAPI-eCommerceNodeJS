const express = require('express');
const router = express.Router();

const prodRouter = require("./product/product.router");
router.use("/product", prodRouter);

const catRouter = require('./categories/categories.router');
router.use('/categories', catRouter);

const tagsRouter = require('./tags/tags.router');
router.use('/tags', tagsRouter);


module.exports = router;

