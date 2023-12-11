import mongoose, { Model, Schema, model } from "mongoose";
import { Order, TUser, TUserMethods } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
// Create a new Model type that khows about TUser methods
type UserModel = Model<TUser, {}, TUserMethods>;
export const OrderSchema = new Schema<Order>(
  {
    productName: { type: String },
    quantity: { type: Number },
    price: { type: Number },
  },
  {
    _id: false,
  }
);
const userSchema = new Schema<TUser, UserModel, TUserMethods>(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
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
    hobbies: {
      type: [String],
      required: true,
    },
    address: {
      street: { type: String, required: true },
      country: { type: String, required: true },
      city: { type: String, required: true },
    },
    orders: {
      type: [OrderSchema],
      default: undefined,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

userSchema.post("save", function (doc) {
  doc.password = "";
});

// custom instanc method

userSchema.method("isUserExist", function isUserExist(userId) {
  return User.findOne({ userId });
});

export const User = model<TUser, UserModel>("users", userSchema);
