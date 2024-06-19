const express = require('express');
const router = express.Router();
const Transaction = require('../model/transaction'); // Assuming you have a Transaction model defined

// GET all transactions
router.get('/fill', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET single transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create a new transaction
router.post('/', async (req, res) => {
  const { title, description, price, dateOfSale, sold, category, images } = req.body;

  try {
    const newTransaction = new Transaction({
      title,
      description,
      price,
      dateOfSale,
      sold,
      category,
      images,
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update a transaction by ID
router.put('/:id', async (req, res) => {
  const { title, description, price, dateOfSale, sold, category, images } = req.body;

  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    transaction.title = title;
    transaction.description = description;
    transaction.price = price;
    transaction.dateOfSale = dateOfSale;
    transaction.sold = sold;
    transaction.category = category;
    transaction.images = images;

    transaction = await transaction.save();

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE a transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    await Transaction.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
