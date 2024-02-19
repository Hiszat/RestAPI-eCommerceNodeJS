const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const productSchema = Schema({
  name: {
    type: String,
    required:[true, "Field harus di isi"],
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: [1000, "Panjang deskripsi maksimal 1000 karakter"]
  },
  price: {
    type: Number,
    default: 0,
    maxlength: 10000000,
  },
  stock: Number,
  status: {
    type: Boolean,
    required: true,
  },
  image_url: String

}, {timestamps: true});

const Product = model('Product', productSchema);

module.exports = Product;