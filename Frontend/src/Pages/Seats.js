import React from "react";
import { FiRefreshCcw } from "react-icons/fi";

const seatData = {
  A1: [
    { id: 1, occupied: false }, // Top-left
    { id: 2, occupied: true },  // Top-right
    { id: 3, occupied: false }, // Bottom-left
    { id: 4, occupied: false }, // Bottom-right
  ],
  A2: [
    { id: 1, occupied: true },
    { id: 2, occupied: false },
    { id: 3, occupied: true },
    { id: 4, occupied: false },
  ],
};

const getSeatCounts = (data) => {
  let total = 0, occupied = 0;
  Object.values(data).forEach(table => {
    table.forEach(seat => {
      total++;
      if (seat.occupied) occupied++;
    });
  });

  return {
    total,
    occupied,
    available: total - occupied,
  };
};

const Seats = () => {
  const { total, occupied, available } = getSeatCounts(seatData);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Seating Availability</h1>
        <FiRefreshCcw className="w-6 h-6 text-gray-600 cursor-pointer hover:rotate-180 transition-transform duration-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Seats" value={total} color="text-black" />
        <StatCard label="Available" value={available} color="text-green-600" />
        <StatCard label="Occupied" value={occupied} color="text-red-600" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Canteen Tables</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Object.entries(seatData).map(([tableName, seats]) => (
            <div key={tableName} className="flex flex-col items-center">
              <div className="text-center font-medium text-lg mb-2">{`Table ${tableName}`}</div>

              {/* Bigger seats and centered table */}
              <div className="grid grid-cols-3 grid-rows-3 items-center justify-center gap-4">
                {/* Top row */}
                <div className="col-span-3 flex justify-center gap-8">
                  <SeatCircle seat={seats[0]} />
                  <SeatCircle seat={seats[1]} />
                </div>

                {/* Middle row */}
                <div className="col-span-3 flex justify-center">
                  <div className="w-32 h-32 bg-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-inner">
                    TABLE
                  </div>
                </div>

                {/* Bottom row */}
                <div className="col-span-3 flex justify-center gap-8">
                  <SeatCircle seat={seats[2]} />
                  <SeatCircle seat={seats[3]} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 border-t pt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 rounded-full" />
            Available
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 rounded-full" />
            Occupied
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Seat data is updated every 30 seconds via AI detection
        </p>
      </div>
    </div>
  );
};

const SeatCircle = ({ seat }) => (
  <div
    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-md shadow-md ${
      seat.occupied ? "bg-red-300 text-red-800" : "bg-green-300 text-green-800"
    }`}
    title={`Seat ${seat.id}`}
  >
    {seat.id}
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-4 rounded shadow-md text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Seats;
