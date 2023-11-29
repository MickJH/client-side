import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likedCars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
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
