var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  itemname: {type: String, required: true, default: ''},
  condition: {type: String, required: true, default: ''},
  size: {type: String, required: true, default: ''},
  season: {type: String, required: true, default: ''},
  type: {type: String, required: true, default: ''},
  brand: {type: String, required: true, default: ''},
  picture: {type: String, required: true, default: ''},
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
