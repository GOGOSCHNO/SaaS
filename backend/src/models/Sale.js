const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  service: { type: String, required: true },
  serviceValue: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Sale', SaleSchema);
