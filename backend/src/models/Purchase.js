const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  productName: { type: String, required: true },
  supplier: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
