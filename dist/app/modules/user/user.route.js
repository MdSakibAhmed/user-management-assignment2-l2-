"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/", user_controller_1.createUser);
userRouter.get("/", user_controller_1.getAllUsers);
userRouter.get("/:userId", user_controller_1.getSingleUser);
userRouter.put("/:userId", user_controller_1.updateSingleUser);
userRouter.delete("/:userId", user_controller_1.deleteUser);
// Order managment routes
userRouter.put("/:userId/orders", user_controller_1.createOrder);
userRouter.get("/:userId/orders", user_controller_1.getAllOrder);
userRouter.get("/:userId/orders/total-price", user_controller_1.getTotalPrice);
exports.default = userRouter;
