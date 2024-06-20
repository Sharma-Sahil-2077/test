import React, { useState } from 'react';
import axios from 'axios';
import BarGraph from './BarGraph';

const fetchData = async (month) => {
  const url = `http://127.0.0.1:5000/api/barchart?month=${month}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

const App = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  const handleFetchData = async () => {
    const result = await fetchData(month);
    setData(result[0].data);
    setShowGraph(true);
  };

  return (
    <div className="container mx-auto mt-8 ml-20">
      <div className="mb-4">
        <label className=" justify-center font-semibold text-3xl">Bar Chart Stats - </label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className=" p-2 font-semibold text-3xl w-48 border-gray-300  rounded"
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
          Show Graph
        </button>
      </div>
      {showGraph && <BarGraph data={data} />}
    </div>
  );
};

export default App;
