import React, { useEffect, useState } from 'react';
import TransactionTable from './TransactionTable';
import MonthSelector from './MonthSelector';
import axios from 'axios';
// import BarChart from './BarChart';
// import PieChart from './PieChart';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/table/fill');
      if (response.status !== 200) {
        throw new Error('Failed to fetch transactions');
      }
      const data = response.data;
      console.log(data)
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 justify-between">
      {/* Top Section: Filters and Controls */}
      <div className="flex justify-between items-center">
        {/* Search Input (mockup shows a button, but typically an input field is used) */}
        <div className="flex h-7 w-40 text-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button className="bg-blue-500 text-white px-2 rounded-r text-center">Search</button>
        </div>

        {/* Month Selector */}
        <MonthSelector />

      </div>

      {/* Main Content: Table and Charts */}
      <div className="flex h-[600px] w-[1200px] -mt-5 left-0 absolute  scale-90 ">
        {/* Transaction Table */}
        <TransactionTable transactions={transactions} />

        {/* Charts Section */}
        {/* <div>
          <BarChart transactions={transactions} />
          <PieChart transactions={transactions} />
        </div> */}
      </div>
      <div className='absolute right-0'>
        Buttons
      </div>

    </div>
  );
}

export default Dashboard;
