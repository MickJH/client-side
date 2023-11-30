export interface User {
  _id?: string;
  email: string;
  password: string;
  age: number;
  firstName: string;
  lastName: string;
  following: [
    {
      followingUser: string;
      createdAt: Date;
    }
  ];
  likedCars: [
    {
      carId: string;
      createdAt: Date;
    }
  ];
  likedProducts: [
    {
      productId: string;
      createdAt: Date;
    }
  ];
}
