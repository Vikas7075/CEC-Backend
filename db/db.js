import mongoose from "mongoose";

const dbName = 'linkedinBackend';

export const ConnectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: dbName,
        });
        console.log(`\n MongoDb Connected !! DB host:${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDb Connection Failed ", error);
        process.exit(1);
    }
}