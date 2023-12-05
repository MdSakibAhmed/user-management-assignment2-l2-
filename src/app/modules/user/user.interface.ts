import { Types } from "mongoose";


export type Order = { productName: string; price: number; quantity: number };
export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Types.Array<string>;
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Types.DocumentArray<Order>;
}

export interface TUserMethods {
    isUserExist(userId:number):Promise<TUser | null>
}