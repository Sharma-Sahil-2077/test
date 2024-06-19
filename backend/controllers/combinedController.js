const axios = require('axios');

exports.getCombinedData = async (req, res) => {
  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`${req.protocol}://${req.get('host')}/api/transactions`, { params: req.query }),
      axios.get(`${req.protocol}://${req.get('host')}/api/statistics`, { params: req.query }),
      axios.get(`${req.protocol}://${req.get('host')}/api/barchart`, { params: req.query }),
      axios.get(`${req.protocol}://${req.get('host')}/api/piechart`, { params: req.query })
    ]);

    res.status(200).json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data
    });
  } catch (error) {
    res.status(500).send('Error fetching combined data');
  }
};
