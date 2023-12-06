import mongoose, { Model, Schema, model } from "mongoose";
import { Order, TUser, TUserMethods } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
// Create a new Model type that khows about TUser methods
type UserModel = Model<TUser,{},TUserMethods>;
export const OrderSchema = new Schema<Order>({
  productName: { type: String },
  quantity: { type: Number },
  price: { type: Number },
});
const userSchema = new Schema<TUser,UserModel,TUserMethods>({
  userId: {
    type: Number,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: [String],
  address: {
    street: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  orders:[OrderSchema]
});

userSchema.pre("save", async function (next) {
  const user = this;

 
  user.password =  await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

userSchema.post("save", function (doc) {
  doc.password = "";
})


// custom instanc method

userSchema.method("isUserExist",function isUserExist (userId){
  return User.findOne({userId});

})


export const User = model<TUser,UserModel>("users", userSchema);
