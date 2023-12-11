import {z} from "zod";
export const userValidationSchema = z.object({
    userId:z.number({}),
    username:z.string().max(20),
    password:z.string().max(20),
    fullName:z.object({
        firstName:z.string().min(1),
        lastName:z.string()
    }),
    age:z.number(),
    email:z.string().email({message:"It s not a valid email"}).trim(),
    isActive:z.boolean(),
    hobbies:z.string().array(), 
    address:z.object({
        street:z.string(),
        city:z.string(),
        country:z.string()
    })

})

export const orderValidationSchema= z.object({
    productName:z.string(),
    price:z.number(),
    quantity:z.number()
})

export const updateValidationSchema = z.object({
    userId:z.number({}).optional().readonly(),
    username:z.string().max(20).optional(),
    password:z.string().max(20).optional(),
    fullName:z.object({
        firstName:z.string().min(1),
        lastName:z.string()
    }).optional(),
    age:z.number().optional(),
    email:z.string().email({message:"It s not a valid email"}).trim().optional(),
    isActive:z.boolean().optional(),
    hobbies:z.string().array().optional(), 
    address:z.object({
        street:z.string(),
        city:z.string(),
        country:z.string()
    }).optional()

})