import mongoose, { Document } from 'mongoose';

export interface LikeDTO extends Document {
  car: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
