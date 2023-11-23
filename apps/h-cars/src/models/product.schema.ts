import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  userEmail: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'Electronic',
      'Liquid',
      'Wheels',
      'Tools',
      'Car Accessoires',
      'Other',
    ],
    required: true,
  },
  brand: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
