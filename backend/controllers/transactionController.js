const Transaction = require('../models/transaction');

exports.listTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const regex = new RegExp(search, 'i');
  const startDate = new Date(`2023-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const query = {
    dateOfSale: { $gte: startDate, $lt: endDate },
    $or: [
      { title: regex },
      { description: regex },
      { price: regex },
    ],
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
};
