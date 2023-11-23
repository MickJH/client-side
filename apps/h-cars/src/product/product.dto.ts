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
}
