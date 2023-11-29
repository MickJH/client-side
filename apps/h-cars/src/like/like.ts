import mongoose, { Document } from 'mongoose';

export interface Like extends Document {
  car: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
