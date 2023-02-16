const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
})

const StylesSchema = mongoose.Schema({
  styles_id: Number,
  name: String,
  original_price: Number,
  sale_price: Number,
  default_style: Boolean,
  photos: Array,
  skus: Object,
});