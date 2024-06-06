const router = require('express').Router();
const Purchase = require('../models/Purchase');

// Obtenir les achats
router.get('/', (req, res) => {
  Purchase.find()
    .then(purchases => res.json(purchases))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Enregistrer un achat
router.post('/add', (req, res) => {
  const newPurchase = new Purchase({
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    productName: req.body.productName,
    supplier: req.body.supplier,
    date: req.body.date
  });

  newPurchase.save()
    .then(() => res.json('Purchase added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
