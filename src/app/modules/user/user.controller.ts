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

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  try {
    const result = await createUserIntoDB(user);
    const { password, ...data } = result.toObject();
    res
      .status(200)
      .send({ success: true, message: "User created successfully!", data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await getAllUserFromDB();
    res
      .status(200)
      .send({ success: true, message: "User feached successfully!", data });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const user = new User();
  if (!  await user.isUserExist(userId)) {
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
    const result = await getSingleUserFromDB(userId);
    const { ...data } = result?.toObject();
    const { password, ...filteredData } = data;
    res.status(200).send({
      success: true,
      message: "User feached successfully!",
      data: filteredData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSingleUser = async (req: Request, res: Response) => {
  const updatedUser = req.body;
  const userId = parseInt(req.params.userId);
  const user = new User();
  if (await user.isUserExist(userId)) {
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
    const updatedData = await updateSingleUserFromDB(updatedUser, userId);
    const { ...data } = updatedData?.toObject();
    const { password, ...filteredData } = data;
    res.status(200).send({
      success: true,
      message: "User updated  successfully!",
      data: filteredData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const user = new User();
  if (await user.isUserExist(userId)) {
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
  } catch (error) {
    console.log(error);
  }
};

// Order management
export const createOrder = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const order = req.body;
  try {
    // check user is exist or not
    const user = new User();
    if ( ! await user.isUserExist(userId)) {
      return res.status(404).send({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }
    const result = await createOrderIntoDB(userId, order);
    res.status(200).send({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrder = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  console.log("userId",userId);
  try {
    // check user is exist or not
    const user = new User();
    if ( ! await user.isUserExist(userId)) {
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
  } catch (error) {
    console.log(error);
  }
};

export const getTotalPrice = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const total = await getTotalPriceFromDB(userId);
  res.send({
    success: true,
    message: "Total price calculated successfully!",
    data: total[0],
  });
};
