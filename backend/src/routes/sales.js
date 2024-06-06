const router = require('express').Router();
const Sale = require('../models/Sale');

// Obtenir les ventes
router.get('/', (req, res) => {
  Sale.find()
    .then(sales => res.json(sales))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Enregistrer une vente
router.post('/add', (req, res) => {
  const newSale = new Sale({
    customerName: req.body.customerName,
    service: req.body.service,
    serviceValue: req.body.serviceValue,
    paymentMethod: req.body.paymentMethod,
    date: req.body.date
  });

  newSale.save()
    .then(() => res.json('Sale added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
