import mongoose, { Mongoose } from "mongoose";
import IDatabase from "../shared/interfaces/IDatabse";

export default class MongoDBDatabase implements IDatabase {

  async connect(): Promise<void> {
    try {
      if(process.env.MONGO_URI){
        const data: Mongoose = await mongoose.connect(
          process.env.MONGO_URI || "",
          {
            dbName:process.env.DB_NAME || 'TestMongoDBApp'
          }
        );
        console.log(
          `MongoDB is connected with the server: ${data.connection.host}`
        );
      }
      else{
        console.log('MongoDB is not connected because of empty MONGO_URI in env.')
      }
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
}
