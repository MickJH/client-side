import { Document } from 'mongoose';

export interface User extends Document {
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
}
