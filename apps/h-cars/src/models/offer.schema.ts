import * as mongoose from 'mongoose';

export const OfferSchema = new mongoose.Schema({
  carId: { type: String, ref: 'Car', required: true },
  user: { type: String, ref: 'User', required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
