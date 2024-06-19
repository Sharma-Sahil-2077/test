const express = require('express');
const router = express.Router();

const { initializeDatabase } = require('../controllers/initializeController');
const { listTransactions } = require('../controllers/transactionController');
const { getStatistics } = require('../controllers/statisticsController');
const { getBarChart } = require('../controllers/barChartController');
const { getPieChart } = require('../controllers/pieChartController');
const { getCombinedData } = require('../controllers/combinedController');

router.get('/initialize', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);
router.get('/combined', getCombinedData);

module.exports = router;
