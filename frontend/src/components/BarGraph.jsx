import React from 'react';

const BarGraph = ({ data }) => {
  const allCountsZero = data.every(item => item.count === 0);

  if (allCountsZero) {
    return <div className="text-center text-gray-500">No data available for the selected month and year.</div>;
  }

  const maxCount = Math.max(...data.map(item => item.count));

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-[800px]">
      <div className="flex">
        {/* Left side with counts */}
        <div className="flex flex-col justify-between mr-4 mb-8">
          {[...Array(maxCount + 1)].map((_, index) => (
            <div key={index} className="text-right mb-2">
              {maxCount - index}
            </div>
          ))}
        </div>

        {/* Graph bars */}
        <div className="flex-1">
          <div className="grid grid-cols-10 gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-12 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-blue-500"
                    style={{ height: `${(item.count / maxCount) * 100}%` }}
                  ></div>
                </div>
                <div className="mb-2 text-xs mt-4 -rotate-45">{item.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
