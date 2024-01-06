const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, "Field harus di isi"],
    minlength: 3,
    maxlength: 50
  },
  price: {
    type: Number,
    required: true,
    minlength: 1000,
    maxlength: 10000000,
  },
  stock: Number,
  status: {
    type: Boolean,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;