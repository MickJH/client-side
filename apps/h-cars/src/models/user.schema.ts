import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  following: [
    {
      followingUser: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likedCars: [
    {
      carId: {
        type: String,
        ref: 'Car',
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likedProducts: [
    {
      productId: {
        type: String,
        ref: 'Product',
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

UserSchema.pre('save', async function (next: NextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
