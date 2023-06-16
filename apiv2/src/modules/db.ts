import * as Mongoose from "mongoose";
import { config } from "dotenv";

config();

const{
    DB_HOST: db_host
} = process.env;

let database: Mongoose.Connection;
export const connect = () => {  // add your own uri below
    if (!db_host) {
        throw new Error("DB_HOST not set! edit you .env config");
    };

    const uri: string = db_host;
    if (database) {
        return;
    };

    Mongoose.connect(uri);
    
    database = Mongoose.connection;  database.once("open", async () => {
        console.log("Connected to database");
    });
    
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};
  
export const disconnect = () => { 
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};