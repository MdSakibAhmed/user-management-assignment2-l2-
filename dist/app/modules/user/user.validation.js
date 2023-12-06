"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number({}),
    username: zod_1.z.string().max(20),
    password: zod_1.z.string().max(20),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string().min(1),
        lastName: zod_1.z.string()
    }),
    age: zod_1.z.number(),
    email: zod_1.z.string().email({ message: "It s not a valid email" }).trim(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.string().array(),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        country: zod_1.z.string()
    })
});
exports.orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number()
});
