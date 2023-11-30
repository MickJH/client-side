import mongoose from 'mongoose';

export enum Category {
  Electronic = 'Electronic',
  Liquid = 'Liquid',
  Wheels = 'Wheels',
  Tools = 'Tools',
  CarAccessoires = 'Car Accessoires',
  Other = 'Other',
}

export interface Product extends Document {
  productName: string;
  price: number;
  description: string;
  userEmail: string;
  imageUrl: string;
  category: Category;
  brand: string;
  createdAt: Date;
}
