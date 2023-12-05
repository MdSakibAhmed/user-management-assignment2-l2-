import { Router } from "express";
import { createUser,getAllUsers,getSingleUser,updateSingleUser,deleteUser,createOrder,getAllOrder,getTotalPrice } from "./user.controller";

const userRouter = Router();

userRouter.post("/",createUser);
userRouter.get("/",getAllUsers)
userRouter.get("/:userId",getSingleUser)
userRouter.put("/:userId",updateSingleUser)
userRouter.delete("/:userId",deleteUser);

// Order managment routes
userRouter.put("/:userId/orders",createOrder)
userRouter.get("/:userId/orders",getAllOrder)
userRouter.get("/:userId/orders/total-price",getTotalPrice)

export default userRouter;