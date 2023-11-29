import mongoose, { Document } from 'mongoose';

export interface Follow extends Document {
  follower: mongoose.Schema.Types.ObjectId;
  following: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
