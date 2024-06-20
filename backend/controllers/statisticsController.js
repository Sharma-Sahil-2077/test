const Transaction = require('../model/transaction');

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const years = [2021, 2022]; // Years to check, in order

  for (const year of years) {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    try {
      const totalSales = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
        { $group: { _id: null, totalAmount: { $sum: "$price" }, totalSoldItems: { $sum: 1 } } }
      ]);

      const totalNotSoldItems = await Transaction.countDocuments({
        dateOfSale: { $gte: startDate, $lt: endDate },
        sold: false,
      });

      if (totalSales[0]?.totalAmount > 0 || totalSales[0]?.totalSoldItems > 0 || totalNotSoldItems > 0) {
        return res.status(200).json({
          totalSalesAmount: totalSales[0]?.totalAmount || 0,
          totalSoldItems: totalSales[0]?.totalSoldItems || 0,
          totalNotSoldItems: totalNotSoldItems,
        });
      }
    } catch (error) {
      return res.status(500).send('Error fetching statistics');
    }
  }

  res.status(200).json({
    totalSalesAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
};
