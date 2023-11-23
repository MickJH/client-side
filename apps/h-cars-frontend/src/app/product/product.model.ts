export interface Product {
  id: string;
  productName: string;
  price: number;
  description: string;
  userEmail: string;
  imageUrl: string;
  category: [
    'Electronic',
    'Liquid',
    'Wheels',
    'Tools',
    'Car Accessoires',
    'Other'
  ];
  brand: string;
  createdAt: Date;
}
