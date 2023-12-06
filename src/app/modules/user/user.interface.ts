import mongoose, { Decimal128, Types } from "mongoose";


export type Order = { productName: string; price:Number; quantity: number };
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
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: [Order];
}

export interface TUserMethods {
    isUserExist(userId:number):Promise<TUser | null>
}