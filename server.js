import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🚀 Connecting to MongoDB...");
    console.log("URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log(`✅ Mongo Connected: ${conn.connection.host}`);

  } catch (error) {

    console.log("❌ FULL RAW ERROR START");
    console.log(error);
    console.log("❌ FULL RAW ERROR END");

    console.log("❌ MESSAGE:");
    console.log(error.message);

    console.log("❌ CAUSE:");
    console.log(error.cause);

    console.log("❌ REASON:");
    console.log(error.reason);

    process.exit(1);
  }
};

export default connectDB;