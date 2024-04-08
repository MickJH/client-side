export interface Offer extends Document {
  carId: string;
  user: string;
  price: number;
  createdAt: Date;
}
