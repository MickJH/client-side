export interface UserDTO {
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
