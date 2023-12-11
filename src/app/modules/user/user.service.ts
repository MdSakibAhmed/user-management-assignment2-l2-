import { Order, TUser } from "./user.interface";
import { User } from "./user.model";

export const createUserIntoDB = async (user: TUser) => {
  const { password, _id, ...result } = (await User.create(user)).toObject();
  return result;
};

export const getAllUserFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 }
  );
  return result;
};

export const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne(
    { userId },
    { password: 0, _id: 0, orders: 0, __v: 0 }
  );
  return result;
};

export const updateSingleUserFromDB = async (user: Partial<TUser>, userId: number) => {
  const result = await User.findOneAndUpdate({ userId }, user, {
    new: true,
  }).select({ password: 0, __v: 0, orders: 0, _id: 0 });
  return result;
};
export const deleteUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

// Order managment

export const createOrderIntoDB = async (userId: number, order: Order) => {
  const result = await User.updateOne({ userId }, { $push: { orders: order } });
  return result;
};

export const getAllorderFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};

export const getTotalPriceFromDB = async (userId: number) => {
  const result = await User.aggregate([
    // stage 1
    {
      $match: { userId },
    },
    //stage 2
    {
      $project: {
        orders: 1,
        _id: 0,
      },
    },

    {
      $unwind: "$orders",
    },

    // stage 3
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },

    {
      $project: {
        _id: 0,
      },
    },
  ]);
  return result;
};
