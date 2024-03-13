import mongoose  from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONDO_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Can't connect to DB");
    }
}

export default connectDB;