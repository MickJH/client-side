import mongoose from 'mongoose';
import { Category } from './product';

export interface ProductDTO {
  productName: string;
  price: number;
  description: string;
  userEmail: string;
  imageUrl: string;
  category: Category;
  brand: string;
  createdAt: Date;
  likes: { type: mongoose.Schema.Types.ObjectId; ref: 'Like' }[];
}
