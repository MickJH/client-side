import mongoose, { Document } from 'mongoose';

export enum FuelType {
  Petrol = 'Petrol',
  Diesel = 'Diesel',
  Electric = 'Electric',
}

export enum TransmissionType {
  Automatic = 'Automatic',
  Manual = 'Manual',
}

export interface Car extends Document {
  carModel: string;
  counter: number;
  typeOfFuel: FuelType;
  transmissionType: TransmissionType;
  apk: boolean;
  apkExpires: Date;
  numberPlate: string;
  constructionYear: number;
  user: mongoose.Types.ObjectId;
}
