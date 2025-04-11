import SeatData from '../models/seat.model.js';

// In-memory cache of the latest seat data for faster access
let latestSeatData = {};

/**
 * Update seat data received from external API
 */
export const updateSeatData = async (req, res) => {
  try {
    const seatData = req.body;
    
    // Validate seat data format
    if (!seatData || typeof seatData !== 'object') {
      return res.status(400).json({ message: 'Invalid seat data format' });
    }
    
    // Update the in-memory cache
    latestSeatData = seatData;
    
    // Store in database for persistence
    await SeatData.findOneAndUpdate(
      { identifier: 'current' }, // Use a fixed identifier
      { data: seatData, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
    
    console.log('Seat data updated successfully');
    return res.status(200).json({ message: 'Seat data updated successfully' });
  } catch (error) {
    console.error('Error updating seat data:', error);
    return res.status(500).json({ message: 'Failed to update seat data' });
  }
};

/**
 * Get latest seat data for frontend
 */
export const getSeatData = async (req, res) => {
  try {
    // If in-memory cache is empty, fetch from database
    if (Object.keys(latestSeatData).length === 0) {
      const storedData = await SeatData.findOne({ identifier: 'current' });
      if (storedData) {
        latestSeatData = storedData.data;
      }
    }
    
    return res.status(200).json({ 
      data: latestSeatData,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Error fetching seat data:', error);
    return res.status(500).json({ message: 'Failed to fetch seat data' });
  }
};
