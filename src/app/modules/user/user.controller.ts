import { Request, Response } from "express";
import {
  createUserIntoDB,
  deleteUserFromDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  createOrderIntoDB,
  getAllorderFromDB,
  getTotalPriceFromDB,
} from "./user.service";
import { User } from "./user.model";
import { orderValidationSchema, userValidationSchema } from "./user.validation";

// create a new user into collection
export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    // validate with zod
    const zodParsData = userValidationSchema.parse(user);
    const data = await createUserIntoDB(zodParsData);
    // const { password, orders, _id, ...data } = result.toObject();
    res
      .status(200)
      .send({ success: true, message: "User created successfully!", data });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};

// get all users from collection
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await getAllUserFromDB();

    res
      .status(200)
      .send({ success: true, message: "User feached successfully!", data });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};

// get a single user by userId from users
export const getSingleUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const user = new User();
  if (!(await user.isUserExist(userId))) {
    return res.status(404).send({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }

  try {
    const data = await getSingleUserFromDB(userId);
    res.status(200).send({
      success: true,
      message: "User feached successfully!",
      data: data,
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};

// update a single user info
export const updateSingleUser = async (req: Request, res: Response) => {
  const updatedUser = req.body;
  const userId = parseInt(req.params.userId);
  const user = new User();
  if (! await user.isUserExist(userId)) {
    return res.status(404).send({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
  try {
    const jodParsData = userValidationSchema.parse(updatedUser);
    const data = await updateSingleUserFromDB(jodParsData, userId);
    res.status(200).send({
      success: true,
      message: "User updated  successfully!",
      data: data,
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const user = new User();
  if (! await user.isUserExist(userId)) {
    return res.status(404).send({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
  try {
    const result = await deleteUserFromDB(userId);
    res.status(200).send({
      success: true,
      message: "User deleted  successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};

// Order management
export const createOrder = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const order = req.body;
  try {
    // check user is exist or not
    const user = new User();
    if (!(await user.isUserExist(userId))) {
      return res.status(404).send({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }
    const jodParData = orderValidationSchema.parse(order);
    const result = await createOrderIntoDB(userId, jodParData);
    res.status(200).send({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};

export const getAllOrder = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  console.log("userId", userId);
  try {
    // check user is exist or not
    const user = new User();
    if (!(await user.isUserExist(userId))) {
      return res.status(404).send({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }

    // get orders
    const data = await getAllorderFromDB(userId);
    res
      .status(200)
      .send({ success: true, message: "Order feached successfully!", data });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};

export const getTotalPrice = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const total = await getTotalPriceFromDB(userId);
    res.send({
      success: true,
      message: "Total price calculated successfully!",
      data: total[0],
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message, data: null });
  }
};
