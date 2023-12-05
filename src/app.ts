import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/user/user.route";
const app:Application = express();

app.use(cors());
app.use(express.json())

app.get("/",(req:Request,res:Response)=> {
    res.send({message:"Hello"});
})

app.use("/api/users",userRouter)


export default app;
