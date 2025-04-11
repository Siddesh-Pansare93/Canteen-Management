import mongoose from 'mongoose';

const seatDataSchema = new mongoose.Schema(
  {
    identifier: {
      type: String,
      required: true,
      unique: true,
      default: 'current'
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const SeatData = mongoose.model('SeatData', seatDataSchema);

export default SeatData;
