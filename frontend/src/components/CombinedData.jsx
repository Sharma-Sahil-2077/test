import React, { useState } from 'react';
import axios from 'axios';
import BarGraph from './BarGraph';

const App = () => {
  const [data, setData] = useState({ transactions: [], statistics: {}, barChart: [] });
  const [month, setMonth] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  const fetchData = async (month) => {
    const url = `http://127.0.0.1:5000/api/combined?month=${month}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      return { transactions: [], statistics: {}, barChart: [] };
    }
  };

  const handleFetchData = async () => {
    const result = await fetchData(month);
    setData(result);
    setShowGraph(true);
  };

  return (
    <div className="container mx-auto mt-8 ml-20">
      <div className="mb-4">
        <label className="justify-center font-semibold text-3xl">Combined Data for - </label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 font-semibold text-3xl w-48 border-gray-300 rounded"
        > 
          <option className='text-sm' value="">Month</option>
          <option className='text-sm' value="1">January</option>
          <option className='text-sm' value="2">February</option>
          <option className='text-sm' value="3">March</option>
          <option className='text-sm' value="7">July</option>
          <option className='text-sm' value="8">August</option>
          <option className='text-sm' value="9">September</option>
          <option className='text-sm' value="10">October</option>
          <option className='text-sm' value="11">November</option>
          <option className='text-sm' value="12">December</option>
        </select>
        <span className='text-xs italic m-2 py-2 '>(Select month from Dropdown)</span>
        <button
          onClick={handleFetchData}
          className="ml-4 p-2 bg-blue-500 text-white rounded"
        >
          Get
        </button>
      </div>
      
      <div className="flex">
        {data.transactions.length > 0 && (
          <div className=' overflow-y-scroll w-[720px] overflow-hidden h-[450px] no-scrollbar'>
            <div  className=' overflow-y-scroll w-[700px] overflow-hidden h-[250px]'>
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            {data.transactions.map((item) => (
              <div key={item._id} className="mb-4 p-4 border rounded ">
                <h3 className="font-bold">{item.title}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Date of Sale: {new Date(item.dateOfSale).toLocaleDateString()}</p>
                <p>Sold: {item.sold ? 'Yes' : 'No'}</p>
                <p>Category: {item.category}</p>
              </div>
            ))}
            </div>
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <p>Total Sales Amount: ${data.statistics.totalSalesAmount}</p>
            <p>Total Sold Items: {data.statistics.totalSoldItems}</p>
            <p>Total Not Sold Items: {data.statistics.totalNotSoldItems}</p>
          </div>
        )}
       <div className="container  ml-5 w-[400px]">
      {data.barChart.map((yearData, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-xl font-bold mb-4 ">Bar Chart </h2>
          <div className="grid grid-cols-2 gap-4">
            {yearData.data.map((item, idx) => (
              <div key={idx} className="border p-2 rounded">
                <p className="font-semibold text-xs">Range: {item.range}</p>
                <p className='text-xs'>Count: {item.count}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default App;
