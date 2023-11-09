export interface AuthResponse {
    user: {
      _id: string;
      email: string;
      age: number;
      firstName: string;
      lastName: string;
      __v: number;
    };
    token: string;
  }
  