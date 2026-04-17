const express = require('express');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Tablet', price: 499 }
];

router.get('/', verifyToken, (req, res) => {
  res.json({
    products,
    requestedBy: req.user.username
  });
});

router.get('/:id', verifyToken, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(product);
});

module.exports = router;