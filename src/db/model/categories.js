const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const catSchema = Schema({
  name: {
    type: String,
    required: [true, "Nama Categories harus di isi"],
    minlength: [ 3, "Panjang nama kategori minimal 3"],
    maxlength: [20, "Panjang nama kategori maksimal 20"]
  },
});

const Categories = model('Categories', catSchema);

module.exports = Categories;