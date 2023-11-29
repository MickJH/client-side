import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  carModel: { type: String, required: true },
  counter: { type: Number, required: true },
  typeOfFuel: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric'],
    required: true,
  },
  transmissionType: {
    type: String,
    enum: ['Automatic', 'Manual'],
    required: true,
  },
  apk: { type: Boolean, required: true },
  apkExpires: { type: Date },
  numberPlate: { type: String, unique: true, required: true },
  constructionYear: { type: Number, required: true },
  userEmail: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
});
