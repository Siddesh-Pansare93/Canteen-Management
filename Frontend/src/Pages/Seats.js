import React, { useState, useEffect, useCallback } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { getSeatAvailability } from "../services/api";
import { toast } from "react-toastify";

// Default initial data structure
const initialSeatData = {
  A1: [
    { id: 1, occupied: false },
    { id: 2, occupied: true },
    { id: 3, occupied: false },
    { id: 4, occupied: false },
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
      // Handle both boolean and string representations
      if (seat.occupied === true || seat.occupied === 'true') {
        occupied++;
      }
    });
  });

  return {
    total,
    occupied,
    available: total - occupied,
  };
};

const Seats = () => {
  const [seatData, setSeatData] = useState(initialSeatData);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const fetchSeatData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSeatAvailability();
      console.log(data);
      
      // Convert string 'true'/'false' values to actual booleans
      const convertedData = {};
      Object.entries(data).forEach(([tableName, seats]) => {
        convertedData[tableName] = seats.map(seat => ({
          ...seat,
          occupied: seat.occupied === true || seat.occupied === 'true'
        }));
      });
      
      setSeatData(convertedData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch seat data:", error);
      toast.error("Could not update seat availability");
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Initial data load
  useEffect(() => {
    fetchSeatData();
  }, [fetchSeatData]);
  
  // Set up polling at 10-second intervals
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSeatData();
    }, 10000); // 10 seconds
    
    return () => clearInterval(interval);
  }, [fetchSeatData]);
  
  const { total, occupied, available } = getSeatCounts(seatData);
  
  const formatTime = (date) => {
    return date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '';
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Seating Availability</h1>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {formatTime(lastUpdated)}
            </span>
          )}
          <button 
            className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={fetchSeatData}
            disabled={loading}
          >
            <FiRefreshCcw className={`w-6 h-6 text-gray-600 ${loading ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-300'}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Seats" value={total} color="text-black" />
        <StatCard label="Available" value={available} color="text-green-600" />
        <StatCard label="Occupied" value={occupied} color="text-red-600" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Canteen Tables</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : Object.keys(seatData).length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No seat data available
          </div>
        ) : (
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
        )}

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
          * Seat data is updated every 10 seconds from AI detection system
        </p>
      </div>
    </div>
  );
};

const SeatCircle = ({ seat }) => (
  <div
    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-md shadow-md ${
      seat.occupied === true || seat.occupied === 'true' 
        ? "bg-red-300 text-red-800" 
        : "bg-green-300 text-green-800"
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
