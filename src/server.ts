import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";


const main = async () => {
 const isConnected =   await mongoose.connect(config.database_url as string);
 console.log("connected");
 app.listen(config.port,()=> {
    console.log('listening ')
 })

}

main();